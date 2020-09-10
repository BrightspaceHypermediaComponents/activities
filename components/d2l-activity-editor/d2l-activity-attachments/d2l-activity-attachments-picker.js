import '@brightspace-ui/core/components/button/button';
import '@brightspace-ui/core/components/colors/colors';
import 'd2l-tooltip/d2l-tooltip';
import 'd2l-menu/d2l-menu.js';
import 'd2l-dropdown/d2l-dropdown.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';

import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { shared as attachmentStore } from './state/attachment-store.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin';
import { SkeletizeMixin } from '../mixins/d2l-skeletize-mixin';
import { shared as store } from './state/attachment-collections-store.js';

class ActivityAttachmentsPicker extends ActivityEditorMixin(SkeletizeMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement)))) {

	static get styles() {
		return [super.styles, css`
			.d2l-attachments-picker-container {
				align-items: center;
				background: var(--d2l-color-regolith);
				border: 1px solid var(--d2l-color-mica);
				border-radius: 6px;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}

			.d2l-button-container {
				display: flex;
				flex-direction: row;
				padding: 12px;
				width: 100%;
			}

			.d2l-button-container-right {
				margin-left: auto;
			}
			:host([dir="rtl"]) .d2l-button-container-right {
				margin-left: 0;
				margin-right: auto;
			}

			d2l-button-icon:not([hidden]),
			d2l-button-subtle:not([hidden]) {
				display: inline-block;
			}

			.d2l-button-container-small {
				display: none;
			}

			@media only screen and (max-width: 768px) {
				:host {
					padding: 2px;
				}

				.d2l-button-container {
					display: none;
				}
				.d2l-button-container-small {
					display: block;
				}
			}
		`];
	}

	constructor() {
		super(store);

		D2L.ActivityEditor = D2L.ActivityEditor || {};
		// Referenced by the server-side ActivitiesView renderer
		D2L.ActivityEditor.FileUploadDialogCallback = (files) => {
			for (const file of files) {
				const fileSystemType = file.m_fileSystemType;
				const fileId = file.m_id;
				const previewUrl = file.m_previewUrl;
				this._addToCollection(attachmentStore.createFile(file.m_name, fileSystemType, fileId, previewUrl));
			}
			this.dispatchEvent(new CustomEvent('d2l-activity-attachments-picker-files-uploaded', {
				bubbles: true,
				composed: true,
				detail: {
					files: files
				}
			}));
		};
		// Referenced by the server-side ActivitiesView renderer
		D2L.ActivityEditor.RecordVideoDialogCallback = async(file) => {
			const collection = store.get(this.href);
			const previewUrl = await collection.getPreviewUrl(file.FileSystemType, file.FileId);
			this._addToCollection(attachmentStore.createVideo(file.FileName, file.FileSystemType, file.FileId, previewUrl));
			this.dispatchEvent(new CustomEvent('d2l-activity-attachments-picker-video-uploaded', {
				bubbles: true,
				composed: true
			}));
		};
		// Referenced by the server-side ActivitiesView renderer
		D2L.ActivityEditor.RecordAudioDialogCallback = async(file) => {
			const collection = store.get(this.href);
			const previewUrl = await collection.getPreviewUrl(file.FileSystemType, file.FileId);
			this._addToCollection(attachmentStore.createAudio(file.FileName, file.FileSystemType, file.FileId, previewUrl));
			this.dispatchEvent(new CustomEvent('d2l-activity-attachments-picker-audio-uploaded', {
				bubbles: true,
				composed: true
			}));
		};
	}

