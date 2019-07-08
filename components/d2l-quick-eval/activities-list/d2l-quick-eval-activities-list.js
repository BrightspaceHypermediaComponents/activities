import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from '../QuickEvalLocalize.js';
import '../activity-card/d2l-quick-eval-activity-card.js';

class D2LQuickEvalActivitiesList extends QuickEvalLocalize(PolymerElement) {
	static get is() { return 'd2l-quick-eval-activities-list'; }
	static get template() {
		return html`
			<dom-repeat items="[[courses]]" as="c">
				<template>
					<h3>[[c.name]]</h3>
					<dom-repeat items="[[c.activities]]" as="a">
						<template>
							<d2l-quick-eval-activity-card
							assigned="[[a.assigned]]"
							completed="[[a.completed]]"
							published="[[a.published]]"
							evaluated="[[a.evaluated]]"
							unread="[[a.unread]]"
							resubmitted="[[a.resubmitted]]"
							due-date="[[a.dueDate]]"
							activity-type="[[localize(a.activityType)]]"
							activity-name-href="[[a.activityNameHref]]"
							token="[[token]]"></d2l-quick-eval-activity-card>
						</template>
					</dom-repeat>
				</template>
			</dom-repeat>
		`;
	}
	static get properties() {
		return {
			courses: {
				type: Array,
				value: [
					// {
					// 	name: '',
					// 	activities: {
					// 		courseName: '',
					// 		assigned: 0,
					// 		completed: 0,
					// 		published: 0,
					// 		evaluated: 0,
					// 		unread: 0,
					// 		resubmitted: 0,
					// 		dueDate: '',
					// 		activityType: '',
					// 		activityNameHref: ''
					// 	}
					// }
				]
			},
			token: {
				type: String
			}
		};
	}
}

window.customElements.define(D2LQuickEvalActivitiesList.is, D2LQuickEvalActivitiesList);
