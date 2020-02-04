import { bodyCompactStyles, bodySmallStyles, bodyStandardStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SaveStatusMixin } from '../save-status-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

class AssignmentTypeEditor extends SaveStatusMixin(RtlMixin(EntityMixinLit(LocalizeMixin(LitElement)))) {

	static get properties() {
		return {
			_folderTypeText: { type: String },
			_groupCategories: { type: Array },
			_groupHomepageLink: { type: String },
			_groupTypeDisabled: { type: Boolean },
			_groupTypeText: { type: String },
			_infoText: { type: String },
			_isIndividualType: { type: Boolean },
			_isReadOnly: { type: String }
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
					padding-left: 1.8rem;
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
		this._folderTypeText = '';
		this._groupCategories = [];
		this._groupHomepageLink = '';
		this._groupTypeDisabled = false;
		this._groupTypeText = '';
		this._infoText = '';
		this._isIndividualType = false;
		this._isReadOnly = true;
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
		this._isIndividualType = assignment.isIndividualAssignmentType();
		this._infoText = assignment.getAssignmentTypeInformationText();
		this._isReadOnly = assignment.isAssignmentTypeReadOnly();
		this._groupTypeDisabled = assignment.isGroupAssignmentTypeDisabled();
		this._groupCategories = assignment.getAssignmentTypeGroupCategoryOptions();
		this._groupHomepageLink = assignment.getGroupsHomepageLink();
		this._folderTypeText =
			this._isIndividualType
				? this.localize('txtIndividual')
				: this.localize('txtGroup');

		if (!this._isIndividualType) {
			const selectedGroupCategoryName = assignment.getAssignmentTypeSelectedGroupCategoryName();
			this._groupTypeText = this.localize('txtGroupCategoryWithName', 'groupCategory', selectedGroupCategoryName);
		}
	}

	_getGroupCategoryOptions() {
		const options = this._groupCategories.map(
			option => html`
				<option value=${option.value} ?selected=${option.selected}>
					${option.title}
				</option>
				`
		);
		return html`${options}`;
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

	_getAssignmentInfoText() {

		if (this._groupHomepageLink === null) {
			return html`<p class="info-text d2l-body-small">${this._infoText}</p>`;
		} else {
			return html`
			<a
				class="info-text d2l-body-small"
				target="_blank"
				rel="noreferrer noopener"
				href="${this._groupHomepageLink}"
			>
			${this._infoText}
			</a>
		`;
		}

	}

	render() {
		return html`
			<div ?hidden=${!this._isReadOnly} id="read-only-assignment-type-container">
				<div class="d2l-body-standard">${this._folderTypeText}</div>
				<div class="d2l-body-compact">${this._groupTypeText}</div>
				<p class="d2l-body-small">${this._infoText}</p>
			</div>
			
			<div ?hidden=${this._isReadOnly} id="editable-assignment-type-container">
				<label class="d2l-input-radio-label">
					<input
						id="assignment-type-individual"
						type="radio"
						name="assignment-type"
						value="1"
						@change="${this._setIndividualAssignmentType}"
						?checked="${this._isIndividualType}"
					>
					${this.localize('txtIndividual')}
				</label>
				<label class="d2l-input-radio-label ${this._groupTypeDisabled ? 'd2l-input-radio-label-disabled' : ''}">
					<input
						id="assignment-type-group"
						type="radio"
						name="assignment-type"
						value="2"
						@change="${this._setGroupAssignmentType}"
						?checked="${!this._isIndividualType}"
						?disabled="${this._groupTypeDisabled}"
					>
					${this.localize('txtGroup')}
				</label>
				<div class="select-list group-info" ?hidden="${this._isIndividualType}">
					<label class="d2l-label-text">${this.localize('txtGroupCategory')}</label>
					<select
						class="d2l-input-select block-select"
						id="assignemnt-group-categories"
						@change="${this._changeGroupCategory}"
						>
						${this._getGroupCategoryOptions()}
					</select>
				</div>
				${this._getAssignmentInfoText()}
			</div>
		`;
	}
}
customElements.define('d2l-activity-assignment-type-editor', AssignmentTypeEditor);
