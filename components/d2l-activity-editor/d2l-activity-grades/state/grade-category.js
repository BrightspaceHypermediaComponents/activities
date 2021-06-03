import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { GradeCategoryEntity } from 'siren-sdk/src/activities/associateGrade/GradeCategoryEntity.js';

configureMobx({ enforceActions: 'observed' });

export class GradeCategory {

	constructor(gradeCategoryLinkedEntity, token) {
		this.gradeCategoryLinkedEntity = gradeCategoryLinkedEntity;
		this.token = token;
	}

	async fetch() {
		const href = this.gradeCategoryLinkedEntity.href();
		let sirenEntity;
		if (href) {
			sirenEntity = await fetchEntity(href, this.token);
		}
		if (sirenEntity) {
			const entity = new GradeCategoryEntity(sirenEntity, this.token, { remove: () => { } });
			await this.load(entity);
		}
		return this;
	}

	async load(entity) {
		this.href = this.gradeCategoryLinkedEntity.href();
		this._entity = entity;
		this.name = entity.name();
	}
}

decorate(GradeCategory, {
	// props
	name: observable,
	// actions
	load: action
});
