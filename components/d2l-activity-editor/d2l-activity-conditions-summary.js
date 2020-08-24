import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import store from './state/conditions-store.js';

class ActivityConditionsSummary
	extends ActivityEditorMixin(LocalizeActivityEditorMixin(MobxLitElement)) {

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

		return html`${this.localize('editor.txtNumReleaseConditions', { count })}`;
	}
}

customElements.define(
	'd2l-activity-conditions-summary',
	ActivityConditionsSummary
);
