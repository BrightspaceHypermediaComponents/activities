import '@brightspace-ui/core/components/button/button';
import '@brightspace-ui/core/components/icons/icon';
import '@brightspace-ui/core/components/link/link';
import './d2l-work-to-do-activity-list-header';
import './d2l-work-to-do-activity-list-item-basic';
import './d2l-work-to-do-activity-list-item-detailed';

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
			_upcomingActivities: { type: Array }
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
					width: 16.5rem;
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
					height: 100px;
					width: 100px;
				}
				.d2l-work-to-do-fullscreen-container {
					background-image: linear-gradient(to bottom, #f9fbff, #ffffff);
					padding: 3.35rem 2rem 0 2rem;
				}
				d2l-button {
					padding: 1.8rem 0;
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
		this._overdueActivities = [];
		this._viewAllSource = undefined;
		this._setEntityType(UserEntity);

		Rels.Activities.nextPage = 'https://activities.api.brightspace.com/rels/next-page';
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
						.token=${ifDefined(this.token)}></d2l-work-to-do-activity-list-item-basic>
				`
			);

			return html`
				<div class="d2l-activity-collection">
					<d2l-work-to-do-activity-list-header ?overdue=${isOverdue} count=${activities.length}></d2l-work-to-do-activity-list-header>
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
				<d2l-link aria-label="${this.localize('fullViewLink')}" href="${this._viewAllSource}" small ?hidden=${!this._viewAllSource}>${this.localize('fullViewLink')}</d2l-link>
			`;
		};

		/** Empty state templates */
		const emptyViewTextTemplate = (discoverActive, hasActivities) => {
			if (hasActivities) {
				return html`${this.localize('activitiesAvailable')}`;
			}

			return discoverActive
				? html`${this.localize('noActivitiesDiscoverActive')}`
				: html`${this.localize('noActivitiesDiscoverInactive')}`;
		};

		const emptyViewButtonTemplate = (discoverActive, hasActivities) => {
			if (hasActivities) {
				return html `
					<d2l-button
						primary
						@click=${() => window.location.href = this._viewAllSource}>
						${this.localize('viewAllWork')}
					</d2l-button>`;
			}

			return discoverActive
				? html`
					<d2l-button
						primary
						@click=${() => window.location.href = this._discoverHref}>
						${this.localize('goToDiscover')}
					</d2l-button>`
				: nothing;
		};

		const emptyViewTemplate = () => {
			if (!this._maxCollection) {
				return nothing;
			}

			return html`
				<div class="d2l-empty-template">
					<div class="d2l-empty-icon-container">
						<d2l-icon id="empty-icon" icon="tier3:search"></d2l-icon>
					</div>
					<div class="d2l-heading-3 d2l-empty-header-text-container">
						${this.localize('nothingHere')}
					</div>
					<div class="d2l-body-standard d2l-empty-body-text-container">
						${emptyViewTextTemplate(this._discoverActive, this._maxCount)}
					</div>
					<div class="d2l-empty-button-container">
						${emptyViewButtonTemplate(this._discoverActive, this._maxCount)}
					</div>
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
						?include-date=${newDay}></d2l-work-to-do-activity-list-item-detailed>
				`;
			});

			const immersiveNav = (isFullscreen) => {
				return isFullscreen
					? html`
						<d2l-navigation-immersive back-link-href="${this._homeLinkHref}" back-link-text="${this.localize('backToD2L')}">
							<div class="d2l-typography d2l-body-standard" slot="middle">
								<p>${this.localize('myWorkToDo')}</p>
							</div>
						</d2l-navigation-immersive>`
					: nothing;
			};

			return html`
				${immersiveNav(this.fullscreen)}
				<div class="d2l-activity-collection-container-fullscreen">
					<d2l-work-to-do-activity-list-header ?overdue=${isOverdue} count=${activities.length} fullscreen></d2l-work-to-do-activity-list-header>
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

		const fullscreenTemplate = () => {
			if (!this._overdueCollection || !this._upcomingCollection || !this._maxCollection) {
				return nothing;
			}
			return html`
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
			<d2l-work-to-do-activity-list-header skeleton fullscreen></d2l-work-to-do-activity-list-header>
			<d2l-list separators="none">
				<d2l-work-to-do-activity-list-item-detailed skeleton href=' ' token=' '></d2l-work-to-do-activity-list-item-detailed>
				<d2l-work-to-do-activity-list-item-detailed skeleton href=' ' token=' '></d2l-work-to-do-activity-list-item-detailed>
				<d2l-work-to-do-activity-list-item-detailed skeleton href=' ' token=' '></d2l-work-to-do-activity-list-item-detailed>
			</d2l-list>
			<div class="d2l-load-more-button-skeleton d2l-skeletize"></div>
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

	get _maxCount() {
		return this._maxCollection && this._maxCollection.hasSubEntityByRel(Rels.Activities.userActivityUsage)
			? this._maxCollection.getSubEntitiesByRel(Rels.Activities.userActivityUsage).length
			: 0;
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
			} else if (this._maxCollection) {
				return 'empty';
			}
		}
		return 'loading';
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
			|| {}).href;

		if (emptySource) {
			await fetchEntity(emptySource, this.token)
				.then((emptyEntity) => {
					if (emptyEntity) {
						this._loadOverdue(emptyEntity);
						this._loadUpcoming(emptyEntity);
						this._loadUpcoming(emptyEntity, Constants.MaxDays);
					}
				});
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
				this._overdueActivities = this._getFilteredOverdueActivities(sirenEntity);
				this._overdueCollection = sirenEntity;
			});
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
		if (!pageSize) pageSize = Constants.MaxWidgetDisplay;

		if (!entity || !entity.hasActionByName(Actions.activities.selectCustomDateRange)) {
			return;
		}

		const isMax = !!forwardLimit;
		forwardLimit = forwardLimit ? forwardLimit : (getUpcomingWeekLimit() * 7);

		const now = new Date();
		const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + forwardLimit, 23, 59, 59, 999).toISOString();
		const start = new Date(now.getTime()).toISOString();

		const action = entity.getActionByName(Actions.activities.selectCustomDateRange);
		const fields = [
			{ name: 'start', value: start },
			{ name: 'end', value: end },
			{ name: 'pageSize', value: pageSize }
		];
		performSirenAction(this.token, action, fields, true)
			.then((sirenEntity) => {
				if (sirenEntity) {
					if (!isMax) {
						this._upcomingActivities = sirenEntity.getSubEntitiesByRel(Rels.Activities.userActivityUsage);
						this._upcomingCollection = sirenEntity;
					} else {
						this._maxCollection = sirenEntity;
					}
				}
			});
	}

	_getHomeHref() {
		// TODO: this is a default (and kind of a hacky way to get to it),
		// ideally we want to get the user's homepage from their profile
		this._homeLinkHref = window.location.href.substring(0, window.location.href.indexOf('/d2l/') + 5) + 'home';
	}
}
customElements.define('d2l-work-to-do', WorkToDoWidget);
