import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { getLocalizeResources } from '../localization.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SaveStatusMixin } from '../save-status-mixin.js';

class ActivityAssignmentAnnotationsEditor
	extends SaveStatusMixin(RtlMixin(EntityMixinLit(LocalizeMixin(LitElement)))) {

	static get properties() {

		return {
			_canSeeAnnotations: { type: Boolean },
			_annotationToolsAvailable: { type: Boolean },
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

			d2l-input-checkbox {
				padding-right: 1rem;
			}

			:host([dir="rtl"]) d2l-input-checkbox {
				padding-right: 0;
				padding-left: 1rem;
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
	}

	_toggleAnnotationToolsAvailability() {

		const value = !this._annotationToolsAvailable;
		const promise = super._entity.setAnnotationToolsAvailability(value);
		this._annotationToolsAvailable = value;
		this.wrapSaveAction(promise);
	}

	render() {

		const shouldRenderEditor = this._canSeeAnnotations;
		if (!shouldRenderEditor) {
			return html``;
		}

		return html`
			<label class="d2l-label-text">
				${this.localize('annotationTools')}
			</label>
			<d2l-input-checkbox
				@change="${this._toggleAnnotationToolsAvailability}"
				?checked="${this._annotationToolsAvailable}"
				ariaLabel="${this.localize('annotationToolDescription')}">
				${this.localize('annotationToolDescription')}
			</d2l-input-checkbox>
		`;
	}
}

customElements.define(
	'd2l-activity-assignment-annotations-editor',
	ActivityAssignmentAnnotationsEditor
);
