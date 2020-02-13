import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { AttachmentEntity } from 'siren-sdk/src/activities/AttachmentEntity.js';
import { fetchEntity } from '../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class Attachment {
	constructor(href, token) {
		this.href = href;
		this.token = token;
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new AttachmentEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;

		this.editing = entity.canDeleteAttachment();
		this.creating = false;
		this.deleted = false;

		this.attachment = {
			id: entity.self(),
			name: entity.name(),
			url: entity.href()
		};
	}
}

decorate(Attachment, {
	// props
	editing: observable,
	creating: observable,
	deleted: observable,
	attachment: observable,
	// actions
	load: action
});
