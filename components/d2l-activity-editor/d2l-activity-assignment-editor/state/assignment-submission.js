import {action, configure as configureMobx, decorate, observable } from 'mobx';

configureMobx({ enforceActions: 'observed' });

export class AssignmentSubmissionType {

	constructor(entity, token) {
		this.token = token;
		this.options = entity.submissionTypeOptions;
		this.value = String(entity.submissionType);
		this.canEditSubmissionType = entity.canEditSubmissionType;
		this.canEditSubmissionsRule = entity.canEditSubmissionsRule;
		this.submissionsRule = entity.submissionsRule || 'keepall';
		this.submissionsRuleOptions = entity.submissionsRuleOptions;
	}

	setSubmissionType(value) {
		this.value = value;
	}

	setSubmissionsRule(value) {
		this.submissionsRule = value;
	}
}

decorate(AssignmentSubmissionType, {
	// props
	options: observable,
	value: observable,
	canEditSubmissionType: observable,
	canEditSubmissionsRule: observable,
	submissionsRule: observable,
	submissionsRuleOptions: observable,
	// actions
	setSubmissionsRule: action
});
