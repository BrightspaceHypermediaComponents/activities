import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { formatDate } from '@brightspace-ui/intl/lib/dateTime.js';
import { getLocalizeResources } from './localization';
import { html } from 'lit-element/lit-element';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

class ActivityAvailabilityDatesSummary
	extends ActivityEditorMixin(LocalizeMixin(MobxLitElement)) {

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this._overrides = document.documentElement.dataset.intlOverrides || '{}';
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

	render() {

		const activity = store.get(this.href);
		if (!activity) {
			return html``;
		}

		const startDate = this._formatDate(activity.startDate);
		const endDate = this._formatDate(activity.endDate);

		let text;

		if (startDate && endDate) {
			text = this.localize('txtAvailabilityStartAndEnd', { startDate, endDate });
		} else if (startDate) {
			text = this.localize('txtAvailabilityStartOnly', { startDate });
		} else if (endDate) {
			text = this.localize('txtAvailabilityEndOnly', { endDate });
		} else {
			text = this.localize('txtAvailabilityNeither');
		}

		return html`${text}`;
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
