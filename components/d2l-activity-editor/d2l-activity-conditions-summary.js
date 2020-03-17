import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from './localization';
import { html } from 'lit-element/lit-element';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import store from './state/conditions-store.js';

class ActivityConditionsSummary
	extends ActivityEditorMixin(LocalizeMixin(MobxLitElement)) {

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super(store);
	}

	render() {

		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		const count = entity.conditions.length;
		if (count <= 0) {
			return html``;
		}

		return html`${this.localize('txtNumReleaseConditions', { count })}`;
	}
}

customElements.define(
	'd2l-activity-conditions-summary',
	ActivityConditionsSummary
);
