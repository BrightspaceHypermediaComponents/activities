import './d2l-activity-quiz-manage-timing-editor.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorWorkingCopyDialogMixin } from '../mixins/d2l-activity-editor-working-copy-dialog-mixin';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/quiz-store';

class ActivityQuizManageTimingContainer extends ActivityEditorWorkingCopyDialogMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {
	static get styles() {
		return [
			labelStyles,
			css`
				#manage-timing-dialog-timing-editor {
					height: 430px;
				}
			`,
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
		const showSpinnerWhenLoading = true;
		const width = 900;
		return html`
			<d2l-dialog
				id="quiz-manage-timing-dialog"
				?opened="${this.opened}"
				@d2l-dialog-close="${this.closeDialog}"
				?async="${showSpinnerWhenLoading}"
				width="${width}"
				title-text=${this.localize('subHdrTimingTools') }>
					<div id="manage-timing-dialog-timing-editor">${this._renderQuizTimingEditor()}</div>
					<d2l-button slot="footer" primary @click="${this.checkinDialog}">${this.localize('manageTimingDialogConfirmationText')}</d2l-button>
					<d2l-button slot="footer" data-dialog-action>${this.localize('manageTimingDialogCancelText')}</d2l-button>
			</d2l-dialog>
		`;
	}

	_renderDialogOpener() {
		return html`
			<div id="manage-timing-editor-label" class="d2l-label-text">${this.localize('subHdrTimingTools')}</div>
			<div class="placeholder-for-summarizer"></div>
			<d2l-button-subtle text=${this.localize('manageTiming')} @click="${this.openDialog}" h-align="text"></d2l-button-subtle>
		`;
	}

	_renderQuizTimingEditor() {
		const entity = store.get(this.dialogHref);
		if (!entity) return html``;

		const {
			timingHref
		} = entity || {};

		return html`
			<d2l-activity-quiz-manage-timing-editor
				href="${timingHref}"
				.token="${this.token}">
			</d2l-activity-quiz-manage-timing-editor>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-manage-timing-container',
	ActivityQuizManageTimingContainer
);
