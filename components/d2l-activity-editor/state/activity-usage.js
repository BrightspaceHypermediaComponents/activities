import { action, configure as configureMobx, decorate, observable } from 'mobx';
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
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.dueDate = entity.dueDate();
		this.startDate = entity.startDate();
		this.endDate = entity.endDate();
		this.canEditDates = entity.canEditDates();
		this.isDraft = entity.isDraft();
		this.canEditDraft = entity.canEditDraft();
	}

	setDueDate(date) {
		this.dueDate = date;
	}

	setStartDate(date) {
		this.startDate = date;
	}

	setEndDate(date) {
		this.endDate = date;
	}

	setDraftStatus(isDraft) {
		this.isDraft = isDraft;
	}

	setCanEditDraft(value) {
		this.canEditDraft = value;
	}

	setCanEditDates(value) {
		this.canEditDates = value;
	}

	async save() {
		if (!this._entity) {
			return;
		}

		await this._entity.save({
			dueDate: this.dueDate,
			startDate: this.startDate,
			endDate: this.endDate,
			isDraft: this.isDraft
		});

		await this.fetch();
	}
}

decorate(ActivityUsage, {
	// props
	dueDate: observable,
	startDate: observable,
	endDate: observable,
	canEditDates: observable,
	isDraft: observable,
	canEditDraft: observable,
	// actions
	load: action,
	setDueDate: action,
	setStartDate: action,
	setEndDate: action,
	setDraftStatus: action,
	setCanEditDraft: action,
	setCanEditDates: action,
	save: action
});
