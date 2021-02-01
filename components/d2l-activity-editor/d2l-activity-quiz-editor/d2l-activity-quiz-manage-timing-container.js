import './d2l-activity-quiz-manage-timing-editor.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { sharedTiming as store } from './state/quiz-store';

class ActivityQuizManageTimingContainer extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {
	constructor() {
		super(store);
	}

	render() {
		return html`
			<div>
				<d2l-dialog id="quiz-manage-timing-dialog" ?opened=${this.isDialogOpen} width=800 title-text=${this.localize('subHdrTimingTools') }>
				${this._renderQuizTimingEditor()}
					<d2l-button slot="footer" primary data-dialog-action="ok">${this.localize('manageTimingDialogConfirmationText')}</d2l-button>
					<d2l-button slot="footer" data-dialog-action>${this.localize('manageTimingDialogCancelText')}</d2l-button>
				</d2l-dialog>
			</div>
    	`;
	}

	_renderQuizTimingEditor() {
		return html`
			<d2l-activity-quiz-manage-timing-editor
					href="${this.href}"
					.token="${this.token}">
			</d2l-activity-quiz-manage-timing-editor>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-manage-timing-container',
	ActivityQuizManageTimingContainer
);
