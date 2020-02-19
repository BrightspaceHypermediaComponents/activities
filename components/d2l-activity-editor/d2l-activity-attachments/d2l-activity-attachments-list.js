import '@d2l/d2l-attachment/components/attachment-list';
import './d2l-activity-attachment';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { repeat } from 'lit-html/directives/repeat';
import { shared as store } from './state/attachment-collections-store.js';

class ActivityAttachmentsList extends ActivityEditorMixin(MobxLitElement) {

	static get styles() {
		return css`
			:host {
				display: block;
			}
			d2l-activity-attachment {
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
			attachments,
			canAddAttachments
		} = collection;

		return html`
			<d2l-labs-attachment-list ?editing="${canAddAttachments}">
				${repeat(attachments, href => href, href => html`
					<li slot="attachment" class="panel">
						<d2l-activity-attachment
							href="${href}"
							.token="${this.token}">
						</d2l-activity-attachment>
					</li>
				`)}
			</d2l-labs-attachment-list>
		`;
	}
}

customElements.define('d2l-activity-attachments-list', ActivityAttachmentsList);
