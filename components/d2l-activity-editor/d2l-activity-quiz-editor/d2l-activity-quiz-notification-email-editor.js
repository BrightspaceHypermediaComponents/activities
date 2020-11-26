import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { ActivityEditorNotificationEmailMixin } from '../mixins/d2l-activity-editor-notification-email-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store';
import '@brightspace-ui/core/components/inputs/input-text.js';

class ActivityQuizNotificationEmailEditor
	extends ActivityEditorMixin(ActivityEditorNotificationEmailMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)))) {

	static get styles() {
		return [
			css`
			:host {
				display: block;
			}

			:host([hidden]) {
				display: none;
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

		const elemId = "quiz-notification-email";

		return html`
			<div>
				<d2l-input-text
					id="${elemId}"
					label="${this.localize('emailNotificationDescription')}"
					value="${entity.notificationEmail}"
					maxlength="1024"
					?disabled="${!entity.canEditNotificationEmail}"
					@change="${this._onNotificationEmailChanged}"
					@blur="${this.checkNotificationEmail}"
					aria-invalid="${this.notificationEmailError ? 'true' : ''}"
					skip-alert
					novalidate>
				</d2l-input-text>
				${this.getNotificationEmailTooltip(elemId)}
			</div>
		`;
	}

	_onNotificationEmailChanged(event) {
		const entity = store.get(this.href);
		entity.setNotificationEmail(event.target.value);
	}
}

customElements.define(
	'd2l-activity-quiz-notification-email-editor',
	ActivityQuizNotificationEmailEditor
);
