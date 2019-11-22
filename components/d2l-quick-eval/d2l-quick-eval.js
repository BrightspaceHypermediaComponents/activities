import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from './QuickEvalLocalize.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import './d2l-quick-eval-view-toggle.js';
import './d2l-quick-eval-activities.js';
import './d2l-quick-eval-submissions.js';
import './behaviors/d2l-quick-eval-telemetry-behavior.js';
import './dismiss/d2l-quick-eval-ellipsis-menu.js';

const submissions = 'submissions';
const activities = 'activities';

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
					flex-grow: 1;
				}
				.d2l-quick-eval-header-with-toggle {
					padding-bottom: 1.2rem;
				}
				:host([hidden]) {
					display: none;
				}
				.top-container {
					display: flex;
				}
				.top-container d2l-quick-eval-ellipsis-menu {
					align-self: center;
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
			<div class="top-container">
				<template is="dom-if" if="[[headerText]]">
					<h1 class="d2l-quick-eval-header-with-toggle" hidden$="[[!activitiesViewEnabled]]">[[headerText]]</h1>
					<h1 class="d2l-quick-eval-header" hidden$="[[activitiesViewEnabled]]">[[headerText]]</h1>
				</template>
				<d2l-quick-eval-ellipsis-menu hidden$="[[!dismissEnabled]]"></d2l-quick-eval-ellipsis-menu>
			</div>
			<d2l-quick-eval-view-toggle current-selected="[[toggleState]]" toggle-href="[[toggleHref]]" hidden$="[[!activitiesViewEnabled]]" on-d2l-quick-eval-view-toggle-changed="_toggleView"></d2l-quick-eval-view-toggle>
			<d2l-quick-eval-submissions href="[[_lazySubmissionsHref]]" token="[[token]]" logging-endpoint="[[loggingEndpoint]]" data-telemetry-endpoint="[[dataTelemetryEndpoint]]" hidden$="[[_displayActivities(toggleState, activitiesViewEnabled)]]" master-teacher="[[masterTeacher]]"></d2l-quick-eval-submissions>
			<d2l-quick-eval-activities href="[[_lazyActivitiesHref]]" token="[[token]]" logging-endpoint="[[loggingEndpoint]]" hidden$="[[!_displayActivities(toggleState, activitiesViewEnabled)]]"></d2l-quick-eval-activities>
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
			dismissEnabled: {
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
				computed: '_computeLazySubmissionsHref(submissionsHref, toggleState)'
			},
			activitiesHref: {
				type: String
			},
			_lazyActivitiesHref: {
				type: String,
				computed: '_computeLazyActivitiesHref(activitiesHref, toggleState, activitiesViewEnabled)'
			},
			toggleHref: {
				type: String
			},
			toggleState: {
				type: String,
				value: submissions
			},
			token: {
				type: Object,
			}
		};
	}

	_displayActivities(toggleState, activitiesViewEnabled) {
		if (!activitiesViewEnabled) {
			return false;
		}

		return toggleState === activities;
	}

	_toggleView(e) {
		this.toggleState = e.detail.view;
		this.logViewQuickEvalEvent(e.detail.view);
	}

	_computeLazySubmissionsHref(submissionsHref, toggleState) {
		if (toggleState === submissions || this._lazySubmissionsHref) {
			return submissionsHref;
		}
		return '';
	}

	_computeLazyActivitiesHref(activitiesHref, toggleState, activitiesViewEnabled) {
		if ((toggleState === activities && activitiesViewEnabled) || this._lazyActivitiesHref) {
			return activitiesHref;
		}
		return '';
	}
}

window.customElements.define('d2l-quick-eval', D2LQuickEval);
