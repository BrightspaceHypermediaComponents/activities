import '@brightspace-ui/core/components/button/button';
import '@brightspace-ui/core/components/colors/colors';
import 'd2l-tooltip/d2l-tooltip';
import { css, html, LitElement } from 'lit-element/lit-element';
import { AttachmentCollectionEntity } from 'siren-sdk/src/activities/AttachmentCollectionEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

class ActivityAttachmentsPicker extends EntityMixinLit(LocalizeMixin(LitElement)) {
	static get properties() {
		return {
			_canAddLink: { type: Boolean },
			_canAddGoogleDriveLink: { type: Boolean },
			_canAddOneDriveLink: { type: Boolean }
		};
	}

	static get styles() {
		return css`
			:host {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				background: var(--d2l-color-regolith);
				border-radius: 6px;
				border: 1px solid var(--d2l-color-mica);
				padding: 12px;
			}

			.button-container {
				display: flex;
				flex-direction: row;
			}

			.button-container > * {
				display: inline-block;
			}
		`;
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this._setEntityType(AttachmentCollectionEntity);
	}

	set _entity(entity) {
		if (!this._entityHasChanged(entity)) {
			return;
		}

		if (entity) {
			this._canAddLink  = entity.canAddLinkAttachment();
			this._canAddGoogleDriveLink = entity.canAddGoogleDriveLinkAttachment();
			this._canAddOneDriveLink = entity.canAddOneDriveLinkAttachment();
		}

		super._entity = entity;
	}

	render() {
		return html`
			<div id="button-container">
				<d2l-button-icon
					id="add-quicklink-button"
					icon="d2l-tier1:quicklink"
					?hidden="${!this._canAddLink}">
				</d2l-button-icon>
				<d2l-tooltip for="add-quicklink-button">${this.localize('addQuicklink')}</d2l-tooltip>

				<d2l-button-icon
					id="add-link-button"
					icon="d2l-tier1:link"
					?hidden="${!this._canAddLink}">
				</d2l-button-icon>
				<d2l-tooltip for="add-link-button">${this.localize('addLink')}</d2l-tooltip>

				<d2l-button-icon
					id="add-google-drive-link-button"
					icon="d2l-tier1:google-drive"
					?hidden="${!this._canAddGoogleDriveLink}">
				</d2l-button-icon>
				<d2l-tooltip for="add-google-drive-link-button">${this.localize('addGoogleDriveLink')}</d2l-tooltip>

				<d2l-button-icon
					id="add-onedrive-link-button"
					icon="d2l-tier1:one-drive"
					?hidden="${!this._canAddOneDriveLink}">
				</d2l-button-icon>
				<d2l-tooltip for="add-onedrive-link-button">${this.localize('addOneDriveLink')}</d2l-tooltip>
			</div>
		`;
	}
}
customElements.define('d2l-activity-attachments-picker', ActivityAttachmentsPicker);
