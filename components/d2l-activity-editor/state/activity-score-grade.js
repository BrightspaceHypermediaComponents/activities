import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from './fetch-entity.js';
import { GradeCandidateCollection } from '../d2l-activity-grades/state/grade-candidate-collection.js';

configureMobx({ enforceActions: 'observed' });

export class ActivityScoreGrade {

	constructor(token) {
		this.token = token;
	}

	addToGrades() {
		this.inGrades = true;
	}

	async fetch(entity) {
		await entity.fetchLinkedScoreOutOfEntity(fetchEntity);
		this.scoreOutOf = entity.scoreOutOf() ? entity.scoreOutOf().toString() : '';
		this.scoreOutOfError = null;
		this.inGrades = entity.inGrades();
		this.gradeType = (entity.gradeType() || entity.numericGradeTypeTitle()).toLowerCase();
		this.isUngraded = !this.inGrades && !this.scoreOutOf;
		this.canEditScoreOutOf = entity.canEditScoreOutOf();
		this.canSeeGrades = entity.canSeeGrades();
		this.canEditGrades = entity.canEditGrades();
		this.gradeCandidatesHref = entity.gradeCandidatesHref();
		this.gradeCandidateCollection = null;
		this.createNewGrade = !entity.gradeHref();
		this.newGradeCandidatesHref = entity.newGradeCandidatesHref();
		this.newGradeCandidatesCollection = null;
	}

	async fetchGradeCandidates() {
		if (this.gradeCandidateCollection) {
			return;
		}

		this.gradeCandidateCollection = new GradeCandidateCollection(this.gradeCandidatesHref, this.token);
		await this.gradeCandidateCollection.fetch();
	}

	async fetchNewGradeCandidates() {
		if (this.newGradeCandidatesCollection) {
			return;
		}

		this.newGradeCandidatesCollection = new GradeCandidateCollection(this.newGradeCandidatesHref, this.token);
		await this.newGradeCandidatesCollection.fetch();
	}

	getAssociatedGradeEntity() {
		if (this.gradeCandidateCollection && this.gradeCandidateCollection.selected) {
			return this.gradeCandidateCollection.selected.gradeCandidateEntity;
		}
	}
	getAssociateNewGradeAction() {
		let newGradeCandidateEntity;
		if (this.newGradeCandidatesCollection && this.newGradeCandidatesCollection.selected) {
			newGradeCandidateEntity = this.newGradeCandidatesCollection.selected.gradeCandidateEntity;
		}

		if (!newGradeCandidateEntity) {
			return;
		}

		return newGradeCandidateEntity.getSaveAction();
	}
	linkToExistingGrade() {
		if (!this.gradeCandidateCollection) {
			return;
		}

		this.createNewGrade = false;
		this.setGraded();

		const gradeCandidate = this.gradeCandidateCollection.selected;
		if (gradeCandidate.maxPoints !== undefined) {
			this.setScoreOutOf(gradeCandidate.maxPoints.toString());
		}
	}
	linkToNewGrade() {
		this.createNewGrade = true;
		this.setGraded();
	}
	async primeGradeSave() {
		if (this.inGrades && this.createNewGrade) {
			await this.fetchNewGradeCandidates();
		}
	}
	removeFromGrades() {
		this.inGrades = false;
		if (this.scoreOutOfError === 'emptyScoreOutOfError') {
			this.scoreOutOfError = null;
		}
	}

	setGraded() {
		this.inGrades = true;
		this.isUngraded = false;
	}

	setNewGradeName(name) {
		this.newGradeName = name;
	}
	setScoreOutOf(value) {
		this.scoreOutOf = value;
		this.scoreOutOfError = null;
		this.validate();
	}

	setUngraded() {
		this.inGrades = false;
		this.isUngraded = true;
		this.setScoreOutOf('');
	}

	validate() {
		// This validation was hardcoded in the original UI implementation.
		// It might have been better to come up with a way to represent this in the Siren representation
		// to avoid duplicating business logic, but just copying the rules to the MobX state for now.
		if (this.inGrades && (this.scoreOutOf || '').trim().length === 0) {
			this.scoreOutOfError = 'emptyScoreOutOfError';
		}

		if (this.scoreOutOf && this.scoreOutOf.length !== 0 &&
			(isNaN(this.scoreOutOf) || this.scoreOutOf < 0.01 || this.scoreOutOf > 9999999999)) {
			this.scoreOutOfError = 'invalidScoreOutOfError';
		}
		return !this.scoreOutOfError;
	}

}

decorate(ActivityScoreGrade, {
	// props
	scoreOutOf: observable,
	scoreOutOfError: observable,
	inGrades: observable,
	gradeType: observable,
	isUngraded: observable,
	canEditScoreOutOf: observable,
	canSeeGrades: observable,
	canEditGrades: observable,
	gradeCandidatesHref: observable,
	gradeCandidateCollection: observable,
	newGradeName: observable,
	createNewGrade: observable,
	gradeCategoriesHref: observable,
	gradeCategoryCollection: observable,
	// actions
	setScoreOutOf: action,
	setUngraded: action,
	setGraded: action,
	removeFromGrades: action,
	addToGrades: action,
	validate: action,
	linkToExistingGrade: action,
	fetchGradeCandidates: action,
	fetchNewGradeCandidates: action,
	linkToNewGrade: action,
	setNewGradeName: action,
	primeGradeSave: action
});
