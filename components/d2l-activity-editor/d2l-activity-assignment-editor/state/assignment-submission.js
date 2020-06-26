import { configure as configureMobx, decorate, observable } from 'mobx';

configureMobx({ enforceActions: 'observed' });

export class AssignmentSubmissionType {

	constructor(entity, token) {
		this.token = token;
		this.options = entity.submissionTypeOptions;
		this.value = String(entity.submissionType);
		this.canEdit = entity.canEditSubmissionType;
	}
}

decorate(AssignmentSubmissionType, {
	// props
	options: observable,
	value: observable,
	canEdit: observable
	// actions
});
