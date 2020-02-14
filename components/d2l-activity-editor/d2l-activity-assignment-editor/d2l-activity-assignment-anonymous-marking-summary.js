import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

class ActivityAssignmentAnonymousMarkingSummary
	extends EntityMixinLit(LocalizeMixin(LitElement)) {

	static get properties() {

		return {
			_isAnonymousMarkingEnabled: { type: Boolean },
		};
	}

	static get styles() {

		return css`
			:host {
				display: block;
			}

			:host([hidden]) {
				display: none;
			}
		`;
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

		this._isAnonymousMarkingEnabled = assignment.isAnonymousMarkingEnabled();
	}

	render() {

		const shouldRenderSummaryText = this._isAnonymousMarkingEnabled;
		if (!shouldRenderSummaryText) {
			return html``;
		}

		return html`${this.localize('anonymousGradingEnabled')}`;
	}
}
customElements.define(
	'd2l-activity-assignment-anonymous-marking-summary',
	ActivityAssignmentAnonymousMarkingSummary
);
