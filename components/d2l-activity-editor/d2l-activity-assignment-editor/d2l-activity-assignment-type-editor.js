import { bodyCompactStyles, bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import { shared as store } from './state/assignment-store.js';

class AssignmentTypeEditor extends ActivityEditorMixin(RtlMixin(LocalizeActivityAssignmentEditorMixin(MobxLitElement))) {

	static get styles() {
		return [
			bodyCompactStyles,
			bodySmallStyles,
			labelStyles,
			radioStyles,
			selectStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}

				.d2l-help-text {
					display: block;
					max-width: 300px;
					width: 100%;
				}

				.d2l-body-small {
					margin: 0.5rem 0 0.3rem 0;
				}

				.d2l-body-compact {
					margin: 0 0 0.3rem 0;
				}

				.d2l-group-info {
					padding-left: 1.8rem;
				}

				.d2l-info-text {
					margin: 0.1rem 0 0 0;
					padding-left: 1.8rem;
				}

				.d2l-info-text-flush-left {
					margin: 0.5rem 0 0 0;
				}

				.d2l-individual-type {
					margin: 0 0 0.5rem 0;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const assignment = store.get(this.href);

		if (!assignment) {
			return html``;
		}

		const infoText = this._getInformationText(assignment);
		const isIndividualType = assignment.assignmentTypeProps.isIndividualAssignmentType;
		const canEditAssignmentType = assignment.assignmentTypeProps.canEditAssignmentType;
		const groupTypeDisabled = assignment.assignmentTypeProps.isGroupAssignmentTypeDisabled;
		const folderTypeText = isIndividualType ? this.localize('txtIndividual') : this.localize('txtGroup');
		const groupTypeText = !isIndividualType && assignment.assignmentTypeProps.selectedGroupCategoryName
			? this.localize('txtGroupCategoryWithName', 'groupCategory', assignment.assignmentTypeProps.selectedGroupCategoryName)
			: '';

		return html`
			<div ?hidden=${canEditAssignmentType} id="read-only-assignment-type-container">
				<div class="d2l-body-compact">${folderTypeText}</div>
				<p class="d2l-info-text-flush-left d2l-body-small">${infoText}</p>
				<div class="d2l-body-compact">${groupTypeText}</div>
			</div>

			<div ?hidden=${!canEditAssignmentType} id="editable-assignment-type-container">
				<label class="d2l-individual-type d2l-input-radio-label">
					<input
						id="assignment-type-individual"
						type="radio"
						name="assignment-type"
						value="1"
						@change="${this._setIndividualAssignmentType}"
						?checked="${isIndividualType}"
					>
					${this.localize('txtIndividual')}
				</label>
				<label class="d2l-input-radio-label ${groupTypeDisabled ? 'd2l-input-radio-label-disabled' : ''}">
					<input
						id="assignment-type-group"
						type="radio"
						name="assignment-type"
						value="2"
						@change="${this._setGroupAssignmentType}"
						?checked="${!isIndividualType}"
						?disabled="${groupTypeDisabled}"
					>
					${this.localize('txtGroup')}
				</label>
				<div class="select-list d2l-group-info" ?hidden="${isIndividualType}">
					<label class="d2l-label-text">${this.localize('txtGroupCategory')}</label>
					<select
						class="d2l-input-select d2l-help-text"
						id="assignemnt-group-categories"
						@change="${this._changeGroupCategory}"
						>
						${this._getGroupCategoryOptions(assignment)}
					</select>
				</div>
				<p class="d2l-info-text d2l-body-small">${infoText}</p>
			</div>
		`;
	}
	_changeGroupCategory(event) {
		store.get(this.href).setAssignmentTypeGroupCategory(event.target.value);
	}
	_getGroupCategoryOptions(assignment) {
		if (assignment && assignment.assignmentTypeProps) {
			return html`${assignment.assignmentTypeProps.groupCategories.map(
				option => html`
					<option value=${option.value} ?selected=${String(option.value) === assignment.assignmentTypeProps.selectedGroupCategoryId}>
						${option.title}
					</option>
					`
			)}`;
		}
		return html``;
	}

	_getInformationText(assignment) {
		if (!assignment || !assignment.submissionAndCompletionProps || !assignment.assignmentTypeProps) {
			return;
		}

		const canEditAssignmentType = assignment.assignmentTypeProps.canEditAssignmentType;
		const isIndividualAssignmentType = assignment.assignmentTypeProps.isIndividualAssignmentType;
		const hasSubmissions = assignment.submissionAndCompletionProps.assignmentHasSubmissions;
		const groupTypeDisabled = assignment.assignmentTypeProps.isGroupAssignmentTypeDisabled;

		if (hasSubmissions) return; // don't display either of the information texts about groups

		if (isIndividualAssignmentType && groupTypeDisabled && assignment.assignmentTypeProps.groupCategories.length === 0) {
			return this.localize('folderTypeNoGroups'); // this only displays below the 'Individual Assignment' text
		}

		if (!isIndividualAssignmentType && canEditAssignmentType) {
			return this.localize('folderTypeCreateGroups'); // this only displays below the 'Group Assignment' text
		}

		return;
	}
	_setGroupAssignmentType() {
		store.get(this.href).setToGroupAssignmentType();
	}
	_setIndividualAssignmentType() {
		store.get(this.href).setToIndividualAssignmentType();
	}

}
customElements.define('d2l-activity-assignment-type-editor', AssignmentTypeEditor);
