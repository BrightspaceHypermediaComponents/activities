import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from '../localization.js';
import { html } from 'lit-element/lit-element.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { assignments as store } from './state/assignment-store.js';

class ActivityAssignmentAnnotationsSummary
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

		const shouldRenderSummaryText =
			entity.canSeeAnnotations &&
			!entity.annotationToolsAvailable;
		if (!shouldRenderSummaryText) {
			return html``;
		}

		return html`${this.localize('txtAnnotationsOff')}`;
	}
}

customElements.define(
	'd2l-activity-assignment-annotations-summary',
	ActivityAssignmentAnnotationsSummary
);
