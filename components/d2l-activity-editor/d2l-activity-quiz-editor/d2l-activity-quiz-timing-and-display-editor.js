import '../d2l-activity-accordion-collapse.js';
import './d2l-activity-quiz-disable-pager-and-alerts-editor.js';
import './d2l-activity-quiz-prevent-moving-backwards-editor.js';
import './d2l-activity-quiz-prevent-moving-backwards-summary.js';
import './d2l-activity-quiz-disable-pager-and-alerts-summary.js';
import './d2l-activity-quiz-disable-right-click-editor.js';
import './d2l-activity-quiz-disable-right-click-summary.js';
import './d2l-activity-quiz-hints-editor.js';
import './d2l-activity-quiz-hints-summary.js';
import './d2l-activity-quiz-shuffle-editor.js';
import './d2l-activity-quiz-shuffle-summary.js';
import { css, html } from 'lit-element/lit-element.js';
import { accordionStyles } from '../styles/accordion-styles';
import { ActivityEditorFeaturesMixin } from '../mixins/d2l-activity-editor-features-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ActivityQuizTimingAndDisplayEditor extends AsyncContainerMixin(LocalizeActivityQuizEditorMixin(SkeletonMixin(ActivityEditorFeaturesMixin(ActivityEditorMixin(MobxLitElement))))) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object }
		};
	}

	static get styles() {

		return [
			super.styles,
			accordionStyles,
			labelStyles,
			css`
				.d2l-editors:not(:first-of-type) {
					margin-top: 20px;
				}
			`,
		];
	}

	connectedCallback() {
		super.connectedCallback();
	}

	render() {
		return html`
			<d2l-activity-accordion-collapse
				?has-errors=${this._errorInAccordion()}
				?skeleton="${this.skeleton}">

				<span slot="header">
					${this.localize('hdrTimingAndDisplay')}
				</span>

				// the summary text order is specific and should only be changed if required in a story

				<li slot="summary-items">${this._renderPreventMovingBackwardsSummary()}</li>
				<li slot="summary-items">${this._renderShuffleSummary()}</li>
				<li slot="summary-items">${this._renderAllowHintsSummary()}</li>
				<li slot="summary-items">${this._renderDisableRightClickSummary()}</li>
				<li slot="summary-items">${this._renderDisablePagerAndAlertsSummary()}</li>

				<div class="d2l-editors" slot="components">
					<label class="d2l-label-text">
						${this.localize('subHdrTimingTools')}
					</label>
					<d2l-button-subtle 
						text=${this.localize('manageTiming')}
						>
					</d2l-button-subtle>
					${this._renderManageTimingContainer()}
				</div>

				<div class="d2l-editors" slot="components">
					<label class="d2l-label-text">
						${this.localize('subHdrPagingTools')}
					</label>
					${this._renderPreventMovingBackwardsEditor()}
				</div>

				<div class="d2l-editors" slot="components">
					<label class="d2l-label-text">
						${this.localize('subHdrShuffleQuiz')}
					</label>
					${this._renderShuffleEditor()}
				</div>

				<div class="d2l-editors" slot="components">
					<label class="d2l-label-text">
						${this.localize('subHdrDisplayTools')}
					</label>
					${this._renderHintsEditor()}
					${this._renderDisableRightClickEditor()}
					${this._renderDisablePagerAndAlertsEditor()}
				</div>

			</d2l-activity-accordion-collapse>
		`;
	}
	// Returns true if any error states relevant to this accordion are set
	_errorInAccordion() {
		return false; // Todo: implement error handling
	}

	_renderAllowHintsSummary() {
		return html`
			<d2l-activity-quiz-hints-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-hints-summary>
		`;
	}

	_renderDisablePagerAndAlertsEditor() {
		return html`
			<d2l-activity-quiz-disable-pager-and-alerts-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-disable-pager-and-alerts-editor>
		`;
	}

	_renderDisablePagerAndAlertsSummary() {
		return html`
			<d2l-activity-quiz-disable-pager-and-alerts-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-disable-pager-and-alerts-summary>
		`;
	}

	_renderDisableRightClickEditor() {
		return html`
			<d2l-activity-quiz-disable-right-click-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-disable-right-click-editor>
		`;
	}

	_renderDisableRightClickSummary() {
		return html`
			<d2l-activity-quiz-disable-right-click-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-disable-right-click-summary>
		`;
	}

	_renderHintsEditor() {
		return html`
			<d2l-activity-quiz-hints-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-hints-editor>
		`;
	}
	_renderManageTimingContainer() {
		return html`
			<d2l-activity-quiz-manage-timing-container 
				href="${this.href}"
				.token="${this.token}">
		</d2l-activity-quiz-manage-timing-container>`;
	}

	_renderPreventMovingBackwardsEditor() {
		return html`
				<d2l-activity-quiz-prevent-moving-backwards-editor
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-quiz-prevent-moving-backwards-editor>
		`;
	}

	_renderPreventMovingBackwardsSummary() {
		return html`
			<d2l-activity-quiz-prevent-moving-backwards-summary
				href="${this.href}"
				.token="${this.token}">
				<p slot="one">Include me in slot</p>
				<p slot="two">Text for slot two</p>
			</d2l-activity-quiz-prevent-moving-backwards-summary>
		`;
	}

	_renderShuffleEditor() {
		return html`
			<d2l-activity-quiz-shuffle-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-shuffle-editor>
		`;
	}

	_renderShuffleSummary() {
		return html`
			<d2l-activity-quiz-shuffle-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-shuffle-summary>
		`;
	}

}

customElements.define(
	'd2l-activity-quiz-timing-and-display-editor',
	ActivityQuizTimingAndDisplayEditor
);
