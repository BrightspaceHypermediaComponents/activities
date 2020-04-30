import '@brightspace-ui/core/components/icons/icon.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from '../localization';
import { html } from 'lit-element/lit-element';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { assignments as store } from './state/assignment-store.js';

class AssignmentTurnitinSummary
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

		const { isOriginalityCheckEnabled, isGradeMarkEnabled } = entity;

		if (isOriginalityCheckEnabled || isGradeMarkEnabled) {

			return html`${this.localize('txtTurnitinOn')}`;

		}

		return html``;
	}
}

customElements.define(
	'd2l-assignment-turnitin-summary',
	AssignmentTurnitinSummary
);
