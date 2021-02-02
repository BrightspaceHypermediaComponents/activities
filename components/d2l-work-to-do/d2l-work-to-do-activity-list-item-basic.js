import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/list/list-item-content';
import '@brightspace-ui/core/components/status-indicator/status-indicator.js';
import '../d2l-activity-date/d2l-activity-date';
import '../d2l-quick-eval-widget/d2l-quick-eval-widget-submission-icon';

import { css, html, LitElement } from 'lit-element/lit-element';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { ActivityAllowList, HideOrgInfoClasses } from './env';
import { classMap } from 'lit-html/directives/class-map';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { fetchEntity } from './state/fetch-entity';
import { ListItemLinkMixin } from '@brightspace-ui/core/components/list/list-item-link-mixin';
import { LocalizeWorkToDoMixin } from './mixins/d2l-work-to-do-localization-mixin';
import { nothing } from 'lit-html';
import { QuickEvalActivityAllowList } from '../d2l-quick-eval-widget/env';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin';
import { WorkToDoTelemetryMixin } from './mixins/d2l-work-to-do-telemetry-mixin';
import { formatDate } from '@brightspace-ui/intl/lib/dateTime';

class ActivityListItemBasic extends ListItemLinkMixin(SkeletonMixin(EntityMixinLit(WorkToDoTelemetryMixin(LocalizeWorkToDoMixin(LitElement))))) {

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
					border-radius: 0 !important;
					padding-top: 0.2rem;
				}
				:host([skeleton]) .d2l-activity-icon-container {
					height: 1.3rem;
					width: 1.2rem;
				}
				.d2l-activity-name-container {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
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
				.d2l-status-container {
					margin-bottom: 0.1rem;
					margin-top: 0.1rem;
				}
				[slot="content"] {
					padding: 0.1rem 0;
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
		Promise.all([
			this._loadActivity(),
			this._loadOrganization()
		]).finally(() => this._onDataLoaded());
	}

	/**
	 * Fire data-loaded event to tell the main component we are ready to render.
	 */
	_onDataLoaded() {
		this.addEventListener('click', this._onItemTriggered.bind(this));
		this.addEventListener('keydown', this._onItemTriggered.bind(this));

		const event = new CustomEvent('data-loaded');
		this.dispatchEvent(event);
	}

	/**
	 * Logs activity navigated telemetry event
	 */
	_onItemTriggered(event) {
		if (event.type === 'keydown' && event.keyCode !== 13 && event.keyCode !== 32) {
			return;
		}

		this.logActivityNavigatedTo(this.actionHref, this._activityProperties && this._activityProperties.type);
	}

	render() {
		if (!this.href || !this.token) {
			return nothing;
		}

		const iconClasses = {
			'd2l-activity-icon-container': true,
			'd2l-skeletize': true,
		};

		const nameClasses = {
			'd2l-activity-name-container': true,
			'd2l-skeletize': true,
			'd2l-skeletize-60': true,
		};

		const secondaryClasses = {
			'd2l-secondary-content-container': true,
			'd2l-skeletize': true,
			'd2l-skeletize-75': true,
		};

		const dateTemplate = html `<d2l-activity-date href="${this.href}" .token="${this.token}" format="MMM d" ?hidden=${this.skeleton}></d2l-activity-date>`;

		const separatorTemplate = !this.skeleton && this._date && (this._orgName || this._orgCode)
			? html `<d2l-icon class="d2l-icon-bullet" icon="tier1:bullet"></d2l-icon>`
			: nothing;

		const startDateTemplate = !this.skeleton && !this._started
			? html `
			<div class="d2l-status-container">
				<d2l-status-indicator state="none" text="${this._startDateFormatted}"></d2l-status-indicator>
			</div>`
			: nothing;

		return this._renderListItem({
			illustration: this.submissionCount ? html`
					<d2l-quick-eval-widget-submission-icon style="overflow: visible;"
						class="${classMap(iconClasses)}"
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
						${startDateTemplate}
					</div>
				</d2l-list-item-content>
			`
		});
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

	/** Start Date formatted like (Short month) (Day) e.g. "Aug 15" */
	get _startDateFormatted() {
		return this.localize('StartsWithDate', 'startDate',
			this._usage && this._usage.startDate()
				? formatDate(new Date(this._usage.startDate()), { format: 'shortMonthDay' })
				: '');
	}

	/** String associated with icon catalogue for provided activity type */
	get _icon() {
		if (this._activity && !this.skeleton) {
			const subEntity = this._activity.getSubEntityByClasses(['icon', 'tier2']);
			if (subEntity && subEntity.hasProperty('iconSetKey')) {
				return subEntity.properties.iconSetKey;
			}
		}
		if (this._activityProperties && !this.skeleton) {
			return this._activityProperties.icon;
		}
		return '';
	}

	/** Specific name of the activity */
	get _name() {
		if (this._activity && !this.skeleton) {
			if (this._activity.hasProperty('name')) {
				return this._activity.properties.name;
			} else if (this._activity.hasProperty('title')) {
				return this._activity.properties.title;
			}
		}
		if (this._activityProperties && !this.skeleton) {
			return this.localize(this._activityProperties.type);
		}
		return '';
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
				const relList = [].concat(this._activityProperties.rel);

				const foundEntity = await this._followRelPath(relList, entity);

				if (foundEntity) {
					this._activity = foundEntity;

					const link = (
						this._activityProperties
						&& this._activityProperties.linkRel
						&& this._activity.getLinkByRel(this._activityProperties.linkRel)
					) || this._activity.getLinkByRel('alternate');

					this.actionHref = (this._started && (this.evaluateAllHref || (link && link.href))) || null;
				}

				break;
			}
		}
	}

	/**
	 * Follows a list of rels beginning at a specific entity.
	 * @async
	 * @param {String[]} relList List of rels to follow
	 * @param {object} entity Beginning entity
	 * @returns {object|null|undefined} The entity at the end of the rel path. {null|undefined} if an entity in the chain is missing or doesn't have the next rel.
	 */
	async _followRelPath(relList, entity) {
		if (!entity || relList.length === 0) return entity;

		const source = (
			entity.hasLinkByRel(relList[0])
			&& entity.getLinkByRel(relList[0])
			|| {}).href;

		if (source) {
			return await this._followRelPath(relList.slice(1), await fetchEntity(source, this.token));
		}

		return null;
	}

	/**
	 * Load usage's organization entity.
	 * @async
	 */
	async _loadOrganization() {
		if (!this._usage) return;

		const entity = this._usage._entity;
		const hiddenClass = HideOrgInfoClasses.find(hiddenClass => entity.hasClass(hiddenClass));

		if (!hiddenClass) {
			const organizationHref = this._usage.organizationHref();
			if (organizationHref) {
				await fetchEntity(organizationHref, this.token)
					.then((organization) => {
						this._organization = organization;
					});
			}
		}
	}
}
customElements.define('d2l-work-to-do-activity-list-item-basic', ActivityListItemBasic);
