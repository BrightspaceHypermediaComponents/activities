import '../shared-components/d2l-activity-content-editor-title.js';
import './d2l-activity-content-file-loading.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { ContentFileEntity, FILE_TYPES } from 'siren-sdk/src/activities/content/ContentFileEntity.js';
import { css, html } from 'lit-element/lit-element.js';
import { activityContentEditorStyles } from '../shared-components/d2l-activity-content-editor-styles.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { activityHtmlEditorStyles } from '../shared-components/d2l-activity-html-editor-styles.js';
import { ContentEditorConstants } from '../constants';
import { shared as contentFileStore } from './state/content-file-store.js';
import { ContentHtmlFileTemplatesEntity } from 'siren-sdk/src/activities/content/ContentHtmlFileTemplatesEntity.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { fetchEntity } from '../../state/fetch-entity.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

class ContentFileDetail extends AsyncContainerMixin(SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(EntityMixinLit(RtlMixin(ActivityEditorMixin(MobxLitElement))))))) {

	static get properties() {
		return {
			htmlFileTemplates: { type: Array }
		};
	}

	static get styles() {
		return [
			super.styles,
			labelStyles,
			activityContentEditorStyles,
			activityHtmlEditorStyles,
			css`
				.d2l-page-content-label-select-template-container {
					align-items: center;
					display: flex;
					justify-content: space-between;
					margin-bottom: 6px;
				}
				.d2l-new-html-editor-container {
					margin-top: 6px;
				}
			`
		];
	}

	constructor() {
		super(contentFileStore);
		this._debounceJobs = {};
		this._setEntityType(ContentFileEntity);
		this.skeleton = true;
		this.saveOrder = 500;
		this.htmlTemplatesHref = null;
		this.htmlFileTemplates = [];
		this.firstTemplatesLoadAttempted = false;
		this.htmlFileTemplatesLoaded = false;
	}

	connectedCallback() {
		super.connectedCallback();
		this.saveTitle = this.saveTitle.bind(this);
	}

	render() {
		const contentFileEntity = contentFileStore.getContentFileActivity(this.href);
		let pageContent = undefined;
		let pageRenderer = undefined;
		let htmlTemplatesHref = null;

		if (contentFileEntity) {
			this.skeleton = false;
			pageContent = contentFileEntity.fileContent;

<<<<<<< HEAD
			this.htmlTemplatesHref = contentFileEntity.htmlTemplatesHref;
=======
			if (contentFileEntity.htmlTemplatesHref) {
				htmlTemplatesHref = contentFileEntity.htmlTemplatesHref;
			}
>>>>>>> d361877c (Configure 'Select Template' subtle button to show dependent on wether 'contentFileEntity.htmlTemplatesHref' exists)

			switch (contentFileEntity.fileType) {
				case FILE_TYPES.html:
					pageRenderer = this._renderHtmlEditor(pageContent, htmlTemplatesHref);
					break;
			}
		} else {
			pageRenderer = this._renderUnknownLoadingFileType();
		}

		return html`
			<d2l-activity-content-editor-title
				.entity=${contentFileEntity}
				.onSave=${this.saveTitle}
			>
			</d2l-activity-content-editor-title>
			<slot name="due-date"></slot>
			<div id="content-page-content-container">
				${pageRenderer}
			</div>
		`;
	}

