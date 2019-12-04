import '@brightspace-ui/core/components/button/button.js';
import { css, html, LitElement } from 'lit-element/lit-element';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

class ActivityReleaseConditionsEditor extends EntityMixinLit(LocalizeMixin(LitElement)) {

	static get properties() {

		return {
			_hidden: { type: Boolean },
			_url: { type: String }
		};
	}

	static get styles() {

		return [
			css`
			d2l-button-subtle {
				margin-left: -0.6rem;
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
	}

	set _entity(entity) {

		if (!this._entityHasChanged(entity)) {
			return;
		}

		if (entity) {
			this._hidden = !entity.canEditReleaseConditions();
			this._url = entity.editReleaseConditionsUrl();
		}
		super._entity = entity;
	}

	_onClickEdit() {

		if (!this._url) {
			return;
		}

		// Launch into our friend, the LMS, to do the thing.
		const location = new D2L.LP.Web.Http.UrlLocation(this._url);
		D2L.LP.Web.UI.Common.MasterPages.Dialog.Open(this, location);
	}

	render() {

		return html`
			<d2l-button-subtle
				?hidden="${this._hidden}"
				text="${this.localize('btnEditReleaseConditions')}"
				@click="${this._onClickEdit}">
			</d2l-button-subtle>
		`;
	}
}

customElements.define('d2l-activity-release-conditions-editor', ActivityReleaseConditionsEditor);
