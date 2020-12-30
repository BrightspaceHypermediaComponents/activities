import { ContentWebLink } from './content-web-link.js';
import { ObjectStore } from '../../../state/object-store.js';

export class ContentWebLinkStore {
	constructor() {
		this._contentWebLinks = new ObjectStore(ContentWebLink);
	}

	clear() {
		this._contentWebLinks.clear();
	}

	fetchContentWebLinkActivity(href, token) {
		return this._contentWebLinks.fetch(href, token);
	}

	getContentWebLinkActivity(href) {
		return this._contentWebLinks.get(href);
	}

	put(href, object) {
		this._contentWebLinks.put(href, object);
	}
}

export const shared = new ContentWebLinkStore();
