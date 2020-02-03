import { css, html, LitElement } from 'lit-element/lit-element.js';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { PendingContainerMixin } from 'siren-sdk/src/mixin/pending-container-mixin.js';

class ActivityEditor extends PendingContainerMixin(LocalizeMixin(LitElement)) {

	static get properties() {
		return {
			loading: { type: Boolean }
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
			.d2l-activity-editor-loading {
				padding: 20px;
			}
		`;
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this.loading = true;
	}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener('d2l-pending-resolved', this._onPendingResolved);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('d2l-pending-resolved', this._onPendingResolved);
	}
	_onPendingResolved() {
		// Once we've loaded the page once, this prevents us from ever showing
		// the "Loading..." div again, even if page components are (re)loading
		this.loading = false;
	}
	render() {
		return this.loading ? html`
			<div class="d2l-activity-editor-loading">${this.localize('loading')}</div>
		` : html`
			<div>
				<slot name="editor"></slot>
			</div>
		`;
	}
}
customElements.define('d2l-activity-editor', ActivityEditor);
