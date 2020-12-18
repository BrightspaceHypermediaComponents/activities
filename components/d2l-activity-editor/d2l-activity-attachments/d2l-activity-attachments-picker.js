import './d2l-activity-attachments-picker-presentational.js';

import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { shared as attachmentStore } from './state/attachment-store.js';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as store } from './state/attachment-collections-store.js';

class ActivityAttachmentsPicker extends ActivityEditorMixin(SkeletonMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement)))) {

	constructor() {
		super(store);
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
		} = collection || {};

		return html`
		<d2l-activity-attachments-picker-presentational
			?can-add-file="${canAddFile}"
			?can-add-link="${canAddLink}"
			?can-add-googledrive-link="${canAddGoogleDriveLink}"
			?can-add-onedrive-link="${canAddOneDriveLink}"
			?can-record-video="${canRecordVideo}"
			?can-record-audio="${canRecordAudio}"
			@d2l-activity-attachments-picker-files-uploaded="${this._handlerFilesUploaded}"
			@d2l-activity-attachments-picker-video-uploaded="${this._handlerVideoUploaded}"
			@d2l-activity-attachments-picker-audio-uploaded="${this._handlerAudioUploaded}"
			@d2l-activity-attachments-picker-googledrive-link-dialog-opened="${this._handlerLaunchAddGoogleDriveLinkDialog}"
			@d2l-activity-attachments-picker-link-dialog-opened="${this._handlerLaunchAddLinkDialog}"
			@d2l-activity-attachments-picker-onedrive-link-dialog-opened="${this._handlerLaunchAddOneDriveLinkDialog}"
			@d2l-activity-attachments-picker-quicklink-dialog-opened="${this._handlerLaunchAddQuicklinkDialog}"
		>`;
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

	async _handlerAudioUploaded(e) {
		this._handlerAudioVideoUploaded(e, { storeCreateFileMethod: 'createAudio' });
	}

	async _handlerAudioVideoUploaded(e, { storeCreateFileMethod }) {
		const attachment = e.detail.files[0];

		if (attachment.GetFileSystemType) {
			const file = attachment;
			const fileId = file.GetId();
			const fileName = file.GetName();
			const fileSystemType = file.GetFileSystemType();

			const collection = store.get(this.href);
			const previewUrl = await collection.getPreviewUrl(fileSystemType, fileId);
			this._addToCollection(attachmentStore[storeCreateFileMethod](fileName, fileSystemType, fileId, previewUrl));
		} else if (attachment.GetLocation) {
			const link = attachment;
			this._addToCollection(attachmentStore.createLink(link.GetName(), link.GetLocation(), link.GetUrn()));
		}
	}

	async _handlerFilesUploaded(e) {
		const files = e.detail.files;

		for (const file of files) {
			const fileSystemType = file.m_fileSystemType;
			const fileId = file.m_id;
			const previewUrl = file.m_previewUrl;
			this._addToCollection(attachmentStore.createFile(file.m_name, fileSystemType, fileId, previewUrl));
		}
	}

	async _handlerLaunchAddGoogleDriveLinkDialog(e) {
		this._addToCollection(attachmentStore.createGoogleDriveLink(e.detail.title, e.detail.url));
	}

	async _handlerLaunchAddLinkDialog(e) {
		this._addToCollection(attachmentStore.createLink(e.detail.title, e.detail.url));
	}

	async _handlerLaunchAddOneDriveLinkDialog(e) {
		this._addToCollection(attachmentStore.createOneDriveLink(e.detail.title, e.detail.url));
	}

	async _handlerLaunchAddQuicklinkDialog(e) {
		const event = e.detail.event;

		const quicklinkTemplate = await this._getQuickLinkTemplate(event);
		this._addToCollection(attachmentStore.createLink(event.m_title, quicklinkTemplate));
	}

	async _handlerVideoUploaded(e) {
		this._handlerAudioVideoUploaded(e, { storeCreateFileMethod: 'createVideo' });
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
