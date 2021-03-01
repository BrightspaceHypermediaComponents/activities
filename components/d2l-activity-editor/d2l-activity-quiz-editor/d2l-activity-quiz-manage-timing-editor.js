import '@brightspace-ui/core/components/inputs/input-number.js';
import '@brightspace-ui/core/components/inputs/input-radio-spacer.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { inputLabelStyles } from '@brightspace-ui/core/components/inputs/input-label-styles.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';
import { sharedTiming as store } from './state/quiz-store';

class ActivityQuizManageTimingEditor extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {
	static get styles() {
		return [
			inputLabelStyles,
			labelStyles,
			radioStyles,
			selectStyles,
			css`
				:host([dir="rtl"]) .d2l-input-radio-label {
					padding-left: 1rem;
				}
				d2l-input-checkbox {
					margin-top: 0.9rem;
				}
				d2l-input-number {
					width: auto;
				}
				.d2l-input-radio-label {
					align-items: start;
					padding-right: 1rem;
				}
				.d2l-input-radio-label:last-of-type {
					margin-bottom: 0.9rem;
				}
				.d2l-input-number-label {
					line-height: 2rem;
					margin-left: 0.2rem;
					margin-right: 0.2rem;
				}
				.d2l-manage-timing-editor-timing-type-title {
					margin-bottom: 0.8rem;
					margin-left: 1.7rem;
					margin-right: 1.7rem;
				}
				.d2l-manage-timing-editor-submission-late-type-id-title {
					margin-bottom: 0.8rem;
				}
				.d2l-time-enforcement-input-container {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
				}
				.d2l-time-enforcement-input-container > * {
					margin-bottom: 0.8rem;
					margin-right: 0.7rem;
				}
				:host([dir="rtl"]) .d2l-time-enforcement-input-container > * {
					margin-left: 0.7rem;
					margin-right: 0;
				}
				:host([dir="rtl"]) .d2l-time-enforcement-input-container > *:last-of-type, .d2l-time-enforcement-input-container > *:last-of-type {
					margin-left: 0;
					margin-right: 0;
				}
				.d2l-timing-option-container {
					display: flex;
					flex-direction: row;
				}
				.d2l-italic-label {
					font-size: 0.8rem;
					font-style: italic;
				}
			`,
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
			isTimingEnforced,
		} = entity || {};

		return html`
			${this._renderTimeEnforcementOptions(entity)}
			${isTimingEnforced ? html`${this._renderTimeEnforcedMenu(entity)}` : html`${this._renderRecommendedTimeLimitMenu(entity)}`}
		`;
	}

	_isInputTimeInvalid(data, min, max) {
		return data !== undefined && (data < min || data > max);
	}

	_renderExtendedDeadline(entity) {
		const {
			canEditExtendedDeadline,
			extendedDeadline,
			extendedDeadlineOptions,
			isAutomaticZero
		} = entity || {};

		return isAutomaticZero ? html`
			<d2l-input-radio-spacer>
				<label>
					<span class="d2l-input-label">${this.localize('extendedDeadlineLabel')}</span>
					${canEditExtendedDeadline ? html`
						<select class="d2l-input-select" @change=${this._setExtendedDeadline}>
							${extendedDeadlineOptions.map((option) => html`
							<option value=${option.value} ?selected=${option.selected}>${option.value}</option>`)}
						</select>
					` : html`<span>${extendedDeadline}</span>`}
					<span class='d2l-input-number-label'>${this.localize('extendedDeadlineInputLabel')}</span>
				</label>
			</d2l-input-radio-spacer> ` : null;
	}

