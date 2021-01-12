import { ContentModule } from './content-module.js';
import { ObjectStore } from '../../../state/object-store.js';

export class ContentModuleStore {
	constructor() {
		this._contentModules = new ObjectStore(ContentModule);
	}

	clear() {
		this._contentModules.clear();
	}

	fetchContentModuleActivity(href, token) {
		return this._contentModules.fetch(href, token);
	}

	getContentModuleActivity(href) {
		return this._contentModules.get(href);
	}

	put(href, object) {
		this._contentModules.put(href, object);
	}
}

export const shared = new ContentModuleStore();
