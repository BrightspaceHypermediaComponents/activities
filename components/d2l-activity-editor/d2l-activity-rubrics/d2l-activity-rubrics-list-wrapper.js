import './d2l-activity-rubrics-list-container';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from '../localization';
import { html } from 'lit-element/lit-element';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from '../state/activity-store';

class ActivityRubricsListWrapper
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
		return html`
			<d2l-activity-rubrics-list-container
				href="${entity.associationsHref}"
				.token="${this.token}"
				.activityUsageHref=${this.href}>
			</d2l-activity-rubrics-list-container>
		`;
	}
}

customElements.define(
	'd2l-activity-rubrics-list-wrapper',
	ActivityRubricsListWrapper
);
