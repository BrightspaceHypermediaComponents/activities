import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { AssignmentActivityUsageEntity } from 'siren-sdk/src/activities/assignments/AssignmentActivityUsageEntity.js';
import { fetchEntity } from '../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class AssignmentActivityUsage {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.assignmentHref = '';
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new AssignmentActivityUsageEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.assignmentHref = entity.assignmentHref();
	}
}

decorate(AssignmentActivityUsage, {
	// props
	assignmentHref: observable,
	// actions
	load: action
});
