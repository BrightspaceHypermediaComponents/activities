import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from './QuickEvalLocalize.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import './d2l-quick-eval-view-toggle.js';
import './d2l-quick-eval-activities.js';
import './d2l-quick-eval-submissions.js';

/**
 * @customElement
 * @polymer
 */
class D2LQuickEval extends  QuickEvalLocalize(PolymerElement) {
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
				d2l-quick-eval-view-toggle {
					clear: both;
					float: left;
				}
				.d2l-quick-eval-header {
					float: left;
				}
				:host(:dir(rtl)) d2l-quick-eval-view-toggle,
				:host(:dir(rtl)) .d2l-quick-eval-header-with-toggle {
					float: right;
				}
				.d2l-quick-eval-header-with-toggle {
					float: left;
					padding-bottom: 1.2rem;
				}
				[hidden] {
					display: none;
				}
			</style>
			<template is="dom-if" if="[[headerText]]">
				<h1 class="d2l-quick-eval-header-with-toggle" hidden$="[[!activitiesViewEnabled]]">[[headerText]]</h1>
				<h1 class="d2l-quick-eval-header" hidden$="[[activitiesViewEnabled]]">[[headerText]]</h1>
			</template>
			<d2l-quick-eval-view-toggle current-selected="[[toggleState]]" toggle-href="[[toggleHref]]" hidden$="[[!activitiesViewEnabled]]" on-d2l-quick-eval-view-toggle-changed="_toggleView"></d2l-quick-eval-view-toggle>
			<d2l-quick-eval-submissions href="[[_submissionsHref(submissionsHref, href)]]" token="[[token]]" logging-endpoint="[[loggingEndpoint]]" data-telemetry-endpoint="[[dataTelemetryEndpoint]]" hidden$="[[_showActivitiesView]]" master-teacher="[[masterTeacher]]" search-enabled="[[searchEnabled]]"></d2l-quick-eval-submissions>
			<d2l-quick-eval-activities href="[[activitiesHref]]" token="[[token]]" logging-endpoint="[[loggingEndpoint]]" hidden$="[[!_showActivitiesView]]"></d2l-quick-eval-activities>
		`;
	}

	static get properties() {
		return {
			headerText: {
				type: String
			},
			masterTeacher: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			activitiesViewEnabled: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			_showActivitiesView: {
				type: Boolean,
				value: false
			},
			searchEnabled: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			loggingEndpoint: {
				type: String
			},
			dataTelemetryEndpoint: {
				type: String
			},
			href: {
				type: String
			},
			submissionsHref: {
				type: String
			},
			activitiesHref: {
				type: String
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

	static get is() { return 'd2l-quick-eval'; }

	_toggleView(e) {
		if (e.detail.view === 'submissions') {
			this._showActivitiesView = false;
		} else {
			this._showActivitiesView = true;
		}
	}

	// Temporary until the LMS has been updated to use the new property
	_submissionsHref() {
		return this.submissionsHref || this.href;
	}
}

window.customElements.define('d2l-quick-eval', D2LQuickEval);
