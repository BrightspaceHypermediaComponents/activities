import '@brightspace-ui/core/templates/primary-secondary/primary-secondary.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';

class EvaluationPage extends LitElement {

	static get properties() {
		return {
			leftPanelUrl: { type: String }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			d2l-template-primary-secondary {
				height: 60rem;
			}
			iframe {
				height: 60rem;
				width: 100%;
			}
		`;
	}

	render() {
		return html`
			<d2l-template-primary-secondary>
				<iframe
					slot="primary"
					id="d2l-evaluation-page-iframe"
					src="${this.leftPanelUrl}">
				</iframe>
				<button
					slot="secondary"
					onclick="SendMessageFromParentToIframe()">Button in parent
				</button>
			</d2l-template-primary-secondary>
		`;
	}
}
customElements.define('d2l-evaluation-page', EvaluationPage);
