import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from './localization';
import { html } from 'lit-element/lit-element';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from '../../components/d2l-activity-editor/state/activity-store.js';

class ActivityCompetenciesSummary
	extends ActivityEditorMixin(LocalizeMixin(MobxLitElement)) {

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super(store);
	}

	render() {
		const activity = store.get(this.href);
		if (!activity || !activity.competenciesHref) {
			return html``;
		}

		const count = activity.associatedCompetenciesCount;
		if (!count) {
			return html``;
		}

		return html`${this.localize('competenciesCount', { count })}`;
	}
}

customElements.define(
	'd2l-activity-competencies-summary',
	ActivityCompetenciesSummary
);
