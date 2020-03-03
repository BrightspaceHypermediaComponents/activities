import 'd2l-alert';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

class ActivityEditorAlert extends ActivityEditorMixin(MobxLitElement) {

	static get properties() {
		return {
			/**
			 * Text to be displayed in the alert
			 */
			text: { type: String }
		};
	}

	static get styles() {
		return css`
			d2l-alert {
				margin-bottom: 10px;
				max-width: 100%;
			}
		`;
	}

	render() {
		const activity = store.get(this.href);
		const showAlert = this.text && activity && activity.isError;
		if (!showAlert) {
			return html``;
		}

		return html`
			<d2l-alert type="error">${this.text}</d2l-alert>
		`;
	}
}
customElements.define('d2l-activity-editor-alert', ActivityEditorAlert);
