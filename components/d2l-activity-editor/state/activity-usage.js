import { action, configure as configureMobx, decorate, observable, runInAction } from 'mobx';
import { ActivityDates } from './activity-dates.js';
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
			await this.load(entity);
		}
		return this;
	}

	async load(entity) {
		this._entity = entity;
		this.conditionsHref = entity.conditionsHref();
		this.isDraft = entity.isDraft();
		this.canEditDraft = entity.canEditDraft();
		this.isError = false;
		this.dates = new ActivityDates(entity);
		this.scoreAndGrade = new ActivityScoreGrade(entity, this.token);
		this.associationsHref = entity.getRubricAssociationsHref();
	}

	setDraftStatus(isDraft) {
		this.isDraft = isDraft;
	}

	setCanEditDraft(value) {
		this.canEditDraft = value;
	}

	setIsError(value) {
		this.isError = value;
	}

	setErrorLangTerms(errorType) {
		this.dates.setErrorLangTerms(errorType);
	}

	setScoreAndGrade(val) {
		this.scoreAndGrade = val;
	}

	setDates(val) {
		this.dates = val;
	}

	async validate() {
		if (!this._entity) {
			return;
		}

		this.isError = false;
		this.setErrorLangTerms();

		if (!this.scoreAndGrade.validate()) {
			this.isError = true;
		}

		await this._entity.validate({
			dates: {
				dueDate: this.dates.dueDate,
				startDate: this.dates.startDate,
				endDate: this.dates.endDate
			}
		}).catch(e => runInAction(() => {
			this.isError = true;
			if (e.json && e.json.properties && e.json.properties.type) {
				this.setErrorLangTerms(e.json.properties.type);
			}
		}));

		if (this.isError) {
			throw new Error('Activity Usage validation failed');
		}
	}

	_makeUsageData() {
		return {
			isDraft: this.isDraft,
			dates: {
				dueDate: this.dates.dueDate,
				startDate: this.dates.startDate,
				endDate: this.dates.endDate
			},
			scoreAndGrade: {
				scoreOutOf: this.scoreAndGrade.scoreOutOf,
				inGrades: this.scoreAndGrade.inGrades,
				associatedGrade: this.scoreAndGrade.createNewGrade ? null : this.scoreAndGrade.getAssociatedGradeEntity(),
				associateNewGradeAction: this.scoreAndGrade.getAssociateNewGradeAction(),
				newGradeName: this.scoreAndGrade.newGradeName
			}
		};
	}

	async save() {
		if (!this._entity) {
			return;
		}

		await this._entity.save(this._makeUsageData());

		await this.fetch();
	}

	get dirty() {
		return !this._entity.equals(this._makeUsageData());
	}
}

decorate(ActivityUsage, {
	// props
	dueDate: observable,
	conditionsHref: observable,
	isDraft: observable,
	canEditDraft: observable,
	isError: observable,
	scoreAndGrade: observable,
	dates: observable,
	associationsHref: observable,
	// actions
	load: action,
	setDraftStatus: action,
	setCanEditDraft: action,
	save: action,
	validate: action,
	setErrorLangTerms: action,
	setScoreAndGrade: action,
	setIsError: action,
	setDates: action
});
