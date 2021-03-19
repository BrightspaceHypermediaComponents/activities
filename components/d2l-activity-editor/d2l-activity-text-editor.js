import 'd2l-inputs/d2l-input-textarea';
import { html, LitElement } from 'lit-element/lit-element';

class ActivityTextEditor extends LitElement {

	static get properties() {
		return {
			value: { type: String },
			richtextEditorConfig: { type: Object },
			disabled: { type: Boolean },
			ariaLabel: { type: String },
			key: { type: String },
			htmlEditorHeight: {
				type: String,
				value: '10rem'
			},
			fullPage: {
				type: Boolean,
				value: false
			},
			fullPageFontSize: {
				type: String,
				value: '14pt'
			}
		};
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
						value="${this.value}"
						ariaLabel="${this.ariaLabel}"
						?disabled="${this.disabled}"
						@d2l-activity-html-editor-change="${this._onRichtextChange}"
						htmlEditorHeight="${this.htmlEditorHeight}"
						fullPage="${this.fullPage}"
						fullPageFontSize="${this.fullPageFontSize}">
					</d2l-activity-html-new-editor>
				`;
			} else {
				import('./d2l-activity-html-editor');
				return html`
					<d2l-activity-html-editor
						ariaLabel="${this.ariaLabel}"
						.key="${this.key}"
						.value="${this.value}"
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
					value="${this.value}"
					?disabled="${this.disabled}"
					@change="${this._onPlaintextChange}"
					@input="${this._onPlaintextChange}"
					aria-label="${this.ariaLabel}">
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
