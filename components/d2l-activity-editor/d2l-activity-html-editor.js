import 'd2l-html-editor/d2l-html-editor.js';
import 'd2l-html-editor/d2l-html-editor-client.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { getUniqueId } from '@brightspace-ui/core/helpers/uniqueId';
import { inputStyles } from '@brightspace-ui/core/components/inputs/input-styles';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { resolveUrl } from '@polymer/polymer/lib/utils/resolve-url.js';

class ActivityHtmlEditor extends LocalizeActivityEditorMixin(LitElement) {

	static get properties() {
		return {
			richtextEditorConfig: { type: Object },
			value: { type: String },
			ariaLabel: { type: String },
			disabled: { type: Boolean },
			key: { type: String },
			_htmlEditorUniqueId: { type: String }
		};
	}

	static get styles() {
		return [ inputStyles, css`
			:host {
				display: flex;
				width: 100%;
			}
			:host([hidden]) {
				display: none;
			}

			d2l-html-editor {
				display: flex;
				width: 100%;
				word-wrap: break-word;
			}
			d2l-html-editor > .d2l-html-editor-container > p:first-of-type {
				margin-top: 0;
			}
			d2l-html-editor > .d2l-html-editor-container > p:last-of-type {
				margin-bottom: 0;
			}
			d2l-html-editor > .d2l-html-editor-container * {
				max-width: 100%;
			}

			/* Disabled styles copied from input-styles */
			d2l-html-editor[disabled] > .d2l-html-editor-container {
				opacity: 0.5;
			}
			d2l-html-editor[disabled] > .d2l-html-editor-container:hover {
				border-color: var(--d2l-color-galena);
				border-width: 1px;
				padding: var(--d2l-input-padding, 0.4rem 0.75rem);
			}
		`];
	}

	constructor() {
		super();
		this._htmlEditorUniqueId = `htmleditor-${getUniqueId()}`;
	}

	render() {
		return html`
			<d2l-html-editor
				editor-id="${this._htmlEditorUniqueId}"
				app-root="${resolveUrl('../../', import.meta.url)}"
				@change="${this._onContentChange}"
				@input="${this._onContentChange}"
				inline="1"
				min-rows="3"
				max-rows="1000"
				fullpage-enabled="0"
				toolbar="bold italic underline numlist bullist d2l_isf"
				plugins="lists paste d2l_isf d2l_replacestring"
				?disabled="${this.disabled}">

				<div id="toolbar-shortcut-${this._htmlEditorUniqueId}" hidden="">${this.localize('editor.ariaToolbarShortcutInstructions')}</div>
				<div
					class="d2l-html-editor-container d2l-input"
					id="${this._htmlEditorUniqueId}"
					aria-label="${this.ariaLabel}"
					aria-describedby="toolbar-shortcut-${this._htmlEditorUniqueId}"
					role="textbox"
					prevent-submit>
				</div>
			</d2l-html-editor>`;
	}
	updated(changedProperties) {
		super.updated(changedProperties);
		// This is acknowledged to be non-idiomatic (manipulating DOM outside render), but this
		// is unforunately a necessary evil of using the tinymce/HTML editor.
		if (changedProperties.has('richtextEditorConfig')) {
			const editor = this.shadowRoot.querySelector('d2l-html-editor');
			if (editor) {
				editor.d2lPluginSettings = this.richtextEditorConfig.properties || {};
			}
		}

		if ((changedProperties.has('value') && typeof changedProperties.get('value') === 'undefined') || changedProperties.has('key')) {
			const editorContainer = this.shadowRoot.querySelector('d2l-html-editor > .d2l-html-editor-container');
			if (editorContainer) {
				editorContainer.innerHTML = this.value;
			}
		}
	}
	_onContentChange() {
		const content = this.shadowRoot.querySelector('d2l-html-editor').getContent();
		this.dispatchEvent(new CustomEvent('d2l-activity-html-editor-change', {
			bubbles: true,
			composed: true,
			detail: {
				content: content
			}
		}));
	}

}

customElements.define('d2l-activity-html-editor', ActivityHtmlEditor);
