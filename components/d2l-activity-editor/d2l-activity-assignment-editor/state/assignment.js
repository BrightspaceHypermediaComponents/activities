import { action, computed, configure as configureMobx, decorate, observable } from 'mobx';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { fetchEntity } from '../../state/fetch-entity.js';
import { SubmissionAndCompletionProps } from './assignment-submission-and-completion.js';

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

	_isSubmissionTypeWithAnonMarking() {
		// only file (0) and text (1) submissions can have anonymous marking, see https://docs.valence.desire2learn.com/res/dropbox.html#attributes
		return ['0', '1'].includes(this.submissionAndCompletionProps.submissionType);
	}

	_getIsAnonymousMarkingAvailable() {
		return this._entity.isAnonymousMarkingAvailable() && this._isSubmissionTypeWithAnonMarking();
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
			completionType: entity.completionTypeValue()
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

		if (!this.isIndividualAssignmentType && this.groupCategories.length > 0) {
			this.selectedGroupCategoryId = String(this.groupCategories[0].value);
			const category = this.groupCategories.find(category => category.selected === true);

			if (category) {
				this.selectedGroupCategoryId = String(category.value);
			}
		}
	}

	setSubmissionType(value) {
		this.submissionAndCompletionProps.setSubmissionType(value);

		this.isAnonymousMarkingAvailable = this._getIsAnonymousMarkingAvailable();
	}

	setFilesSubmissionLimit(value) {
		this.submissionAndCompletionProps.setFilesSubmissionLimit(value);
	}

	setSubmissionsRule(value) {
		this.submissionAndCompletionProps.setSubmissionsRule(value);
	}

	setTurnitin(isOriginalityCheckEnabled, isGradeMarkEnabled) {
		this.isOriginalityCheckEnabled = isOriginalityCheckEnabled;
		this.isGradeMarkEnabled = isGradeMarkEnabled;
	}

	setCompletionType(value) {
		this.submissionAndCompletionProps.setCompletionType(value);
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

	setSubmissionAndCompletionProps(submissionAndCompletionProps) {
		this.submissionAndCompletionProps = new SubmissionAndCompletionProps(submissionAndCompletionProps);
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
			submissionType: this.submissionAndCompletionProps.submissionType,
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

	get showNotificationEmail() {
		return typeof this.notificationEmail !== 'undefined' && this.submissionAndCompletionProps.showSubmissionsRule;
	}

	setNotificationEmail(value) {
		this.notificationEmail = value;
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
	setSubmissionAndCompletionProps: action,
	setDefaultScoringRubric: action,
	resetDefaultScoringRubricId: action,
	setNotificationEmail: action
});
