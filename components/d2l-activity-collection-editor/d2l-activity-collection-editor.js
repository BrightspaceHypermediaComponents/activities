import { css, html, LitElement } from 'lit-element/lit-element.js';
import { heading1Styles, heading4Styles, bodyCompactStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';
import { NamedEntityMixin } from 'siren-sdk/src/entityAddons/named-entity-mixin.js';
import { DescribableEntityMixin } from 'siren-sdk/src/entityAddons/describable-entity-mixin.js';
import { SimpleEntity } from 'siren-sdk/src/es6/SimpleEntity.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '@d2l/switch/d2l-switch.js';
import 'd2l-organizations/components/d2l-organization-image/d2l-organization-image.js';
import '@brightspace-ui-labs/edit-in-place/d2l-labs-edit-in-place.js';

class CollectionEditor extends EntityMixinLit(LitElement) {

	constructor() {
		super();
		this._visible = false;
		this._items = [];
		this._setEntityType(ActivityUsageEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivityUsageChange(entity);
			super._entity = entity;
			this.requestUpdate();
		}
	}

	_onActivityUsageChange(usage) {
		usage.onSpecializationChange(NamedEntityMixin(DescribableEntityMixin(SimpleEntity)), (specialization) => {
			this._specialization = specialization;
		});
		this._items = [];
		usage.onActivityCollectionChange((collection => {
			collection.onItemsChange((item, index) => {
				item.onActivityUsageChange((usage) => {
					usage.onOrganizationChange((organization) => {
						this._items[index] = organization;
						this.requestUpdate();
					});
				});
			});
		}));
	}

	static get properties() {
		return {
			_visibile: {
				type: Boolean
			},
			_collection: {
				type: Object
			},
			_specialization: {
				type: Object
			},
			_items: {
				type: Array
			}
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
			.d2l-activity-collection-header {
				box-shadow: inset 0 -1px 0 0 var(--d2l-color-gypsum);
				width: 100%;
				padding: 15px 30px;
			}
			.d2l-activity-collection-title {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.d2l-activity-collection-title-header {
				min-height:52px;
				margin-top:6px;
				margin-bottom:6px;
				margin-right: 6px;
				overflow:hidden;
			}
			.d2l-activity-visbility-label {
				white-space: nowrap;
			}
			.d2l-activity-collection-body {
				padding: 15px 30px;
				background-color: var(--d2l-color-regolith);
				height: 100%;
			}
			.d2l-activity-collection-toggle-container {
				display: flex;
				align-items: center;
			}
		` ];
	}

	_updateVisibility() {
		this._visible = !this._visible;
		this.requestUpdate();
	}

	render() {
		const icon = (this._visible ? 'tier1:visibility-show' : 'tier1:visibility-hide');
		const term = (this._visible ? 'Visible' : 'Hidden');
		const items = this._items.map(item =>
			html`
			<d2l-list-item>
				<d2l-organization-image href=${item.self()} slot="illustration"></d2l-organization-image>
				<d2l-list-item-content>
					${item.name()}
				<d2l-list-item-content>
			</d2l-list-item>
			`
		);

		return html`
			<div class="d2l-activity-collection-header">
				<div>Edit Learning Path</div>
				<div class="d2l-activity-collection-title">
					<h1 class="d2l-heading-1 d2l-activity-collection-title-header">
						<d2l-labs-edit-in-place size="49" placeholder="Untitled Learning Path" maxlength="128" value="${this._specialization.getName()}" @change=${this._TitleChanged}></d2l-labs-edit-in-place>
					</h1>
					<div class="d2l-activity-collection-toggle-container">
						<d2l-switch aria-label="Visibility Toggle" label-right @click="${this._updateVisibility}"></d2l-switch>
						<div class="d2l-label-text d2l-activity-visbility-label"><d2l-icon icon=${icon}></d2l-icon> ${term}</div>
					</div>
				</div>
				<div class="d2l-body-compact">
					<d2l-labs-edit-in-place size="49" placeholder="Enter a description" value="${this._specialization.getDescription()}" @change=${this._DescriptionChanged}></d2l-labs-edit-in-place>
				</div>
			</div>
			<div class="d2l-activity-collection-body">
				<d2l-button primary>Add Activity</d2l-button>
				<div class="d2l-activity-collection-activities">
					<d2l-list>${items}</d2l-list>
				</div>
			</div>
		`;
	}

	_TitleChanged(e) {
		this._specialization.setName(e.target.value);
	}

	_DescriptionChanged(e) {
		this._specialization.setDescription(e.target.value);
	}
}
customElements.define('d2l-activity-collection-editor', CollectionEditor);
