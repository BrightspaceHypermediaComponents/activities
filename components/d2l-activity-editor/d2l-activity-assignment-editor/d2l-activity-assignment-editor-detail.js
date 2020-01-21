import 'd2l-inputs/d2l-input-text.js';
import 'd2l-tooltip/d2l-tooltip';
import '../d2l-activity-due-date-editor.js';
import '../d2l-activity-score-editor.js';
import '../d2l-activity-text-editor.js';
import '../d2l-activity-attachments/d2l-activity-attachments-editor.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../error-handling-mixin.js';
import { getLocalizeResources } from '../localization.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SaveStatusMixin } from '../save-status-mixin.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

class AssignmentEditorDetail extends ErrorHandlingMixin(SaveStatusMixin(EntityMixinLit(LocalizeMixin(RtlMixin(LitElement))))) {

	static get properties() {
		return {
			_name: { type: String },
			_nameError: { type: String },
			_canEditName: { type: Boolean },
			_instructions: { type: String },
			_instructionsRichTextEditorConfig: { type: Object },
			_canEditInstructions: { type: Boolean },
			_activityUsageHref: { type: String },
			_attachmentsHref: { type: String }
		};
	}

	static get styles() {
		return [
			labelStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				:host > div {
					padding-bottom: 20px;
				}
				#score-and-duedate-container {
					display: flex;
					flex-wrap: wrap;
				}
				#score-container {
					margin-right: 40px;
				}
				:host([dir="rtl"]) #score-container {
					margin-right: 0;
					margin-left: 40px;
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
		this._debounceJobs = {};

		this._activityUsageHref = '';
		this._attachmentsHref = '';
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

		this._name = assignment.name();
		this._canEditName = assignment.canEditName();
		this._instructions = assignment.instructionsEditorHtml();
		this._instructionsRichTextEditorConfig = assignment.instructionsRichTextEditorConfig();
		this._canEditInstructions = assignment.canEditInstructions();
		this._activityUsageHref = assignment.activityUsageHref();
		this._attachmentsHref = assignment.attachmentsCollectionHref();
	}

	_saveOnChange(jobName) {
		this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	}

	_saveName(value) {
		this.wrapSaveAction(super._entity.setName(value));
	}

	_saveInstructions(value) {
		this.wrapSaveAction(super._entity.setInstructions(value));
	}

	_saveNameOnInput(e) {
		const name = e.target.value;
		const isNameEmpty = (name || '').trim().length === 0;

		const errorProperty = '_nameError';
		const emptyNameErrorLangterm = 'emptyNameError';
		const tooltipId = 'name-tooltip';

		if (isNameEmpty) {
			this.setError(errorProperty, emptyNameErrorLangterm, tooltipId);
		} else {
			this.clearError(errorProperty);
			this._debounceJobs.name = Debouncer.debounce(
				this._debounceJobs.name,
				timeOut.after(500),
				() => this._saveName(name)
			);
		}
	}

	_saveInstructionsOnChange(e) {
		const instructions = e.detail.content;

		this._debounceJobs.instructions = Debouncer.debounce(
			this._debounceJobs.instructions,
			timeOut.after(500),
			() => this._saveInstructions(instructions)
		);
	}

	_getNameTooltip() {
		if (this._nameError) {
			return html`
				<d2l-tooltip
					id="name-tooltip"
					for="assignment-name"
					position="bottom"
					?showing="${this._nameError}">
					${this._nameError}
				</d2l-tooltip>
			`;
		}
	}

	render() {
		return html`
			<div id="assignment-name-container">
				<label class="d2l-label-text" for="assignment-name">${this.localize('name')}*</label>
				<d2l-input-text
					id="assignment-name"
					value="${this._name}"
					@change="${this._saveOnChange('name')}"
					@input="${this._saveNameOnInput}"
					aria-label="${this.localize('name')}"
					?disabled="${!this._canEditName}"
					aria-invalid="${this._nameError ? 'true' : ''}"
					prevent-submit>
				</d2l-input-text>
				${this._getNameTooltip()}
			</div>

			<div id="score-and-duedate-container">
				<div id="score-container">
					<label class="d2l-label-text">${this.localize('scoreOutOf')}</label>
					<d2l-activity-score-editor
						href="${this._activityUsageHref}"
						.token="${this.token}">
					</d2l-activity-score-editor>
				</div>

				<div id="duedate-container">
					<label class="d2l-label-text">${this.localize('dueDate')}</label>
					<d2l-activity-due-date-editor
						href="${this._activityUsageHref}"
						.token="${this.token}">
					</d2l-activity-due-date-editor>
				</div>
			</div>

			<div id="assignment-instructions-container">
				<label class="d2l-label-text">${this.localize('instructions')}</label>
				<d2l-activity-text-editor
					value="${this._instructions}"
					.richtextEditorConfig="${this._instructionsRichTextEditorConfig}"
					@d2l-activity-text-editor-change="${this._saveInstructionsOnChange}"
					ariaLabel="${this.localize('instructions')}"
					?disabled="${!this._canEditInstructions}">
				</d2l-activity-text-editor>
			</div>

			<div id="assignment-attachments-editor-container" ?hidden="${!this._attachmentsHref}">
				<d2l-activity-attachments-editor
					href="${this._attachmentsHref}"
					.token="${this.token}">
				</d2l-activity-attachments-editor>
			</div>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor-detail', AssignmentEditorDetail);
