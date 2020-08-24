import '@brightspace-ui/core/templates/primary-secondary/primary-secondary.js';
import '@brightspace-ui/core/components/colors/colors.js';

import { css, html, LitElement } from 'lit-element/lit-element.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ContentCreationHtml extends RtlMixin(LitElement) {

	static get styles() {
		return css`
			:host {
				display: block;
			}
			div[slot="primary"] {
				padding: 20px;
			}
			div[slot="secondary"] {
				background: var(--d2l-color-gypsum);
				height: calc(100% - 20px);
				padding: 10px;
			}
			d2l-icon {
				padding-right: 1rem;
			}
			:host([dir="rtl"]) d2l-icon {
				padding-left: 1rem;
				padding-right: 0;
			}
		`;
	}

	get _editorTemplate() {

		return html`
			<d2l-template-primary-secondary>
				<slot name="editor-nav" slot="header"></slot>
				<div slot="primary">
					<p>This is the primary slot for HTML create template</p>
				</div>
				<div slot="secondary">
					<p>This is the secondary slot for HTML create template</p>
				</div>
				<div slot="footer">
					<p>This is the footer slot for HTML create template</p>
				</div>
			</d2l-template-primary-secondary>
		`;
	}

	render() {
		return this._editorTemplate;
	}
}
customElements.define('d2l-content-creation-html', ContentCreationHtml);
