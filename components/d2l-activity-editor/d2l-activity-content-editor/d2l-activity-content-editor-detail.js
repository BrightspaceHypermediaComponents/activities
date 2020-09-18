import 'd2l-inputs/d2l-input-text.js';
import 'd2l-tooltip/d2l-tooltip';
import '../d2l-activity-html-editor';

import { css, html } from 'lit-element/lit-element.js';
import { ContentEntity } from 'siren-sdk/src/activities/content/ContentEntity.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../error-handling-mixin.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/content-store.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

class ContentEditorDetail extends ErrorHandlingMixin(LocalizeActivityEditorMixin(EntityMixinLit(RtlMixin(MobxLitElement)))) {

	static get properties() {
		return {
			_titleError: { type: String },
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			:host > div {
				padding-bottom: 20px;
			}
		`;
	}

	constructor() {
		super(store);
		this._debounceJobs = {};
		this._setEntityType(ContentEntity);
	}

	render() {
		const contentEntity = store.getContentActivity(this.href);
		if (!contentEntity) {
			return html``;
		}
		const {	title } = contentEntity;

		return html`
			<div id="content-title-container">
				<label class="d2l-label-text" for="content-title">${this.localize('content.name')}*</label>
				<d2l-input-text
					id="content-title"
					maxlength="128"
					value="${title}"
					@change="${this._saveOnChange('title')}"
					@input="${this._saveTitleOnInput}"
					aria-invalid="${this._titleError ? 'true' : ''}"
					prevent-submit
					novalidate
				>
				</d2l-input-text>
				${this._renderTitleTooltip()}
			</div>
			<div id="content-description-container">
				<label class="d2l-label-text" for="content-description">${this.localize('content.description')}</label>
				<!-- TODO: insert existing description value should one exist -->
				<d2l-activity-html-editor
					id='content-description'
					ariaLabel="content-description"
					@d2l-activity-html-editor-change="${this._onRichtextChange}"
					.richtextEditorConfig="${{}}"
				>
				</d2l-activity-html-editor>
			</div>
		`;
	}

	_onRichtextChange(e) {
		// TODO - properly handle description content
		// eslint-disable-next-line no-unused-vars
		const content = e.detail.content;
	}

	_renderTitleTooltip() {
		if (this._titleError) {
			return html`
				<d2l-tooltip
					id="title-tooltip"
					for="content-title"
					position="bottom"
					?showing="${this._titleError}">
					${this._titleError}
				</d2l-tooltip>
			`;
		}
	}

	_saveOnChange(jobName) {
		this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	}

	_saveTitle(value) {
		store.getContentActivity(this.href).setTitle(value);
	}

	_saveTitleOnInput(e) {
		const title = e.target.value;
		const isTitleEmpty = (title || '').trim().length === 0;

		if (isTitleEmpty) {
			this.setError('_titleError', 'content.emptyNameField', 'title-tooltip');
		} else {
			this.clearError('_titleError');
			this._debounceJobs.title = Debouncer.debounce(
				this._debounceJobs.title,
				timeOut.after(500),
				() => this._saveTitle(title)
			);
		}
	}
}
customElements.define('d2l-activity-content-editor-detail', ContentEditorDetail);
