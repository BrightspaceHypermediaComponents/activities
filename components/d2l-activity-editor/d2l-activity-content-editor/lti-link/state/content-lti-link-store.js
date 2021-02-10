import { ContentLTILink } from './content-lti-link.js';
import { ObjectStore } from '../../../state/object-store.js';

export class ContentLTILinkStore {
	constructor() {
		this._contentLTILinks = new ObjectStore(ContentLTILink);
	}

	clear() {
		this._contentLTILinks.clear();
	}

	fetchContentLTILinkActivity(href, token) {
		return this._contentLTILinks.fetch(href, token);
	}

	getContentLTILinkActivity(href) {
		return this._contentLTILinks.get(href);
	}

	put(href, object) {
		this._contentLTILinks.put(href, object);
	}
}

export const shared = new ContentLTILinkStore();
