import { html, LitElement } from 'lit-element/lit-element.js';
import { LitQuickEvalLocalize } from '../LitQuickEvalLocalize.js';
import '../activity-card/d2l-quick-eval-activity-card.js';
import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import '../activity-card/d2l-quick-eval-activity-card.js';

class D2LQuickEvalDismissedActivitiesList extends LitQuickEvalLocalize(LitElement) {
	render() {
		return html`
			<d2l-input-checkbox>
				<d2l-quick-eval-activity-card
					assigned="20"
					completed="2"
					published="3"
					evaluated="4"
					newSubmissions="5"
					resubmitted="6"
					due-date="2019-10-10"
					activity-type="quiz"></d2l-quick-eval-activity-card>
			</d2l-input-checkbox>
			<d2l-input-checkbox>
				<d2l-quick-eval-activity-card
					assigned="20"
					completed="2"
					published="3"
					evaluated="4"
					newSubmissions="5"
					resubmitted="6"
					due-date="2019-10-10"
					activity-type="quiz"></d2l-quick-eval-activity-card>
			</d2l-input-checkbox>
			<d2l-input-checkbox>
				<d2l-quick-eval-activity-card
					assigned="20"
					completed="2"
					published="3"
					evaluated="4"
					newSubmissions="5"
					resubmitted="6"
					due-date="2019-10-10"
					activity-type="quiz"></d2l-quick-eval-activity-card>
			</d2l-input-checkbox>
			<d2l-input-checkbox>
				<d2l-quick-eval-activity-card
					assigned="20"
					completed="2"
					published="3"
					evaluated="4"
					newSubmissions="5"
					resubmitted="6"
					due-date="2019-10-10"
					activity-type="quiz"></d2l-quick-eval-activity-card>
			</d2l-input-checkbox>
		`;
	}
}

window.customElements.define('d2l-quick-eval-dismissed-activities-list', D2LQuickEvalDismissedActivitiesList);
