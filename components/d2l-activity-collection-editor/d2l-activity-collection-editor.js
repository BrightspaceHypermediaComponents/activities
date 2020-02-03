import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { repeat } from 'lit-html/directives/repeat';
import { until } from 'lit-html/directives/until.js';
import { guard } from 'lit-html/directives/guard';
import { heading1Styles, heading4Styles, bodyCompactStyles, bodyStandardStyles, labelStyles} from '@brightspace-ui/core/components/typography/styles.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';
import { classes as organizationClasses } from 'siren-sdk/src/organizations/OrganizationEntity.js';
import { NamedEntityMixin } from 'siren-sdk/src/entityAddons/named-entity-mixin.js';
import { DescribableEntityMixin } from 'siren-sdk/src/entityAddons/describable-entity-mixin.js';
import { SimpleEntity } from 'siren-sdk/src/es6/SimpleEntity.js';
import { ActionCollectionEntity } from 'siren-sdk/src/activities/ActionCollectionEntity.js';
import { performSirenAction } from 'siren-sdk/src/es6/SirenAction.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/link/link.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui/core/components/list/list-item-content.js';
import '@brightspace-ui/core/components/inputs/input-search.js';
import '@brightspace-ui/core/components/loading-spinner/loading-spinner.js';
import 'd2l-organizations/components/d2l-organization-image/d2l-organization-image.js';
import 'd2l-alert/d2l-alert-toast.js';
import '@brightspace-ui-labs/edit-in-place/d2l-labs-edit-in-place.js';
import '../d2l-activity-editor/d2l-activity-visibility-editor.js';
import { getLocalizeResources } from './localization.js';

const baseUrl = import.meta.url;
class CollectionEditor extends LocalizeMixin(EntityMixinLit(LitElement)) {

