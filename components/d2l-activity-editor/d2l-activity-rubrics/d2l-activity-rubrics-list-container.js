import 'd2l-rubric/d2l-rubric';
import './d2l-activity-rubrics-list-editor';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { getLocalizeResources } from '../localization.js';
import { heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityRubricsListContainer extends RtlMixin(EntityMixinLit((LocalizeMixin(LitElement)))) {

	static get properties() {
		return {
			_rubricAssociationsHref: { type: String }
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
			`
		];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this._setEntityType(ActivityUsageEntity);
		this._rubricAssociationsHref = '';
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivityUsageChange(entity);
			super._entity = entity;
		}
	}

	_onActivityUsageChange(activityUsage) {
		if (!activityUsage) {
			return;
		}

		this._rubricAssociationsHref = activityUsage.getRubricAssociationsHref();
	}

	render() {
		return html`
			<h3 class="d2l-heading-4">${this.localize('hdrRubrics')}</h3>
			<d2l-activity-rubrics-list-editor
				href="${this._rubricAssociationsHref}"
				.token=${this.token}
			>
			</d2l-activity-rubrics-list-editor>
		`;
	}
}
customElements.define('d2l-activity-rubrics-list-container', ActivityRubricsListContainer);
