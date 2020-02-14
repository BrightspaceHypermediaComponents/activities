import '../d2l-activity-availability-dates-editor.js';
import '../d2l-activity-release-conditions-editor.js';
import './d2l-assignment-turnitin-editor';
import './d2l-activity-assignment-editor-submission-and-completion.js';
import './d2l-activity-assignment-availability-editor.js';
import './d2l-activity-assignment-type-editor.js';
import 'd2l-inputs/d2l-input-checkbox.js';
import 'd2l-inputs/d2l-input-checkbox-spacer.js';
import '../d2l-activity-rubrics-list-container.js';
import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { getLocalizeResources } from '../localization.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SaveStatusMixin } from '../save-status-mixin.js';

class AssignmentEditorSecondary extends SaveStatusMixin(RtlMixin(EntityMixinLit(LocalizeMixin(LitElement)))) {

	static get properties() {
		return {
			_activityUsageHref: { type: String },
			_submissionTypes: { type: Array },
			_canEditSubmissionType: { type: Boolean },
			_completionTypes: { type: Array },
			_canEditCompletionType: { type: Boolean },
			_showCompletionType: { type: Boolean },
			_canSeeAnnotations: {type: Boolean },
			_annotationToolsAvailable: { type: Boolean },
			_attachmentsHref: { type: String },
			_isAnonymousMarkingAvailable: { type: Boolean },
			_isAnonymousMarkingEnabled: { type: Boolean },
			_canEditAnonymousMarking: { type: Boolean },
			_anonymousMarkingHelpText: { type: String }
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

				.d2l-body-small {
					margin: 0 0 0.3rem 0;
				}

				d2l-input-checkbox {
					padding-right: 20px;
				}

				:host([dir="rtl"]) d2l-input-checkbox {
					padding-right: 0;
					padding-left: 20px;
				}

				d2l-input-checkbox-spacer {
					margin-top: -0.9rem;
				}

				d2l-input-checkbox-spacer[hidden] {
					display: none;
				}

				.summary {
					list-style: none;
					padding-left: 0.2rem;
					color: var(--d2l-color-galena);
				}

				.content {
					padding-top: 1rem;
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

		this._activityUsageHref = assignment.activityUsageHref();
		this._canSeeAnnotations = assignment.canSeeAnnotations();
		this._annotationToolsAvailable = assignment.getAvailableAnnotationTools();
		this._isAnonymousMarkingAvailable = assignment.isAnonymousMarkingAvailable();
		this._isAnonymousMarkingEnabled = assignment.isAnonymousMarkingEnabled();
		this._canEditAnonymousMarking = assignment.canEditAnonymousMarking();
		this._anonymousMarkingHelpText = assignment.getAnonymousMarkingHelpText();
	}

	_toggleAnnotationToolsAvailability() {
		this._annotationToolsAvailable = !this._annotationToolsAvailable;
		this.wrapSaveAction(super._entity.setAnnotationToolsAvailability(this._annotationToolsAvailable));
	}

	_saveAnonymousMarking(event) {
		this.wrapSaveAction(super._entity.setAnonymousMarking(event.target.checked));
	}

	_getAnonymousGradingSummary() {
		// TODO: replace with MobX once that is setup for this repo
		return html`
			<li class="d2l-body-compact summary-line" ?hidden=${!this._isAnonymousMarkingEnabled}>
				${this.localize('anonymousGradingEnabled')}
			</li>
		`;
	}

	_getSummarizedContentForEvaluationAndFeedback() {
		return this._getAnonymousGradingSummary();
	}

	render() {
		return html`

			<d2l-activity-assignment-availability-editor
				href="${this._activityUsageHref}"
				.token="${this.token}">
			</d2l-activity-assignment-availability-editor>

			<d2l-activity-assignment-editor-submission-and-completion
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-assignment-editor-submission-and-completion>

			<div id="availability-dates-container">
				<d2l-activity-availability-dates-editor
					href="${this._activityUsageHref}"
					.token="${this.token}">
				</d2l-activity-availability-dates-editor>
			</div>

			<d2l-activity-rubrics-list-container
				href="${this._activityUsageHref}"
				.token="${this.token}">
			</d2l-activity-rubrics-list-container>

			<div id="assignment-release-conditions-container">
				<h3 class="d2l-heading-4">${this.localize('hdrReleaseConditions')}</h3>
				<p class="d2l-body-small">${this.localize('hlpReleaseConditions')}</p>
				<d2l-activity-release-conditions-editor
					href="${this._activityUsageHref}"
					.token="${this.token}">
				</d2l-activity-release-conditions-editor>
			</div>

			<d2l-labs-accordion-collapse class="accordion" flex header-border>
				<h4 class="accordion-header" slot="header">${this.localize('evaluationAndFeedback')}</h4>
				<ul slot="summary" class="summary">
					${this._getSummarizedContentForEvaluationAndFeedback()}
				</ul>
				<div class="content">
				<div id="annotations-checkbox-container" ?hidden="${!this._canSeeAnnotations}">
				<label class="d2l-label-text">${this.localize('annotationTools')}</label>
					<d2l-input-checkbox
						@change="${this._toggleAnnotationToolsAvailability}"
						?checked="${this._annotationToolsAvailable}"
						ariaLabel="${this.localize('annotationToolDescription')}">
						${this.localize('annotationToolDescription')}
					</d2l-input-checkbox>
				</div>
				<div id="assignment-anonymous-marking-editor-container" ?hidden="${!this._isAnonymousMarkingAvailable}">
					<label class="d2l-label-text">${this.localize('lblAnonymousMarking')}</label>
					<d2l-input-checkbox
						@change="${this._saveAnonymousMarking}"
						?checked="${this._isAnonymousMarkingEnabled}"
						?disabled="${!this._canEditAnonymousMarking}"
						ariaLabel="${this.localize('chkAnonymousMarking')}">
						${this.localize('chkAnonymousMarking')}
					</d2l-input-checkbox>
					<d2l-input-checkbox-spacer ?hidden="${!this._anonymousMarkingHelpText}">
						<span class="d2l-body-small">${this._anonymousMarkingHelpText}</span>
					</d2l-input-checkbox-spacer>
				</div>
				<d2l-assignment-turnitin-editor .token="${this.token}" href="${this.href}">
				</d2l-assignment-turnitin-editor>
				</div>
			</d2l-labs-accordion-collapse>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor-secondary', AssignmentEditorSecondary);
