import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { checkboxStyles } from '../styles/checkbox-styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store';

class ActivityQuizDisableRightClickEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(ActivityEditorDialogMixin(MobxLitElement)))) {

	static get styles() {
		return [
			checkboxStyles,
			css`
				.d2l-input-checkbox-help-container {
					align-items: flex-start;
					display: flex;
				}

				.d2l-input-checkbox-help {
					margin: auto 0.4em auto 0;
					padding: 0;
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
			<d2l-input-checkbox-spacer
				class="d2l-body-small">
			</d2l-input-checkbox-spacer>

			<div class="d2l-input-checkbox-help-container">
				<d2l-input-checkbox
					class="d2l-input-checkbox-help"
					?checked="${entity.isDisableRightClickEnabled}"
					@change="${this._setDisableRightClick}"
					ariaLabel="${this.localize('disableRightClickDescription')}"
					?disabled="${!entity.canEditDisableRightClick}">
					${this.localize('disableRightClickDescription')}
				</d2l-input-checkbox>

				<d2l-button-icon
					text="${this.localize('disableRightClickAccessibleHelpText')}"
					icon="tier1:help"
					@click="${this.open}">
				</d2l-button-icon>
			</div>

			${this._renderDialog()}
		`;
	}

	_renderDialog() {
		return html`
			<d2l-dialog
				?opened="${this.opened}"
				@d2l-dialog-close="${this.handleClose}"
				title-text="${this.localize('disableRightClickHelpDialogTitle')}">
					<p>${this.localize('disableRightClickHelpDialogParagraph1')}</p>
					<p>${this.localize('disableRightClickHelpDialogParagraph2')}</p>
					<d2l-button
						data-dialog-action="done"
						slot="footer"
						primary>
						${this.localize('disableRightClickHelpDialogConfirmationText')}
					</d2l-button>
			</d2l-dialog>
		`;
	}

	_setDisableRightClick(event) {
		const entity = store.get(this.href);
		entity.setDisableRightClick(event.target.checked);
	}
}

customElements.define(
	'd2l-activity-quiz-disable-right-click-editor',
	ActivityQuizDisableRightClickEditor
);
