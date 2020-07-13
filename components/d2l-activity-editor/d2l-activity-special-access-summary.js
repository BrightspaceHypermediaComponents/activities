import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from './localization';
import { html } from 'lit-element/lit-element';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

class ActivitySpecialAccessSummary extends ActivityEditorMixin(LocalizeMixin(MobxLitElement)) {

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super(store);
	}

	_renderSummary(specialAccess) {
		const { userCount } = specialAccess;

		if (userCount === 0) {
			return html``;
		} else {
			return html`${this.localize('txtNumSpecialAccess', { userCount })}`;
		}
	}

	render() {

		const entity = store.get(this.href);
		if (!entity || !entity.specialAccess) {
			return html``;
		} else {
			return html`${this._renderSummary(entity.specialAccess)}`;
		}
	}
}

customElements.define(
	'd2l-activity-special-access-summary',
	ActivitySpecialAccessSummary
);
