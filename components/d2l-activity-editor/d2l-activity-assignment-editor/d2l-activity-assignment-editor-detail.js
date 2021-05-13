import '@brightspace-ui/core/components/inputs/input-text.js';
import 'd2l-tooltip/d2l-tooltip';
import '../d2l-activity-due-date-editor.js';
import '../d2l-activity-outcomes.js';
import '../d2l-activity-score-editor.js';
import '../d2l-activity-text-editor.js';
import '../d2l-activity-attachments/d2l-activity-attachments-editor.js';

import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { css, html } from 'lit-element/lit-element.js';

import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { editorLayoutStyles } from '../styles/activity-editor-styles';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SaveStatusMixin } from '../save-status-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as store } from './state/assignment-store.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

class AssignmentEditorDetail extends AsyncContainerMixin(SkeletonMixin(SaveStatusMixin(LocalizeActivityAssignmentEditorMixin(RtlMixin(ActivityEditorMixin(MobxLitElement)))))) {

	static get properties() {
		return {
			activityUsageHref: { type: String, attribute: 'activity-usage-href' },
			_createSelectboxGradeItemEnabled: { type: Boolean }
		};
	}

	static get styles() {
		return [
			super.styles,
			labelStyles,
			editorLayoutStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				:host([skeleton]) .d2l-skeletize::before {
					z-index: 2;
				}
				#score-and-duedate-container {
					display: flex;
					flex-wrap: wrap;
					padding-bottom: 0;
				}
				#score-container {
					margin-right: 40px;
				}
				.d2l-activity-label-container {
					margin-bottom: 8px;
				}
				:host([dir="rtl"]) #score-container {
					margin-left: 40px;
					margin-right: 0;
				}
				d2l-alert {
					margin-bottom: 10px;
					max-width: 100%;
				}
				.d2l-locked-alert {
					align-items: baseline;
					display: flex;
				}
				d2l-icon {
					padding-right: 1rem;
				}
				:host([dir="rtl"]) d2l-icon {
					padding-left: 1rem;
					padding-right: 0;
				}
			`
		];
	}

	constructor() {
		super(store);
		this._debounceJobs = {};
		this.skeleton = true;
		this.saveOrder = 2000;
	}

	connectedCallback() {
		super.connectedCallback();

		const event = new CustomEvent('d2l-request-provider', {
			detail: { key: 'd2l-provider-create-selectbox-grade-item-enabled' },
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);

		this._createSelectboxGradeItemEnabled = event.detail.provider;
	}

	render() {
		const assignment = store.get(this.href);

		const {
			name,
			canEditName,
			instructions,
			canEditInstructions,
			attachmentsHref,
			instructionsRichTextEditorConfig,
		} = assignment || {};

		const hasSubmissions = assignment && assignment.submissionAndCompletionProps.assignmentHasSubmissions;

		return html`
			<d2l-alert ?hidden=${!hasSubmissions}>
				<div class="d2l-locked-alert">
					<d2l-icon icon="tier1:lock-locked"></d2l-icon>
					<div>${this.localize('assignmentLocked')}</div>
				</div>
			</d2l-alert>
			<div id="assignment-name-container">
				<d2l-input-text
					?skeleton="${this.skeleton}"
					id="assignment-name"
					maxlength="128"
					value="${name}"
					@change="${this._saveOnChange('name')}"
					@input="${this._saveNameOnInput}"
					label="${this.localize('name')}"
					required
					?disabled="${!canEditName}"
					prevent-submit>
				</d2l-input-text>
			</div>

			${canEditName ? /** This is a hack. US117892. Learning outcomes shouldn't show if the user lacks the Assignment Add/Edit Submission Folders permission.
								We are using `canEditName` instead of relying on something in outcomes,
								because the outcomes Manage Alignments permission is currently not truly pluggable,
								and so it cannot be plugged into Dropbox to check Assignment permissions.
				*/ html`
					<d2l-activity-outcomes
						class="d2l-editor-layout-section"
						href="${this.activityUsageHref}"
						.token="${this.token}"
						align-button-text="${this.localize('btnSave')}">
					</d2l-activity-outcomes>
				` : null}

			<div id="score-and-duedate-container">
				<div id="score-container" class="d2l-editor-layout-section">
					<div class="d2l-activity-label-container d2l-label-text d2l-skeletize">
						${this._createSelectboxGradeItemEnabled ? this.localize('gradeOutOf') : this.localize('scoreOutOf')}
					</div>
					<d2l-activity-score-editor
						?skeleton="${this.skeleton}"
						.href="${this.activityUsageHref}"
						.token="${this.token}"
						.activityName="${name}">
					</d2l-activity-score-editor>
				</div>

				<div id="duedate-container" class="d2l-editor-layout-section">
					<d2l-activity-due-date-editor
						?skeleton="${this.skeleton}"
						.href="${this.activityUsageHref}"
						.token="${this.token}">
					</d2l-activity-due-date-editor>
				</div>
			</div>

			<div id="assignment-instructions-container">
				<div class="d2l-activity-label-container d2l-label-text d2l-skeletize">
					${this.localize('instructions')}
				</div>
				<div class="d2l-skeletize">
					<d2l-activity-text-editor
						.value="${instructions}"
						.richtextEditorConfig="${instructionsRichTextEditorConfig}"
						@d2l-activity-text-editor-change="${this._saveInstructionsOnChange}"
						ariaLabel="${this.localize('instructions')}"
						?disabled="${canEditInstructions === undefined ? false : !canEditInstructions}">
					</d2l-activity-text-editor>
				</div>
			</div>

			<div id="assignment-attachments-editor-container" ?hidden="${!attachmentsHref && !this.skeleton}">
				<d2l-activity-attachments-editor
					?skeleton="${this.skeleton}"
					href="${attachmentsHref}"
					.token="${this.token}"
					@d2l-request-provider="${this._onRequestProvider}">
				</d2l-activity-attachments-editor>
			</div>
		`;
	}
	updated(changedProperties) {
		super.updated(changedProperties);

		if (changedProperties.has('asyncState')) {
			this.skeleton = this.asyncState !== asyncStates.complete;
		}
	}

	async cancelCreate() {
		const assignment = store.get(this.href);
		return assignment && assignment.cancelCreate();
	}

	hasPendingChanges() {
		const assignment = store.get(this.href);
		if (!assignment) {
			return false;
		}

		return assignment.dirty;
	}

	async save() {
		const assignment = store.get(this.href);
		if (!assignment) {
			return;
		}
		this._saveOnChange('instructions');
		await assignment.save();
	}

	_debounce(debounceJobs, fn, interval) {
		const isFirstChange = !debounceJobs;

		debounceJobs = Debouncer.debounce(
			debounceJobs,
			timeOut.after(interval),
			() => fn()
		);

		if (isFirstChange) {
			debounceJobs.flush();
		}
	}

	_onRequestProvider(e) {
		// Provides orgUnitId for d2l-labs-attachment
		// https://github.com/Brightspace/attachment/blob/74a66e85f03790aa9f4e6ec5025cd3c62cfb5264/mixins/attachment-mixin.js#L19
		if (e.detail.key === 'd2l-provider-org-unit-id') {
			const assignment = store.get(this.href);
			const richTextEditorConfig = assignment && assignment.instructionsRichTextEditorConfig;
			e.detail.provider = richTextEditorConfig && richTextEditorConfig.properties && richTextEditorConfig.properties.orgUnit && richTextEditorConfig.properties.orgUnit.OrgUnitId;
			e.stopPropagation();
			return;
		}
	}

	_saveInstructions(value) {
		store.get(this.href).setInstructions(value);
	}

	_saveInstructionsOnChange(e) {
		const instructions = e.detail.content;
		this._debounce(
			this._debounceJobs.instructions,
			() => this._saveInstructions(instructions),
			500
		);
	}

	_saveName(value) {
		store.get(this.href).setName(value);
	}

	_saveNameOnInput(e) {
		const name = e.target.value;
		this._debounce(
			this._debounceJobs.name,
			() => this._saveName(name),
			500
		);
	}

	_saveOnChange(jobName) {
		this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	}

}
customElements.define('d2l-activity-assignment-editor-detail', AssignmentEditorDetail);
