import { action, configure as configureMobx, decorate, observable } from 'mobx';

configureMobx({ enforceActions: 'observed' });

export class ActivityDates {

	constructor(entity) {
		this.dueDate = entity.dueDate();
		this.startDate = entity.startDate();
		this.endDate = entity.endDate();
		this.canEditDates = entity.canEditDates();
		this.dueDateErrorTerm = null;
		this.startDateErrorTerm = null;
		this.endDateErrorTerm = null;
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

	setCanEditDates(value) {
		this.canEditDates = value;
	}

	setErrorLangTerms(errorType) {
		if (errorType && errorType.includes('end-due-start-date-error')) {
			this.dueDateErrorTerm = 'dueBetweenStartEndDate';
			this.startDateErrorTerm = 'dueBetweenStartEndDate';
			this.endDateErrorTerm = 'dueBetweenStartEndDate';
			return;
		}

		if (errorType && errorType.includes('start-after-due-end-date-error')) {
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

		if (errorType && errorType.includes('end-before-start-due-date-error')) {
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

		if (errorType && errorType.includes('end-before-start-date-error')) {
			this.dueDateErrorTerm = null;
			this.startDateErrorTerm = 'startBeforeEndDate';
			this.endDateErrorTerm = 'startBeforeEndDate';
			return;
		}

		this.dueDateErrorTerm = null;
		this.startDateErrorTerm = null;
		this.endDateErrorTerm = null;
	}
}

decorate(ActivityDates, {
	// props
	dueDate: observable,
	startDate: observable,
	endDate: observable,
	canEditDates: observable,
	dueDateErrorTerm: observable,
	startDateErrorTerm: observable,
	endDateErrorTerm: observable,
	// actions
	setDueDate: action,
	setStartDate: action,
	setEndDate: action,
	setCanEditDates: action,
	setErrorLangTerms: action
});
