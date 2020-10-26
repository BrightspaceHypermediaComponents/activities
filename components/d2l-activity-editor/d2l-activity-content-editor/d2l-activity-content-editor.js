import '../d2l-activity-editor.js';
import '../d2l-activity-editor-footer.js';
import './d2l-activity-content-editor-detail.js';
import './d2l-activity-content-editor-secondary.js';
import '@brightspace-ui/core/templates/primary-secondary/primary-secondary.js';
import '@brightspace-ui/core/components/colors/colors.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { shared as activityStore } from '../state/activity-store.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/content-store.js';

class ContentEditor extends LocalizeActivityEditorMixin(RtlMixin(ActivityEditorMixin(MobxLitElement))) {

	static get properties() {
		return {
			widthType: { type: String, attribute: 'width-type' },
			/**
			 * Is Creating New
			 */
			isNew: { type: Boolean }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
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
		// Only show the scrollbar when necessary
		document.body.style.overflow = 'auto';
	}

	render() {
		return html`
			<d2l-activity-editor
				type="content"
				telemetryId="content"
				.href=${this.href}
				.token=${this.token}
				width-type="${this.widthType}"
				error-term="${this.localize('content.saveError')}"
				?isnew="${this.isNew}"
			>
				${this._editorTemplate}
			</d2l-activity-editor>
		`;
	}

	updated(changedProperties) {
		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			super._fetch(() => store.fetchContentActivity(this.href, this.token));
			super._fetch(() => activityStore.fetch(this.href, this.token));
		}
	}

	get _editorTemplate() {
		return html`
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
		`;
	}
}
customElements.define('d2l-activity-content-editor', ContentEditor);
