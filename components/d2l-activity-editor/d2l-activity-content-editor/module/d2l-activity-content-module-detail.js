import 'd2l-inputs/d2l-input-text.js';
import 'd2l-tooltip/d2l-tooltip';
import '../../d2l-activity-html-editor';
import '@brightspace-ui/core/components/button/button-subtle.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { css, html } from 'lit-element/lit-element.js';
import { DEBOUNCE_TIMEOUT, TITLE_MAX_LENGTH } from '../d2l-activity-content-editor-detail.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { ContentModuleEntity } from 'siren-sdk/src/activities/content/ContentModuleEntity.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as moduleStore } from './state/content-module-store.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

class ContentModuleDetail extends AsyncContainerMixin(SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(EntityMixinLit(RtlMixin(ActivityEditorMixin(MobxLitElement))))))) {

	static get properties() {
		return {
			_titleError: { type: String }
		};
	}

	static get styles() {
		return  [
			super.styles,
			labelStyles,
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
				.d2l-activity-label-container {
					margin-bottom: 7px;
				}
			`
		];
	}

	constructor() {
		super(moduleStore);
		this._debounceJobs = {};
		this._setEntityType(ContentModuleEntity);
		this.skeleton = true;
		this.saveOrder = 2000;
	}

	render() {
		const moduleEntity = moduleStore.getContentModuleActivity(this.href);
		let title = '';
		let descriptionRichText = undefined;
		this.skeleton = true;
		if (moduleEntity) {
			// Show loading skeleton until we have the module entity loaded into state
			this.skeleton = false;
			title = moduleEntity.moduleTitle;
			descriptionRichText = moduleEntity.moduleDescriptionRichText;
		}

		return html`
			<div id="content-title-container">
				<d2l-input-text
					id="content-title"
					maxlength="${TITLE_MAX_LENGTH}"
					value="${title}"
					@change="${this._saveOnChange('title')}"
					@input="${this._saveTitleOnInput}"
					label="${this.localize('content.name')} *"
					aria-invalid="${this._titleError ? 'true' : ''}"
					prevent-submit
					novalidate
					?skeleton="${this.skeleton}"
				>
				</d2l-input-text>
				${this._renderTitleTooltip()}
			</div>
			<slot name="dueDate"></slot>
			<div id="content-description-container">
				<div class="d2l-activity-label-container d2l-label-text d2l-skeletize">
					${this.localize('content.description')}
				</div>
				<div class="d2l-skeletize">
					<d2l-activity-html-editor
						.ariaLabel="content-description"
						.key="content-description"
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

	async cancelCreate() {
		const moduleEntity = moduleStore.getContentModuleActivity(this.href);
		if (!moduleEntity) {
			return;
		}

		await moduleEntity.cancelCreate();
	}

	hasPendingChanges() {
		const moduleEntity = moduleStore.getContentModuleActivity(this.href);
		if (!moduleEntity) {
			return false;
		}
		return moduleEntity.dirty;
	}

	async save() {
		const moduleEntity = moduleStore.getContentModuleActivity(this.href);
		if (!moduleEntity) {
			return;
		}

		await moduleEntity.save();
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
		if (!this._titleError) {
			return html ``;
		}

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

	_saveDescription(richText) {
		const moduleEntity = moduleStore.getContentModuleActivity(this.href);
		if (!moduleEntity) {
			return;
		}
		moduleEntity.setDescription(richText);
	}

	_saveOnChange(jobName) {
		this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	}

	_saveTitle(value) {
		const moduleEntity = moduleStore.getContentModuleActivity(this.href);
		if (!moduleEntity) {
			return;
		}
		moduleEntity.setTitle(value);
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
customElements.define('d2l-activity-content-module-detail', ContentModuleDetail);
