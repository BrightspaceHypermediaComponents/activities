import { AttachmentCollection } from './attachment-collection.js';
import { shared as attachmentStore } from './attachment-store.js';
import { ObjectStore } from '../../state/object-store.js';

export class AttachmentCollectionsStore extends ObjectStore {
	constructor() {
		super(AttachmentCollection);
	}

	getAttachmentStore() {
		return this._attachmentStore;
	}
	setAttachmentStore(attachmentStore) {
		this._attachmentStore = attachmentStore;
	}

}

export const shared = new AttachmentCollectionsStore();

shared.setAttachmentStore(attachmentStore);
