import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import './d2l-activity-assignment-type-editor.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { heading4Styles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SaveStatusMixin } from '../save-status-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

class AssignmentEditorSubmissionAndCompletion extends SaveStatusMixin(RtlMixin(EntityMixinLit(LocalizeMixin(LitElement)))) {

	static get properties() {
		return {
			_submissionTypes: { type: Array },
			_canEditSubmissionType: { type: Boolean },
			_completionTypes: { type: Array },
			_canEditCompletionType: { type: Boolean }
		};
	}

	static get styles() {
		return [
			heading4Styles,
			labelStyles,
			selectStyles,
			css`
				.block-select {
					width: 100%;
					max-width: 300px;
					display: block;
				}

				.d2l-heading-4 {
					margin: 0 0 0.6rem 0;
				}

				.summary {
					list-style: none;
					padding-left: 0.2rem;
					color: var(--d2l-color-galena);
				}

				.assignment-type-heading {
					margin: 0 0 0.5rem 0;
				}
			`
		];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this._setEntityType(AssignmentEntity);

		this._submissionTypes = [];
		this._completionTypes = [];
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

		this._submissionTypes = assignment.submissionTypeOptions();
		this._canEditSubmissionType = assignment.canEditSubmissionType();
		this._completionTypes = assignment.completionTypeOptions();
		this._canEditCompletionType = assignment.canEditCompletionType();
	}

	_saveCompletionTypeOnChange() {
		const completionType = this.shadowRoot.querySelector('select#assignment-completion-type').value;
		this.wrapSaveAction(super._entity.setCompletionType(completionType));
	}

	_getSubmissionTypeOptions() {
		return html`
			${this._submissionTypes.map(option => html`<option value=${option.value} ?selected=${option.selected}>${option.title}</option>`)}
		`;
	}

	_saveSubmissionTypeOnChange() {
		const submissionType = this.shadowRoot.querySelector('select#assignment-submission-type').value;
		this.wrapSaveAction(super._entity.setSubmissionType(submissionType));
	}

	_getCompletionTypeOptions() {
		return html`
			${this._completionTypes.map(option => html`<option value=${option.value} ?selected=${option.selected}>${option.title}</option>`)}
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

	_renderAssignmentSubmissionType() {
		return html `
			<div id="assignment-submission-type-container">
				<label class="d2l-label-text" for="assignment-submission-type">
					${this.localize('submissionType')}
				</label>
				<select
					id="assignment-submission-type"
					class="d2l-input-select block-select"
					@change="${this._saveSubmissionTypeOnChange}"
					?disabled="${!this._canEditSubmissionType}">
						${this._getSubmissionTypeOptions()}
				</select>
			</div>
		`;
	}

	_renderAssignmentSubmissionTypeSummary() {
		return html``;
	}

	_renderAssignmentCompletionType() {
		return html `
			<div id="assignment-completion-type-container" ?hidden="${!this._completionTypes.length > 0}">
				<label class="d2l-label-text" for="assignment-completion-type">
					${this.localize('completionType')}
				</label>
				<select
					id="assignment-completion-type"
					class="d2l-input-select block-select"
					@change="${this._saveCompletionTypeOnChange}"
					?disabled="${!this._canEditCompletionType}">
						${this._getCompletionTypeOptions()}
				</select>
			</div>
		`;
	}

	_renderAssignmentCompletionTypeSummary() {
		return html``;
	}

	render() {
		return html`
            <d2l-labs-accordion-collapse class="accordion" flex header-border>
				<h4 class="accordion-header" slot="header">
					${this.localize('submissionCompletionAndCategorization')}
				</h4>
				<ul class="summary" slot="summary">
					${this._renderAssignmentTypeSummary()}
					${this._renderAssignmentSubmissionTypeSummary()}
					${this._renderAssignmentCompletionTypeSummary()}
				</ul>
				${this._renderAssignmentType()}
				${this._renderAssignmentSubmissionType()}
				${this._renderAssignmentCompletionType()}
			</d2l-labs-accordion-collapse>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor-submission-and-completion', AssignmentEditorSubmissionAndCompletion);
