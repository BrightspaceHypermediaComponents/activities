import '@brightspace-ui/htmleditor/htmleditor.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
class ActivityHtmlNewEditor extends ActivityEditorMixin(LocalizeActivityEditorMixin(LitElement)) {

	static get properties() {
		return {
			value: { type: String },
			ariaLabel: { type: String },
			disabled: { type: Boolean },
			htmlEditorHeight: { type: String }
		};
	}

	static get styles() {
		return  [
			css`
				d2l-htmleditor {
					height: 100%;
				}
			`
		];
	}

	constructor() {
		super();
		this.htmlEditorHeight = '10rem';
	}

	render() {
		const allowPaste = this._isPasteAllowed();

		return html`
			<d2l-htmleditor
				html="${this.value}"
				label="${this.ariaLabel}"
				label-hidden
				?disabled="${this.disabled}"
				height="${this.htmlEditorHeight}"
				paste-local-images="${allowPaste}"
				@d2l-htmleditor-blur="${this._onContentChange}">
			</d2l-htmleditor>
		`;
	}

	save() {
		const editor = this.shadowRoot.querySelector('d2l-htmleditor');
		if (editor.files && editor.files.length) {
			// upload files to content
		}
	}

	_isPasteAllowed() {
		const context = JSON.parse(document.documentElement.getAttribute('data-he-context'));

		return context.uploadFiles && context.viewFiles;
	}

	_onContentChange() {
		const content = this.shadowRoot.querySelector('d2l-htmleditor').html;
		this.dispatchEvent(new CustomEvent('d2l-activity-html-editor-change', {
			bubbles: true,
			composed: true,
			detail: {
				content: content
			}
		}));
	}
}

customElements.define('d2l-activity-html-new-editor', ActivityHtmlNewEditor);
