import '../shared-components/d2l-activity-content-editor-title.js';
import './d2l-activity-content-file-loading.js';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
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
import { FileEntity } from 'siren-sdk/src/files/FileEntity.js';
import { getComposedActiveElement } from '@brightspace-ui/core/helpers/focus.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

// key used for the browse template button
const browseTemplateKey = 'browse';
const editorKeyInitial = 'content-page-content';

class ContentFileDetail extends SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(EntityMixinLit(RtlMixin(ActivityEditorMixin(MobxLitElement)))))) {

	static get properties() {
		return {
			activityUsageHref: { type: String },
			htmlFileTemplates: { type: Array },
			pageContent: { typeof: Text },
			sortHTMLTemplatesByName: { type: Boolean },
		};
	}

	static get styles() {
		return [
			super.styles,
			labelStyles,
			activityContentEditorStyles,
			activityHtmlEditorStyles,
			bodySmallStyles,
			css`
				.d2l-page-content-label-select-template-container {
					align-items: center;
					display: flex;
					justify-content: space-between;
					margin-bottom: 6px;
				}
				.d2l-menu-item-span {
					padding: 15px 20px;
				}
			`,
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
		this.pageContent = null;
		this.editorKey = editorKeyInitial;
		this.replacementContent = null;

		const context = JSON.parse(document.documentElement.getAttribute('data-he-context'));
		this.orgUnitId = context ? context.orgUnitId : '';
	}

	connectedCallback() {
		super.connectedCallback();
		this.saveTitle = this.saveTitle.bind(this);
	}

	render() {
		const contentFileEntity = contentFileStore.getContentFileActivity(this.href);
		let pageRenderer = undefined;

		if (contentFileEntity) {
			this.skeleton = false;
			this.pageContent = contentFileEntity.fileContent;

			this.htmlTemplatesHref = contentFileEntity.htmlTemplatesHref;

			switch (contentFileEntity.fileType) {
				case FILE_TYPES.html:
					pageRenderer = this._renderHtmlEditor();
					break;
			}
		} else {
			pageRenderer = this._renderUnknownLoadingFileType();
		}

		return html`
			<d2l-activity-content-editor-title
				.entity=${contentFileEntity}
				.onSave=${this.saveTitle}
				?skeleton="${this.skeleton}"
			>
			</d2l-activity-content-editor-title>
			<d2l-activity-content-editor-due-date
				.href="${this.activityUsageHref}"
				.token="${this.token}"
				?skeleton="${this.skeleton}"
				expanded="true"
			>
			</d2l-activity-content-editor-due-date>
			<div id="content-page-content-container">
				${pageRenderer}
			</div>
			${this._renderTemplateReplacementConfirmationdialog()}
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

		this._saveOnChange('htmlContent');

		const originalActivityUsageHref = this.activityUsageHref;
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
		return html`<p class="d2l-menu-item-span d2l-body-small">${this.localize('content.htmlTemplatesLoading')}</p>`;
	}

	async _getHtmlTemplates() {
		const htmlTemplatesResponse = await fetchEntity(this.htmlTemplatesHref, this.token);
		const htmlTemplatesEntity = new ContentHtmlFileTemplatesEntity(htmlTemplatesResponse, this.token, { remove: () => { } });
		const templates = htmlTemplatesEntity.getHtmlFileTemplates().map(rawEntity => new FileEntity(rawEntity)) || [];

		if (this.sortHTMLTemplatesByName) {
			templates.sort((a, b) => a.title().localeCompare(b.title(), undefined, { sensitivity: 'base' }));
		}

		this.htmlFileTemplates = templates;
		this.htmlFileTemplatesLoaded = true;
	}

	async _handleBrowseHtmlTemplates() {
		const location = `/d2l/le/lessons/${this.orgUnitId}/OpenTemplateDialog`;

		const dialogResult = await D2L.LP.Web.UI.Desktop.MasterPages.Dialog.Open(
			getComposedActiveElement(),
			new D2L.LP.Web.Http.UrlLocation(location),
		);

		// Called when the dialog is closed
		dialogResult.AddListener(results => {
			if (results.length !== 0) {
				this._handleBrowseHtmlTemplatesDialogClosed(results);
			}
		});
	}

	async _handleBrowseHtmlTemplatesDialogClosed([file]) {
		const valenceHost = `${window.location.protocol}//${window.location.host}`;

		const encodedFileUrl = encodeURIComponent(file.m_id);

		const fileContentUrl = `${valenceHost}/d2l/api/le/unstable/file/GetFileContents?ou=${this.orgUnitId}&filters=ConvertToAbsolutePaths&fileId=${encodedFileUrl}`;

		const response = await window.d2lfetch.fetch(new Request(fileContentUrl));

		if (response.ok) {
			const content = await response.text();

			this._tryOverwriteContent(content);
		}
	}

	_handleClickSelectTemplateButton() {
		if (!this.htmlFileTemplatesLoaded && !this.firstTemplatesLoadAttempted) {
			this.firstTemplatesLoadAttempted = true;
			this._getHtmlTemplates(this.htmlTemplatesHref);
		}
	}

	async _handleClickTemplateMenuItem(e) {
		const target = e.target.getAttribute('key');

		if (target === browseTemplateKey) {
			this._handleBrowseHtmlTemplates();
		}
		else {
			const response = await window.d2lfetch.fetch(target);

			if (response.ok) {
				const content = await response.text();

				this._tryOverwriteContent(content);
			}
		}
	}

	_handleReplaceHtmlTemplateDialogClose(e) {
		if (e.detail.action === 'yes') {
			this._savePageContent(this.replacementContent);
			this.editorKey = `${editorKeyInitial}-${Date.now().toString()}`;
		}

		this.replacementContent = null;
	}

	_isEditorEmpty() {
		const htmlContent = this.pageContent;

		let innerHtml = htmlContent.substring(htmlContent.indexOf('<body') + 5, htmlContent.indexOf('</body>'));

		innerHtml = innerHtml.substring(innerHtml.indexOf('>') + 1);

		return (/^([\s\n]|[<p>(&nbsp;)*</p>])*$/g.test(innerHtml));
	}

	_onPageContentChange(e) {
		const htmlContent = e.detail.content;
		this._savePageContent(htmlContent);
	}

	_onPageContentChangeDebounced(e) {
		const htmlContent = e.detail.content;
		this._debounceJobs.description = Debouncer.debounce(
			this._debounceJobs.description,
			timeOut.after(ContentEditorConstants.DEBOUNCE_TIMEOUT),
			() => this._savePageContent(htmlContent)
		);
	}

	_openReplaceHtmlTemplateDialog() {
		const dialog = this.shadowRoot.querySelector('d2l-dialog-confirm');
		dialog.opened = true;
	}

	_renderHtmlEditor() {
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
				${this._renderTemplateSelectDropdown()}
			</div>
			<div class="d2l-skeletize ${htmlNewEditorEnabled ? 'd2l-new-html-editor-container' : ''}">
				<d2l-activity-text-editor
					.ariaLabel="${this.localize('content.pageContent')}"
					.key=${this.editorKey}
					.value="${this.pageContent}"
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

	_renderHtmlTemplates() {
		if (this.htmlFileTemplates.length === 0) {
			return html`<p class="d2l-menu-item-span d2l-body-small">${this.localize('content.noHtmlTemplates')}</p>`;
		}

		return this.htmlFileTemplates.map((template) => html`<d2l-menu-item text=${template.title()} key=${template.getFileDataLocationHref()}></d2l-menu-item>`);
	}

	_renderTemplateReplacementConfirmationdialog() {
		return html`
			<d2l-dialog-confirm
				title-text="${this.localize('content.confirmDialogTitle')}"
				text="${this.localize('content.confirmDialogBody')}"
				@d2l-dialog-close=${this._handleReplaceHtmlTemplateDialogClose}
			>
				<d2l-button slot="footer" primary data-dialog-action="yes">
					${this.localize('content.confirmDialogActionOption')}
				</d2l-button>
				<d2l-button slot="footer" data-dialog-action="no">
					${this.localize('content.confirmDialogCancelOption')}
				</d2l-button>
			</d2l-dialog-confirm>
		`;
	}

	_renderTemplateSelectDropdown() {
		if (!this.htmlTemplatesHref) {
			return html``;
		}

		let label = this.localize('content.defaultHtmlTemplateHeader');

		if (this.htmlFileTemplates.length === 0) {
			label = `${label} ${this.localize('content.noHtmlTemplates')}`;
		}

		return html`
		<d2l-dropdown-button-subtle
			text=${this.localize('content.selectTemplate')}
			class="d2l-skeletize"
			@click=${this._handleClickSelectTemplateButton}
		>

		<d2l-dropdown-menu align="end">
			<d2l-menu label="${label}" @d2l-menu-item-select=${this._handleClickTemplateMenuItem}>
				<d2l-menu-item text=${this.localize('content.browseForHtmlTemplate')} key=${browseTemplateKey}></d2l-menu-item>
				${this.htmlFileTemplatesLoaded ? this._renderHtmlTemplates() : this._getHtmlTemplateLoadingMenuItem()}
			</d2l-menu>
		</d2l-dropdown-menu>
	</d2l-dropdown-button-subtle>`;
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

	_savePageContent(htmlContent) {
		const contentFileEntity = contentFileStore.getContentFileActivity(this.href);
		if (!contentFileEntity) {
			return;
		}
		contentFileEntity.setPageContent(htmlContent);
		this.pageContent = htmlContent;
	}

	_tryOverwriteContent(htmlContent) {
		if (this._isEditorEmpty()) {
			this._savePageContent(htmlContent);
		} else {
			this.replacementContent = htmlContent;
			this._openReplaceHtmlTemplateDialog();
		}
	}
}

customElements.define('d2l-activity-content-file-detail', ContentFileDetail);
