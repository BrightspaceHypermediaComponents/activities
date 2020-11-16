import '@brightspace-ui/core/components/button/button-icon';
import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/list/list-item-content';
import '../d2l-activity-date/d2l-activity-date';
import 'd2l-organizations/components/d2l-organization-name/d2l-organization-name';
import 'd2l-organizations/components/d2l-organization-info/d2l-organization-info';

import { bodyCompactStyles, bodySmallStyles, heading3Styles } from '@brightspace-ui/core/components/typography/styles';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { ActivityAllowList } from './env';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { ifDefined } from 'lit-html/directives/if-defined';
import { ListItemLinkMixin } from '@brightspace-ui/core/components/list/list-item-link-mixin';
import { ListItemMixin } from '@brightspace-ui/core/components/list/list-item-mixin';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { nothing } from 'lit-html';

class ActivityListItemDetailed extends ListItemLinkMixin(ListItemMixin(EntityMixinLit(LocalizeMixin(LitElement)))) {

	static get properties() {
		return {
			_hasOrgCode: { type: Boolean },
			_icon: { type: String },
			_organizationHref: { type: String },
			_type: { type: String },
		};
	}

	static get styles() {
		return [
			super.styles,
			bodyCompactStyles,
			bodySmallStyles,
			heading3Styles,
			css`
				:host {
					display: block;
					padding: 0 2.1rem 0 2.1rem;
				}
				:host([hidden]) {
					display: none;
				}
				:hover #d2l-activity-icon,
				:hover #content-top-container {
					color: var(--d2l-color-celestine);
				}
				#d2l-activity-icon {
					margin-right: 2.1rem;
					margin-top: 0.3rem;
				}
				:host([dir="rtl"]) #d2l-activity-icon {
					margin-left: 2.1rem;
					margin-right: 0;
				}
				#d2l-icon-bullet {
					color: var(--d2l-color-tungsten);
					margin-left: -0.15rem;
					margin-right: -0.15rem;
				}
				#content-top-container {
					color: var(--d2l-color-ferrite);
					margin-bottom: -0.1rem;
				}
				#content-supporting-info-container {
					-webkit-box-orient: vertical;
					color: var(--d2l-color-ferrite);
					display: block;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					margin: 6px 0;
					max-width: inherit;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				d2l-button-icon {
					margin: auto 0;
				}
			`
		];
	}

	static async getLocalizeResources(langs) {
		for await (const lang of langs) {
			let translations;
			switch (lang) {
				case 'en':
					translations = await import('./lang/en');
					break;
			}

			if (translations && translations.val) {
				return {
					language: lang,
					resources: translations.val
				};
			}
		}

		return null;
	}

	constructor() {
		super();
		this._hasDate = false;
		this._hasOrgCode = false;
		this._icon = ActivityAllowList.userAssignmentActivity.icon;
		this._type = '';
		this._setEntityType(ActivityUsageEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivityUsageChange(entity);
			super._entity = entity;
		}
	}

	_onActivityUsageChange(usage) {
		this.actionHref = usage.userActivityUsageHref();
		this._organizationHref = usage.organizationHref();
		this._getActivityType(usage._entity);
	}

	render() {
		const secondaryTemplateFactory = (href, token, orgHref) => {
			if (!href || !token || !orgHref) {
				return nothing;
			}

			const orgCodeTemplate = html`
				<d2l-organization-info
					href="${orgHref}"
					.token="${token}"
					show-organization-code
					@d2l-organization-accessible=${(e) => _handleOrgInfoChange(e)}>
				</d2l-organization-info>`;

			// TODO If you need to go deeper into the tree, just use siren-sdk to do so -> events can lead to race conditions
			const _handleOrgInfoChange = (e) => {
				this._hasOrgCode = !e || !e.detail || !e.detail.organization || !e.detail.organization.code
					? false
					: e.detail.organization.code && e.detail.organization.code.length > 0 ? true : false;

				if (this._hasOrgCode) {
					this.shadowRoot.querySelector('d2l-organization-info')
						.shadowRoot.querySelector('.d2l-organization-code')
						.style.textTransform = 'none';
				}
			};

			const separatorTemplate = this._type && this._hasOrgCode
				? html `<d2l-icon id="d2l-icon-bullet" icon="tier1:bullet"></d2l-icon>`
				: nothing;

			return html`
				${orgCodeTemplate}
				${separatorTemplate}
				${this._type}`;
		};

		const activityIconTemplate = this._icon
			? html` <d2l-icon id="d2l-activity-icon" icon=${this._icon}></d2l-icon>`
			: nothing;

		return this._renderListItem({
			illustration: activityIconTemplate,
			content: html`
				<d2l-list-item-content id="content">
					<div id="content-top-container">
						<d2l-organization-name
							class="d2l-heading-3"
							href="${ifDefined(this._organizationHref)}"
							.token="${ifDefined(this.token)}">
						</d2l-organization-name>
					</div>
					<div id="content-secondary-container" slot="secondary" class="d2l-body-small">
						${secondaryTemplateFactory(this.href, this.token, this._organizationHref)}
					</div>
					<div id="content-supporting-info-container" slot="supporting-info" class="d2l-body-compact">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
					</div>
				</d2l-list-item-content>
			`,
		});
	}

	_getActivityType(entity) {
		if (!entity || !entity.class) {
			return;
		}

		for (const allowed in ActivityAllowList) {
			if (entity.hasClass(ActivityAllowList[allowed].class)) {
				this._icon = ActivityAllowList[allowed].icon;
				this._type = ActivityAllowList[allowed].type;
			}
		}
	}
}
customElements.define('d2l-work-to-do-activity-list-item-detailed', ActivityListItemDetailed);
