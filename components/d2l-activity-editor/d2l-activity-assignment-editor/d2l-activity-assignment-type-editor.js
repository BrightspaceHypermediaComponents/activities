import { bodyCompactStyles, bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import { assignments as store } from './state/assignment-store.js';

class AssignmentTypeEditor extends ActivityEditorMixin(RtlMixin(LocalizeMixin(MobxLitElement))) {

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

				.block-select {
					width: 100%;
					max-width: 300px;
					display: block;
				}

				.d2l-body-small {
					margin: 0.5rem 0 0.3rem 0;
				}

				.d2l-body-compact {
					margin: 0 0 0.3rem 0;
				}

				.group-info {
					padding-left: 1.8rem;
				}

				.info-text {
					padding-left: 1.7rem;
					margin: 0.1rem 0 0 0;
				}

				.individual-type {
					margin: 0 0 0.5rem 0;
				}
			`
		];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super(store);
	}

	_getGroupCategoryOptions(assignment) {
		if (assignment) {
			return html`${assignment.groupCategories.map(
				option => html`
					<option value=${option.value} ?selected=${String(option.value) === assignment.selectedGroupCategoryId}>
						${option.title}
					</option>
					`
			)}`;
		}
		return html``;
	}

	_setIndividualAssignmentType() {
		store.get(this.href).setToIndividualAssignmentType();
	}

	_setGroupAssignmentType() {
		store.get(this.href).setToGroupAssignmentType();
	}

	_changeGroupCategory(event) {
		store.get(this.href).setAssignmentTypeGroupCategory(event.target.value);
	}

	_getInformationText(assignment) {
		if (!assignment) {
			return;
		}

		const isIndividualAssignmentType = assignment.isIndividualAssignmentType;

		if (assignment.assignmentHasSubmissions) {
			return this.localize('folderTypeCannotChange');
		}

		if (isIndividualAssignmentType && assignment.groupCategories.length === 0) {
			return this.localize('folderTypeNoGroups');
		}

		if (!isIndividualAssignmentType) {
			return this.localize('folderTypeCreateGroups');
		}

		return;
	}

	render() {
		const assignment = store.get(this.href);

		if (!assignment) {
			return html``;
		}

		const isIndividualType = assignment.isIndividualAssignmentType;
		const infoText = this._getInformationText(assignment);
		const isReadOnly = assignment.isReadOnly;
		const groupTypeDisabled = assignment.isGroupAssignmentTypeDisabled;
		const folderTypeText =	isIndividualType ? this.localize('txtIndividual') : this.localize('txtGroup');
		const groupTypeText = !isIndividualType && assignment.selectedGroupCategoryName
			? this.localize('txtGroupCategoryWithName', 'groupCategory', assignment.selectedGroupCategoryName)
			: '';

		return html`
			<div ?hidden=${!isReadOnly} id="read-only-assignment-type-container">
				<div class="d2l-body-compact">${folderTypeText}</div>
				<div class="d2l-body-compact">${groupTypeText}</div>
				<p class="d2l-body-small">${infoText}</p>
			</div>

			<div ?hidden=${isReadOnly} id="editable-assignment-type-container">
				<label class="individual-type d2l-input-radio-label">
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
				<div class="select-list group-info" ?hidden="${isIndividualType}">
					<label class="d2l-label-text">${this.localize('txtGroupCategory')}</label>
					<select
						class="d2l-input-select block-select"
						id="assignemnt-group-categories"
						@change="${this._changeGroupCategory}"
						>
						${this._getGroupCategoryOptions(assignment)}
					</select>
				</div>
				<p class="info-text d2l-body-small">${infoText}</p>
			</div>
		`;
	}
}
customElements.define('d2l-activity-assignment-type-editor', AssignmentTypeEditor);
