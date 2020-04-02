import { action, computed, configure as configureMobx, decorate, observable } from 'mobx';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
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
		const validCompletionTypes = this._getValidCompletionTypes(this.submissionType);
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
		this.submissionTypeOptions = entity.submissionTypeOptions();
		this.allCompletionTypeOptions = entity.allCompletionTypeOptions();
		this.canEditSubmissionType = entity.canEditSubmissionType();
		this.canEditCompletionType = entity.canEditCompletionType();
		this.submissionType = String(entity.submissionType().value);
		this.completionType = String(entity.completionType().value);

		this.canEditFilesSubmissionLimit = entity.canEditFilesSubmissionLimit();
		this.filesSubmissionLimit = entity.filesSubmissionLimit() || 'unlimited';

		this.isGroupAssignmentTypeDisabled = entity.isGroupAssignmentTypeDisabled();
		this.isIndividualAssignmentType = entity.isIndividualAssignmentType();
		this.groupCategories = entity.getAssignmentTypeGroupCategoryOptions();
		this.isReadOnly = entity.isAssignmentTypeReadOnly();
		this.selectedGroupCategoryName = entity.getAssignmentTypeSelectedGroupCategoryName();

		const validCompletionTypes = this._getValidCompletionTypes(this.submissionType);
		this.completionTypeOptions = this._getCompletionTypeOptions(validCompletionTypes);

		if (!this.isIndividualAssignmentType && this.groupCategories.length > 0) {
			this.selectedGroupCategoryId = String(this.groupCategories[0].value);
			const category = this.groupCategories.find(category => category.selected === true);

			if (category) {
				this.selectedGroupCategoryId = String(category.value);
			}
		}
	}

	setSubmissionType(value) {
		this.submissionType = value;
		this._setValidCompletionTypeForSubmissionType();
	}

	setFilesSubmissionLimit(value) {
		this.filesSubmissionLimit = value;
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

	_makeAssignmentData() {
		/* NOTE: if you add fields here, please make sure you update the corresponding equals method in siren-sdk.
		 		 The cancel workflow is making use of that to detect changes.
		*/
		return {
			name: this.name,
			instructions: this.instructions,
			isAnonymous: this.isAnonymousMarkingEnabled,
			annotationToolsAvailable: this.annotationToolsAvailable,
			submissionType: this.submissionType,
			completionType: this.completionTypeOptions.length === 0 ? String(0) : this.completionType,
			isIndividualAssignmentType: this.isIndividualAssignmentType,
			groupTypeId: this.selectedGroupCategoryId,
			filesSubmissionLimit: this.filesSubmissionLimit
		};
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
			.find(x => x.title === 'File submission' && `${x.value}` === `${this.submissionType}`);
	}
}

decorate(Assignment, {
	// props
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
	canEditSubmissionType: observable,
	canEditCompletionType: observable,
	canEditFilesSubmissionLimit: observable,
	filesSubmissionLimit:observable,
	canEditTurnitin: observable,
	editTurnitinUrl: observable,
	isOriginalityCheckEnabled: observable,
	isGradeMarkEnabled: observable,
	submissionType: observable,
	completionType: observable,
	isIndividualAssignmentType: observable,
	groupCategories: observable,
	selectedGroupCategoryId: observable,
	isGroupAssignmentTypeDisabled: observable,
	isReadOnly: observable,
	selectedGroupCategoryName: observable,
	showFilesSubmissionLimit: computed,
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
	setFilesSubmissionLimit: action
});
