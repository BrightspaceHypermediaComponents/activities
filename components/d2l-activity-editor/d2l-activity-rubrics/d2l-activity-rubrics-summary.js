import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from '../localization';
import { html } from 'lit-element/lit-element';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import store from '../d2l-activity-rubrics/state/association-collection-store.js';

class ActivityRubricsSummary
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

		const associationsCount = entity.fetchAttachedAssociationsCount();
		if (associationsCount <= 0) {
			return html`${this.localize('txtNoRubricAdded')}`;
		}

		return html`${this.localize('txtRubricsAdded', 'count', associationsCount)}`;
	}
}

customElements.define(
	'd2l-activity-rubrics-summary',
	ActivityRubricsSummary
);
