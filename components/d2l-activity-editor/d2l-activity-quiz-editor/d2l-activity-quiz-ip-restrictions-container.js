import '@brightspace-ui/core/components/button/button-subtle.js';
import './d2l-activity-quiz-ip-restrictions-editor.js';
import './d2l-activity-quiz-ip-restrictions-help-dialog.js';
import 'd2l-inputs/d2l-input-text.js';
import { bodyCompactStyles, bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html } from 'lit-element/lit-element.js';
import { sharedIpRestrictions as ipStore, shared as store } from './state/quiz-store.js';
import { ipToInt, validateIp } from './helpers/ip-validation-helper.js';
import { ActivityEditorWorkingCopyDialogMixin } from '../mixins/d2l-activity-editor-working-copy-dialog-mixin';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityQuizIpRestrictionsContainer
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
			bodySmallStyles,
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

				#ip-summary {
					margin-top: 0.55rem;
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

	async _handleClose(e) {
		await this.checkinDialog(e);

		const checkedOutQuizEntity = this.checkedOutHref && store.get(this.checkedOutHref);
		if (!checkedOutQuizEntity) return;

		const { ipRestrictionsHref: checkedOutIpHref } = checkedOutQuizEntity;
		if (!checkedOutIpHref) return;

		const dialogQuizEntity = this.dialogHref && store.get(this.dialogHref);
		if (!dialogQuizEntity) return;

		const { ipRestrictionsHref: dialogIpHref } = dialogQuizEntity;

		const dialogIpEntity = ipStore.get(dialogIpHref);
		const checkedOutIpEntity = ipStore.get(checkedOutIpHref);

		// Replace checkedOut ip entity with dialog ip entity to immediately update summarizer.
		checkedOutIpEntity.load(dialogIpEntity._entity);

		// Refetch checkedOut timing entity to ensure we display the correct timing summary.
		checkedOutIpEntity.fetch(true);
	}

	_handleValidationError(errorKey) {
		const entity = ipStore.get(this.ipRestrictionsHref);
		if (!entity) return;

		const errorMsg = this.localize(errorKey);
		entity.setErrors([errorMsg]);
		return true;
	}

	_hasDuplicates() {
		const entity = ipStore.get(this.ipRestrictionsHref);
		if (!entity || !entity.ipRestrictions || !entity.ipRestrictions.length) {
			return false;
		}
		const startRanges = entity.ipRestrictions.map(restriction => restriction.start);

		return new Set(startRanges).size !== startRanges.length;
	}

	_hasValidInputs() {
		const ipRestrictionsEditor = this.shadowRoot.querySelector('d2l-activity-quiz-ip-restrictions-editor');

		if (!ipRestrictionsEditor) return;

		const inputs = ipRestrictionsEditor.shadowRoot.querySelectorAll('.d2l-ip-input');

		const isInitialState = inputs.length === 2 && inputs[0].formValue === '' && inputs[1].formValue === '';

		if (isInitialState) {
			return true;
		}

		let areInputsValid = true;

		for (const input of inputs) {
			if (!this._validateRestriction(input)) {
				areInputsValid = false;
			}
		}

		return areInputsValid;
	}

	_hasValidRanges() {
		const entity = ipStore.get(this.ipRestrictionsHref);
		if (!entity || !entity.ipRestrictions || !entity.ipRestrictions.length) {
			return true;
		}

		for (const range of entity.ipRestrictions) {

			if (!range.end) continue;

			if (ipToInt(range.start) > ipToInt(range.end)) {
				return false;
			}
		}

		return true;
	}

	_renderActionButtons() {
		return html`
			<div slot="footer" id="d2l-actions-container">
				<d2l-button ?disabled="${this.isSaving}" primary @click=${this._saveRestrictions}>${this.localize('btnIpRestrictionsDialogAdd')}</d2l-button>
				<d2l-button ?disabled="${this.isSaving}" data-dialog-action>${this.localize('btnIpRestrictionsDialogBtnCancel')}</d2l-button>
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
					${this._renderIpRestrictionsEditor()}
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

			${this._renderSummary()}

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

	_renderIpRestrictionsEditor() {
		return html`
			<d2l-activity-quiz-ip-restrictions-editor
				href="${this.ipRestrictionsHref}"
				.token="${this.token}"
				@restrictions-resize-dialog="${this._resizeDialog}"
				@ip-restriction-deleted="${this._validate}">
			</d2l-activity-quiz-ip-restrictions-editor>
		`;
	}

	_renderSummary() {
		const quizEntity = store.get(this.checkedOutHref);
		if (!quizEntity) return;

		const ipHref = quizEntity.ipRestrictionsHref;

		const ipEntity = ipStore.get(ipHref);
		if (!ipEntity) {
			return;
		}

		if (!ipEntity.ipRestrictions || ipEntity.ipRestrictions.length === 0 || !ipEntity.ipRestrictions[0].start) {
			return;
		}

		return html`<p id="ip-summary" class="d2l-body-small">
						${this.localize('ipRestrictionsInnerSummary', 'count', ipEntity.ipRestrictions.length)}
					</p>`;
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
			this._handleClose(e);
			return;
		}

		this._scrollToAlert();
	}

	async _scrollToAlert() {
		await this.updateComplete;

		const el = this.shadowRoot.querySelector('d2l-alert');
		if (el && el.scrollIntoView) {
			el.scrollIntoView();
		}
	}

	_validate() {
		const entity = ipStore.get(this.ipRestrictionsHref);
		if (!entity) return;

		entity.setErrors([]);

		if (!this._hasValidInputs()) {
			return this._handleValidationError('ipRestrictionsValidationError');
		}

		if (this._hasDuplicates()) {
			return this._handleValidationError('ipRestrictionsDuplicateError');
		}

		if (!this._hasValidRanges()) {
			return this._handleValidationError('ipRestrictionsRangeError');
		}

		this._resizeDialog();

		return false;
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
	'd2l-activity-quiz-ip-restrictions-container',
	ActivityQuizIpRestrictionsContainer
);
