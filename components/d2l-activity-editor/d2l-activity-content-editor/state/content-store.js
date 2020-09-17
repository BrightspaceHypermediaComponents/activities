import { Content } from './content.js';
import { ObjectStore } from '../../state/object-store.js';

export class ContentStore {
	constructor() {
		this._contents = new ObjectStore(Content);
	}

	fetchContentActivity(href, token) {
		return this._contents.fetch(href, token);
	}

	getContentActivity(href) {
		return this._contents.get(href);
	}

	put(href, object) {
		this._contents.put(href, object);
	}
}

export const shared = new ContentStore();
