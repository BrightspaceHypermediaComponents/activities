import '@brightspace-ui/core/components/dialog/dialog.js';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/quiz-store';

class ActivityQuizManageAttemptsEditor extends ActivityEditorMixin(ActivityEditorDialogMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get styles() {
		return [
			labelStyles,
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

	_renderDialog() {
		return html`
			<d2l-dialog
				id="quiz-manage-attempts-dialog"
				?opened="${this.opened}"
				@d2l-dialog-close="${this.handleClose}"
				title-text="${this.localize('subHdrAttemptsTools')}">
					<d2l-button slot="footer" primary data-dialog-action="ok">${this.localize('manageAttemptsDialogConfirmationText')}</d2l-button>
		 			<d2l-button slot="footer" data-dialog-action>${this.localize('manageAttemptsDialogCancelText')}</d2l-button>
			</d2l-dialog>
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
}

customElements.define(
	'd2l-activity-quiz-manage-attempts-editor',
	ActivityQuizManageAttemptsEditor
);
