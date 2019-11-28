import './d2l-activity-attachments-picker';
import { css, html, LitElement } from 'lit-element/lit-element';
import { AttachmentCollectionEntity } from 'siren-sdk/src/activities/AttachmentCollectionEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';

class ActivityAttachmentsEditor extends EntityMixinLit(LitElement) {
	static get properties() {
		return {
			_canAddAttachments: { type: Boolean }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
		`;
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
			this._canAddAttachments = entity.canAddAttachments();
		}

		super._entity = entity;
	}

	render() {
		return html`
			<d2l-activity-attachments-picker
				?hidden="${!this._canAddAttachments}"
				.href="${this.href}"
				.token="${this.token}">
			</d2l-activity-attachments-picker>
		`;
	}
}
customElements.define('d2l-activity-attachments-editor', ActivityAttachmentsEditor);
