import '@brightspace-ui/core/components/dialog/dialog.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/quiz-store';

class ActivityQuizManageTimingContainer extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {
	constructor() {

		super(store);

	}
	render() {
		// TODO: complete check when entity is ready
		// const entity = store.get(this.href);
		// if (!entity) {
		// 	return html``;
		// }
		// entity.canEditTiming();

		return html`
		<div>
			<d2l-dialog id="quiz-manage-timing-dialog" ?opened=${this.isDialogOpen} title-text=${this.localize('subHdrTimingTools')}>
				<d2l-button slot="footer" primary data-dialog-action="ok">${this.localize('manageTimingDialogConfirmationText')}</d2l-button>
				<d2l-button slot="footer" data-dialog-action>${this.localize('manageTimingDialogCancelText')}</d2l-button>
			</d2l-dialog>
		</div>
    `;
	}
	// TODO: when entity is ready, check for presence `update-timing type` action. If user does not have permission, disable primary Add button
	_canEditTiming() {
		return true;
	}

}

customElements.define(
	'd2l-activity-quiz-manage-timing-container',
	ActivityQuizManageTimingContainer
);
