import 'd2l-inputs/d2l-input-text.js';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html } from 'lit-element/lit-element.js';
import { accordionStyles } from '../styles/accordion-styles';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store.js';

class ActivityQuizPasswordEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object }
		};
	}

	static get styles() {

		return [
			labelStyles,
			bodySmallStyles,
			accordionStyles,
			css`
				#password-input {
					margin-bottom: 2px;
					margin-top: 10px;
				}
			`
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

		return html`
			<div class="d2l-label-text">
				${this.localize('passwordLabel')}
			</div>
			<p class="d2l-body-small">
				${this.localize('passwordDescription')}
			</p>
			<d2l-input-text
				id="password-input"
				?skeleton="${this.skeleton}"
				maxlength="20"
				value="${entity.password}"
				@input="${this._setPassword}"
				label="${this.localize('passwordLabel')}"
				label-hidden
				?disabled="${!entity.canEditPassword}"
				prevent-submit>
			</d2l-input-text>
		`;
	}

	_setPassword(event) {
		const entity = store.get(this.href);

		if (!entity) {
			return;
		}

		entity.setPassword(event.target.value);
	}
}

customElements.define(
	'd2l-activity-quiz-password-editor',
	ActivityQuizPasswordEditor
);
