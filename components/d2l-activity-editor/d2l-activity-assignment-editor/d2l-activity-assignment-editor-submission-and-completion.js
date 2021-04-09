import '../d2l-activity-accordion-collapse.js';
import './d2l-activity-assignment-submission-email-notification-summary.js';
import './d2l-activity-assignment-type-editor.js';
import './d2l-activity-assignment-categories-editor.js';
import './d2l-activity-assignment-type-summary.js';
import '../d2l-activity-notification-email-editor';
import { bodyCompactStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { accordionStyles } from '../styles/accordion-styles';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as store } from './state/assignment-store.js';

class ActivityAssignmentSubmissionAndCompletionEditor extends SkeletonMixin(ActivityEditorMixin(RtlMixin(LocalizeActivityAssignmentEditorMixin(MobxLitElement)))) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object },
		};
	}

	static get styles() {
		return [
			super.styles,
			bodyCompactStyles,
			labelStyles,
			radioStyles,
			selectStyles,
			accordionStyles,
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

				div[id*="container"] > .d2l-label-text {
					display: inline-block;
					margin-bottom: 10px;
				}

				.d2l-input-radio-label {
					margin-bottom: 10px;
				}
			`
		];
	}

	constructor() {
		super(store);
		this.saveOrder = 2000;
	}

	render() {
		const assignment = store.get(this.href);
		return html`
			<d2l-activity-accordion-collapse ?skeleton="${this.skeleton}">
				<span slot="header">
					${this.localize('submissionCompletionAndCategorization')}
				</span>
				<li slot="summary-items">${this._renderAssignmentTypeSummary()}</li>
				<li slot="summary-items">${this._renderAssignmentSubmissionTypeSummary(assignment)}</li>
				<li slot="summary-items">${this._renderAssignmentCompletionTypeSummary()}</li>
				<li slot="summary-items">${this._renderSubmissionEmailNotificationSummary(assignment)}</li>
				<span slot="components">
					${this._renderAssignmentType()}
					${this._renderCategoriesDropdown(assignment)}
					${this._renderAssignmentSubmissionType(assignment)}
					${this._renderAssignmentFilesSubmissionLimit(assignment)}
					${this._renderAssignmentSubmissionsRule(assignment)}
					${this._renderAssignmentCompletionType(assignment)}
					${this._renderAssignmentSubmissionNotificationEmail(assignment)}
				</span>
			</d2l-activity-accordion-collapse>
		`;
	}

	async save() {
		const assignment = store.get(this.href);
		if (!assignment) {
			return;
		}

		await assignment.save();
	}

	_getCompletionTypeOptions(assignment) {
		const completionTypeOptions = assignment && assignment.submissionAndCompletionProps ? assignment.submissionAndCompletionProps.completionTypeOptions : [];
		const completionType = assignment && assignment.submissionAndCompletionProps ? assignment.submissionAndCompletionProps.completionType : '0';

		return html`
			${completionTypeOptions.map(option => html`<option value=${option.value} ?selected=${String(option.value) === completionType}>${option.title}</option>`)}
		`;
	}

	_getSelectedCompletionType(assignment) {
		if (!assignment ||
			!assignment.submissionAndCompletionProps ||
			!assignment.submissionAndCompletionProps.completionTypeOptions) {
			return html``;
		}

		return assignment.submissionAndCompletionProps.completionTypeOptions.find(
			opt => String(opt.value) === assignment.submissionAndCompletionProps.completionType
		);
	}
	_getSelectedSubmissionType(assignment) {
		if (!assignment || !assignment.submissionAndCompletionProps || !assignment.submissionAndCompletionProps.submissionTypeOptions) {
			return html``;
		}

		return assignment.submissionAndCompletionProps.submissionTypeOptions.find(opt => String(opt.value) === assignment.submissionAndCompletionProps.submissionType);
	}
	_getSubmissionTypeOptions(assignment) {
		if (!assignment || !assignment.submissionAndCompletionProps) {
			return html``;
		}

		return html`
			${assignment.submissionAndCompletionProps.submissionTypeOptions.map(option => html`<option value=${option.value} ?selected=${String(option.value) === assignment.submissionAndCompletionProps.submissionType}>${option.title}</option>`)}
		`;
	}

	_onNotificationEmailChanged(e) {
		const assignment = store.get(this.href);
		const data = e.detail.value;
		assignment && assignment.setNotificationEmail(data);
	}

	_renderAssignmentCompletionType(assignment) {
		if (!assignment ||
			!assignment.submissionAndCompletionProps ||
			!assignment.submissionAndCompletionProps.completionTypeOptions ||
			assignment.submissionAndCompletionProps.completionTypeOptions.length === 0) {
			return html``;
		}

		let completionTypeContent = html``;
		if (assignment.submissionAndCompletionProps.canEditCompletionType) {
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
	_renderAssignmentCompletionTypeSummary() {
		return html``;
	}

	_renderAssignmentFilesSubmissionLimit(assignment) {
		if (!assignment ||
			!assignment.submissionAndCompletionProps ||
			!assignment.submissionAndCompletionProps.showFilesSubmissionLimit) {
			return html``;
		}

		const unlimitedFilesPerSubmissionText = this.localize('UnlimitedFilesPerSubmission');
		const oneFilePerSubmissionText = this.localize('OneFilePerSubmission');

		let submissionLimitContent;
		if (assignment.submissionAndCompletionProps.canEditFilesSubmissionLimit) {
			submissionLimitContent = html`
				<label class="d2l-input-radio-label files-submission-limit-unlimited">
				<input
					id="files-submission-limit-unlimited"
					type="radio"
					name="filesSubmissionLimit"
					value="unlimited"
					@change="${this._setfilesSubmisisonLimit}"
					?checked="${assignment.submissionAndCompletionProps.filesSubmissionLimit === 'unlimited'}"
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
						?checked="${assignment.submissionAndCompletionProps.filesSubmissionLimit === 'onefilepersubmission'}"
					>
					${oneFilePerSubmissionText}
				</label>
			`;
		} else {
			submissionLimitContent = html`
				<div class="d2l-body-compact">
					${assignment.submissionAndCompletionProps.filesSubmissionLimit === 'unlimited' ? unlimitedFilesPerSubmissionText : oneFilePerSubmissionText}
				</div>
			`;
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

	_renderAssignmentSubmissionNotificationEmail(assignment) {
		if (!assignment || !assignment.showNotificationEmail) {
			return html``;
		}

		return html`
			<div id="assignment-notification-email-container">
				<d2l-activity-notification-email-editor
					value="${assignment.notificationEmail}"
					?disabled="${!assignment.canEditNotificationEmail}"
					@activity-notification-email-changed="${this._onNotificationEmailChanged}">
					<p slot="description">
						${this.localize('hlpSubmissionNotificationEmail')}
					</p>
				</d2l-activity-notification-email-editor>
			</div>
		`;
	}
	_renderAssignmentSubmissionsRule(assignment) {

		if (!assignment ||
			!assignment.submissionAndCompletionProps ||
			!assignment.submissionAndCompletionProps.showSubmissionsRule) {
			return html``;
		}

		let submissionsRuleContent;
		if (assignment.submissionAndCompletionProps.canEditSubmissionsRule) {
			submissionsRuleContent = html`
				${assignment.submissionAndCompletionProps.submissionsRuleOptions.map((x) => html`
					<label class="d2l-input-radio-label">
						<input
							type="radio"
							name="submissionsRule"
							.value="${x.value}"
							@change="${this._setSubmisisonsRule}"
							?checked="${assignment.submissionAndCompletionProps.submissionsRule === x.value}"
						>
						${x.title}
					</label>
				`)}
			`;
		} else {
			const found = assignment.submissionAndCompletionProps.submissionsRuleOptions.find(x => assignment.submissionAndCompletionProps.submissionsRule === x.value);
			submissionsRuleContent = html`<div class="d2l-body-compact">${found.title}</div>`;
		}

		return html`
			<div id="assignment-submissions-rule-container">
				<label class="d2l-label-text" for="assignment-submissions-rule-container">
					${this.localize('submissionsRule')}
				</label>
				${submissionsRuleContent}
			</div>
		`;
	}
	_renderAssignmentSubmissionType(assignment) {
		if (!assignment || !assignment.submissionAndCompletionProps) {
			return html``;
		}

		let submissionTypeContent = html``;
		if (assignment.submissionAndCompletionProps.canEditSubmissionType) {
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
		if (!assignment || !assignment.submissionAndCompletionProps) {
			return html``;
		}

		const submissionType = this._getSelectedSubmissionType(assignment);

		if (submissionType) {
			return html`${submissionType.title}`;
		}

		return html``;
	}
	_renderAssignmentType() {
		return html`
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

	_renderCategoriesDropdown(assignment) {
		if (!assignment || !assignment.categoriesLink) return;

		return html`
			<div id="categories-editor-container">

				<label class="d2l-label-text">
					${this.localize('txtCategoriesLabel')}
				</label>

				<d2l-activity-assignment-categories-editor
					href="${assignment.categoriesLink}"
					.token="${this.token}">
				</d2l-activity-assignment-categories-editor>
			</div>
	`;
	}

	_renderSubmissionEmailNotificationSummary(assignment) {
		if (!assignment || !assignment.showNotificationEmail) {
			return html``;
		}
		return html`
			<d2l-activity-assignment-submission-email-notification-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-submission-email-notification-summary>
		`;
	}
	_saveCompletionTypeOnChange(event) {
		store.get(this.href).setCompletionType(event.target.value);
	}

	_saveSubmissionTypeOnChange(event) {
		store.get(this.href).setSubmissionType(event.target.value);
	}

	_setfilesSubmisisonLimit(e) {
		const assignment = store.get(this.href);
		const data = e.target.value;
		assignment && assignment.setFilesSubmissionLimit(data);
	}

	_setSubmisisonsRule(e) {
		const assignment = store.get(this.href);
		const data = e.target.value;
		assignment &&
			assignment.submissionAndCompletionProps &&
			assignment.submissionAndCompletionProps.setSubmissionsRule(data);
	}

}
customElements.define('d2l-activity-assignment-editor-submission-and-completion-editor', ActivityAssignmentSubmissionAndCompletionEditor);
