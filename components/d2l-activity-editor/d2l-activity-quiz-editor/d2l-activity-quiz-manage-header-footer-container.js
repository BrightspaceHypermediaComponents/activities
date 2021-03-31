import '@brightspace-ui/core/components/alert/alert.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/icons/icon.js';
import './d2l-activity-quiz-manage-header-footer-editor.js';
import './d2l-activity-quiz-manage-header-footer-dialog-summary.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store';

class ActivityQuizManageHeaderFooterContainer extends ActivityEditorDialogMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get properties() {
		return {
			href: { type: String },
			token: { type: Object }
		};
	}

	static get styles() {
		return [
			bodySmallStyles,
			css`
				.d2l-activity-quiz-manage-header-footer-dialog-summary::after {
					white-space: pre;
				}
			`,
		];
	}

	constructor() {
		super(store);
	}

	firstUpdated() {
		super.firstUpdated();
	}

	render() {
		return html`
			${this._renderHeaderDialogSummary()}
			${this._renderDialogOpener()}
			${this._renderDialog()}
    	`;
	}

	_cancel() {
		const e = this.shadowRoot.querySelector('d2l-activity-quiz-manage-header-footer-editor');
		e.reset();
	}

	_renderDialog() {
		const width = 700;
		return html`
			<d2l-dialog
				id="quiz-manage-header-footer-dialog"
				?opened="${this.opened}"
				@d2l-dialog-close="${this.handleClose}"
				width="${width}"
				title-text=${this.localize('headerFooterDialogTitle')}>
					${this._renderQuizHeaderFooterEditor()}
					<d2l-button slot="footer" primary data-dialog-action="save" @click="${this._save}" ?disabled="${this.isSaving}">${this.localize('manageHeaderFooterDialogAddText')}</d2l-button>
					<d2l-button slot="footer" data-dialog-action="cancel" @click="${this._cancel}" ?disabled="${this.isSaving}">${this.localize('manageHeaderFooterDialogCancelText')}</d2l-button>
			</d2l-dialog>
		`;
	}

	_renderDialogOpener() {
		return html`
			<d2l-button-subtle text=${this.localize('manageHeaderFooterButton')} @click="${this.open}" h-align="text"></d2l-button-subtle>
		`;
	}

	_renderHeaderDialogSummary() {
		return html`
			<div class="d2l-activity-quiz-manage-header-footer-dialog-summary">
				<d2l-activity-quiz-manage-header-footer-dialog-summary class="d2l-body-small"
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-quiz-manage-header-footer-dialog-summary>
			</div>
		`;
	}

	_renderQuizHeaderFooterEditor() {
		return html`
			<d2l-activity-quiz-manage-header-footer-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-manage-header-footer-editor>
		`;
	}

	_save() {
		const el = this.shadowRoot.querySelector('d2l-activity-quiz-manage-header-footer-editor');
		el.save();
	}
}

customElements.define(
	'd2l-activity-quiz-manage-header-footer-container',
	ActivityQuizManageHeaderFooterContainer
);
