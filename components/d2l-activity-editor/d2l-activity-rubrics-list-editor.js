import 'd2l-rubric/d2l-rubric';
import '@brightspace-ui/core/components/dialog/dialog';
import '@brightspace-ui/core/components/dialog/dialog-confirm';
import './d2l-activity-rubric-editor';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { Associations } from 'siren-sdk/src/activities/Associations.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityRubricsListEditor extends RtlMixin(EntityMixinLit((LitElement))) {

	static get properties() {
		return {
			_singleAssociationHrefs: { type: String }
		};
	}

	static get styles() {
		return [
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}

				.d2l-heading-4 {
					margin: 0 0 0.6rem 0;
				}
			`
		];
	}

	constructor() {
		super();
		this._setEntityType(Associations);
		this._singleAssociationHrefs = [];
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivityUsageChange(entity);
			super._entity = entity;
		}
	}

	_onActivityUsageChange(associations) {
		if (!associations) {
			return;
		}
		this._singleAssociationHrefs = associations.getSingleAssocationHrefs();
	}

	_getRubrics() {
		const singleAssociations = this._singleAssociationHrefs.map(
			singleAssociationHref =>
				html`
				<d2l-activity-rubric-editor
					href="${singleAssociationHref}"
					.token="${this.token}">
				</d2l-activity-rubric-editor>
			`
		);
		return html`${singleAssociations}`;
	}

	render() {
		return html`${this._getRubrics()}`;
	}
}
customElements.define('d2l-activity-rubrics-list-editor', ActivityRubricsListEditor);
