import './d2l-activity-assignment-availability-editor.js';
import './d2l-activity-assignment-evaluation-editor.js';
import './d2l-activity-assignment-editor-submission-and-completion.js';
import '@brightspace-ui/core/components/colors/colors.js';
import { ActivityEditorFeaturesMixin, Milestones } from '../mixins/d2l-activity-editor-features-mixin.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class AssignmentEditorSecondary extends ActivityEditorFeaturesMixin(RtlMixin(EntityMixinLit(LocalizeActivityAssignmentEditorMixin(LitElement)))) {

	static get properties() {
		return {
			_activityUsageHref: { type: String }
		};
	}

	static get styles() {
		return [
			labelStyles,
			css`
				:host {
					display: block;
					background: var(--d2l-color-gypsum);
				}
				:host([hidden]) {
					display: none;
				}
				:host > * {
					background: var(--d2l-color-white);
					margin-bottom: 10px;
					border-radius: 8px;
					padding: 20px;
					padding-top: 0;
				}
			`
		];
	}

	constructor() {
		super();
		this._setEntityType(AssignmentEntity);
		this._debounceJobs = {};

		this._activityUsageHref = '';
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onAssignmentChange(entity);
			super._entity = entity;
		}
	}

	_onAssignmentChange(assignment) {
		if (!assignment) {
			return;
		}

		this._activityUsageHref = assignment.activityUsageHref();
	}

	render() {
		const showSubmissionCompletionAccordian = this._isMilestoneEnabled(Milestones.M2);
		const showEvaluationAccordian = this._isMilestoneEnabled(Milestones.M2) || this._isMilestoneEnabled(Milestones.M3Competencies);

		const availabilityAccordian = html`
			<d2l-activity-assignment-availability-editor
				.href="${this._activityUsageHref}"
				.token="${this.token}">
			</d2l-activity-assignment-availability-editor>
		`;

		const submissionCompletionCategorizationAccordian = showSubmissionCompletionAccordian ? html`
			<d2l-activity-assignment-editor-submission-and-completion-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-editor-submission-and-completion-editor>
		` : null;

		const evaluationAccordian = showEvaluationAccordian ? html`
			<d2l-activity-assignment-evaluation-editor
				href="${this.href}"
				.token="${this.token}"
				.activityUsageHref=${this._activityUsageHref}>
			</d2l-activity-assignment-evaluation-editor>
		` : null;

		return html`
			${availabilityAccordian}
			${submissionCompletionCategorizationAccordian}
			${evaluationAccordian}
		`;

	}
}
customElements.define('d2l-activity-assignment-editor-secondary', AssignmentEditorSecondary);
