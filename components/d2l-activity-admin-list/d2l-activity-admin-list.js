import { css, html, LitElement } from 'lit-element/lit-element.js';
import { heading1Styles, bodyStandardStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ActivityUsageCollectionEntity } from 'siren-sdk/src/activities/ActivityUsageCollectionEntity.js';
import {ifDefined} from 'lit-html/directives/if-defined';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import 'd2l-organizations/components/d2l-organization-image/d2l-organization-image.js';

class AdminList extends EntityMixinLit(LitElement) {
	constructor() {
		super();
		this._items = [];
		this._setEntityType(ActivityUsageCollectionEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivityUsageCollectionChanged(entity);
			super._entity = entity;
			this.requestUpdate();
		}
	}

	_onActivityUsageCollectionChanged(collection) {
		this._items = [];
		collection.onItemsChange((item, index) => {
			item.onActivityUsageChange((usage) => {
				usage.onOrganizationChange((organization) => {
					this._items[index] = {usage, organization};
					this.requestUpdate();
				});
			});
		});
	}

	static get properties() {
		return {
			'title-text': {
				type: String
			},
			_items: {
				type: Array
			}
		};
	}

	static get styles() {
		return [
			heading1Styles,
			bodyStandardStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-activity-admin-list-content-container {
					display: flex;
					justify-content: center;
				}
				.d2l-activity-admin-list-content {
					box-sizing: border-box;
					max-width: 1230px;
					padding: 0 30px;
					width: 100%;
				}

				.d2l-activity-admin-list-header-container {
					border-bottom: solid 1px var(--d2l-color-gypsum);
					box-sizing: border-box;
					height: 96px;
					width: 100%;
				}
				.d2l-activity-admin-list-header {
					align-items: center;
					display: flex;
					justify-content: space-between;
				}

				.d2l-activity-admin-list-body-container {
					background-color: --var(--d2l-color-regolith);
				}
				.d2l-activity-admin-list-body {
					padding-bottom: 72px;
					padding-top: 72px;
				}
			`
		];
	}

	render() {
		const items = this._items.map(item =>
			html`
			<d2l-list-item href=${ifDefined(item.usage.editHref())}>
				<d2l-organization-image href=${item.organization.self()} .token=${this.token} slot="illustration"></d2l-organization-image>
				<d2l-list-item-content>
					<div>${item.organization.name()}</div>
				</d2l-list-item-content>
			</d2l-list-item>
			`
		);
		return html`
			<div class="d2l-activity-admin-list-content-container d2l-activity-admin-list-header-container">
				<div class="d2l-activity-admin-list-content d2l-activity-admin-list-header">
					<h1 class="d2l-heading-1">${this['title-text']}</h1>
					<d2l-button primary>Create Learning Path</d2l-button>
				</div>
			</div>

			<div class="d2l-activity-admin-list-content-container d2l-activity-admin-list-body-container">
				<div class="d2l-activity-admin-list-content d2l-activity-admin-list-body">
					<d2l-list>${items}</d2l-list>
				</div>
			</div>
		`;
	}
}
customElements.define('d2l-activity-admin-list', AdminList);