	updated(changedProperties) {
		if (changedProperties.has('asyncState')) {
			this.skeleton = this.asyncState !== asyncStates.complete;
		}
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

		this._saveOnChange('htmlContent');

		const originalActivityUsageHref = contentFileActivity.activityUsageHref;
		const updatedEntity = await contentFileActivity.save();
		const event = new CustomEvent('d2l-content-working-copy-committed', {
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

	_getHtmlTemplateLoadingMenuItem() {
		return html`<d2l-menu-item text=${this.localize('content.htmlTemplatesLoading')} disabled="true"></d2l-menu-item>`;
	}

	async _getHtmlTemplates() {
		const htmlTemplatesResponse = await fetchEntity(this.htmlTemplatesHref, this.token);
		const htmlTemplatesEntity = new ContentHtmlFileTemplatesEntity(htmlTemplatesResponse, this.token, { remove: () => { } });
		const templates = htmlTemplatesEntity.getHtmlFileTemplates();
		this.htmlFileTemplates = templates;
		this.htmlFileTemplatesLoaded = true;
	}

	_handleClickSelectTemplateButton() {
		if (!this.htmlFileTemplatesLoaded && !this.firstTemplatesLoadAttempted) {
			this.firstTemplatesLoadAttempted = true;
			this._getHtmlTemplates(this.htmlTemplatesHref);
		}
	}

	_onPageContentChange(e) {
		const pageContent = e.detail.content;
		this._savePageContent(pageContent);
	}

	_onPageContentChangeDebounced(e) {
		const pageContent = e.detail.content;
		this._debounceJobs.description = Debouncer.debounce(
			this._debounceJobs.description,
			timeOut.after(ContentEditorConstants.DEBOUNCE_TIMEOUT),
			() => this._savePageContent(pageContent)
		);
	}

	_renderHtmlEditor(pageContent, htmlTemplatesHref) {
		const newEditorEvent = new CustomEvent('d2l-request-provider', {
			detail: { key: 'd2l-provider-html-new-editor-enabled' },
			bubbles: true,
			composed: true,
			cancelable: true
		});

		this.dispatchEvent(newEditorEvent);
		const htmlNewEditorEnabled = newEditorEvent.detail.provider;

		//@d2l-activity-text-editor-change for the new editor is on blur, while the old editor is on change
		//we don't want the debouncer on the new editor in case the user clicks directly onto a button from the editor
		const activityTextEditorChange = htmlNewEditorEnabled ? this._onPageContentChange : this._onPageContentChangeDebounced;

		return html`
			<div class="d2l-page-content-label-select-template-container">
				<label class="d2l-label-text d2l-skeletize">
					${this.localize('content.pageContent')}
				</label>
<<<<<<< HEAD
				<d2l-dropdown-button-subtle
					style="${this.htmlTemplatesHref ? '' : 'visibility:hidden;'}"
					text=${this.localize('content.selectTemplate')}
					class="d2l-skeletize"
					@click=${this._handleClickSelectTemplateButton}
				>
					<d2l-dropdown-menu
						style="${this.htmlTemplatesHref ? '' : 'visibility:hidden;'}"
					>
						<d2l-menu label=${this.localize('content.htmlTemplatesLoading')}>
							<d2l-menu-item text=${this.localize('content.BrowseForHtmlTemplate')}></d2l-menu-item>
							${this.htmlFileTemplatesLoaded ? this.htmlFileTemplates.map((template) => { return html`<d2l-menu-item text=${template.properties.title}></d2l-menu-item>`; }) : this._getHtmlTemplateLoadingMenuItem()}
						</d2l-menu>
					</d2l-dropdown-menu>
=======
				<d2l-dropdown-button-subtle 
					style="${htmlTemplatesHref ? '' : 'visibility:hidden;'}" 
					text=${this.localize('content.selectTemplate')}
					class="d2l-skeletize"
				>
>>>>>>> d361877c (Configure 'Select Template' subtle button to show dependent on wether 'contentFileEntity.htmlTemplatesHref' exists)
				</d2l-dropdown-button-subtle>
			</div>
			<div class="d2l-skeletize ${htmlNewEditorEnabled ? 'd2l-new-html-editor-container' : ''}">
				<d2l-activity-text-editor
					.ariaLabel="${this.localize('content.pageContent')}"
					.key="content-page-content"
					.value="${pageContent}"
					@d2l-activity-text-editor-change="${activityTextEditorChange}"
					.richtextEditorConfig="${{}}"
					html-editor-height="100%"
					full-page
					full-page-font-size="12pt"
					full-page-font-family="Verdana"
				>
				</d2l-activity-text-editor>
			</div>`;
	}

	_renderUnknownLoadingFileType() {
		return html`
			<d2l-activity-content-file-loading
				.href="${this.href}"
				.token="${this.token}"
			></d2l-activity-content-file-loading>
		`;
	}

	_saveOnChange(jobName) {
		this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	}

	_savePageContent(pageContent) {
		const contentFileEntity = contentFileStore.getContentFileActivity(this.href);
		if (!contentFileEntity) {
			return;
		}
		contentFileEntity.setPageContent(pageContent);
	}
}

customElements.define('d2l-activity-content-file-detail', ContentFileDetail);
