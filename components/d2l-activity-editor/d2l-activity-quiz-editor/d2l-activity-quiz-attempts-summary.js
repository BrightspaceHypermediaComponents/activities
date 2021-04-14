import '@brightspace-ui/core/components/icons/icon.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { sharedAttempts as store } from './state/quiz-store';

class ActivityQuizAttemptsSummary
	extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {

	constructor() {
		super(store);
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}
		const { attemptsAllowed } = entity || {};
		if (attemptsAllowed === undefined || attemptsAllowed === null) {
			return html``;
		}

		return html`${this.localize('quizAttemptsAllowedSummary', 'numAttemptsAllowed', attemptsAllowed)}`;
	}
}

customElements.define(
	'd2l-activity-quiz-attempts-summary',
	ActivityQuizAttemptsSummary
);
