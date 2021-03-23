import { action, configure as configureMobx, decorate, observable, runInAction } from 'mobx';
import { ActivityDates } from './activity-dates.js';
import { ActivityScoreGrade } from './activity-score-grade.js';
import { ActivitySpecialAccess } from './activity-special-access.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';
import { AlignmentsHierarchicalEntity } from 'siren-sdk/src/alignments/AlignmentsHierarchicalEntity.js';
import { CompetenciesEntity } from 'siren-sdk/src/competencies/CompetenciesEntity.js';
import { fetchEntity } from '../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class ActivityUsage {

	constructor(href, token) {
		this.href = href;
		this.token = token;
	}

	async dirty() {
		return !this._entity.equals(this._makeUsageData());
	}
	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new ActivityUsageEntity(sirenEntity, this.token, { remove: () => { } });
			await this.load(entity);
		}
		return this;
	}
	async fetchScoreAndGradeScoreOutOf(bypassCache) {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new ActivityUsageEntity(sirenEntity, this.token, { remove: () => { } });
			await this.scoreAndGrade.fetchUpdatedScoreOutOf(entity, bypassCache);
		}
	}

	async load(entity) {
		this._entity = entity;
		this.conditionsHref = entity.conditionsHref();
		this.canEditReleaseConditions = entity.canEditReleaseConditions();
		this.isDraft = entity.isDraft();
		this.canEditDraft = entity.canEditDraft();
		this.isError = false;
		this.dates = new ActivityDates(entity);
		this.scoreAndGrade = new ActivityScoreGrade(this.token);
		this.associationsHref = entity.getDirectRubricAssociationsHref();
		this.specializationHref = entity.specializationHref();

		await Promise.all([
			this._loadSpecialAccess(entity),
			this._loadCompetencyOutcomes(entity),
			this.scoreAndGrade.fetch(entity, false)
		]);
	}

	async loadCompetencies(bypassCache) {
		if (!this.competenciesHref) {
			return;
		}

		const sirenEntity = await fetchEntity(this.competenciesHref, this.token, bypassCache);

		runInAction(() => {
			const entity = new CompetenciesEntity(sirenEntity);
			this.competenciesDialogUrl = entity.dialogUrl();
			this.canEditCompetencies = !!this.competenciesDialogUrl;
			this.associatedCompetenciesCount = entity.associatedCount() || 0;
			this.unevaluatedCompetenciesCount = entity.unevaluatedCount() || 0;
		});
	}
	async save() {
		if (!this._entity) {
			return;
		}

		await this.scoreAndGrade.primeGradeSave();

		await this._entity.save(this._makeUsageData());

		await this.fetch();
	}
	setAlignmentsHref(value) {
		this.alignmentsHref = value;
	}
	setCanEditDraft(value) {
		this.canEditDraft = value;
	}
	setCanUpdateAlignments(value) {
		this.canUpdateAlignments = value;
	}
	setDates(val) {
		this.dates = val;
	}
	setDraftStatus(isDraft) {
		this.isDraft = isDraft;
	}
	setErrorLangTerms(errorType) {
		this.dates.setErrorLangTerms(errorType);
	}
	setIsError(value) {
		this.isError = value;
	}
	setScoreAndGrade(val) {
		this.scoreAndGrade = val;
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
	async _loadCompetencyOutcomes(entity) {
		/**
		 * Legacy Competencies
		 * Href will be available if competencies tool is enabled and outcomes tool is disabled or there are no intents in the course.
		*/
		this.competenciesHref = entity.competenciesHref();
		this.associatedCompetenciesCount = null;
		this.unevaluatedCompetenciesCount = null;
		this.competenciesDialogUrl = null;
		this.canEditCompetencies = false;

		/**
		 * Learning Outcomes
		 * Href will be available if outcomes tool is enabled.
		*/
		this.alignmentsHref = this.competenciesHref ? null : entity.alignmentsHierarchicalHref();
		this.canUpdateAlignments = false;

		if (this.competenciesHref) {
			await this.loadCompetencies();
		} else if (this.alignmentsHref) {
			await this._loadOutcomes();
		}
	}

	async _loadOutcomes() {
		const alignmentsEntity = await fetchEntity(this.alignmentsHref, this.token);

		runInAction(() => {
			const alignmentsHierarchical = new AlignmentsHierarchicalEntity(alignmentsEntity);
			this.canUpdateAlignments = alignmentsHierarchical.canUpdateAlignments();
		});
	}
	async _loadSpecialAccess(entity) {
		const specialAccessHref = entity.specialAccessHref();
		let specialAccess = null;

		if (specialAccessHref) {
			specialAccess = new ActivitySpecialAccess(specialAccessHref, this.token);
			await specialAccess.fetch();
		}

		runInAction(() => this.specialAccess = specialAccess);
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

}

decorate(ActivityUsage, {
	// props
	dueDate: observable,
	conditionsHref: observable,
	canEditReleaseConditions: observable,
	isDraft: observable,
	canEditDraft: observable,
	isError: observable,
	scoreAndGrade: observable,
	dates: observable,
	associationsHref: observable,
	alignmentsHref: observable,
	specializationHref: observable,
	canUpdateAlignments: observable,
	competenciesHref: observable,
	associatedCompetenciesCount: observable,
	unevaluatedCompetenciesCount: observable,
	canEditCompetencies: observable,
	competenciesDialogUrl: observable,
	specialAccess: observable,
	// actions
	load: action,
	setDraftStatus: action,
	setCanEditDraft: action,
	save: action,
	validate: action,
	setErrorLangTerms: action,
	setScoreAndGrade: action,
	setIsError: action,
	setDates: action,
	setAlignmentsHref: action,
	setCanUpdateAlignments: action,
	loadCompetencies: action
});
