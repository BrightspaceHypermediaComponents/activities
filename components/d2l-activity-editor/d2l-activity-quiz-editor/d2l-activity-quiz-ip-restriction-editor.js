import '@brightspace-ui/core/components/button/button-subtle.js';
import './d2l-activity-quiz-ip-restrictions-container.js';
import './d2l-activity-quiz-ip-restrictions-help-dialog.js';
import 'd2l-inputs/d2l-input-text.js';
import { bodyCompactStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html } from 'lit-element/lit-element.js';
import { sharedIpRestrictions as ipStore, shared as store } from './state/quiz-store.js';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { validateIp } from './helpers/ip-validation-helper.js';

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

				d2l-alert {
					margin: 1rem 0;
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
			<div slot="footer" id="d2l-actions-container">
				<d2l-button slot="footer" primary @click=${this._saveRestrictions}>${this.localize('btnIpRestrictionsDialogAdd')}</d2l-button>
				<d2l-button slot="footer" @click=${this.handleClose}>${this.localize('btnIpRestrictionsDialogBtnCancel')}</d2l-button>
			</div>
		`;
	}

	_renderDialog() {
		return html`
			<d2l-dialog
				?opened="${this.opened}"
				@d2l-dialog-close="${this.handleClose}"
				title-text="${this.localize('hdrIpRestrictionDialog')}">

				${this._renderErrors()}
				${this._renderHelpDialog()}
				${this._renderIpRestrictionsContainer()}
				${this._renderActionButtons()}

			</d2l-dialog>
		`;
	}

	_renderDialogOpener() {
		const entity = ipStore.get(this.ipRestrictionsHref);
		if (!entity) {
			return;
		}

		return html`
			<div class="d2l-label-text">
				${this.localize('ipRestrictionLabel')}
			</div>
			<d2l-button-subtle
				?disabled=${!entity.canEditIpRestrictions}
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

		return errors.map((error) => {

			if (!error) {
				error = this.localize('ipRestrictions500Error');
			}

			return html`
				<d2l-alert type="warning">${error}</d2l-alert>
			`;
		});
	}

	_renderHelpDialog() {
		return html`
			<d2l-activity-quiz-ip-restrictions-help-dialog
				href="${this.ipRestrictionsHref}"
				.token="${this.token}">
			</d2l-activity-quiz-ip-restrictions-help-dialog>
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

		const hasValidationError = this._validate();

		if (hasValidationError) {
			return;
		}

		await entity.saveRestrictions();

		if (!entity.errors || !entity.errors.length) {
			this.handleClose();
		}
	}

	_validate() {
		const ipRestrictionsContainer = this.shadowRoot.querySelector('d2l-activity-quiz-ip-restrictions-container');

		if (!ipRestrictionsContainer) return;

		const inputs = ipRestrictionsContainer.shadowRoot.querySelectorAll('.d2l-ip-input');

		let hasValidationError = false;

		for (const input of inputs) {
			if (!this._validateRestriction(input)) {
				hasValidationError = true;
			}
		}

		const entity = ipStore.get(this.ipRestrictionsHref);

		if (hasValidationError) {
			const errorMsg = this.localize('ipRestrictionsValidationError');
			entity.setErrors([errorMsg]);
		} else {
			entity.setErrors([]);
			this._resizeDialog();
		}

		return hasValidationError;
	}

	_validateRestriction(restriction) {
		if (!restriction) {
			return true;
		}

		const isValid = !restriction.formValue || validateIp(restriction.formValue);

		restriction.setAttribute('aria-invalid', !isValid);

		return isValid;
	}
}

customElements.define(
	'd2l-activity-quiz-ip-restriction-editor',
	ActivityQuizIpRestrictionEditor
);
