import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from '../QuickEvalLocalize.js';
import 'd2l-tooltip/d2l-tooltip.js';

const activityTypeLocalizeNew = {
	assignment: 'newSubmissions',
	discussion: 'newPosts',
	quiz: 'newAttempts'
};

const activityTypeLocalizeDetail = {
	assignment: 'newSubmissionDetails',
	quiz: 'newAttemptsDetails'
};

class D2LQuickEvalActivityCardUnreadSubmissions extends QuickEvalLocalize(PolymerElement) {
	static get is() { return 'd2l-quick-eval-activity-card-unread-submissions'; }
	static get template() {
		return html`
			<style>
					.d2l-quick-eval-activity-card-submissions-container {
						align-items: baseline;
						display: flex;
						justify-content: space-around;
						margin: 0.35rem 0;
						cursor: pointer;
					}
					.d2l-quick-eval-activity-card-submissions-number {
						font-size: 1.2rem;
						margin: 0 0.6rem;
					}
					.d2l-quick-eval-activity-card-submissions-subtitle {
						font-size: 0.6rem;
					}
					[hidden] {
						display: none;
					}
				@media (min-width: 525px) {
					.d2l-quick-eval-activity-card-submissions-container {
						align-items: center;
						flex-direction: column;
						margin: 0;
					}
					.d2l-quick-eval-activity-card-submissions-number {
						font-size: 1.5rem;
						margin: 0;
					}
					.d2l-quick-eval-activity-card-submissions-subtitle {
						font-size: 0.7rem;
					}
				}
				.d2l-quick-eval-activity-card-submissions-container:active div,
				.d2l-quick-eval-activity-card-submissions-container:focus div,
				.d2l-quick-eval-activity-card-submissions-container:hover div {
					 text-decoration: underline;
					 color: var(--d2l-color-celestine);
				}
			</style>
			<div id="d2l-quick-eval-activity-card-submissions-container" class="d2l-quick-eval-activity-card-submissions-container">
				<div class="d2l-quick-eval-activity-card-submissions-number">[[_getNewSubmissionsNumber(unread, resubmitted)]]</div>
				<div class="d2l-quick-eval-activity-card-submissions-subtitle">[[_getNewSubmissionsSubtitle(activityType)]]</div>
			</div>
			<d2l-tooltip 
				hidden$="[[_resubmissionsExist(resubmitted)]]"
				for="d2l-quick-eval-activity-card-submissions-container" 
				position="bottom">[[_getSubmissionTooltipText(unread, resubmitted, activityType)]]
			</d2l-tooltip>
		`;
	}
	static get properties() {
		return {
			unread: {
				type: Number,
				value: 0
			},
			resubmitted: {
				type: Number,
				value: 0
			},
			activityType: {
				type: String,
			}
		};
	}

	_resubmissionsExist(resubmitted) {
		return resubmitted === 0;
	}

	_getNewSubmissionsNumber(unread, resubmitted) {
		return unread + resubmitted;
	}
	_getNewSubmissionsSubtitle(activityType) {
		return this.localize(activityTypeLocalizeNew[activityType]);
	}

	_getSubmissionTooltipText(unread, resubmitted, activityType) {
		//this returns the term for 1 resubmission on 0 resubmissions, but the tooltip is hidden when that happens
		switch (activityType) {
			case 'discussion':
				return unread + resubmitted > 1
					? this.localize('newPostDetails', 'numInteractions', unread + resubmitted)
					: this.localize('newPostSingularDetails', 'numInteractions', unread);
			case 'quiz':
				return resubmitted > 1
					? this.localize(activityTypeLocalizeDetail[activityType], 'newNum', unread, 'reAttemptNum', resubmitted)
					: this.localize('newAttemptsSingularReattemptDetails', 'newNum', unread);
			default:
				return resubmitted > 1
					? this.localize(activityTypeLocalizeDetail[activityType], 'newNum', unread, 'resub', resubmitted)
					: this.localize('newSubmissionSingularDetails', 'newNum', unread);
		}
	}
}

window.customElements.define(D2LQuickEvalActivityCardUnreadSubmissions.is, D2LQuickEvalActivityCardUnreadSubmissions);
