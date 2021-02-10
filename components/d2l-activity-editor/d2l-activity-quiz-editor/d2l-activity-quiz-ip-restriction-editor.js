import '@brightspace-ui/core/components/button/button-subtle.js';
import './d2l-activity-quiz-ip-restrictions-container.js';
import 'd2l-inputs/d2l-input-text.js';
import { bodyCompactStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html } from 'lit-element/lit-element.js';
import { sharedIpRestrictions as ipStore, shared as store } from './state/quiz-store.js';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityQuizIpRestrictionEditor
	extends ActivityEditorMixin(RtlMixin(ActivityEditorDialogMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)))) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object }
		};
	}

	static get styles() {

		return [
			bodyCompactStyles,
			labelStyles,
			css`
				:host {
					display: block;
				}

				:host([hidden]) {
					display: none;
				}

				#ip-restriction-editor-label {
					margin-bottom: 10px;
				}

				d2l-button {
					margin: 1rem 0;
				}

				p:first-of-type {
					margin-top: 0;
				}

				p:last-of-type {
					margin-bottom: 1rem;
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

		this.ipRestrictionsHref = entity.ipRestrictionsHref;

		return html`
			${this._renderDialog()}
			${this._renderDialogOpener()}
		`;
	}

	_renderActionButtons() {
		return html`
			<d2l-button primary @click=${this._saveRestrictions}>${this.localize('btnIpRestrictionsDialogAdd')}</d2l-button>
			<d2l-button data-dialog-action>${this.localize('btnIpRestrictionsDialogBtnCancel')}</d2l-button>
		`;
	}

	_renderDialog() {
		return html`
			<d2l-dialog
				?opened="${this.opened}"
				@d2l-dialog-close="${this.handleClose}"
				title-text="${this.localize('hdrIpRestrictionDialog')}">

				${this._renderErrors()}
				${this._renderHelpText()}
				${this._renderIpRestrictionsContainer()}
				${this._renderActionButtons()}

			</d2l-dialog>
		`;
	}

	_renderDialogOpener() {
		return html`
			<div id="ip-restriction-editor-label" class="d2l-label-text">
				${this.localize('ipRestrictionLabel')}
			</div>
			<d2l-button-subtle
				text="${this.localize('btnOpenIpRestrictionDialog')}"
				h-align="text"
				@click="${this.open}">
			</d2l-button-subtle>
		`;
	}

	_renderErrors() {
		const entity = ipStore.get(this.ipRestrictionsHref);
		if (!entity) {
			return;
		}

		const { errors } = entity || {};

		if (!errors || !errors.length) {
			return;
		}
		// TODO: add some error handling
	}

	_renderHelpText() {
		return html`
			<p class="d2l-body-compact">${this.localize('ipRestrictionDialogPart1')}</p>
			<p class="d2l-body-compact">${this.localize('ipRestrictionDialogPart2')}</p>
			<p class="d2l-body-compact">${this.localize('ipRestrictionDialogPart3')}</p>
			<p class="d2l-body-compact">${this.localize('ipRestrictionDialogPart4')}</p>
		`;
	}

	_renderIpRestrictionsContainer() {
		return html`
			<d2l-activity-quiz-ip-restrictions-container
				href="${this.ipRestrictionsHref}"
				.token="${this.token}"
				@restrictions-resize-dialog="${this._resizeDialog}">
			</d2l-activity-quiz-ip-restrictions-container>
		`;
	}

	_resizeDialog() {
		const dialog = this.shadowRoot.querySelector('d2l-dialog');
		dialog.resize();
	}

	async _saveRestrictions() {
		const entity = ipStore.get(this.ipRestrictionsHref);
		if (!entity) {
			return;
		}

		await entity.saveRestrictions();

		this.handleClose();
	}
}

customElements.define(
	'd2l-activity-quiz-ip-restriction-editor',
	ActivityQuizIpRestrictionEditor
);
