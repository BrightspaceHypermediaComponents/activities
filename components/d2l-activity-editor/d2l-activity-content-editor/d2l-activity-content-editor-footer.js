import '../d2l-activity-editor-buttons.js';
import '../d2l-activity-visibility-editor.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SaveStatusMixin } from '../save-status-mixin.js';

class ContentEditorFooter extends SaveStatusMixin(RtlMixin(LitElement)) {

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
			.d2l-activity-content-editor-footer-left {
				align-items: baseline;
				display: flex;
				flex: 1;
			}
			.d2l-activity-content-editor-footer-right {
				line-height: 2rem;
			}
			@media only screen and (max-width: 615px) {
				.d2l-activity-content-editor-footer-left {
					justify-content: space-between;
				}
			}
		`;
	}

	render() {
		return html`
			<div class="d2l-activity-content-editor-footer-left">
				<d2l-activity-editor-buttons></d2l-activity-editor-buttons>
				<!-- TODO: figure out how to set activity usage entity "canEditDraft" property to true -->
				<!-- so that we can properly toggle the visibility of the entity -->
				<d2l-activity-visibility-editor
					.href="${this.href}"
					.token="${this.token}">
				</d2l-activity-visibility-editor>
			</div>
			<div class="d2l-activity-content-editor-footer-right">
				<slot name="save-status"></slot>
			</div>
		`;
	}
}
customElements.define('d2l-activity-content-editor-footer', ContentEditorFooter);
