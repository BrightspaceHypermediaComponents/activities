import '../d2l-activity-editor-buttons.js';
import '../d2l-activity-visibility-editor.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SaveStatusMixin } from '../save-status-mixin.js';
import { SkeletizeMixin } from '../mixins/d2l-skeletize-mixin';

class AssignmentEditorFooter extends SkeletizeMixin(AsyncContainerMixin(SaveStatusMixin(ActivityEditorMixin(RtlMixin(LocalizeActivityAssignmentEditorMixin(LitElement)))))) {

	static get styles() {
		return [super.styles, css`
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
				display: flex;
				flex: 1;
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
		`];
	}

	constructor() {
		super();
		this.skeleton = true;
	}

	render() {
		return html`
			<div class="d2l-activity-assignment-editor-footer-left d2l-skeletize">
				<d2l-activity-visibility-editor
					.href="${this.href}"
					.token="${this.token}">
				</d2l-activity-visibility-editor>
				<d2l-activity-editor-buttons></d2l-activity-editor-buttons>
			</div>
			<div class="d2l-activity-assignment-editor-footer-right">
				<slot name="save-status"></slot>
			</div>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if (changedProperties.has('asyncState')) {
			this.skeleton = this.asyncState !== asyncStates.complete;
		}
	}
}
customElements.define('d2l-activity-assignment-editor-footer', AssignmentEditorFooter);
