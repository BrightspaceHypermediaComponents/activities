import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {EvaluationHubLocalize} from './EvaluationHubLocalize.js';
import 'd2l-alert/d2l-alert.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-table/d2l-table.js';
import 'd2l-button/d2l-button.js';
import 'd2l-loading-spinner/d2l-loading-spinner.js';
import 'd2l-offscreen/d2l-offscreen.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import 'd2l-polymer-behaviors/d2l-dom-focus.js';
import 'd2l-link/d2l-link.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {Rels, Classes} from 'd2l-hypermedia-constants';
import '../d2l-activity-name/d2l-activity-name.js';
import '../d2l-activity-evaluation-icon/d2l-activity-evaluation-icon-base.js';
import './d2l-no-submissions-image.js';

/**
 * @customElement
 * @polymer
 */

class D2LEvaluationHubActivitiesList extends mixinBehaviors([D2L.PolymerBehaviors.Siren.EntityBehavior, D2L.PolymerBehaviors.Siren.SirenActionBehavior ], EvaluationHubLocalize(PolymerElement)) {
	static get template() {
		return html`
			<style include="d2l-table-style">
				d2l-td {
					font-weight: normal;
				}
				d2l-loading-spinner {
					width: 100%;
				}
				d2l-alert {
					margin: auto;
					margin-top: 1rem;
				}
				.d2l-evaluation-hub-activities-list-load-more-container {
					padding-top: 1rem;
					text-align: right;
					width: 100%;
				}
				[hidden] {
					display: none;
				}
				.d2l-quick-eval-no-submissions {
					text-align: center;
				}
				d2l-no-submissions-image {
					padding-top: 30px;
					padding-bottom: 30px;
					height: 35%;
					width: 35%;
				}
				.d2l-quick-eval-no-submissions-heading {
					@apply --d2l-heading-2;
					margin: 0;
				}
				.d2l-body-standard {
					@apply --d2l-body-compact-text;
				}
			</style>
			<d2l-table hidden$="[[_fullListLoading]]" aria-colcount$="[[_headerColumns.length]]" aria-rowcount$="[[_data.length]]">
				<d2l-thead>
					<d2l-tr>
						<dom-repeat items="[[_headerColumns]]" as="headerColumn">
							<template>
								<template is="dom-if" if="[[_shouldDisplayColumn(headerColumn.key)]]">
									<d2l-th>
										<dom-repeat items="[[headerColumn.headers]]" as="header">
											<template>
												<template is="dom-if" if="[[header.canSort]]">
													<d2l-table-col-sort-button nosort on-click="_sort" id="[[header.key]]">
														<span>[[localize(header.key)]]</span>
													</d2l-table-col-sort-button>
												</template>
												<template is="dom-if" if="[[!header.canSort]]">
													<span>[[localize(header.key)]]</span>
												</template>
											</template>
										</dom-repeat>
									</d2l-th>
								</template>
							</template>
						</dom-repeat>
					</d2l-tr>
				</d2l-thead>
				<d2l-tbody>
					<dom-repeat items="[[_data]]" as="s">
						<template>
							<d2l-tr>
								<d2l-td>
									<d2l-link href="[[s.activityLink]]">[[_getDataProperty(s, 'displayName')]]</d2l-link>
									<d2l-activity-evaluation-icon-base draft$="[[s.isDraft]]"></d2l-activity-evaluation-icon-base>
								</d2l-td>
								<d2l-td>
									<d2l-activity-name href="[[_getDataProperty(s, 'activityNameHref')]]" token="[[token]]"></d2l-activity-name>
								</d2l-td>
								<d2l-td>
									<span>[[_getDataProperty(s, 'courseName')]]</span>
								</d2l-td>
								<d2l-td>
									<span>[[_getDataProperty(s, 'submissionDate')]]</span>
								</d2l-td>
								<template is="dom-if" if="[[_shouldDisplayColumn('masterTeacher')]]">
									<d2l-td>
										<span>[[_getDataProperty(s, 'masterTeacher')]]</span>
									</d2l-td>
								</template>
							</d2l-tr>
						</template>
					</dom-repeat>
				</d2l-tbody>
			</d2l-table>
			<d2l-alert id="list-alert" type="critical" hidden$="[[_health.isHealthy]]">
				[[localize(_health.errorMessage)]]
			</d2l-alert>
			<d2l-offscreen role="alert" aria-live="aggressive" hidden$="[[!_loading]]">[[localize('loading')]]</d2l-offscreen>
			<d2l-loading-spinner size="80" hidden$="[[!_loading]]"></d2l-loading-spinner>
			<template is="dom-if" if="[[_pageNextHref]]">
				<div class="d2l-evaluation-hub-activities-list-load-more-container">
					<d2l-button class="d2l-evaluation-hub-activities-list-load-more" onclick="[[_loadMore]]">[[localize('loadMore')]]</d2l-button>
				</div>
			</template>
			<template is="dom-if" if="[[_shouldShowNoSubmissions(_data.length, _loading, _health.isHealthy)]]">
				<div class="d2l-quick-eval-no-submissions">
					<d2l-no-submissions-image></d2l-no-submissions-image>
					<h2 class="d2l-quick-eval-no-submissions-heading">[[localize('caughtUp')]]</h2>
					<p class="d2l-body-standard">[[localize('noSubmissions')]]</p>
					<p class="d2l-body-standard">[[localize('checkBackOften')]]</p>
				</div>
			</template>
		`;
	}
	static get is() { return 'd2l-evaluation-hub-activities-list'; }
	static get properties() {
		return {
			'masterTeacher': {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			_headerColumns: {
				type: Array,
				value: [
					{
						key: 'displayName',
						headers: [{ key: 'displayName', sortClass: 'first-name', canSort: false }]
					},
					{
						key: 'activityName',
						headers: [{ key: 'activityName', sortClass: 'activity-name', canSort: false }]
					},
					{
						key: 'courseName',
						headers: [{ key: 'courseName', sortClass: 'course-name', canSort: false }]
					},
					{
						key: 'submissionDate',
						headers: [{ key: 'submissionDate', sortClass: 'completion-date', canSort: false }]
					},
					{
						key: 'masterTeacher',
						headers: [{ key: 'masterTeacher', canSort: false }]
					}
				]
			},
			_data: {
				type: Array,
				value: [ ]
			},
			_fullListLoading: {
				type: Boolean,
				value: true
			},
			_health: {
				type: Object,
				value: {
					isHealthy: true,
					errorMessage: ''
				}
			},
			_loading: {
				type: Boolean,
				value: true
			},
			_selfHref: {
				type: String,
				value: ''
			},
			_pageNextHref: {
				type: String,
				value: ''
			}
		};
	}
	static get observers() {
		return [
			'_loadData(entity)',
			'_loadSorts(entity)'
		];
	}
	ready() {
		super.ready();
		this.addEventListener('d2l-siren-entity-error', function() {
			this._fullListLoading = false;
			this._loading = false;
			this._handleFullLoadFailure();
		}.bind(this));
		this._loadMore = this._loadMore.bind(this);
	}

	constructor() { super(); }

	_myEntityStoreFetch(url) {
		return window.D2L.Siren.EntityStore.fetch(url, this.token);
	}

	_shouldShowNoSubmissions(dataLength, isLoading, isHealthy) {
		return !dataLength && !isLoading && isHealthy;
	}

	_loadSorts(entity) {
		return this._followLink(entity, Rels.sorts)
			.then(sortsEntity => {
				if (!sortsEntity || !sortsEntity.entity) {
					return Promise.reject('Could not load sorts endpoint');
				}

				this._headerColumns.forEach((headerColumn, i) => {
					headerColumn.headers.forEach((header, j) => {
						if (header.sortClass) {
							const sort = sortsEntity.entity.getSubEntityByClass(header.sortClass);
							if (sort) {
								this.set(`_headerColumns.${i}.headers.${j}.canSort`, true);
							}
						}
					});
				});

				return Promise.resolve();
			});
	}

	_sort(e) {
		const headers = [].concat.apply([], this._headerColumns.map(headerColumn => headerColumn.headers));
		const header = headers.filter(h => h.key === e.currentTarget.id)[0];

		if (!header) {
			return Promise.reject(`No matching header for ${e.currentTarget.id}`);
		}
		if (!header.canSort) {
			return Promise.reject(`No matching sort for ${e.currentTarget.id}`);
		}

		let ascending = true;

		if (e.currentTarget.nosort) {
			e.currentTarget.removeAttribute('nosort');
		} else if (e.currentTarget.desc) {
			e.currentTarget.removeAttribute('desc');
		} else {
			ascending = false;
			e.currentTarget.setAttribute('desc', 'desc');
		}

		const headerElements = this.shadowRoot.querySelectorAll('d2l-table-col-sort-button');
		headerElements.forEach(h => {
			if (h !== e.currentTarget) {
				h.removeAttribute('desc');
				h.setAttribute('nosort', 'nosort');
			}
		});

		return this._followLink(this.entity, Rels.sorts)
			.then((sortsEntity => {
				if (!sortsEntity || !sortsEntity.entity) {
					return Promise.reject('Could not load sorts endpoint');
				}

				const sort = sortsEntity.entity.getSubEntityByClass(header.sortClass);
				if (!sort) {
					return Promise.reject(`Could not find sort class ${header.sortClass}`);
				}

				const actionName = ascending ? 'sort-ascending' : 'sort-descending';
				const action = sort.getActionByName(actionName);
				if (!action) {
					return Promise.reject(`Could not find sort action ${actionName} for sort ${sort}`);
				}

				return this.performSirenAction(action);
			}).bind(this))
			.then((sortsEntity => {
				if (!sortsEntity) {
					return Promise.reject('Could not load sorts endpoint after sort is applied');
				}
				const action = sortsEntity.getActionByName('apply');
				if (!action) {
					return Promise.reject(`Could not find apply action in ${sortsEntity}`);
				}
				return action;
			}).bind(this))
			.then((collectionAction => {
				const collection = this.performSirenAction(collectionAction);
				return collection;
			}).bind(this))
			.then((collection => {
				this.entity = collection;
			}).bind(this));
	}

	async _loadData(entity) {
		if (!entity) {
			return Promise.resolve();
		}
		this._loading = true;
		this._fullListLoading = true;

		try {
			var result = await this._parseActivities(entity);
			this._data = result;
			this._clearAlerts();
		} catch (e) {
			// Unable to load activities from entity.
			this._handleFullLoadFailure().bind(this);
			return Promise.reject(e);
		} finally {
			this._fullListLoading = false;
			this._loading = false;
		}
	}

	_loadMore() {
		if (this._pageNextHref && !this._loading) {
			this._loading = true;
			this._followHref(this._pageNextHref)
				.then(async function(u) {
					if (u && u.entity) {
						var tbody = this.shadowRoot.querySelector('d2l-tbody');
						var lastFocusableTableElement = D2L.Dom.Focus.getLastFocusableDescendant(tbody, false);

						try {
							var result = await this._parseActivities(u.entity);
							this._data = this._data.concat(result);
						} catch (e) {
						// Unable to load more activities from entity.
							throw e;
						} finally {
							this._loading = false;
							window.requestAnimationFrame(function() {
								var newElementToFocus = D2L.Dom.Focus.getNextFocusable(lastFocusableTableElement, false);
								newElementToFocus.focus();
							});
						}
					}
				}.bind(this))
				.then(this._clearAlerts.bind(this))
				.catch(this._handleLoadMoreFailure.bind(this));
		}
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

	_followLink(entity, rel) {
		var href = this._getHref(entity, rel);
		return this._followHref(href);
	}

	_getHref(entity, rel) {
		if (entity && entity.hasLinkByRel && entity.hasLinkByRel(rel)) {
			return entity.getLinkByRel(rel).href;
		}
		return '';
	}

	_followHref(href) {
		if (href) {
			return this._myEntityStoreFetch(href);
		}
		return Promise.resolve();
	}

	async _parseActivities(entity) {
		this._selfHref = this._getHref(entity, 'self');
		var extraParams = this._getExtraParams(this._selfHref);

		var promises = [];
		entity.entities.forEach(function(activity) {
			promises.push(new Promise(function(resolve) {

				var item = {
					displayName: '',
					courseName: '',
					activityNameHref: this._getActivityNameHref(activity),
					submissionDate: this._getSubmissionDate(activity),
					activityLink: this._getRelativeUriProperty(activity, extraParams),
					masterTeacher: '',
					isDraft: this._determineIfActivityIsDraft(activity)
				};

				var getUserName = this._getUserPromise(activity, item);
				var getCourseName = this._getCoursePromise(activity, item);
				var getMasterTeacherName =
					this._shouldDisplayColumn('masterTeacher')
						? this._getMasterTeacherPromise(activity, item)
						: Promise.resolve();

				Promise.all([getUserName, getCourseName, getMasterTeacherName]).then(function() {
					resolve(item);
				});
			}.bind(this)));
		}.bind(this));

		this._filterHref = this._getHref(entity, Rels.filters);
		this._pageNextHref = this._getHref(entity, 'next');

		const result = await Promise.all(promises);
		return result;
	}

	_determineIfActivityIsDraft(activity) {
		if (activity.hasSubEntityByRel('https://api.brightspace.com/rels/evaluation')) {
			var evaluation = activity.getSubEntityByRel('https://api.brightspace.com/rels/evaluation');
			if (evaluation.properties && evaluation.properties.state === 'Draft') {
				return true;
			}
		}

		return false;
	}

	_getMasterTeacherPromise(entity, item) {
		return this._followLink(entity, Rels.organization)
			.then(function(org) {
				if (org && org.entity) {
					return this._followLink(org.entity, Rels.enrollments);
				}
			}.bind(this))
			.then(function(enrollment) {
				if (enrollment && enrollment.entity) {
					return this._followLink(enrollment.entity, Rels.filters);
				}
			}.bind(this))
			.then(function(filters) {
				if (filters && filters.entity && filters.entity.hasSubEntityByClass('role-markers')) {
					var roleMarkerFilter = filters.entity.getSubEntityByClass('role-markers');
					if (roleMarkerFilter.href) {
						return this._followHref(roleMarkerFilter.href);
					}
				}
			}.bind(this))
			.then(function(filterOptions) {
				if (filterOptions && filterOptions.entity) {
					var action = filterOptions.entity.getActionByName('search');
					if (action) {
						var fields = [
							{
								name: 'search',
								value: 'Primary Facilitator'
							}
						];

						return this.performSirenAction(action, fields);
					}
				}
			}.bind(this))
			.then(function(filterOptions) {
				if (filterOptions) {
					var masterTeacherOption = filterOptions.getSubEntityByRel('https://api.brightspace.com/rels/filter');
					var action = masterTeacherOption.getActionByName('add-filter');
					return this.performSirenAction(action);
				}
			}.bind(this))
			.then(function(filterOptions) {
				if (filterOptions) {
					var action = filterOptions.getActionByName('apply');
					return this.performSirenAction(action);
				}
			}.bind(this))
			.then(function(filters) {
				if (filters) {
					var action = filters.getActionByName('apply');
					return this.performSirenAction(action);
				}
			}.bind(this))
			.then(function(enrollment) {
				if (enrollment && enrollment.hasSubEntityByRel(Rels.userEnrollment)) {
					var userEnrollment = enrollment.getSubEntityByRel(Rels.userEnrollment);
					if (userEnrollment.href) {
						return this._followHref(userEnrollment.href);
					}
				}
			}.bind(this))
			.then(function(userEnrollment) {
				if (userEnrollment && userEnrollment.entity) {
					return this._followLink(userEnrollment.entity, Rels.user);
				}
			}.bind(this))
			.then(function(user) {
				if (user && user.entity && user.entity.hasSubEntityByRel(Rels.displayName)) {
					item.masterTeacher = user.entity.getSubEntityByRel(Rels.displayName).properties.name;
				}
			}.bind(this));
	}

	_getCoursePromise(entity, item) {
		return this._followLink(entity, Rels.organization)
			.then(function(o) {
				if (o && o.entity && o.entity.properties) {
					item.courseName = o.entity.properties.name;
				}
			});
	}

	_getUserPromise(entity, item) {
		return this._followLink(entity, Rels.user)
			.then(function(u) {
				if (u && u.entity && u.entity.hasSubEntityByRel(Rels.displayName)) {
					item.displayName = u.entity.getSubEntityByRel(Rels.displayName).properties.name;
				}
			});
	}

	_getActivityNameHref(entity) {
		if (entity.hasLinkByRel(Rels.Activities.userActivityUsage)) {
			const link = entity.getLinkByRel(Rels.Activities.userActivityUsage);
			return link.href;
		}
		return '';
	}

	_getSubmissionDate(entity) {
		if (entity.hasSubEntityByClass('localized-formatted-date')) {
			var i = entity.getSubEntityByClass('localized-formatted-date');
			return i.properties.text;
		}
		return '';
	}

	_getRelativeUriProperty(entity, extraParams) {
		if (entity.hasSubEntityByClass(Classes.relativeUri)) {
			var i = entity.getSubEntityByClass(Classes.relativeUri);
			return this._buildRelativeUri(i.properties.path, extraParams);
		}
		return '';
	}

	_getDataProperty(item, prop) {
		var result;
		if (Array.isArray(prop) && prop.length > 0) {
			result = item;
			for (var i = 0; i < prop.length; i++) {
				result = result[prop[i]];
			}
		} else {
			result = item[prop];
		}
		return result;
	}

	_shouldDisplayColumn(columnKey) {
		if (columnKey === 'masterTeacher') {
			return this.masterTeacher;
		}
		return true;
	}

	_getExtraParams(selfHref) {
		var extraParams = '';

		var filterVal = this._getQueryStringParam('filter', selfHref);
		if (filterVal) {
			extraParams += '&filter=' + filterVal;
		}
		var sortVal = this._getQueryStringParam('sort', selfHref);
		if (sortVal) {
			extraParams += '&sort=' + sortVal;
		}

		return extraParams;
	}

	_getQueryStringParam(name, url) {
		if (!url) return null;

		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
		var results = regex.exec(url);

		if (!results) return null;
		if (!results[2]) return null;
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

	_buildRelativeUri(url, extraParams) {
		if (extraParams === '') return url;

		if (url.indexOf('?') > -1) {
			return url + extraParams;
		} else {
			return url + '?' + extraParams.substr(1);
		}
	}
}

window.customElements.define(D2LEvaluationHubActivitiesList.is, D2LEvaluationHubActivitiesList);
