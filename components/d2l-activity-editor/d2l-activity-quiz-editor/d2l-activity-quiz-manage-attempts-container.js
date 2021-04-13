import './d2l-activity-quiz-manage-attempts-editor.js';
import '@brightspace-ui/core/components/alert/alert.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/icons/icon.js';
import { sharedAttempts as attemptsStore, shared as store } from './state/quiz-store';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorWorkingCopyDialogMixin } from '../mixins/d2l-activity-editor-working-copy-dialog-mixin';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityQuizManageAttemptsContainer extends ActivityEditorWorkingCopyDialogMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {
	static get styles() {
		return [
			bodySmallStyles,
			labelStyles,
			css`
			#manage-attempts-dialog-attempts-editor {
				height: 430px;
			}
			d2l-alert {
				margin-bottom: 1rem;
			}
			.d2l-activity-quiz-manage-attempts-dialog-summary {
				margin: 0.5rem 0;
			}
			`,
		];
	}

	constructor() {
		super(store);
	}

	firstUpdated() {
		super.firstUpdated();
		// TODO: use singular server error term if possible
		this.serverErrorTerm = this.localize('quizTimingServerError');
		this.validationErrorTerm = this.localize('quizAttemptsValidationError');
	}

	render() {
		return html`
			${this._renderDialogLabel()}
			${this._renderDialogSummary()}
			${this._renderDialogOpener()}
			${this._renderDialog()}
    	`;
	}

	async _checkinDialog(e) {
		const { attemptsHref: dialogAttemptsHref } = (this.dialogHref && store.get(this.dialogHref)) || {};
		const dialogAttemptsEntity = dialogAttemptsHref && attemptsStore.get(dialogAttemptsHref);
		// Wait for attempts entity PATCH requests to complete before checking in
		if (!dialogAttemptsEntity) {
			return;
		}
		await dialogAttemptsEntity.saving;

		await this.checkinDialog(e);

		if (!this.opened) { // Dialog successfully checked in
			this._updateSummary();
		}
	}

	_renderDialog() {
		if (!this.opened) return html ``; // remove the dialog to prevent quiz question authoring dialog-fullscreen causing asyncMixin problems that stops the dialog from rendering properly

		const showSpinnerWhenLoading = true;
		const width = 850;
		return html`
			<d2l-dialog
				id="quiz-manage-attempts-dialog"
				?opened="${this.opened}"
				@d2l-dialog-close="${this.closeDialog}"
				?async="${showSpinnerWhenLoading}"
				width="${width}"
				title-text=${this.localize('subHdrAttemptsTools') }>
					<d2l-alert type="error" ?hidden=${!this.isError || !this.errorTerm}>${this.errorTerm}</d2l-alert>
					<div id="manage-attempts-dialog-attempts-editor">${this._renderQuizAttemptsEditor()}</div>
					<d2l-button slot="footer" primary @click="${this._checkinDialog}" ?disabled="${this.isSaving}">${this.localize('manageAttemptsDialogConfirmationText')}</d2l-button>
					<d2l-button slot="footer" data-dialog-action ?disabled="${this.isSaving}">${this.localize('manageAttemptsDialogCancelText')}</d2l-button>
			</d2l-dialog>
		`;
	}

	_renderDialogLabel() {
		return html`
			<div id="manage-attempts-editor-label" class="d2l-label-text">
				${this.localize('subHdrAttemptsTools')}
			</div>
		`;
	}

	_renderDialogOpener() {
		return html`
			<d2l-button-subtle
				text=${this.localize('manageAttempts')}
				@click="${this.openDialog}"
				h-align="text">
			</d2l-button-subtle>
		`;
	}

	_renderDialogSummary() {
		const entity = this.checkedOutHref && store.get(this.checkedOutHref);
		if (!entity) return html``;
		const { attemptsHref } = entity || {};
		if (!attemptsHref) return html``;

		return html`
			<div class="d2l-activity-quiz-manage-attempts-dialog-summary d2l-body-small">
				<d2l-activity-quiz-attempts-summary
					href="${attemptsHref}"
					.token="${this.token}">
				</d2l-activity-quiz-attempts-summary>
			</div>
		`;
	}

	_renderQuizAttemptsEditor() {
		const entity = store.get(this.dialogHref);
		if (!entity) return html``;

		const {
			attemptsHref
		} = entity || {};

		return html`
			<d2l-activity-quiz-manage-attempts-editor
				href="${attemptsHref}"
				.token="${this.token}">
			</d2l-activity-quiz-manage-attempts-editor>
		`;
	}

	_updateSummary() {
		const checkedOutQuizEntity = this.checkedOutHref && store.get(this.checkedOutHref);
		if (!checkedOutQuizEntity) return;
		const { attemptsHref: checkedOutAttemptsHref } = checkedOutQuizEntity;

		const dialogQuizEntity = this.dialogHref && store.get(this.dialogHref);
		if (!dialogQuizEntity) return;
		const { attemptsHref: dialogAttemptsHref } = dialogQuizEntity;

		// Replace checkedOut attempts entity with dialog attempts entity to immediately update attempts summarizer.
		const dialogAttemptsEntity = attemptsStore.get(dialogAttemptsHref);
		const checkedOutAttemptsEntity = attemptsStore.get(checkedOutAttemptsHref);
		checkedOutAttemptsEntity.load(dialogAttemptsEntity._entity);

		// Refetch checkedOut attempts entity to ensure we display the correct attempts summary.
		checkedOutAttemptsEntity.fetch(true);
	}
}

customElements.define(
	'd2l-activity-quiz-manage-attempts-container',
	ActivityQuizManageAttemptsContainer
);
