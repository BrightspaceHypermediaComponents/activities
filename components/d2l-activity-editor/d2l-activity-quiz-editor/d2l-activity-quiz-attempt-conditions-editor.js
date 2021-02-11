import { bodyCompactStyles, bodySmallStyles, heading3Styles, labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';
import { shared as store } from './state/quiz-store';

class ActivityQuizAttemptConditionsEditor extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {
	static get properties() {
		return {
			isAttemptConditionsOpen: { type: Boolean, attribute: false }
		};
	}

	static get styles() {
		return [
			bodyCompactStyles,
			bodySmallStyles,
			heading3Styles,
			labelStyles,
			selectStyles,
			css`
				d2l-input-number {
					margin-left: 2rem;
					margin-right: 2rem;
					width: auto;
				}
				.d2l-attempts-condition-header {
					margin: 0;
				}
				.d2l-attempts-conditions-range-editor {
					align-items: center;
					border-bottom: 1px solid var(--d2l-color-corundum);
					display: flex;
					padding-bottom: 0.8rem;
					padding-top: 0.5rem;
				}
				.d2l-input-number-text {
					margin-left: 0.4rem;
					margin-right: 0.4rem;
				}
				.d2l-input-range-text {
					margin-left: 0;
					margin-right: 0;
				}
			`
		];
	}

	constructor() {
		super(store);
		this.isAttemptConditionsOpen = false;
	}

	render() {
		return html`
		${this.isAttemptConditionsOpen ? html`${this._renderAttemptConditionsEditor()}` :
		html`
			<d2l-button-subtle
				icon="tier1:plus-large"
				text=${this.localize('btnAttemptConditions')}
				@click=${(this._openAttemptConditionsRangeEditor)}>
			</d2l-button-subtle>`}
		`;
	}
	_openAttemptConditionsRangeEditor() {
		this.isAttemptConditionsOpen = !this.isAttemptConditionsOpen;
	}
	_renderAttemptConditionsEditor() {
		return html`
			<div class="d2l-heading-3 d2l-attempts-condition-header">${this.localize('attemptConditions')}</div>
			<p class="d2l-body-compact">${this.localize('attemptConditionsParagraph1')}</p>
			<p class="d2l-body-compact">${this.localize('attemptConditionsParagraph2')}</p>
			${this._renderAttemptConditionsRangeEditor()}
		`;
	}
	_renderAttemptConditionsRangeEditor() {
		// TODO: replace attemptConditions with data fetched from attempts entity when #attempts allowed >=2 and replace index/next with fetched data
		const attemptsConditions = [1, 2, 3, 4, 5];
		return html` ${attemptsConditions.map((index) => {
			const next = index + 1;
			return  html`
				<div class="d2l-attempts-conditions-range-editor">
					<div>
						<div class="d2l-label-text">${this.localize('attemptConditionsRangePrefixText1', { index })}</div>
						<div class="d2l-body-small">${this.localize('attemptConditionsRangePrefixText2')}</div>
					</div>
					<d2l-input-number label=${this.localize('minLabel')} min=0 max=100 input-width=3.5rem>
						<div slot="after">
							<span class="d2l-label-text d2l-input-number-text">${this.localize('percentageRangeText')}</span>
						</div>
					</d2l-input-number>
					<div class="d2l-body-small d2l-input-range-text">${this.localize('andRangeText')}</div>
					<d2l-input-number label=${this.localize('maxLabel')} min=0 max=100 input-width=3.5rem>
						<div slot="after">
							<span class="d2l-label-text d2l-input-number-text">${this.localize('percentageRangeText')}</span>
						</div>
					</d2l-input-number>
					<div>
						<div class="d2l-body-small">${this.localize('attemptConditionsRangeSuffixText1')}</div>
						<div class="d2l-label-text">${this.localize('attemptConditionsRangeSuffixText2', { next })}</div>
					</div>
				</div>
			`;})}
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-attempt-conditions-editor',
	ActivityQuizAttemptConditionsEditor
);
