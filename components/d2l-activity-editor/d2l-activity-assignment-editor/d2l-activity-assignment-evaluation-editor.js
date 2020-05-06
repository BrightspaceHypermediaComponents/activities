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

import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

class ActivityAssignmentEvaluationEditor extends ActivityEditorFeaturesMixin(LocalizeMixin(LitElement)) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object },
			activityUsageHref: { type: String },
			_m3enabled: { type: Boolean }
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

				.editor {
					margin: 1rem 0;
				}
			`,
			summarizerHeaderStyles,
			summarizerSummaryStyles];
	}

	static async getLocalizeResources(langs) {

		return getLocalizeResources(langs, import.meta.url);
	}

	connectedCallback() {
		super.connectedCallback();

		this._m3enabled = this._isMilestoneEnabled(Milestones.M3);
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
				class="editor"
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
				class="editor"
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
				href="${this.activityUsageHref}"
				.token="${this.token}">
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
					<li>${this._renderRubricsSummary()}</li>
					<li>${this._renderAnonymousMarkingSummary()}</li>
					<li>${this._renderAnnotationsSummary()}</li>
					<li>${this._renderTurnitinSummary()}</li>
					${this._m3enabled ? html`<li>${this._renderCompetenciesSummary()}</li>` : null}
				</ul>
				${this._renderRubricsCollectionEditor()}
				${this._renderAnnotationsEditor()}
				${this._renderAnonymousMarkingEditor()}
				${this._renderTurnitinEditor()}
				${this._m3enabled ? this._renderCompetenciesOpener() : null}
			</d2l-labs-accordion-collapse>
		`;
	}
}
customElements.define(
	'd2l-activity-assignment-evaluation-editor',
	ActivityAssignmentEvaluationEditor
);
