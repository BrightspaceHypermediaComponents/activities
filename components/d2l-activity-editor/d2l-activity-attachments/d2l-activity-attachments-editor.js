import './d2l-activity-attachments-list';
import './d2l-activity-attachments-picker';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as store } from './state/attachment-collections-store.js';

class ActivityAttachmentsEditor extends ActivityEditorMixin(SkeletonMixin(MobxLitElement)) {
	static get properties() {
		return {
			_canAddAttachments: { type: Boolean },
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
		super(store);
	}

	render() {
		const collection = store.get(this.href);
		if (!collection && !this.skeleton) {
			return html``;
		}

		const {
			canAddAttachments,
		} = collection || {};

		return html`<d2l-activity-attachments-list
			?hidden="${this.skeleton}"
			href="${this.href}"
			.token="${this.token}">
		</d2l-activity-attachments-list>
			${canAddAttachments || this.skeleton ? html`
		<d2l-activity-attachments-picker
			?skeleton="${this.skeleton}"
			href="${this.href}"
			.token="${this.token}"
		>
		</d2l-activity-attachments-picker>
	` : html``}
`;
	}

	hasPendingChanges() {
		const collection = store.get(this.href);
		return collection && collection.dirty;
	}
	async save(saveInPlace) {
		const collection = store.get(this.href);
		if (collection) {
			await collection.save(saveInPlace);
		}
	}

}
customElements.define('d2l-activity-attachments-editor', ActivityAttachmentsEditor);
