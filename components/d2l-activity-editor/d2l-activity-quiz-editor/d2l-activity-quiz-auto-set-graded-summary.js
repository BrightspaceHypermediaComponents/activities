import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/quiz-store';

class ActivityQuizAutoSetGradedSummary
	extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {

	constructor() {
		super(store);
	}

	render() {
		const activity = store.get(this.href);
		if (!activity) {
			return html``;
		}

		const isAutoSetHintsEnabled = activity.isAutoSetGradedEnabled;
		if (!isAutoSetHintsEnabled) {
			return html``;
		}

		return html`${this.localize('autoSetGradedSummary')}`;
	}
}

customElements.define(
	'd2l-activity-quiz-auto-set-graded-summary',
	ActivityQuizAutoSetGradedSummary
);
