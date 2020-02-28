import { bodyCompactStyles, bodySmallStyles, bodyStandardStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import { shared as store } from './state/assignment-store.js';

class AssignmentTypeEditor extends ActivityEditorMixin(LocalizeMixin(MobxLitElement)) {

	static get properties() {
		return {
			_folderTypeText: { type: String },
			_groupTypeText: { type: String }
		};
	}

	static get styles() {
		return [
			bodyCompactStyles,
			bodyStandardStyles,
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
		super();
	}

	_onAssignmentChange(assignment) {
		if (!assignment) {
			return;
		}
		this._folderTypeText =
			this._isIndividualType
				? this.localize('txtIndividual')
				: this.localize('txtGroup');

		if (!this._isIndividualType) {
			const selectedGroupCategoryName = assignment.getAssignmentTypeSelectedGroupCategoryName();
			this._groupTypeText = this.localize('txtGroupCategoryWithName', 'groupCategory', selectedGroupCategoryName);
		}
	}

	_getGroupCategoryOptions(assignment) {
		debugger;
		if(assignment){
			return html`${assignment.groupCategories.map(
				option => html`
					<option value=${option.value} ?selected=${option.selected}>
						${option.title}
					</option>
					`
			)}`;
		}
		return html``;
	}

	_setIndividualAssignmentType() {
		this.wrapSaveAction(super._entity.setToIndividualAssignmentType());
	}

	_setGroupAssignmentType() {
		this.wrapSaveAction(super._entity.setToGroupAssignmentType());
	}

	_changeGroupCategory(event) {
		this.wrapSaveAction(super._entity.setAssignmentTypeGroupCategory(event.target.value));
	}

	render() {
		const assignment = store.getAssignment(this.href);
		const isIndividualType = assignment ? assignment.isIndividualAssignmentType : true;
		const infoText = assignment ? assignment.infoText : '';
		const isReadOnly = assignment ? assignment.isReadOnly : true;
		const groupTypeDisabled = assignment ? assignment.isGroupAssignmentTypeDisabled : true;

		return html`
			<div ?hidden=${!isReadOnly} id="read-only-assignment-type-container">
				<div class="d2l-body-standard">${this._folderTypeText}</div>
				<div class="d2l-body-compact">${this._groupTypeText}</div>
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
