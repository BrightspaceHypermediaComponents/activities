import '../d2l-activity-editor.js';
import './d2l-activity-content-editor-detail.js';
import './d2l-activity-content-editor-footer.js';
import './d2l-activity-content-editor-secondary.js';
import '@brightspace-ui/core/templates/primary-secondary/primary-secondary.js';
import '@brightspace-ui/core/components/colors/colors.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorContainerMixin } from '../mixins/d2l-activity-editor-container-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/content-store.js';

class ContentEditor extends ActivityEditorContainerMixin(RtlMixin(ActivityEditorMixin(MobxLitElement))) {

	static get properties() {
		return {
			widthType: { type: String, attribute: 'width-type' }
		};
	}

	static get styles() {
		return css`
			:host {
				--d2l-primary-padding: 20px;
				--d2l-secondary-padding: 10px;
				display: block;
			}
			div[slot="primary"] {
				height: calc(100% - 2 * var(--d2l-primary-padding));
				padding: var(--d2l-primary-padding);
			}
			div[slot="secondary"] {
				background: var(--d2l-color-gypsum);
				height: calc(100% - 2 * var(--d2l-secondary-padding));
				padding: var(--d2l-secondary-padding);
			}
			d2l-icon {
				padding-right: 1rem;
			}
			:host([dir="rtl"]) d2l-icon {
				padding-left: 1rem;
				padding-right: 0;
			}
		`;
	}

	constructor() {
		super(store);
		// Override the 'scroll' property set by the page to remove the unnecessary scrollbar
		document.body.style.overflow = 'hidden';
	}

	render() {
		return html`
			<d2l-activity-editor
				type="content"
				telemetryId="content"
				.href=${this.href}
				.token=${this.token}
			>
				${this._editorTemplate}
			</d2l-activity-editor>
		`;
	}

	updated(changedProperties) {
		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			super._fetch(() => store.fetchContentActivity(this.href, this.token));
		}
	}

	hasPendingChanges() {
		// TODO
		return false;
	}

	async save() {
		// TODO
		return;
	}

	get _editorTemplate() {
		return html`
			<d2l-template-primary-secondary slot="editor" width-type="${this.widthType}">
				<slot name="editor-nav" slot="header"></slot>
				<div slot="primary">
					<d2l-activity-content-editor-detail
						.href="${this.href}"
						.token="${this.token}"
					>
					</d2l-activity-content-editor-detail>
				</div>
				<div slot="secondary">
					<d2l-activity-content-editor-secondary
						.href="${this.href}"
						.token="${this.token}"
					>
					</d2l-activity-content-editor-secondary>
				</div>
				<div slot="footer">
					<d2l-activity-content-editor-footer
						.href="${this.href}"
						.token="${this.token}"
					>
					</d2l-activity-content-editor-footer>
				</div>
			</d2l-template-primary-secondary>
		`;
	}
}
customElements.define('d2l-activity-content-editor', ContentEditor);
