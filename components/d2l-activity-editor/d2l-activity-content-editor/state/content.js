import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { fetchEntity } from '../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class Content {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.name = null;
	}

	delete() {
		//  TODO
		return;
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			// TODO - set up ContentEntity in https://github.com/BrightspaceHypermediaComponents/siren-sdk
			const entity = new AssignmentEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.name = entity.name();
	}

	async save() {
		// TODO
		return;
	}

	setName(value) {
		this.name = value;
	}

}

decorate(Content, {
	// props
	name: observable,
	// actions
	load: action,
	setName: action,
	save: action,
	delete: action,
});
