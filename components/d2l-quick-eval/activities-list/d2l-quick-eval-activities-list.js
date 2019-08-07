import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from '../QuickEvalLocalize.js';
import '../activity-card/d2l-quick-eval-activity-card.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-typography/d2l-typography-shared-styles.js';

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
			.d2l-quick-eval-activities-list-card-spacer {
				background: var(--d2l-color-sylvite);
				height: .3rem;
				width: 100vw;
				position: relative;
				left: 50%;
				right: 50%;
				margin-left: -50vw;
				margin-right: -50vw;
			}
			.d2l-quick-eval-activities-list-card-spacer-border {
				border-top: 1px solid var(--d2l-color-mica);
			}
			.d2l-quick-eval-activities-course-name-heading {
				@apply --d2l-heading-3;
			}
			@media (min-width: 525px) {
				.d2l-quick-eval-activities-list-card-spacer {
					display: none;
				}
				:host ul ul li {
					margin-top: .6rem;
					margin-bottom: .6rem;
				}
			}
		</style>
		<ul class="d2l-quick-eval-activities-list-remove-ul-styling">
			<dom-repeat items="[[courses]]" as="c">
				<template>
					<li>
						<h2 class="d2l-quick-eval-activities-course-name-heading">[[c.name]]</h2>
						<ul class="d2l-quick-eval-activities-list-remove-ul-styling">
							<dom-repeat items="[[c.activities]]" as="a">
								<template>
									<li>
										<div class="d2l-quick-eval-activities-list-card-spacer"></div>
										<d2l-quick-eval-activity-card
										assigned="[[a.assigned]]"
										completed="[[a.completed]]"
										published="[[a.published]]"
										evaluated="[[a.evaluated]]"
										unread="[[a.unread]]"
										resubmitted="[[a.resubmitted]]"
										publish-all="[[a.publishAll]]"
										submission-list-href="[[a.submissionListHref]]"
										evaluate-all-href="[[a.evaluateAllHref]]"
										evaluate-new-href="[[a.evaluateNewHref]]"
										due-date="[[a.dueDate]]"
										activity-type="[[a.activityType]]"
										activity-name-href="[[a.activityNameHref]]"
										token="[[token]]"></d2l-quick-eval-activity-card>
										<div class="d2l-quick-eval-activities-list-card-spacer d2l-quick-eval-activities-list-card-spacer-border"></div>
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
