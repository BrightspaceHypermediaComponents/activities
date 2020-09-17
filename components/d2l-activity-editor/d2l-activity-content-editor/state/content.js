import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { ContentEntity } from 'siren-sdk/src/activities/content/ContentEntity.js';
import { fetchEntity } from '../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class Content {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.title = '';
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new ContentEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.title = entity.title();
	}

	setTitle(value) {
		this.title = value;
	}

}

decorate(Content, {
	// props
	title: observable,
	// actions
	load: action,
	setTitle: action,
});
