import { action, configure as configureMobx, decorate, observable, runInAction } from 'mobx';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';
import { fetchEntity } from '../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class ActivityUsage {

	constructor(href, token) {
		this.href = href;
		this.token = token;
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new ActivityUsageEntity(sirenEntity, this.token, { remove: () => { } });
			await this.load(entity);
		}
		return this;
	}

	async load(entity) {
		this._entity = entity;

		const canEditDueDate = await entity.canEditDueDate();

		runInAction(() => {
			this.dueDate = entity.dueDate();
			this.canEditDueDate = canEditDueDate;
		});
	}

	setDueDate(date) {
		this.dueDate = date;
	}

	async save() {
		if (!this._entity) {
			return;
		}

		// TODO - replace with aggregate save method
		// await this._entity.save({
		// 	dueDate: this.dueDate
		// });

		await this._entity.setDueDate(this.dueDate);
		await this.fetch();
	}
}

decorate(ActivityUsage, {
	// props
	dueDate: observable,
	canEditDueDate: observable,
	// actions
	load: action,
	setDueDate: action,
	save: action
});