	render() {
		const collection = store.get(this.href);
		if (!collection && !this.skeleton) {
			return html``;
		}

		const {
			canAddFile,
			canAddLink,
			canAddGoogleDriveLink,
			canAddOneDriveLink,
			canRecordVideo,
			canRecordAudio
		} = collection || {
			canAddFile: true // fallback to ensure skeleton state displays with correct height
		};

		return html`
		<div class="d2l-attachments-picker-container d2l-skeletize">
			<div class="d2l-button-container">
				<d2l-button-icon
					id="add-file-button"
					icon="d2l-tier1:upload"
					aria-label="${this.localize('attachments.addFile')}"
					?hidden="${!canAddFile}"
					@click="${this._launchAddFileDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-file-button"
					aria-hidden="true"
					disable-focus-lock>${this.localize('attachments.addFile')}</d2l-tooltip>
					<!-- Important: keep tooltip content inline, otherwise screenreader gets confused -->
				<d2l-button-icon
					id="add-quicklink-button"
					icon="d2l-tier1:quicklink"
					aria-label="${this.localize('attachments.addQuicklink')}"
					?hidden="${!canAddLink}"
					@click="${this._launchAddQuicklinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-quicklink-button"
					aria-hidden="true"
					disable-focus-lock>${this.localize('attachments.addQuicklink')}</d2l-tooltip>

				<d2l-button-icon
					id="add-link-button"
					icon="d2l-tier1:link"
					aria-label="${this.localize('attachments.addLink')}"
					?hidden="${!canAddLink}"
					@click="${this._launchAddLinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-link-button"
					aria-hidden="true"
					disable-focus-lock>${this.localize('attachments.addLink')}</d2l-tooltip>

				<d2l-button-icon
					id="add-google-drive-link-button"
					icon="d2l-tier1:google-drive"
					aria-label="${this.localize('attachments.addGoogleDriveLink')}"
					?hidden="${!canAddGoogleDriveLink}"
					@click="${this._launchAddGoogleDriveLinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-google-drive-link-button"
					aria-hidden="true"
					disable-focus-lock>${this.localize('attachments.addGoogleDriveLink')}</d2l-tooltip>

				<d2l-button-icon
					id="add-onedrive-link-button"
					icon="d2l-tier1:one-drive"
					aria-label="${this.localize('attachments.addOneDriveLink')}"
					?hidden="${!canAddOneDriveLink}"
					@click="${this._launchAddOneDriveLinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-onedrive-link-button"
					aria-hidden="true"
					disable-focus-lock>${this.localize('attachments.addOneDriveLink')}</d2l-tooltip>

				<div class="d2l-button-container-right">
					<d2l-button-subtle
						id="record-audio-button"
						icon="tier1:mic"
						?hidden="${!canRecordAudio}"
						text="${this.localize('attachments.recordAudio')}"
						@click="${this._launchRecordAudioDialog}">
					</d2l-button-subtle>
					<d2l-button-subtle
						id="record-video-button"
						icon="tier1:file-video"
						?hidden="${!canRecordVideo}"
						text="${this.localize('attachments.recordVideo')}"
						@click="${this._launchRecordVideoDialog}">
					</d2l-button-subtle>
				</div>
			</div>
			<div class="d2l-button-container-small">
				<d2l-dropdown>
					<d2l-button-icon
						id="attach-dropdown"
						class="d2l-dropdown-opener opener-border-0 option-menu-toggle"
						icon="d2l-tier1:attach"
						text="${this.localize('attachments.attach')}">
					</d2l-button-icon>
					<d2l-tooltip for="attach-dropdown"
						position="top" disable-focus-lock>${this.localize('attachments.attach')}
					</d2l-tooltip>
					<d2l-dropdown-menu id="dropdown" align="end" no-pointer vertical-offset="6px">
						<d2l-menu role="menu" label="${this.localize('attachments.attach')}">
							<d2l-menu-item
								text="${this.localize('attachments.addFileMenu')}"
								?hidden="${!canAddFile}"
								@d2l-menu-item-select="${this._launchAddFileDialog}"
							></d2l-menu-item>
							<d2l-menu-item
								text="${this.localize('attachments.addQuicklinkMenu')}"
								?hidden="${!canAddLink}"
								@d2l-menu-item-select="${this._launchAddQuicklinkDialog}"
							></d2l-menu-item>
							<d2l-menu-item
								text="${this.localize('attachments.addLinkMenu')}"
								?hidden="${!canAddLink}"
								@d2l-menu-item-select="${this._launchAddLinkDialog}"
							></d2l-menu-item>
							<d2l-menu-item
								text="${this.localize('attachments.addGoogleDriveLinkMenu')}"
								?hidden="${!canAddGoogleDriveLink}"
								@d2l-menu-item-select="${this._launchAddGoogleDriveLinkDialog}"
							></d2l-menu-item>
							<d2l-menu-item
								text="${this.localize('attachments.addOneDriveLinkMenu')}"
								?hidden="${!canAddLink}"
								@d2l-menu-item-select="${this._launchAddOneDriveLinkDialog}"
							></d2l-menu-item>
						</d2l-menu>
					</d2l-dropdown-menu>
				</d2l-dropdown>
				<span class="d2l-button-container-right">
					<d2l-button-icon
						id="record-audio-button-small"
						icon="tier1:mic"
						?hidden="${!canRecordAudio}"
						text="${this.localize('attachments.recordAudio')}"
						@click="${this._launchRecordAudioDialog}">
					</d2l-button-icon>
					<d2l-tooltip for="record-audio-button-small"
						position="top" disable-focus-lock>${this.localize('attachments.recordAudio')}
					</d2l-tooltip>
					<d2l-button-icon
						id="record-video-button-small"
						icon="tier1:file-video"
						?hidden="${!canRecordVideo}"
						text="${this.localize('attachments.recordVideo')}"
						@click="${this._launchRecordVideoDialog}">
					</d2l-button-icon>
					<d2l-tooltip for="record-video-button-small"
						position="top" disable-focus-lock>${this.localize('attachments.recordVideo')}
					</d2l-tooltip>
				</span>
			</div>
		</div>
		`;
	}
	_addToCollection(attachment) {
		const collection = store.get(this.href);
		collection.addAttachment(attachment);
	}
	async _getQuickLinkTemplate(event) {
		if (event.m_typeKey === this._sources.url) {
			return event.m_url;
		}

		const isRemotePlugin = Boolean(
			event.m_url &&
			event.m_url.length > 0 &&
			!Object.values(this._sources).includes(event.m_typeKey)
		);

		if (isRemotePlugin) {
			if (/^(http|https|ftp):\/\//i.test(event.m_url)) {
				return event.m_url;
			} else {
				return decodeURIComponent(event.m_url);
			}
		}

		const quicklinkUrl = `/d2l/api/lp/unstable/${this._orgUnitId}/quickLinks/${event.m_typeKey}/${event.m_id}`;
		const response = await fetch(quicklinkUrl);
		const json = await response.json();
		return json.QuickLinkTemplate;
	}
	_launchAddFileDialog() {
		const opener = D2L.LP.Web.UI.ObjectRepository.TryGet('D2L.ActivityEditor.FileUploadDialogOpener');
		if (opener) {
			opener();
		}
	}
	_launchAddGoogleDriveLinkDialog() {
		const opener = D2L.LP.Web.UI.ObjectRepository.TryGet('D2L.ActivityEditor.AddGoogleDriveLinkDialogOpener');
		if (!opener) {
			return;
		}

		const event = opener();
		event.AddListener(event => {
			this._addToCollection(attachmentStore.createGoogleDriveLink(event.m_title, event.m_url));
		});
	}
	_launchAddLinkDialog() {
		const opener = D2L.LP.Web.UI.ObjectRepository.TryGet('D2L.ActivityEditor.AddLinkDialogOpener');
		if (!opener) {
			return;
		}

		const event = opener();
		event.AddListener(event => {
			this._addToCollection(attachmentStore.createLink(event.m_title, event.m_url));
		});
	}
	_launchAddOneDriveLinkDialog() {
		const opener = D2L.LP.Web.UI.ObjectRepository.TryGet('D2L.ActivityEditor.AddOneDriveLinkDialogOpener');
		if (!opener) {
			return;
		}

		const event = opener();
		event.AddListener(event => {
			this._addToCollection(attachmentStore.createOneDriveLink(event.m_title, event.m_url));
		});
	}
	_launchAddQuicklinkDialog() {
		const opener = D2L.LP.Web.UI.ObjectRepository.TryGet('D2L.ActivityEditor.AddQuicklinkDialogOpener');
		if (!opener) {
			return;
		}

		// Required for the async handler below to work in Edge
		const event = opener();
		event.AddListener(async event => {
			const quicklinkTemplate = await this._getQuickLinkTemplate(event);
			this._addToCollection(attachmentStore.createLink(event.m_title, quicklinkTemplate));
		});
	}

