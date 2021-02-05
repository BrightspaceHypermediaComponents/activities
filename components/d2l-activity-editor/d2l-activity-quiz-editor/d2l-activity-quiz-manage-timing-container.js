import './d2l-activity-quiz-manage-timing-editor.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { sharedTiming as store } from './state/quiz-store';

class ActivityQuizManageTimingContainer extends ActivityEditorMixin(ActivityEditorDialogMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {
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
				id="quiz-manage-timing-dialog"
				?opened="${this.opened}"
				@d2l-dialog-close="${this.handleClose}"
				width=800
				title-text=${this.localize('subHdrTimingTools') }>
					${this._renderQuizTimingEditor()}
					<d2l-button slot="footer" primary data-dialog-action="ok">${this.localize('manageTimingDialogConfirmationText')}</d2l-button>
					<d2l-button slot="footer" data-dialog-action>${this.localize('manageTimingDialogCancelText')}</d2l-button>
			</d2l-dialog>
		`;
	}

	_renderDialogOpener() {
		return html`
			<div id="manage-timing-editor-label" class="d2l-label-text">${this.localize('subHdrTimingTools')}</div>
			<div class="placeholder-for-summarizer"></div>
			<d2l-button-subtle text=${this.localize('manageTiming')} @click="${this.open}" h-align="text"></d2l-button-subtle>
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
