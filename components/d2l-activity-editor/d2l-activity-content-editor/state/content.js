import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { ContentEntity } from 'siren-sdk/src/activities/content/ContentEntity.js';
import { fetchEntity } from '../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class Content {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		// TODO - confrim what we want default value to be (null? "Undefined"?)
		this.title = 'default name value';
	}

	delete() {
		//  TODO
		return;
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

	async save() {
		// TODO
		return;
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
	setName: action,
	save: action,
	delete: action,
});
