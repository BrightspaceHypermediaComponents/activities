import { css, html, LitElement } from 'lit-element/lit-element.js';
import { repeat } from 'lit-html/directives/repeat';
import { heading1Styles, heading4Styles, bodyCompactStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';
import { classes as organizationClasses } from 'siren-sdk/src/organizations/OrganizationEntity.js';
import { NamedEntityMixin } from 'siren-sdk/src/entityAddons/named-entity-mixin.js';
import { DescribableEntityMixin } from 'siren-sdk/src/entityAddons/describable-entity-mixin.js';
import { SimpleEntity } from 'siren-sdk/src/es6/SimpleEntity.js';
import { ActionCollectionEntity } from 'siren-sdk/src/activities/ActionCollectionEntity.js';
import { performSirenAction } from 'siren-sdk/src/es6/SirenAction.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/link/link.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui/core/components/list/list-item-content.js';
import '@brightspace-ui/core/components/inputs/input-search.js';
import 'd2l-organizations/components/d2l-organization-image/d2l-organization-image.js';
import '@brightspace-ui-labs/edit-in-place/d2l-labs-edit-in-place.js';
import '../d2l-activity-editor/d2l-activity-visibility-editor.js';

class CollectionEditor extends EntityMixinLit(LitElement) {

	constructor() {
		super();
		this._items = [];
		this._candidateItems = [];
		this._specialization = {};
		this._setEntityType(ActivityUsageEntity);
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
		let hasACollection = false;
		usage.onActivityCollectionChange((collection, error) => {
			if (error) {
				return;
			}
			hasACollection = true;
			const items = [];
			let itemsLoadedOnce = false;
			collection.onItemsChange((item, index) => {
				item.onActivityUsageChange((usage) => {
					usage.onOrganizationChange((organization) => {
						items[index] = organization;
						items[index].removeItem = () => collection.removeItem(item.self());
						if (itemsLoadedOnce) {
							this._items = items;
						}
					});
				});
			});

			collection.subEntitiesLoaded().then(() => {
				this._items = items;
				itemsLoadedOnce = true;
			});
			this._addExistingAction = collection._entity.getActionByName('start-add-existing-activity');
		});

		usage.subEntitiesLoaded().then(() => {
			if (!hasACollection) {
				this._items = [];
			}
		});
	}

	async getCandidates(action, fields = null, clearList = false) {
		const resp = await performSirenAction(this.token, action, fields, true);
		this._actionCollectionEntity = new ActionCollectionEntity(resp, this._token, null);
		if (clearList) {
			this._candidateItems = [];
		}
		this._actionCollectionEntity._items().forEach(item => {
			item.onActivityUsageChange(async usage => {
				usage.onOrganizationChange((organization) => {
					const alreadyAdded = this._items.findIndex(item => item.self() === organization.self()) >= 0;
					this._candidateItems.push({ item, organization, alreadyAdded });
					if (this._candidateItems.length >= this._actionCollectionEntity._items().length) {
						this.requestUpdate('_candidateItems', []);
					}
				});
			});
		});
	}

	async addActivities() {
		const addAction = this._actionCollectionEntity.getExecuteMultipleAction();
		const keys = this.shadowRoot.querySelector('d2l-dialog d2l-list').getSelectionInfo().keys;
		const fields = [{ name: 'actionStates', value: keys }];
		await performSirenAction(this.token, addAction, fields, true);
	}

	handleSearch(event) {
		const searchAction = this._actionCollectionEntity.getSearchAction();
		const fields = [{ name: 'collectionSearch', value: event.detail.value }];
		this.clearAllSelected();
		this.getCandidates(searchAction, fields, true);
	}

	handleSelectionChange() {
		this._selectionCount = this.shadowRoot.querySelector('d2l-dialog d2l-list').getSelectionInfo().keys.length;
	}

	clearAllSelected() {
		const items = this.shadowRoot.querySelectorAll('d2l-dialog d2l-list d2l-list-item');
		items.forEach(item => item.setSelected(false, false));
	}

	clearDialog() {
		this.clearAllSelected();
		this.shadowRoot.querySelector('.d2l-add-activity-dialog-header d2l-input-search').value = '';
	}

	loadMore() {
		this.getCandidates(this._actionCollectionEntity.getNextAction());
	}

	async open() {
		this.getCandidates(this._addExistingAction, null, true);
		await this.shadowRoot.querySelector('d2l-dialog').open();
	}

	static get properties() {
		return {
			_actionCollectionEntity: { type: Object },
			_addExistingAction: { type: Object },
			_candidateItems: { type: Array },
			_description: { type: String },
			_items: { type: Array },
			_name: { type: String },
			_selectionCount: { type: Number },
			_specialization: { type: Object }
		};
	}

	static get styles() {
		return [ heading1Styles, heading4Styles, bodyCompactStyles, labelStyles, css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			.d2l-activity-collection-base-info {
				display: flex;
				justify-content: space-between;
			}
			.d2l-activity-collection-body {
				padding: 15px 6px;
				background-color: var(--d2l-color-regolith);
				height: 100%;
			}
			.d2l-activity-collection-header {
				box-shadow: inset 0 -1px 0 0 var(--d2l-color-gypsum);
				padding: 15px 30px;
				overflow:hidden;
			}
			.d2l-activity-collection-title-header {
				margin: 6px 0px 0px 0px;
				min-height: 52px;
				padding: 0px 6px 6px 0px;
			}
			.d2l-activity-collection-toggle-container {
				display: flex;
				align-self: flex-start;
				margin: 0.55rem 1.5rem;
			}
			.d2l-activity-visbility-label {
				white-space: nowrap;
			}
			.d2l-add-activity-dialog {
				min-height: 500px;
			}
			.d2l-add-activity-dialog-header {
				display: flex;
				align-items: baseline;
				padding-bottom: 10px;
				justify-content: space-between;
			}
			.d2l-add-activity-dialog-load-more {
				padding-top: 10px;
			}
			.d2l-add-activity-dialog-selection-count {
				color: var(--d2l-color-ferrite);
				font-size: 16px;
			}
			.d2l-list-item-secondary {
				color: var(--d2l-color-olivine-minus-1);
				font-size: 14px;
			}
		` ];
	}

	render() {
		const items = repeat(this._items, (item) => item.self(), item =>
			html`
			<d2l-list-item>
				<d2l-organization-image href=${item.self()} slot="illustration"></d2l-organization-image>
				<d2l-list-item-content>
					${item.name()}
					<div slot="secondary">${item.hasClass(organizationClasses.courseOffering) ? 'Course' : null}</div>
				</d2l-list-item-content>
				<d2l-button-icon slot="actions" text="Remove Course" icon="d2l-tier1:close-default" @click=${item.removeItem}>
			</d2l-list-item>
			`
		);

		const candidates = repeat(this._candidateItems, (candidate) => candidate.item.getActionState(), candidate =>
			html`
			<d2l-list-item ?selectable=${!candidate.alreadyAdded} key=${candidate.item.getActionState()}>
				<d2l-organization-image href=${candidate.organization.self()} slot="illustration"></d2l-organization-image>
				<d2l-list-item-content>
					${candidate.organization.name()}
					<div slot="secondary" class="d2l-list-item-secondary">${candidate.alreadyAdded ? html`Already added` : html``}</div>
				<d2l-list-item-content>
			</d2l-list-item>
			`
		);

		const selectedNav = this._selectionCount > 0 ?
			html`${this._selectionCount} selected. <d2l-link @click=${this.clearAllSelected}>Clear Selection</d2l-link>` :
			html``;

		return html`
			<div class="d2l-activity-collection-header">
				<div>Edit Learning Path</div>
				<div class="d2l-activity-collection-base-info">
					<div>
						<h1 class="d2l-heading-1 d2l-activity-collection-title-header">
							<d2l-labs-edit-in-place size="49" placeholder="Untitled Learning Path" maxlength="128" value="${this._name}" @change=${this._titleChanged}></d2l-labs-edit-in-place>
						</h1>
						<div class="d2l-body-compact">
							<d2l-labs-edit-in-place size="49" placeholder="Enter a description" maxlength="280" value="${this._description}" @change=${this._descriptionChanged}></d2l-labs-edit-in-place>
						</div>
					</div>
					<d2l-activity-visibility-editor class="d2l-activity-collection-toggle-container" ?disabled="${!this._items.length}" .href="${this.href}" .token="${this.token}"></d2l-activity-visibility-editor>
				</div>
			</div>
			<div class="d2l-activity-collection-body">
				<d2l-button @click="${this.open}" primary>Add Activity</d2l-button>
				<div class="dialog-div">
				<d2l-dialog id="dialog" title-text="Browse Activity Library" @d2l-dialog-close=${this.clearDialog}>
				  <div class="d2l-add-activity-dialog">
						<div class="d2l-add-activity-dialog-header">
							<div>
								<d2l-input-search label="Search" @d2l-input-search-searched=${this.handleSearch}></d2l-input-search>
							</div>
							<div class="d2l-add-activity-dialog-selection-count">${selectedNav}</div>
						</div>
						<d2l-list @d2l-list-selection-change=${this.handleSelectionChange}>${candidates}</d2l-list>
						<div class="d2l-add-activity-dialog-load-more">
							${this._actionCollectionEntity && this._actionCollectionEntity.getNextAction() ? html`<d2l-button @click=${this.loadMore}>Load More</d2l-button>` :	html``}
						</div>
					</div>

				  <d2l-button slot="footer" primary dialog-action="add" @click=${this.addActivities}>Add</d2l-button>
				  <d2l-button slot="footer" dialog-action>Cancel</d2l-button>
				</d2l-dialog>
				</div>
				<div class="d2l-activity-collection-activities">
					<d2l-list>${items}</d2l-list>
				</div>
			</div>
		`;
	}

	_titleChanged(e) {
		this._specialization.setName && this._specialization.setName(e.target.value);
	}

	_descriptionChanged(e) {
		this._specialization.setDescription && this._specialization.setDescription(e.target.value);
	}
}
customElements.define('d2l-activity-collection-editor', CollectionEditor);
