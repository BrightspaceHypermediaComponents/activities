import 'd2l-datetime-picker/d2l-datetime-picker';
import { css, html, LitElement } from 'lit-element/lit-element';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { getLocalizeResources } from './localization';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { SaveStatusMixin } from './save-status-mixin';

class ActivityAvailabilityDatesEditor extends SaveStatusMixin(EntityMixinLit(LocalizeMixin(LitElement))) {

	static get properties() {
		return {
			_startDate: { type: String },
			_endDate: { type: String },
			_overrides: { type: Object },
			_canEditStartDate: {type: Boolean},
			_canEditEndDate: {type: Boolean},
		};
	}

	static get styles() {
		return [labelStyles, css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
		`];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this._setEntityType(ActivityUsageEntity);
		this._endDate = '';
		this._startDate = '';
		this._canEditStartDate = false;
		this._canEditEndDate = false;
		this._overrides = document.documentElement.dataset.intlOverrides || '{}';
	}

	set _entity(entity) {
		if (!this._entityHasChanged(entity)) {
			return;
		}

		if (entity) {
			this._startDate = entity.startDate();
			this._endDate = entity.endDate();
			this._canEditStartDate = entity.canEditStartDate();
			this._canEditEndDate = entity.canEditEndDate();
		}

		super._entity = entity;
	}

	_onStartDatetimePickerDatetimeCleared() {
		this.wrapSaveAction(super._entity.setStartDate(''));
	}

	_onStartDatetimePickerDatetimeChanged(e) {
		if (e.detail.isSame(this._startDate)) {
			return;
		}
		this.wrapSaveAction(super._entity.setStartDate(e.detail.toISOString()));
	}

	_onEndDatetimePickerDatetimeCleared() {
		this.wrapSaveAction(super._entity.setEndDate(''));
	}

	_onEndDatetimePickerDatetimeChanged(e) {
		if (e.detail.isSame(this._endDate)) {
			return;
		}

		this.wrapSaveAction(super._entity.setEndDate(e.detail.toISOString()));
	}

	render() {
		return html`
		<label class="d2l-label-text" ?hidden=${!this._canEditStartDate}>${this.localize('startDate')}</label>
		<div id="startdate-container" ?hidden=${!this._canEditStartDate}>
			<d2l-datetime-picker
				hide-label
				name="startDate"
				id="startDate"
				date-label="${this.localize('startDate')}"
				time-label="${this.localize('startTime')}"
				datetime="${this._startDate}"
				overrides="${this._overrides}"
				placeholder="${this.localize('noStartDate')}"
				@d2l-datetime-picker-datetime-changed="${this._onStartDatetimePickerDatetimeChanged}"
				@d2l-datetime-picker-datetime-cleared="${this._onStartDatetimePickerDatetimeCleared}">
			</d2l-datetime-picker>
		</div>
		<label class="d2l-label-text" ?hidden=${!this._canEditEndDate}>${this.localize('endDate')}</label>
		<div id="enddate-container" ?hidden=${!this._canEditEndDate}>
			<d2l-datetime-picker
				hide-label
				name="endDate"
				id="endDate"
				date-label="${this.localize('endDate')}"
				time-label="${this.localize('endTime')}"
				datetime="${this._endDate}"
				overrides="${this._overrides}"
				placeholder="${this.localize('noEndDate')}"
				@d2l-datetime-picker-datetime-changed="${this._onEndDatetimePickerDatetimeChanged}"
				@d2l-datetime-picker-datetime-cleared="${this._onEndDatetimePickerDatetimeCleared}">
			</d2l-datetime-picker>
		</div>
		`;
	}

}
customElements.define('d2l-activity-availability-dates-editor', ActivityAvailabilityDatesEditor);
