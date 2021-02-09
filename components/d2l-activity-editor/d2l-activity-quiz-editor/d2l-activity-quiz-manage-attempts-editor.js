import '@brightspace-ui/core/components/dialog/dialog.js';
import './d2l-activity-quiz-retake-incorrect-only-editor.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';
import { shared as store } from './state/quiz-store';

class ActivityQuizManageAttemptsEditor extends ActivityEditorMixin(ActivityEditorDialogMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get styles() {
		return [
			labelStyles,
			selectStyles,
			css`
				.d2l-input-select {
					margin-bottom: 1.5rem;
				}
			`
		];
	}

	constructor() {
		super(store);
	}
	render() {
		return html`
			${this._renderDialogOpener()}
			${this._renderDialog()}
		`;
	}

	_renderAttemptsCondition() {
		// TODO: add Attempts Conditions once design has been refined
		return html`
			<d2l-button-subtle text=${this.localize('btnAddAttemptConditions')}></d2l-button-subtle>
		`;
	}
	_renderAttemptsSelects() {
		// TODO: replace consts with data fetched from attempts entity
		const attemptsAllowed = ['Unlimited', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const gradingTypes = ['Highest Attempt', 'Lowest Attempt', 'Average of All Attempts', 'First Attempt', 'Last Attempt'];

		return html`
			<div class="d2l-label-text">${this.localize('attemptsAllowed')}</div>
			<select class="d2l-input-select">
				${attemptsAllowed.map((option) => html `<option value=${option}>${option}</option>`)}
			</select>

			<div class="d2l-label-text">${this.localize('overallGradeCalculation')}</div>
			<select class="d2l-input-select">
				${gradingTypes.map((option) => html `<option value=${option}>${option}</option>`)}
			</select>
		`;
	}

	_renderDialog() {
		return html`
			<d2l-dialog
				id="quiz-manage-attempts-dialog"
				?opened="${this.opened}"
				@d2l-dialog-close="${this.handleClose}"
				title-text="${this.localize('subHdrAttemptsTools')}"
				width=700>
					${this._renderDialogContent()}
					<d2l-button slot="footer" primary data-dialog-action="ok">${this.localize('manageAttemptsDialogConfirmationText')}</d2l-button>
		 			<d2l-button slot="footer" data-dialog-action>${this.localize('manageAttemptsDialogCancelText')}</d2l-button>
			</d2l-dialog>
		`;
	}

	_renderDialogContent() {
		// TODO: replace consts with data fetched from attempts entity
		const showRio = true;
		const showAttemptsConditions = true;

		return html `
			${this._renderAttemptsSelects()}
			${showRio ? html`${this._renderRioOption()}` : null}
			${showAttemptsConditions ? html `${this._renderAttemptsCondition()}` : null}
		`;
	}

	_renderDialogOpener() {
		return html`
			<div id="manage-attempts-editor-label" class="d2l-label-text">
				${this.localize('subHdrAttemptsTools')}
			</div>
			<d2l-button-subtle
				text="${this.localize('manageAttempts')}"
				@click="${this.open}">
			</d2l-button-subtle>
		`;
	}

	_renderRioOption() {
		return html `
			<d2l-activity-quiz-retake-incorrect-only-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-retake-incorrect-only-editor>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-manage-attempts-editor',
	ActivityQuizManageAttemptsEditor
);
