import { action, configure as configureMobx, decorate } from 'mobx';
import { AssociateGradeEntity } from 'siren-sdk/src/activities/associateGrade/AssociateGradeEntity.js';
import { fetchEntity } from './fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

/*export const GradebookStatus = {
	NotInGradebook: 'not-in-gradebook',
	NewGrade: 'new-grade',
	ExistingGrade: 'existing-grade'
};*/

export class AssociateGrade {
	constructor(href, token) {
		this.href = href;
		this.token = token;
	}

	async fetch(bypassCache) {
		const sirenEntity = await fetchEntity(this.href, this.token, bypassCache);
		if (sirenEntity) {
			const entity = new AssociateGradeEntity(sirenEntity, this.token, {
				remove: () => { },
			});
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
	}

	setGradebookStatus(newStatus) {
		this._entity.setGradebookStatus(newStatus);
	}
}

decorate(AssociateGrade, {
	// props
	// actions
	load: action,
	setGradebookStatus: action
});
