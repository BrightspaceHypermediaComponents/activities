import '@brightspace-ui/core/components/inputs/input-date-time.js';
import '@brightspace-ui/core/components/validation/validation-custom.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

class ActivityDueDateEditor extends ActivityEditorMixin(LocalizeActivityEditorMixin(MobxLitElement)) {

	static get styles() {
		return [labelStyles, css`
			:host([hidden]) {
				display: none;
			}
		`];
	}

	constructor() {
		super(store);
	}

	render() {
		const {
			canEditDates,
			dueDate,
			dueDateError
		} = this._getDateValues();

		if (!canEditDates) {
			return html``;
		}

		return html`
			<d2l-input-date-time
				id="due-date-input"
				label="${this.localize('editor.dueDate')}"
				value="${dueDate}"
				@change="${this._onDatetimeChanged}">
			</d2l-input-date-time>
			<d2l-validation-custom
				for="due-date-input"
				@d2l-validation-custom-validate=${this._validateDueDate}
				failure-text="${dueDateError}">
			</d2l-validation-custom>
		`;
	}

	updated(properties) {
		super.updated(properties);

		const dueDateInput = this.shadowRoot.querySelector('#due-date-input');
		if (dueDateInput) {
			dueDateInput.requestValidate();
		}
	}

	_getDateValues() {
		const datesEntity = {
			canEditDates: true,
			dueDate: null,
			dueDateError: null
		};

		const entity = store.get(this.href);
		if (!entity || !entity.dates) {
			return datesEntity;
		}

		const dates = entity.dates;

		if (!dates.canEditDates) {
			datesEntity.canEditDates = false;
			return datesEntity;
		}

		if (dates.dueDateErrorTerm) {
			datesEntity.dueDateError = this.localize(dates.dueDateErrorTerm);
		}

		if (dates.dueDate) {
			datesEntity.dueDate = dates.dueDate;
		}

		return datesEntity;
	}

	_onDatetimeChanged(e) {
		store.get(this.href).dates.setDueDate(e.target.value);
	}

	_validateDueDate(e) {
		const entity = store.get(this.href);
		if (!entity || !entity.dates || !entity.dates.canEditDates) {
			e.detail.resolve(true);
			return;
		}
		e.detail.resolve(!entity.dates.dueDateErrorTerm);
	}
}
customElements.define('d2l-activity-due-date-editor', ActivityDueDateEditor);
