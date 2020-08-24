import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { formatDateTime } from '@brightspace-ui/intl/lib/dateTime.js';
import { QuickEvalLocalize } from '../QuickEvalLocalize.js';
import '../../d2l-subtitle/d2l-subtitle.js';

class D2LQuickEvalActivityCardSubtitle extends QuickEvalLocalize(PolymerElement) {
	static get template() {
		return html`
			<style>
				:host {
					display: inline-block;
				}
				:host([hidden]) {
					display: none;
				}
			</style>
			<d2l-subtitle text="[[_computeText(activityType, dueDate)]]"></d2l-subtitle>
		`;
	}

	static get properties() {
		return {
			activityType: {
				type: String
			},
			dueDate: {
				type: String
			}
		};
	}

	_computeText(activityType, dueDate) {
		const result = [ ];
		if (activityType) {
			const localizedActivityType = this.localize(activityType);
			if (localizedActivityType) {
				result.push(localizedActivityType);
			}
		}
		if (dueDate) {
			const formattedDateTime = Date.parse(dueDate);
			if (formattedDateTime) {
				result.push(this.localize('due', 'date', formatDateTime(new Date(dueDate))));
			}
		}
		return result;
	}
}

window.customElements.define('d2l-quick-eval-activity-card-subtitle', D2LQuickEvalActivityCardSubtitle);
