import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { formatDate } from '@brightspace-ui/intl/lib/dateTime.js';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

class ActivityAvailabilityDatesSummary
	extends ActivityEditorMixin(LocalizeActivityEditorMixin(MobxLitElement)) {

	constructor() {
		super();
		this._overrides = document.documentElement.dataset.intlOverrides || '{}';
	}

	render() {

		const activity = store.get(this.href);
		if (!activity) {
			return html``;
		}

		const startDate = this._formatDate(activity.dates.startDate);
		const endDate = this._formatDate(activity.dates.endDate);

		let text;

		if (startDate && endDate) {
			text = this.localize('editor.txtAvailabilityStartAndEnd', { startDate, endDate });
		} else if (startDate) {
			text = this.localize('editor.txtAvailabilityStartOnly', { startDate });
		} else if (endDate) {
			text = this.localize('editor.txtAvailabilityEndOnly', { endDate });
		} else {
			text = this.localize('editor.txtAvailabilityNeither');
		}

		return html`${text}`;
	}
	updated(changedProperties) {

		super.updated(changedProperties);

		const didHrefTokenChange =
			changedProperties.has('href') ||
			changedProperties.has('token');

		if (didHrefTokenChange && this.href && this.token) {

			super._fetch(() => store.fetch(this.href, this.token));
		}
	}

	_formatDate(suspiciousString) {

		if (!suspiciousString) {
			return null;
		}

		const date = new Date(suspiciousString);

		if (isNaN(date.getTime())) {
			return null;
		}

		return formatDate(date);
	}
}
customElements.define(
	'd2l-activity-availability-dates-summary',
	ActivityAvailabilityDatesSummary
);
