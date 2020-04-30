import { Attachment, AudioAttachment, FileAttachment, GoogleDriveAttachment, LinkAttachment, OneDriveAttachment, VideoAttachment } from './attachment.js';

import { ObjectStore } from '../../state/object-store.js';

let newAttachmentId = 0;
function nextTempId() {
	return `//temp/attachment/${newAttachmentId++}`;
}

export class AttachmentStore extends ObjectStore {
	constructor() {
		super(Attachment);
	}

	_createLink(Type, name, url) {
		const tempId = nextTempId();
		const link = new Type(tempId);
		link.initLink(name, url);
		this.put(tempId, link);
		return link;
	}

	createLink(name, url) {
		return this._createLink(LinkAttachment, name, url);
	}

	createGoogleDriveLink(name, url) {
		return this._createLink(GoogleDriveAttachment, name, url);
	}

	createOneDriveLink(name, url) {
		return this._createLink(OneDriveAttachment, name, url);
	}

	_createFile(Type, name, fileSystemType, fileId, previewUrl) {
		const tempId = nextTempId();
		const file = new Type(tempId);
		file.initFile(name, fileSystemType, fileId, previewUrl);
		this.put(tempId, file);
		return file;
	}

	createFile(name, fileSystemType, fileId, previewUrl) {
		return this._createFile(FileAttachment, name, fileSystemType, fileId, previewUrl);
	}

	createAudio(name, fileSystemType, fileId, previewUrl) {
		return this._createFile(AudioAttachment, name, fileSystemType, fileId, previewUrl);
	}

	createVideo(name, fileSystemType, fileId, previewUrl) {
		return this._createFile(VideoAttachment, name, fileSystemType, fileId, previewUrl);
	}
}

export const shared = new AttachmentStore();
