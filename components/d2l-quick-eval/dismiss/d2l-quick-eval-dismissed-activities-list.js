import { formatDateTime } from '@brightspace-ui/intl/lib/dateTime.js';
import { html, LitElement, css } from 'lit-element/lit-element.js';
import { LitQuickEvalLocalize } from '../QuickEvalLocalize.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui/core/components/list/list-item-content.js';
import 'd2l-icons/d2l-icon.js';
import '../../d2l-subtitle/d2l-subtitle.js';

class D2LQuickEvalDismissedActivitiesList extends LitQuickEvalLocalize(LitElement) {

	static get styles() {
		return css`
			d2l-icon { border-radius: 0; }
		`;
	}

	render() {
		return html`
			<d2l-list separators="all">${this.dismissedActivities && this.dismissedActivities.length ? this.dismissedActivities.map((act, index) => html`
				<d2l-list-item selectable key="${index}" label="${act.name}" @d2l-list-item-selected=${this._handleItemSelected}>
					<d2l-icon slot="illustration" icon="${this._computeIcon(act.type)}" aria-label="${this.localize(act.type)}"></d2l-icon>
					<d2l-list-item-content>
						${act.name}
						<d2l-subtitle slot="supporting-info" .text="${this._computeSubtitleText(act)}"></d2l-subtitle>
					</d2l-list-item-content>
				</d2l-list-item>`) : ''}
			</d2l-list>
		`;
	}

	static get properties() {
		return {
			dismissedActivities: { type: Array }
		};
	}

	_computeSubtitleText(act) {
		const result = [act.course];
		if (act.dismissedDate) {
			result.push(this.localize('dismissedOn', { date: formatDateTime(new Date(act.dismissedDate)) }));
		}
		return result;
	}

	_computeIcon(type) {
		switch (type) {
			case 'quiz':
				return 'tier2:quizzing';
			case 'assignment':
				return 'tier2:assignments';
			case 'discussion':
				return 'tier2:discussions';
		}
		throw new Error(`Activity type '${type}' is not a valid type for quick eval.`);
	}

	_handleItemSelected(e) {
		// The list item event bubbles, but is not composed and so does not pass through the shadow DOM boundary.
		// Since we want to actually deal with this event in the controller, we pass it up the chain here.
		this.dispatchEvent(new CustomEvent('d2l-quick-eval-dismissed-activity-selected', {
			detail: e.detail,
			bubbles: true,
			composed: true
		}));
	}
}

window.customElements.define('d2l-quick-eval-dismissed-activities-list', D2LQuickEvalDismissedActivitiesList);
