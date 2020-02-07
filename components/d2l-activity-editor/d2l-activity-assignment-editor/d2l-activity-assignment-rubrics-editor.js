import 'd2l-rubric/d2l-rubric';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { getLocalizeResources } from '../localization.js';
import { heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityAssignmentRubricsEditor extends RtlMixin(EntityMixinLit((LocalizeMixin(LitElement)))) {

	static get properties() {
		return {
			_rubrics: { type: Array },
		};
	}

	static get styles() {
		return [
			heading4Styles,
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

				.rubric-container {
					margin: 0 0 1rem 0;
					width: 100%;
					max-width: 400px;
					display: block;
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
		this._rubrics = [];
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
		this._rubrics = assignment.getRubrics();
	}

	_getRubrics() {
		const rubrics = this._rubrics.map(
			rubric => html`
				<div class="rubric-container">
					<d2l-rubric
						force-compact
						href="${rubric.href}"
						.token="${this.token}">
					</d2l-rubric>
				</div>
				`
		);
		return html`${rubrics}`;
	}

	render() {
		return html`
			<h3 ?hidden=${this._rubrics <= 0} class="d2l-heading-4">${this.localize('txtRubrics')}</h3>
			<div>
				${this._getRubrics()}
			</div>
		`;
	}
}
customElements.define('d2l-activity-assignment-rubrics-editor', ActivityAssignmentRubricsEditor);
