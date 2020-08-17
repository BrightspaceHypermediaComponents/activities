import { action, computed, configure as configureMobx, decorate, observable } from 'mobx';
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

	_isSubmissionTypeWithAnonMarking() {
		// only file (0) and text (1) submissions can have anonymous marking, see https://docs.valence.desire2learn.com/res/dropbox.html#attributes
		return ['0', '1'].includes(this.submissionType);
	}

	_getIsAnonymousMarkingAvailable() {
		return this._entity.isAnonymousMarkingAvailable() && this._isSubmissionTypeWithAnonMarking();
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
		this.instructions = entity.canEditInstructions() ? entity.instructionsEditorHtml() : entity.instructionsHtml();
		this.canEditInstructions = entity.canEditInstructions();
		this.instructionsRichTextEditorConfig = entity.instructionsRichTextEditorConfig();
		this.anonymousMarkingHelpText = entity.getAnonymousMarkingHelpText();
		this.canEditAnnotations = entity.canEditAnnotations();
		this.annotationToolsAvailable = entity.getAvailableAnnotationTools();
		this.activityUsageHref = entity.activityUsageHref();
		this.canEditTurnitin = entity.canEditTurnitin();
		this.editTurnitinUrl = entity.editTurnitinUrl();
		this.isOriginalityCheckEnabled = entity.isOriginalityCheckEnabled();
		this.isGradeMarkEnabled = entity.isGradeMarkEnabled();
		this.canEditDefaultScoringRubric = entity.canEditDefaultScoringRubric();
		this.defaultScoringRubricId = String(entity.getDefaultScoringRubric()) || '-1';
		this.allCompletionTypeOptions = entity.allCompletionTypeOptions();
		this.canEditCompletionType = entity.canEditCompletionType();
		this.completionType = entity.completionTypeValue();

		// set up anonymous marking _after_ submission type
		this.isAnonymousMarkingEnabled = entity.isAnonymousMarkingEnabled();
		this.canEditAnonymousMarking = entity.canEditAnonymousMarking();
		this.isAnonymousMarkingAvailable = this._getIsAnonymousMarkingAvailable();

		this.canEditSubmissionsRule = entity.canEditSubmissionsRule();
		this.submissionsRule = entity.submissionsRule() || 'keepall';
		this.submissionsRuleOptions = entity.getSubmissionsRuleOptions();

		this.notificationEmail = entity.notificationEmail();
		this.canEditNotificationEmail = entity.canEditNotificationEmail();

		this.canEditFilesSubmissionLimit = entity.canEditFilesSubmissionLimit();
		this.filesSubmissionLimit = entity.filesSubmissionLimit() || 'unlimited';

		this.isGroupAssignmentTypeDisabled = entity.isGroupAssignmentTypeDisabled();
		this.isIndividualAssignmentType = entity.isIndividualAssignmentType();
		this.groupCategories = entity.getAssignmentTypeGroupCategoryOptions();
		this.canEditAssignmentType = !entity.isAssignmentTypeReadOnly();
		this.assignmentHasSubmissions = entity.assignmentHasSubmissions();
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

		this.isAnonymousMarkingAvailable = this._getIsAnonymousMarkingAvailable();
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

	setDefaultScoringRubric(rubricId) {
		if (rubricId) {
			this.defaultScoringRubricId = String(rubricId);
		}
	}

	resetDefaultScoringRubricId() {
		this.defaultScoringRubricId = '-1';
	}

	_makeAssignmentData() {
		/* NOTE: if you add fields here, please make sure you update the corresponding equals method in siren-sdk.
		 		 The cancel workflow is making use of that to detect changes.
		*/
		const data = {
			name: this.name,
			annotationToolsAvailable: this.annotationToolsAvailable,
			submissionType: this.assignmentSubmissionProps.submissionType,
			isIndividualAssignmentType: this.isIndividualAssignmentType,
			groupTypeId: this.selectedGroupCategoryId,
			defaultScoringRubricId: this.defaultScoringRubricId
		};
		if (this._isSubmissionTypeWithAnonMarking()) {
			data.isAnonymous = this.isAnonymousMarkingEnabled;
		}
		if (this.canEditInstructions) {
			data.instructions = this.instructions;
		}
		if (this.canEditCompletionType) {
			data.completionType = this.completionType;
		}
		if (this.assignmentSubmissionProps.showFilesSubmissionLimit) {
			data.filesSubmissionLimit = this.assignmentSubmissionProps.filesSubmissionLimit;
		}
		if (this.assignmentSubmissionProps.showSubmissionsRule) {
			data.submissionsRule = this.assignmentSubmissionProps.submissionsRule;
		}
		if (this.showNotificationEmail) {
			data.notificationEmail = this.notificationEmail;
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

	get showNotificationEmail() {
		return typeof this.notificationEmail !== 'undefined' && this.showSubmissionsRule;
	}

	setNotificationEmail(value) {
		this.notificationEmail = value;
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
	canEditAnnotations: observable,
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
	canEditAssignmentType: observable,
	canEditDefaultScoringRubric: observable,
	defaultScoringRubricId: observable,
	selectedGroupCategoryName: observable,
	showFilesSubmissionLimit: computed,
	showSubmissionsRule: computed,
	notificationEmail: observable,
	canEditNotificationEmail: observable,
	showNotificationEmail: computed,
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
	setAssignmentSubmissionType: action,
	setDefaultScoringRubric: action,
	resetDefaultScoringRubricId: action,
	setNotificationEmail: action
});
