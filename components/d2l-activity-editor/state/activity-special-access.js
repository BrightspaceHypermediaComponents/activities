import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { ActivitySpecialAccessEntity } from 'siren-sdk/src/activities/ActivitySpecialAccessEntity.js';
import { fetchEntity } from './fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class ActivitySpecialAccess {

	constructor(href, token) {
		this.href = href;
		this.token = token;
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new ActivitySpecialAccessEntity(sirenEntity, this.token, { remove: () => { } });
			await this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.isRestricted = entity.isRestricted();
		this.userCount = entity.userCount();
		this.url = entity.url();
	}
}

decorate(ActivitySpecialAccess, {
	// props
	isRestricted: observable,
	userCount: observable,
	url: observable,
	// actions
	load: action
});
