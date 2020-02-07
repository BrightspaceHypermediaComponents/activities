import 'd2l-datetime-picker/d2l-datetime-picker';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

class ActivityDueDateEditor extends ActivityEditorMixin(LocalizeMixin(MobxLitElement)) {

	static get properties() {
		return {
			_overrides: { type: Object }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this._overrides = document.documentElement.dataset.intlOverrides || '{}';
	}

	_onDatetimePickerDatetimeCleared() {
		store.get(this.href).setDueDate('');
	}

	_onDatetimePickerDatetimeChanged(e) {
		store.get(this.href).setDueDate(e.detail.toISOString());
	}

	dateTemplate(date, canEdit) {
		return html`
			<div id="datetime-picker-container" ?hidden="${!canEdit}">
				<d2l-datetime-picker
					hide-label
					name="date"
					id="date"
					date-label="${this.localize('dueDate')}"
					time-label="${this.localize('dueTime')}"
					datetime="${date}"
					overrides="${this._overrides}"
					placeholder="${this.localize('noDueDate')}"
					@d2l-datetime-picker-datetime-changed="${this._onDatetimePickerDatetimeChanged}"
					@d2l-datetime-picker-datetime-cleared="${this._onDatetimePickerDatetimeCleared}">
				</d2l-datetime-picker>
			</div>
		`;
	}

	render() {
		const activity = store.get(this.href);
		let dueDate, canEditDueDate;

		// We have to render with null values for dueDate initially due to issues with
		// how the d2l-datetime-picker converts between the date & datetime attributes.
		// If we delay rendering until we have a valid datetime, the d2l-datetime-picker
		// overwrites the datetime attribute with an emptydate.
		// Don't want to mess with the datetime picker...
		// Tried passing an invalid date attribute to force it to use our datetime attribute
		// but the 2-way data binding with the vaadin date picker always overrides it
		// Will be able to fix when we have a new data time component.
		if (!activity) {
			dueDate = null;
			canEditDueDate = false;
		} else {
			dueDate = activity.dueDate;
			canEditDueDate = activity.canEditDueDate;
		}

		return html`
			${this.dateTemplate(dueDate, canEditDueDate)}
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
customElements.define('d2l-activity-due-date-editor', ActivityDueDateEditor);
