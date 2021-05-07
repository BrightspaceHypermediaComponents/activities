import '../shared-components/d2l-activity-content-editor-title.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { activityContentEditorStyles } from '../shared-components/d2l-activity-content-editor-styles.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { ContentEditorConstants } from '../constants';
import { ContentFileEntity, FILE_TYPES } from 'siren-sdk/src/activities/content/ContentFileEntity.js';
import '../content-file/d2l-activity-content-file-html-view.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { shared as contentFileStore } from './state/content-file-store.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { html, css } from 'lit-element/lit-element.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

class ContentFileDetail extends AsyncContainerMixin(SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(EntityMixinLit(RtlMixin(ActivityEditorMixin(MobxLitElement))))))) {

	static get styles() {
		return  [
			super.styles,
			labelStyles,
			activityContentEditorStyles,
			css`
				.d2l-activity-label-container {
					margin-bottom: 7px;
				}
				.d2l-new-html-editor-container {
					flex: 1;
					min-height: 300px;
				}
				#content-page-content-container {
					display: flex;
					flex-direction: column;
					height: inherit;
				}
			`
		];
	}

	constructor() {
		super(contentFileStore);
		this._debounceJobs = {};
		this._setEntityType(ContentFileEntity);
		this.skeleton = true;
		this.saveOrder = 2000;
	}

	connectedCallback() {
		super.connectedCallback();
		this.saveTitle = this.saveTitle.bind(this);
	}

	render() {
		const contentFileEntity = contentFileStore.getContentFileActivity(this.href);
		let pageContent = null;
		let htmlNewEditorEnabled = false;
		let fileContent = null;

		if (contentFileEntity) {
			this.skeleton = false;
			pageContent = contentFileEntity.fileContent;
			
			if (contentFileEntity.fileType === FILE_TYPES.html) {
				fileContent =  html`
					<ContentFileHtmlView>
					</ContentFileHtmlView>
				`;
			}
		}

		return html`
			<d2l-activity-content-editor-title
				.entity=${contentFileEntity}
				.onSave=${this.saveTitle}
			>
			</d2l-activity-content-editor-title>
			<slot name="due-date"></slot>
			<div id="content-page-content-container">
				<div class="d2l-activity-label-container d2l-label-text d2l-skeletize">
					${this.localize('content.pageContent')}
				</div>
				${fileContent}
			</div>
		`;
	}

	async cancelCreate() {
		const contentFileEntity = contentFileStore.getContentFileActivity(this.href);
		if (!contentFileEntity) {
			return;
		}

		await contentFileEntity.cancelCreate();
	}

	hasPendingChanges() {
		const contentFileActivity = contentFileStore.getContentFileActivity(this.href);
		if (!contentFileActivity) {
			return false;
		}
		return contentFileActivity.dirty;
	}

	async save() {
		const contentFileActivity = contentFileStore.getContentFileActivity(this.href);
		if (!contentFileActivity) {
			return;
		}

		this._saveOnChange('pageContent');

		const originalActivityUsageHref = contentFileActivity.activityUsageHref;
		
		const updatedEntity = await contentFileActivity.save();
		const event = new CustomEvent('d2l-content-activity-update', {
			detail: {
				originalActivityUsageHref: originalActivityUsageHref,
				updatedActivityUsageHref: updatedEntity.getActivityUsageHref()
			},
			bubbles: true,
			composed: true,
			cancelable: true
		});
		await this.dispatchEvent(event);
	}

	saveTitle(title) {
		const contentFileActivity = contentFileStore.getContentFileActivity(this.href);
		if (!contentFileActivity) {
			return;
		}
		contentFileActivity.setTitle(title);
	}

	_onPageContentChange(e) {
		const pageContent = e.detail.content;
		this._debounceJobs.description = Debouncer.debounce(
			this._debounceJobs.description,
			timeOut.after(ContentEditorConstants.DEBOUNCE_TIMEOUT),
			() => this._savePageContent(pageContent)
		);
	}

	_savePageContent(pageContent) {
		const contentFileEntity = contentFileStore.getContentFileActivity(this.href);
		if (!contentFileEntity) {
			return;
		}
		contentFileEntity.setPageContent(pageContent);
	}

	_saveOnChange(jobName) {
		this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	}
}

customElements.define('d2l-activity-content-file-detail', ContentFileDetail);
