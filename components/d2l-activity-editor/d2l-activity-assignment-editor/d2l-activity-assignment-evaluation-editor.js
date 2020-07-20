import './d2l-activity-assignment-annotations-editor.js';
import './d2l-activity-assignment-annotations-summary.js';
import './d2l-activity-assignment-anonymous-marking-editor.js';
import './d2l-activity-assignment-anonymous-marking-summary.js';
import '../d2l-activity-competencies.js';
import '../d2l-activity-competencies-summary.js';
import '../d2l-activity-rubrics/d2l-activity-rubrics-list-wrapper.js';
import '../d2l-activity-rubrics/d2l-activity-rubrics-summary-wrapper.js';
import './d2l-assignment-turnitin-editor.js';
import './d2l-assignment-turnitin-summary.js';
import { ActivityEditorFeaturesMixin, Milestones } from '../mixins/d2l-activity-editor-features-mixin.js';

import { bodySmallStyles, heading3Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { summarizerHeaderStyles, summarizerSummaryStyles } from './activity-summarizer-styles.js';

import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';

class ActivityAssignmentEvaluationEditor extends ActivityEditorFeaturesMixin(LocalizeActivityAssignmentEditorMixin(LitElement)) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object },
			activityUsageHref: { type: String },
			_m2Enabled: { type: Boolean },
			_m3CompetenciesEnabled: { type: Boolean }
		};
	}

	static get styles() {

		return [
			bodySmallStyles,
			heading3Styles,
			css`
				:host {
					display: block;
				}

				:host([hidden]) {
					display: none;
				}

				.editors > *:not(:first-child) {
					display: block;
					margin-top: 1rem;
				}
			`,
			summarizerHeaderStyles,
			summarizerSummaryStyles];
	}

	connectedCallback() {
		super.connectedCallback();

		this._m2Enabled = this._isMilestoneEnabled(Milestones.M2);
		this._m3CompetenciesEnabled = this._isMilestoneEnabled(Milestones.M3Competencies);
	}

	_renderAnonymousMarkingSummary() {

		return html`
			<d2l-activity-assignment-anonymous-marking-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-anonymous-marking-summary>
		`;
	}

	_renderAnonymousMarkingEditor() {

		return html`
			<d2l-activity-assignment-anonymous-marking-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-anonymous-marking-editor>
		`;
	}

	_renderAnnotationsSummary() {

		return html`
			<d2l-activity-assignment-annotations-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-annotations-summary>
		`;
	}

	_renderAnnotationsEditor() {

		return html`
			<d2l-activity-assignment-annotations-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-annotations-editor>
		`;
	}

	_renderTurnitinSummary() {

		return html`
			<d2l-assignment-turnitin-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-assignment-turnitin-summary>
		`;
	}

	_renderTurnitinEditor() {

		return html`
			<d2l-assignment-turnitin-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-assignment-turnitin-editor>
		`;
	}

	_renderRubricsSummary() {
		return html`
			<d2l-activity-rubrics-summary-wrapper
				href="${this.activityUsageHref}"
				.token="${this.token}">
			</d2l-activity-rubrics-summary-wrapper>
		`;
	}

	_renderCompetenciesSummary() {
		return html`
			<d2l-activity-competencies-summary
				href="${this.activityUsageHref}"
				.token="${this.token}">
			</d2l-activity-competencies-summary>
		`;
	}

	_renderRubricsCollectionEditor() {
		return html`
			<d2l-activity-rubrics-list-wrapper
				.href="${this.activityUsageHref}"
				.token="${this.token}"
				.assignmentHref="${this.href}">
			</d2l-activity-rubrics-list-wrapper>
		`;
	}

	_renderCompetenciesOpener() {
		return html`
			<d2l-activity-competencies
				href="${this.activityUsageHref}"
				.token="${this.token}">
			</d2l-activity-competencies>
		`;
	}

	render() {
		return html`
			<d2l-labs-accordion-collapse flex header-border>
				<h3 class="d2l-heading-3 activity-summarizer-header" slot="header">
					${this.localize('evaluationAndFeedback')}
				</h3>
				<ul class="d2l-body-small activity-summarizer-summary" slot="summary">
					${this._m2Enabled ? html`<li>${this._renderRubricsSummary()}</li>` : null}
					${this._m3CompetenciesEnabled ? html`<li>${this._renderCompetenciesSummary()}</li>` : null}
					${this._m2Enabled ? html`<li>${this._renderAnnotationsSummary()}</li>` : null}
					${this._m2Enabled ? html`<li>${this._renderAnonymousMarkingSummary()}</li>` : null}
					${this._m2Enabled ? html`<li>${this._renderTurnitinSummary()}</li>` : null}
				</ul>
				<div class="editors">
					${this._m2Enabled ? html`${this._renderRubricsCollectionEditor()}` : null}
					${this._m3CompetenciesEnabled ? this._renderCompetenciesOpener() : null}
					${this._m2Enabled ? html`${this._renderAnnotationsEditor()}` : null}
					${this._m2Enabled ? html`${this._renderAnonymousMarkingEditor()}` : null}
					${this._m2Enabled ? html`${this._renderTurnitinEditor()}` : null}
				</div>
			</d2l-labs-accordion-collapse>
		`;
	}
}
customElements.define(
	'd2l-activity-assignment-evaluation-editor',
	ActivityAssignmentEvaluationEditor
);
