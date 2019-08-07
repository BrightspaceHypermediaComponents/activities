import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from './QuickEvalLocalize.js';
import {QuickEvalLogging} from './QuickEvalLogging.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-alert/d2l-alert.js';
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

/**
 * @customElement
 * @polymer
 */

class D2LQuickEvalActivities extends mixinBehaviors(
	[	D2L.PolymerBehaviors.QuickEval.D2LQuickEvalSirenHelperBehavior,
		D2L.PolymerBehaviors.QuickEval.D2LHMFilterBehaviour,
		D2L.PolymerBehaviors.QuickEval.D2LHMSearchBehaviour
	],
	QuickEvalLogging(QuickEvalLocalize(PolymerElement))
) {
	static get template() {
		const quickEvalActivitiesTemplate = html`
			<style>
				.d2l-quick-eval-activity-list-modifiers {
					float: right;
				}
				:host(:dir(rtl)) .d2l-quick-eval-activity-list-modifiers {
					float: left;
				}
				.clear {
					clear: both;
				}
				d2l-hm-search {
					display: inline-block;
					width: 250px;
					margin-left: .25rem;
				}
				.d2l-quick-eval-no-submissions,
				.d2l-quick-eval-no-criteria-results {
					text-align: center;
				}
				d2l-quick-eval-activities-skeleton {
					width: 100%;
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
					margin-bottom: 0.5rem;
				}
				d2l-quick-eval-search-results-summary-container {
					margin-bottom: 0.9rem;
					margin-top: 0.9rem;
					display: block;
				}
				[hidden] {
					display: none;
				}
				.d2l-body-standard {
					@apply --d2l-body-compact-text;
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
			<d2l-alert type="critical" hidden$="[[!filterError]]" id="d2l-quick-eval-filter-error-alert">
				[[localize('failedToFilter')]]
			</d2l-alert>
			<d2l-alert type="critical" hidden$="[[!searchError]]" id="d2l-quick-eval-search-error-alert">
				[[localize('failedToSearch')]]
			</d2l-alert>
			<d2l-quick-eval-search-results-summary-container
				search-results-count="[[_searchResultsCount]]"
				hidden$="[[!searchApplied]]"
				on-d2l-quick-eval-search-results-summary-container-clear-search="_clearSearchResults">
			</d2l-quick-eval-search-results-summary-container>
			<div class="d2l-quick-eval-no-submissions" hidden$="[[!_shouldShowNoSubmissions(_data, _loading, filterApplied, searchApplied)]]">
				<d2l-quick-eval-no-submissions-image></d2l-quick-eval-no-submissions-image>
				<h2 class="d2l-quick-eval-no-submissions-heading">[[localize('caughtUp')]]</h2>
				<p class="d2l-body-standard">[[localize('noSubmissions')]]</p>
				<p class="d2l-body-standard">[[localize('checkBackOften')]]</p>
			</div>
			<div class="d2l-quick-eval-no-criteria-results" hidden$="[[!_shouldShowNoCriteriaResults(_data, _loading, filterApplied, searchApplied)]]">
				<d2l-quick-eval-no-criteria-results-image></d2l-quick-eval-no-criteria-results-image>
				<h2 class="d2l-quick-eval-no-criteria-results-heading">[[localize('noResults')]]</h2>
				<p class="d2l-body-standard">[[localize('noCriteriaMatch')]]</p>
			</div>
			<d2l-quick-eval-activities-skeleton hidden$="[[!_showLoadingSkeleton]]"></d2l-quick-eval-activities-skeleton>
			<d2l-quick-eval-activities-list
				id="[[_activitiesListId]]"
				hidden$="[[!_shouldShowActivitiesList(_data, _showLoadingSkeleton)]]"
				courses="[[_data]]"
				token="[[token]]"
				on-d2l-quick-eval-activity-publish-all="_publishAll"
				on-d2l-quick-eval-activity-view-submission-list="_navigateSubmissionList"
				on-d2l-quick-eval-activity-view-evaluate-all="_navigateEvaluateAll"
				on-d2l-quick-eval-activity-view-evaluate-new="_navigateEvaluateNew"
				>
			</d2l-quick-eval-activities-list>
		`;

		quickEvalActivitiesTemplate.setAttribute('strip-whitespace', 'strip-whitespace');
		return quickEvalActivitiesTemplate;
	}

	static get is() {
		return 'd2l-quick-eval-activities';
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
			}
		};
	}
	static get observers() {
		return [
			'_loadData(entity)',
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

		} catch (e) {
			this._logError(e, {developerMessage: 'Unable to load activities from entity.'});
			throw e;
		} finally {
			this._loading = false;
		}
	}

	async _parseActivities(entity) {
		const result = await Promise.all(entity.entities.map(async function(activity) {
			const evalStatus = await this._getEvaluationStatusPromise(activity);
			const courseName = await this._getCourseNamePromise(activity);
			const evaluationStatusHref = this.getEvaluationStatusHref(activity);
			return {
				courseName: courseName,
				assigned: evalStatus.assigned,
				completed: evalStatus.completed,
				published: evalStatus.published,
				evaluated: evalStatus.evaluated,
				unread: evalStatus.unread,
				resubmitted: evalStatus.resubmitted,
				publishAll: evalStatus.publishAll,
				submissionListHref: evalStatus.submissionListHref,
				evaluateAllHref: evalStatus.evaluateAllHref,
				evaluateNewHref: evalStatus.evaluateNewHref,
				key: this._getOrgHref(activity),
				dueDate: this._getActivityDueDate(activity),
				activityType: this._getActivityType(activity),
				activityNameHref: this._getActivityNameHref(activity),
				evaluationStatusHref: evaluationStatusHref
			};
		}.bind(this)));
		return this._groupByCourse(result);
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

	_clearSearchResults() {
		const search = this.shadowRoot.querySelector('d2l-hm-search');
		search.clearSearch();
	}

	_updateSearchResultsCount(courses) {
		this._searchResultsCount = courses.reduce(
			(accumulator, course)=> accumulator + course.activities.length, 0);
	}

	_shouldShowNoSubmissions() {
		return !(this._data.length) && !this._loading && !(this.filterApplied || this.searchApplied);
	}

	_shouldShowNoCriteriaResults() {
		return !(this._data.length) && !this._loading && (this.filterApplied || this.searchApplied);
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
							this._updateEvaluationStatus(evaluationStatusHref, evalStatusEntity.properties);
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

	_navigateEvaluateNew(evt) {
		if (evt.detail.evaluateNewHref) {
			this._setWindowLocationHref(evt.detail.evaluateNewHref);
		}
	}

	_setWindowLocationHref(href) {
		if (href !== '') {
			window.location.href = href;
		}
	}

	_updateEvaluationStatus(evaluationStatusHref, evalStatus) {
		for (let i = 0; i < this._data.length; i++) {
			for (let j = 0; j < this._data[i].activities.length; j++) {

				if (this._data[i].activities[j].evaluationStatusHref === evaluationStatusHref) {
					this.set(`_data.${i}.activities.${j}.assigned`, evalStatus.assigned);
					this.set(`_data.${i}.activities.${j}.completed`, evalStatus.completed);
					this.set(`_data.${i}.activities.${j}.published`, evalStatus.published);
					this.set(`_data.${i}.activities.${j}.evaluated`, evalStatus.evaluated);
					this.set(`_data.${i}.activities.${j}.unread`, evalStatus.newsubmissions);
					this.set(`_data.${i}.activities.${j}.resubmitted`, evalStatus.resubmissions);
					return true;
				}
			}
		}
		return false;
	}
}
window.customElements.define(D2LQuickEvalActivities.is, D2LQuickEvalActivities);
