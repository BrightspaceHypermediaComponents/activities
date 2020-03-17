import './d2l-activity-conditions-summary.js';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { html } from 'lit-element/lit-element';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

class ActivityUsageConditionsSummary extends ActivityEditorMixin(MobxLitElement) {

	constructor() {

		super(store);
	}

	render() {

		const entity = store.get(this.href);
		if (!entity || !entity.conditionsHref) {
			return html``;
		}

		return html`
			<d2l-activity-conditions-summary
				href="${entity.conditionsHref}"
				.token="${this.token}">
			</d2l-activity-conditions-summary>
		`;
	}
}

customElements.define(
	'd2l-activity-usage-conditions-summary',
	ActivityUsageConditionsSummary
);
