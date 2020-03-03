import { action, configure as configureMobx, decorate, observable, runInAction } from 'mobx';
import { ActivityScoreGrade } from './activity-score-grade.js';
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
		this.isError = false;
		this.errorType = null;
		this.dueDateErrorTerm = null;
		this.startDateErrorTerm = null;
		this.endDateErrorTerm = null;
		this.scoreAndGrade = new ActivityScoreGrade(entity);
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

	setIsError(value) {
		this.isError = value;
	}

	setErrorLangTerms(errorType) {
		if (errorType && errorType.includes('end-due-start-date-error')) {
			this.dueDateErrorTerm = 'dueBetweenStartEndDate';
			this.startDateErrorTerm = 'dueBetweenStartEndDate';
			this.endDateErrorTerm = 'dueBetweenStartEndDate';
			return;
		}

		if (errorType && errorType.includes('start-after-end-date-error')) {
			this.dueDateErrorTerm = 'dueAfterStartDate';
			this.startDateErrorTerm = 'dueAfterStartDate';
			this.endDateErrorTerm = 'startBeforeEndDate';
			return;
		}

		if (errorType && errorType.includes('start-after-due-date-error')) {
			this.dueDateErrorTerm = 'dueAfterStartDate';
			this.startDateErrorTerm = 'dueAfterStartDate';
			this.endDateErrorTerm = null;
			return;
		}

		if (errorType && errorType.includes('end-before-start-date-error')) {
			this.dueDateErrorTerm = 'dueBeforeEndDate';
			this.startDateErrorTerm = 'startBeforeEndDate';
			this.endDateErrorTerm = 'dueBeforeEndDate';
			return;
		}

		if (errorType && errorType.includes('end-before-due-date-error')) {
			this.dueDateErrorTerm = 'dueBeforeEndDate';
			this.startDateErrorTerm = null;
			this.endDateErrorTerm = 'dueBeforeEndDate';
			return;
		}

		this.dueDateErrorTerm = null;
		this.startDateErrorTerm = null;
		this.endDateErrorTerm = null;
	}

	setScoreAndGrade(val) {
		this.scoreAndGrade = val;
	}

	async validate() {
		if (!this._entity) {
			return;
		}

		this.isError = false;
		this.errorType = null;
		this.setErrorLangTerms();

		if (!this.scoreAndGrade.validate()) {
			this.isError = true;
		}

		await this._entity.validate({
			dueDate: this.dueDate,
			startDate: this.startDate,
			endDate: this.endDate
		}).catch(e => runInAction(() => {
			this.isError = true;
			if (e.json && e.json.properties && e.json.properties.type) {
				this.errorType = e.json.properties.type;
				this.setErrorLangTerms(this.errorType);
			}
		}));

		if (this.isError) {
			throw new Error('Activity Usage validation failed');
		}
	}

	async save() {
		if (!this._entity) {
			return;
		}

		await this._entity.save({
			dueDate: this.dueDate,
			startDate: this.startDate,
			endDate: this.endDate,
			isDraft: this.isDraft,
			scoreAndGrade: {
				scoreOutOf: this.scoreAndGrade.scoreOutOf,
				inGrades: this.scoreAndGrade.inGrades
			}
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
	isError: observable,
	errorType: observable,
	dueDateErrorTerm: observable,
	startDateErrorTerm: observable,
	endDateErrorTerm: observable,
	scoreAndGrade: observable,
	// actions
	load: action,
	setDueDate: action,
	setStartDate: action,
	setEndDate: action,
	setDraftStatus: action,
	setCanEditDraft: action,
	setCanEditDates: action,
	save: action,
	validate: action,
	setErrorLangTerms: action,
	setScoreAndGrade: action,
	setIsError: action
});
