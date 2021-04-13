import './d2l-activity-quiz-manage-timing-editor.js';
import '@brightspace-ui/core/components/alert/alert.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/icons/icon.js';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html } from 'lit-element/lit-element';
import { shared as store, sharedTiming as timingStore } from './state/quiz-store';
import { ActivityEditorWorkingCopyDialogMixin } from '../mixins/d2l-activity-editor-working-copy-dialog-mixin';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityQuizManageTimingContainer extends ActivityEditorWorkingCopyDialogMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {
	static get styles() {
		return [
			bodySmallStyles,
			labelStyles,
			css`
				#manage-timing-dialog-timing-editor {
					height: 430px;
				}
				d2l-alert {
					margin-bottom: 1rem;
				}
				.d2l-activity-quiz-manage-timing-container-dialog-summary {
					margin: 0.5rem 0;
				}
				.d2l-activity-quiz-manage-timing-container-dialog-summary d2l-icon {
					margin-right: 0.3rem;
				}
				:host([dir="rtl"]) .d2l-activity-quiz-manage-timing-container-dialog-summary d2l-icon {
					margin-left: 0.3rem;
					margin-right: 0;
				}
			`,
		];
	}

	constructor() {
		super(store);
	}

	firstUpdated() {
		super.firstUpdated();
		this.serverErrorTerm = this.localize('quizTimingServerError');
		this.validationErrorTerm = this.localize('quizTimingValidationError');
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
		const { timingHref: dialogTimingHref } = (this.dialogHref && store.get(this.dialogHref)) || {};
		const dialogTimingEntity = dialogTimingHref && timingStore.get(dialogTimingHref);
		if (!dialogTimingEntity) {
			return;
		}

		await dialogTimingEntity.saving; // Wait for timing entity PATCH requests to complete before checking in

		await this.checkinDialog(e);

		if (!this.opened) { // Dialog successfully checked in
			this._updateSummary();
		}
	}

	_renderDialog() {
		if (!this.opened) return html ``; // remove the dialog to prevent quiz question authoring dialog-fullscreen causing asyncMixin problems that stops the dialog from rendering properly

		const showSpinnerWhenLoading = true;
		const width = 900;
		return html`
			<d2l-dialog
				id="quiz-manage-timing-dialog"
				?opened="${this.opened}"
				@d2l-dialog-close="${this.closeDialog}"
				?async="${showSpinnerWhenLoading}"
				width="${width}"
				title-text=${this.localize('subHdrTimingTools') }>
					<d2l-alert type="error" ?hidden=${!this.isError || !this.errorTerm}>${this.errorTerm}</d2l-alert>
					<div id="manage-timing-dialog-timing-editor">${this._renderQuizTimingEditor()}</div>
					<d2l-button slot="footer" primary @click="${this._checkinDialog}" ?disabled="${this.isSaving}">${this.localize('manageTimingDialogConfirmationText')}</d2l-button>
					<d2l-button slot="footer" data-dialog-action ?disabled="${this.isSaving}">${this.localize('manageTimingDialogCancelText')}</d2l-button>
			</d2l-dialog>
		`;
	}

	_renderDialogLabel() {
		return html`
			<div id="manage-timing-editor-label" class="d2l-label-text">${this.localize('subHdrTimingTools')}</div>
		`;
	}

	_renderDialogOpener() {
		return html`
			<d2l-button-subtle text=${this.localize('manageTiming')} @click="${this.openDialog}" h-align="text"></d2l-button-subtle>
		`;
	}

	_renderDialogSummary() {
		const entity = this.checkedOutHref && store.get(this.checkedOutHref);
		if (!entity) return html``;
		const { timingHref } = entity;

		return html`
			<div class="d2l-activity-quiz-manage-timing-container-dialog-summary d2l-body-small">
				<d2l-icon icon="tier1:time"></d2l-icon>
				<d2l-activity-quiz-timing-summary
					href="${timingHref}"
					.token="${this.token}">
				</d2l-activity-quiz-timing-summary>
			</div>
		`;
	}

	_renderQuizTimingEditor() {
		const entity = store.get(this.dialogHref);
		if (!entity) return html``;

		const {
			timingHref
		} = entity || {};

		return html`
			<d2l-activity-quiz-manage-timing-editor
				href="${timingHref}"
				.token="${this.token}">
			</d2l-activity-quiz-manage-timing-editor>
		`;
	}

	_updateSummary() {
		const checkedOutQuizEntity = this.checkedOutHref && store.get(this.checkedOutHref);
		if (!checkedOutQuizEntity) return;
		const { timingHref: checkedOutTimingHref } = checkedOutQuizEntity;

		const dialogQuizEntity = this.dialogHref && store.get(this.dialogHref);
		if (!dialogQuizEntity) return;
		const { timingHref: dialogTimingHref } = dialogQuizEntity;

		// Replace checkedOut timing entity with dialog timing entity to immediately update timing summarizer.
		const dialogTimingEntity = timingStore.get(dialogTimingHref);
		const checkedOutTimingEntity = timingStore.get(checkedOutTimingHref);
		checkedOutTimingEntity.load(dialogTimingEntity._entity);

		// Refetch checkedOut timing entity to ensure we display the correct timing summary.
		checkedOutTimingEntity.fetch(true);
	}
}

customElements.define(
	'd2l-activity-quiz-manage-timing-container',
	ActivityQuizManageTimingContainer
);
