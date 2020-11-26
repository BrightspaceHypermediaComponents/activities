import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { ErrorHandlingMixin } from '../error-handling-mixin.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store';
import '@brightspace-ui/core/components/inputs/input-text.js';
import 'd2l-tooltip/d2l-tooltip';

class ActivityQuizNotificationEmailEditor
	extends ActivityEditorMixin(ErrorHandlingMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)))) {

	static get properties() {
		return {
			_notificationEmailError: { type: String }
		};
	}

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

		return html`
			<div>
				<d2l-input-text
					id="quiz-notification-email"
					label="${this.localize('emailNotificationDescription')}"
					value="${entity.notificationEmail}"
					maxlength="1024"
					?disabled="${!entity.canEditNotificationEmail}"
					@change="${this._onNotificationEmailChanged}"
					@blur="${this._checkNotificationEmail}"
					aria-invalid="${this._notificationEmailError ? 'true' : ''}"
					skip-alert
					novalidate>
				</d2l-input-text>
				${this._getNotificationEmailTooltip()}
			</div>
		`;
	}

	_checkNotificationEmail(e) {
		const errorProperty = '_notificationEmailError';
		const invalidNotificationEmailErrorLangterm = 'invalidNotificationEmailError';
		const tooltipId = 'quiz-notification-email-tooltip';

		const notificationEmail = e.target.value;
		const isEmpty = (notificationEmail || '').length === 0;

		const matches = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/.exec(notificationEmail);
		if (!isEmpty && matches === null) {
			this.setError(errorProperty, invalidNotificationEmailErrorLangterm, tooltipId);
		} else {
			this.clearError(errorProperty);
		}
	}

	_getNotificationEmailTooltip() {
		if (this._notificationEmailError) {
			return html`
				<d2l-tooltip id="quiz-notification-email-tooltip" for="quiz-notification-email" state="error" align="start" offset="10">
					${this._notificationEmailError}
				</d2l-tooltip>
			`;
		}
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
