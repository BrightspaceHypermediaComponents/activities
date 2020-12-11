import '../d2l-activity-accordion-collapse.js';
import './d2l-activity-quiz-auto-set-graded-editor.js';
import './d2l-activity-quiz-auto-set-graded-summary.js';
import '@brightspace-ui/core/components/button/button-icon.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import { css, html } from 'lit-element/lit-element.js';
import { accordionStyles } from '../styles/accordion-styles';
import { ActivityEditorFeaturesMixin } from '../mixins/d2l-activity-editor-features-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ActivityQuizEvaluationAndFeedbackEditor extends AsyncContainerMixin(LocalizeActivityQuizEditorMixin(SkeletonMixin(ActivityEditorFeaturesMixin(ActivityEditorMixin(MobxLitElement))))) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object },
			_opened: { type: Boolean }
		};
	}

	static get styles() {

		return [
			super.styles,
			accordionStyles,
			heading4Styles,
			css`
				.d2l-heading-4 {
					display: inline;
				}
			`
		];
	}

	constructor() {
		super();
		this._opened = false;
	}

	render() {
		return html`
			<d2l-activity-accordion-collapse
				?has-errors=${this._errorInAccordion()}
				?skeleton="${this.skeleton}">

				<span slot="header">
					${this.localize('hdrEvaluationAndFeedback')}
				</span>

				// the summary text is in a specific order and should only be changed if required in a story

				<li slot="summary-items">${this._renderAutoSetGradedSummary()}</li>

				<div class="d2l-editors" slot="components">
					${this._renderAutoSetGradedSubHeader()}
					${this._renderAutomaticGradesEditor()}
				</div>
			</d2l-activity-accordion-collapse>

			${this._renderDialog()}
		`;
	}

	// Returns true if any error states relevant to this accordion are set
	_errorInAccordion() {
		return false; // Todo: implement error handling
	}

	_handleClose() {
		this._opened = false;
	}

	_open() {
		this._opened = true;
	}

	_renderAutomaticGradesEditor() {
		return html`
			<d2l-activity-quiz-auto-set-graded-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-auto-set-graded-editor>
	`;
	}

	_renderAutoSetGradedSubHeader() {
		return html`
			<div>
				<span>
					<h3 class="d2l-heading-4">
						${this.localize('subHdrAutomaticGrades')}
					</h3>
				</span>
				<span>
					<d2l-button-icon
						text="${this.localize('autoSetGradedAccessibleHelpText')}"
						icon="tier1:help"
						@click="${this._open}">
					</d2l-button-icon>
				</span>
			</div>
		`;
	}
	_renderAutoSetGradedSummary() {
		return html`
			<d2l-activity-quiz-auto-set-graded-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-auto-set-graded-summary>
		`;
	}
	_renderDialog() {
		return html`
			<d2l-dialog
				?opened="${this._opened}"
				@d2l-dialog-close="${this._handleClose}"
				title-text="${this.localize('autoSetGradedHelpDialogTitle')}">
					<div>
						<p>${this.localize('autoSetGradedHelpDialogParagraph1')}</p>
						<p>${this.localize('autoSetGradedHelpDialogParagraph2')}</p>
						<p>${this.localize('autoSetGradedHelpDialogParagraph3')}</p>
					</div>
					<d2l-button
						data-dialog-action="done"
						slot="footer"
						primary>
						${this.localize('autoSetGradedHelpDialogConfirmationText')}
					</d2l-button>
			</d2l-dialog>
		`;
	}

}

customElements.define(
	'd2l-activity-quiz-evaluation-and-feedback-editor',
	ActivityQuizEvaluationAndFeedbackEditor
);
