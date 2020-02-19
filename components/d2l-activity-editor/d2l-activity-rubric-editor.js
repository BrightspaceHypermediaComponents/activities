import 'd2l-rubric/d2l-rubric';
import '@brightspace-ui/core/components/dialog/dialog';
import '@brightspace-ui/core/components/dialog/dialog-confirm';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { Association } from 'siren-sdk/src/activities/Association.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SaveStatusMixin } from './save-status-mixin';

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
					width: 100%;
					max-width: 400px;
					display: block;
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

	render() {
		return html`
		<div class="rubric-container">
			<d2l-rubric
				force-compact
				href="${this._rubricHref}"
				.token="${this.token}">
			</d2l-rubric>
		</div>
		`;
	}
}
customElements.define('d2l-activity-rubric-editor', ActivityRubricsEditor);
