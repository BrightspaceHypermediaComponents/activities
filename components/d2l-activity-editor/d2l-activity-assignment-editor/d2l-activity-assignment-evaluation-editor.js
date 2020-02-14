import './d2l-activity-assignment-annotations-summary.js';
import './d2l-assignment-turnitin-editor.js';
import 'd2l-inputs/d2l-input-checkbox.js';
import 'd2l-inputs/d2l-input-checkbox-spacer.js';
import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SaveStatusMixin } from '../save-status-mixin.js';

class ActivityAssignmentEvaluationEditor
	extends SaveStatusMixin(RtlMixin(EntityMixinLit(LocalizeMixin(LitElement)))) {

	static get properties() {
		return {
			_canSeeAnnotations: {type: Boolean },
			_annotationToolsAvailable: { type: Boolean },
			_isAnonymousMarkingAvailable: { type: Boolean },
			_isAnonymousMarkingEnabled: { type: Boolean },
			_canEditAnonymousMarking: { type: Boolean },
			_anonymousMarkingHelpText: { type: String }
		};
	}

	static get styles() {
		return [
			bodySmallStyles,
			labelStyles,
			css`
				:host {
					display: block;
				}

				:host([hidden]) {
					display: none;
				}

				.editor {
					margin: 1rem 0;
				}

				.d2l-body-small {
					margin: 0 0 0.3rem 0;
				}

				d2l-input-checkbox {
					padding-right: 1rem;
				}

				:host([dir="rtl"]) d2l-input-checkbox {
					padding-right: 0;
					padding-left: 1rem;
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
			`
		];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this._setEntityType(AssignmentEntity);
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

	_renderAnonymousMarkingSummary() {

		return html`
			<li class="d2l-body-compact"
				?hidden=${!this._isAnonymousMarkingEnabled}>
				${this.localize('anonymousGradingEnabled')}
			</li>
		`;
	}

	_renderAnonymousMarkingEditor() {

		return html`
			<div class="editor"
				?hidden="${!this._isAnonymousMarkingAvailable}">
				<label class="d2l-label-text">
					${this.localize('lblAnonymousMarking')}
				</label>
				<d2l-input-checkbox
					@change="${this._saveAnonymousMarking}"
					?checked="${this._isAnonymousMarkingEnabled}"
					?disabled="${!this._canEditAnonymousMarking}"
					ariaLabel="${this.localize('chkAnonymousMarking')}">
					${this.localize('chkAnonymousMarking')}
				</d2l-input-checkbox>
				<d2l-input-checkbox-spacer
					class="d2l-body-small"
					?hidden="${!this._anonymousMarkingHelpText}">
					${this._anonymousMarkingHelpText}
				</d2l-input-checkbox-spacer>
			</div>
		`;
	}

	_renderAnnotationsSummary(){

		return html`
			<d2l-activity-assignment-annotations-summary
				href="${this.href}"
				.token="${this.token}"
				>
			</d2l-activity-assignment-annotations-summary>
		`;
	}

	_renderAnnotationsEditor() {

		return html`
			<div class="editor"
				?hidden="${!this._canSeeAnnotations}">
				<label class="d2l-label-text">
					${this.localize('annotationTools')}
				</label>
				<d2l-input-checkbox
					@change="${this._toggleAnnotationToolsAvailability}"
					?checked="${this._annotationToolsAvailable}"
					ariaLabel="${this.localize('annotationToolDescription')}">
					${this.localize('annotationToolDescription')}
				</d2l-input-checkbox>
			</div>
		`;
	}

	_renderTurnitinSummary() {

		return html``;
	}

	_renderTurnitinEditor() {

		return html`
			<d2l-assignment-turnitin-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-assignment-turnitin-editor>
		`;
	}

	render() {

		return html`
			<d2l-labs-accordion-collapse flex header-border>
				<h4 class="header" slot="header">
					${this.localize('evaluationAndFeedback')}
				</h4>
				<ul class="summary" slot="summary">
					${this._renderAnonymousMarkingSummary()}
					${this._renderAnnotationsSummary()}
					${this._renderTurnitinSummary()}
				</ul>
				${this._renderAnnotationsEditor()}
				${this._renderAnonymousMarkingEditor()}
				${this._renderTurnitinEditor()}
			</d2l-labs-accordion-collapse>
		`;
	}
}
customElements.define(
	'd2l-activity-assignment-evaluation-editor',
	ActivityAssignmentEvaluationEditor
);
