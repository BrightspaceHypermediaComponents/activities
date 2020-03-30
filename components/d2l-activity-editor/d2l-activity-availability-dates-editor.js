import 'd2l-datetime-picker/d2l-datetime-picker';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from './localization';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

class ActivityAvailabilityDatesEditor extends (ActivityEditorMixin(LocalizeMixin(MobxLitElement))) {
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

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this._overrides = document.documentElement.dataset.intlOverrides || '{}';
	}

	_onStartDatetimePickerDatetimeCleared() {
		store.get(this.href).dates.setStartDate('');
	}

	_onStartDatetimePickerDatetimeChanged(e) {
		store.get(this.href).dates.setStartDate(e.detail.toISOString());
	}

	_onEndDatetimePickerDatetimeCleared() {
		store.get(this.href).dates.setEndDate('');
	}

	_onEndDatetimePickerDatetimeChanged(e) {
		store.get(this.href).dates.setEndDate(e.detail.toISOString());
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
			<label class="d2l-label-text" ?hidden=${!canEditDates}>${this.localize('startDate')}</label>
			<div id="startdate-container" ?hidden=${!canEditDates}>
				<d2l-datetime-picker
					hide-label
					name="startDate"
					id="startDate"
					date-label="${this.localize('startDate')}"
					time-label="${this.localize('startTime')}"
					datetime="${startDate}"
					overrides="${this._overrides}"
					placeholder="${this.localize('noStartDate')}"
					aria-invalid="${startDateErrorTerm ? 'true' : 'false'}"
					invalid="${startDateErrorTerm}"
					tooltip-red
					boundary="{&quot;below&quot;:240}"
					@d2l-datetime-picker-datetime-changed="${this._onStartDatetimePickerDatetimeChanged}"
					@d2l-datetime-picker-datetime-cleared="${this._onStartDatetimePickerDatetimeCleared}">
				</d2l-datetime-picker>
			</div>
			<label class="d2l-label-text" ?hidden=${!canEditDates}>${this.localize('endDate')}</label>
			<div id="enddate-container" ?hidden=${!canEditDates}>
				<d2l-datetime-picker
					hide-label
					name="endDate"
					id="endDate"
					date-label="${this.localize('endDate')}"
					time-label="${this.localize('endTime')}"
					datetime="${endDate}"
					overrides="${this._overrides}"
					placeholder="${this.localize('noEndDate')}"
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
}
customElements.define('d2l-activity-availability-dates-editor', ActivityAvailabilityDatesEditor);
