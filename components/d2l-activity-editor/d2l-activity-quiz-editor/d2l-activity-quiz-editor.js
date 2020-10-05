import { html, LitElement } from 'lit-element/lit-element.js';
import { ActivityEditorContainerMixin } from '../mixins/d2l-activity-editor-container-mixin';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';

class QuizEditor extends ActivityEditorContainerMixin(EntityMixinLit(LitElement)) {

	static get properties() {
		return {
			/**
			* Set the WidthType on the template to constrain page width if necessary
			*/
			widthType: { type: String, attribute: 'width-type' }
		};
	}

	render() {
		return html`
			<d2l-activity-editor
				type="assignment"
				telemetryId="assignments"
				.href=${this.href}
				.token=${this.token}
				?is-saving=${this.isSaving}>

				${this._editorTemplate}

			</d2l-activity-editor>
		`;
	}

	get _editorTemplate() {
		return html`
			<d2l-template-primary-secondary background-shading="secondary" slot="editor" width-type="${this.widthType}">
				<slot name="editor-nav" slot="header"></slot>
				<div slot="secondary"></div>
				<d2l-activity-editor-footer
					.href="${this.href}"
					.token="${this.token}"
					slot="footer"
					class="d2l-activity-editor-footer">
				</d2l-activity-editor-footer>
			</d2l-template-primary-secondary>
		`;
	}
}
customElements.define('d2l-activity-quiz-editor', QuizEditor);
