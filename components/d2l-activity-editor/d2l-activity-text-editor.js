import 'd2l-inputs/d2l-input-textarea';
import './d2l-activity-html-editor';
import { html, LitElement } from 'lit-element/lit-element';

class ActivityTextEditor extends LitElement {

	static get properties() {
		return {
			value: { type: String },
			richtextEditorConfig: { type: Object },
			disabled: { type: Boolean },
			ariaLabel: { type: String },
		};
	}

	render() {
		const event = new CustomEvent('d2l-request-provider', {
			detail: { key: 'd2l-provider-html-editor-enabled' },
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);

		const htmlEditorEnabled = event.detail.provider;

		if (htmlEditorEnabled) {
			return html`
				<d2l-activity-html-editor
					ariaLabel="${this.ariaLabel}"
					.value="${this.value}"
					?disabled="${this.disabled}"
					@d2l-activity-html-editor-change="${this._onRichtextChange}"
					.richtextEditorConfig="${this.richtextEditorConfig}">
				</d2l-activity-html-editor>
			`;
		} else {
			return html`
				<d2l-input-textarea
					id="text-editor"
					value="${this.value}"
					?disabled="${this.disabled}"
					@change="${this._onPlaintextChange}"
					@input="${this._onPlaintextChange}">
				</d2l-input-textarea>
			`;
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
