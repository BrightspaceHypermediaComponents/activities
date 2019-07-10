import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from '../QuickEvalLocalize.js';
import 'd2l-tooltip/d2l-tooltip.js';

class D2LQuickEvalActivityCardUnreadSubmissions extends QuickEvalLocalize(PolymerElement) {
	static get is() { return 'd2l-quick-eval-activity-card-unread-submissions'; }
	static get template() {
		return html`
			<style>
				#d2l-quick-eval-activity-card-submissions {
					text-align: center;
					align-items: center;
					display: flex;
					justify-content: space-around;
				}
			</style>
			<div id="d2l-quick-eval-activity-card-submissions">[[_getNewSubmissionsText(unread, resubmitted)]]</div>
			<d2l-tooltip for="d2l-quick-eval-activity-card-submissions" position="bottom">[[_getSubmissionTooltipText(unread, resubmitted)]]</d2l-tooltip>
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
			}
		};
	}

	_getNewSubmissionsText() {
		return this.localize('unreadSubmissions', 'num', this.unread + this.resubmitted);
	}

	_getSubmissionTooltipText() {
		return this.localize('unreadSubmissionsDetail', 'unread', this.unread, 'resub', this.resubmitted);
	}
}

window.customElements.define(D2LQuickEvalActivityCardUnreadSubmissions.is, D2LQuickEvalActivityCardUnreadSubmissions);
