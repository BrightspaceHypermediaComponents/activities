import { html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

class ActivityAssignmentAnnotationsSummary
	extends EntityMixinLit(LocalizeMixin(LitElement)) {

	static get properties() {

		return {
			_canSeeAnnotations: { type: Boolean },
			_annotationToolsAvailable: { type: Boolean },
		};
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

	render() {

		const shouldRenderSummaryText =
			this._canSeeAnnotations &&
			!this._annotationToolsAvailable;
		if (!shouldRenderSummaryText) {
			return html``;
		}

		return html`${this.localize('txtAnnotationsOff')}`;
	}
}

customElements.define(
	'd2l-activity-assignment-annotations-summary',
	ActivityAssignmentAnnotationsSummary
);
