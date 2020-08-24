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
import { css, html } from 'lit-element/lit-element.js';
import { summarizerHeaderStyles, summarizerSummaryStyles } from './activity-summarizer-styles.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { shared as activityStore } from '../state/activity-store.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/assignment-store.js';

class ActivityAssignmentEvaluationEditor extends ActivityEditorFeaturesMixin(LocalizeActivityAssignmentEditorMixin(ActivityEditorMixin(MobxLitElement))) {

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

				.d2l-editors > *:not(:first-child) {
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

	render() {
		const assignment = store.getAssignment(this.href);
		if (!assignment) {
			return html``;
		}

		const activity = activityStore.get(this.activityUsageHref);
		if (!activity) {
			return html``;
		}

		return html`
			<d2l-labs-accordion-collapse flex header-border>
				<h3 class="d2l-heading-3 d2l-activity-summarizer-header" slot="header">
					${this.localize('evaluationAndFeedback')}
				</h3>
				<ul class="d2l-body-small d2l-activity-summarizer-summary" slot="summary">
					${this._m2Enabled ? html`<li>${this._renderRubricsSummary()}</li>` : null}
					${this._m3CompetenciesEnabled && activity.canEditCompetencies ? html`<li>${this._renderCompetenciesSummary()}</li>` : null}
					${this._m2Enabled ? html`<li>${this._renderAnnotationsSummary()}</li>` : null}
					${this._m2Enabled ? html`<li>${this._renderAnonymousMarkingSummary()}</li>` : null}
					${this._m2Enabled && assignment.canEditTurnitin ? html`<li>${this._renderTurnitinSummary()}</li>` : null}
				</ul>
				<div class="d2l-editors">
					${this._m2Enabled ? html`${this._renderRubricsCollectionEditor()}` : null}
					${this._m3CompetenciesEnabled && activity.canEditCompetencies ? this._renderCompetenciesOpener() : null}
					${this._m2Enabled ? html`${this._renderAnnotationsEditor()}` : null}
					${this._m2Enabled ? html`${this._renderAnonymousMarkingEditor()}` : null}
					${this._m2Enabled && assignment.canEditTurnitin ? html`${this._renderTurnitinEditor()}` : null}
				</div>
			</d2l-labs-accordion-collapse>
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
	_renderAnnotationsSummary() {

		return html`
			<d2l-activity-assignment-annotations-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-annotations-summary>
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
	_renderAnonymousMarkingSummary() {

		return html`
			<d2l-activity-assignment-anonymous-marking-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-anonymous-marking-summary>
		`;
	}

	_renderCompetenciesOpener() {
		return html`
			<d2l-activity-competencies
				.href="${this.activityUsageHref}"
				.token="${this.token}">
			</d2l-activity-competencies>
		`;
	}
	_renderCompetenciesSummary() {
		return html`
			<d2l-activity-competencies-summary
				.href="${this.activityUsageHref}"
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
	_renderRubricsSummary() {
		return html`
			<d2l-activity-rubrics-summary-wrapper
				.href="${this.activityUsageHref}"
				.token="${this.token}">
			</d2l-activity-rubrics-summary-wrapper>
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

	_renderTurnitinSummary() {

		return html`
			<d2l-assignment-turnitin-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-assignment-turnitin-summary>
		`;
	}

}
customElements.define(
	'd2l-activity-assignment-evaluation-editor',
	ActivityAssignmentEvaluationEditor
);
