import 'd2l-inputs/d2l-input-text.js';
import 'd2l-tooltip/d2l-tooltip';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ErrorHandlingMixin } from './error-handling-mixin.js';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityNotificationEmailEditor
	extends RtlMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(LitElement))) {

	static get properties() {
		return {
			_notificationEmailError: { type: String },
			disabled: { type: Boolean },
			value: { type: String }
		};
	}

	static get styles() {

		return [
			labelStyles,
			bodySmallStyles,
			css`
				:host {
					display: block;
				}

				:host([hidden]) {
					display: none;
				}

				#notification-email {
					margin-bottom: 2px;
					margin-top: 10px;
				}

				#notification-email-tooltip {
					z-index: auto;
				}

				::slotted(p[slot=description]) {
					margin-top: 10px;
				}
			`
		];
	}

	render() {
		return html`
			<div id="notification-email-editor-label" class="d2l-label-text">
				${this.localize('editor.notificationEmailLabel')}
			</div>
			<slot name="description" class="d2l-body-small"></slot>

			<d2l-input-text
				id="notification-email"
				label="${this.localize('editor.notificationEmailLabel')}"
				label-hidden
				value="${this.value}"
				maxlength="1024"
				?disabled="${this.disabled}"
				@change="${this._onNotificationEmailChanged}"
				@blur="${this._checkNotificationEmail}"
				aria-invalid="${this._notificationEmailError ? 'true' : ''}"
				skip-alert
				novalidate>
			</d2l-input-text>
			${this._getNotificationEmailTooltip()}
		`;
	}

	_checkNotificationEmail(e) {
		const errorProperty = '_notificationEmailError';
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

	_getNotificationEmailTooltip() {
		if (this._notificationEmailError) {
			return html`
				<d2l-tooltip id="notification-email-tooltip" for="notification-email" state="error" align="start" offset="10">
					${this._notificationEmailError}
				</d2l-tooltip>
			`;
		}
	}

	_onNotificationEmailChanged(event) {
		this.dispatchEvent(new CustomEvent('activity-notification-email-changed', {
			bubbles: true,
			composed: true,
			detail: {
				value: event.target.value
			}
		}));
	}
}

customElements.define(
	'd2l-activity-notification-email-editor',
	ActivityNotificationEmailEditor
);
