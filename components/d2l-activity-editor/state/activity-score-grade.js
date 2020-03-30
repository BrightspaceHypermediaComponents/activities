import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { GradeCandidateCollection } from '../d2l-activity-grades/state/grade-candidate-collection.js';

configureMobx({ enforceActions: 'observed' });

export class ActivityScoreGrade {

	constructor(entity, token) {
		this.scoreOutOf = entity.scoreOutOf().toString();
		this.scoreOutOfError = null;
		this.token = token;
		this.inGrades = entity.inGrades();
		this.gradeType = (entity.gradeType() || 'Points').toLowerCase();
		this.isUngraded = !this.inGrades && !this.scoreOutOf;
		this.canEditScoreOutOf = entity.canEditScoreOutOf();
		this.canSeeGrades = entity.canSeeGrades();
		this.canEditGrades = entity.canEditGrades();
		this.gradeCandidatesHref = entity.gradeCandidatesHref();
		this.gradeCandidateCollection = null;
		this.createNewGrade = !entity.gradeHref();
	}

	async fetchGradeCandidates() {
		if (this.gradeCandidateCollection) {
			return;
		}

		this.gradeCandidateCollection = new GradeCandidateCollection(this.gradeCandidatesHref, this.token);
		await this.gradeCandidateCollection.fetch();
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

	setGraded() {
		this.inGrades = true;
		this.isUngraded = false;
	}

	removeFromGrades() {
		this.inGrades = false;
		if (this.scoreOutOfError === 'emptyScoreOutOfError') {
			this.scoreOutOfError = null;
		}
	}

	addToGrades() {
		this.inGrades = true;
	}

	getAssociatedGradeEntity() {
		if (this.gradeCandidateCollection && this.gradeCandidateCollection.selected) {
			return this.gradeCandidateCollection.selected.gradeCandidateEntity;
		}
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

	setNewGradeName(name) {
		this.newGradeName = name;
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
	// actions
	setScoreOutOf: action,
	setUngraded: action,
	setGraded: action,
	removeFromGrades: action,
	addToGrades: action,
	validate: action,
	linkToExistingGrade: action,
	fetchGradeCandidates: action,
	linkToNewGrade: action,
	setNewGradeName: action
});
