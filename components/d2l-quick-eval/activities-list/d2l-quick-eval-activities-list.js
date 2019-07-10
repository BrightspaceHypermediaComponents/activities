import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from '../QuickEvalLocalize.js';
import '../activity-card/d2l-quick-eval-activity-card.js';

class D2LQuickEvalActivitiesList extends QuickEvalLocalize(PolymerElement) {
	static get is() { return 'd2l-quick-eval-activities-list'; }
	static get template() {
		return html`
		<style>
			.d2l-quick-eval-activities-list-remove-ul-styling {
				list-style-type: none;
				margin: 0;
				padding: 0;
			}
		</style>
		<ul class="d2l-quick-eval-activities-list-remove-ul-styling">
			<dom-repeat items="[[courses]]" as="c">
				<template>
					<li>
						<h2>[[c.name]]</h2>
						<ul class="d2l-quick-eval-activities-list-remove-ul-styling">
							<dom-repeat items="[[c.activities]]" as="a">
								<template>
									<li>
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
									</li>
								</template>
							</dom-repeat>
						</ul>
					</li>
				</template>
			</dom-repeat>
		</ul>
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
