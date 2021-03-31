import '@brightspace-ui/core/components/icons/icon.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { sharedTiming as store } from './state/quiz-store';

class ActivityQuizTimingSummary
	extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {

	constructor() {
		super(store);
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}
		const { isTimingEnforced, recommendedTimeLimit, enforcedTimeLimit } = entity;
		const timeLimit = isTimingEnforced ? enforcedTimeLimit.value : recommendedTimeLimit.value;
		const quizTimingSummary = isTimingEnforced ? 'quizTimingEnforcedSummary' : 'quizTimingRecommendedSummary';
		return html`${this.localize(quizTimingSummary, 'numMinutes', timeLimit)}`;
	}
}

customElements.define(
	'd2l-activity-quiz-timing-summary',
	ActivityQuizTimingSummary
);
