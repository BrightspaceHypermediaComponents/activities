import '@brightspace-ui/core/components/button/button';
import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/link/link';
import './d2l-work-to-do-activity-list-header';
import './d2l-work-to-do-activity-list-item-basic';
import './d2l-work-to-do-activity-list-item-detailed';
import './d2l-work-to-do-empty-state-image';

import '@webcomponents/webcomponentsjs/webcomponents-loader';
import 'd2l-navigation/d2l-navigation-immersive';
import 'd2l-navigation/d2l-navigation-button';
import 'd2l-navigation/d2l-navigation-button-close';

import { Actions, Rels } from 'siren-sdk/src/hypermedia-constants';
import { bodyStandardStyles, heading1Styles, heading3Styles, heading4Styles } from '@brightspace-ui/core/components/typography/styles';
import { css, html, LitElement } from 'lit-element/lit-element';
import { Config, Constants, getOverdueWeekLimit, getUpcomingWeekLimit } from './env';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { fetchEntity } from './state/fetch-entity';
import { ifDefined } from 'lit-html/directives/if-defined';
import { LocalizeWorkToDoMixin } from './localization';
import { performSirenAction } from 'siren-sdk/src/es6/SirenAction';
import { UserEntity } from 'siren-sdk/src/users/UserEntity';
import { repeat } from 'lit-html/directives/repeat';
import { nothing } from 'lit-html';

/**
 * @classdesc Class representation of Work to Do widget component
 */
class WorkToDoWidget extends EntityMixinLit(LocalizeWorkToDoMixin(LitElement)) {

	static get properties() {
		return {
			/** Represents current session's discovery tool access */
			_discoverActive: { type: Boolean },
			/** Represents path to full page view */
			_fullPagePath: { type: String, attribute: 'data-full-page-path' },
			/** Represents current session's render mode */
			_fullscreen: { type: Boolean, attribute: 'data-fullscreen' },
			/** ActivityUsageCollection with time: 0 -> 52[weeks] */
			_maxCollection: { type: Object },
			/** ActivityUsageCollection with time: (OverdueWeekLimit) -> 0 */
			_overdueCollection: { type: Object },
			/** Represents current session's OverdueWeekLimit */
			_overdueWeekLimit: { type: Number, attribute: 'data-overdue-week-limit' },
			/** ActivityUsageCollection with time: 0 -> UpcomingWeekLimit */
			_upcomingCollection: { type: Object },
			/** Represents current session's UpcomingWeekLimit */
			_upcomingWeekLimit: { type: Number, attribute: 'data-upcoming-week-limit' },
			/** individual items within upcomingCollection + subsequent pages once the UI has them */
			_upcomingActivities: { type: Array },
			/** keeps track of the sub items being loaded, so we can show all data at once and not a partial activity */
			_initialLoad: { type: Boolean }
		};
	}

