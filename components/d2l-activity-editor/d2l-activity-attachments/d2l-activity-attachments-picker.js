import '@brightspace-ui/core/components/button/button';
import '@brightspace-ui/core/components/colors/colors';
import 'd2l-tooltip/d2l-tooltip';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { shared as attachmentStore } from './state/attachment-store.js';
import { getLocalizeResources } from '../localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin';
import { shared as store } from './state/attachment-collections-store.js';

class ActivityAttachmentsPicker extends ActivityEditorMixin(LocalizeMixin(RtlMixin(MobxLitElement))) {

	static get styles() {
		return css`
			:host {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				background: var(--d2l-color-regolith);
				border-radius: 6px;
				border: 1px solid var(--d2l-color-mica);
				padding: 12px;
			}

			.button-container {
				display: flex;
				flex-direction: row;
				width: 100%;
			}

			.button-container-right {
				margin-left: auto;
			}
			:host([dir="rtl"]) .button-container-right {
				margin-left: 0;
				margin-right: auto;
			}

			d2l-button-icon:not([hidden]),
			d2l-button-subtle:not([hidden]) {
				display: inline-block;
			}
		`;
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super(store);

		this._tooltipBoundary = {
			left: 20 + 12, // padding-left applied to d2l-activity-attachments-picker + padding-left of d2l-button-icon
			right: 0
		};

		D2L.ActivityEditor = D2L.ActivityEditor || {};
		// Referenced by the server-side ActivitiesView renderer
		D2L.ActivityEditor.FileUploadDialogCallback = files => {
			for (const file of files) {
				const fileSystemType = file.m_fileSystemType;
				const fileId = file.m_id;
				this._addToCollection(attachmentStore.createFile(file.m_name, fileSystemType, fileId));
			}
		};
		// Referenced by the server-side ActivitiesView renderer
		D2L.ActivityEditor.RecordVideoDialogCallback = file => {
			this._addToCollection(attachmentStore.createVideo(file.m_name, file.FileSystemType, file.FileId));
		};
		// Referenced by the server-side ActivitiesView renderer
		D2L.ActivityEditor.RecordAudioDialogCallback = file => {
			this._addToCollection(attachmentStore.createAudio(file.m_name, file.FileSystemType, file.FileId));
		};
	}

	get _orgUnitId() {
		const match = this.href.match(/\.(com|d2l)\/(\d+)\//);
		if (!match || match.length < 3) {
			return -1;
		}
		const orgUnitId = match[2];
		return orgUnitId;
	}

	_launchAddFileDialog() {
		const opener = D2L.LP.Web.UI.ObjectRepository.TryGet('D2L.ActivityEditor.FileUploadDialogOpener');
		if (opener) {
			opener();
		}
	}

	_launchAddQuicklinkDialog() {
		const opener = D2L.LP.Web.UI.ObjectRepository.TryGet('D2L.ActivityEditor.AddQuicklinkDialogOpener');
		if (!opener) {
			return;
		}

		// Required for the async handler below to work in Edge
		const event = opener();
		event.AddListener(async event => {
			const quicklinkUrl = `/d2l/api/lp/unstable/${this._orgUnitId}/quickLinks/${event.m_typeKey}/${event.m_id}`;
			const response = await fetch(quicklinkUrl);
			const json = await response.json();
			this._addToCollection(attachmentStore.createLink(event.m_title, json.QuickLinkTemplate));
		});
	}

	_addToCollection(attachment) {
		const collection = store.get(this.href);
		collection.addAttachment(attachment);
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

	_launchRecordVideoDialog() {
		const opener = D2L.LP.Web.UI.ObjectRepository.TryGet('D2L.ActivityEditor.RecordVideoDialogOpener');
		if (opener) {
			opener();
		}
	}

	_launchRecordAudioDialog() {
		const opener = D2L.LP.Web.UI.ObjectRepository.TryGet('D2L.ActivityEditor.RecordAudioDialogOpener');
		if (opener) {
			opener();
		}
	}

	render() {
		const collection = store.get(this.href);
		if (!collection) {
			return html``;
		}

		const {
			canAddFile,
			canAddLink,
			canAddGoogleDriveLink,
			canAddOneDriveLink,
			canRecordVideo,
			canRecordAudio
		} = collection;

		return html`
			<div class="button-container">
				<d2l-button-icon
					id="add-file-button"
					icon="d2l-tier1:upload"
					text="${this.localize('addFile')}"
					?hidden="${!canAddFile}"
					@click="${this._launchAddFileDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-file-button"
					aria-hidden="true"
					disable-focus-lock
					.boundary="${this._tooltipBoundary}">${this.localize('addFile')}</d2l-tooltip>
					<!-- Important: keep tooltip content inline, otherwise screenreader gets confused -->
				<d2l-button-icon
					id="add-quicklink-button"
					icon="d2l-tier1:quicklink"
					text="${this.localize('addQuicklink')}"
					?hidden="${!canAddLink}"
					@click="${this._launchAddQuicklinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-quicklink-button"
					aria-hidden="true"
					disable-focus-lock
					.boundary="${this._tooltipBoundary}">${this.localize('addQuicklink')}</d2l-tooltip>

				<d2l-button-icon
					id="add-link-button"
					icon="d2l-tier1:link"
					text="${this.localize('addLink')}"
					?hidden="${!canAddLink}"
					@click="${this._launchAddLinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-link-button"
					aria-hidden="true"
					disable-focus-lock
					.boundary="${this._tooltipBoundary}">${this.localize('addLink')}</d2l-tooltip>

				<d2l-button-icon
					id="add-google-drive-link-button"
					icon="d2l-tier1:google-drive"
					text="${this.localize('addGoogleDriveLink')}"
					?hidden="${!canAddGoogleDriveLink}"
					@click="${this._launchAddGoogleDriveLinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-google-drive-link-button"
					aria-hidden="true"
					disable-focus-lock
					.boundary="${this._tooltipBoundary}">${this.localize('addGoogleDriveLink')}</d2l-tooltip>

				<d2l-button-icon
					id="add-onedrive-link-button"
					icon="d2l-tier1:one-drive"
					text="${this.localize('addOneDriveLink')}"
					?hidden="${!canAddOneDriveLink}"
					@click="${this._launchAddOneDriveLinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-onedrive-link-button"
					aria-hidden="true"
					disable-focus-lock
					.boundary="${this._tooltipBoundary}">${this.localize('addOneDriveLink')}</d2l-tooltip>

				<div class="button-container-right">
					<d2l-button-subtle
						id="record-audio-button"
						icon="tier1:mic"
						?hidden="${!canRecordAudio}"
						text="${this.localize('recordAudio')}"
						@click="${this._launchRecordAudioDialog}">
					</d2l-button-subtle>
					<d2l-button-subtle
						id="record-video-button"
						icon="tier1:file-video"
						?hidden="${!canRecordVideo}"
						text="${this.localize('recordVideo')}"
						@click="${this._launchRecordVideoDialog}">
					</d2l-button-subtle>
				</div>
			</div>
		`;
	}
}
customElements.define('d2l-activity-attachments-picker', ActivityAttachmentsPicker);
