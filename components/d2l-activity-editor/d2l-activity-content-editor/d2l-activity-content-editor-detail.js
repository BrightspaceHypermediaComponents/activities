import './module/d2l-activity-content-module-detail.js';
import './shared-components/d2l-activity-content-editor-due-date.js';
import './lti-link/d2l-activity-content-lti-link-detail.js';
import './web-link/d2l-activity-content-web-link-detail.js';
import './content-file/d2l-activity-content-file-detail.js';
import 'd2l-loading-spinner/d2l-loading-spinner.js';
import { css, html } from 'lit-element/lit-element.js';
import { CONTENT_TYPES } from 'siren-sdk/src/activities/content/ContentEntity.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/content-store.js';

class ContentEditorDetail extends MobxLitElement {

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
				d2l-activity-content-module-detail, d2l-activity-content-file-detail, d2l-activity-content-lti-link-detail {
					display: flex;
					flex-direction: column;
					height: inherit;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const contentEntity = store.getContentActivity(this.href);
		if (!contentEntity) {
			return html`
				<d2l-loading-spinner size="80"></d2l-loading-spinner>
			`;
		}

		const { entityType, contentActivityHref } = contentEntity;

		if (entityType === CONTENT_TYPES.module) {
			return html`
				<d2l-activity-content-module-detail
					.href="${contentActivityHref}"
					.token="${this.token}"
				>
					${this._renderDueDate()}
				</d2l-activity-content-module-detail>
			`;
		}

		if (entityType === CONTENT_TYPES.weblink) {
			return html`
				<d2l-activity-content-web-link-detail
					.href="${contentActivityHref}"
					.token="${this.token}"
				>
					${this._renderDueDate(true)}
				</d2l-activity-content-web-link-detail>
			`;
		}

		if (entityType === CONTENT_TYPES.ltilink) {
			return html`
				<d2l-activity-content-lti-link-detail
					.href="${contentActivityHref}"
					.token="${this.token}"
				>
					${this._renderDueDate(true)}
				</d2l-activity-content-lti-link-detail>
			`;
		}

		if (entityType === CONTENT_TYPES.contentFile) {
			return html`
				<d2l-activity-content-file-detail
					.href="${contentActivityHref}"
					.token="${this.token}"
				>
					${this._renderDueDate(true)}
				</d2l-activity-content-file-detail>
			`;
		}

		return html``;
	}

	_renderDueDate(expanded) {
		return html`
			<div slot="due-date">
				<d2l-activity-content-editor-due-date
					.href="${this.href}"
					.token="${this.token}"
					.expanded="${expanded}"
				>
				</d2l-activity-content-editor-due-date>
			</div>
		`;
	}
}
customElements.define('d2l-activity-content-editor-detail', ContentEditorDetail);
