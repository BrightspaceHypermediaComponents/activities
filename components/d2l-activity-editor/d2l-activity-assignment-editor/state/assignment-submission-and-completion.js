import { action, computed, configure as configureMobx, decorate, observable } from 'mobx';

configureMobx({ enforceActions: 'observed' });

export class SubmissionAndCompletionProps {

	constructor(entity) {
		this.submissionTypeOptions = entity.submissionTypeOptions;
		this.submissionType = String(entity.submissionType);
		this.canEditSubmissionType = entity.canEditSubmissionType;
		this.canEditSubmissionsRule = entity.canEditSubmissionsRule;
		this.submissionsRule = entity.submissionsRule || 'keepall';
		this.submissionsRuleOptions = entity.submissionsRuleOptions;
		this.canEditFilesSubmissionLimit = entity.canEditFilesSubmissionLimit;
		this.filesSubmissionLimit = entity.filesSubmissionLimit || 'unlimited';
		this.assignmentHasSubmissions = entity.assignmentHasSubmissions;
		this.allCompletionTypeOptions = entity.allCompletionTypeOptions;
		this.canEditCompletionType = entity.canEditCompletionType;
		this.completionType = entity.completionType;

		const validCompletionTypes = this._getValidCompletionTypes(this.submissionType);
		if (this.canEditCompletionType) {
			this.completionTypeOptions =  this._getCompletionTypeOptions(validCompletionTypes);
		} else {
			const completionType = entity.completionType;
			this.completionTypeOptions = completionType ? [completionType] : [];
		}
	}

	setCompletionType(value) {
		this.completionType = value;
	}
	setFilesSubmissionLimit(value) {
		this.filesSubmissionLimit = value;
	}
	setSubmissionsRule(value) {
		this.submissionsRule = value;
	}
	setSubmissionType(value) {
		this.submissionType = value;

		this._setValidCompletionTypeForSubmissionType();
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
	_getCompletionTypeOptions(validCompletionTypes) {
		let completionTypeOptions = [];

		if (validCompletionTypes && validCompletionTypes.length > 0) {
			completionTypeOptions = this.allCompletionTypeOptions.filter(
				completionType => this._isCompletionTypeValid(completionType.value, validCompletionTypes)
			);
		}

		return completionTypeOptions;
	}

	_getValidCompletionTypes(currentSubmissionType) {
		const selectedSubmissionType = String(currentSubmissionType);

		const submissionType = this.submissionTypeOptions.find(
			submissionType => submissionType.value.toString() === selectedSubmissionType
		);

		if (!submissionType) {
			return [];
		}

		return submissionType.completionTypes;
	}

	_isCompletionTypeValid(completionTypeId, validCompletionTypes) {
		const completionType = String(completionTypeId);

		if (!validCompletionTypes) {
			return false;
		}

		return validCompletionTypes.some(validCompletionType => validCompletionType.toString() === completionType);
	}

	_setValidCompletionTypeForSubmissionType() {
		const validCompletionTypes = this._getValidCompletionTypes(this.submissionType);
		this.completionTypeOptions = this._getCompletionTypeOptions(validCompletionTypes);

		if (this.completionType === null ||
				!this._isCompletionTypeValid(this.completionType, validCompletionTypes)) {
			if (validCompletionTypes && validCompletionTypes.length > 0) {
				this.completionType = String(validCompletionTypes[0]);
			} else {
				this.completionType = null;
			}
		}
	}

}

decorate(SubmissionAndCompletionProps, {
	// props
	submissionTypeOptions: observable,
	submissionType: observable,
	canEditSubmissionType: observable,
	canEditSubmissionsRule: observable,
	submissionsRule: observable,
	submissionsRuleOptions: observable,
	canEditFilesSubmissionLimit: observable,
	filesSubmissionLimit: observable,
	setCompletionType: observable,
	// computed
	showFilesSubmissionLimit: computed,
	showSubmissionsRule: computed,
	// actions
	setSubmissionsRule: action,
	setFilesSubmissionLimit: action,
});
