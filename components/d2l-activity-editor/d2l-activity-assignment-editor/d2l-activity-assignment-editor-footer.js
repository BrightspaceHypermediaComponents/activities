import '../d2l-activity-editor-buttons.js';
import '../d2l-activity-visibility-editor.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SaveStatusMixin } from '../save-status-mixin.js';

class AssignmentEditorFooter extends ActivityEditorMixin(SaveStatusMixin(RtlMixin(LocalizeActivityAssignmentEditorMixin(LitElement)))) {

	static get styles() {
		return css`
			:host {
				display: flex;
			}
			:host([hidden]) {
				display: none;
			}
			d2l-activity-visibility-editor {
				display: inline-block;
			}
			.d2l-activity-assignment-editor-footer-left {
				align-items: baseline;
				flex: 1;
				display: flex;
				flex-direction: row-reverse;
				justify-content: flex-end;
			}
			.d2l-activity-assignment-editor-footer-right {
				line-height: 2rem;
			}
			@media only screen and (max-width: 615px) {
				.d2l-activity-assignment-editor-footer-left {
					justify-content: space-between;
					}
			}
		`;
	}

	render() {
		return html`
			<div class="d2l-activity-assignment-editor-footer-left">
				<d2l-activity-visibility-editor
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-visibility-editor>
				<d2l-activity-editor-buttons></d2l-activity-editor-buttons>
			</div>
			<div class="d2l-activity-assignment-editor-footer-right">
				<slot name="save-status"></slot>
			</div>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor-footer', AssignmentEditorFooter);
