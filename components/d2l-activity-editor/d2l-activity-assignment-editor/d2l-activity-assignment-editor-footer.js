import '../d2l-activity-editor-buttons.js';
import '../d2l-activity-visibility-editor.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SaveStatusMixin } from '../save-status-mixin.js';

class AssignmentEditorFooter extends SaveStatusMixin(EntityMixinLit(RtlMixin(LocalizeActivityAssignmentEditorMixin(LitElement)))) {

	static get properties() {
		return {
			_activityUsageHref: { type: String }
		};
	}

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
		`;
	}

	constructor() {
		super();
		this._setEntityType(AssignmentEntity);

		this._activityUsageHref = '';
	}

	render() {
		return html`
			<div class="d2l-activity-assignment-editor-footer-left">
				<d2l-activity-visibility-editor
					.href="${this._activityUsageHref}"
					.token="${this.token}">
				</d2l-activity-visibility-editor>
				<d2l-activity-editor-buttons></d2l-activity-editor-buttons>
			</div>
			<div class="d2l-activity-assignment-editor-footer-right">
				<slot name="save-status"></slot>
			</div>
		`;
	}
	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onAssignmentChange(entity);
			super._entity = entity;
		}
	}

	_onAssignmentChange(assignment) {
		if (!assignment) {
			return;
		}

		this._activityUsageHref = assignment.activityUsageHref();
	}

}
customElements.define('d2l-activity-assignment-editor-footer', AssignmentEditorFooter);
