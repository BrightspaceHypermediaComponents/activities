import 'd2l-inputs/d2l-input-text.js';
import 'd2l-tooltip/d2l-tooltip';
import '../d2l-activity-due-date-editor.js';
import '../d2l-activity-outcomes.js';
import '../d2l-activity-score-editor.js';
import '../d2l-activity-text-editor.js';
import '../d2l-activity-attachments/d2l-activity-attachments-editor.js';

import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { css, html } from 'lit-element/lit-element.js';
import { renderSkeleton, skeletonStyles } from '../skeleton.js';

import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { shared as attachmentCollectionStore } from '../d2l-activity-attachments/state/attachment-collections-store.js';
import { shared as attachmentStore } from '../d2l-activity-attachments/state/attachment-store.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { ErrorHandlingMixin } from '../error-handling-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LinksInMessageProcessor } from '@d2l/d2l-attachment/helpers/links-in-message-processor.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SaveStatusMixin } from '../save-status-mixin.js';
import { shared as store } from './state/assignment-store.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

class AssignmentEditorDetail extends AsyncContainerMixin(ErrorHandlingMixin(SaveStatusMixin(LocalizeActivityAssignmentEditorMixin(RtlMixin(ActivityEditorMixin(MobxLitElement)))))) {

	static get properties() {
		return {
			_nameError: { type: String },
			_attachmentsHref: { type: String },
			_linksProcessor: { type: Object },
			activityUsageHref: {
				type: String,
				attribute: 'activity-usage-href'
			},
			skeleton: { type: Boolean, reflect: true }
		};
	}

	static get styles() {
		return [
			skeletonStyles,
			labelStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				:host > div,
				d2l-activity-outcomes,
				#score-container {
					padding-bottom: 20px;
				}
				#score-and-duedate-container {
					display: flex;
					flex-wrap: wrap;
					min-height: 90px;  /* Hack to force a consistent the height for the old */
					padding-bottom: 0; /* datetime picker. Can hopefully be removed when the new picker is used.*/
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

	constructor() {
		super();
		this._debounceJobs = {};

		this._attachmentsHref = '';
		this._linksProcessor = new LinksInMessageProcessor();
		this.skeleton = true;
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onAssignmentChange(entity);
			super._entity = entity;
		}
	}

	addLinks(links) {
		const collection = attachmentCollectionStore.get(this._attachmentsHref);
		links = links || [];
		links.forEach(element => {
			collection.addAttachment(attachmentStore.createLink(element.name, element.url));
		});
	}

	_saveInstructions(value) {
		store.getAssignment(this.href).setInstructions(value);
		this._debounceJobs.value = Debouncer.debounce(
			this._debounceJobs.value,
			timeOut.after(2000),
			() => this._linksProcessor.process(value, linkAttachments => this.addLinks(linkAttachments))
		);
	}

	_onAssignmentChange(assignment) {
		if (!assignment) {
			return;
		}

		this._attachmentsHref = assignment.attachmentsCollectionHref();
	}

	_saveOnChange(jobName) {
		this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	}

	_saveName(value) {
		store.getAssignment(this.href).setName(value);
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
		const assignment = store.getAssignment(this.href);
		// if (!assignment) {
		// 	return html``;
		// }

		const {
			name,
			canEditName,
			instructions,
			canEditInstructions,
			instructionsRichTextEditorConfig
		} = assignment || {} ;

		return html`
			<div id="assignment-name-container">
				<label class="skeletize d2l-label-text" for="assignment-name">${this.localize('name')}*</label>
				<d2l-input-text
				  class="skeletize"
					id="assignment-name"
					maxlength="128"
					value="${name}"
					@change="${this._saveOnChange('name')}"
					@input="${this._saveNameOnInput}"
					aria-label="${this.localize('name')}"
					?disabled="${!canEditName}"
					aria-invalid="${this._nameError ? 'true' : ''}"
					prevent-submit>
				</d2l-input-text>
				${this._getNameTooltip()}
			</div>

			<d2l-activity-outcomes
				href="${this.activityUsageHref}"
				.token="${this.token}">
			</d2l-activity-outcomes>

			<div id="score-and-duedate-container">
				<div id="score-container">
					<label class="skeletize d2l-label-text">
						${this.localize('scoreOutOf')}
					</label>
					<d2l-activity-score-editor
						href="${this.activityUsageHref}"
						.token="${this.token}"
						.activityName="${name}"
						?skeleton="${this.skeleton}">
					</d2l-activity-score-editor>
				</div>

				<div id="duedate-container">
					<d2l-activity-due-date-editor
						href="${this.activityUsageHref}"
						.token="${this.token}"
						?skeleton="${this.skeleton}">
					</d2l-activity-due-date-editor>
				</div>
			</div>

			<div id="assignment-instructions-container">
				<label class="skeletize d2l-label-text">${this.localize('instructions')}</label>
				<d2l-activity-text-editor
				  ?skeleton="${this.skeleton}"
				  class="skeletize"
					.value="${instructions}"
					.richtextEditorConfig="${instructionsRichTextEditorConfig}"
					@d2l-activity-text-editor-change="${this._saveInstructionsOnChange}"
					ariaLabel="${this.localize('instructions')}"
					?disabled="${!canEditInstructions}">
				</d2l-activity-text-editor>
			</div>

			<div id="assignment-attachments-editor-container">
				<d2l-activity-attachments-editor
				  ?skeleton="${this.skeleton}"
					href="${this._attachmentsHref}"
					.token="${this.token}">
				</d2l-activity-attachments-editor>
			</div>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			super._fetch(() => store.fetchAssignment(this.href, this.token));
		}

		if (changedProperties.has('asyncState')) {
			this.skeleton = this.asyncState !== asyncStates.complete;
		}
	}
}
customElements.define('d2l-activity-assignment-editor-detail', AssignmentEditorDetail);
