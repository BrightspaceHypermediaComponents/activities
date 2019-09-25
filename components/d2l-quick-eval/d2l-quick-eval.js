import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from './QuickEvalLocalize.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import './d2l-quick-eval-view-toggle.js';
import './d2l-quick-eval-activities.js';
import './d2l-quick-eval-submissions.js';
import './behaviors/d2l-quick-eval-telemetry-behavior.js';

/**
 * @customElement
 * @polymer
 */
class D2LQuickEval extends
	mixinBehaviors (
		[
			D2L.PolymerBehaviors.QuickEval.TelemetryBehaviorImpl
		],
		QuickEvalLocalize(PolymerElement)
	) {
	static get template() {
		return html`
			<style>
				:host {
					display: block;
				}
				h1 {
					@apply --d2l-heading-1;
					margin: 0;
				}
				.d2l-quick-eval-header {
					float: left;
				}
				:host(:dir(rtl)) .d2l-quick-eval-header-with-toggle {
					float: right;
				}
				.d2l-quick-eval-header-with-toggle {
					float: left;
					padding-bottom: 1.2rem;
				}
				:host([hidden]) {
					display: none;
				}
				@media (min-width: 525px) {
					d2l-quick-eval-view-toggle {
						clear: both;
						float: left;
					}
					:host(:dir(rtl)) d2l-quick-eval-view-toggle {
						float: right;
					}
				}
			</style>
			<template is="dom-if" if="[[headerText]]">
				<h1 class="d2l-quick-eval-header-with-toggle" hidden$="[[!activitiesViewEnabled]]">[[headerText]]</h1>
				<h1 class="d2l-quick-eval-header" hidden$="[[activitiesViewEnabled]]">[[headerText]]</h1>
			</template>
			<d2l-quick-eval-view-toggle current-selected="[[toggleState]]" toggle-href="[[toggleHref]]" hidden$="[[!activitiesViewEnabled]]" on-d2l-quick-eval-view-toggle-changed="_toggleView"></d2l-quick-eval-view-toggle>
			<d2l-quick-eval-submissions href="[[_lazySubmissionsHref]]" token="[[token]]" logging-endpoint="[[loggingEndpoint]]" data-telemetry-endpoint="[[dataTelemetryEndpoint]]" hidden$="[[_showActivitiesView]]" master-teacher="[[masterTeacher]]"></d2l-quick-eval-submissions>
			<d2l-quick-eval-activities href="[[_lazyActivitiesHref]]" token="[[token]]" logging-endpoint="[[loggingEndpoint]]" hidden$="[[!_showActivitiesView]]"></d2l-quick-eval-activities>
		`;
	}
	ready() {
		super.ready();
		this.perfMark('qeViewLoadStart');
	}
	static get properties() {
		return {
			headerText: {
				type: String
			},
			masterTeacher: {
				type: Boolean,
				value: false
			},
			activitiesViewEnabled: {
				type: Boolean,
				value: false
			},
			_showActivitiesView: {
				type: Boolean,
				value: false
			},
			loggingEndpoint: {
				type: String
			},
			dataTelemetryEndpoint: {
				type: String
			},
			submissionsHref: {
				type: String
			},
			_lazySubmissionsHref: {
				type: String,
				computed: '_computeLazySubmissionsHref(submissionsHref, _showActivitiesView)'
			},
			activitiesHref: {
				type: String
			},
			_lazyActivitiesHref: {
				type: String,
				computed: '_computeLazyActivitiesHref(activitiesHref, _showActivitiesView, activitiesViewEnabled)'
			},
			toggleHref: {
				type: String
			},
			toggleState: {
				type: String
			},
			token: {
				type: Object,
			}
		};
	}

	_toggleView(e) {
		if (e.detail.view === 'submissions' || !this.activitiesViewEnabled) {
			this._showActivitiesView = false;
		} else {
			this._showActivitiesView = true;
		}
		this.logViewQuickEvalEvent(e.detail.view);
	}

	_computeLazySubmissionsHref(href, state) {
		if (!state) {
			return href;
		}
		return '';
	}

	_computeLazyActivitiesHref(href, state, enabled) {
		if (state && enabled) {
			return href;
		}
		return '';
	}

	_activitiesHref(activitiesViewEnabled) {
		return activitiesViewEnabled ? this.activitiesHref : '';
	}
}

window.customElements.define('d2l-quick-eval', D2LQuickEval);
