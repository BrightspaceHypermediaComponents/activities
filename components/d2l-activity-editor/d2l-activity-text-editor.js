import 'd2l-inputs/d2l-input-textarea';
import { html, LitElement } from 'lit-element/lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { live } from 'lit-html/directives/live.js';

class ActivityTextEditor extends LitElement {

	static get properties() {
		return {
			value: { type: String },
			richtextEditorConfig: { type: Object },
			disabled: { type: Boolean },
			ariaLabel: { type: String },
			key: { type: String },
			htmlEditorHeight: { type: String, attribute: 'html-editor-height' },
			fullPage: { type: Boolean, attribute: 'full-page' },
			fullPageFontSize: { type: String, attribute: 'full-page-font-size' }
		};
	}

	constructor() {
		super();
		this.fullPage = false;
	}

	render() {
		const editorEvent = new CustomEvent('d2l-request-provider', {
			detail: { key: 'd2l-provider-html-editor-enabled' },
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(editorEvent);

		const htmlEditorEnabled = editorEvent.detail.provider;

		const newEditorEvent = new CustomEvent('d2l-request-provider', {
			detail: { key: 'd2l-provider-html-new-editor-enabled' },
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(newEditorEvent);

		const htmlNewEditorEnabled = newEditorEvent.detail.provider;

		if (htmlEditorEnabled) {
			if (htmlNewEditorEnabled) {
				import('./d2l-activity-html-new-editor');
				return html`
					<d2l-activity-html-new-editor
						.value="${live(this.value)}"
						ariaLabel="${this.ariaLabel}"
						?disabled="${this.disabled}"
						@d2l-activity-html-editor-change="${this._onRichtextChange}"
						html-editor-height=${ifDefined(this.htmlEditorHeight)}
						?full-page="${this.fullPage}"
						full-page-font-size="${ifDefined(this.fullPageFontSize)}">
					</d2l-activity-html-new-editor>
				`;
			} else {
				import('./d2l-activity-html-editor');
				return html`
					<d2l-activity-html-editor
						ariaLabel="${this.ariaLabel}"
						.key="${this.key}"
						.value="${live(this.value)}"
						?disabled="${this.disabled}"
						@d2l-activity-html-editor-change="${this._onRichtextChange}"
						.richtextEditorConfig="${this.richtextEditorConfig}">
					</d2l-activity-html-editor>
				`;
			}
		} else {
			return html`
				<d2l-input-textarea
					id="text-editor"
					.value="${live(this.value)}"
					?disabled="${this.disabled}"
					@change="${this._onPlaintextChange}"
					@input="${this._onPlaintextChange}"
					label="${this.ariaLabel}"
					label-hidden>
				</d2l-input-textarea>
			`;
		}
	}

	reset() {
		const editorEvent = new CustomEvent('d2l-request-provider', {
			detail: { key: 'd2l-provider-html-editor-enabled' },
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(editorEvent);

		const htmlEditorEnabled = editorEvent.detail.provider;

		const newEditorEvent = new CustomEvent('d2l-request-provider', {
			detail: { key: 'd2l-provider-html-new-editor-enabled' },
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(newEditorEvent);

		const htmlNewEditorEnabled = newEditorEvent.detail.provider;

		if (htmlEditorEnabled) {
			if (htmlNewEditorEnabled) {
				this.shadowRoot.querySelector('d2l-activity-html-new-editor').reset();
			} else {
				this.shadowRoot.querySelector('d2l-activity-html-editor').reset();
			}
		} else {
			this.requestUpdate();
		}
	}

	_dispatchChangeEvent(content) {
		this.dispatchEvent(new CustomEvent('d2l-activity-text-editor-change', {
			bubbles: true,
			composed: true,
			detail: {
				content: content
			}
		}));
	}

	_onPlaintextChange() {
		const content = this.shadowRoot.querySelector('d2l-input-textarea').value;
		this._dispatchChangeEvent(content);
	}

	_onRichtextChange(e) {
		const content = e.detail.content;
		this._dispatchChangeEvent(content);
	}

}

customElements.define('d2l-activity-text-editor', ActivityTextEditor);