	_launchRecordAudioDialog() {
		const opener = D2L.LP.Web.UI.ObjectRepository.TryGet('D2L.ActivityEditor.RecordAudioDialogOpener');
		if (opener) {
			opener();
		}
	}
	_launchRecordVideoDialog() {
		const opener = D2L.LP.Web.UI.ObjectRepository.TryGet('D2L.ActivityEditor.RecordVideoDialogOpener');
		if (opener) {
			opener();
		}
	}
	get _orgUnitId() {
		const match = this.href.match(/\.(com|d2l)\/(\d+)\//);
		if (!match || match.length < 3) {
			return -1;
		}
		const orgUnitId = match[2];
		return orgUnitId;
	}

	get _sources() {
		return {
			announcement: 'news',
			assignment: 'dropbox',
			calendar: 'schedule',
			chat: 'chat',
			checklist: 'checklist',
			content: 'content',
			courseFile: 'coursefile',
			discussion: 'discuss',
			ePortfolio: 'epobject',
			formTemplate: 'form',
			googleDrive: 'google-drive',
			lti: 'lti',
			oneDrive: 'one-drive',
			quiz: 'quiz',
			selfAssessment: 'selfassess',
			survey: 'survey',
			url: 'url'
		};
	}

}
customElements.define('d2l-activity-attachments-picker', ActivityAttachmentsPicker);
