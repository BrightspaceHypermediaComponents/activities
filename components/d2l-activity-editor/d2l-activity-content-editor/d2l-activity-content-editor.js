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
import { trustedSitesProviderFn } from '../shared/trusted-site-provider.js';

class ContentEditor extends LocalizeActivityEditorMixin(RtlMixin(ActivityEditorMixin(MobxLitElement))) {

	static get properties() {
		return {
			htmlEditorEnabled: { type: Boolean },
			htmlNewEditorEnabled: { type: Boolean },
			widthType: { type: String, attribute: 'width-type' },
			isNew: { type: Boolean },
			cancelHref: { type: String },
			saveHref: { type: String },
			unfurlEndpoint: { type: String },
			trustedSitesEndpoint: { type: String },
			sortHTMLTemplatesByName: { type: Boolean }
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
			#d2l-activity-content-editor-primary-panel {
				height: 100%;
			}
			d2l-activity-content-editor-detail {
				height: inherit;
			}
		`;
	}

	constructor() {
		super(store);
		this.preCommitHref = null;
		this.postCommitHref = null;
		this.onSaveComplete = null;
	}

	connectedCallback() {
		super.connectedCallback();
		// storing onSaveComplete handler in property in order to have 'this' work as expected,
		// see https://lit.dev/docs/components/events/#understanding-this-in-event-listeners and
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
		this.onSaveComplete = ({ detail: { saveInPlace } }) =>
			(saveInPlace ? this._updateUsageHrefPostCommit() : this._redirectOnSaveComplete());

		this.addEventListener('d2l-activity-editor-save-complete', this.onSaveComplete);
		this.addEventListener('d2l-activity-editor-cancel-complete', this._redirectOnCancelComplete);
		this.addEventListener('d2l-content-working-copy-committed', this._contentWorkingCopyCommitted);
	}
	disconnectedCallback() {
		this.removeEventListener('d2l-activity-editor-save-complete', this.onSaveComplete);
		this.removeEventListener('d2l-activity-editor-cancel-complete', this._redirectOnCancelComplete);
		this.removeEventListener('d2l-content-working-copy-committed', this._contentWorkingCopyCommitted);
		super.disconnectedCallback();
	}

	render() {
		return html`
			<d2l-activity-editor
				type="content"
				telemetryId="content"
				.href=${this.href}
				.token=${this.token}
				unfurlEndpoint="${this.unfurlEndpoint}"
				trustedSitesEndpoint="${this.trustedSitesEndpoint}"
				@d2l-request-provider="${this._onRequestProvider}"
				width-type="${this.widthType}"
				error-term="${this.localize('content.saveError')}"
				?isnew="${this.isNew}"
				?html-editor-enabled="${this.htmlEditorEnabled}"
				?html-new-editor-enabled="${this.htmlNewEditorEnabled}">
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

	_contentWorkingCopyCommitted(e) {
		const { originalActivityUsageHref, updatedActivityUsageHref } = e.detail;
		if (originalActivityUsageHref === this.href &&
			originalActivityUsageHref !== updatedActivityUsageHref) {
			this.preCommitHref = originalActivityUsageHref;
			this.postCommitHref = updatedActivityUsageHref;
		}
	}

	get _editorTemplate() {
		return html`
			<slot name="editor-nav" slot="header"></slot>
			<div slot="primary" id="d2l-activity-content-editor-primary-panel">
				<d2l-activity-content-editor-detail
					.href="${this.href}"
					.token="${this.token}"
					?sortHTMLTemplatesByName="${this.sortHTMLTemplatesByName}"
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

	_onRequestProvider(e) {
		// Provides unfurl API endpoint for d2l-labs-attachment component
		// https://github.com/Brightspace/attachment/blob/e44cab1f0cecc55dd93acf59212fabc6872c0bd3/components/attachment.js#L110
		if (e.detail.key === 'd2l-provider-unfurl-api-endpoint') {
			e.detail.provider = () => this.unfurlEndpoint;
			e.stopPropagation();
			return;
		}

		// Provides function to validate if a URL is trusted for d2l-labs-attachment
		// https://github.com/Brightspace/attachment/blob/e44cab1f0cecc55dd93acf59212fabc6872c0bd3/components/attachment.js#L115
		if (e.detail.key === 'd2l-provider-trusted-site-fn') {
			e.detail.provider = trustedSitesProviderFn(this.trustedSitesEndpoint);
			e.stopPropagation();
		}
	}

	_redirectOnCancelComplete() {
		if (this.cancelHref) {
			window.location.href = this.cancelHref;
		}
	}

	_redirectOnSaveComplete() {
		if (this.saveHref) {
			window.location.href = this.saveHref;
		}
	}

	_updateUsageHrefPostCommit() {
		if (this.preCommitHref === this.href && this.postCommitHref) {
			this.href = this.postCommitHref;
			this.preCommitHref = null;
			this.postCommitHref = null;
		}
	}
}
customElements.define('d2l-activity-content-editor', ContentEditor);
