import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { bodyStandardStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as store } from '../state/activity-store.js';

class ActivityQuizEditorActionBar extends ActivityEditorMixin(SkeletonMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)))) {

	static get styles() {
		return [
			super.styles,
			bodyStandardStyles,
			css`
				.d2l-action-bar-container {
					display: flex;
					justify-content: flex-end;
					margin-bottom: 1rem;
					margin-top: 1rem;
				}`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		const { scoreOutOf } = entity || {};
		return html`
            <div class='d2l-action-bar-container d2l-skeletize'>
                ${scoreOutOf ? html`<div class='d2l-body-standard'>${this.localize('totalPoints', { scoreOutOf })}</div>` : null }
            </div>
		`;
	}

}

customElements.define(
	'd2l-activity-quiz-editor-action-bar',
	ActivityQuizEditorActionBar
);
