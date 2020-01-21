import '../d2l-activity-editor.js';
import './d2l-activity-assignment-editor-detail.js';
import './d2l-activity-assignment-editor-secondary.js';
import './d2l-activity-assignment-editor-footer.js';
import '@brightspace-ui/core/templates/primary-secondary/primary-secondary.js';
import 'd2l-save-status/d2l-save-status.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentActivityUsageEntity } from 'siren-sdk/src/activities/assignments/AssignmentActivityUsageEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { PendingContainerMixin } from 'siren-sdk/src/mixin/pending-container-mixin.js';

class AssignmentEditor extends PendingContainerMixin(EntityMixinLit(LitElement)) {

	static get properties() {
		return {
			/**
			 * True if the user's settings allow for rendering the WYSIWYG HTML editor
			 */
			htmlEditorEnabled: { type: Boolean },
			/**
			 * API endpoint for attachment unfurling service
			 */
			unfurlEndpoint: { type: String },
			/**
			 * API endpoint for determining whether a domain is trusted
			 */
			trustedSitesEndpoint: { type: String },
			_assignmentHref: { type: String },
			_initialLoadComplete: { type: Boolean }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			.d2l-activity-assignment-editor-detail-panel, .d2l-activity-assignment-editor-secondary-panel {
				padding: 20px;
			}
			d2l-save-status {
				display: inline-block;
			}
		`;
	}

	constructor() {
		super();
		this._setEntityType(AssignmentActivityUsageEntity);
		this._assignmentHref = '';
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onAssignmentActivityUsageChange(entity);
			super._entity = entity;
		}
	}

	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);

		this.addEventListener('d2l-siren-entity-save-start', () => {
			this.shadowRoot.querySelector('#save-status').start();
		});
		this.addEventListener('d2l-siren-entity-save-end', () => {
			this.shadowRoot.querySelector('#save-status').end();
		});
		this.addEventListener('d2l-siren-entity-save-error', () => {
			this.shadowRoot.querySelector('#save-status').error();
		});
	}

	_onAssignmentActivityUsageChange(assignmentActivityUsage) {
		this._assignmentHref = assignmentActivityUsage.assignmentHref();
	}

	_onRequestProvider(e) {
		if (e.detail.key === 'd2l-provider-html-editor-enabled') {
			e.detail.provider = this.htmlEditorEnabled;
			e.stopPropagation();
		}

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
			e.detail.provider = () => url => {
				const origin = new URL(url).origin;
				const unfilteredContent = `<iframe src="${origin}"></iframe>`;

				return new Promise((resolve, reject) => {
					const params = {
						filterMode: 1, // strict mode for html filtering. Refer to D2L.LP.TextProcessing.FilterModes
						html: unfilteredContent
					};
					const options = {
						success: resolve,
						failure: reject
					};
					D2L.LP.Web.UI.Rpc.Connect(
						D2L.LP.Web.UI.Rpc.Verbs.POST,
						new D2L.LP.Web.Http.UrlLocation(this.trustedSitesEndpoint),
						params,
						options
					);
				}).then(filteredContent => {
					const matchSrc = function(str) {
						// excludes matching query string as filterHtml may modify the query string
						return str.match(/src=["']([^?"']+)/i);
					};
					const unfilteredMatch = matchSrc(unfilteredContent);
					const unfilteredSrc = unfilteredMatch && unfilteredMatch.length === 2 && unfilteredMatch[1];

					const filteredMatch = matchSrc(filteredContent);
					const filteredSrc = filteredMatch && filteredMatch.length === 2 && filteredMatch[1];

					return unfilteredSrc === filteredSrc;
				});
			};
			e.stopPropagation();
		}
	}

	_onPendingResolved() {
		// Once we've loaded the page once, this prevents us from ever showing
		// the "Loading..." div again, even if page components are (re)loading
		this._initialLoadComplete = true;
	}

	render() {
		return html`
			<d2l-activity-editor
				?loading="${this._hasPendingChildren && !this._initialLoadComplete}"
				unfurlEndpoint="${this.unfurlEndpoint}"
				trustedSitesEndpoint="${this.trustedSitesEndpoint}"
				@d2l-request-provider="${this._onRequestProvider}"
				@d2l-pending-resolved="${this._onPendingResolved}">

				<d2l-template-primary-secondary slot="editor">
					<slot name="editor-nav" slot="header"></slot>
					<d2l-activity-assignment-editor-detail
						href="${this._assignmentHref}"
						.token="${this.token}"
						slot="primary"
						class="d2l-activity-assignment-editor-detail-panel">
					</d2l-activity-assignment-editor-detail>
					<d2l-activity-assignment-editor-secondary
						href="${this._assignmentHref}"
						.token="${this.token}"
						slot="secondary"
						class="d2l-activity-assignment-editor-secondary-panel">
					</d2l-activity-assignment-editor-secondary>
					<d2l-activity-assignment-editor-footer
						href="${this._assignmentHref}"
						.token="${this.token}"
						slot="footer"
						class="d2l-activity-assignment-editor-footer">
						<d2l-save-status id="save-status" slot="save-status"></d2l-save-status>
					</d2l-activity-assignment-editor-footer>
				</d2l-template-primary-secondary>
			</d2l-activity-editor>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor', AssignmentEditor);
