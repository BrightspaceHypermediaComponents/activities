import { css, html } from 'lit-element/lit-element.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { repeat } from 'lit-html/directives/repeat';
import { guard } from 'lit-html/directives/guard';
import { heading1Styles, heading4Styles, bodyCompactStyles, bodyStandardStyles, labelStyles} from '@brightspace-ui/core/components/typography/styles.js';
import { classes as organizationClasses } from 'siren-sdk/src/organizations/OrganizationEntity.js';
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
import '../d2l-activity-editor/d2l-activity-visibility-auto-editor.js';
import { getLocalizeResources } from './localization.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { MobxMixin } from './mixins/MobxMixin.js';
import { Collection } from './state/Collection.js';

const baseUrl = import.meta.url;
class CollectionEditor extends MobxMixin(LocalizeMixin(MobxLitElement)) {

	constructor() {
		super();
		this.ariaBusy = 'true';
		this.role = 'main';
		this._currentSelection = {};
		this._currentDeleteItemName = '';
		this._dialogOpen = false;
		this._isLoadingMore = false;
		this._rerenderCandidates = true;

		// any observables in the this state accessed
		// in render() will trigger updates
		this._setStateType(Collection);
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

	async getCandidates(action, fields = null, clearList = false) {
		this._candidateItemsLoading = true;
		if (clearList) {
			this._rerenderCandidates = true;
		}
		await this._state.fetchCandidates(action, fields, clearList);
		this._candidateItemsLoading = false;
		this._rerenderCandidates = false;
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, baseUrl);
	}

	handleSelectionChange(e) {
		this._currentSelection[e.detail.key] = e.detail.selected;
		this._selectionCount = this._selectedActivities().length;
	}

	async loadMore() {
		this._isLoadingMore = true;
		this._rerenderCandidates = false;
		const lastItem = this.shadowRoot.querySelector('d2l-dialog d2l-list d2l-list-item:last-of-type');
		await this.getCandidates(this._state._actionCollectionEntity.getNextAction());
		this._isLoadingMore = false;
		await this.updateComplete;
		lastItem.nextElementSibling.focus();
	}

	async open() {
		if (this._reloadOnOpen) {
			this.getCandidates(this._state._addExistingAction, null, true);
			this._reloadOnOpen = false;
		}
		await this.shadowRoot.querySelector('d2l-dialog').open();
	}

