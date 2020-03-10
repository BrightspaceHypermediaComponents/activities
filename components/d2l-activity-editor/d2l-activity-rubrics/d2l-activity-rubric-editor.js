import 'd2l-rubric/d2l-rubric';
import '@brightspace-ui/core/components/dialog/dialog';
import '@brightspace-ui/core/components/dialog/dialog-confirm';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { Association } from 'siren-sdk/src/activities/Association.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SaveStatusMixin } from '../save-status-mixin';

class ActivityRubricsEditor extends SaveStatusMixin(RtlMixin(EntityMixinLit((LitElement)))) {

	static get properties() {
		return {
			_rubricHref: { type: Array }
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
				.rubric-container {
					margin: 0 0 1rem 0;
					display: flex;
					align-items: center;
				}
				.delete-association-button {
					flex-shrink: 0;
					margin-left: 0.2rem;
				}
				.association-box{
					flex-grow: 1;
				}
			`
		];
	}

	constructor() {
		super();
		this._setEntityType(Association);
		this._rubricHref = '';

	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivityUsageChange(entity);
			super._entity = entity;
		}
	}

	_onActivityUsageChange(association) {
		if (!association) {
			return;
		}

		this._rubricHref = association.getRubricLink();
	}

	_deleteAssociation() {
		this.wrapSaveAction(super._entity.deleteAssociation());
	}

	render() {
		return html`
		<div class="rubric-container">
			<d2l-rubric
				class="association-box"
				force-compact
				href="${this._rubricHref}"
				.token="${this.token}">
			</d2l-rubric>
			
			<d2l-button-icon
				class="delete-association-button"
				icon="tier1:close-default"
				@click="${this._deleteAssociation}"
			></d2l-button-icon>

		</div>
		`;
	}
}
customElements.define('d2l-activity-rubric-editor', ActivityRubricsEditor);