	static get styles() {
		return [
			bodyStandardStyles,
			heading1Styles,
			heading3Styles,
			heading4Styles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-empty-template {
					margin-left: auto;
					margin-right: auto;
				}
				.d2l-empty-icon-container {
					display: flex;
					justify-content: center;
					margin: 1.6rem auto 0 auto;
				}
				.d2l-empty-header-text-container,
				.d2l-empty-body-text-container {
					display: block;
					text-align: center;
					width: 100%;
				}
				.d2l-empty-header-text-container {
					margin: 1.2rem auto 0.3rem auto;
				}
				.d2l-empty-body-text-container {
					margin: 0 auto 0.9rem auto;
				}
				.d2l-empty-button-container {
					display: flex;
					justify-content: center;
					width: 100%;
				}
				#empty-icon {
					max-width: 18rem;
					width: 100%;
				}
				.d2l-load-more-button {
					padding: 1.8rem 0;
				}
				.d2l-work-to-do-fullscreen-container {
					background-image: linear-gradient(to bottom, #f9fbff, #ffffff);
					padding: 0 2rem;
				}
				.d2l-activity-collection d2l-list d2l-work-to-do-activity-list-item-basic:first-of-type {
					margin-top: 0.3rem;
				}
				.d2l-activity-collection d2l-list d2l-work-to-do-activity-list-item-basic:last-of-type {
					margin-bottom: 0.3rem;
				}
				.d2l-activity-collection-container-fullscreen d2l-list d2l-work-to-do-activity-list-item-detailed:last-of-type {
					margin-bottom: 1.5rem;
				}
				d2l-work-to-do-activity-list-item-basic,
				d2l-work-to-do-activity-list-item-detailed {
					--d2l-list-item-content-text-color: var(--d2l-color-ferrite);
				}
			`
		];
	}

	constructor() {
		super();
		this.fullscreen = false;
		this._discoverActive = false;
		this._emptyEntity = undefined;
		this._maxCollection = undefined;
		this._overdueCollection = undefined;
		this._overdueDisplayLimit = Constants.MaxWidgetDisplay;
		this._upcomingCollection = undefined;
		this._overdueWeekLimit = Config.OverdueWeekLimit;
		this._upcomingWeekLimit = Config.UpcomingWeekLimit;
		this._upcomingActivities = [];
		this._totalUpcomingActivities = undefined;
		this._overdueActivities = [];
		this._viewAllSource = undefined;
		this._setEntityType(UserEntity);
		this._initialLoad = true;
		this._loadedElements = [];
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onEntityChanged(entity);
			super._entity = entity;
		}
	}

	attributeChangedCallback(name, oldval, newval) {
		if (!window.D2L.workToDoOptions) {
			window.D2L.workToDoOptions = {};
		}

		switch (name) {
			case 'data-fullscreen':
				this.fullscreen = (newval.toLowerCase() === 'true');
				window.D2L.workToDoOptions.fullscreen = this.fullscreen;
				break;
			case 'data-overdue-week-limit':
				this._overdueWeekLimit = (parseInt(newval) < 0) ? Config.OverdueWeekLimit : parseInt(newval);
				window.D2L.workToDoOptions.overdueWeekLimit = this._overdueWeekLimit;
				break;
			case 'data-upcoming-week-limit':
				this._upcomingWeekLimit = (parseInt(newval) < 0) ? Config.UpcomingWeekLimit : parseInt(newval);
				window.D2L.workToDoOptions.upcomingWeekLimit = this._upcomingWeekLimit;
				break;
			case 'data-full-page-path':
				this._viewAllSource = newval;
				break;
		}

		super.attributeChangedCallback(name, oldval, newval);
	}

	/**
	 * Update widget's data to match updated entry point entity
	 * @param {UserEntity} user Current target user entity
	 */
	_onEntityChanged(user) {
		if (!user || !user._entity) {
			return;
		}
		this._getCollections(user._entity);
		this._getHomeHref();
	}

	render() {

		/** Activity state templates */
		const collectionTemplate = (activities, displayLimit, isOverdue) => {
			if (!activities || activities.length === 0 || displayLimit === 0) {
				return nothing;
			}

			const items = repeat(
				activities.slice(0, displayLimit),
				item => item.links,
				item => html`
					<d2l-work-to-do-activity-list-item-basic
						href=${ifDefined(item.getLinkByRel('self').href)}
						.token=${ifDefined(this.token)}
						?skeleton=${this._initialLoad}
						@data-loaded="${this._itemLoaded}"></d2l-work-to-do-activity-list-item-basic>
				`
			);

			return html`
				<div class="d2l-activity-collection">
					<d2l-work-to-do-activity-list-header ?skeleton=${this._initialLoad} ?overdue=${isOverdue} count=${isOverdue ? activities.length : this._totalUpcomingActivities}></d2l-work-to-do-activity-list-header>
					<d2l-list separators="none">${items}</d2l-list>
				</div>
			`;
		};

		const activitiesViewTemplate = () => {
			if (!this._overdueCollection || !this._upcomingCollection) {
				return nothing;
			}
			return html`
				<div class="d2l-overdue-list">
					${collectionTemplate(this._overdueActivities, this._overdueDisplayLimit, true)}
				</div>
				<div class="d2l-upcoming-list">
					${collectionTemplate(this._upcomingActivities, this._upcomingDisplayLimit, false)}
				</div>
				<d2l-link aria-label="${this.localize('fullViewLink')}" href="${this._viewAllSource}" small ?hidden=${!this._viewAllSource || !this._hasHiddenActivities}>${this.localize('fullViewLink')}</d2l-link>
			`;
		};

		/** Empty state templates */
		const emptyViewHeaderTemplate = (hasActivities) => {
			const emptyViewHeader = hasActivities ?
				this.localize('xWeeksClear', 'count', getUpcomingWeekLimit()) :
				this.localize('allClear');

			return html`
				<div class="d2l-heading-3 d2l-empty-header-text-container">
					${emptyViewHeader}
				</div>
			`;
		};

		/** Empty state templates */
		const emptyViewTextTemplate = (hasActivities) => {
			if (this.fullscreen) {
				return html`
					<div class="d2l-body-standard d2l-empty-body-text-container">
						${this.localize('noActivities')}
					</div>
					<div class="d2l-body-standard d2l-empty-body-text-container">
						${this.localize('comeBackNoFutureActivities')}
					</div>
				`;
			}

			const emptyViewText = hasActivities ?
				this.localize('noActivitiesFutureActivities') :
				this.localize('noActivitiesNoFutureActivities');

			return html`
				<div class="d2l-body-standard d2l-empty-body-text-container">
					${emptyViewText}
				</div>
			`;
		};

		const emptyViewButtonTemplate = (hasActivities) => {
			if (hasActivities && !this.fullscreen) {
				return html `
					<div class="d2l-empty-button-container">
						<d2l-button
							primary
							@click=${() => window.location.href = this._viewAllSource}>
							${this.localize('viewAllWork')}
						</d2l-button>
					</div>
				`;
			}

			return nothing;
		};

		const emptyViewTemplate = () => {
			return html`
				${this.fullscreen ? immersiveNav() : ''}
				<div class="d2l-empty-template">
					<div class="d2l-empty-icon-container">
						<d2l-work-to-do-empty-state-image id="empty-icon"></d2l-work-to-do-empty-state-image>
					</div>
					${emptyViewHeaderTemplate(this._hasHiddenActivities)}
					${emptyViewTextTemplate(this._hasHiddenActivities)}
					${emptyViewButtonTemplate(this._hasHiddenActivities)}
				</div>
			`;
		};

		/** Error state template */
		const errorTemplate = nothing;

		/** Fullscreen state templates */
		const fullscreenCollectionTemplate = (activities, isOverdue) => {
			if (!activities || activities.length === 0) {
				return nothing;
			}

			if (activities.length === 0) {
				return nothing;
			}

			let prevDate = new Date(0, 0, 0, 0);

			const groupedByDate = activities.map((activity) => {
				const activityDate = activity.hasSubEntityByClass('due-date')
					? new Date(activity.getSubEntityByClass('due-date').properties.date)
					: new Date(activity.getSubEntityByClass('end-date').properties.date);

				const newDay = activityDate > prevDate;
				prevDate = newDay
					? new Date(activityDate.getFullYear(), activityDate.getMonth(), activityDate.getDate(), 23, 59, 59, 999)
					: prevDate;

				return html`
					<d2l-work-to-do-activity-list-item-detailed
						href=${ifDefined(activity.getLinkByRel('self').href)}
						.token=${ifDefined(this.token)}
						?skeleton=${this._initialLoad}
						@data-loaded="${this._itemLoaded}"
						?include-date=${newDay}></d2l-work-to-do-activity-list-item-detailed>
				`;
			});

			return html`
				<div class="d2l-activity-collection-container-fullscreen">
					<d2l-work-to-do-activity-list-header ?skeleton=${this._initialLoad} ?overdue=${isOverdue} count=${isOverdue ? activities.length : this._totalUpcomingActivities} fullscreen></d2l-work-to-do-activity-list-header>
					<d2l-list>${groupedByDate}</d2l-list>
				</div>
			`;
		};

		const loadButtonTemplate = this._moreAvail
			? html`
				<d2l-button
					class="d2l-load-more-button"
					description=${this.localize('loadMoreDescription')}
					@click=${() => (this._handleLoadMoreClicked())}>
					${this.localize('loadMore')}
				</d2l-button>`
			: nothing;

		const immersiveNav = () => {
			return html`
				<d2l-navigation-immersive back-link-href="${this._homeLinkHref}" back-link-text="${this.localize('backToD2L')}">
					<div class="d2l-typography d2l-body-standard" slot="middle">
						<p>${this.localize('myWorkToDo')}</p>
					</div>
				</d2l-navigation-immersive>`;
		};

		const fullscreenTemplate = () => {
			if (!this._overdueCollection || !this._upcomingCollection) {
				return nothing;
			}

			return html`
				${immersiveNav()}
				<div class="d2l-work-to-do-fullscreen-container">
					<div class="d2l-heading-1 d2l-work-to-do-fullscreen-title">${this.localize('myWorkToDo')}</div>
					<div class="d2l-overdue-collection-fullscreen">
						${fullscreenCollectionTemplate(this._overdueActivities, true)}
					</div>
					<div class="d2l-upcoming-collection-fullscreen">
						${fullscreenCollectionTemplate(this._upcomingActivities, false)}
					</div>
					${loadButtonTemplate}
				</div>
			`;
		};

		/** Loading State Skeleton templates */
		const basicSkeleton = html`
			<d2l-work-to-do-activity-list-header skeleton></d2l-work-to-do-activity-list-header>
			<d2l-list separators="none">
				<d2l-work-to-do-activity-list-item-basic skeleton href=' ' token=' '></d2l-work-to-do-activity-list-item-basic>
				<d2l-work-to-do-activity-list-item-basic skeleton href=' ' token=' '></d2l-work-to-do-activity-list-item-basic>
				<d2l-work-to-do-activity-list-item-basic skeleton href=' ' token=' '></d2l-work-to-do-activity-list-item-basic>
			</d2l-list>
		`;

		const detailedSkeleton = html`
			${immersiveNav()}
			<div class="d2l-work-to-do-fullscreen-container">
				<div class="d2l-heading-1 d2l-work-to-do-fullscreen-title">${this.localize('myWorkToDo')}</div>
				<div class="d2l-overdue-collection-fullscreen">
					<d2l-work-to-do-activity-list-header skeleton fullscreen></d2l-work-to-do-activity-list-header>
					<d2l-list separators="none">
						<d2l-work-to-do-activity-list-item-detailed skeleton href=' ' token=' '></d2l-work-to-do-activity-list-item-detailed>
						<d2l-work-to-do-activity-list-item-detailed skeleton href=' ' token=' '></d2l-work-to-do-activity-list-item-detailed>
						<d2l-work-to-do-activity-list-item-detailed skeleton href=' ' token=' '></d2l-work-to-do-activity-list-item-detailed>
					</d2l-list>
					<div class="d2l-load-more-button-skeleton d2l-skeletize"></div>
				</div>
			</div>
		`;

		const loadingTemplate = () => {
			return this.fullscreen
				? detailedSkeleton
				: basicSkeleton;
		};

		/** Main render function logic */
		switch (this._state) {
			case 'activity':
				return activitiesViewTemplate();
			case 'empty':
				return emptyViewTemplate();
			case 'error':
				return errorTemplate; // TODO: Create error template
			case 'fullscreen':
				return fullscreenTemplate();
			case 'loading':
				return loadingTemplate();
			default:
				return activitiesViewTemplate();
		}
	}

	get _moreAvail() {
		return this._upcomingCollection && this._upcomingCollection.hasLinkByRel(Rels.Activities.nextPage);
	}

	get _hasHiddenActivities() {
		const hiddenUpcoming = this._upcomingCount > this._upcomingDisplayLimit || this._moreAvail;
		const futureActivities = this._maxCollection && this._maxCollection.hasSubEntityByRel(Rels.Activities.userActivityUsage)
			? this._maxCollection.getSubEntitiesByRel(Rels.Activities.userActivityUsage).length - this._upcomingCount > 0
			: false;

		return hiddenUpcoming || futureActivities;
	}

	get _overdueCount() {
		return this._overdueCollection && this._overdueCollection.hasSubEntityByRel(Rels.Activities.userActivityUsage)
			? this._overdueCollection.getSubEntitiesByRel(Rels.Activities.userActivityUsage).length
			: 0;
	}

	get _upcomingCount() {
		return this._upcomingCollection && this._upcomingCollection.hasSubEntityByRel(Rels.Activities.userActivityUsage)
			? this._upcomingCollection.getSubEntitiesByRel(Rels.Activities.userActivityUsage).length
			: 0;
	}

	get _upcomingDisplayLimit() {
		return this._overdueCount
			? Math.max((Constants.MaxWidgetDisplay - this._overdueCount), 0)
			: Constants.MaxWidgetDisplay;
	}

	get _state() {
		if (this._overdueCollection && this._upcomingCollection) {
			if (this._overdueCount || this._upcomingCount) {
				return this.fullscreen
					? 'fullscreen'
					: 'activity';
			} else {
				return 'empty';
			}
		}
		return 'loading';
	}

	get _upcomingDayLimit() {
		return getUpcomingWeekLimit() * 7;
	}

	/**
	 * Fired when all the data required to render the activity is present.
	 * Event is guaranteed to fire for success and failures.
	 * @param {CustomEvent} event Event data from the activity item
	 */
	_itemLoaded(event) {
		if (this._initialLoad) {
			this._loadedElements.push(event.target);

			const totalActivities = this._overdueActivities.length + this._upcomingActivities.length;
			const expectedLoadedActivities = this.fullscreen
				? totalActivities
				: Math.min(Constants.MaxWidgetDisplay, totalActivities);

			if (this._loadedElements.length === expectedLoadedActivities) {
				this._initialLoad = false;
				this._loadedElements = [];
			}
		}
	}

	_getFilteredOverdueActivities(collection) {
		let activities = collection.getSubEntitiesByRel(Rels.Activities.userActivityUsage);

		const cutOffDate = new Date();
		cutOffDate.setDate(cutOffDate.getDate() - (getOverdueWeekLimit() * 7));

		activities = activities.filter((activity) => {
			const activityDate = activity.hasSubEntityByClass('due-date')
				? new Date(activity.getSubEntityByClass('due-date').properties.date)
				: new Date(activity.getSubEntityByClass('end-date').properties.date);

			return activityDate.getTime() >= cutOffDate.getTime();
		});

		return activities;
	}

	/**
	 * Get collections of overdue, upcoming and max range ActivityUsageCollectionEntities
	 * @async
	 * @param {UserEntity} entity - User 'whoami' endpoint response
	 */
	async _getCollections(entity) {
		const emptySource = (
			entity.hasLinkByRel(Rels.Activities.myActivitiesEmpty)
			&& entity.getLinkByRel(Rels.Activities.myActivitiesEmpty)
			|| entity.hasLinkByRel(Rels.Activities.myOrganizationActivitiesEmpty)
			&& entity.getLinkByRel(Rels.Activities.myOrganizationActivitiesEmpty)
			|| {}).href;

		if (emptySource) {
			const emptyEntity = await fetchEntity(emptySource, this.token);
			if (emptyEntity) {
				this._loadOverdue(emptyEntity);
				const [ upcomingCollection, maxCollection ] = await Promise.all(
					// In fullscreen load 1 year, max doesn't matter if upcoming is greater than or equal to 1 year
					// In widget mode load limited data, and fetch max for future 'view all data' information.
					this.fullscreen || this._upcomingDayLimit >= Constants.MaxDays
						? [ this._loadMaxUpcoming(emptyEntity), Promise.resolve(null) ]
						: [ this._loadLimitedUpcoming(emptyEntity), this._loadMaxUpcoming(emptyEntity) ]);

				if (upcomingCollection) {
					this._upcomingCollection = upcomingCollection;
					this._upcomingActivities = upcomingCollection.getSubEntitiesByRel(Rels.Activities.userActivityUsage);
					this._totalUpcomingActivities = upcomingCollection.hasProperty('pagingTotalResults') && upcomingCollection.properties.pagingTotalResults || this._upcomingActivities.length;
				}
				if (maxCollection) {
					this._maxCollection = maxCollection;
				}
			}
		}
	}

	/**
	 * Add to display limit so next page of activities renders for user
	 * Load next page of activities into memory in anticipation for next request
	 */
	async _handleLoadMoreClicked() {
		if (!this._upcomingCollection.hasLinkByRel(Rels.Activities.nextPage)) return;

		const upcomingSource = this._upcomingCollection.getLinkByRel(Rels.Activities.nextPage).href;
		const upcomingNextPage = await fetchEntity(upcomingSource, this.token, true);
		if (upcomingNextPage && upcomingNextPage.hasSubEntityByRel(Rels.Activities.userActivityUsage)) {
			this._upcomingActivities = this._upcomingActivities.concat(upcomingNextPage.getSubEntitiesByRel(Rels.Activities.userActivityUsage));
			this._upcomingCollection = upcomingNextPage; // moves "next page" forward every time this succeeds
		}
	}

	// !TODO Further investigate defect DE42208 to remove need for retry
	async _performSirenActionWithRetry(token, action, fields, immediate, maxRetries = 0, error = null)  {
		if (maxRetries > -1) {
			return performSirenAction(token, action, fields, immediate)
				.catch((error) => {
					return this._performSirenActionWithRetry(token, action, fields, immediate, maxRetries - 1, error);
				});
		}

		return Promise.reject(error);
	}

	/**
	 * Load collection of overdue activities.
	 * Will set collection of overdue activities
	 * @async
	 * @param {SimpleEntity} entity - Empty-activities domain endpoint response
	 */
	async _loadOverdue(entity) {
		if (!entity || !entity.hasLinkByRel(Rels.Activities.overdue)) {
			return;
		}

		const source = entity.getLinkByRel(Rels.Activities.overdue).href;
		await fetchEntity(source, this.token)
			.then((sirenEntity) => {
				if (sirenEntity) {
					this._overdueActivities = this._getFilteredOverdueActivities(sirenEntity);
					this._overdueCollection = sirenEntity;
				}
			});
	}

	async _loadMaxUpcoming(entity) {
		return await this._loadUpcoming(entity, Math.max(Constants.MaxDays, this._upcomingDayLimit), Constants.PageSize);
	}

	async _loadLimitedUpcoming(entity) {
		return await this._loadUpcoming(entity, this._upcomingDayLimit, Constants.MaxWidgetDisplay);
	}

	/**
	 * Load collection of upcoming activities from present time until 'forwardLimit'.
	 * Will set collection of upcoming activities
	 * @note This is going to need to be updated whenever the pagination on the backend gets solved So that it requests in a cache friendly way and can interact with bookmarks
	 * @async
	 * @param {SimpleEntity} entity - 'Empty' Activities domain endpoint response
	 * @param {Number} [forwardLimit] - [Default: Config.UpcomingWeekLimit * 7] Number of days into future to look for activities
	 */
	async _loadUpcoming(entity, forwardLimit, pageSize) {
		if (!pageSize) pageSize = Constants.PageSize;

		if (!entity || (!entity.hasActionByName(Actions.activities.filterWorkToDo) && !entity.hasActionByName(Actions.activities.selectCustomDateRange))) {
			return;
		}

		const now = new Date();
		const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + forwardLimit, 23, 59, 59, 999).toISOString();
		const start = new Date(now.getTime()).toISOString();

		const action = entity.hasActionByName(Actions.activities.filterWorkToDo)
			? entity.getActionByName(Actions.activities.filterWorkToDo)
			: entity.getActionByName(Actions.activities.selectCustomDateRange);
		const fields = [].concat(action.fields).reduce((acc, field) => {
			switch (field.name) {
				case 'start': acc.push({ ...field, value: start }); break;
				case 'end': acc.push({ ...field, value: end }); break;
				case 'pageSize': acc.push({ ...field, value: pageSize }); break;
				default:
					if (field.value)
						acc.push(field);
					break;
			}
			return acc;
		}, []);

		return await this._performSirenActionWithRetry(this.token, action, fields, true, 1);
	}

	_getHomeHref() {
		// TODO: this is a default (and kind of a hacky way to get to it),
		// ideally we want to get the user's homepage from their profile
		this._homeLinkHref = window.location.href.substring(0, window.location.href.indexOf('/d2l/') + 5) + 'home';
	}
}
customElements.define('d2l-work-to-do', WorkToDoWidget);
