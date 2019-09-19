import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from './QuickEvalLocalize.js';
import {QuickEvalLogging} from './QuickEvalLogging.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-alert/d2l-alert.js';
import 'd2l-alert/d2l-alert-toast.js';
import 'd2l-common/components/d2l-hm-filter/d2l-hm-filter.js';
import 'd2l-common/components/d2l-hm-search/d2l-hm-search.js';
import 'd2l-polymer-behaviors/d2l-id.js';
import './behaviors/d2l-quick-eval-siren-helper-behavior.js';
import './behaviors/d2l-hm-filter-behavior.js';
import './behaviors/d2l-hm-search-behavior.js';
import './d2l-quick-eval-no-submissions-image.js';
import './d2l-quick-eval-no-criteria-results-image.js';
import './d2l-quick-eval-search-results-summary-container.js';
import './activities-list/d2l-quick-eval-activities-list.js';
import './d2l-quick-eval-activities-skeleton.js';
import './behaviors/d2l-quick-eval-telemetry-behavior.js';

/**
 * @customElement
 * @polymer
 */

class D2LQuickEvalActivities extends mixinBehaviors(
	[	D2L.PolymerBehaviors.QuickEval.D2LQuickEvalSirenHelperBehavior,
		D2L.PolymerBehaviors.QuickEval.D2LHMFilterBehaviour,
		D2L.PolymerBehaviors.QuickEval.D2LHMSearchBehaviour,
		D2L.PolymerBehaviors.QuickEval.TelemetryBehaviorImpl
	],
	QuickEvalLogging(QuickEvalLocalize(PolymerElement))
) {
	static get template() {
		const quickEvalActivitiesTemplate = html`
			<style>
				:host {
					display: block;
				}
				.d2l-quick-eval-activity-list-modifiers {
					display: flex;
					margin-top: 0.9rem;
					width: 100%;
				}
				d2l-hm-filter {
					margin-left: -0.7rem;
					margin-right: .25rem;
				}
				:host(:dir(rtl)) d2l-hm-filter {
					margin-left: .25rem;
					margin-right: -0.7rem;
				}
				.clear {
					clear: both;
				}
				d2l-hm-search {
					display: inline-block;
					width: 250px;
					flex: 1;
				}
				.d2l-quick-eval-no-submissions,
				.d2l-quick-eval-no-criteria-results {
					text-align: center;
				}
				.d2l-quick-eval-no-submissions {
					padding-top: 67px;
				}
				d2l-quick-eval-activities-skeleton {
					margin-top: 1.2rem;
				}
				d2l-quick-eval-no-submissions-image {
					padding-top: 30px;
					padding-bottom: 30px;
					height: 35%;
					width: 35%;
				}
				d2l-quick-eval-no-criteria-results-image {
					padding-top: 30px;
					padding-bottom: 30px;
					height: 15%;
					width: 15%;
				}
				.d2l-quick-eval-no-submissions-heading,
				.d2l-quick-eval-no-criteria-results-heading {
					@apply --d2l-heading-2;
					margin: 0;
				}
				d2l-alert {
					margin: auto;
					margin-top: 1rem;
				}
				d2l-quick-eval-search-results-summary-container {
					margin-bottom: 0.9rem;
					margin-top: 0.9rem;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-body-standard {
					@apply --d2l-body-compact-text;
				}
				@media (min-width: 525px) {
					.d2l-quick-eval-activity-list-modifiers {
						width: auto;
						float: left;
						clear: both;
					}
					:host(:dir(rtl)) .d2l-quick-eval-activity-list-modifiers {
						float: right;
					}
				}
				@media (min-width: 900px) {
					.d2l-quick-eval-activity-list-modifiers {
						float: right;
						margin-top: 0;
						clear: none;
					}
					:host(:dir(rtl)) .d2l-quick-eval-activity-list-modifiers {
						float: left;
					}
				}
			</style>
			<div class="d2l-quick-eval-activity-list-modifiers">
				<d2l-hm-filter
					href="[[filterHref]]"
					token="[[token]]">
				</d2l-hm-filter>
				<d2l-hm-search
					token="[[token]]"
					search-action="[[searchAction]]"
					placeholder="[[localize('search')]]"
					aria-label$="[[localize('search')]]"
					>
				</d2l-hm-search>
			</div>
			<div class="clear"></div>
			<d2l-alert type="critical" hidden$="[[!_isError]]" class="d2l-quick-eval-activities-load-error-alert">
				[[localize('failedToLoadActivities')]]
			</d2l-alert>
			<d2l-alert type="critical" hidden$="[[!filterError]]" class="d2l-quick-eval-filter-error-alert">
				[[localize('failedToFilter')]]
			</d2l-alert>
			<d2l-alert type="critical" hidden$="[[!searchError]]" class="d2l-quick-eval-search-error-alert">
				[[localize('failedToSearch')]]
			</d2l-alert>
			<d2l-quick-eval-search-results-summary-container
				search-results-count="[[_searchResultsCount]]"
				hidden$="[[!searchApplied]]"
				on-d2l-quick-eval-search-results-summary-container-clear-search="clearSearchResults">
			</d2l-quick-eval-search-results-summary-container>
			<div class="d2l-quick-eval-no-submissions" hidden$="[[!_shouldShowNoSubmissions(_data, _loading, _isError, filterApplied, searchApplied)]]">
				<d2l-quick-eval-no-submissions-image></d2l-quick-eval-no-submissions-image>
				<h2 class="d2l-quick-eval-no-submissions-heading">[[localize('caughtUp')]]</h2>
				<p class="d2l-body-standard">[[localize('noSubmissions')]]</p>
				<p class="d2l-body-standard">[[localize('checkBackOften')]]</p>
			</div>
			<div class="d2l-quick-eval-no-criteria-results" hidden$="[[!_shouldShowNoCriteriaResults(_data, _loading, _isError, filterApplied, searchApplied)]]">
				<d2l-quick-eval-no-criteria-results-image></d2l-quick-eval-no-criteria-results-image>
				<h2 class="d2l-quick-eval-no-criteria-results-heading">[[localize('noResults')]]</h2>
				<p class="d2l-body-standard">[[localize('noCriteriaMatchActivities')]]</p>
			</div>
			<d2l-quick-eval-activities-skeleton hidden$="[[!_showLoadingSkeleton]]"></d2l-quick-eval-activities-skeleton>
			<d2l-quick-eval-activities-list
				id$="[[_activitiesListId]]"
				hidden$="[[!_shouldShowActivitiesList(_data, _showLoadingSkeleton)]]"
				courses="[[_data]]"
				token="[[token]]"
				on-d2l-quick-eval-activity-publish-all="_publishAll"
				on-d2l-quick-eval-activity-view-submission-list="_navigateSubmissionList"
				on-d2l-quick-eval-activity-view-evaluate-all="_navigateEvaluateAll"
				>
			</d2l-quick-eval-activities-list>
			<dom-repeat items="[[_publishAllToasts]]" as="toast">
				<template>
					<d2l-alert-toast type="default" open>[[_publishAllToastMessage(toast)]]</d2l-alert-toast>
				</template>
			</dom-repeat>
		`;

		quickEvalActivitiesTemplate.setAttribute('strip-whitespace', 'strip-whitespace');
		return quickEvalActivitiesTemplate;
	}

	static get properties() {
		return {
			_data: {
				type: Array,
				value: []
			},
			_searchResultsCount: {
				type: Number,
				value: 0
			},
			_activitiesListId: {
				type: String,
				computed: '_computeActivitiesListId()'
			},
			_loading: {
				type: Boolean,
				value: true
			},
			_showLoadingSkeleton: {
				type: Boolean,
				computed: '_computeShowLoadingSkeleton(_loading, filtersLoading, searchLoading)'
			},
			_isError: {
				type: Boolean,
				value: false,
			},
			hidden: {
				type: Boolean
			},
			_publishAllToasts: {
				type: Array,
				value: []
			}
		};
	}
	static get observers() {
		return [
			'_loadData(entity)',
			'_clearAllOnHidden(hidden)',
			'_onFilterErrorChange(filterError)',
			'_onSearchErrorChange(searchError)',
		];
	}

	async _loadData(entity) {
		if (!entity) {
			return;
		}
		this._loading = true;
		try {
			if (entity.entities) {
				const result = await this._parseActivities(entity);
				this._data = result;
			} else {
				this._data = [];
			}
			this._updateSearchResultsCount(this._data);
			this._clearErrors();
			this._handleLoadSuccess();
			this.perfMark('activitiesLoadEnd');
			this.logAndDestroyPerformanceEvent('activities', 'qeViewLoadStart', 'activitiesLoadEnd');
		} catch (e) {
			this._handleLoadFailure();
			this._logError(e, {developerMessage: 'activities-view: Unable to load activities from entity.'});
			throw e;
		} finally {
			this._loading = false;
		}
	}

	async _parseActivities(entity) {
		const extraParams = this._getExtraParams(this._getHref(entity, 'self'));
		const result = await Promise.all(entity.entities.map(async function(activity) {
			try {
				const evalStatus = await this._getEvaluationStatusPromise(activity, extraParams);
				const courseName = await this._getCourseNamePromise(activity);
				const activityNameHref = this._getActivityNameHref(activity);
				const activityName = await this._getActivityName(activity);
				const evaluationStatusHref = this.getEvaluationStatusHref(activity);
				return {
					courseName: courseName,
					assigned: evalStatus.assigned,
					completed: evalStatus.completed,
					published: evalStatus.published,
					evaluated: evalStatus.evaluated,
					newSubmissions: evalStatus.newSubmissions,
					resubmitted: evalStatus.resubmitted,
					publishAll: evalStatus.publishAll,
					submissionListHref: evalStatus.submissionListHref,
					evaluateAllHref: evalStatus.evaluateAllHref,
					evaluateNewHref: evalStatus.evaluateNewHref,
					key: this._getOrgHref(activity),
					dueDate: this._getActivityDueDate(activity),
					activityType: this._getActivityType(activity),
					activityNameHref: activityNameHref,
					activityName: activityName,
					evaluationStatusHref: evaluationStatusHref
				};
			} catch (e) {
				this._logError(e, {developerMessage: `Error loading activity data for ${this._getHref(activity, 'self')}.`});
				return null;
			}
		}.bind(this)));
		return this._groupByCourse(result.filter(r => r));
	}

	async _clearAllOnHidden() {
		// NOTE: clearFilters has to be before clearSearchResults or else
		// it doesn't effectively clears the filters and searches
		if (this.filterApplied) {
			await this.clearFilters();
		}
		if (this.searchApplied) {
			await this.clearSearchResults();
		}
	}

	_groupByCourse(act) {
		if (act) {
			const grouped = act.reduce((acts, a) => {
				acts[a.key] = acts[a.key] || { name: a.courseName, activities: []};
				acts[a.key].activities.push(a);
				return acts;
			}, {});
			return Object.values(grouped);
		} else {
			return [];
		}
	}

	// @override - do not change the name
	_clearErrors() {
		this.searchError = null;
		this.filterError = null;
	}

	_handleLoadFailure() {
		this._isError = true;
	}

	_handleLoadSuccess() {
		this._isError = false;
	}

	_onFilterErrorChange(filterError) {
		if (filterError) {
			this._logError(filterError.error, { developerMessage: 'activities-view: Failed to retrieve filter results' });
		}
	}

	_onSearchErrorChange(searchError) {
		if (searchError) {
			this._logError(searchError.error, { developerMessage: 'activities-view: Failed to retrieve search results.' });
		}
	}

	_updateSearchResultsCount(courses) {
		this._searchResultsCount = courses.reduce(
			(accumulator, course)=> accumulator + course.activities.length, 0);
	}

	_shouldShowNoSubmissions() {
		return !(this._data.length) && !this._loading && !this._isError && !(this.filterApplied || this.searchApplied);
	}

	_shouldShowNoCriteriaResults() {
		return !(this._data.length) && !this._loading && !this._isError && (this.filterApplied || this.searchApplied);
	}

	_shouldShowActivitiesList(_data, _showLoadingSkeleton) {
		return _data.length && !_showLoadingSkeleton;
	}

	_computeShowLoadingSkeleton(_loading, filtersLoading, searchLoading) {
		return _loading || filtersLoading || searchLoading;
	}

	_publishAll(evt) {
		// THIS IS TEMPORARY - will switch to modal dialog when available; dialog will NOT load in demo page
		const confirmEvent = D2L.LP.Web.UI.Html.JavaScript.Confirm(
			this.localize('confirmation'),
			evt.detail.confirmMessage,
			'',
			this.localize('yes'),
			this.localize('no'),
			this.localize('close'),
			this._activitiesListId,
			() => {}
		);

		confirmEvent.AddListener(
			(result) => {
				if (result) {
					this.performSirenAction(evt.detail.publishAll)
						.then(evalStatusEntity => {
							const evaluationStatusHref = this.getEvaluationStatusHref(evalStatusEntity);
							const publishedActivity = this._updateEvaluationStatus(evaluationStatusHref, evalStatusEntity);

							if (publishedActivity) {
								this.push('_publishAllToasts', { activityName: publishedActivity.activityName });
							}
						});
				}
			}
		);
	}

	_computeActivitiesListId() {
		return D2L.Id.getUniqueId();
	}

	_navigateSubmissionList(evt) {
		if (evt.detail.submissionListHref) {
			this._setWindowLocationHref(evt.detail.submissionListHref);
		}
	}

	_navigateEvaluateAll(evt) {
		if (evt.detail.evaluateAllHref) {
			this._setWindowLocationHref(evt.detail.evaluateAllHref);
		}
	}

	_setWindowLocationHref(href) {
		if (href !== '') {
			window.location.href = href;
		}
	}

	_updateEvaluationStatus(evaluationStatusHref, evalStatusEntity) {
		for (let i = 0; i < this._data.length; i++) {
			for (let j = 0; j < this._data[i].activities.length; j++) {

				if (this._data[i].activities[j].evaluationStatusHref === evaluationStatusHref) {

					const publishAll = this._getAction(evalStatusEntity, 'publish-all-feedback');

					this.set(`_data.${i}.activities.${j}.assigned`, evalStatusEntity.properties.assigned);
					this.set(`_data.${i}.activities.${j}.completed`, evalStatusEntity.properties.completed);
					this.set(`_data.${i}.activities.${j}.published`, evalStatusEntity.properties.published);
					this.set(`_data.${i}.activities.${j}.evaluated`, evalStatusEntity.properties.evaluated);
					this.set(`_data.${i}.activities.${j}.newSubmissions`, evalStatusEntity.properties.newsubmissions);
					this.set(`_data.${i}.activities.${j}.resubmitted`, evalStatusEntity.properties.resubmissions);
					this.set(`_data.${i}.activities.${j}.publishAll`, publishAll);

					return this._data[i].activities[j];
				}
			}
		}
		return false;
	}

	_publishAllToastMessage(toast) {
		const maxLength = 48;

		if (toast.activityName.length > maxLength) {
			return this.localize('publishAllToastMessageTruncated', 'truncatedActivityName', toast.activityName.substring(0, maxLength));
		}
		return this.localize('publishAllToastMessage', 'activityName', toast.activityName);
	}

	ready() {
		super.ready();
		this.addEventListener('d2l-siren-entity-error', ()=> {
			this._loading = false;
			this._handleLoadFailure();
		});
	}
}
window.customElements.define('d2l-quick-eval-activities', D2LQuickEvalActivities);
