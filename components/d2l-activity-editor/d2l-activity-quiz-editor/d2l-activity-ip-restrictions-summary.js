import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { sharedIpRestrictions as store } from './state/quiz-store';

class ActivityQuizIpRestrictionsSummary extends ActivityEditorMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)) {

	constructor() {
		super(store);
	}

	render() {
		const ipEntity = store.get(this.href);
		if (!ipEntity || !ipEntity.ipRestrictions || ipEntity.ipRestrictions.length === 0 || !ipEntity.ipRestrictions[0].start) {
			return html``;
		}

		return html`${this.localize('ipRestrictionsSummary')}`;
	}
}

customElements.define(
	'd2l-activity-ip-restrictions-summary',
	ActivityQuizIpRestrictionsSummary
);
