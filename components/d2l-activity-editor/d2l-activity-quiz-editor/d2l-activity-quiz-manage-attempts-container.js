import '@brightspace-ui/core/components/dialog/dialog.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/quiz-store';

class ActivityQuizManageAttemptsContainer extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {
	constructor() {
		super(store);
	}
	render() {
		return html`
			<div>
				<d2l-dialog id="quiz-manage-attempts-dialog" title-text=${this.localize('subHdrAttemptsTools')}>
					<d2l-button slot="footer" primary data-dialog-action="ok">${this.localize('manageAttemptsDialogConfirmationText')}</d2l-button>
					<d2l-button slot="footer" data-dialog-action>${this.localize('manageAttemptsDialogCancelText')}</d2l-button>
				</d2l-dialog>
			</div>
    	`;
	}
}

customElements.define(
	'd2l-activity-quiz-manage-attempts-container',
	ActivityQuizManageAttemptsContainer
);
