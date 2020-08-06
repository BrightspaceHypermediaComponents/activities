import { AsyncStateEvent } from '@brightspace-ui/core/helpers/asyncStateEvent.js';

export const ActivityEditorMixin = superclass => class extends superclass {

	static get properties() {
		return {
			/**
			 * Activity Type
			 */
			type: {
				type: String
			},
			/**
			 * Telemetry Id
			 */
			telemetryId: {
				type: String
			},
			/**
			 * Href for the component
			 */
			href: {
				type: String,
				reflect: true
			},
			/**
			 * Token JWT Token for brightspace | a function that returns a JWT token for brightspace | null (defaults to cookie authentication in a browser)
			 */
			token: { type: String },
			/**
			 * Order in which the editor validation and saving occurs (lowest first)
			 */
			saveOrder: { attribute: 'save-order', reflect: true, type: Number },
		};
	}

	constructor(store) {
		super();
		this._container = null;
		this.store = store;
		this.saveOrder = 1000;
	}

	async validate() {}

	async save() {}

	hasPendingChanges() {
		return false;
	}

	_dispatchActivityEditorEvent() {
		const event = new CustomEvent('d2l-activity-editor-connected', {
			detail: { editor: this },
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);
		if (event.detail.container) {
			this._container = event.detail.container;
		}
	}

	async _fetch(fetcher) {
		const promise = fetcher();
		this._sendPendingEvent(promise);
		return await promise;
	}

	_sendPendingEvent(promise) {
		const pendingEvent = new AsyncStateEvent(promise);
		this.dispatchEvent(pendingEvent);
	}

	connectedCallback() {
		if (super.connectedCallback) {
			super.connectedCallback();
		}

		this._dispatchActivityEditorEvent();
	}

	disconnectedCallback() {
		if (this._container) {
			this._container.unregisterEditor(this);
		}

		if (super.disconnectedCallback) {
			super.disconnectedCallback();
		}
	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this.store && this._fetch(() => this.store.fetch(this.href, this.token));
		}
	}
};
