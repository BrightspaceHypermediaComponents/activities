import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LitQuickEvalLocalize } from '../LitQuickEvalLocalize.js';
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
			.radio-container {
				margin-top: 0.5rem;
			}
			.datepicker-container {
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
				<div class="radio-container">
					<label class="d2l-input-radio-label">
						<input @change="${this._updateProp.bind(this, DISMISS_TYPES.date)}" type="radio" name="${groupID}">
						${this.localize('specificDate')}
					</label>
					${this.renderDatePicker(this.selectedRadio)}
					<label class="d2l-input-radio-label">
						<input @change="${this._updateProp.bind(this, DISMISS_TYPES.forever)}" type="radio" name="${groupID}">
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

	open() {
		return this._getDialog().open();
	}

	_getDialog() {
		return this.shadowRoot.querySelector('d2l-dialog');
	}

	_updateProp(propName) {
		this.selectedRadio = propName;
		this._getDialog().resize();
	}

	renderDatePicker(selectedRadio) {
		if (selectedRadio === DISMISS_TYPES.date) {
			return html`
				<div class="datepicker-container">
					<d2l-datetime-picker
						@d2l-datetime-picker-datetime-changed="${this._onDatetimePickerDatetimeChanged}"
						@d2l-datetime-picker-datetime-cleared="${this._onDatetimePickerDatetimeCleared}"
						placeholder="MM|DD|YYYY"
						hide-label
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
	}

	computeAction(selectedRadio, date) {
		return JSON.stringify({ selectedRadio, date });
	}

}

window.customElements.define('d2l-quick-eval-action-dismiss-dialog', D2LQuickEvalActionDialog);
