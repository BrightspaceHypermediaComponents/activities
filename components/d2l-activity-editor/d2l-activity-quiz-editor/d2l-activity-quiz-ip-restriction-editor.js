import '@brightspace-ui/core/components/button/button-subtle.js';
import './d2l-activity-quiz-ip-restrictions-container.js';
import './d2l-activity-quiz-ip-restrictions-help-dialog.js';
import 'd2l-inputs/d2l-input-text.js';
import { bodyCompactStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html } from 'lit-element/lit-element.js';
import { sharedIpRestrictions as ipStore, shared as store } from './state/quiz-store.js';
import { ActivityEditorWorkingCopyDialogMixin } from '../mixins/d2l-activity-editor-working-copy-dialog-mixin';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { validateIp } from './helpers/ip-validation-helper.js';

class ActivityQuizIpRestrictionEditor
	extends ActivityEditorWorkingCopyDialogMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object },
			ipRestrictionsHref: { type: String },

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

				#ip-container {
					height: 250px;
				}
			`
		];
	}

	constructor() {
		super(store);

		this._scrollToAlert = this._scrollToAlert.bind(this);
	}

	render() {
		const entity = store.get(this.dialogHref);

		const {
			ipRestrictionsHref
		} = entity || {};

		this.ipRestrictionsHref = ipRestrictionsHref || '';

		return html`
			${this._renderDialog()}
			${this._renderDialogOpener()}
		`;
	}

	_renderActionButtons() {
		return html`
			<div slot="footer" id="d2l-actions-container">
				<d2l-button primary @click=${this._saveRestrictions}>${this.localize('btnIpRestrictionsDialogAdd')}</d2l-button>
				<d2l-button data-dialog-action>${this.localize('btnIpRestrictionsDialogBtnCancel')}</d2l-button>
			</div>
		`;
	}

	_renderDialog() {
		return html`
			<d2l-dialog
				async
				?opened="${this.opened}"
				@d2l-dialog-close="${this.closeDialog}"
				title-text="${this.localize('hdrIpRestrictionDialog')}">

				<div id="ip-container">
					${this._renderErrors()}
					${this._renderHelpDialog()}
					${this._renderIpRestrictionsContainer()}
				</div>

				${this._renderActionButtons()}

			</d2l-dialog>
		`;
	}

	_renderDialogOpener() {
		const entity = store.get(this.href);
		if (!entity) {
			return;
		}

		// this is a hack so we don't have to fetch the IP restrictions entity just to determine this permission
		const canEditIpRestrictions = entity.canEditName;

		return html`
			<div class="d2l-label-text">
				${this.localize('ipRestrictionLabel')}
			</div>
			<d2l-button-subtle
				?disabled=${!canEditIpRestrictions}
				text="${this.localize('btnOpenIpRestrictionDialog')}"
				h-align="text"
				@click="${this.openDialog}">
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

		// using a set to filter out duplicate error messages
		const uniqueErrors = Array.from(new Set(errors));

		return uniqueErrors.map((error) => {

			if (error === 500 || !error) {
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
				@restrictions-resize-dialog="${this._resizeDialog}"
				@ip-restriction-deleted="${this._validate}">
			</d2l-activity-quiz-ip-restrictions-container>
		`;
	}

	_resizeDialog() {
		const dialog = this.shadowRoot.querySelector('d2l-dialog');
		dialog.resize();
	}

	async _saveRestrictions(e) {
		const entity = ipStore.get(this.ipRestrictionsHref);

		if (!entity) {
			return;
		}

		const hasValidationError = this._validate();

		if (hasValidationError) {
			this._scrollToAlert();
			return;
		}

		await entity.saveRestrictions();

		if (!entity.errors || !entity.errors.length) {
			this.checkinDialog(e);
			return;
		}

		this._scrollToAlert();
	}

	_scrollToAlert() {
		const el = this.shadowRoot.querySelector('d2l-alert');
		if (el && el.scrollIntoView) {
			el.scrollIntoView();
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

		const isEnd = restriction.name === 'end'; // end values can be empty

		const isValid = isEnd && !restriction.formValue || validateIp(restriction.formValue);

		restriction.setAttribute('aria-invalid', !isValid);

		return isValid;
	}
}

customElements.define(
	'd2l-activity-quiz-ip-restriction-editor',
	ActivityQuizIpRestrictionEditor
);
