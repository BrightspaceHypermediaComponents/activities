import '@brightspace-ui/core/components/inputs/input-number.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { inputLabelStyles } from '@brightspace-ui/core/components/inputs/input-label-styles.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { sharedTiming as store } from './state/quiz-store';

class ActivityQuizManageTimingEditor extends AsyncContainerMixin(LocalizeActivityQuizEditorMixin(SkeletonMixin(ActivityEditorMixin(MobxLitElement)))) {
	static get styles() {
		return [
			super.styles,
			inputLabelStyles,
			labelStyles,
			radioStyles,
			selectStyles,
			css`
				d2l-input-checkbox {
					margin-top: 0.9rem;
				}
				d2l-input-number {
					width: auto;
				}
				.d2l-input-radio-label {
					padding-right: 1rem;
				}
				.d2l-input-radio-label:last-of-type {
					margin-bottom: 0.9rem;
				}
				.d2l-input-number-label {
					margin-left: 0.2rem;
					margin-right: 0.2rem;
				}
				.d2l-time-menu-container {
					margin-left: 1.7rem;
					margin-right: 1.7rem;
				}
				.d2l-time-enforcement-input-container {
					display: flex;
					flex-direction: row;
					margin-bottom: 0.8rem;
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

	_renderExtendedDeadline(entity) {
		const {
			extendedDeadlineOptions,
			isAutomaticZero
		} = entity || {};

		return isAutomaticZero ? html`
			<div class="d2l-time-menu-container">
				<label>
					<span class="d2l-input-label">${this.localize('extendedDeadlineLabel')}</span>
					<select class="d2l-input-select" @change=${this._setExtendedDeadline}>
						${extendedDeadlineOptions.map((option) => html`
						<option value=${option.value} ?selected=${option.selected}>${option.value}</option>`)}
					</select>
					<span class='d2l-input-number-label'>${this.localize('extendedDeadlineInputLabel')}</span>
				</label>
			</div> ` : null;
	}

	_renderRecommendedTimeLimitMenu(entity) {
		const {
			showClock,
			recommendedTimeLimit
		} = entity || {};
		// TODO: remove constant min/max
		const hideMinutesLabel = true;
		return html`
			<div class="d2l-time-menu-container">
				<div class="d2l-time-enforcement-input-container">
					<d2l-input-number
						label=${this.localize('minutesLabel')}
						title=${this.localize('minutesLabel')}
						?label-hidden=${hideMinutesLabel}
						value=${recommendedTimeLimit}
						min=1
						max=9999
						@change=${this._setTimeLimit}>
						<div slot="after">
							<span class="d2l-input-number-label">${this.localize('minutesLabel')}</span>
						</div>
					</d2l-input-number>
				</div>
					<label>
						<span class="d2l-italic-label">${this.localize('showClockLabel')}</span>
						<d2l-input-checkbox ?checked=${showClock}>${this.localize('showClockTitle')}</d2l-input-checkbox>
					</label>
				</div>
			</div>
		`;
	}
	_renderTimeEnforcedMenu(entity) {
		const {
			submissionLateType,
			enforcedTimeLimit,
			enforcedGraceLimit
		} = entity || {};

		const timeEnforcementLabels = [];
		// TODO: remove constant min/max
		const timeLimit = { ...enforcedTimeLimit, min:'1', max: '9999', slot: this.localize('minutesLabel'), change: this._setTimeLimit };
		const graceLimit = { ...enforcedGraceLimit, min:'1', max:'999,999,999,999,999', slot: this.localize('minutesBeforeFlaggedLabel'), change: this._setGracePeriod };
		timeEnforcementLabels.push(timeLimit);
		timeEnforcementLabels.push(graceLimit);

		return html`
			<div class="d2l-time-menu-container">
				<div class="d2l-time-enforcement-input-container">
					${timeEnforcementLabels.map((type) => html`
					<d2l-input-number
						label=${type.title}
						title=${type.title}
						value=${type.value}
						min=${type.min}
						max=${type.max}
						@change=${type.change}>
						<div slot="after">
							<span class="d2l-input-number-label">${type.slot}</span>
						</div>
					</d2l-input-number>`)}
				</div>
				<div class="d2l-input-label">${this.localize('subHdrExceededTimeLimitBehaviour')}</div>
				<div class="d2l-italic-label">${this.localize('exceededTimeLimitBehaviourPrefix')}</div>
				${submissionLateType.map((type) => html`
				<label class="d2l-input-radio-label">
					<input
						type="radio"
						name="exceededTimeBehaviour"
						?checked=${type.selected}
						@change=${this._setExceededTimeLimitBehaviour}
						.value=${type.value} />
					${type.title}
				</label>`)}
				${this._renderExtendedDeadline(entity)}
			</div>
		`;
	}
	_renderTimeEnforcementOptions(entity) {
		const {
			canEditTiming,
			timingTypes
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
			</div>` : null;
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
	// TODO: handle min/max inputs
	_setGracePeriod(e) {
		const entity = store.get(this.href);
		const data = e.target.value;
		entity && entity.setGracePeriod(data);
	}
	// TODO: handle min/max inputs
	_setTimeLimit(e) {
		const entity = store.get(this.href);
		const data = e.target.value;
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
