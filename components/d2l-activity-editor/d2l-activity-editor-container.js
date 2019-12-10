import '@brightspace-ui/core/components/button/button.js';
import 'd2l-save-status/d2l-save-status.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ProviderMixin } from './instance-provider-mixin.js';
import { store } from './state/store.js';
import activityStoreName from './state/store-name.js';

class ActivityEditorContainer extends ProviderMixin(LitElement) {

	static get properties() {
		return {
			loading: { type: Boolean },
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
		this.provideInstance(activityStoreName, store);
	}

	_save() {

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

	render() {
		return html`
			<slot></slot>
		`;
	}
}
customElements.define('d2l-activity-editor-container', ActivityEditorContainer);
