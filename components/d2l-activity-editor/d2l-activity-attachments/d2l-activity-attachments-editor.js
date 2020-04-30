import './d2l-activity-attachments-list';
import './d2l-activity-attachments-picker';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/attachment-collections-store.js';

class ActivityAttachmentsEditor extends ActivityEditorMixin(MobxLitElement) {
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
			:host > * {
				margin-bottom: 20px;
			}
		`;
	}

	constructor() {
		super(store);
	}

	render() {
		const collection = store.get(this.href);
		if (!collection) {
			return html``;
		}

		const {
			canAddAttachments,
		} = collection;

		return html`
			<d2l-activity-attachments-list
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-attachments-list>

			${canAddAttachments	?	html`
				<d2l-activity-attachments-picker
					href="${this.href}"
					.token="${this.token}"
				>
				</d2l-activity-attachments-picker>
			` :	html``}
		`;
	}

	async save() {
		const collection = store.get(this.href);
		if (collection) {
			await collection.save();
		}
	}

	hasPendingChanges() {
		const collection = store.get(this.href);
		return collection && collection.dirty;
	}
}
customElements.define('d2l-activity-attachments-editor', ActivityAttachmentsEditor);
