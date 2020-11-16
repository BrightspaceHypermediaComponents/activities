import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/list/list-item-content';
import '../d2l-activity-date/d2l-activity-date';
import 'd2l-organizations/components/d2l-organization-name/d2l-organization-name';
import 'd2l-organizations/components/d2l-organization-info/d2l-organization-info';

import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { ActivityAllowList } from './env';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { ifDefined } from 'lit-html/directives/if-defined';
import { ListItemLinkMixin } from '@brightspace-ui/core/components/list/list-item-link-mixin';
import { ListItemMixin } from '@brightspace-ui/core/components/list/list-item-mixin';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { nothing } from 'lit-html';

class ActivityListItemBasic extends ListItemLinkMixin(ListItemMixin(EntityMixinLit(LocalizeMixin(LitElement)))) {

	static get properties() {
		return {
			_hasDate: { type: Boolean },
			_hasOrgCode: { type: Boolean },
			_icon: { type: String },
			_organizationHref: { type: String },
		};
	}

	static get styles() {
		return [
			super.styles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				:hover #d2l-activity-icon,
				:hover #d2l-organization-name {
					color: var(--d2l-color-celestine);
				}
				#d2l-activity-icon {
					margin-top: 0.2rem;
				}
				#d2l-organization-name {
					color: var(--d2l-color-ferrite);
				}
				#d2l-icon-bullet {
					color: var(--d2l-color-tungsten);
					margin-left: -0.15rem;
					margin-right: -0.15rem;
				}
				#content-bottom-container {
					color: var(--d2l-color-tungsten);
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
		this._hasDate = usage.dueDate() || usage.endDate() ? true : false;
		this._icon = this._getActivityIcon(usage._entity);
		this._organizationHref = usage.organizationHref();
	}

	render() {
		const secondaryTemplateFactory = (href, token, orgHref) => {
			if (!href || !token || !orgHref) {
				return nothing;
			}
			const dateTemplate = html`<d2l-activity-date href="${href}" token="${token}"></d2l-activity-date>`;

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

			const separatorTemplate = this._hasDate && this._hasOrgCode
				? html `<d2l-icon id="d2l-icon-bullet" icon="tier1:bullet"></d2l-icon>`
				: nothing;

			return html`
				${dateTemplate}
				${separatorTemplate}
				${orgCodeTemplate}`;
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
							id="d2l-organization-name"
							href="${ifDefined(this._organizationHref)}"
							.token="${ifDefined(this.token)}">
						</d2l-organization-name>
					</div>
					<div id="content-bottom-container" slot="secondary">
						${secondaryTemplateFactory(this.href, this.token, this._organizationHref)}
					</div>
				</d2l-list-item-content>
			`
		});
	}

	_getActivityIcon(entity) {
		if (!entity || !entity.class) {
			return;
		}

		for (const allowed in ActivityAllowList) {
			if (entity.hasClass(ActivityAllowList[allowed].class)) {
				return ActivityAllowList[allowed].icon;
			}
		}

		return ActivityAllowList.userAssignmentActivity.icon;
	}
}
customElements.define('d2l-work-to-do-activity-list-item-basic', ActivityListItemBasic);
