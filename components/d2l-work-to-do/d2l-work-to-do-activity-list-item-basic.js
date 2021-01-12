import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/list/list-item-content';
import '../d2l-activity-date/d2l-activity-date';
import '../d2l-quick-eval-widget/d2l-quick-eval-widget-submission-icon';

import { css, html, LitElement } from 'lit-element/lit-element';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { ActivityAllowList } from './env';
import { classMap } from 'lit-html/directives/class-map';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { fetchEntity } from './state/fetch-entity';
import { ListItemLinkMixin } from '@brightspace-ui/core/components/list/list-item-link-mixin';
import { LocalizeWorkToDoMixin } from './localization';
import { nothing } from 'lit-html';
import { QuickEvalActivityAllowList } from '../d2l-quick-eval-widget/env';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin';

class ActivityListItemBasic extends ListItemLinkMixin(SkeletonMixin(EntityMixinLit(LocalizeWorkToDoMixin(LitElement)))) {

	static get properties() {
		return {
			/** entity used for crawling instance properties (e.g. name) */
			_activity: { type: Object },
			/** List of component relevant information related to activityType */
			_activityProperties: { type: Object },
			/** entity associated with ActivityUsageEntity's organization */
			_organization: { type: Object },
			/** href to evaluate all submissions for assignment (for quick-eval widget) */
			evaluateAllHref: {
				attribute: 'evaluate-all-href',
				type: String
			},
			/** number of submissions to evaluate (for quick-eval widget) */
			submissionCount: {
				attribute: 'submission-count',
				type: Number
			}
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
				.d2l-activity-icon-container {
					padding-top: 0.2rem;
				}
				:host([skeleton]) .d2l-activity-icon-container {
					height: 1.3rem;
					width: 1.2rem;
				}
				.d2l-activity-name-container {
					color: var(--d2l-color-ferrite);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.d2l-activity-icon-container.d2l-hovering,
				.d2l-activity-icon-container.d2l-focusing,
				.d2l-activity-name-container.d2l-hovering,
				.d2l-activity-name-container.d2l-focusing {
					--d2l-list-item-content-text-decoration: underline;
					color: var(--d2l-color-celestine);
				}
				.d2l-icon-bullet {
					color: var(--d2l-color-tungsten);
					margin-left: -0.15rem;
					margin-right: -0.15rem;
				}
				.d2l-secondary-content-container {
					color: var(--d2l-color-tungsten);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				[slot="content"] {
					padding: 0.1rem 0;
				}
				d2l-list-item-generic-layout {
					background: transparent;
				}
				#content {
					width: 100%;
				}
				:host([skeleton]) .d2l-activity-name-container {
					bottom: 0.2rem;
					height: 1.2rem;
					top: 0.1rem;
				}
				:host([skeleton]) .d2l-secondary-content-container {
					bottom: 0.1rem;
					height: 0.9rem;
					top: 0.1rem;
				}
			`
		];
	}

	constructor() {
		super();
		this._activity = undefined;
		this._activityProperties = undefined;
		this._organization = undefined;
		this._setEntityType(ActivityUsageEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivityUsageChange(entity);
			super._entity = entity;
		}
	}

	/**
	 * Update component's data to match new entry point entity
	 * @param {ActivityUsageEntity} usage Current target usage entity
	 */
	_onActivityUsageChange(usage) {
		this._usage = usage;
		this._loadActivity();
		this._loadOrganization();
	}

	render() {
		if (!this.href || !this.token) {
			return nothing;
		}

		const iconClasses = {
			'd2l-activity-icon-container': true,
			'd2l-focusing': this._focusingLink,
			'd2l-hovering': this._hoveringLink,
			'd2l-skeletize': true,
		};

		const nameClasses = {
			'd2l-activity-name-container': true,
			'd2l-focusing': this._focusingLink,
			'd2l-hovering': this._hoveringLink,
			'd2l-skeletize': true,
			'd2l-skeletize-60': true
		};

		const secondaryClasses = {
			'd2l-secondary-content-container': true,
			'd2l-skeletize': true,
			'd2l-skeletize-75': true,
		};

		const dateTemplate = html `<d2l-activity-date href="${this.href}" .token="${this.token}" format="MMM d" ?hidden=${this.skeleton}></d2l-activity-date>`;

		const separatorTemplate = !this.skeletize && this._date && (this._orgName || this._orgCode)
			? html `<d2l-icon class="d2l-icon-bullet" icon="tier1:bullet"></d2l-icon>`
			: nothing;

		return this._renderListItem({
			illustration: this.submissionCount ? html`
					<d2l-quick-eval-widget-submission-icon style="overflow: visible;"
						class="class=${classMap(iconClasses)}"
						icon=${this._icon}
						submission-count=${this.submissionCount > 99 ? '99+' : this.submissionCount}>
					</d2l-quick-eval-widget-submission-icon>` :
				html`
					<d2l-icon
						class=${classMap(iconClasses)}
						?skeleton=${this.skeleton}
						icon=${this._icon}>
					</d2l-icon>`,
			content: html`
				<d2l-list-item-content id="content">
					<div class=${classMap(nameClasses)}>
						${this._name}
					</div>
					<div class=${classMap(secondaryClasses)} slot="supporting-info">
						${dateTemplate}
						${separatorTemplate}
						${this._orgName || this._orgCode}
					</div>
				</d2l-list-item-content>
			`
		});
	}

	set actionHref(href) {  // This is a hack - Garbage setter function since list-mixin initializes value
		this.requestUpdate('actionHref', this.evaluateAllHref ? this.evaluateAllHref : href);
	}

	/** Link to activity instance for user navigation to complete/work on activity */
	get actionHref() {
		if (!this._started || this.skeleton) {
			return '';
		}

		if (this._activity && this._activity.hasLinkByType('text/html')) {
			return this._activity.getLinkByType('text/html').href;
		}
		else if (this.evaluateAllHref) {
			return this.evaluateAllHref;
		}
		else {
			return '';
		}
	}

	/** Due or end date of activity */
	get _date() {
		return this._usage && !this.skeleton
			? this._usage.dueDate() || this._usage.endDate()
			: '';
	}

	/** Indicates if activity start date is in the past */
	get _started() {
		return this._usage && this._usage.startDate()
			? new Date(this._usage.startDate()) < new Date()
			: true;
	}

	/** String associated with icon catalogue for provided activity type */
	get _icon() {
		return this._activityProperties && !this.skeleton
			? this._activityProperties.icon
			: '';

	}

	/** Specific name of the activity */
	get _name() {
		return this._activity && this._activity.hasProperty('name') && !this.skeleton
			? this._activity.properties.name
			: this._activityProperties && !this.skeleton
				? this.localize(this._activityProperties.type)
				: '';
	}

	/** Organization code of the activity's associated organization */
	get _orgCode() {
		return this._organization && this._organization.hasProperty('code') && !this.skeleton
			? this._organization.properties.code
			: '';
	}

	/** Name of the activity's associated organization */
	get _orgName() {
		return this._organization && this._organization.hasProperty('name') && !this.skeleton
			? this._organization.properties.name
			: '';
	}

	/**
	 * Load usage's associated activity entity.
	 * @async
	 */
	async _loadActivity() {
		if (!this._usage || !this._usage._entity || !this._usage._entity.class) {
			return;
		}

		const entity = this._usage._entity;
		const allowList =  this.evaluateAllHref ? QuickEvalActivityAllowList : ActivityAllowList;

		for (const allowed in allowList) {
			if (entity.hasClass(allowList[allowed].class)) {
				this._activityProperties = allowList[allowed];
				const source = (
					entity.hasLinkByRel(allowList[allowed].rel)
					&& entity.getLinkByRel(allowList[allowed].rel)
					|| {}).href;
				if (source) {
					await fetchEntity(source, this.token)
						.then((sirenEntity) => {
							if (sirenEntity) {
								this._activity = sirenEntity;
							}
						});
				}
			}
		}
	}

	/**
	 * Load usage's organization entity.
	 * @async
	 */
	async _loadOrganization() {
		if (!this._usage) return;

		const organizationHref = this._usage.organizationHref();
		if (organizationHref) {
			await fetchEntity(organizationHref, this.token)
				.then((organization) => {
					this._organization = organization;
				});
		}
	}
}
customElements.define('d2l-work-to-do-activity-list-item-basic', ActivityListItemBasic);
