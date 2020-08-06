import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import 'd2l-inputs/d2l-input-text.js';

import './d2l-activity-assignment-type-editor.js';
import './d2l-activity-assignment-type-summary.js';
import './d2l-activity-submission-email-notification-summary.js';
import { ActivityEditorFeaturesMixin, Milestones } from '../mixins/d2l-activity-editor-features-mixin.js';
import { bodyCompactStyles, bodySmallStyles, heading3Styles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { summarizerHeaderStyles, summarizerSummaryStyles } from './activity-summarizer-styles.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import { shared as store } from './state/assignment-store.js';

class ActivityAssignmentSubmissionAndCompletionEditor extends ActivityEditorFeaturesMixin(ActivityEditorMixin(RtlMixin(LocalizeActivityAssignmentEditorMixin(MobxLitElement)))) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object },
			_m4EmailNotificationEnabled: { type: Boolean }
		};
	}

	static get styles() {
		return [
			bodyCompactStyles,
			bodySmallStyles,
			heading3Styles,
			labelStyles,
			radioStyles,
			selectStyles,
			css`
				:host {
					display: block;
				}

				.d2l-block-select {
					display: block;
					max-width: 300px;
					width: 100%;
				}

				div[id*="container"] {
					margin-top: 20px;
				}

				div[id*="container"] > label.d2l-label-text {
					display: inline-block;
					margin-bottom: 10px;
				}

				.d2l-input-radio-label {
					margin-bottom: 10px;
				}

				#notification-email {
					margin-bottom: 2px;
					margin-top: 10px;
				}
			`,
			summarizerHeaderStyles,
			summarizerSummaryStyles
		];
	}

	connectedCallback() {
		super.connectedCallback();
		this._m4EmailNotificationEnabled = this._isMilestoneEnabled(Milestones.M4EmailSubmission);
	}

	_saveCompletionTypeOnChange(event) {
		store.getAssignment(this.href).setCompletionType(event.target.value);
	}

	_getSubmissionTypeOptions(assignment) {
		return html`
			${assignment.submissionTypeOptions.map(option => html`<option value=${option.value} ?selected=${String(option.value) === assignment.submissionType}>${option.title}</option>`)}
		`;
	}

	_saveSubmissionTypeOnChange(event) {
		store.getAssignment(this.href).setSubmissionType(event.target.value);
	}

	_getCompletionTypeOptions(assignment) {
		const completionTypeOptions = assignment ? assignment.completionTypeOptions : [];
		const completionType = assignment ? assignment.completionType : '0';

		return html`
			${completionTypeOptions.map(option => html`<option value=${option.value} ?selected=${String(option.value) === completionType}>${option.title}</option>`)}
		`;
	}

	_renderAssignmentType() {
		return html `
			<div id="assignment-type-container">
				<label class="d2l-label-text">
					${this.localize('txtAssignmentType')}
				</label>
				<d2l-activity-assignment-type-editor
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-assignment-type-editor>
			</div>
		`;
	}

	_renderAssignmentTypeSummary() {
		return html`
			<d2l-activity-assignment-type-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-type-summary>
		`;
	}

	_setfilesSubmisisonLimit(e) {
		const assignment = store.getAssignment(this.href);
		const data = e.target.value;
		assignment && assignment.setFilesSubmissionLimit(data);
	}

	_setSubmisisonsRule(e) {
		const assignment = store.getAssignment(this.href);
		const data = e.target.value;
		assignment && assignment.setSubmissionsRule(data);
	}

	_renderAssignmentFilesSubmissionLimit(assignment) {
		if (!assignment || !assignment.showFilesSubmissionLimit) {
			return html ``;
		}

		const unlimitedFilesPerSubmissionText = this.localize('UnlimitedFilesPerSubmission');
		const oneFilePerSubmissionText = this.localize('OneFilePerSubmission');

		let submissionLimitContent;
		if (assignment.canEditFilesSubmissionLimit) {
			submissionLimitContent = html`
				<label class="d2l-input-radio-label files-submission-limit-unlimited">
				<input
					id="files-submission-limit-unlimited"
					type="radio"
					name="filesSubmissionLimit"
					value="unlimited"
					@change="${this._setfilesSubmisisonLimit}"
					?checked="${assignment.filesSubmissionLimit === 'unlimited'}"
				>
					${unlimitedFilesPerSubmissionText}
				</label>

				<label class="d2l-input-radio-label files-submission-limit-one">
					<input
						id="files-submission-limit-one"
						type="radio"
						name="filesSubmissionLimit"
						value="onefilepersubmission"
						@change="${this._setfilesSubmisisonLimit}"
						?checked="${assignment.filesSubmissionLimit === 'onefilepersubmission'}"
					>
					${oneFilePerSubmissionText}
				</label>
			`;
		} else {
			submissionLimitContent = html`<div class="d2l-body-compact">${assignment.filesSubmissionLimit === 'unlimited' ? unlimitedFilesPerSubmissionText : oneFilePerSubmissionText}</div>`;
		}

		return html`
			<div id="assignment-files-submission-limit-container">
				<label class="d2l-label-text" for="assignment-files-submission-limit-container">
					${this.localize('filesSubmissionLimit')}
				</label>
				${submissionLimitContent}
			</div>
		`;
	}

	_renderAssignmentSubmissionsRule(assignment) {
		if (!assignment || !assignment.showSubmissionsRule) {
			return html ``;
		}

		let submissionsRuleContent;
		if (assignment.canEditSubmissionsRule) {
			submissionsRuleContent = html`
				${assignment.submissionsRuleOptions.map((x) => html`
					<label class="d2l-input-radio-label">
						<input
							type="radio"
							name="submissionsRule"
							.value="${x.value}"
							@change="${this._setSubmisisonsRule}"
							?checked="${assignment.submissionsRule === x.value}"
						>
						${x.title}
					</label>
				`) }
			`;
		} else {
			const found = assignment.submissionsRuleOptions.find(x => assignment.submissionsRule === x.value);
			submissionsRuleContent = html`<div class="d2l-body-compact">${found.title}</div>`;
		}

		return html `
			<div id="assignment-submissions-rule-container">
				<label class="d2l-label-text" for="assignment-submissions-rule-container">
					${this.localize('submissionsRule')}
				</label>
				${submissionsRuleContent}
			</div>
		`;
	}

	_renderAssignmentSubmissionNotificationEmail(assignment) {
		if (!this._m4EmailNotificationEnabled || !assignment || !assignment.showNotificationEmail) {
			return html ``;
		}

		return html `
		<div id="assignment-notification-email-container">
			<label class="d2l-label-text" for="assignment-notification-email-container">
				${this.localize('hdrSubmissionNotificationEmail')}
			</label>
			<p class="d2l-body-small">
				${this.localize('hlpSubmissionNotificationEmail')}
			</p>

			<d2l-input-text
				id="notification-email"
				label="${this.localize('hdrSubmissionNotificationEmail')}"
				label-hidden
				value="${assignment.notificationEmail}"
				maxlength="1024"
				?disabled="${!assignment.canEditNotificationEmail}"
				@change="${this._onNotificationEmailChanged}"
				@blur="${this._onNotificationEmailChanged}"
			></d2l-input-text>
		</div>
	`;
	}

	_onNotificationEmailChanged(e) {
		const assignment = store.getAssignment(this.href);
		const data = e.target.value;
		assignment && assignment.setNotificationEmail(data);
	}

	_renderSubmissionEmailNotificationSummary(assignment) {
		if (!this._m4EmailNotificationEnabled || !assignment || !assignment.showNotificationEmail) {
			return html ``;
		}
		return html`
			<d2l-activity-submission-email-notification-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-submission-email-notification-summary>
		`;
	}

	_renderAssignmentSubmissionType(assignment) {
		if (!assignment) {
			return html``;
		}

		let submissionTypeContent = html``;
		if (assignment.canEditSubmissionType) {
			submissionTypeContent = html`
				<select
					id="assignment-submission-type"
					class="d2l-input-select d2l-block-select"
					@change="${this._saveSubmissionTypeOnChange}">
						${this._getSubmissionTypeOptions(assignment)}
				</select>
			`;
		} else {
			const submissionType = this._getSelectedSubmissionType(assignment);
			if (submissionType) {
				submissionTypeContent = html`<div class="d2l-body-compact">${submissionType.title}</div>`;
			}
		}

		return html`
			<div id="assignment-submission-type-container">
				<label class="d2l-label-text" for="assignment-submission-type">
					${this.localize('submissionType')}
				</label>
				${submissionTypeContent}
			</div>
		`;
	}

	_renderAssignmentSubmissionTypeSummary(assignment) {
		if (!assignment) {
			return html``;
		}

		const submissionType = this._getSelectedSubmissionType(assignment);

		if (submissionType) {
			return html`${submissionType.title}`;
		}

		return html``;
	}

	_getSelectedSubmissionType(assignment) {
		if (!assignment || !assignment.submissionTypeOptions) {
			return html``;
		}

		return assignment.submissionTypeOptions.find(opt => String(opt.value) === assignment.submissionType);
	}

	_renderAssignmentCompletionType(assignment) {
		if (!assignment || !assignment.completionTypeOptions || assignment.completionTypeOptions.length === 0) {
			return html``;
		}

		let completionTypeContent = html``;
		if (assignment.canEditCompletionType) {
			completionTypeContent = html`
				<select
					id="assignment-completion-type"
					class="d2l-input-select d2l-block-select"
					@change="${this._saveCompletionTypeOnChange}">
						${this._getCompletionTypeOptions(assignment)}
				</select>
			`;
		} else {
			const completionType = this._getSelectedCompletionType(assignment);
			if (completionType) {
				completionTypeContent = html`<div class="d2l-body-compact">${completionType.title}</div>`;
			}
		}

		return html`
			<div id="assignment-completion-type-container">
				<label class="d2l-label-text" for="assignment-completion-type">
					${this.localize('completionType')}
				</label>
				${completionTypeContent}
			</div>
		`;
	}

	_getSelectedCompletionType(assignment) {
		if (!assignment || !assignment.completionTypeOptions) {
			return html``;
		}
		return assignment.completionTypeOptions.find(opt => String(opt.value) === assignment.completionType);
	}

	_renderAssignmentCompletionTypeSummary() {
		return html``;
	}

	render() {
		const assignment = store.getAssignment(this.href);
		return html`
			<d2l-labs-accordion-collapse class="accordion" flex header-border>
				<h3 class="d2l-heading-3 d2l-activity-summarizer-header" slot="header">
					${this.localize('submissionCompletionAndCategorization')}
				</h3>
				<ul class="d2l-body-small d2l-activity-summarizer-summary" slot="summary">
					<li>${this._renderAssignmentTypeSummary()}</li>
					<li>${this._renderAssignmentSubmissionTypeSummary(assignment)}</li>
					<li>${this._renderAssignmentCompletionTypeSummary()}</li>
					<li>${this._renderSubmissionEmailNotificationSummary(assignment)}</li>
				</ul>
				${this._renderAssignmentType()}
				${this._renderAssignmentSubmissionType(assignment)}
				${this._renderAssignmentFilesSubmissionLimit(assignment)}
				${this._renderAssignmentSubmissionsRule(assignment)}
				${this._renderAssignmentCompletionType(assignment)}
				${this._renderAssignmentSubmissionNotificationEmail(assignment)}
			</d2l-labs-accordion-collapse>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor-submission-and-completion-editor', ActivityAssignmentSubmissionAndCompletionEditor);
