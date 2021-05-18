import { action, configure as configureMobx, decorate, observable, runInAction } from 'mobx';
import { QuizEntity } from 'siren-sdk/src/activities/quizzes/QuizEntity.js';
import { WorkingCopy } from '../../state/working-copy.js';

configureMobx({ enforceActions: 'observed' });

export class Quiz extends WorkingCopy {
	constructor(href, token) {
		super(Quiz, QuizEntity);
		this.href = href;
		this.token = token;
	}

	delete() {
		return this._entity.delete();
	}

	async load(entity) {
		this._entity = entity;
		this.name = entity.name();
		this.canEditName = entity.canEditName();
		this.canEditShuffle = entity.canEditShuffle();
		this.isShuffleEnabled = entity.isShuffleEnabled();
		this.canEditHints = entity.canEditHints();
		this.hintsToolEnabled = entity.getHintsToolEnabled();
		this.password = entity.password();
		this.canEditPassword = entity.canEditPassword();
		this.canEditDisableRightClick = entity.canEditDisableRightClick();
		this.isDisableRightClickEnabled = entity.isDisableRightClickEnabled();
		this.canEditDisablePagerAndAlerts = entity.canEditDisablePagerAndAlerts();
		this.isDisablePagerAndAlertsEnabled = entity.isDisablePagerAndAlertsEnabled();
		this.isPreventMovingBackwardsEnabled = entity.isPreventMovingBackwardsEnabled();
		this.canEditPreventMovingBackwards = entity.canEditPreventMovingBackwards();
		this.canEditNotificationEmail = entity.canEditNotificationEmail();
		this.notificationEmail = entity.notificationEmail();
		this.previewHref = entity.previewHref();
		this.canPreviewQuiz = entity.canPreviewQuiz();
		this.isAutoSetGradedEnabled = entity.isAutoSetGradedEnabled();
		this.canEditAutoSetGraded = entity.canEditAutoSetGraded();
		this.timingHref = entity.timingHref();
		this.attemptsHref = entity.attemptsHref();
		this.description = entity.canEditDescription() ? entity.descriptionEditorHtml() : entity.descriptionHtml();
		this.canEditDescription = entity.canEditDescription();
		this.descriptionIsDisplayed = entity.descriptionIsDisplayed();
		this.originalDescriptionIsEmpty = entity.originalDescriptionIsEmpty();
		this.descriptionRichTextEditorConfig = entity.descriptionRichTextEditorConfig();
		this.introIsAppendedToDescription = entity.introIsAppendedToDescription();
		this.header = entity.canEditHeader() ? entity.headerEditorHtml() : entity.headerHtml();
		this.canEditHeader = entity.canEditHeader();
		this.headerIsDisplayed = entity.headerIsDisplayed();
		this.headerRichTextEditorConfig = entity.headerRichTextEditorConfig();
		this.originalHeaderIsEmpty = entity.originalHeaderIsEmpty();
		this.ipRestrictionsHref = entity.ipRestrictionsHref();

		const types = await entity.activityTypes();
		runInAction(() => {
			this.activityTypes = types;
		});
	}

	setAutoSetGraded(isEnabled) {
		this.isAutoSetGradedEnabled = isEnabled;
	}

	setDescription(value) {
		this.description = value;
	}

	setDisablePagerAndAlertsTool(isEnabled) {
		this.isDisablePagerAndAlertsEnabled = isEnabled;
	}

	setDisableRightClick(value) {
		this.isDisableRightClickEnabled = value;
	}

	setHeader(value) {
		this.header = value;
	}

	setHintsToolEnabled(isHintsEnabled) {
		this.hintsToolEnabled = isHintsEnabled;
	}

	setName(value) {
		this.name = value;
	}

	setNotificationEmail(value) {
		this.notificationEmail = value;
	}

	setPassword(value) {
		this.password = value;
	}

	setPreventMovingBackwards(value) {
		this.isPreventMovingBackwardsEnabled = value;
	}

	setShuffle(isEnabled) {
		this.isShuffleEnabled = isEnabled;
	}

	_makeEntityData() {
		/* NOTE: if you add fields here, please make sure you update the corresponding equals method in siren-sdk.
					 The cancel workflow is making use of that to detect changes.
		*/
		const data = {
			name: this.name,
			allowHints: this.hintsToolEnabled,
			shuffle: this.isShuffleEnabled,
			password: this.password,
			disableRightClick: this.isDisableRightClickEnabled,
			disablePagerAndAlerts: this.isDisablePagerAndAlertsEnabled,
			preventMovingBackwards: this.isPreventMovingBackwardsEnabled,
			notificationEmail: this.notificationEmail,
			autoSetGraded: this.isAutoSetGradedEnabled,
			description: this.description,
			header: this.header
		};

		return data;
	}
}

decorate(Quiz, {
	// props
	name: observable,
	canEditName: observable,
	canEditShuffle: observable,
	canEditHints: observable,
	canEditDisableRightClick: observable,
	canEditPreventMovingBackwards: observable,
	canEditDisablePagerAndAlerts: observable,
	canEditAutoSetGraded: observable,
	isShuffleEnabled: observable,
	hintsToolEnabled: observable,
	password: observable,
	canEditPassword: observable,
	isDisableRightClickEnabled: observable,
	isDisablePagerAndAlertsEnabled: observable,
	isPreventMovingBackwardsEnabled: observable,
	canEditNotificationEmail: observable,
	notificationEmail: observable,
	previewHref: observable,
	canPreviewQuiz: observable,
	isAutoSetGradedEnabled: observable,
	timingHref: observable,
	attemptsHref: observable,
	description: observable,
	canEditDescription: observable,
	descriptionIsDisplayed: observable,
	originalDescriptionIsEmpty: observable,
	descriptionRichTextEditorConfig: observable,
	introIsAppendedToDescription: observable,
	header: observable,
	canEditHeader: observable,
	headerRichTextEditorConfig: observable,
	originalHeaderIsEmpty: observable,
	activityTypes: observable,
	// actions
	load: action,
	setName: action,
	setShuffle: action,
	setHintsToolEnabled: action,
	setPassword: action,
	setDisableRightClick: action,
	setDisablePagerAndAlertsTool: action,
	setPreventMovingBackwards: action,
	setNotificationEmail: action,
	setAutoSetGraded: action,
	setDescription: action,
	setHeader: action,
	delete: action
});