	_renderRecommendedTimeLimitMenu(entity) {
		const {
			canEditTimeLimit,
			canEditShowClock,
			showClock,
			recommendedTimeLimit,
			minRecommendedTimeLimit,
			maxRecommendedTimeLimit
		} = entity || {};
		const hideMinutesLabel = true;
		const inputValueRequired = true;
		return html`
			<d2l-input-radio-spacer>
				<div class="d2l-time-enforcement-input-container">
					<d2l-input-number
						label=${recommendedTimeLimit.title}
						title=${recommendedTimeLimit.title}
						?label-hidden=${hideMinutesLabel}
						value=${recommendedTimeLimit.value}
						min=${minRecommendedTimeLimit}
						max=${maxRecommendedTimeLimit}
						?required=${inputValueRequired}
						@change=${this._setTimeLimit}
						?disabled=${!canEditTimeLimit}>
						<span class="d2l-input-number-label" slot="after">${this.localize('minutesLabel')}</span>
					</d2l-input-number>
				</div>
					<label>
						<span class="d2l-italic-label">${this.localize('showClockLabel')}</span>
						<d2l-input-checkbox
							?checked=${showClock}
							@change="${this._setShowClock}"
							?disabled="${!canEditShowClock}">
							${this.localize('showClockTitle')}
						</d2l-input-checkbox>
					</label>
				</div>
			</d2l-input-radio-spacer>
		`;
	}
	_renderTimeEnforcedMenu(entity) {
		const {
			canEditTimeLimit,
			canEditGracePeriod,
			canEditExceededTimeLimitBehaviour,
			submissionLateType,
			enforcedTimeLimit,
			enforcedGraceLimit,
			minEnforcedTimeLimit,
			maxEnforcedTimeLimit,
			minEnforcedGraceLimit,
			maxEnforcedGraceLimit,
			submissionLateTypeIdTitle
		} = entity || {};

		const inputValueRequired = true;
		const timeEnforcementProperties = [];
		const timeLimit = { ...enforcedTimeLimit, min: minEnforcedTimeLimit, max: maxEnforcedTimeLimit, slot: this.localize('minutesLabel'), change: this._setTimeLimit, disabled: !canEditTimeLimit };
		const graceLimit = { ...enforcedGraceLimit, min: minEnforcedGraceLimit, max: maxEnforcedGraceLimit, slot: this.localize('minutesBeforeFlaggedLabel'), change: this._setGracePeriod, disabled: !canEditGracePeriod };
		timeEnforcementProperties.push(timeLimit);
		timeEnforcementProperties.push(graceLimit);

		return html`
			<d2l-input-radio-spacer>
				<div class="d2l-time-enforcement-input-container">
					${timeEnforcementProperties.map((type) => html`
					<d2l-input-number
						label=${type.title}
						title=${type.title}
						value=${type.value}
						min=${type.min}
						max=${type.max}
						?required=${inputValueRequired}
						@change=${type.change}
						?disabled=${type.disabled}>
						<span class='d2l-input-number-label' slot="after">${type.slot}</span>
					</d2l-input-number>`)}
				</div>
				<div class="d2l-input-label">${this.localize('subHdrExceededTimeLimitBehaviour')}</div>
				${canEditExceededTimeLimitBehaviour ? html`
					<div class="d2l-italic-label">${this.localize('exceededTimeLimitBehaviourPrefix')}</div>
					${(submissionLateType || []).map((type) => html`
					<label class="d2l-input-radio-label">
						<input
							type="radio"
							name="exceededTimeBehaviour"
							?checked=${type.selected}
							@change=${this._setExceededTimeLimitBehaviour}
							.value=${type.value} />
						${type.title}
					</label>`)}
				` : html`
					<div class="d2l-manage-timing-editor-submission-late-type-id-title">${submissionLateTypeIdTitle}</div>
				`}
				${this._renderExtendedDeadline(entity)}
			</d2l-input-radio-spacer>
		`;
	}
	_renderTimeEnforcementOptions(entity) {
		const {
			canEditTiming,
			timingTypes,
			timingType
		} = entity || {};
		return canEditTiming ? html`
			<div class="d2l-timing-option-container">
				${timingTypes.map((type) => html`
				<label class="d2l-input-radio-label">
					<input
						type="radio"
						name="timeEnforcement"
						?checked=${type.selected}
						@change=${this._setTimingType}
						.value=${type.value} />
					${type.title}
				</label>`)}
			</div>
		` : html`
			<div class="d2l-manage-timing-editor-timing-type-title">${timingType.title}</div>
		`;
	}

	_setExceededTimeLimitBehaviour(e) {
		const entity = store.get(this.href);
		const data = e.target.value;
		entity && entity.setExceededTimeLimitBehaviour(data);
	}
	_setExtendedDeadline(e) {
		const entity = store.get(this.href);
		const data = e.target.value;
		entity && entity.setExtendedDeadline(data);
	}
	_setGracePeriod(e) {
		const entity = store.get(this.href);
		const { minEnforcedGraceLimit, maxEnforcedGraceLimit } = entity || {};
		const data = e.target.value;
		if (this._isInputTimeInvalid(data, minEnforcedGraceLimit, maxEnforcedGraceLimit)) {
			return;
		}
		entity && entity.setGracePeriod(data);
	}
	_setShowClock(e) {
		const entity = store.get(this.href);
		const data = e.target.checked;
		entity && entity.setShowClock(data);
	}
	_setTimeLimit(e) {
		const entity = store.get(this.href);
		const { minRecommendedTimeLimit, maxRecommendedTimeLimit, minEnforcedTimeLimit, maxEnforcedTimeLimit } = entity || {};
		const data = e.target.value;
		if (!entity.isTimingEnforced && this._isInputTimeInvalid(data, minRecommendedTimeLimit, maxRecommendedTimeLimit)) {
			return;
		}
		if (entity.isTimingEnforced && this._isInputTimeInvalid(data, minEnforcedTimeLimit, maxEnforcedTimeLimit)) {
			return;
		}
		entity && entity.setTimeLimit(data);
	}
	_setTimingType(e) {
		const entity = store.get(this.href);
		const data = e.target.value;
		entity && entity.setTimingType(data);
	}
}

customElements.define(
	'd2l-activity-quiz-manage-timing-editor',
	ActivityQuizManageTimingEditor
);
