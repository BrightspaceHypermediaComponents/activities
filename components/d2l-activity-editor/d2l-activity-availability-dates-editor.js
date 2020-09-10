import 'd2l-datetime-picker/d2l-datetime-picker';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

class ActivityAvailabilityDatesEditor extends (ActivityEditorMixin(LocalizeActivityEditorMixin(MobxLitElement))) {
	static get styles() {
		return [labelStyles, css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			#startdate-container,
			#enddate-container {
				min-height: 62px; /* Hack to force a consistent the height for the old datetime picker. Can hopefully be removed when the new picker is used. */
			}
		`];
	}

	constructor() {
		super();
		this._overrides = document.documentElement.dataset.intlOverrides || '{}';
	}

	render() {
		const entity = store.get(this.href);
		const dates = entity ? entity.dates : null;
		let canEditDates, startDate, endDate, startDateErrorTerm, endDateErrorTerm;

		if (!dates) {
			canEditDates = false;
			startDate = null;
			endDate = null;
			startDateErrorTerm = null;
			endDateErrorTerm = null;
		} else {
			canEditDates = dates.canEditDates;
			startDate = dates.startDate;
			endDate = dates.endDate;
			startDateErrorTerm = this.localize(dates.startDateErrorTerm);
			endDateErrorTerm = this.localize(dates.endDateErrorTerm);
		}

		return html`
			<label class="d2l-label-text" ?hidden=${!canEditDates}>${this.localize('editor.startDate')}</label>
			<div id="startdate-container" ?hidden=${!canEditDates}>
				<d2l-datetime-picker
					hide-label
					name="startDate"
					id="startDate"
					date-label="${this.localize('editor.startDate')}"
					time-label="${this.localize('editor.startTime')}"
					datetime="${startDate}"
					overrides="${this._overrides}"
					placeholder="${this.localize('editor.noStartDate')}"
					aria-invalid="${startDateErrorTerm ? 'true' : 'false'}"
					invalid="${startDateErrorTerm}"
					tooltip-red
					boundary="{&quot;below&quot;:240}"
					@d2l-datetime-picker-datetime-changed="${this._onStartDatetimePickerDatetimeChanged}"
					@d2l-datetime-picker-datetime-cleared="${this._onStartDatetimePickerDatetimeCleared}">
				</d2l-datetime-picker>
			</div>
			<label class="d2l-label-text" ?hidden=${!canEditDates}>${this.localize('editor.endDate')}</label>
			<div id="enddate-container" ?hidden=${!canEditDates}>
				<d2l-datetime-picker
					hide-label
					name="endDate"
					id="endDate"
					date-label="${this.localize('editor.endDate')}"
					time-label="${this.localize('editor.endTime')}"
					datetime="${endDate}"
					overrides="${this._overrides}"
					placeholder="${this.localize('editor.noEndDate')}"
					aria-invalid="${endDateErrorTerm ? 'true' : 'false'}"
					invalid="${endDateErrorTerm}"
					tooltip-red
					boundary="{&quot;below&quot;:240}"
					@d2l-datetime-picker-datetime-changed="${this._onEndDatetimePickerDatetimeChanged}"
					@d2l-datetime-picker-datetime-cleared="${this._onEndDatetimePickerDatetimeCleared}">
				</d2l-datetime-picker>
			</div>
		`;
	}
	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			super._fetch(() => store.fetch(this.href, this.token));
		}
	}
	_onEndDatetimePickerDatetimeChanged(e) {
		store.get(this.href).dates.setEndDate(e.detail.toISOString());
	}
	_onEndDatetimePickerDatetimeCleared() {
		store.get(this.href).dates.setEndDate('');
	}
	_onStartDatetimePickerDatetimeChanged(e) {
		store.get(this.href).dates.setStartDate(e.detail.toISOString());
	}
	_onStartDatetimePickerDatetimeCleared() {
		store.get(this.href).dates.setStartDate('');
	}

}
customElements.define('d2l-activity-availability-dates-editor', ActivityAvailabilityDatesEditor);
