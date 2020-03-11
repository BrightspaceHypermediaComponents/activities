import '@d2l/d2l-attachment/components/attachment';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/attachment-store.js';

class ActivityAttachment extends ActivityEditorMixin(MobxLitElement) {

	static get styles() {
		return css`
			:host {
				display: block;
			}
		`;
	}

	constructor() {
		super(store);
	}

	_onToggleRemoved() {
		const attachment = store.get(this.href);
		attachment.markDeleted(!attachment.deleted);
	}

	render() {
		const item = store.get(this.href);

		if (!item) {
			return html``;
		}

		const {
			id,
			attachment,
			editing,
			creating,
			deleted
		} = item;

		return html`
			<d2l-labs-attachment
			  baseHref=""
				attachmentId="${id}"
				.attachment="${attachment}"
				?deleted="${deleted}"
				?creating="${creating}"
				?editing="${editing}"
				@d2l-attachment-removed="${this._onToggleRemoved}"
				@d2l-attachment-restored="${this._onToggleRemoved}"
			>
			</d2l-labs-attachment>
		`;
	}
}

customElements.define('d2l-activity-attachment', ActivityAttachment);
