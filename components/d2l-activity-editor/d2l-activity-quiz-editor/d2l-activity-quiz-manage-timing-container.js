import './d2l-activity-quiz-manage-timing-editor.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/quiz-store';

class ActivityQuizManageTimingContainer extends ActivityEditorMixin(ActivityEditorDialogMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {
	static get properties() {

		return {
			dialogHref: { type: String }
		};
	}

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
		this.dialogHref = '';
		this.checkoutOnLoad = true;
	}

	render() {
		return html`
			${this._renderDialogOpener()}
			${this._renderDialog()}
    	`;
	}

	async save() {
		const entity = store.get(this.checkedOutHref);
		if (!entity) return;

		await entity.checkin(store);
	}

	async _closeDialog(e) {
		const entity = store.get(this.dialogHref);
		if (!entity) return;

		if (e.detail.action === 'ok') {
			await entity.checkin(store);
		}

		this.dialogHref = '';
		this.handleClose(e);
	}

	async _openDialog(e) {
		const entity = store.get(this.checkedOutHref);
		if (!entity) return;

		this.dialogHref = await entity.checkout(store, true);

		this.open(e);
	}

	_renderDialog() {
		return html`
			<d2l-dialog
				id="quiz-manage-timing-dialog"
				?opened="${this.opened}"
				@d2l-dialog-close="${this._closeDialog}"
				width=800
				title-text=${this.localize('subHdrTimingTools') }>
					<div id="manage-timing-dialog-timing-editor">${this._renderQuizTimingEditor()}</div>
					<d2l-button slot="footer" primary data-dialog-action="ok">${this.localize('manageTimingDialogConfirmationText')}</d2l-button>
					<d2l-button slot="footer" data-dialog-action>${this.localize('manageTimingDialogCancelText')}</d2l-button>
			</d2l-dialog>
		`;
	}

	_renderDialogOpener() {
		return html`
			<div id="manage-timing-editor-label" class="d2l-label-text">${this.localize('subHdrTimingTools')}</div>
			<div class="placeholder-for-summarizer"></div>
			<d2l-button-subtle text=${this.localize('manageTiming')} @click="${this._openDialog}" h-align="text"></d2l-button-subtle>
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
