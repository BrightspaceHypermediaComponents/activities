import '@brightspace-ui/core/components/button/button.js';
import 'd2l-save-status/d2l-save-status.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { connect } from './connect-mixin.js';
import { ActivityEditorMixin } from './d2l-activity-editor-mixin.js';
import reducer, { storeName, actions} from './state/activity-usage.js';

class ActivityEditor extends connect(ActivityEditorMixin(LitElement)) {

	static get properties() {
		return {
			loading: { type: Boolean },
			/**
			 * API endpoint for attachment unfurling service
			 */
			unfurlEndpoint: { type: String },
			/**
			 * API endpoint for determining whether a domain is trusted
			 */
			trustedSitesEndpoint: { type: String },
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
				padding: 20px;
			}
			:host([hidden]) {
				display: none;
			}
			d2l-save-status {
				padding-bottom: 20px;
			}
		`;
	}

	constructor() {
		super();
		this._storeName = storeName;
	}

	get _reducers() {
		return reducer;
	}

	_mapStateToProps() {
		return {};
	}

	_mapDispatchToProps(dispatch) {
		return {
			_fetchActivity: () => dispatch(actions.fetchActivity(this.href, this.token)),
			_saveActivity: () => dispatch(actions.saveActivity(this.href, this.token))
		}
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this._fetchActivity();
		}
	}

	async _save() {
		await this._saveActivity();

		const event = new CustomEvent('d2l-activity-editor-save', {
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);
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

	render() {
		return html`
			<d2l-save-status
				id="save-status">
			</d2l-save-status>
			<div ?hidden="${!this.loading}">Loading ...</div>
			<div
				?hidden="${this.loading}"
				@d2l-request-provider="${this._onRequestProvider}">

				<slot name="editor"></slot>
				<d2l-button @click="${this._save}" primary>Save</d2l-button>
			</div>
		`;
	}
}
customElements.define('d2l-activity-editor', ActivityEditor);
