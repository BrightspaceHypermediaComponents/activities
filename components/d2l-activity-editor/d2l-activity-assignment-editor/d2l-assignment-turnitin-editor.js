import '@brightspace-ui/core/components/button/button.js';
import { bodySmallStyles, heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { getLocalizeResources } from '../localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

class AssignmentTurnitinEditor extends EntityMixinLit(LocalizeMixin(LitElement)) {

	static get properties() {

		return {
			_hidden: { type: Boolean },
			_url: { type: String }
		};
	}

	static get styles() {

		return [
			bodySmallStyles,
			heading4Styles,
			css`
			.d2l-heading-4 {
				margin: 0 0 0.6rem 0;
			}

			.d2l-body-small {
				margin: 0 0 0.3rem 0;
			}

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
		this._setEntityType(AssignmentEntity);
	}

	set _entity(entity) {

		if (!this._entityHasChanged(entity)) {
			return;
		}

		if (entity) {
			this._hidden = !entity.canEditTurnitin();
			this._url = entity.editTurnitinUrl();
		}
		super._entity = entity;
	}

	_onClickEdit() {

		if (!this._url) {
			return;
		}

		const location = new D2L.LP.Web.Http.UrlLocation(this._url);
		const buttons = [
			{
				Key: 'save',
				Text: this.localize('btnSave'),
				ResponseType: 1, // D2L.Dialog.ResponseType.Positive
				IsPrimary: true,
				IsEnabled: true
			},
			{
				Text: this.localize('btnCancel'),
				ResponseType: 2, // D2L.Dialog.ResponseType.Negative
				IsPrimary: false,
				IsEnabled: true
			}
		];

		// Launch into our friend, the LMS, to do the thing.
		D2L.LP.Web.UI.Legacy.MasterPages.Dialog.Open(
			/*               opener: */ document.body,
			/*             location: */ location,
			/*          srcCallback: */ 'SrcCallback',
			/*       resizeCallback: */ '',
			/*      responseDataKey: */ '',
			/*                width: */ 720,
			/*               height: */ 1280,
			/*            closeText: */ this.localize('btnCloseDialog'),
			/*              buttons: */ buttons,
			/* forceTriggerOnCancel: */ false
		);
	}

	render() {

		return html`
			<div id="assignment-turnitin-container" ?hidden="${this._hidden}">
				<h4 class="d2l-heading-4">${this.localize('hdrTurnitin')}</h4>
				<p class="d2l-body-small">${this.localize('hlpTurnitin')}</p>
				<d2l-button-subtle
					text="${this.localize('btnEditTurnitin')}"
					@click="${this._onClickEdit}">
				</d2l-button-subtle>
			</div>
		`;
	}
}

customElements.define('d2l-assignment-turnitin-editor', AssignmentTurnitinEditor);
