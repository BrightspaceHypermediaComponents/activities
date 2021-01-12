import '../../d2l-activity-due-date-editor.js';
import { css, html } from 'lit-element/lit-element.js';
import { shared as activityStore } from '../../state/activity-store.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';

class ContentEditorDueDate extends LocalizeActivityEditorMixin(MobxLitElement) {

	static get properties() {
		return {
			_hasDatePermissions: { type: Boolean },
			_showAddDueDateBtn: { type: Boolean }
		};
	}

	static get styles() {
		return  [
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				#duedate-container {
					padding-bottom: 20px;
				}
			`
		];
	}

	constructor() {
		super();
		this._hasDatePermissions = false;
		this._showAddDueDateBtn = true;
	}

	render() {
		// TODO - replace with shared component from UI/core when one is created
		this._getDueDateAndPermission();

		if (!this._hasDatePermissions) {
			return html ``;
		}

		return html `
			<div id="duedate-container">
				<d2l-button-subtle
					text="${this.localize('content.addDueDate')}"
					@click="${this._showDueDate}"
					?hidden="${!this._showAddDueDateBtn}"
				>
				</d2l-button-subtle>
				<d2l-activity-due-date-editor
					.href="${this.href}"
					.token="${this.token}"
					?skeleton="${this.skeleton}"
					?hidden="${this._showAddDueDateBtn}"
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
			this._showAddDueDateBtn = false;
		}
	}

	_showDueDate() {
		this._showAddDueDateBtn = false;
	}
}
customElements.define('d2l-activity-content-editor-due-date', ContentEditorDueDate);
