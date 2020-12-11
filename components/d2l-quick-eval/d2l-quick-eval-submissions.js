import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { QuickEvalLogging } from './QuickEvalLogging.js';
import { QuickEvalLocalize } from './QuickEvalLocalize.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import './behaviors/d2l-quick-eval-siren-helper-behavior.js';
import './d2l-quick-eval-submissions-table.js';
import './behaviors/d2l-hm-sort-behaviour.js';
import './behaviors/d2l-hm-filter-behavior.js';
import './behaviors/d2l-hm-search-behavior.js';
import 'd2l-common/components/d2l-hm-filter/d2l-hm-filter.js';
import 'd2l-common/components/d2l-hm-search/d2l-hm-search.js';
import 'd2l-alert/d2l-alert.js';
import './d2l-quick-eval-search-results-summary-container.js';
import './behaviors/d2l-quick-eval-telemetry-behavior.js';
import './behaviors/d2l-quick-eval-refresh-behavior.js';

class D2LQuickEvalSubmissions extends mixinBehaviors(
	[
		D2L.PolymerBehaviors.QuickEval.D2LQuickEvalSirenHelperBehavior,
		D2L.PolymerBehaviors.QuickEval.D2LHMSortBehaviour,
		D2L.PolymerBehaviors.QuickEval.TelemetryBehaviorImpl,
		D2L.PolymerBehaviors.QuickEval.D2LHMFilterBehaviour,
		D2L.PolymerBehaviors.QuickEval.D2LHMSearchBehaviour,
		D2L.PolymerBehaviors.QuickEval.D2LQuickEvalRefreshBehavior
	],
	QuickEvalLogging(QuickEvalLocalize(PolymerElement))
) {
	static get template() {
		const template = html`
			<style>
				:host {
					display: block;
				}
				.d2l-quick-eval-submissions-table-modifiers {
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
				d2l-hm-search {
					display: inline-block;
					width: 250px;
					flex: 1;
				}
				d2l-alert {
					margin: auto;
					margin-bottom: 0.5rem;
				}
				d2l-quick-eval-search-results-summary-container {
					margin-bottom: 0.9rem;
					margin-top: 0.9rem;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-quick-eval-submissions-table-modifiers {
					float: right;
				}
				:host(:dir(rtl)) .d2l-quick-eval-submissions-table-modifiers {
					float: left;
				}
				.clear {
					clear: both;
				}
				d2l-quick-eval-submissions-table {
					padding-top: 1rem;
					margin-bottom: 2.1rem;
				}
				@media (min-width: 525px) {
					.d2l-quick-eval-submissions-table-modifiers {
						width: auto;
						float: left;
						clear: both;
					}
					:host(:dir(rtl)) .d2l-quick-eval-submissions-table-modifiers {
						float: right;
					}
				}
				@media (min-width: 900px) {
					.d2l-quick-eval-submissions-table-modifiers {
						float: right;
						margin-top: 0;
						clear: none;
					}
					:host(:dir(rtl)) .d2l-quick-eval-submissions-table-modifiers {
						float: left;
					}
				}
			</style>
			<div class="d2l-quick-eval-submissions-table-modifiers">
				<d2l-hm-filter
					href="[[filterHref]]"
					token="[[token]]"
					category-include-list="[[filterIds]]"
					result-size="[[_numberOfActivitiesToShow]]"
					lazy-load-options>
				</d2l-hm-filter>
				<d2l-hm-search
					token="[[token]]"
					search-action="[[searchAction]]"
					placeholder="[[localize('search')]]"
					result-size="[[_numberOfActivitiesToShow]]"
					label="[[localize('search')]]"
					initial-value="[[searchTerm]]">
				</d2l-hm-search>
			</div>
			<div class="clear"></div>
			<d2l-alert type="critical" hidden$="[[!filterError]]" class="d2l-quick-eval-filter-error-alert">
				[[localize('failedToFilter')]]
			</d2l-alert>
			<d2l-alert type="critical" hidden$="[[!searchError]]" class="d2l-quick-eval-search-error-alert">
				[[localize('failedToSearch')]]
			</d2l-alert>
			<d2l-quick-eval-search-results-summary-container
				search-results-count="[[_searchResultsCount]]"
				more-results="[[_moreSearchResults]]"
				hidden$="[[!_showSearchSummary]]"
				on-d2l-quick-eval-search-results-summary-container-clear-search="clearSearchResults">
			</d2l-quick-eval-search-results-summary-container>
			<d2l-quick-eval-submissions-table
				href="[[href]]"
				token="[[token]]"
				logging-endpoint="[[loggingEndpoint]]"
				_data="[[_data]]"
				header-columns="[[_headerColumns]]"
				show-loading-spinner="[[_showLoadingSpinner]]"
				show-loading-skeleton="[[_showLoadingSkeleton]]"
				show-load-more="[[_showLoadMore]]"
				_health="[[_health]]"
				show-no-submissions="[[_showNoSubmissions]]"
				show-no-criteria="[[_showNoCriteria]]"
				returning-to-quick-eval="[[returningToQuickEval]]"
				course-level="[[courseLevel]]"
				course-level-name="[[courseLevelName]]"
				on-d2l-quick-eval-submissions-table-load-more="_loadMore"
				on-d2l-quick-eval-submissions-table-sort-requested="_handleSortRequested"
				multi-course-quick-eval-href="[[multiCourseQuickEvalHref]]">
			</d2l-quick-eval-submissions-table>
		`;
		template.setAttribute('strip-whitespace', 'strip-whitespace');
		return template;
	}

	static get properties() {
		return {
			_data: {
				type: Array,
				value: []
			},
			_headerColumns: {
				type: Array,
				value: [],
				computed: '_computeHeaders(masterTeacher, courseLevel)'
			},
			_numberOfActivitiesToShow: {
				type: Number,
				computed: '_computeNumberOfActivitiesToShow(_data, _numberOfActivitiesToShow)',
				value: 20
			},
			filterIds: {
				type: Array,
				value: []
			},
			_searchResultsCount: {
				type: Number,
				value: 0
			},
			_moreSearchResults: {
				type: Boolean,
				value: false
			},
			_pageNextHref: {
				type: String,
			},
			_showLoadMore: {
				type: Boolean,
				computed: '_computeShowLoadMore(_pageNextHref, _showLoadingSpinner, _showLoadingSkeleton)'
			},
			_health: {
				type: Object,
				value: {
					isHealthy: true,
					errorMessage: ''
				}
			},
			_showNoSubmissions: {
				type: Boolean,
				computed: '_computeShowNoSubmissions(_data, _loading, _loadingMore, _health, filterApplied, searchApplied)'
			},
			_showNoCriteria: {
				type: Boolean,
				computed: '_computeShowNoCriteria(_data, _loading, _loadingMore, _health, filterApplied, searchApplied)'
			},
			masterTeacher: {
				type: Boolean,
				value: false
			},
			_loading: {
				type: Boolean,
				value: true
			},
			_loadingMore: {
				type: Boolean,
				value: false
			},
			dataTelemetryEndpoint: {
				type: String
			},
			_showLoadingSpinner: {
				type: Boolean,
				computed: '_computeShowLoadingSpinner(_loadingMore)'
			},
			_showLoadingSkeleton: {
				type: Boolean,
				computed: '_computeShowLoadingSkeleton(_loading, filtersLoading, searchLoading)'
			},
			hidden: {
				type: Boolean
			},
			_showSearchSummary: {
				type: Boolean,
				computed: '_computeShowSearchSummary(_loading, filtersLoading, searchLoading, searchApplied)'
			},
			_initialLoad: {
				type: Boolean,
				value: true
			},
			returningToQuickEval: {
				type: Boolean,
				value: false
			},
			courseLevel: {
				type: Boolean,
				value: false
			},
			courseLevelName: {
				type: String,
				value: ''
			},
			multiCourseQuickEvalHref: {
				type: String,
				value: ''
			}
		};
	}

	static get observers() {
		return [
			'_loadData(entity)',
			'_handleSorts(entity)',
			'_onFilterErrorChange(filterError)',
			'_onSearchErrorChange(searchError)',
			'_clearFilterAndSearch(hidden)'
		];
	}

	async _handleFilterLoadedNoResultsOnInitialLoad(e) {
		this.removeEventListener(e.type, this._handleFilterLoadedNoResultsOnInitialLoad);
		await this._clearFilterAndSearch();
	}

	async _loadData(entity) {
		if (!entity) {
			return Promise.resolve();
		}
		this._loading = true;

		if (this._initialLoad) {
			this._initialLoad = false;
			this.filterAppliedShortcut();
			this.searchAppliedShortcut();

			if (entity.hasClass('empty') && (this.searchApplied || this.filterApplied)) {
				this.addEventListener('d2l-hm-filter-filters-loaded', this._handleFilterLoadedNoResultsOnInitialLoad);
				return;
			}
		}

		try {
			if (entity.entities) {
				const result = await this._parseActivities(entity);
				this._data = result;
			} else {
				this._data = [];
				this._pageNextHref = undefined;
			}
			this._updateSearchResultsCount(this._data.length);
			this._clearAlerts();
			this.perfMark('submissionsLoadEnd');
			this.logAndDestroyPerformanceEvent('submissions', 'qeViewLoadStart', 'submissionsLoadEnd');
		} catch (e) {
			this._logError(e, { developerMessage: 'Unable to load activities from entity.' });
			this._handleFullLoadFailure();
			return Promise.reject(e);
		} finally {
			this._loading = false;
		}
	}

	_loadMore() {
		if (!this._pageNextHref || this._loadingMore) {
			return;
		}

		this._loadingMore = true;
		this._followHref(this._pageNextHref)
			.then(async function(u) {
				if (!u || !u.entity) {
					return;
				}

				const tbody = this.shadowRoot.querySelector('d2l-quick-eval-submissions-table').shadowRoot.querySelector('d2l-tbody');
				const lastFocusableTableElement = D2L.Dom.Focus.getLastFocusableDescendant(tbody, false);

				try {
					if (u.entity.entities) {
						const result = await this._parseActivities(u.entity);
						this._data = this._data.concat(result);
						this._updateSearchResultsCount(this._data.length);
					}
				} catch (e) {
					console.error('Unable to load more activities from entity.');
					throw e;
				} finally {
					this._loadingMore = false;
					window.requestAnimationFrame(function() {
						const newElementToFocus = D2L.Dom.Focus.getNextFocusable(lastFocusableTableElement, false);
						if (newElementToFocus) {
							newElementToFocus.focus();
						}
					});
				}
			}.bind(this))
			.then(this._clearAlerts.bind(this))
			.catch(function(e) {
				this._logError(e, { developerMessage: 'Unable to load more.' });
				this._loadingMore = false;
				this._handleLoadMoreFailure();
			}.bind(this));
	}

	async _parseActivities(entity) {
		const extraParams = this._getExtraParams(this._getHref(entity, 'self'));

		const promises = [];
		entity.entities.forEach(function(activity) {
			promises.push(new Promise(function(resolve) {
				const activityLink = this._getRelativeUriProperty(activity, extraParams);
				const subDate = this._getSubmissionDate(activity);
				const item = {
					displayName: '',
					userHref: this._getUserHref(activity),
					courseName: '',
					activityNameHref: this._getActivityNameHref(activity),
					localizedSubmissionDate: this.formatDateTime(new Date(subDate)),
					activityLink: this._formBackToQuickEvalLink(activityLink),
					masterTeacher: '',
					isDraft: this._determineIfActivityIsDraft(activity)
				};

				const getUserName = this._getUserPromise(activity, item);
				const getCourseName = this.courseLevel
					? Promise.resolve()
					: this._getCoursePromise(activity, item);

				const getMasterTeacherName =
					this.masterTeacher
						? this._getMasterTeacherPromise(activity, item)
						: Promise.resolve();

				Promise.all([getUserName, getCourseName, getMasterTeacherName]).then(function() {
					resolve(item);
				});
			}.bind(this)));
		}.bind(this));

		this._pageNextHref = this._getPageNextHref(entity);

		const result = await Promise.all(promises);
		return result;
	}

	async _clearFilterAndSearch() {
		// NOTE: clearFilters has to be before clearSearchResults or else
		// it doesn't effectively clears the filters and searches
		if (this.filterApplied) {
			await this.clearFilters();
		}
		if (this.searchApplied) {
			await this.clearSearchResults();
		}
	}

	_handleSorts(entity) {
		// entity is null on initial load
		if (!entity) {
			return Promise.resolve();
		}

		return this._loadSorts(entity).then(sortsEntity => {
			this._headerColumns.forEach((headerColumn, i) => {
				headerColumn.headers.forEach((header, j) => {
					if (header.sortClass) {
						const sort = sortsEntity.getSubEntityByClass(header.sortClass);
						if (sort) {
							this.set(`_headerColumns.${i}.headers.${j}.canSort`, true);
							if (sort.properties && sort.properties.applied && (sort.properties.priority === 0)) {
								const descending = sort.properties.direction === 'descending';
								this.set(`_headerColumns.${i}.headers.${j}.sorted`, true);
								this.set(`_headerColumns.${i}.headers.${j}.desc`, descending);

							} else {
								this.set(`_headerColumns.${i}.headers.${j}.sorted`, false);
								this.set(`_headerColumns.${i}.headers.${j}.desc`, false);
							}
						}
					}
				});
			});
		});
	}

	_handleSortRequested(evt) {
		let result;
		const telemetryData = {};
		const headerId = evt.detail.headerId;
		telemetryData.columnName = headerId;

		this._headerColumns.forEach((headerColumn, i) => {
			this._handleNameSwap(headerColumn, headerId);
			headerColumn.headers.forEach((header, j) => {
				if ((header.key === headerId) && header.canSort) {
					const descending = header.sorted && !header.desc;
					this.set(`_headerColumns.${i}.headers.${j}.sorted`, true);
					this.set(`_headerColumns.${i}.headers.${j}.desc`, descending);

					const customParams = this._numberOfActivitiesToShow > 0 ? { pageSize: this._numberOfActivitiesToShow } : undefined;
					result = this._applySortAndFetchData(header.sortClass, descending, customParams);
					telemetryData.sortDirection = descending ? 'desc' : 'asc';
					this.logSortEvent(telemetryData);
				}
				else {
					this.set(`_headerColumns.${i}.headers.${j}.sorted`, false);
				}
			});
		});

		if (result) {
			this._loading = true;
			return result.then(sortedCollection => {
				this.entity = sortedCollection;
			});
		} else {
			return Promise.reject(new Error(`Could not find sortable header for ${headerId}`));
		}
	}

	_shouldSwapNames(id) {
		if (id === 'firstName') {
			return this._headerColumns[0].headers[0].key !== 'firstName';
		}
		if (id === 'lastName') {
			return this._headerColumns[0].headers[0].key !== 'lastName';
		}
		return false;
	}

	_handleNameSwap(column, id) {
		if (column.key === 'displayName' && this._shouldSwapNames(id)) {
			const tmp = column.headers[0];
			this.set('_headerColumns.0.headers.0', column.headers[1]);
			this.set('_headerColumns.0.headers.1', tmp);
			this.set('_headerColumns.0.headers.0.suffix', ',');
			this.set('_headerColumns.0.headers.1.suffix', '');
			this.set('_headerColumns.0.meta.firstThenLast', id === 'firstName');
		}
	}

	// @override - do not change the name
	_clearErrors() {
		this.searchError = null;
		this.filterError = null;
	}

	_updateSearchResultsCount(count) {
		this._searchResultsCount = count;

		if (this._pageNextHref) {
			this._moreSearchResults = true;
		} else {
			this._moreSearchResults = false;
		}
	}

	_searchResultsMessageEnabled() {
		return this.searchApplied;
	}

	_computeNumberOfActivitiesToShow(data, currentNumberOfActivitiesShown) {
		return Math.max(data.length, currentNumberOfActivitiesShown);
	}

	_computeShowLoadMore(_pageNextHref, _showLoadingSpinner, _showLoadingSkeleton) {
		return _pageNextHref && !_showLoadingSpinner && !_showLoadingSkeleton;
	}

	_clearAlerts() {
		this.set('_health', { isHealthy: true, errorMessage: '' });
	}

	_handleLoadMoreFailure() {
		this.set('_health', { isHealthy: false, errorMessage: 'failedToLoadMore' });
	}

	_handleFullLoadFailure() {
		this.set('_health', { isHealthy: false, errorMessage: 'failedToLoadData' });
	}

	_computeShowNoSubmissions(_data, _loading, _loadingMore, _health, _filterApplied, _searchApplied) {
		return !_data.length && !_loading && !_loadingMore && _health.isHealthy && !(_filterApplied || _searchApplied);
	}

	_computeShowNoCriteria(_data, _loading, _loadingMore, _health, _filterApplied, _searchApplied) {
		return !_data.length && !_loading && !_loadingMore && _health.isHealthy && (_filterApplied || _searchApplied);
	}

	_onFilterErrorChange(filterError) {
		if (filterError) {
			this._logError(filterError.error, { developerMessage: 'Failed to retrieve filter results' });
		}
	}

	_onSearchErrorChange(searchError) {
		if (searchError) {
			this._logError(searchError.error, { developerMessage: 'Failed to retrieve search results.' });
		}
	}

	_computeShowLoadingSpinner(_loadingMore) {
		return _loadingMore;
	}

	_computeShowLoadingSkeleton(_loading, filtersLoading, searchLoading) {
		return _loading || filtersLoading || searchLoading;
	}

	_computeShowSearchSummary(_loading, filtersLoading, searchLoading, searchApplied) {
		return !_loading && !filtersLoading && !searchLoading && searchApplied;
	}

	_computeHeaders(masterTeacher, courseLevel) {

		const result = [];
		result.push({
			key: 'displayName',
			meta: { firstThenLast: true },
			headers: [
				{ key: 'firstName', sortClass: 'first-name', suffix: ',', canSort: false, sorted: false, desc: false, nameColumn: true },
				{ key: 'lastName', sortClass: 'last-name', canSort: false, sorted: false, desc: false, nameColumn: true }
			],
			type: 'user',
			widthOverride: masterTeacher ? 25 : 30
		});
		result.push({
			key: 'activityName',
			headers: [{ key: 'activityName', sortClass: 'activity-name', canSort: false, sorted: false, desc: false }],
			type: 'activity-name',
			truncated: true
		});
		if (!courseLevel) {
			result.push({
				key: 'courseName',
				headers: [{ key: 'courseName', sortClass: 'course-name', canSort: false, sorted: false, desc: false }],
				type: 'none',
				truncated: true
			});
		}
		result.push({
			key: 'localizedSubmissionDate',
			headers: [{ key: 'submissionDate', sortClass: 'completion-date', canSort: false, sorted: false, desc: false }],
			type: 'none',
			widthOverride: masterTeacher ? 15 : 20
		});
		if (masterTeacher) {
			result.push({
				key: 'masterTeacher',
				headers: [{ key: 'masterTeacher', sortClass: 'primary-facilitator', canSort: false, sorted: false, desc: false }],
				type: 'none'
			});
		}
		return result;
	}

	ready() {
		super.ready();
		this.addEventListener('d2l-siren-entity-error', function() {
			this._loading = false;
			this._loadingMore = false;
			this._handleFullLoadFailure();
		}.bind(this));
	}
}

window.customElements.define('d2l-quick-eval-submissions', D2LQuickEvalSubmissions);
