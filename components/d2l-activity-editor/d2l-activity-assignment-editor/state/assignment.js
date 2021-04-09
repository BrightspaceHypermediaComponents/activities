import { action, computed, configure as configureMobx, decorate, observable } from 'mobx';
import { AnonymousMarkingProps } from './assignment-anonymous-marking.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { AssignmentTypeProps } from './assignment-type.js';
import { fetchEntity } from '../../state/fetch-entity.js';
import { SubmissionAndCompletionProps } from './assignment-submission-and-completion.js';

configureMobx({ enforceActions: 'observed' });

export class Assignment {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this._saving = null;
	}

	cancelCreate() {
		return this._entity.cancelCreate();
	}

	delete() {
		return this._entity.delete();
	}

	get dirty() {
		return !this._entity.equals(this._makeAssignmentData());
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new AssignmentEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.submissionAndCompletionProps = new SubmissionAndCompletionProps({
			submissionTypeOptions: entity.submissionTypeOptions(),
			submissionType: entity.submissionType().value,
			canEditSubmissionType: entity.canEditSubmissionType(),
			canEditSubmissionsRule: entity.canEditSubmissionsRule(),
			submissionsRule: entity.submissionsRule(),
			submissionsRuleOptions: entity.getSubmissionsRuleOptions(),
			canEditFilesSubmissionLimit: entity.canEditFilesSubmissionLimit(),
			filesSubmissionLimit: entity.filesSubmissionLimit(),
			assignmentHasSubmissions: entity.assignmentHasSubmissions(),
			allCompletionTypeOptions: entity.allCompletionTypeOptions(),
			canEditCompletionType: entity.canEditCompletionType(),
			completionTypeValue: entity.completionTypeValue(),
			completionType: entity.completionType()
		});

		this.name = entity.name();
		this.canEditName = entity.canEditName();
		this.instructions = entity.canEditInstructions() ? entity.instructionsEditorHtml() : entity.instructionsHtml();
		this.canEditInstructions = entity.canEditInstructions();
		this.instructionsRichTextEditorConfig = entity.instructionsRichTextEditorConfig();
		this.attachmentsHref = entity.attachmentsCollectionHref();
		this.canEditAnnotations = entity.canEditAnnotations();
		this.annotationToolsAvailable = entity.getAvailableAnnotationTools();
		this.activityUsageHref = entity.activityUsageHref();
		this.canEditTurnitin = entity.canEditTurnitin();
		this.editTurnitinUrl = entity.editTurnitinUrl();
		this.isOriginalityCheckEnabled = entity.isOriginalityCheckEnabled();
		this.isGradeMarkEnabled = entity.isGradeMarkEnabled();
		this.canEditDefaultScoringRubric = entity.canEditDefaultScoringRubric();
		this.defaultScoringRubricId = String(entity.getDefaultScoringRubric()) || '-1';

		// set up anonymous marking _after_ submission type
		this.anonymousMarkingProps = new AnonymousMarkingProps({
			isAnonymousMarkingEnabled: entity.isAnonymousMarkingEnabled(),
			canEditAnonymousMarking: entity.canEditAnonymousMarking(),
			isAnonymousMarkingAvailable: entity.isAnonymousMarkingAvailable(),
			anonymousMarkingHelpText: entity.getAnonymousMarkingHelpText(),
			submissionType: this.submissionAndCompletionProps.submissionType
		});

		this.canEditSubmissionsRule = entity.canEditSubmissionsRule();
		this.submissionsRule = entity.submissionsRule() || 'keepall';
		this.submissionsRuleOptions = entity.getSubmissionsRuleOptions();

		this.notificationEmail = entity.notificationEmail();
		this.canEditNotificationEmail = entity.canEditNotificationEmail();

		this.canEditFilesSubmissionLimit = entity.canEditFilesSubmissionLimit();
		this.filesSubmissionLimit = entity.filesSubmissionLimit() || 'unlimited';

		this.categoriesLink = entity.getCategoriesLink();

		this.assignmentTypeProps = new AssignmentTypeProps({
			isGroupAssignmentTypeDisabled: entity.isGroupAssignmentTypeDisabled(),
			isIndividualAssignmentType: entity.isIndividualAssignmentType(),
			groupCategories: entity.getAssignmentTypeGroupCategoryOptions(),
			canEditAssignmentType: !entity.isAssignmentTypeReadOnly(),
			selectedGroupCategoryName: entity.getAssignmentTypeSelectedGroupCategoryName()
		});
	}

	resetDefaultScoringRubricId() {
		this.defaultScoringRubricId = '-1';
	}
	async save() {
		if (!this._entity) {
			return;
		}

		if (this._saving) {
			return this._saving;
		}

		this._saving = this._entity.save(this._makeAssignmentData());
		await this._saving;
		this._saving = null;

		await this.fetch();
	}
	setAnnotationToolsAvailable(value) {
		this.annotationToolsAvailable = value;
	}
	setAnonymousMarking(value) {
		this.anonymousMarkingProps.setAnonymousMarking(value);
	}
	setAnonymousMarkingProps(anonymousMarkingProps) {
		this.anonymousMarkingProps = new AnonymousMarkingProps(anonymousMarkingProps);
	}

	setAssignmentTypeGroupCategory(value) {
		this.assignmentTypeProps.setAssignmentTypeGroupCategory(value);
	}

	setAssignmentTypeProps(assignmentTypeProps) {
		this.assignmentTypeProps = new AssignmentTypeProps(assignmentTypeProps);
	}

	setCanEditAnnotations(canEditAnnotations) {
		this.canEditAnnotations = canEditAnnotations;
	}

	setCompletionType(value) {
		this.submissionAndCompletionProps.setCompletionType(value);
	}

	setDefaultScoringRubric(rubricId) {
		if (rubricId) {
			this.defaultScoringRubricId = String(rubricId);
		}
	}
	setFilesSubmissionLimit(value) {
		this.submissionAndCompletionProps.setFilesSubmissionLimit(value);
	}
	setInstructions(value) {
		this.instructions = value;
	}
	setName(value) {
		this.name = value;
	}
	setNotificationEmail(value) {
		this.notificationEmail = value;
	}
	setSubmissionAndCompletionProps(submissionAndCompletionProps) {
		this.submissionAndCompletionProps = new SubmissionAndCompletionProps(submissionAndCompletionProps);
	}
	setSubmissionsRule(value) {
		this.submissionAndCompletionProps.setSubmissionsRule(value);
	}
	setSubmissionType(value) {
		this.submissionAndCompletionProps.setSubmissionType(value);

		this.anonymousMarkingProps.setIsAnonymousMarkingAvailableForSubmissionType(this.submissionAndCompletionProps.submissionType);
	}
	setToGroupAssignmentType() {
		this.assignmentTypeProps.setToGroupAssignmentType();
	}

	setToIndividualAssignmentType() {
		this.assignmentTypeProps.setToIndividualAssignmentType();
	}
	setTurnitin(isOriginalityCheckEnabled, isGradeMarkEnabled) {
		this.isOriginalityCheckEnabled = isOriginalityCheckEnabled;
		this.isGradeMarkEnabled = isGradeMarkEnabled;
	}
	get showNotificationEmail() {
		return typeof this.notificationEmail !== 'undefined' && this.submissionAndCompletionProps.showSubmissionsRule;
	}

	_makeAssignmentData() {
		/* NOTE: if you add fields here, please make sure you update the corresponding equals method in siren-sdk.
		 		 The cancel workflow is making use of that to detect changes.
		*/
		const data = {
			name: this.name,
			annotationToolsAvailable: this.annotationToolsAvailable,
			submissionType: this.submissionAndCompletionProps.submissionType,
			isIndividualAssignmentType: this.assignmentTypeProps.isIndividualAssignmentType,
			groupTypeId: this.assignmentTypeProps.selectedGroupCategoryId,
			defaultScoringRubricId: this.defaultScoringRubricId
		};
		if (this.anonymousMarkingProps.isSubmissionTypeWithAnonMarking(this.submissionAndCompletionProps.submissionType)) {
			data.isAnonymous = this.anonymousMarkingProps.isAnonymousMarkingEnabled;
		}
		if (this.canEditInstructions) {
			data.instructions = this.instructions;
		}
		if (this.submissionAndCompletionProps.canEditCompletionType) {
			data.completionType = this.submissionAndCompletionProps.completionType;
		}
		if (this.submissionAndCompletionProps.showFilesSubmissionLimit) {
			data.filesSubmissionLimit = this.submissionAndCompletionProps.filesSubmissionLimit;
		}
		if (this.submissionAndCompletionProps.showSubmissionsRule) {
			data.submissionsRule = this.submissionAndCompletionProps.submissionsRule;
		}
		if (this.showNotificationEmail) {
			data.notificationEmail = this.notificationEmail;
		}
		return data;
	}
}

decorate(Assignment, {
	// props
	submissionAndCompletionProps: observable,
	name: observable,
	canEditName: observable,
	instructions: observable,
	canEditInstructions: observable,
	instructionsRichTextEditorConfig: observable,
	attachmentsHref: observable,
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
	selectedGroupCategoryId: observable,
	canEditDefaultScoringRubric: observable,
	defaultScoringRubricId: observable,
	notificationEmail: observable,
	canEditNotificationEmail: observable,
	anonymousMarkingProps: observable,
	assignmentTypeProps: observable,
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
	setSubmissionAndCompletionProps: action,
	setAnonymousMarkingProps: action,
	setDefaultScoringRubric: action,
	resetDefaultScoringRubricId: action,
	setNotificationEmail: action,
	delete: action,
	cancelCreate: action
});
