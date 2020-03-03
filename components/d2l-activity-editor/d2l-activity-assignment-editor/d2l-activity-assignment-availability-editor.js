import '../d2l-activity-availability-dates-summary.js';
import '../d2l-activity-availability-dates-editor.js';
import '../d2l-activity-release-conditions-editor.js';
import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import { bodySmallStyles, heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { summarizerHeaderStyles, summarizerSummaryStyles } from './activity-summarizer-styles.js';

import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from '../state/activity-store.js';

class ActivityAssignmentAvailabilityEditor extends LocalizeMixin(ActivityEditorMixin(MobxLitElement)) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object }
		};
	}

	static get styles() {

		return [
			bodySmallStyles,
			heading4Styles,
			css`
				:host {
					display: block;
				}

				:host([hidden]) {
					display: none;
				}

				.editor {
					margin: 1rem 0;
				}

				.d2l-heading-4 {
					margin: 0 0 0.6rem 0;
				}

				.d2l-body-small {
					margin: 0 0 0.3rem 0;
				}
			`,
			summarizerHeaderStyles,
			summarizerSummaryStyles,
		];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	_renderAvailabilityDatesSummary() {

		return html`
			<d2l-activity-availability-dates-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-availability-dates-summary>
		`;
	}

	_renderAvailabilityDatesEditor() {

		return html`
			<div class="editor">
				<d2l-activity-availability-dates-editor
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-availability-dates-editor>
			</div>
		`;
	}

	_renderReleaseConditionSummary() {

		return html``;
	}

	_renderReleaseConditionEditor() {

		return html`
			<div class="editor">
				<h3 class="d2l-heading-4">
					${this.localize('hdrReleaseConditions')}
				</h3>
				<p class="d2l-body-small">
					${this.localize('hlpReleaseConditions')}
				</p>
				<d2l-activity-release-conditions-editor
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-release-conditions-editor>
			</div>
		`;
	}

	_renderSpecialAccessSummary() {

		return html``;
	}

	_renderSpecialAccessEditor() {

		return html``;
	}

	// Returns true if any error states relevant to this accordion are set
	get _errorInAccordion() {
		const activity = store.get(this.href);
		if (!activity) {
			return false;
		}

		return activity.endDateErrorTerm || activity.startDateErrorTerm;
	}

	render() {
		return html`
			<d2l-labs-accordion-collapse flex header-border ?opened=${this._errorInAccordion}>
				<h4 class="d2l-heading-4 activity-summarizer-header" slot="header">
					${this.localize('hdrAvailability')}
				</h4>
				<ul class="d2l-body-small activity-summarizer-summary" slot="summary">
					<li>${this._renderAvailabilityDatesSummary()}</li>
					<li>${this._renderReleaseConditionSummary()}</li>
					<li>${this._renderSpecialAccessSummary()}</li>
				</ul>
				${this._renderAvailabilityDatesEditor()}
				${this._renderReleaseConditionEditor()}
				${this._renderSpecialAccessEditor()}
			</d2l-labs-accordion-collapse>
		`;
	}

}

customElements.define(
	'd2l-activity-assignment-availability-editor',
	ActivityAssignmentAvailabilityEditor
);
