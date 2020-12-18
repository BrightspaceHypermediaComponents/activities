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

	createAudio(name, fileSystemType, fileId, previewUrl) {
		return this._createFile(AudioAttachment, name, fileSystemType, fileId, previewUrl);
	}
	createFile(name, fileSystemType, fileId, previewUrl) {
		return this._createFile(FileAttachment, name, fileSystemType, fileId, previewUrl);
	}
	createGoogleDriveLink(name, url) {
		return this._createLink(GoogleDriveAttachment, name, url);
	}
	createLink(name, url, urn) {
		return this._createLink(LinkAttachment, name, url, urn);
	}
	createOneDriveLink(name, url) {
		return this._createLink(OneDriveAttachment, name, url);
	}
	createVideo(name, fileSystemType, fileId, previewUrl) {
		return this._createFile(VideoAttachment, name, fileSystemType, fileId, previewUrl);
	}
	_createFile(Type, name, fileSystemType, fileId, previewUrl) {
		const tempId = nextTempId();
		const file = new Type(tempId);
		file.initFile(name, fileSystemType, fileId, previewUrl);
		this.put(tempId, file);
		return file;
	}
	_createLink(Type, name, url, urn) {
		const tempId = nextTempId();
		const link = new Type(tempId);
		link.initLink(name, url, urn);
		this.put(tempId, link);
		return link;
	}

}

export const shared = new AttachmentStore();
