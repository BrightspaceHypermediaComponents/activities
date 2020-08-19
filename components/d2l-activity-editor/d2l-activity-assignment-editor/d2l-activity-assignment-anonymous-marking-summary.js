import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { assignments as store } from './state/assignment-store.js';

class ActivityAssignmentAnonymousMarkingSummary
	extends ActivityEditorMixin(LocalizeActivityAssignmentEditorMixin(MobxLitElement)) {

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

	constructor() {

		super(store);
	}

	render() {

		const entity = store.get(this.href);
		if (!entity || !entity.anonymousMarkingProps) {
			return html``;
		}

		const shouldRenderSummaryText =
			entity.anonymousMarkingProps.isAnonymousMarkingAvailable &&
			entity.anonymousMarkingProps.isAnonymousMarkingEnabled;
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
