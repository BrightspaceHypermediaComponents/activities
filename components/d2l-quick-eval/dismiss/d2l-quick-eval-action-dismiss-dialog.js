import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LitQuickEvalLocalize } from '../QuickEvalLocalize.js';
import { getDocumentLocaleSettings } from '@brightspace-ui/intl/lib/common.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { labelStyles, bodyStandardStyles } from '@brightspace-ui/core/components/typography/styles.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/button/button.js';
import 'd2l-datetime-picker/d2l-datetime-picker.js';
import 'd2l-polymer-behaviors/d2l-id.js';
import { DISMISS_TYPES } from './dismiss-types.js';

// shim for vaadin calendar to overlay on top of the dialog
(()=>{
	if (window.D2L && window.D2L.DialogMixin && window.D2L.DialogMixin.preferNative) {
		window.D2L.DialogMixin.preferNative = false;
	}

	const styling = `
		vaadin-date-picker-overlay {
			z-index: 1000;
		}
	`;
	const head = document.head || document.getElementsByTagName('head')[0];
	const style = document.createElement('style');
	head.appendChild(style);
	style.type = 'text/css';
	style.appendChild(document.createTextNode(styling));
})();

class D2LQuickEvalActionDialog extends RtlMixin(LitQuickEvalLocalize(LitElement)) {

	static get properties() {
		return {
			_date: String,
			selectedRadio: String,
		};
	}

	static get styles() {
		return [ labelStyles, bodyStandardStyles, radioStyles, css`
			.d2l-radio-container {
				margin-top: 0.5rem;
			}
			.d2l-datepicker-container {
				margin-bottom: 0.9rem;
			}
			` ];
	}

	render() {
		const groupID = this._genGroupID();

		return html`
			<d2l-dialog title-text="${this.localize('dismissActivity')}">
				<div class="d2l-body-standard">${this.localize('dismissingAnActivityHides')}</div>
				<br/>
				<p class="d2l-label-text">${this.localize('dismissUntil')}</p>
				<div class="d2l-radio-container">
					<label class="d2l-input-radio-label">
						<input
						id="dismiss-action-dialog-radio-input-nextSubmission"
						type="radio"
						name="${groupID}"
						.checked="${this.selectedRadio === DISMISS_TYPES.nextSubmission}"
						@change="${this._updateProp.bind(this, DISMISS_TYPES.nextSubmission)}">
						${this.localize('nextSubmission')}
					</label>
					<label class="d2l-input-radio-label">
						<input
						id="dismiss-action-dialog-radio-input-specificDate"
						type="radio"
						name="${groupID}"
						.checked="${this.selectedRadio === DISMISS_TYPES.date}"
						@change="${this._updateProp.bind(this, DISMISS_TYPES.date)}">
						${this.localize('specificDate')}
					</label>
					${this.renderDatePicker(this.selectedRadio)}
					<label class="d2l-input-radio-label">
						<input
						id="dismiss-action-dialog-radio-input-forever"
						type="radio"
						name="${groupID}"
						.checked="${this.selectedRadio === DISMISS_TYPES.forever}"
						@change="${this._updateProp.bind(this, DISMISS_TYPES.forever)}">
						${this.localize('forever')}
					</label>
				</div>
				<d2l-button
					slot="footer"
					primary
					dialog-action="${this.computeAction(this.selectedRadio, this._date)}"
				>${this.localize('dismissActivity')}</d2l-button>
				<d2l-button slot="footer" dialog-action>${this.localize('cancel')}</d2l-button>
			</d2l-dialog>
		`;
	}

	updated(changedProperties) {
		super.updated();
		if (changedProperties.has('selectedRadio')) {
			this._getDialog().resize();
		}
	}

	_clearSelectedOptions() {
		this.selectedRadio = null;
		this._date = null;
	}

	open() {
		this._clearSelectedOptions();
		return this._getDialog().open();
	}

	_getDialog() {
		return this.shadowRoot.querySelector('d2l-dialog');
	}

	_updateProp(propName) {
		this.selectedRadio = propName;
		this._getDialog().resize();
	}

	_getIso8601Date(date) {
		const timezone = getDocumentLocaleSettings().timezone.identifier;

		if (timezone) {
			return date.tz(timezone).format('YYYY-MM-DD');
		} else {
			return date.format('YYYY-MM-DD');
		}
	}

	renderDatePicker(selectedRadio) {
		/* global moment:false */
		const now = moment();
		const minDate = this._getIso8601Date(now);

		if (selectedRadio === DISMISS_TYPES.date) {
			return html`
				<div class="d2l-datepicker-container">
					<d2l-datetime-picker
						@d2l-datetime-picker-datetime-changed="${this._onDatetimePickerDatetimeChanged}"
						@d2l-datetime-picker-datetime-cleared="${this._onDatetimePickerDatetimeCleared}"
						placeholder="MM|DD|YYYY"
						min="${minDate}"
						hide-label
						always-show-time
					></d2l-datetime-picker>
				</div>
			`;
		}
		return null;
	}

	_genGroupID() {
		return D2L.Id.getUniqueId();
	}

	_onDatetimePickerDatetimeCleared() {
		this.date = undefined;
	}

	_onDatetimePickerDatetimeChanged(e) {
		this._date = e.detail.toISOString();
		this._getDialog().resize();
	}

	computeAction(selectedRadio, date) {
		return JSON.stringify({ selectedRadio, date });
	}

}

window.customElements.define('d2l-quick-eval-action-dismiss-dialog', D2LQuickEvalActionDialog);
