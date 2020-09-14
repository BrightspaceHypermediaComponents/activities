import './d2l-activity-assignment-availability-editor.js';
import './d2l-activity-assignment-evaluation-editor.js';
import './d2l-activity-assignment-editor-submission-and-completion.js';
import '@brightspace-ui/core/components/colors/colors.js';
import { ActivityEditorFeaturesMixin, Milestones } from '../mixins/d2l-activity-editor-features-mixin.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletizeMixin } from '../mixins/d2l-skeletize-mixin';

class AssignmentEditorSecondary extends ActivityEditorFeaturesMixin(AsyncContainerMixin(SkeletizeMixin(RtlMixin(LocalizeActivityAssignmentEditorMixin(LitElement))))) {

	static get properties() {
		return {
			activityUsageHref: { type: String, attribute: 'activity-usage-href' },
		};
	}

	static get styles() {
		return [
			super.styles,
			labelStyles,
			css`
				:host {
					background: var(--d2l-color-gypsum);
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				:host > * {
					background: var(--d2l-color-white);
					border-radius: 8px;
					margin-bottom: 10px;
					padding: 20px;
					padding-top: 0;
				}
			`
		];
	}

	constructor() {
		super();
		this._debounceJobs = {};
		this.skeleton = true;
	}

	render() {
		const showSubmissionCompletionAccordian = this._isMilestoneEnabled(Milestones.M2);
		const showEvaluationAccordian = this._isMilestoneEnabled(Milestones.M2) || this._isMilestoneEnabled(Milestones.M3Competencies);

		const availabilityAccordian = html`
			<d2l-activity-assignment-availability-editor
				.href="${this.activityUsageHref}"
				.token="${this.token}"
				?skeleton="${this.skeleton}">
			</d2l-activity-assignment-availability-editor>
		`;

		const submissionCompletionCategorizationAccordian = showSubmissionCompletionAccordian ? html`
			<d2l-activity-assignment-editor-submission-and-completion-editor
				href="${this.href}"
				.token="${this.token}"
				?skeleton="${this.skeleton}">
			</d2l-activity-assignment-editor-submission-and-completion-editor>
		` : null;

		const evaluationAccordian = showEvaluationAccordian ? html`
			<d2l-activity-assignment-evaluation-editor
				href="${this.href}"
				.token="${this.token}"
				.activityUsageHref="${this.activityUsageHref}"
				?skeleton="${this.skeleton}">
			</d2l-activity-assignment-evaluation-editor>
		` : null;

		return html`
			${availabilityAccordian}
			${submissionCompletionCategorizationAccordian}
			${evaluationAccordian}
		`;

	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if (changedProperties.has('asyncState')) {
			this.skeleton = this.asyncState !== asyncStates.complete;
		}
	}

}
customElements.define('d2l-activity-assignment-editor-secondary', AssignmentEditorSecondary);
