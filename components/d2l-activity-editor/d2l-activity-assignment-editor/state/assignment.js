import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { AssignmentSubmissionProps } from './assignment-submission.js';
import { fetchEntity } from '../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class Assignment {

	constructor(href, token) {
		this.href = href;
		this.token = token;
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new AssignmentEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}
		return this;
	}

	_getValidCompletionTypes(currentSubmissionType) {
		const selectedSubmissionType = String(currentSubmissionType);

		const submissionType = this.assignmentSubmissionProps.submissionTypeOptions.find(
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

	_getCompletionTypeOptions(validCompletionTypes) {
		let completionTypeOptions = [];

		if (validCompletionTypes && validCompletionTypes.length > 0) {
			completionTypeOptions = this.allCompletionTypeOptions.filter(
				completionType => this._isCompletionTypeValid(completionType.value, validCompletionTypes)
			);
		}

		return completionTypeOptions;
	}

	_setValidCompletionTypeForSubmissionType() {
		const validCompletionTypes = this._getValidCompletionTypes(this.assignmentSubmissionProps.submissionType);
		this.completionTypeOptions = this._getCompletionTypeOptions(validCompletionTypes);

		if (this.completionType === null || !this._isCompletionTypeValid(this.completionType, validCompletionTypes)) {
			if (validCompletionTypes && validCompletionTypes.length > 0) {
				this.completionType = String(validCompletionTypes[0]);
			} else {
				this.completionType = null;
			}
		}
	}

	load(entity) {
		this._entity = entity;
		this.assignmentSubmissionProps = new AssignmentSubmissionProps({
			submissionTypeOptions: entity.submissionTypeOptions(),
			submissionType: entity.submissionType().value,
			canEditSubmissionType: entity.canEditSubmissionType(),
			canEditSubmissionsRule: entity.canEditSubmissionsRule(),
			submissionsRule: entity.submissionsRule(),
			submissionsRuleOptions: entity.getSubmissionsRuleOptions(),
			canEditFilesSubmissionLimit: entity.canEditFilesSubmissionLimit(),
			filesSubmissionLimit: entity.filesSubmissionLimit(),
			assignmentHasSubmissions: entity.assignmentHasSubmissions()
		});

		this.name = entity.name();
		this.canEditName = entity.canEditName();
		this.instructions = entity.instructionsEditorHtml();
		this.canEditInstructions = entity.canEditInstructions();
		this.instructionsRichTextEditorConfig = entity.instructionsRichTextEditorConfig();
		this.isAnonymousMarkingAvailable = entity.isAnonymousMarkingAvailable();
		this.isAnonymousMarkingEnabled = entity.isAnonymousMarkingEnabled();
		this.canEditAnonymousMarking = entity.canEditAnonymousMarking();
		this.anonymousMarkingHelpText = entity.getAnonymousMarkingHelpText();
		this.canSeeAnnotations = entity.canSeeAnnotations();
		this.annotationToolsAvailable = entity.getAvailableAnnotationTools();
		this.activityUsageHref = entity.activityUsageHref();
		this.canEditTurnitin = entity.canEditTurnitin();
		this.editTurnitinUrl = entity.editTurnitinUrl();
		this.isOriginalityCheckEnabled = entity.isOriginalityCheckEnabled();
		this.isGradeMarkEnabled = entity.isGradeMarkEnabled();
		this.allCompletionTypeOptions = entity.allCompletionTypeOptions();
		this.canEditCompletionType = entity.canEditCompletionType();
		this.completionType = entity.completionTypeValue();
		this.isGroupAssignmentTypeDisabled = entity.isGroupAssignmentTypeDisabled();
		this.isIndividualAssignmentType = entity.isIndividualAssignmentType();
		this.groupCategories = entity.getAssignmentTypeGroupCategoryOptions();
		this.isReadOnly = entity.isAssignmentTypeReadOnly();
		this.selectedGroupCategoryName = entity.getAssignmentTypeSelectedGroupCategoryName();

		const validCompletionTypes = this._getValidCompletionTypes(this.assignmentSubmissionProps.submissionType);
		if (entity.canEditCompletionType()) {
			this.completionTypeOptions =  this._getCompletionTypeOptions(validCompletionTypes);
		} else {
			const completionType = entity.completionType();
			this.completionTypeOptions = completionType ? [completionType] : [];
		}

		if (!this.isIndividualAssignmentType && this.groupCategories.length > 0) {
			this.selectedGroupCategoryId = String(this.groupCategories[0].value);
			const category = this.groupCategories.find(category => category.selected === true);

			if (category) {
				this.selectedGroupCategoryId = String(category.value);
			}
		}
	}

	setSubmissionType(value) {
		this.assignmentSubmissionProps.setSubmissionType(value);
		this._setValidCompletionTypeForSubmissionType();
	}

	setFilesSubmissionLimit(value) {
		this.assignmentSubmissionProps.setFilesSubmissionLimit(value);
	}

	setSubmissionsRule(value) {
		this.assignmentSubmissionProps.setSubmissionsRule(value);
	}

	setTurnitin(isOriginalityCheckEnabled, isGradeMarkEnabled) {
		this.isOriginalityCheckEnabled = isOriginalityCheckEnabled;
		this.isGradeMarkEnabled = isGradeMarkEnabled;
	}

	setCompletionType(value) {
		this.completionType = value;
	}

	setToIndividualAssignmentType() {
		this.isIndividualAssignmentType = true;
	}

	setToGroupAssignmentType() {
		this.isIndividualAssignmentType = false;
		this.selectedGroupCategoryId =
			this.selectedGroupCategoryId
				? String(this.selectedGroupCategoryId)
				: String(this.groupCategories[0].value);
	}

	setAssignmentTypeGroupCategory(value) {
		this.selectedGroupCategoryId = value;
	}

	setAnonymousMarking(value) {
		this.isAnonymousMarkingEnabled = value;
	}

	setAnnotationToolsAvailable(value) {
		this.annotationToolsAvailable = value;
	}

	setName(value) {
		this.name = value;
	}

	setInstructions(value) {
		this.instructions = value;
	}

	setAssignmentSubmissionType(assignmentSubmissionProps) {
		this.assignmentSubmissionProps = new AssignmentSubmissionProps(assignmentSubmissionProps);
	}

	_makeAssignmentData() {
		/* NOTE: if you add fields here, please make sure you update the corresponding equals method in siren-sdk.
		 		 The cancel workflow is making use of that to detect changes.
		*/
		const data = {
			name: this.name,
			instructions: this.instructions,
			isAnonymous: this.isAnonymousMarkingEnabled,
			annotationToolsAvailable: this.annotationToolsAvailable,
			submissionType: this.assignmentSubmissionProps.submissionType,
			isIndividualAssignmentType: this.isIndividualAssignmentType,
			groupTypeId: this.selectedGroupCategoryId
		};
		if (this.canEditCompletionType) {
			data.completionType = this.completionType;
		}
		if (this.assignmentSubmissionProps.showFilesSubmissionLimit) {
			data.filesSubmissionLimit = this.assignmentSubmissionProps.filesSubmissionLimit;
		}
		if (this.assignmentSubmissionProps.showSubmissionsRule) {
			data.submissionsRule = this.assignmentSubmissionProps.submissionsRule;
		}
		return data;
	}
	async save() {
		if (!this._entity) {
			return;
		}
		await this._entity.save(this._makeAssignmentData());
		await this.fetch();
	}

	get dirty() {
		return !this._entity.equals(this._makeAssignmentData());
	}

	delete() {
		return this._entity.delete();
	}
}

decorate(Assignment, {
	// props
	assignmentSubmissionProps: observable,
	name: observable,
	canEditName: observable,
	instructions: observable,
	canEditInstructions: observable,
	instructionsRichTextEditorConfig: observable,
	isAnonymousMarkingAvailable: observable,
	isAnonymousMarkingEnabled: observable,
	canEditAnonymousMarking: observable,
	anonymousMarkingHelpText: observable,
	canSeeAnnotations: observable,
	annotationToolsAvailable: observable,
	activityUsageHref: observable,
	completionTypeOptions: observable,
	canEditCompletionType: observable,
	canEditTurnitin: observable,
	editTurnitinUrl: observable,
	isOriginalityCheckEnabled: observable,
	isGradeMarkEnabled: observable,
	completionType: observable,
	isIndividualAssignmentType: observable,
	groupCategories: observable,
	selectedGroupCategoryId: observable,
	isGroupAssignmentTypeDisabled: observable,
	isReadOnly: observable,
	selectedGroupCategoryName: observable,
	// actions
	load: action,
	setName: action,
	setInstructions: action,
	setAnonymousMarking: action,
	setAnnotationToolsAvailable: action,
	setSubmissionType: action,
	setTurnitin: action,
	setCompletionType: action,
	save: action,
	setToIndividualAssignmentType: action,
	setToGroupAssignmentType: action,
	setAssignmentTypeGroupCategory: action,
	setAssignmentSubmissionType: action
});
