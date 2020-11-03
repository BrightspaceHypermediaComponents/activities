import 'd2l-inputs/d2l-input-text.js';
import 'd2l-tooltip/d2l-tooltip';
import '../d2l-activity-html-editor';
import '../d2l-activity-due-date-editor.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { CONTENT_TYPES, ContentEntity } from 'siren-sdk/src/activities/content/ContentEntity.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../error-handling-mixin.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as store } from './state/content-store.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

const DEBOUNCE_TIMEOUT = 500;
const TITLE_MAX_LENGTH = 150;

class ContentEditorDetail extends AsyncContainerMixin(SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(EntityMixinLit(RtlMixin(ActivityEditorMixin(MobxLitElement))))))) {

	static get properties() {
		return {
			_titleError: { type: String },
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
				:host > div {
					padding-bottom: 20px;
				}
			`
		];
	}

	constructor() {
		super(store);
		this._debounceJobs = {};
		this._setEntityType(ContentEntity);
		this.skeleton = true;
		this.saveOrder = 2000;
	}

	render() {
		const contentEntity = store.getContentActivity(this.href);
		const title = contentEntity && contentEntity.entityType === CONTENT_TYPES.module ? contentEntity.moduleTitle : '';
		const descriptionRichText = contentEntity && contentEntity.entityType === CONTENT_TYPES.module ? contentEntity.moduleDescriptionRichText : '';

		return html`
			<div id="content-title-container">
				<label class="d2l-label-text d2l-skeletize" for="content-title">${this.localize('content.name')}*</label>
				<d2l-input-text
					id="content-title"
					maxlength="${TITLE_MAX_LENGTH}"
					value="${title}"
					@change="${this._saveOnChange('title')}"
					@input="${this._saveTitleOnInput}"
					aria-invalid="${this._titleError ? 'true' : ''}"
					prevent-submit
					novalidate
					?skeleton="${this.skeleton}"
				>
				</d2l-input-text>
				${this._renderTitleTooltip()}
			</div>
			<div id="duedate-container">
				<d2l-activity-due-date-editor
					.href="${this.href}"
					.token="${this.token}"
					?skeleton="${this.skeleton}"
				>
				</d2l-activity-due-date-editor>
			</div>
			<div id="content-description-container">
				<label class="d2l-label-text d2l-skeletize" for="content-description">${this.localize('content.description')}</label>
				<div class="d2l-skeletize">
					<d2l-activity-html-editor
						id='content-description'
						ariaLabel="content-description"
						.value="${descriptionRichText}"
						@d2l-activity-html-editor-change="${this._onRichtextChange}"
						.richtextEditorConfig="${{}}"
					>
					</d2l-activity-html-editor>
				</div>
			</div>
		`;
	}

	updated(changedProperties) {
		if (changedProperties.has('asyncState')) {
			this.skeleton = this.asyncState !== asyncStates.complete;
		}
	}

	cancelCreate() {
		const contentEntity = store.getContentActivity(this.href);
		return contentEntity && contentEntity.cancelCreate();
	}

	hasPendingChanges() {
		const contentEntity = store.getContentActivity(this.href);
		if (!contentEntity) {
			return false;
		}
		return contentEntity.dirty;
	}

	async save() {
		const contentEntity = store.getContentActivity(this.href);
		if (!contentEntity) {
			return;
		}

		await contentEntity.save();
	}

	_onRichtextChange(e) {
		const descriptionRichText = e.detail.content;
		this._debounceJobs.description = Debouncer.debounce(
			this._debounceJobs.description,
			timeOut.after(DEBOUNCE_TIMEOUT),
			() => this._saveDescription(descriptionRichText)
		);
	}

	_renderTitleTooltip() {
		if (this._titleError) {
			return html`
				<d2l-tooltip
					id="title-tooltip"
					for="content-title"
					position="bottom"
					?showing="${!!this._titleError}">
					${this._titleError}
				</d2l-tooltip>
			`;
		}
	}

	_saveDescription(richText) {
		const contentEntity = store.getContentActivity(this.href);
		if (!contentEntity) {
			return;
		}
		contentEntity.setDescription(richText);
	}

	_saveOnChange(jobName) {
		this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	}

	_saveTitle(value) {
		const contentEntity = store.getContentActivity(this.href);
		if (!contentEntity) {
			return;
		}
		contentEntity.setTitle(value);
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
				timeOut.after(DEBOUNCE_TIMEOUT),
				() => this._saveTitle(title)
			);
		}
	}
}
customElements.define('d2l-activity-content-editor-detail', ContentEditorDetail);
