import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { QuickEvalLocalize } from './QuickEvalLocalize.js';
import { QuickEvalLogging } from './QuickEvalLogging.js';
import 'd2l-alert/d2l-alert.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-table/d2l-table-wrapper.js';
import 'd2l-button/d2l-button.js';
import 'd2l-offscreen/d2l-offscreen.js';
import 'd2l-polymer-behaviors/d2l-dom-focus.js';
import 'd2l-polymer-behaviors/d2l-id.js';
import 'd2l-link/d2l-link.js';
import 'd2l-users/components/d2l-profile-image.js';
import '../d2l-activity-name/d2l-activity-name.js';
import '../d2l-activity-evaluation-icon/d2l-activity-evaluation-icon-base.js';
import './d2l-quick-eval-no-submissions-image.js';
import './d2l-quick-eval-no-submissions-text.js';
import './d2l-quick-eval-no-criteria-results-image.js';
import './d2l-quick-eval-submissions-skeleton.js';
import 'd2l-loading-spinner/d2l-loading-spinner.js';

/**
 * @customElement
 * @polymer
 */

class D2LQuickEvalSubmissionsTable extends QuickEvalLogging(QuickEvalLocalize(PolymerElement)) {
	static get template() {
		const quickEvalSubmissionsTableTemplate = html`
			<style include="d2l-table-style">
				:host {
					display: block;
				}
				td:not(.d2l-username-column) {
					font-size: 0.7rem;
				}
				td.d2l-username-column {
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.d2l-user-badge-image {
					display: inline-block;
					padding-right: 0.6rem;
					vertical-align: middle;
				}
				:host(:dir(rtl)) .d2l-user-badge-image {
					padding-right: 0;
					padding-left: 0.6rem;
				}
				d2l-alert {
					margin: auto;
					margin-top: 1rem;
				}
				.d2l-quick-eval-submissions-table-load-more-container {
					padding-top: 1rem;
					text-align: right;
					width: 100%;
				}
				:host(:dir(rtl)) .d2l-quick-eval-submissions-table-load-more-container {
					text-align: left;
				}
				.d2l-quick-eval-30-column {
					width: 30%;
				}
				.d2l-quick-eval-25-column {
					width: 25%;
				}
				.d2l-quick-eval-20-column {
					width: 20%;
				}
				.d2l-quick-eval-15-column {
					width: 15%;
				}
				.d2l-quick-eval-truncated-column {
					max-width: 10rem;
					white-space: nowrap;
				}
				d2l-activity-evaluation-icon-base {
					padding-left: 0.6rem;
				}
				d2l-loading-spinner {
					width: 100%;
				}
				:host(:dir(rtl)) d2l-activity-evaluation-icon-base {
					padding-left: 0;
					padding-right: 0.6rem;
				}
				d2l-activity-name {
					padding-right: 1.4rem;
					overflow: hidden;
					text-overflow: ellipsis;
					max-width: 24rem;
					white-space: nowrap;
				}
				:host(:dir(rtl)) d2l-activity-name {
					padding-right: 0;
					padding-left: 1.4rem;
				}
				.d2l-course-name-column {
					overflow: hidden;
					text-overflow: ellipsis;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-quick-eval-no-submissions,
				.d2l-quick-eval-no-criteria-results {
					text-align: center;
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
				.d2l-quick-eval-no-criteria-results-heading {
					@apply --d2l-heading-2;
					margin: 0;
				}
				.d2l-body-standard {
					@apply --d2l-body-compact-text;
				}
				.d2l-quick-eval-submissions-course-name-heading {
					@apply --d2l-heading-3;
					margin-top: 0.8rem;
					margin-bottom: 0.6rem;
					max-width: 24rem;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
				.d2l-quick-eval-submissions-overflow-hidden {
					overflow: hidden;
					text-overflow: ellipsis;
				}
			</style>
			<d2l-offscreen id$="[[_tableDescriptionId]]">[[localize('tableTitle')]]</d2l-offscreen>
			<template is="dom-if" if="[[courseLevel]]">
				<h2 title="[[courseLevelName]]" class="d2l-quick-eval-submissions-course-name-heading">[[courseLevelName]]</h2>
			</template>
			<d2l-table-wrapper type="light" hidden$="[[showLoadingSkeleton]]">
				<table class="d2l-table" aria-describedby$="[[_tableDescriptionId]]">
					<thead>
						<tr>
							<template is="dom-repeat" items="[[headerColumns]]" as="headerColumn">
								<th class$=[[_getWidthCssClass(headerColumn.widthOverride)]]>
									<template is="dom-repeat" items="[[headerColumn.headers]]" as="header">
										<template is="dom-if" if="[[header.canSort]]">
											<d2l-table-col-sort-button
												nosort$="[[!header.sorted]]"
												desc$="[[header.desc]]"
												on-click="_dispatchSortRequestedEvent"
												id="[[header.key]]"
												title="[[_localizeSortText(header.key)]]"
												aria-label$="[[_localizeSortText(header.key)]]"
												aria-live="assertive"
											>
												<span hidden="true" aria-hidden="[[!header.nameColumn]]">[[_localizeSortText(header.key)]]</span>
												<span aria-hidden="true">[[localize(header.key)]]</span>
											</d2l-table-col-sort-button>
											<template is="dom-if" if="[[header.suffix]]">
												<span>[[header.suffix]]&nbsp;</span>
											</template>
										</template>
										<template is="dom-if" if="[[!header.canSort]]">
											<span>[[localize(header.key)]]</span>
											<template is="dom-if" if="[[header.suffix]]">
												<span>[[header.suffix]]&nbsp;</span>
											</template>
										</template>
									</template>
								</th>
							</template>
						</tr>
					</thead>
					<tbody>
						<template is="dom-repeat" items="[[_data]]" as="s">
							<tr>
								<template is="dom-repeat" items="[[headerColumns]]" as="c">
									<template is="dom-if" if="[[_isColumn(c, 'user')]]">
										<td class="d2l-quick-eval-truncated-column d2l-username-column">
											<template is="dom-if" if="[[s.userHref]]">
												<d2l-profile-image
													class="d2l-user-badge-image"
													href="[[s.userHref]]"
													token="[[token]]"
													small
													aria-hidden="true">
												</d2l-profile-image>
											</template>
											<d2l-link
												title="[[_localizeEvaluationText(s, c.meta.firstThenLast)]]"
												href="[[s.activityLink]]"
												aria-label$="[[_localizeEvaluationText(s, c.meta.firstThenLast)]]"
												class="d2l-quick-eval-submissions-table-name-link"
											>[[_formatDisplayName(s, c.meta.firstThenLast)]]</d2l-link>
											<d2l-activity-evaluation-icon-base draft$="[[s.isDraft]]"></d2l-activity-evaluation-icon-base>
										</td>
									</template>
									<template is="dom-if" if="[[_isColumn(c, 'activity-name')]]">
										<td  class$="[[_computeTruncateClass(c.truncated)]]">
											<d2l-activity-name href="[[s.activityNameHref]]" token="[[token]]"></d2l-activity-name>
										</td>
									</template>
									<template is="dom-if" if="[[_isColumn(c, 'none')]]">
										<td class$="[[_computeTruncateClass(c.truncated)]] d2l-quick-eval-submissions-overflow-hidden">
											<span title="[[_computeColumnText(s, c)]]">[[_computeColumnText(s, c)]]</span>
										</td>
									</template>
								</template>
							</tr>
						</template>
					</tbody>
				</table>
			</d2l-table-wrapper>
			<d2l-alert class="list-alert" type="critical" hidden$="[[_health.isHealthy]]">
				[[localize(_health.errorMessage)]]
			</d2l-alert>
			<d2l-offscreen role="alert" aria-live="aggressive" hidden$="[[!isLoading]]">[[localize('loading')]]</d2l-offscreen>
			<d2l-quick-eval-submissions-skeleton hidden$="[[!showLoadingSkeleton]]"></d2l-quick-eval-submissions-skeleton>
	     	<d2l-loading-spinner size="80" hidden$="[[!showLoadingSpinner]]"></d2l-loading-spinner>

			<template is="dom-if" if="[[showLoadMore]]">
				<div class="d2l-quick-eval-submissions-table-load-more-container">
					<d2l-button class="d2l-quick-eval-submissions-table-load-more" onclick="[[_dispatchLoadMore]]">[[localize('loadMore')]]</d2l-button>
				</div>
			</template>
			<template is="dom-if" if="[[showNoSubmissions]]">
				<div class="d2l-quick-eval-no-submissions">
					<d2l-quick-eval-no-submissions-image></d2l-quick-eval-no-submissions-image>
					<d2l-quick-eval-no-submissions-text course-level="[[courseLevel]]" multi-course-quick-eval-href="[[multiCourseQuickEvalHref]]"></d2l-quick-eval-no-submissions-text>
				</div>
			</template>
			<template is="dom-if" if="[[showNoCriteria]]">
				<div class="d2l-quick-eval-no-criteria-results">
					<d2l-quick-eval-no-criteria-results-image></d2l-quick-eval-no-criteria-results-image>
					<h2 class="d2l-quick-eval-no-criteria-results-heading">[[localize('noResults')]]</h2>
					<p class="d2l-body-standard">[[localize('noCriteriaMatch')]]</p>
				</div>
			</template>
		`;

		quickEvalSubmissionsTableTemplate.setAttribute('strip-whitespace', 'strip-whitespace');
		return quickEvalSubmissionsTableTemplate;
	}
	static get properties() {
		return {
			headerColumns: {
				type: Array,
				value: []
			},
			_data: {
				type: Array,
				value: [ ]
			},
			showLoadingSkeleton: {
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
			_defaultColumnWidth: {
				type: Number,
				computed: '_computeDefaultColumnWidth(headerColumns)'
			},
			showLoadingSpinner: {
				type: Boolean,
				value: false
			},
			showLoadMore: {
				type: Boolean,
				value: false
			},
			showNoSubmissions: {
				type: Boolean,
				value: false
			},
			showNoCriteria: {
				type: Boolean,
				value: false
			},
			isLoading: {
				type: Boolean,
				computed: '_computeIsLoading(showLoadingSpinner, showLoadingSkeleton)'
			},
			_tableDescriptionId: {
				type: String,
				computed: '_computeTableDescriptionId()'
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
			'_handleNameFocusOnPageForwardBack(showLoadingSkeleton, _data)'
		];
	}

	_computeIsLoading(showLoadingSpinner, showLoadingSkeleton) {
		return showLoadingSpinner || showLoadingSkeleton;
	}

	_handleNameFocusOnPageForwardBack() {
		const isComingFromBrowserButton = (window.performance && window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD);
		const isTableReady = !this.showLoadingSkeleton && this._data.length > 0;

		if ((isComingFromBrowserButton || this.returningToQuickEval) && isTableReady) {
			this.async(() => {
				const firstNameLink = this.shadowRoot.querySelector('.d2l-quick-eval-submissions-table-name-link');
				if (firstNameLink) {
					this.async(() => {
						firstNameLink.focus();
					});
				}
			});
		}
	}

	_localizeSortText(columnName) {
		const localizedColumnName = this.localize(columnName);
		return this.localize('sortBy', 'columnName', localizedColumnName);
	}

	_localizeEvaluationText(
		data,
		firstThenLast
	) {
		const formattedDisplayName = this._formatDisplayName(data, firstThenLast);
		return this.localize('evaluate', 'displayName', formattedDisplayName);
	}

	_formatDisplayName(
		data,
		firstThenLast
	) {
		const firstName = data.displayName.firstName;
		const lastName = data.displayName.lastName;
		const defaultDisplayName = data.displayName.defaultDisplayName;

		if (!lastName && !firstName) {
			return defaultDisplayName;
		}
		if (!lastName) {
			return firstName;
		}
		if (!firstName) {
			return lastName;
		}

		if (firstThenLast) {
			return `${firstName} ${lastName}`;
		}

		return `${lastName}, ${firstName}`;
	}

	_getWidthCssClass(relativeWidth) {
		return `d2l-quick-eval-${relativeWidth || this._defaultColumnWidth}-column`;
	}

	_computeDefaultColumnWidth(headers) {
		let unDef = 0, totalDef = 0;
		headers.forEach(h => {
			totalDef += h.widthOverride || 0;
			if (!h.widthOverride) {
				unDef++;
			}
		});
		if (unDef > 0) {
			return (100 - totalDef) / unDef;
		}
		return 0;
	}

	_computeTruncateClass(truncated) {
		return truncated ? 'd2l-quick-eval-truncated-column' : '';
	}

	_isColumn(column, type) {
		return column.type === type || (!column.type && type === 'none');
	}

	_computeColumnText(row, column) {
		return row[column.key];
	}

	_computeTableDescriptionId() {
		return D2L.Id.getUniqueId();
	}

	_dispatchSortRequestedEvent(evt) {
		const headerId = evt.currentTarget.id;

		this.dispatchEvent(
			new CustomEvent(
				'd2l-quick-eval-submissions-table-sort-requested',
				{
					detail: {
						headerId: headerId
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}

	_dispatchLoadMore() {
		this.dispatchEvent(
			new CustomEvent(
				'd2l-quick-eval-submissions-table-load-more',
				{
					composed: true,
					bubbles: true
				}
			)
		);
	}
}

window.customElements.define('d2l-quick-eval-submissions-table', D2LQuickEvalSubmissionsTable);
