import {  action, configure as configureMobx, decorate, observable } from 'mobx';

configureMobx({ enforceActions: 'observed' });

export class ActivityScoreGrade {

	constructor(entity) {
		this.scoreOutOf = entity.scoreOutOf().toString();
		this.scoreOutOfError = null;

		this.inGrades = entity.inGrades();
		this.gradeType = (entity.gradeType() || 'Points').toLowerCase();
		this.isUngraded = !this.inGrades && !this.scoreOutOf;
		this.canEditScoreOutOf = entity.canEditScoreOutOf();
		this.canSeeGrades = entity.canSeeGrades();
		this.canEditGrades = entity.canEditGrades();
		this.associatedGrade = null;
		this.gradeHref = entity.gradeHref();
		this.gradeCandidatesHref = entity.gradeCandidatesHref();
		this.associateNewGradeAction = null;
	}

	setScoreOutOf(value) {
		this.scoreOutOf = value;
		this.scoreOutOfError = null;
		this.validate();
	}

	setUngraded() {
		this.inGrades = false;
		this.isUngraded = true;
		this.associatedGrade = null;
		this.gradeHref = '';
		this.setScoreOutOf('');
	}

	setGraded() {
		this.inGrades = true;
		this.isUngraded = false;
	}

	removeFromGrades() {
		this.inGrades = false;
		this.associatedGrade = null;
		this.gradeHref = '';
		if (this.scoreOutOfError === 'emptyScoreOutOfError') {
			this.scoreOutOfError = null;
		}
	}

	addToGrades() {
		this.inGrades = true;
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

	setAssociatedGrade(gradeCandidate) {
		if (this.gradeHref && this.gradeHref === gradeCandidate.href) {
			return;
		}
		this.associatedGrade = gradeCandidate;
		this.gradeHref = gradeCandidate.href;
		this.setGraded();
		if (gradeCandidate.maxPoints !== undefined) {
			this.setScoreOutOf(gradeCandidate.maxPoints.toString());
		}
	}

	replaceGradeItem(associateNewGradeAction) {
		this.associateNewGradeAction = associateNewGradeAction;
		this.associatedGrade = null;
		this.gradeHref = '';
		this.inGrades = true;
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
	gradeHref: observable,
	associatedGrade: observable,
	associateNewGradeAction: observable,
	newGradeName: observable,
	// actions
	setScoreOutOf: action,
	setUngraded: action,
	setGraded: action,
	removeFromGrades: action,
	addToGrades: action,
	validate: action,
	setAssociatedGrade: action,
	replaceGradeItem: action,
	setNewGradeName: action
});
