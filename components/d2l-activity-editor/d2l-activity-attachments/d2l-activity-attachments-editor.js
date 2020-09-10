import './d2l-activity-attachments-list';
import './d2l-activity-attachments-picker';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { SkeletizeMixin } from '../mixins/d2l-skeletize-mixin';
import { shared as store } from './state/attachment-collections-store.js';

class ActivityAttachmentsEditor extends ActivityEditorMixin(SkeletizeMixin(MobxLitElement)) {
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
		if (!collection) {
			return html``;
		}

		const {
			canAddAttachments,
		} = collection || {
			canAddAttachments: true
		};

		return html`<d2l-activity-attachments-list
			?hidden="${this.skeleton}"
			href="${this.href}"
			.token="${this.token}">
		</d2l-activity-attachments-list>
			${canAddAttachments ? html`
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
	async save() {
		const collection = store.get(this.href);
		if (collection) {
			await collection.save();
		}
	}

}
customElements.define('d2l-activity-attachments-editor', ActivityAttachmentsEditor);