	constructor() {
		super();
		this._items = [];
		this._candidateItems = [];
		this._currentSelection = {};
		this._specialization = {};
		this._organizationImageChunk = {};
		this._loaded = false;
		this._loadedImages = [];
		this._mainPageLoad = new Promise(() => null);
		this._candidateLoad = new Promise(() => null);
		this._candidateFirstLoad = false;
		this.ariaBusy = 'true';
		this.ariaLive = 'polite';
		this._currentDeleteItemName = '';
		this._dialogOpen = false;
		this._isLoadingMore = false;
		this._candidateItemsLoading = false;
		this._setEntityType(ActivityUsageEntity);
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, baseUrl);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivityUsageChange(entity);
			super._entity = entity;
		}
	}

	_onActivityUsageChange(usage) {

		usage.onSpecializationChange(NamedEntityMixin(DescribableEntityMixin(SimpleEntity)), (specialization) => {
			this._specialization = specialization;
			this._name = specialization.getName();
			this._description = specialization.getDescription();
		});

		this._isDraft = usage.isDraft();
		this._canEditDraft = usage.canEditDraft();
		this._setVisibility = (draftStatus) => {
			this._isDraft = draftStatus;
			usage.setDraftStatus(draftStatus).then(() => {
				usage.update();
			});
		};

		let hasACollection = false;
		usage.onActivityCollectionChange((collection, error) => {
			if (error) {
				return;
			}
			hasACollection = true;
			const items = [];
			let itemsLoadedOnce = false;
			const imageChunk = this._loadedImages.length;
			this._loadedImages[imageChunk] = { loaded: 0, total: null };
			let totalInLoadingChunk = 0;
			collection.onItemsChange((item, index) => {
				item.onActivityUsageChange((usage) => {
					usage.onOrganizationChange((organization) => {
						items[index] = organization;
						items[index].removeItem = () => {
							this._reloadOnOpen = true;
							collection.removeItem(item.self());
							this._currentDeleteItemName = items[index].name();
							this.shadowRoot.querySelector('#delete-succeeded-toast').open = true;
							// if the result is an empty learning path, set to hidden
							if (items.length - 1 === 0) {
								this._setVisibility(true);
							}
						};
						items[index].itemSelf = item.self();
						if (typeof this._organizationImageChunk[item.self()] === 'undefined') {
							this._organizationImageChunk[item.self()] = imageChunk;
							totalInLoadingChunk++;
						}

						if (itemsLoadedOnce) {
							this._items = items;
						}
					});
				});
			});

			this._collection = collection;
			this._addExistingAction = collection._entity.getActionByName('start-add-existing-activity');

			collection.subEntitiesLoaded().then(() => {
				this._items = items;
				itemsLoadedOnce = true;
				this._loadedImages[imageChunk].total = totalInLoadingChunk;
			});
		});

		this._mainPageLoad = usage.subEntitiesLoaded().then(() => {
			if (!this._loaded) {
				this._candidateLoad = this.getCandidates(this._addExistingAction, null, true);
			}
			if (!hasACollection) {
				this._items = [];
			}
			this.ariaBusy = 'false';
			this._loaded = true;
		});
	}

	async getCandidates(action, fields = null, clearList = false) {
		if (!this._collection) {
			return;
		}
		this._candidateItemsLoading = true;
		if (clearList) {
			this._candidateFirstLoad = false;
		}
		const resp = await performSirenAction(this.token, action, fields, true);
		this._actionCollectionEntity = new ActionCollectionEntity(this._collection, resp);
		const candidateItems = [];
		const imageChunk = this._loadedImages.length;
		this._loadedImages[imageChunk] = { loaded: 0, total: null };
		let totalInLoadingChunk = 0;
		this._actionCollectionEntity._items().forEach(item => {
			item.onActivityUsageChange(async usage => {
				usage.onOrganizationChange((organization) => {
					const alreadyAdded = this._items.findIndex(item => item.self() === organization.self()) >= 0;
					candidateItems.push({ item, organization, alreadyAdded, itemSelf: organization.self() });
					this._organizationImageChunk[organization.self()] = imageChunk;
					totalInLoadingChunk++;
				});
			});
		});
		await this._collection.subEntitiesLoaded();
		if (clearList) {
			this._candidateItems = candidateItems;
		} else {
			this._candidateItems = this._candidateItems.concat(candidateItems);
		}
		this._loadedImages[imageChunk].total = totalInLoadingChunk;
		this._candidateFirstLoad = true;
		this._candidateItemsLoading = false;
	}

	async addActivities() {
		this._reloadOnOpen = true;
		const addAction = this._actionCollectionEntity.getExecuteMultipleAction();
		const keys = this._selectedActivities();
		const fields = [{ name: 'actionStates', value: keys }];
		await performSirenAction(this.token, addAction, fields, true);
	}

	handleSearch(event) {
		this._candidateLoad = new Promise(() => null);
		const searchAction = this._actionCollectionEntity.getSearchAction();
		const fields = [{ name: 'collectionSearch', value: event.detail.value }];
		this._candidateLoad = this.getCandidates(searchAction, fields, true);
	}

	handleSelectionChange(e) {
		this._currentSelection[e.detail.key] = e.detail.selected;
		this._selectionCount = this._selectedActivities().length;
	}

	_selectedActivities() {
		return Object.keys(this._currentSelection).filter((key) => this._currentSelection[key]);
	}

	clearAllSelected() {
		const items = this.shadowRoot.querySelectorAll('d2l-dialog d2l-list d2l-list-item:not([disabled])');
		items.forEach(item => item.setSelected(false, true));
		this._currentSelection = {};
		this._selectionCount = 0;
	}

	clearDialog() {
		this.clearAllSelected();
	}

	async loadMore() {
		this._isLoadingMore = true;
		const lastItem = this.shadowRoot.querySelector('d2l-dialog d2l-list d2l-list-item:last-of-type');
		await this.getCandidates(this._actionCollectionEntity.getNextAction());
		await this.updateComplete;
		this._isLoadingMore = false;
		lastItem.nextElementSibling.focus();
	}

	async open() {
		if (this._reloadOnOpen) {
			this._candidateLoad = this.getCandidates(this._addExistingAction, null, true);
			this._reloadOnOpen = false;
		}
		await this.shadowRoot.querySelector('d2l-dialog').open();
	}

	static get properties() {
		return {
			_addExistingAction: { type: Object },
			_candidateItems: { type: Array },
			_canEditDraft: { type: Boolean },
			_description: { type: String },
			_isDraft: { type: Boolean },
			_items: { type: Array },
			_name: { type: String },
			_selectionCount: { type: Number },
			_candidateLoad: { type: Object },
			_candidateItemsLoading: {type: Boolean},
			_isLoadingMore: {type: Boolean},
			ariaBusy: { type: String, reflect: true, attribute: 'aria-busy' },
			ariaLive: { type: String, reflect: true, attribute: 'aria-live' }
		};
	}

	static get styles() {
		return [ heading1Styles, heading4Styles, bodyCompactStyles, bodyStandardStyles, labelStyles, css`
			:host {
				display: block;
				position: relative;
				z-index: 0;
			}
			:host([hidden]) {
				display: none;
			}
			.d2l-activity-collection-base-info {
				display: flex;
				justify-content: space-between;
			}
			.d2l-activity-collection-body {
				margin: auto;
				max-width: 1230px;
				padding: 0 1.5rem;
			}
			.d2l-activity-collection-body-content {
				max-width: 820px;
				padding: 0 0.3rem;
			}
			.d2l-activity-collection-list-actions {
				align-items: baseline;
				display: flex;
				justify-content: space-between;
				margin: 0.9rem 0;
				max-width: 820px;
			}
			.d2l-activity-collection-description {
				margin-bottom: 0.95rem;
			}
			.d2l-activity-collection-header {
				background: white;
				box-shadow: inset 0 -1px 0 0 var(--d2l-color-gypsum);
				padding: 0.75rem 1.5rem 0 1.5rem;
			}
			.d2l-activity-collection-header-content {
				box-sizing: border-box;
				margin: 0 auto;
				max-width: 1230px;
				overflow: hidden;
				padding: 0 0.3rem;
				position: relative;
			}
			.d2l-activity-collection-header-col1 {
				max-width: 600px;
			}
			.d2l-activity-collection-title-header {
				margin: 9px 0px 6px 0;
				min-height: 52px;
			}
			.d2l-activity-collection-toggle-container {
				align-self: flex-start;
				display: flex;
				flex-shrink: 0;
				margin: 0.55rem 0;
			}

			.d2l-activity-visbility-label {
				white-space: nowrap;
			}
			.d2l-add-activity-dialog {
				align-content: start;
				align-items: start;
				display: grid;
				grid-template-areas: "." "list" ".";
				grid-template-columns: 100%;
				min-height: 500px;
  				grid-template-rows: auto auto auto;
			}
			.d2l-add-activity-dialog-list-disabled,
			.d2l-add-activity-dialog d2l-loading-spinner,
			.d2l-add-activity-dialog d2l-list {
				grid-area: list;
			}
			.d2l-add-activity-dialog-list-disabled {
				filter: grayscale(100%);
				opacity: 0.6;
			}
			.d2l-add-activity-dialog-header {
				align-items: baseline;
				display: flex;
				justify-content: space-between;
				padding-bottom: 10px;
			}
			.d2l-add-activity-dialog-load-more {
				margin: 10px 0;
			}
			.d2l-add-activity-dialog-selection-count {
				color: var(--d2l-color-ferrite);
				font-size: 16px;
				margin-left: 0.5rem;
    			align-self: center;
			}
			.d2l-list-item-secondary {
				color: var(--d2l-color-olivine-minus-1);
				font-size: 14px;
			}
			.d2l-activity-collection-sub-header {
				margin: 0;
			}
			.d2l-activity-collection-toggle-container-button {
				display: none;
			}

			.d2l-activity-collection-header-1-skeleton {
				height: 2.4rem;
				display: flex;
				align-items: center;
				min-width: 20rem;
			}

			.d2l-activity-collection-header-1-skeleton-svg {
				max-height: 1.45rem;
			}

			.d2l-activity-collection-body-compact-skeleton {
				height: 3.6rem;
				display: flex;
				align-items: center;
				min-width: 25rem;
			}

			.d2l-activity-collection-body-compact-skeleton-svg {
				height: 0.55rem;
			}

			.d2l-activity-collection-body-small-skeleton-svg {
				height: 0.5rem;
			}

			.d2l-activity-collection-list-actions-skeleton {
				align-self: center;
				flex-shrink: 0;
			}

			.d2l-activitiy-collection-list-item-illustration {
				display: grid;
				grid-template-columns: 100%;
  				grid-template-rows: 100%;
				grid-template-areas: only-one;
				position: relative;
			}

			.d2l-activity-collection-image-skeleton,
			.d2l-activitiy-collection-organization-image {
				grid-column: 1;
  				grid-row: 1;
			}

			@keyframes loadingPulse {
				0% { fill: var(--d2l-color-sylvite); }
				50% { fill: var(--d2l-color-regolith); }
				75% { fill: var(--d2l-color-sylvite); }
				100% { fill: var(--d2l-color-sylvite); }
			}

			.d2l-activity-collection-skeleton-rect {
				animation: loadingPulse 1.8s linear infinite;
			}

			.d2l-activity-collection-no-activity {
				background-color: var(--d2l-color-regolith);
				border: solid 1px var(--d2l-color-gypsum);
				border-radius: 8px;
				padding: 2.1rem 2rem;
			}

			@media only screen and (max-width: 929px) {
				.d2l-activity-collection-header {
					padding-left: 1.2rem;
					padding-right: 1.2rem;
				}
				.d2l-activity-collection-body {
					padding-left: 1.2rem;
					padding-right: 1.2rem;
				}
				.d2l-activity-collection-body-compact-skeleton {
					min-width: 15rem;
				}
			}

			@media only screen and (max-width: 615px) {
				.d2l-activity-collection-header {
					padding-left: 0.8rem;
					padding-right: 0.8rem;
				}
				.d2l-activity-collection-body {
					padding-left: 0.8rem;
					padding-right: 0.8rem;
				}
				.d2l-activity-collection-body-small-skeleton-svg {
					height: 0.4rem;
				}
				.d2l-activity-collection-header-1-skeleton {
					height: 1.8rem;
					min-width: 10rem;
				}

				.d2l-activity-collection-header-1-skeleton-svg {
					max-height: 0.95rem;
				}
				.d2l-activity-collection-body-compact-skeleton {
					min-width: 12rem;
				}
			}
			@media only screen and (max-width: 480px) {
				.d2l-activity-collection-toggle-container-button {
					display: block;
					margin-top: 0.35rem;
				}
				.d2l-activity-collection-toggle-container {
					display: none;
				}
			}
		` ];
	}

	render() {
		if (!this._mainPageLoad) {
			return null;
		}

		const icon = (this._isDraft ? 'tier1:visibility-hide' : 'tier1:visibility-show');

		const learningPathTitle = this._mainPageLoad.then(() => {
			return html`
				<h1 class="d2l-heading-1 d2l-activity-collection-title-header">
					<d2l-labs-edit-in-place size="49" placeholder="${this.localize('untitledLearningPath')}" maxlength="128" value="${this._name}" @change=${this._titleChanged}></d2l-labs-edit-in-place>
				</h1>
			`;
		});
		const learningPathTitleSketeton = html`
			<div class="d2l-activity-collection-title-header d2l-activity-collection-header-1-skeleton">
				<svg width="100%" class="d2l-activity-collection-header-1-skeleton-svg">
					<rect x="0" width="70%" y="0" height="100%" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect"></rect>
				</svg>
			</div>
		`;

		const learningPathDescription = this._mainPageLoad.then(() => {
			return html`
				<div class="d2l-body-compact d2l-activity-collection-description">
					<d2l-labs-edit-in-place size="49" placeholder="${this.localize('enterADescription')}" maxlength="280" value="${this._description}" @change=${this._descriptionChanged}></d2l-labs-edit-in-place>
				</div>
			`;
		});
		const learningPathDescriptionSketeton = html`
			<div class="d2l-activity-collection-description d2l-activity-collection-body-compact-skeleton">
				<svg width="100%" height="100%">
					<rect x="0" width="100%" y="6" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect d2l-activity-collection-body-compact-skeleton-svg"></rect>
					<rect x="0" width="100%" y="30" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect d2l-activity-collection-body-compact-skeleton-svg"></rect>
					<rect x="0" width="80%" y="54" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect d2l-activity-collection-body-compact-skeleton-svg"></rect>
				</svg>
			</div>
		`;

		const learningPathVisibilityToggle = this._handleFirstLoad(() => {
			return html`
				<d2l-activity-visibility-editor class="d2l-activity-collection-toggle-container" ?disabled="${!this._items.length}" .href="${this.href}" .token="${this.token}"></d2l-activity-visibility-editor>
				<d2l-button-icon
					class="d2l-activity-collection-toggle-container-button"
					?disabled="${!this._canEditDraft || this.disabled}"
					@click="${() => typeof this._setVisibility === 'function' && this._setVisibility(!this._isDraft)}"
					icon=${icon}>
				</d2l-button-icon>
			`;
		}, () => {
			return html`
				<div class="d2l-activity-collection-toggle-container">
					<svg viewBox="0 0 150 38" width="150" height="38">
						<rect x="1" width="60" y="5" height="30" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect"></rect>
						<rect x="72" width="70" y="15" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect d2l-activity-collection-body-compact-skeleton-svg"></rect>
					</svg>
				</div>
				<div class="d2l-activity-collection-toggle-container-button">
					<svg viewBox="0 0 42 42" width="42" height="42">
						<rect x="0" width="42" y="0" height="42" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect"></rect>
					</svg>
				</div>
			`;
		});

		const addActivityButton = this._handleFirstLoad(() => {
			return html`<d2l-button @click="${this.open}" primary>${this.localize('addActivity')}</d2l-button>`;
		},	() => {
			return html`
				<svg viewBox="0 0 142 42" width="142" height="42" class="d2l-activity-collection-list-actions-skeleton">
					<rect x="0" width="142" y="0" height="42" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect"></rect>
				</svg>
			`;
		});

		const activityCount = this._handleFirstLoad(() => {
			return html`<div class="d2l-body-compact">${this.localize('numberOfActivities', 'count', this._items.length)}</div>`;
		},	() => {
			return html`
				<svg width="90" class="d2l-activity-collection-body-compact-skeleton-svg d2l-activity-collection-list-actions-skeleton">
					<rect x="0" width="100%" y="0" height="100%" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect"></rect>
				</svg>
			`;
		});

		const items = this._handleFirstLoad(this._renderItemList.bind(this), () => html`${this._renderItemListSkeleton(3)}`);

		return html`
			<div class="d2l-activity-collection-header">
				<div class="d2l-activity-collection-header-content">
					<div class="d2l-heading-4 d2l-activity-collection-sub-header">${this.localize('editLearningPath')}</div>
					<div class="d2l-activity-collection-base-info">
						<div class="d2l-activity-collection-header-col1" style="position: relative">
							${guard([this._loaded], () => html`
								${until(learningPathTitle, learningPathTitleSketeton)}
								${until(learningPathDescription, learningPathDescriptionSketeton)}
							`)}
						</div>
						${learningPathVisibilityToggle}
					</div>
				</div>
			</div>
			<div class="d2l-activity-collection-body">
				<div class="d2l-activity-collection-body-content">
					<div class="d2l-activity-collection-list-actions">
						${addActivityButton}
						${activityCount}
					</div>
					<div class="d2l-activity-collection-activities">
						${items}
					</div>
					<d2l-alert-toast id="delete-succeeded-toast" type="default" announce-text=${this.localize('deleteSucceeded', 'activityName', this._currentDeleteItemName)}>
							${this.localize('deleteSucceeded', 'activityName', this._currentDeleteItemName)}
					</d2l-alert-toast>
				</div>
			</div>
			${this._renderCandidates()}
		`;
	}

	_handleFirstLoad(whenLoaded, whileLoading = () => null, firstLoad = null, promiseToWatch = null) {
		firstLoad = firstLoad === null ? this._loaded : firstLoad;
		promiseToWatch = promiseToWatch === null ? this._mainPageLoad : promiseToWatch;
		return firstLoad ? whenLoaded() : until(promiseToWatch.then(whenLoaded), whileLoading());
	}

	_renderItemList() {
		if (this._items.length <= 0) {
			return html`<div class="d2l-activity-collection-no-activity d2l-body-standard">${this.localize('noActivitiesInLearningPath')}</div>`;
		}

		const items = repeat(this._items, (item) => item.self(), item => {
			return html`
				<d2l-list-item>
					<div slot="illustration" class="d2l-activitiy-collection-list-item-illustration">
						${this._renderCourseImageSkeleton()}
						<d2l-organization-image
							class="d2l-activitiy-collection-organization-image"
							href=${item.self()}
							@d2l-organization-image-loaded="${() => this._onListImageLoaded(this._organizationImageChunk[item.itemSelf])}"
							?hidden="${!this._loadedImages[this._organizationImageChunk[item.itemSelf]].allLoaded}">
						</d2l-organization-image>
					</div>
					<d2l-list-item-content>
						${item.name()}
						<div slot="secondary">${item.hasClass(organizationClasses.courseOffering) ? this.localize('course') : null}</div>
					</d2l-list-item-content>
					<d2l-button-icon slot="actions" text="${this.localize('removeActivity', 'courseName', item.name())}" icon="d2l-tier1:close-default" @click=${item.removeItem}>
				</d2l-list-item>
			`;
		});

		return html`<d2l-list>${items}</d2l-list>`;
	}

	_renderCandidateItems() {
		if (this._candidateItems.length <= 0) {
			return html`<div class="d2l-activity-collection-no-activity d2l-body-standard">${this.localize('noActivitiesFound')}</div>`;
		}

		const items = repeat(this._candidateItems, (candidate) => candidate.itemSelf, candidate => {
			return html`
				<d2l-list-item selectable ?disabled=${candidate.alreadyAdded} ?selected=${candidate.alreadyAdded || this._currentSelection[candidate.item.getActionState()]} key=${candidate.alreadyAdded ? ifDefined(undefined) : candidate.item.getActionState()}>
					<div slot="illustration" class="d2l-activitiy-collection-list-item-illustration">
						${this._renderCourseImageSkeleton()}
						<d2l-organization-image
							class="d2l-activitiy-collection-organization-image"
							href="${candidate.itemSelf}"
							@d2l-organization-image-loaded="${() => this._onListImageLoaded(this._organizationImageChunk[candidate.itemSelf])}"
							?hidden="${!this._loadedImages[this._organizationImageChunk[candidate.itemSelf]].allLoaded}">
						</d2l-organization-image>
					</div>
					<d2l-list-item-content>
						${candidate.organization.name()}
						<div slot="secondary" class="d2l-list-item-secondary">${candidate.alreadyAdded ? html`${this.localize('alreadyAdded')}` : null}</div>
					</d2l-list-item-content>
				</d2l-list-item>
			`;
		});
		return html`<d2l-list @d2l-list-selection-change=${this.handleSelectionChange}>${items}</d2l-list>`;
	}

	_renderCourseImageSkeleton() {
		return html`
			<svg viewBox="0 0 180 77" width="100%" slot="illustration" class="d2l-activity-collection-image-skeleton">
				<rect x="0" width="100%" y="0" height="100%" stroke="none" class="d2l-activity-collection-skeleton-rect"></rect>
			</svg>
		`;
	}

	_renderItemListSkeleton(numberOfItems) {
		const itemsSkeleton = html`
			<d2l-list-item>
				${this._renderCourseImageSkeleton()}
				<d2l-list-item-content>
					<svg width="100%" class="d2l-activity-collection-body-compact-skeleton-svg">
						<rect x="0" width="40%" y="0" height="100%" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect"></rect>
					</svg>
					<div slot="secondary">
						<svg width="100%" class="d2l-activity-collection-body-small-skeleton-svg">
							<rect x="0" width="30%" y="0" height="100%" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect"></rect>
						</svg>
					</div>
				</d2l-list-item-content>
				<d2l-button-icon slot="actions" icon="d2l-tier1:close-default" disabled>
			</d2l-list-item>
		`;
		return html`<d2l-list>${(new Array(numberOfItems)).fill(itemsSkeleton)}</d2l-list>`;
	}

	_renderCandidates() {
		this.updateComplete.then(() => {
			this._currentCandidateElement = this.shadowRoot.querySelector('.d2l-add-activity-dialog d2l-list');
		});
		const candidates = this._handleFirstLoad(this._renderCandidateItems.bind(this),
			() => {
				this._currentCandidateElement && this._currentCandidateElement.querySelectorAll('d2l-list-item').forEach(element => element.toggleAttribute('disabled', true));
				return html`
					<div class="d2l-add-activity-dialog-list-disabled">
						${this._currentCandidateElement}
					</div>
					<d2l-loading-spinner size="100"></d2l-loading-spinner>
				`;
			},
			this._candidateFirstLoad,
			this._candidateLoad
		);

		const loadMore = this._actionCollectionEntity && this._actionCollectionEntity.getNextAction() && !this._isLoadingMore
			? html`<d2l-button @click=${this.loadMore}>${this.localize('loadMore')}</d2l-button>`
			: this._isLoadingMore
				? html`<d2l-loading-spinner size="85"></d2l-loading-spinner>`
				: null;

		const spaceKeyDown = 32;
		const spaceKeyEnter = 13;
		const selectedNav = this._selectionCount > 0
			? html`
				${this.localize('selected', 'count', this._selectionCount)}
				<d2l-link
					tabindex="0"
					role="button"
					@click=${this.clearAllSelected}
					@keydown="${(e) => (e.keyCode === spaceKeyDown || e.keyCode === spaceKeyEnter) && this.clearAllSelected()}">
						${this.localize('clearSelected')}
				</d2l-link>
			`
			: null;

		return html`
			<div class="dialog-div">
				<d2l-dialog id="dialog" title-text="${this.localize('browseActivityLibrary')}" @d2l-dialog-close=${this.clearDialog}>
					<div class="d2l-add-activity-dialog" aria-live="polite" aria-busy="${this._candidateItemsLoading}">
						<div class="d2l-add-activity-dialog-header">
							<div>
								<d2l-input-search label="${this.localize('search')}" @d2l-input-search-searched=${this.handleSearch}></d2l-input-search>
							</div>
							<div class="d2l-add-activity-dialog-selection-count">${selectedNav}</div>
						</div>
						${candidates}
						<div class="d2l-add-activity-dialog-load-more">
							${loadMore}
						</div>
					</div>

					<d2l-button slot="footer" primary dialog-action="add" @click=${this.addActivities} ?disabled="${!this._selectionCount}">${this.localize('add')}</d2l-button>
					<d2l-button slot="footer" dialog-action>${this.localize('cancel')}</d2l-button>
				</d2l-dialog>
			</div>
		`;
	}

	_onListImageLoaded(imageChunk) {
		this._loadedImages[imageChunk].loaded++;
		if (!this._loadedImages[imageChunk].allLoaded && this._loadedImages[imageChunk].total && this._loadedImages[imageChunk].loaded >= this._loadedImages[imageChunk].total) {
			this._loadedImages[imageChunk].allLoaded = true;
			this.requestUpdate('_loadedImages', []);
		}
	}

	_titleChanged(e) {
		e.target.value = e.target.value.trim() !== '' ? e.target.value : this.localize('untitledLearningPath');
		this._specialization.setName && this._specialization.setName(e.target.value);
	}

	_descriptionChanged(e) {
		this._specialization.setDescription && this._specialization.setDescription(e.target.value);
	}
}
customElements.define('d2l-activity-collection-editor', CollectionEditor);
