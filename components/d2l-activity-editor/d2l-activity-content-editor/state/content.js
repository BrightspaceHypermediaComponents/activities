import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { CONTENT_TYPES, ContentEntity } from 'siren-sdk/src/activities/content/ContentEntity.js';
import { fetchEntity } from '../../state/fetch-entity.js';
import { shared as moduleStore } from '../module/state/content-module-store.js';

configureMobx({ enforceActions: 'observed' });

export class Content {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.entityType = null;
		this.contentActivityHref = '';
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new ContentEntity(sirenEntity, this.token, { remove: () => { } });
			await this.load(entity);
		}
		return this;
	}

	async load(contentEntity) {
		this._entity = contentEntity;
		this.entityType = contentEntity.getEntityType();

		if (this.entityType === CONTENT_TYPES.module) {
			this.contentActivityHref = contentEntity.getModuleHref();
			moduleStore.fetchContentModuleActivity(this.contentActivityHref, this.token);
		} else if (this.entityType === CONTENT_TYPES.weblink) {
			this.contentActivityHref = contentEntity.getWebLinkHref();
			// TODO initialize weblink store
		}
	}
}
decorate(Content, {
	// props
	entityType: observable,
	contentActivityHref: observable,
	// actions
	load: action
});
