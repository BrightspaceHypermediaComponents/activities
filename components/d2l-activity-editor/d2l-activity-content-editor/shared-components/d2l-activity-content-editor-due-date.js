import '../../d2l-activity-due-date-editor.js';
import { css, html } from 'lit-element/lit-element.js';
import { shared as activityStore } from '../../state/activity-store.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ContentEditorDueDate extends SkeletonMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {

	static get properties() {
		return {
			expanded: { type: Boolean },
			_hasDatePermissions: { type: Boolean },
			skeleton: { type: Boolean }
		};
	}

	static get styles() {
		return  [
			super.styles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				#duedate-container {
					margin-bottom: 20px;
				}
			`
		];
	}

	constructor() {
		super();
		this._hasDatePermissions = false;
	}

	render() {
		// TODO - replace with shared component from UI/core when one is created
		this._getDueDateAndPermission();

		if (this.skeleton)
		{
			return html `<div id="duedate-container" class="d2l-skeletize d2l-skeletize-20">&nbsp;</div>`;
		}

		if (!this._hasDatePermissions) {
			return html ``;
		}

		return html `
			<div id="duedate-container">
				<d2l-button-subtle
					text="${this.localize('content.addDueDate')}"
					@click="${this._showDueDate}"
					?hidden="${this.expanded}"
				>
				</d2l-button-subtle>
				<d2l-activity-due-date-editor
					.href="${this.href}"
					.token="${this.token}"
					?skeleton="${this.skeleton}"
					?hidden="${!this.expanded}"
				>
				</d2l-activity-due-date-editor>
			</div>
		`;
	}

	_getDueDateAndPermission() {
		const entity = activityStore.get(this.href);

		if (!entity || !entity.dates) {
			return;
		}
		const dates = entity.dates;
		this._hasDatePermissions = dates.canEditDates;
		// if due date exists on the activity, show the field
		if (dates.dueDate) {
			this.expanded = true;
		}
	}

	_showDueDate() {
		this.expanded = true;
	}
}
customElements.define('d2l-activity-content-editor-due-date', ContentEditorDueDate);
