import { css, html, LitElement } from 'lit-element';
import { bodyCompactStyles, bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui/core/components/list/list-item-content.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/link/link.js';
import '../d2l-subtitle/d2l-subtitle.js';

export class QuickEvalWidgetActivityListItem extends LitElement {
	static get properties() {
		return {
			activityName: { type: String },
			courseName: { type: String },
			dueDate: { type: String },
			submissionCount: { type: String },
			icon: { type: String },
			evaluateAllHref: { type: String }
		};
	}

	static get styles() {
		return [ bodyCompactStyles, bodySmallStyles, css`
			d2l-icon { border-radius: 0; }
		` ];
	}

	render() {
		return html`
			<d2l-list-item>
				<d2l-icon slot="illustration" icon="${this.icon}"></d2l-icon>
				<d2l-list-item-content>
					<d2l-link href="${this.evaluateAllHref}">${this.activityName}</d2l-link>
					<p class="d2l-body-compact d2l-body-small">${this.courseName + '\t\u2022\t' + this.dueDate}</p>
					${ this.submissionCount ? html`<p class="d2l-body-compact d2l-body-small">Submissions: ${this.submissionCount}</p>` : html`` }
				<d2l-list-item-content>
			</d2l-list-item>`;
	}
}

customElements.define('d2l-quick-eval-widget-activity-list-item', QuickEvalWidgetActivityListItem);
