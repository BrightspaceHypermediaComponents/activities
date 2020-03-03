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
	// actions
	setScoreOutOf: action,
	setUngraded: action,
	setGraded: action,
	removeFromGrades: action,
	addToGrades: action,
	validate: action
});
