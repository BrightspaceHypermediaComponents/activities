import '@brightspace-ui/core/components/inputs/input-number.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
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
		} = entity || {};
		return html`
			<div class="d2l-time-menu-container">
				<label class="d2l-label-text">${this.localize('extendedDeadline')}</label>
				<div>
					<select class="d2l-input-select">
						${extendedDeadlineOptions.map((option) => html`<option value=${option.value} ?selected=${option.selected}>${option.value}</option>`)}
					</select>
					<label class='d2l-input-number-label'>
						${this.localize('extendedDeadlineInputLabel')}
					</label>
				</div>
			</div>
		`;
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
							max=9999>
							<label class="d2l-input-number-label" slot="after">${this.localize('minutesLabel')}</label>
						</d2l-input-number>
					</div>
					<div>
						<label class="d2l-italic-label">${this.localize('showClockLabel')}</label>
						<d2l-input-checkbox ?checked=${showClock}>${this.localize('showClockTitle')}</d2l-input-checkbox>
					</div>
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
		const timeLimit = { ...enforcedTimeLimit, min:'1', max: '9999', slot: this.localize('minutesLabel') };
		const graceLimit = { ...enforcedGraceLimit, min:'1', max:'999,999,999,999,999', slot: this.localize('minutesBeforeFlaggedLabel') };
		timeEnforcementLabels.push(timeLimit);
		timeEnforcementLabels.push(graceLimit);

		const showExtendedDeadline = true;

		return html`
			<div class="d2l-time-menu-container">
				<div class="d2l-time-enforcement-input-container">
					${timeEnforcementLabels.map((type) => html`
					<d2l-input-number
						label=${type.title}
						title=${type.title}
						value=${type.value}
						min=${type.min}
						max=${type.max}>
						<label
							class='d2l-input-number-label'
							slot='after'>${type.slot}
						</label>
					</d2l-input-number>`)}
				</div>

				<label class="d2l-label-text">${this.localize('subHdrExceededTimeLimitBehaviour')}</label>
				<div>
					<label class="d2l-italic-label">${this.localize('exceededTimeLimitBehaviourPrefix')}</label>
				</div>
	 			<!-- TODO: add @change for input -->
				${submissionLateType.map((type) => html`
				<label class="d2l-input-radio-label">
					<input
						type="radio"
						name="exceededTimeBehaviour"
						?checked=${type.selected}
						.value=${type.value}
					/>${type.title}</label>`)}
				${showExtendedDeadline ? html`${this._renderExtendedDeadline(entity)}` : null}
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
				<label class="d2l-input-radio-label"
					><input
						type="radio"
						name="timeEnforcement"
						?checked=${type.selected}
						@change="${this._setTimingType}"
						.value=${type.value}
					/>${type.title}</label>`)}
			</div>
			` : html``;
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
