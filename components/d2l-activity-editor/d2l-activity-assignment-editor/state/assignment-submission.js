import {action, computed, configure as configureMobx, decorate, observable } from 'mobx';

configureMobx({ enforceActions: 'observed' });

export class AssignmentSubmissionProps {

	constructor(entity, token) {
		this.token = token;
		this.submissionTypeOptions = entity.submissionTypeOptions;
		this.submissionType = String(entity.submissionType);
		this.canEditSubmissionType = entity.canEditSubmissionType;
		this.canEditSubmissionsRule = entity.canEditSubmissionsRule;
		this.submissionsRule = entity.submissionsRule || 'keepall';
		this.submissionsRuleOptions = entity.submissionsRuleOptions;
		this.canEditFilesSubmissionLimit = entity.canEditFilesSubmissionLimit;
		this.filesSubmissionLimit = entity.filesSubmissionLimit || 'unlimited';
		this.assignmentHasSubmissions = entity.assignmentHasSubmissions;
	}

	setSubmissionType(value) {
		this.submissionType = value;
	}

	setSubmissionsRule(value) {
		this.submissionsRule = value;
	}

	setFilesSubmissionLimit(value) {
		this.filesSubmissionLimit = value;
	}

	get showFilesSubmissionLimit() {
		return this.submissionTypeOptions
			.find(x => String(x.value) === '0' && `${x.value}` === `${this.submissionType}`);
	}

	get showSubmissionsRule() {
		const isFileSubmission = this.submissionTypeOptions
			.find(x => String(x.value) === '0' && `${x.value}` === `${this.submissionType}`);
		const isTextSubmission = this.submissionTypeOptions
			.find(x => String(x.value) === '1' && `${x.value}` === `${this.submissionType}`);

		return isFileSubmission || isTextSubmission;
	}
}

decorate(AssignmentSubmissionProps, {
	// props
	submissionTypeOptions: observable,
	submissionType: observable,
	canEditSubmissionType: observable,
	canEditSubmissionsRule: observable,
	submissionsRule: observable,
	submissionsRuleOptions: observable,
	canEditFilesSubmissionLimit: observable,
	filesSubmissionLimit:observable,
	// computed
	showFilesSubmissionLimit: computed,
	showSubmissionsRule: computed,
	// actions
	setSubmissionsRule: action,
	setFilesSubmissionLimit: action,
});
