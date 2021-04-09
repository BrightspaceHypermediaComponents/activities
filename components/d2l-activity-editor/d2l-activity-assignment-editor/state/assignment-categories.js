import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { CategoriesEntity } from 'siren-sdk/src/activities/CategoriesEntity.js';
import { fetchEntity } from '../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class AssignmentCategories {

	constructor(href, token) {
		this.href = href;
		this.token = token;
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new CategoriesEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.categories = entity.getCategories();
	}
}

decorate(AssignmentCategories, {
	// props
	categories: observable,
	// actions
	load: action
});
