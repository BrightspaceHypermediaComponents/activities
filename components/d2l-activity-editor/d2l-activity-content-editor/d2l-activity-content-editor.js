import '../d2l-activity-editor.js';
import '@brightspace-ui/core/templates/primary-secondary/primary-secondary.js';
import '@brightspace-ui/core/components/colors/colors.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityEditorContainerMixin } from '../mixins/d2l-activity-editor-container-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ContentEditor extends ActivityEditorContainerMixin(RtlMixin(ActivityEditorMixin(LitElement))) {

	static get properties() {
		return {
			widthType: { type: String, attribute: 'width-type' }
		};
	}

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

	constructor() {
		super();
		// TODO: set up ContentStore to keep track of state
		this.type = 'content';
		this.telemetryId = 'content';
	}

	render() {
		return html`
			<d2l-activity-editor
				type="${this.type}"
				telemetryId="${this.telemetryId}"
				.href=${this.href}
				.token=${this.token}
			>
				${this._editorTemplate}
			</d2l-activity-editor>
		`;
	}

	delete() {
		// TODO
		return true;
	}

	hasPendingChanges() {
		// TODO
		return false;
	}

	async save() {
		// TODO
		return;
	}

	get _editorTemplate() {
		return html`
			<d2l-template-primary-secondary slot="editor" width-type="${this.widthType}">
				<slot name="editor-nav" slot="header"></slot>
				<div slot="primary">
					<p>Primary Slot</p>
				</div>
				<div slot="secondary">
					<p>Secondary Slot</p>
				</div>
				<div slot="footer">
					<p>Footer Slot</p>
				</div>
			</d2l-template-primary-secondary>
		`;
	}
}
customElements.define('d2l-activity-content-editor', ContentEditor);
