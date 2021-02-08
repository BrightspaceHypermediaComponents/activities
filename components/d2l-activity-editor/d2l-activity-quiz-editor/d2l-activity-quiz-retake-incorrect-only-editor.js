import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { checkboxStyles } from '../styles/checkbox-styles.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store';

class ActivityQuizRetakeIncorrectOnlyEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(ActivityEditorDialogMixin(MobxLitElement)))) {

	static get styles() {
		return [
			checkboxStyles,
			labelStyles,
			css`
				.d2l-input-checkbox-help-container {
					align-items: center;
					display: flex;
				}
				.d2l-input-checkbox-help {
					margin-bottom: 0.9rem;
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

		return html`
			<div class="d2l-label-text">${this.localize('retakeIncorrectQuestionsOnly')}</div>
			<div class="d2l-input-checkbox-help-container">
				<d2l-input-checkbox>${this.localize('rioCheckboxLabel')}</d2l-input-checkbox>
				<div class="d2l-input-checkbox-help">
					<d2l-button-icon
						text="${this.localize('rioAccessibileHelpText')}"
						icon="tier1:help"
						@click="${this.open}">
					</d2l-button-icon>
				</div>
			</div>
			${this._renderDialog()}
		`;
	}

	_renderDialog() {
		return html`
			<d2l-dialog
				?opened="${this.opened}"
				@d2l-dialog-close="${this.handleClose}"
				title-text="${this.localize('rioDialogTitle')}">
					${this.localize('rioDialogParagraph')}
					<d2l-button
						data-dialog-action="done"
						slot="footer"
						primary>
						${this.localize('rioDialogConfirmationText')}
					</d2l-button>
			</d2l-dialog>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-retake-incorrect-only-editor',
	ActivityQuizRetakeIncorrectOnlyEditor
);
