import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/list/list-item-content';
import '../d2l-activity-date/d2l-activity-date';

import { bodyCompactStyles, bodySmallStyles, bodyStandardStyles, heading4Styles } from '@brightspace-ui/core/components/typography/styles';
import { css, html, LitElement } from 'lit-element/lit-element';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { ActivityAllowList, HideOrgInfoClasses } from './env';
import { classMap } from 'lit-html/directives/class-map';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { fetchEntity } from './state/fetch-entity';
import { ListItemLinkMixin } from '@brightspace-ui/core/components/list/list-item-link-mixin';
import { LocalizeWorkToDoMixin } from './mixins/d2l-work-to-do-localization-mixin';
import { nothing } from 'lit-html';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin';
import { formatDate } from '@brightspace-ui/intl/lib/dateTime';

class ActivityListItemDetailed extends ListItemLinkMixin(SkeletonMixin(EntityMixinLit(LocalizeWorkToDoMixin(LitElement)))) {

	static get properties() {
		return {
			/** Indicates whether the component should render the due/end date of the related activity */
			includeDate: { type: Boolean, attribute: 'include-date' },
			/** entity used for crawling instance properties (e.g. name) */
			_activity: { type: Object },
			/** List of component relevant information related to activityType */
			_activityProperties: { type: Object },
			/** entity associated with ActivityUsageEntity's organization */
			_organization: { type: Object },
		};
	}

	static get styles() {
		return [
			super.styles,
			bodyCompactStyles,
			bodySmallStyles,
			bodyStandardStyles,
			heading4Styles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-activity-date-container {
					margin: 1rem 0 0 0;
					padding: 0 0 0.1rem 0;
				}
				:host([skeleton]) .d2l-activity-date-container {
					height: 1.2rem;
					margin: 1rem 0 0.3rem 0;
					padding: 0;
				}
				.d2l-activity-icon-container {
					border-radius: 0 !important;
					padding: 0.8rem 0 0 0.25rem;
				}
				:host([dir="rtl"]) .d2l-activity-icon-container {
					padding: 0.8rem 0.25rem 0 0;
				}
				.d2l-activity-name-container {
					margin: 0.6rem 0 0 0;
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
					margin-bottom: 0.3rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.d2l-secondary-content-container-no-description {
					margin-bottom: 0.6rem;
				}
				.d2l-supporting-info-content-container {
					-webkit-box-orient: vertical;
					color: var(--d2l-color-ferrite);
					display: block;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					margin-bottom: 0.6rem;
					max-width: inherit;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.d2l-status-container {
					display: inline;
					margin-bottom: 0.5rem;
					margin-right: 0.2rem;
					margin-top: -0.5rem;
				}
				[slot="content"] {
					padding: 0;
				}
				#content {
					width: 100%;
				}
				:host([skeleton]) .d2l-activity-icon-container.d2l-skeletize {
					height: 1.5rem;
					margin-top: 0.8rem;
					padding-top: 0;
					width: 1.2rem;
				}
				:host([skeleton]) .d2l-activity-name-container {
					height: 1.4rem;
				}
				:host([skeleton]) .d2l-secondary-content-container {
					bottom: 0.15rem;
					height: 1rem;
					top: 0.1rem;
				}
				:host([skeleton]) .d2l-supporting-info-content-container {
					bottom: 0.1rem;
					height: 2rem;
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
		const event = new CustomEvent('data-loaded');
		this.dispatchEvent(event);
	}

	render() {
		if (!this.href || !this.token) {
			return nothing;
		}

		const dateClasses = {
			'd2l-activity-date-container': true,
			'd2l-skeletize': true,
			'd2l-skeletize-20': true
		};

		const iconClasses = {
			'd2l-activity-icon-container': true,
			'd2l-skeletize': true,
		};

		const nameClasses = {
			'd2l-body-standard': true,
			'd2l-activity-name-container': true,
			'd2l-skeletize': true,
			'd2l-skeletize-30': true,
		};

		const secondaryClasses = {
			'd2l-body-small': true,
			'd2l-secondary-content-container': true,
			'd2l-secondary-content-container-no-description': !this._description,
			'd2l-skeletize': true,
			'd2l-skeletize-35': true
		};

		const supportingClasses = {
			'd2l-body-compact': true,
			'd2l-supporting-info-content-container': true,
			'd2l-skeletize-paragraph-2': true,
		};

		const dateTemplate = this.includeDate
			? html `
				<div class=${classMap(dateClasses)}>
					<d2l-activity-date
						class="d2l-heading-4"
						href=${this.href}
						?hidden=${this.skeleton}
						.token=${this.token}
						format="dddd, MMMM d"
						date-only>
					</d2l-activity-date>
				</div>`
			: nothing;

		const separatorTemplate = !this.skeleton && this._type && (this._orgName || this._orgCode)
			? html `<d2l-icon class="d2l-icon-bullet" icon="tier1:bullet"></d2l-icon>`
			: nothing;

		const startDateTemplate = !this.skeleton && !this._started
			? html `
			<div class="d2l-status-container">
				<d2l-status-indicator state="none" text="${this._startDateFormatted}"></d2l-status-indicator>
			</div>`
			: nothing;

		const listItemTemplate = this._renderListItem({
			illustration: html`
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
					<div class=${classMap(secondaryClasses)} slot="secondary">
						${startDateTemplate}
						${this._type}
						${separatorTemplate}
						${this._orgName || this._orgCode}
					</div>
					<div id="content-supporting-info-container" slot="supporting-info" class=${classMap(supportingClasses)}>
						${this._description}
					</div>
				</d2l-list-item-content>
			`
		});

		return html`
			${dateTemplate}
			${listItemTemplate}
		`;
	}

	/** Due or end date of activity */
	get _date() {
		return this._usage && !this.skeleton
			? this._usage.dueDate() || this._usage.endDate()
			: '';
	}

	get _description() {
		if (this._activity && !this.skeleton) {
			if (this._activity.hasSubEntityByClass('description')) {
				return this._activity.getSubEntityByClass('description').properties
				&& this._activity.getSubEntityByClass('description').properties.text;
			} else if (this._activity.properties.instructionsText) {
				return this._activity.properties.instructionsText;
			}
		}
		return '';
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

	get _type() {
		return this._activityProperties && !this.skeleton
			? this.localize(this._activityProperties.type)
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
		for (const allowed in ActivityAllowList) {
			if (entity.hasClass(ActivityAllowList[allowed].class)) {
				this._activityProperties = ActivityAllowList[allowed];
				const relList = [].concat(this._activityProperties.rel);

				const foundEntity = await this._followRelPath(relList, entity);

				if (foundEntity) {
					this._activity = foundEntity;

					const link = (
						this._activityProperties
						&& this._activityProperties.linkRel
						&& this._activity.getLinkByRel(this._activityProperties.linkRel)
					) || this._activity.getLinkByRel('alternate');

					this.actionHref = (this._started && (link && link.href)) || null;
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
customElements.define('d2l-work-to-do-activity-list-item-detailed', ActivityListItemDetailed);
