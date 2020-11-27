import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { checkboxStyles } from '../styles/checkbox-styles.js';
import { html } from 'lit-element/lit-element.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store';

class ActivityQuizDisablePagerAndAlertsEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get styles() {
		return checkboxStyles;
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
			<d2l-input-checkbox-spacer
				class="d2l-body-small">
			</d2l-input-checkbox-spacer>

			<d2l-input-checkbox
				?checked="${entity.isDisablePagerAndAlertsEnabled}"
				@change="${this._setDisablePagerAndAlertsTool}"
				ariaLabel="${this.localize('disablePagerAndAlertsDescription')}"
				?disabled="${!entity.canEditDisablePagerAndAlerts}">
				${this.localize('disablePagerAndAlertsDescription')}
			</d2l-input-checkbox>
		`;
	}

	_setDisablePagerAndAlertsTool(event) {
		const entity = store.get(this.href);
		entity.setDisablePagerAndAlertsTool(event.target.checked);
	}
}

customElements.define(
	'd2l-activity-quiz-disable-pager-and-alerts',
	ActivityQuizDisablePagerAndAlertsEditor
);
