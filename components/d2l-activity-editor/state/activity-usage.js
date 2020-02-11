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
			this.isDraft = entity.isDraft();
			this.canEditDraft = entity.canEditDraft();
		});
	}

	setDueDate(date) {
		this.dueDate = date;
	}

	setDraftStatus(isDraft) {
		this.isDraft = isDraft;
	}

	setCanEditDraft(value) {
		this.canEditDraft = value;
	}

	async save() {
		if (!this._entity) {
			return;
		}

		await this._entity.save({
			dueDate: this.dueDate,
			isDraft: this.isDraft
		});

		await this.fetch();
	}
}

decorate(ActivityUsage, {
	// props
	dueDate: observable,
	canEditDueDate: observable,
	isDraft: observable,
	canEditDraft: observable,
	// actions
	load: action,
	setDueDate: action,
	setDraftStatus: action,
	setCanEditDraft: action,
	save: action
});
