import { action, computed, configure as configureMobx, decorate, observable, runInAction } from 'mobx';
import { AttachmentCollectionEntity } from 'siren-sdk/src/activities/AttachmentCollectionEntity.js';
import { fetchEntity } from '../../state/fetch-entity.js';
import { FilePreviewLocationEntity } from 'siren-sdk/src/files/FilePreviewLocationEntity.js';
import { FilesHomeEntity } from 'siren-sdk/src/files/FilesHomeEntity.js';

configureMobx({ enforceActions: 'observed' });

export class AttachmentCollection {
	constructor(href, token, store) {
		this.href = href;
		this.token = token;
		this.attachments = [];
		this.store = store;
	}

	addAttachment(attachment) {
		this.attachments.push(attachment.href);
	}
	get dirty() {
		const attachmentStore = this.store.getAttachmentStore();
		if (!attachmentStore) {
			return false;
		}

		for (const href of this.attachments) {
			const attachment = attachmentStore.get(href);
			if (attachment && this._hasChanged(attachment)) {
				return true;
			}
		}
		return false;
	}
	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new AttachmentCollectionEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}
		return this;
	}

	async getPreviewUrl(fileSystemType, fileId) {
		const filesEntity = await this._getFilesEntity();
		if (!filesEntity) {
			return '';
		}
		const sirenFilePreviewLocation = await filesEntity.getFilePreviewLocationEntity(fileSystemType, fileId);
		if (sirenFilePreviewLocation) {
			const filePreviewLocation = new FilePreviewLocationEntity(sirenFilePreviewLocation, this.token, { remove: () => { } });
			return filePreviewLocation.previewLocation();
		}
	}
	load(entity) {
		this._entity = entity;

		this.canAddAttachments = entity.canAddAttachments();
		this.canAddLink = entity.canAddLinkAttachment();
		this.canAddFile = entity.canAddFileAttachment();
		this.canAddGoogleDriveLink = entity.canAddGoogleDriveLinkAttachment();
		this.canAddOneDriveLink = entity.canAddOneDriveLinkAttachment();
		this.canRecordVideo = entity.canAddVideoNoteAttachment();
		this.canRecordAudio = entity.canAddAudioNoteAttachment();
		this._filesHref = entity.getFilesHref();

		this.attachments = entity.getAttachmentEntityHrefs() || [];
	}

	async save(saveInPlace) {
		const attachmentStore = this.store.getAttachmentStore();
		if (!attachmentStore) {
			throw new Error('No attachment store configured. Cannot save');
		}

		const remainingAttachments = [];

		for (const href of this.attachments) {
			// TODO - Should we run these concurrently using an array of promises?
			// Siren action helper will still serialize them but we could setup the
			// siren sdk methods to allow us to pass the immediate option.
			const attachment = attachmentStore.get(href);
			if (attachment.deleted && !attachment.creating) {
				await attachment.delete();
			} else if (saveInPlace) {
				remainingAttachments.push(href);
			}

			if (attachment.creating && !attachment.deleted) {
				await attachment.save(this._entity);
			}
		}

		runInAction(() => {
			if (saveInPlace) {
				this.attachments = remainingAttachments;
			}
		});
	}
	setAttachments(attachments) {
		this.attachments = attachments;
	}
	setCanAddAttachments(value) {
		this.canAddAttachments = value;
	}
	setCanAddFile(value) {
		this.canAddFile = value;
	}
	setCanAddGoogleDriveLink(value) {
		this.canAddGoogleDriveLink = value;
	}
	setCanAddLink(value) {
		this.canAddLink = value;
	}
	setCanAddOneDriveLink(value) {
		this.canAddOneDriveLink = value;
	}
	setCanRecordAudio(value) {
		this.canRecordAudio = value;
	}
	setCanRecordVideo(value) {
		this.canAddRecordVideo = value;
	}
	async _getFilesEntity() {
		if (!this._filesEntity) {
			const sirenEntity = await fetchEntity(this._filesHref, this.token);
			if (sirenEntity) {
				this._filesEntity = new FilesHomeEntity(sirenEntity, this.token, { remove: () => { } });
			}
		}
		return this._filesEntity;
	}

	_hasChanged(attachment) {
		if (attachment.deleted && !attachment.creating) {
			return true;
		} else if (attachment.creating && !attachment.deleted) {
			return true;
		}
		return false;
	}

}

decorate(AttachmentCollection, {
	// props
	canAddAttachments: observable,
	canAddLink: observable,
	canAddFile: observable,
	canAddGoogleDriveLink: observable,
	canAddOneDriveLink: observable,
	canRecordVideo: observable,
	canRecordAudio: observable,
	attachments: observable,
	dirty: computed,
	// actions
	load: action,
	setCanAddAttachments: action,
	setCanAddFile: action,
	setCanAddLink: action,
	setCanAddGoogleDriveLink: action,
	setCanAddOneDriveLink: action,
	setCanRecordVideo: action,
	setCanRecordAudio: action,
	setAttachments: action,
	addAttachment: action,
	save: action
});
