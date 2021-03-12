import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { QuizEntity } from 'siren-sdk/src/activities/quizzes/QuizEntity.js';

configureMobx({ enforceActions: 'observed' });

export class Quiz {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this._saving = null;
		this._checkedOut = null;
	}

	async checkin(quizStore, refetch) {
		if (!this._entity) {
			return;
		}

		if (this._saving) {
			return this._saving;
		}

		this._saving = this._entity.checkin();
		let sirenEntity;
		try {
			sirenEntity = await this._saving;
		} catch (e) {
			return;
		} finally {
			this._saving = null;
		}

		if (!sirenEntity) return;
		const href = sirenEntity.self();
		const entity = new Quiz(href, this.token);
		entity.load(sirenEntity);
		quizStore.put(href, entity);

		if (refetch) {
			this.fetch(true);
		}
	}

	checkout(quizStore, forcedCheckout) {
		if (!forcedCheckout && this._checkedOut) {
			return this._checkedOut;
		}

		let href = this.href;
		const getHrefPromise = this._entity.checkout().then(sirenEntity => {
			if (sirenEntity) {
				href = sirenEntity.self();
				const entity = new Quiz(href, this.token);
				entity.load(sirenEntity);
				quizStore.put(href, entity);
			}
			return href;
		}, () => {
			return href;
		});

		if (!forcedCheckout) {
			this._checkedOut = getHrefPromise;
		}

		return getHrefPromise;
	}

	delete() {
		return this._entity.delete();
	}

	async dirty(quizStore) {
		const checkedOutHref = await this._checkedOut;
		const checkedOutEntity = quizStore && quizStore.get(checkedOutHref);

		// Check that this entity is not dirty, then check that it's checked out working copy does not have a `canCheckin` action.
		// It avoids recursively fetching a working copy's working copy by not passing in a quizStore the second time.
		const isQuizDirty = !this._entity.equals(this._makeQuizData()) || this._entity.canCheckin();
		const isCheckedOutEntityDirty = checkedOutEntity && await checkedOutEntity.dirty();

		return isQuizDirty || isCheckedOutEntityDirty;
	}

	async fetch(bypassCache) {
		const sirenEntity = await fetchEntity(this.href, this.token, bypassCache);
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
		this.ipRestrictionsHref = entity.ipRestrictionsHref();
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
	save: action,
	delete: action,
	checkout: action,
	checkin: action
});
