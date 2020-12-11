import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/quiz-store';

class ActivityQuizPreventMovingBackwardsSummary
	extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {

	constructor() {
		super(store);
	}

	render() {
		const activity = store.get(this.href);
		if (!activity) {
			return html``;
		}

		const isPreventMovingBackwardsEnabled = activity.isPreventMovingBackwardsEnabled;
		if (!isPreventMovingBackwardsEnabled) {
			return html``;
		}

		return html`${this.localize('preventMovingBackwardsSummary')}`;
	}
}

customElements.define(
	'd2l-activity-quiz-prevent-moving-backwards-summary',
	ActivityQuizPreventMovingBackwardsSummary
);
