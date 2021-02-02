import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { QuizEntity } from 'siren-sdk/src/activities/quizzes/QuizEntity.js';

configureMobx({ enforceActions: 'observed' });

export class Quiz {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this._saving = null;
	}

	delete() {
		return this._entity.delete();
	}

	get dirty() {
		return !this._entity.equals(this._makeQuizData());
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);

		if (sirenEntity) {
			const entity = new QuizEntity(sirenEntity, this.token, {
				remove: () => { },
			});
			this.load(entity);
		}
		return this;
	}

	load(entity) {
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
		this.description = entity.canEditDescription() ? entity.descriptionEditorHtml() : entity.descriptionHtml();
		this.canEditDescription = entity.canEditDescription();
		this.descriptionIsDisplayed = entity.descriptionIsDisplayed();
		this.descriptionRichTextEditorConfig = entity.descriptionRichTextEditorConfig();
	}

	async save() {
		if (!this._entity) {
			return;
		}

		if (this._saving) {
			return this._saving;
		}

		this._saving = this._entity.save(this._makeQuizData());

		await this._saving;
		this._saving = null;

		await this.fetch();
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

	_makeQuizData() {
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
			description: this.description
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
	description: observable,
	canEditDescription: observable,
	descriptionIsDisplayed: observable,
	descriptionRichTextEditorConfig: observable,
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
	save: action,
	delete: action
});
