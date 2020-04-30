import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from '../localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { assignments as store } from './state/assignment-store.js';

class ActivityAssignmentAnonymousMarkingSummary
	extends ActivityEditorMixin(LocalizeMixin(MobxLitElement)) {

	static get styles() {

		return css`
			:host {
				display: block;
			}

			:host([hidden]) {
				display: none;
			}
		`;
	}

	static async getLocalizeResources(langs) {

		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {

		super(store);
	}

	render() {

		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		const shouldRenderSummaryText = entity.isAnonymousMarkingEnabled;
		if (!shouldRenderSummaryText) {
			return html``;
		}

		return html`${this.localize('anonymousGradingEnabled')}`;
	}
}
customElements.define(
	'd2l-activity-assignment-anonymous-marking-summary',
	ActivityAssignmentAnonymousMarkingSummary
);
