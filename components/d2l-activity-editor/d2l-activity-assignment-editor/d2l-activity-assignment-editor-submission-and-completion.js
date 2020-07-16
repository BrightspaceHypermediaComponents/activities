import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import './d2l-activity-assignment-type-editor.js';
import './d2l-activity-assignment-type-summary.js';
import { bodySmallStyles, heading3Styles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { summarizerHeaderStyles, summarizerSummaryStyles } from './activity-summarizer-styles.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import { shared as store } from './state/assignment-store.js';

class ActivityAssignmentSubmissionAndCompletionEditor extends ActivityEditorMixin(RtlMixin(LocalizeActivityAssignmentEditorMixin(MobxLitElement))) {

	static get styles() {
		return [
			bodySmallStyles,
			heading3Styles,
			labelStyles,
			radioStyles,
			selectStyles,
			css`
				:host {
					display: block;
				}

				.block-select {
					width: 100%;
					max-width: 300px;
					display: block;
				}

				div[id*="container"] {
					margin-top: 20px;
				}

				div[id*="container"] > label.d2l-label-text {
					display: inline-block;
					margin-bottom: 10px;
				}

				.d2l-input-radio-label, .d2l-input-radio-label-disabled {
					margin-bottom: 10px;
				}
			`,
			summarizerHeaderStyles,
			summarizerSummaryStyles
		];
	}

	_saveCompletionTypeOnChange(event) {
		store.getAssignment(this.href).setCompletionType(event.target.value);
	}

	_getSubmissionTypeOptions(assignment) {
		if (!assignment) {
			return html``;
		}

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

		const isReadOnly = !assignment.canEditFilesSubmissionLimit;
		const radioClasses = {
			'd2l-input-radio-label': true,
			'd2l-input-radio-label-disabled': isReadOnly,
		};

		return html`
			<div id="assignment-files-submission-limit-container">
				<label class="d2l-label-text" for="assignment-files-submission-limit-container">
					${this.localize('filesSubmissionLimit')}
				</label>

				<label class="${classMap({'files-submission-limit-unlimited': true, ...radioClasses})}">
					<input
						id="files-submission-limit-unlimited"
						type="radio"
						name="filesSubmissionLimit"
						value="unlimited"
						@change="${this._setfilesSubmisisonLimit}"
						?disabled=${isReadOnly}
						?checked="${assignment.filesSubmissionLimit === 'unlimited'}"
					>
					${this.localize('UnlimitedFilesPerSubmission')}
				</label>

				<label class="${classMap({'files-submission-limit-one': true, ...radioClasses})}">
					<input
						id="files-submission-limit-one"
						type="radio"
						name="filesSubmissionLimit"
						value="onefilepersubmission"
						@change="${this._setfilesSubmisisonLimit}"
						?disabled=${isReadOnly}
						?checked="${assignment.filesSubmissionLimit === 'onefilepersubmission'}"
					>
					${this.localize('OneFilePerSubmission')}
				</label>
			</div>
		`;
	}
	_renderAssignmentSubmissionsRule(assignment) {
		if (!assignment || !assignment.showSubmissionsRule) {
			return html ``;
		}

		const isReadOnly = !assignment.canEditSubmissionsRule;
		const radioClasses = {
			'd2l-input-radio-label': true,
			'd2l-input-radio-label-disabled': isReadOnly,
		};

		return html `
			<div id="assignment-submissions-rule-container">
				<label class="d2l-label-text" for="assignment-submissions-rule-container">
					${this.localize('submissionsRule')}
				</label>

				${assignment.submissionsRuleOptions.map((x) => html`
					<label class="${classMap(radioClasses)}">
						<input
							type="radio"
							name="submissionsRule"
							.value="${x.value}"
							@change="${this._setSubmisisonsRule}"
							?disabled=${isReadOnly}
							?checked="${assignment.submissionsRule === x.value}"
						>
						${x.title}
					</label>
				`) }
			</div>
		`;
	}

	_renderAssignmentSubmissionType(assignment) {
		const canEditSubmissionType = assignment ? assignment.canEditSubmissionType : false;
		return html `
			<div id="assignment-submission-type-container">
				<label class="d2l-label-text" for="assignment-submission-type">
					${this.localize('submissionType')}
				</label>
				<select
					id="assignment-submission-type"
					class="d2l-input-select block-select"
					@change="${this._saveSubmissionTypeOnChange}"
					?disabled="${!canEditSubmissionType}">
						${this._getSubmissionTypeOptions(assignment)}
				</select>
			</div>
		`;
	}

	_renderAssignmentSubmissionTypeSummary(assignment) {
		if (!assignment) {
			return html``;
		}

		const submissionType = assignment.submissionTypeOptions.find(opt => String(opt.value) === assignment.submissionType);

		if (submissionType) {
			return html `${submissionType.title}`;
		}

		return html``;
	}

	_renderAssignmentCompletionType(assignment) {
		const canEditCompletionType = assignment ? assignment.canEditCompletionType : false;
		const completionHidden = assignment ? assignment.completionTypeOptions.length <= 0 : true;

		return html `
			<div id="assignment-completion-type-container" ?hidden="${completionHidden}">
				<label class="d2l-label-text" for="assignment-completion-type">
					${this.localize('completionType')}
				</label>
				<select
					id="assignment-completion-type"
					class="d2l-input-select block-select"
					@change="${this._saveCompletionTypeOnChange}"
					?disabled="${!canEditCompletionType}">
						${this._getCompletionTypeOptions(assignment)}
				</select>
			</div>
		`;
	}

	_renderAssignmentCompletionTypeSummary() {
		return html``;
	}

	render() {
		const assignment = store.getAssignment(this.href);
		return html`
			<d2l-labs-accordion-collapse class="accordion" flex header-border>
				<h3 class="d2l-heading-3 activity-summarizer-header" slot="header">
					${this.localize('submissionCompletionAndCategorization')}
				</h3>
				<ul class="d2l-body-small activity-summarizer-summary" slot="summary">
					<li>${this._renderAssignmentTypeSummary()}</li>
					<li>${this._renderAssignmentSubmissionTypeSummary(assignment)}</li>
					<li>${this._renderAssignmentCompletionTypeSummary()}</li>
				</ul>
				${this._renderAssignmentType()}
				${this._renderAssignmentSubmissionType(assignment)}
				${this._renderAssignmentFilesSubmissionLimit(assignment)}
				${this._renderAssignmentSubmissionsRule(assignment)}
				${this._renderAssignmentCompletionType(assignment)}
			</d2l-labs-accordion-collapse>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor-submission-and-completion-editor', ActivityAssignmentSubmissionAndCompletionEditor);
