import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { AttachmentEntity } from 'siren-sdk/src/activities/AttachmentEntity.js';
import { fetchEntity } from '../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class Attachment {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.editing = false;
		this.creating = false;
		this.deleted = false;
		this.attachment = null;
	}

	async delete() {
		if (this._entity) {
			await this._entity.deleteAttachment();
		}
	}
	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new AttachmentEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;

		this.editing = entity.canDeleteAttachment();

		this.attachment = {
			id: entity.self(),
			name: entity.name(),
			url: entity.href()
		};

		if (entity.hasClass('file')) {
			this.attachment.type = 'Document';
		}
	}

	markDeleted(deleted) {
		this.deleted = deleted;
	}

	setName(name) {
		this.attachment.name = name;
	}

}

decorate(Attachment, {
	// props
	editing: observable,
	creating: observable,
	deleted: observable,
	attachment: observable,
	// actions
	load: action,
	markDeleted: action,
	setName: action
});

export class LinkAttachment extends Attachment {
	initLink(name, url, urn) {
		this.editing = true;
		this.creating = true;

		this.attachment = {
			id: this.href,
			name: name,
			url,
			urn,
		};
	}

	async save(entity) {
		await entity.addLinkAttachment(this.attachment.name, this.attachment.urn || this.attachment.url);
	}
}

decorate(LinkAttachment, {
	// actions
	initLink: action
});

export class GoogleDriveAttachment extends LinkAttachment {
	async save(entity) {
		await entity.addGoogleDriveLinkAttachment(this.attachment.name, this.attachment.url);
	}
}

export class OneDriveAttachment extends LinkAttachment {
	async save(entity) {
		await entity.addOneDriveLinkAttachment(this.attachment.name, this.attachment.url);
	}
}

export class FileAttachment extends Attachment {
	initFile(name, fileSystemType, fileId, previewUrl) {
		this.editing = true;
		this.creating = true;

		this.fileSystemType = fileSystemType;
		this.fileId = fileId;

		this.attachment = {
			id: this.href,
			name: name,
			// file preview URL
			url: previewUrl,
			type: 'Document'
		};
	}

	async save(entity) {
		await entity.addFileAttachment(this.fileSystemType, this.fileId);
	}
}

decorate(FileAttachment, {
	// actions
	initFile: action
});

export class VideoAttachment extends FileAttachment {
	async save(entity) {
		await entity.addVideoNoteAttachment(this.fileSystemType, this.fileId);
	}
}

export class AudioAttachment extends FileAttachment {
	async save(entity) {
		await entity.addAudioNoteAttachment(this.fileSystemType, this.fileId);
	}
}

