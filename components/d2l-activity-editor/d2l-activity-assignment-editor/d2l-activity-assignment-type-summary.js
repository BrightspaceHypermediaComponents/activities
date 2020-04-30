import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { assignments as store } from './state/assignment-store.js';

class AssignmentTypeSummary extends ActivityEditorMixin(RtlMixin(LocalizeMixin(MobxLitElement))) {

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
		const assignment = store.get(this.href);
		if (assignment && !assignment.isIndividualAssignmentType) {
			return html`${this.localize('txtGroupAssignmentSummary')}`;
		}

		return html``;
	}
}

customElements.define(
	'd2l-activity-assignment-type-summary',
	AssignmentTypeSummary
);
