import './d2l-activity-content-availability-editor.js';

import { css, html, LitElement } from 'lit-element/lit-element.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ContentEditorSecondary extends RtlMixin(LitElement) {

	static get styles() {
		return css`
			:host {
				background: var(--d2l-color-gypsum);
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			:host > * {
				background: var(--d2l-color-white);
				border-radius: 8px;
				margin-bottom: 10px;
				padding: 20px;
				padding-top: 0;
			}
		`;
	}

	render() {
		return html`
			<d2l-activity-content-availability-editor
				.href="${this.href}"
				.token="${this.token}"
			>
			</d2l-activity-content-availability-editor>
		`;
	}
}
customElements.define('d2l-activity-content-editor-secondary', ContentEditorSecondary);
