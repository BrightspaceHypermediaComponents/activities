import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from '../../components/d2l-activity-editor/state/activity-store.js';

class ActivityCompetenciesSummary
	extends ActivityEditorMixin(LocalizeActivityEditorMixin(MobxLitElement)) {

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

		if (count === 0) {
			return html`${this.localize('editor.noLearningObjectives')}`;
		} else {
			return html`${this.localize('editor.competenciesCountSummary', { count })}`;
		}
	}
}

customElements.define(
	'd2l-activity-competencies-summary',
	ActivityCompetenciesSummary
);
