import '@brightspace-ui/core/components/button/button';
import '@brightspace-ui/core/components/colors/colors';
import 'd2l-tooltip/d2l-tooltip';
import { css, html, LitElement } from 'lit-element/lit-element';
import { AttachmentCollectionEntity } from 'siren-sdk/src/activities/AttachmentCollectionEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { SaveStatusMixin } from '../save-status-mixin';

class ActivityAttachmentsPicker extends SaveStatusMixin(EntityMixinLit(LocalizeMixin(LitElement))) {
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

		this._tooltipBoundary = {
			left: 20 + 12, // padding-left applied to d2l-activity-attachments-picker + padding-left of d2l-button-icon
			right: 0
		};
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

	_openDialog(opener, settings, callback) {
		const match = this.href.match(/\.(com|d2l)\/(\d+)\//);
		if (!match || match.length < 3) {
			return;
		}
		const orgUnitId = match[2];

		const params = new URLSearchParams();
		params.set('initialViewType', 'Items');
		params.set('canChangeType', false); // Hides the top toolbar which allows changing the dialog picker type
		params.set('outputFormat', 'html'); // Only valid value is "html"

		for (const setting in settings) {
			params.set(setting, settings[setting]);
		}

		const location = `/d2l/lp/quicklinks/manage/${orgUnitId}/CreateDialog?${params.toString()}`;

		const event = D2L.LP.Web.UI.Common.MasterPages.Dialog.Open(
			opener,
			new D2L.LP.Web.Http.UrlLocation(location)
		);

		event.AddListener(callback);

		return orgUnitId;
	}

	_launchAddQuicklinkDialog() {
		const opener = this.shadowRoot.querySelector('#add-quicklink-button');
		const settings = {
			typeKey: '',
			initialViewType: 'Default',
			pickOnly: true // Prevents creating new items from the picker
		};

		const orgUnitId = this._openDialog(opener, settings, async event => {
			const quicklinkUrl = `/d2l/api/lp/unstable/${orgUnitId}/quickLinks/${event.m_typeKey}/${event.m_id}`;
			const response = await fetch(quicklinkUrl);
			const json = await response.json();
			this.wrapSaveAction(super._entity.addLinkAttachment(event.m_title, json.QuickLink));
		});
	}

	_launchAddLinkDialog() {
		const opener = this.shadowRoot.querySelector('#add-link-button');
		const settings = {
			typeKey: 'url',
			customTitle: '', // Hides "Insert Quicklink" title on dialog
			showCancelButton: false, // Uses urlShowCancelButtonInline instead
			urlShowCancelButtonInline: true, // Shows the Cancel button next to Insert button
			urlShowTarget: false // Hides ability to set URL to open in same window/new window
		};

		this._openDialog(opener, settings, event => {
			this.wrapSaveAction(super._entity.addLinkAttachment(event.m_title, event.m_url));
		});
	}

	_launchAddGoogleDriveLinkDialog() {
		const opener = this.shadowRoot.querySelector('#add-google-drive-link-button');
		const settings = {
			typeKey: 'google-drive',
			customTitleLangTerm: 'Pickers.Quicklinks.titleAddMaterials',
			showCancelButton: false // Google Drive picker has its own cancel button
		};

		this._openDialog(opener, settings, event => {
			this.wrapSaveAction(super._entity.addGoogleDriveLinkAttachment(event.m_title, event.m_url));
		});
	}

	_launchAddOneDriveLinkDialog() {
		const opener = this.shadowRoot.querySelector('#add-onedrive-link-button');
		const settings = {
			typeKey: 'one-drive',
			customTitleLangTerm: 'Pickers.Quicklinks.titleAddMaterials',
			showCancelButton: false // OneDrive picker has its own cancel button
		};

		this._openDialog(opener, settings, event => {
			this.wrapSaveAction(super._entity.addOneDriveLinkAttachment(event.m_title, event.m_url));
		});
	}

	render() {
		return html`
			<div id="button-container">
				<d2l-button-icon
					id="add-quicklink-button"
					icon="d2l-tier1:quicklink"
					?hidden="${!this._canAddLink}"
					@click="${this._launchAddQuicklinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-quicklink-button"
					.boundary="${this._tooltipBoundary}">
					${this.localize('addQuicklink')}
				</d2l-tooltip>

				<d2l-button-icon
					id="add-link-button"
					icon="d2l-tier1:link"
					boundary="${this._tooltipBoundary}"
					?hidden="${!this._canAddLink}"
					@click="${this._launchAddLinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-link-button"
					.boundary="${this._tooltipBoundary}">
					${this.localize('addLink')}
				</d2l-tooltip>

				<d2l-button-icon
					id="add-google-drive-link-button"
					icon="d2l-tier1:google-drive"
					boundary="${this._tooltipBoundary}"
					?hidden="${!this._canAddGoogleDriveLink}"
					@click="${this._launchAddGoogleDriveLinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-google-drive-link-button"
					.boundary="${this._tooltipBoundary}">
					${this.localize('addGoogleDriveLink')}
				</d2l-tooltip>

				<d2l-button-icon
					id="add-onedrive-link-button"
					icon="d2l-tier1:one-drive"
					boundary="${this._tooltipBoundary}"
					?hidden="${!this._canAddOneDriveLink}"
					@click="${this._launchAddOneDriveLinkDialog}">
				</d2l-button-icon>
				<d2l-tooltip
					for="add-onedrive-link-button"
					.boundary="${this._tooltipBoundary}">
					${this.localize('addOneDriveLink')}
				</d2l-tooltip>
			</div>
		`;
	}
}
customElements.define('d2l-activity-attachments-picker', ActivityAttachmentsPicker);
