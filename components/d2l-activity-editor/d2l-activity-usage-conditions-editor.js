import './d2l-activity-conditions-editor.js';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { html } from 'lit-element/lit-element';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

class ActivityUsageConditionsEditor extends ActivityEditorMixin(MobxLitElement) {

	static get properties() {

		return {
			description: { type: String }
		};
	}

	constructor() {

		super(store);
	}

	render() {

		const entity = store.get(this.href);
		if (!entity || !entity.conditionsHref) {
			return html``;
		}

		return html`
			<d2l-activity-conditions-editor
				description="${this.description}"
				?can-edit="${entity.canEditReleaseConditions}"
				href="${entity.conditionsHref}"
				.token="${this.token}">
			</d2l-activity-conditions-editor>
		`;
	}

	hasPendingChanges() {
		const entity = store.get(this.href);
		if (!entity) {
			return false;
		}

		return entity.dirty();
	}
}

customElements.define(
	'd2l-activity-usage-conditions-editor',
	ActivityUsageConditionsEditor
);
