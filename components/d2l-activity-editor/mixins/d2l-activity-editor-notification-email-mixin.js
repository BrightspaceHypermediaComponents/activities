import { ErrorHandlingMixin } from '../error-handling-mixin.js';
import { html } from 'lit-element/lit-element.js';
import { LocalizeActivityEditorMixin } from './d2l-activity-editor-lang-mixin.js';
import 'd2l-tooltip/d2l-tooltip';

export const ActivityEditorNotificationEmailMixin = superclass => class extends ErrorHandlingMixin(LocalizeActivityEditorMixin(superclass)) {

    static get properties() {
		return {
			notificationEmailError: { type: String }
		};
	}

    checkNotificationEmail(e) {
		const errorProperty = 'notificationEmailError';
		const invalidNotificationEmailErrorLangterm = 'editor.invalidNotificationEmailError';
		const tooltipId = 'notification-email-tooltip';

		const notificationEmail = e.target.value;
		const isEmpty = (notificationEmail || '').length === 0;

		const matches = /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/.exec(notificationEmail);
		if (!isEmpty && matches === null) {
			this.setError(errorProperty, invalidNotificationEmailErrorLangterm, tooltipId);
		} else {
			this.clearError(errorProperty);
		}
	}

	getNotificationEmailTooltip(id) {
		if (this.notificationEmailError) {
			return html`
				<d2l-tooltip id="notification-email-tooltip" for="${id}" state="error" align="start" offset="10">
					${this.notificationEmailError}
				</d2l-tooltip>
			`;
		}
    }
};
