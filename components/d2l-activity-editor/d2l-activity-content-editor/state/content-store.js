import { Content } from './content.js';
import { ObjectStore } from '../../state/object-store.js';

export class ContentStore {
	constructor() {
		this._contents = new ObjectStore(Content);
	}

	fetchContent(href, token) {
		return this._contents.fetch(href, token);
	}

	getContent(href) {
		return this._contents.get(href);
	}

	put(href, object) {
		this._contents.put(href, object);
	}
}

export const shared = new ContentStore();
export const { _contents: contents } = shared;
