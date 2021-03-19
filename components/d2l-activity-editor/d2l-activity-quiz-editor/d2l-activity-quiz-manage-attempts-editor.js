import './d2l-activity-quiz-retake-incorrect-only-editor.js';
import './d2l-activity-quiz-attempt-conditions-editor.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';
import { sharedAttempts as store } from './state/quiz-store';

class ActivityQuizManageAttemptsEditor extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {
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
		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		const {
			attemptsAllowed,
			canUpdateRetakeIncorrectOnly,
			isRetakeIncorrectOnly
		} = entity || {};
		// Show RIO when attempts is 'Unlimited' or '0' or >1
		let showRio = attemptsAllowed !== '1';
		const showAttemptsConditions = attemptsAllowed > 1;
		// If RIO flag is off (f16751-retake-incorrect-only) don't render RIO editor
		if (isRetakeIncorrectOnly === undefined && !canUpdateRetakeIncorrectOnly) {
			showRio = false;
		}

		return html `
				${this._renderAttemptsSelectsEditor(entity)}
				${showRio ? html`${this._renderRioEditor()}` : null}
				${showAttemptsConditions ? html `${this._renderAttemptConditionsEditor()}` : null}
			`;
	}

	_renderAttemptConditionsEditor() {
		return html`
			<d2l-activity-quiz-attempt-conditions-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-attempt-conditions-editor>
		`;
	}

	_renderAttemptsAllowedOptions(options) {
		if (!options) return html``;
		// When quiz is read only, options is passed as a `"<num"` instead of an array
		if (!Array.isArray(options)) {
			return html`<option value=${options} selected>${options}</option>`;
		}
		return html`
			${options.map((option) => html`<option value=${option.value} ?selected=${option.selected}>${option.title}</option>`)}
		`;
	}

	_renderAttemptsSelectsEditor(entity) {
		const {
			attemptsAllowed,
			attemptsAllowedOptions,
			canUpdateAttemptsAllowed,
			canUpdateOverallGradeCalculation,
			overallGradeCalculationType,
			overallGradeCalculationOptions
		} = entity || {};

		return html`
			<div class="d2l-label-text">${this.localize('attemptsAllowed')}</div>
			<select
				class="d2l-input-select"
				?disabled =${!canUpdateAttemptsAllowed}
				@change=${this._setAttemptsAllowed}>
				${this._renderAttemptsAllowedOptions(attemptsAllowedOptions ? attemptsAllowedOptions : attemptsAllowed)}
			</select>
			<div class="d2l-label-text">${this.localize('overallGradeCalculation')}</div>
			<select
				class="d2l-input-select"
				?disabled =${!canUpdateOverallGradeCalculation}
				@change=${this._setOverallGradeCalculationType}>
				${this._renderOverallGradeCalculationOptions(overallGradeCalculationOptions ? overallGradeCalculationOptions : overallGradeCalculationType)}
			</select>
		`;
	}

	_renderOverallGradeCalculationOptions(options) {
		if (!options) return html``;
		// When quiz is read only, options is passed as a {gradeCalcOption} instead of an array
		if (!Array.isArray(options)) {
			return html`<option value=${options.value} selected>${options.title}</option>`;
		}
		return html`
			${options.map((option) => html`<option value=${option.value} ?selected=${option.selected}>${option.title}</option>`)}
		`;
	}

	_renderRioEditor() {
		return html `
			<d2l-activity-quiz-retake-incorrect-only-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-retake-incorrect-only-editor>
		`;
	}

	_setAttemptsAllowed(e) {
		const entity = store.get(this.href);
		const data = e.target.value;
		entity && entity.setAttemptsAllowed(data);
	}

	_setOverallGradeCalculationType(e) {
		const entity = store.get(this.href);
		const data = e.target.value;
		entity && entity.setOverallGradeCalculationType(data);
	}
}

customElements.define(
	'd2l-activity-quiz-manage-attempts-editor',
	ActivityQuizManageAttemptsEditor
);