	static get properties() {
		return {
			_selectionCount: { type: Number },
			_candidateItemsLoading: {type: Boolean},
			_isLoadingMore: {type: Boolean},
			ariaBusy: { type: String, reflect: true, attribute: 'aria-busy' },
			ariaLive: { type: String, reflect: true, attribute: 'aria-live' },
			role: { type: String, reflect: true, attribute: 'role' }
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
				fill: var(--d2l-color-sylvite);
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
		const learningPathTitleSkeleton = html`
			<div class="d2l-activity-collection-title-header d2l-activity-collection-header-1-skeleton">
				<svg width="100%" class="d2l-activity-collection-header-1-skeleton-svg">
					<rect x="0" width="70%" y="0" height="100%" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect"></rect>
				</svg>
			</div>
		`;

		const learningPathTitle = this._state.isLoaded ? html`
				<h1 class="d2l-heading-1 d2l-activity-collection-title-header">
					<d2l-labs-edit-in-place
						size="49"
						placeholder="${this.localize('untitledLearningPath')}"
						maxlength="128"
						value="${this._state.name}"
						@change=${this._titleChanged}>
					</d2l-labs-edit-in-place>
				</h1>
		` : learningPathTitleSkeleton;

		const learningPathDescriptionSkeleton = html`
			<div class="d2l-activity-collection-description d2l-activity-collection-body-compact-skeleton">
				<svg width="100%" height="100%">
					<rect x="0" width="100%" y="6" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect d2l-activity-collection-body-compact-skeleton-svg"></rect>
					<rect x="0" width="100%" y="30" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect d2l-activity-collection-body-compact-skeleton-svg"></rect>
					<rect x="0" width="80%" y="54" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect d2l-activity-collection-body-compact-skeleton-svg"></rect>
				</svg>
			</div>
		`;
		const learningPathDescription = this._state.isLoaded ? html`
			<div class="d2l-body-compact d2l-activity-collection-description">
				<d2l-labs-edit-in-place
					size="49"
					placeholder="${this.localize('enterADescription')}"
					maxlength="280"
					value="${this._state.description}"
					@change=${this._descriptionChanged}>
				</d2l-labs-edit-in-place>
			</div>
		` : learningPathDescriptionSkeleton;

		const learningPathVisibilitySkeleton = html`
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

		const learningPathVisibilityToggle = this._state.isLoaded ? html`
			<d2l-activity-visibility-auto-editor class="d2l-activity-collection-toggle-container" ?disabled="${!this._state.activities.length}" .href="${this.href}" .token="${this.token}"></d2l-activity-visibility-auto-editor>
			<d2l-button-icon
				class="d2l-activity-collection-toggle-container-button"
				?disabled="${!this._state.canEditDraft || this.disabled}"
				@click="${this._toggleVisibility}"
				icon=${this._state.isVisible ? 'tier1:visibility-show' : 'tier1:visibility-hide'}>
			</d2l-button-icon>
		` : learningPathVisibilitySkeleton;

		const addActivityButton = this._state.isLoaded ? html`
			<d2l-button @click="${this.open}" primary>${this.localize('addActivity')}</d2l-button>
		` : html`
			<svg viewBox="0 0 142 42" width="142" height="42" class="d2l-activity-collection-list-actions-skeleton">
				<rect x="0" width="142" y="0" height="42" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect"></rect>
			</svg>
		`;

		const activityCount = this._state.isLoaded ? html`
			<div class="d2l-body-compact">${this.localize('numberOfActivities', 'count', this._state.activities.length)}</div>
		` : html`
			<svg width="90" class="d2l-activity-collection-body-compact-skeleton-svg d2l-activity-collection-list-actions-skeleton">
				<rect x="0" width="100%" y="0" height="100%" stroke="none" rx="4" class="d2l-activity-collection-skeleton-rect"></rect>
			</svg>
		`;

		const activitiesList = this._state.isLoaded ?
			this._renderItemList()
			: html`${this._renderItemListSkeleton(3)}`;

		return html`
			<div class="d2l-activity-collection-header">
				<div class="d2l-activity-collection-header-content">
					<div class="d2l-heading-4 d2l-activity-collection-sub-header">${this.localize('editLearningPath')}</div>
					<div class="d2l-activity-collection-base-info">
						<div class="d2l-activity-collection-header-col1" style="position: relative">
							${guard([this._state.isLoaded], () => html`
								${learningPathTitle}
								${learningPathDescription}
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
						${activitiesList}
					</div>
					<d2l-alert-toast id="delete-succeeded-toast" type="default" announce-text=${this.localize('deleteSucceeded', 'activityName', this._currentDeleteItemName)}>
						${this.localize('deleteSucceeded', 'activityName', this._currentDeleteItemName)}
					</d2l-alert-toast>
				</div>
			</div>
			${this._renderCandidates()}
		`;
	}

	_renderItemList() {
		if (this._state.activities.length <= 0) {
			return html`<div class="d2l-activity-collection-no-activity d2l-body-standard">${this.localize('noActivitiesInLearningPath')}</div>`;
		}

		const items = repeat(this._state.activities, (item) => item.self(), item => {
			return html`
				<d2l-list-item>
					<div slot="illustration" class="d2l-activitiy-collection-list-item-illustration">
						${this._renderCourseImageSkeleton()}
						<d2l-organization-image
							class="d2l-activitiy-collection-organization-image"
							href=${item.self()}
							.token=${this.token}
							@d2l-organization-image-loaded="${() => this._onListImageLoaded(this._state._organizationImageChunk[item.itemSelf])}"
							?hidden="${!this._state._loadedImages[this._state._organizationImageChunk[item.itemSelf]].allLoaded}">
						</d2l-organization-image>
					</div>
					<d2l-list-item-content>
						${item.name()}
						<div slot="secondary">${item.hasClass(organizationClasses.courseOffering) ? this.localize('course') : null}</div>
					</d2l-list-item-content>
					<d2l-button-icon slot="actions" text="${this.localize('removeActivity', 'courseName', item.name())}" icon="d2l-tier1:close-default" @click=${() => this.removeItem(item)}>
				</d2l-list-item>
			`;
		});

		return html`<d2l-list>${items}</d2l-list>`;
	}

	_renderCandidateItems() {
		if (this._state.candidates.length <= 0) {
			return html`<div class="d2l-activity-collection-no-activity d2l-body-standard">${this.localize('noActivitiesFound')}</div>`;
		}

		const items = repeat(this._state.candidates, (candidate) => candidate.itemSelf, candidate => {
			return html`
				<d2l-list-item
					selectable
					?disabled=${candidate.alreadyAdded}
					?selected=${candidate.alreadyAdded || this._currentSelection[candidate.item.getActionState()]}
					key=${candidate.alreadyAdded ? ifDefined(undefined) : candidate.item.getActionState()}>
					<div slot="illustration" class="d2l-activitiy-collection-list-item-illustration">
						${this._renderCourseImageSkeleton()}
						<d2l-organization-image
							class="d2l-activitiy-collection-organization-image"
							href="${candidate.itemSelf}"
							.token=${this.token}
							@d2l-organization-image-loaded="${() => this._onListImageLoaded(this._state._organizationImageChunk[candidate.itemSelf])}"
							?hidden="${!this._state._loadedImages[this._state._organizationImageChunk[candidate.itemSelf]].allLoaded}">
						</d2l-organization-image>
					</div>
					<d2l-list-item-content>
						${candidate.name}
						<div slot="secondary" class="d2l-list-item-secondary">${candidate.alreadyAdded ? html`${this.localize('alreadyAdded')}` : null}</div>
					</d2l-list-item-content>
				</d2l-list-item>
			`;
		});
		return html`<d2l-list @d2l-list-selection-change=${this.handleSelectionChange}>${items}</d2l-list>`;
	}

	_renderCandidates() {
		if (!this._state.candidatesAreLoaded) {
			this.updateComplete.then(() => {
				this._currentCandidateElement = this.shadowRoot.querySelector('.d2l-add-activity-dialog d2l-list');
				this._currentCandidateElement && this._currentCandidateElement.querySelectorAll('d2l-list-item').forEach(element => element.toggleAttribute('disabled', true));
			});
		}

		const candidates = this._state.candidatesAreLoaded || !this._rerenderCandidates ? this._renderCandidateItems() : html`
			<div class="d2l-add-activity-dialog-list-disabled">
				${this._currentCandidateElement}
			</div>
			<d2l-loading-spinner size="100"></d2l-loading-spinner>
		`;

		const loadMore = this._state._actionCollectionEntity && this._state._actionCollectionEntity.getNextAction() && !this._isLoadingMore
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
								<d2l-input-search label="${this.localize('search')}" placeholder=${this.localize('searchPlaceholder')} @d2l-input-search-searched=${this.handleSearch}></d2l-input-search>
							</div>
							<div class="d2l-add-activity-dialog-selection-count">${selectedNav}</div>
						</div>
						${candidates}
						<div class="d2l-add-activity-dialog-load-more">
							${loadMore}
						</div>
					</div>

					<d2l-button
						slot="footer"
						primary
						dialog-action="add"
						@click=${this.addActivities}
						?disabled="${!this._selectionCount}">
						${this.localize('add')}
					</d2l-button>
					<d2l-button slot="footer" dialog-action>${this.localize('cancel')}</d2l-button>
				</d2l-dialog>
			</div>
		`;
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

	_onListImageLoaded(imageChunk) {
		this._state._loadedImages[imageChunk].loaded++;
		if (!this._state._loadedImages[imageChunk].allLoaded && this._state._loadedImages[imageChunk].total && this._state._loadedImages[imageChunk].loaded >= this._state._loadedImages[imageChunk].total) {
			this._state._loadedImages[imageChunk].allLoaded = true;
			this.requestUpdate('_loadedImages', []);
		}
	}

	_selectedActivities() {
		return Object.keys(this._currentSelection).filter((key) => this._currentSelection[key]);
	}

	/* User event handlers */
	_toggleVisibility() {
		this._state.setIsVisible(!this._state.isVisible, true);
	}

	_titleChanged(event) {
		const value = event.target.value.trim() !== '' ? event.target.value : this.localize('untitledLearningPath');
		this._state.setName(value, true);
	}

	_descriptionChanged(event) {
		this._state.setDescription(event.target.value, true);
	}

	async handleSearch(event) {
		this._rerenderCandidates = true;
		await this._state.searchCandidates(event.detail.value);
		this._rerenderCandidates = false;
	}

	async addActivities() {
		this._reloadOnOpen = true;
		const keys = this._selectedActivities();
		await this._state.addActivities(keys);
	}

	removeItem(item) {
		this._reloadOnOpen = true;
		this._currentDeleteItemName = item.name();
		this._state.removeActivity(item);
		this.shadowRoot.querySelector('#delete-succeeded-toast').open = true;
	}
}
customElements.define('d2l-activity-collection-editor', CollectionEditor);
