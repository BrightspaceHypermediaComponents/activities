import '../d2l-activity-editor.js';
import './d2l-activity-assignment-editor-detail.js';
import './d2l-activity-assignment-editor-secondary.js';
import './d2l-activity-assignment-editor-footer.js';
import '@brightspace-ui/core/templates/primary-secondary/primary-secondary.js';
import 'd2l-save-status/d2l-save-status.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorContainerMixin } from '../mixins/d2l-activity-editor-container-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/assignment-store.js';

class AssignmentEditor extends ActivityEditorContainerMixin(ActivityEditorMixin(MobxLitElement)) {

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
			trustedSitesEndpoint: { type: String }
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

	get _editorTemplate() {
		const activity = store.getActivity(this.href);
		if (!activity) {
			return html``;
		}

		const {
			assignmentHref
		} = activity;

		return html`
			<d2l-template-primary-secondary slot="editor">
				<slot name="editor-nav" slot="header"></slot>
				<d2l-activity-assignment-editor-detail
					href="${assignmentHref}"
					.token="${this.token}"
					slot="primary"
					class="d2l-activity-assignment-editor-detail-panel">
				</d2l-activity-assignment-editor-detail>
				<d2l-activity-assignment-editor-secondary
					href="${assignmentHref}"
					.token="${this.token}"
					slot="secondary"
					class="d2l-activity-assignment-editor-secondary-panel">
				</d2l-activity-assignment-editor-secondary>
				<d2l-activity-assignment-editor-footer
					href="${assignmentHref}"
					.token="${this.token}"
					slot="footer"
					class="d2l-activity-assignment-editor-footer">
					<d2l-save-status id="save-status" slot="save-status"></d2l-save-status>
				</d2l-activity-assignment-editor-footer>
			</d2l-template-primary-secondary>
		`;
	}

	render() {
		return html`
			<d2l-activity-editor
				.href=${this.href}
				.token=${this.token}
				unfurlEndpoint="${this.unfurlEndpoint}"
				trustedSitesEndpoint="${this.trustedSitesEndpoint}"
				@d2l-request-provider="${this._onRequestProvider}">

				${this._editorTemplate}

			</d2l-activity-editor>
		`;
	}

	async save() {
		const activity = store.getActivity(this.href);
		if (!activity) {
			return;
		}

		const assignment = store.getAssignment(activity.assignmentHref);
		if (!assignment) {
			return;
		}

		await assignment.save();
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			super._fetch(() => store.fetchActivity(this.href, this.token));
		}
	}
}
customElements.define('d2l-activity-assignment-editor', AssignmentEditor);
