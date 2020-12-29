import './module/d2l-activity-content-module-detail.js';
import 'd2l-loading-spinner/d2l-loading-spinner.js';
import '../d2l-activity-due-date-editor.js';
import { css, html } from 'lit-element/lit-element.js';
import { shared as activityStore } from '../state/activity-store.js';
import { CONTENT_TYPES } from 'siren-sdk/src/activities/content/ContentEntity.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/content-store.js';

export const DEBOUNCE_TIMEOUT = 500;
export const TITLE_MAX_LENGTH = 150;

class ContentEditorDetail extends LocalizeActivityEditorMixin(MobxLitElement) {

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
				d2l-loading-spinner {
					width: 100%;
				}
				.d2l-due-date-slot {
					padding-bottom: 20px;
				}
			`
		];
	}

	constructor() {
		super(store);
		this._hasDatePermissions = false;
		this._showAddDueDateBtn = true;
	}

	render() {
		const contentEntity = store.getContentActivity(this.href);
		if (!contentEntity) {
			// show loading spinner if contentEnitity doesn't exist yet
			return html`
				<d2l-loading-spinner size="80"></d2l-loading-spinner>
			`;
		}

		this._getDueDateAndPermission();

		const entityType = contentEntity.entityType;
		const activityHref = contentEntity.contentActivityHref;

		if (entityType === CONTENT_TYPES.module) {
			return html`
				<d2l-activity-content-module-detail
					.href="${activityHref}"
					.token="${this.token}"
				>
				<div slot="dueDate" class="d2l-due-date-slot">${this._renderDueDate()}</div>
				</d2l-activity-content-module-detail>
			`;
		}

		if (entityType === CONTENT_TYPES.weblink) {
			return html`
				<p>TODO: create weblink detail component</p>
			`;
		}

		// TODO: make the default an official warning or get rid of this
		return html`
			<p>WARNING: unsupported entityType</p>
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

	_renderDueDate() {
		// TODO - replace with shared component when one is created
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

	_showDueDate() {
		this._showAddDueDateBtn = false;
	}
}
customElements.define('d2l-activity-content-editor-detail', ContentEditorDetail);
