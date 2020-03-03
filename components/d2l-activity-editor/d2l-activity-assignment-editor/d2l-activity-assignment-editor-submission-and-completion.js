import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import './d2l-activity-assignment-type-editor.js';
import { bodySmallStyles, heading4Styles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { summarizerHeaderStyles, summarizerSummaryStyles } from './activity-summarizer-styles.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import { shared as store } from './state/assignment-store.js';

class AssignmentEditorSubmissionAndCompletion extends ActivityEditorMixin(LocalizeMixin(MobxLitElement)) {
	static get styles() {
		return [
			bodySmallStyles,
			heading4Styles,
			labelStyles,
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

				.d2l-heading-4 {
					margin: 0 0 0.6rem 0;
				}
				.assignment-type-heading {
					margin: 0 0 0.5rem 0;
				}
			`,
			summarizerHeaderStyles,
			summarizerSummaryStyles
		];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
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
				<h3 class="assignment-type-heading d2l-heading-4">
					${this.localize('txtAssignmentType')}
				</h3>
				<d2l-activity-assignment-type-editor
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-assignment-type-editor>
			</div>
		`;
	}

	_renderAssignmentTypeSummary() {
		return html``;
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

	_renderAssignmentSubmissionTypeSummary() {
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
				<h4 class="d2l-heading-4 activity-summarizer-header" slot="header">
					${this.localize('submissionCompletionAndCategorization')}
				</h4>
				<ul class="d2l-body-small activity-summarizer-summary" slot="summary">
					<li>${this._renderAssignmentTypeSummary()}</li>
					<li>${this._renderAssignmentSubmissionTypeSummary()}</li>
					<li>${this._renderAssignmentCompletionTypeSummary()}</li>
				</ul>
				${this._renderAssignmentType()}
				${this._renderAssignmentSubmissionType(assignment)}
				${this._renderAssignmentCompletionType(assignment)}
			</d2l-labs-accordion-collapse>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor-submission-and-completion', AssignmentEditorSubmissionAndCompletion);
