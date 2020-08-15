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
				reflect: true,
				converter: (value) => {
					// `value` is a string
					// Convert it to a value of type `type` and return it
					if (value === 'undefined') {
						return '';
					}
					return value;
				}
			},
			/**
			 * Token JWT Token for brightspace | a function that returns a JWT token for brightspace | null (defaults to cookie authentication in a browser)
			 */
			token: { type: String },

			skeleton: {
				type: Boolean
			}
		};
	}

	constructor(store) {
		super();
		this._container = null;
		this.store = store;
		this.r = false;
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
		return promise;
	}

	_sendPendingEvent(promise) {
		const pendingEvent = new AsyncStateEvent(promise, this.localName, this.href);
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

	update(changedProperties) {
		console.log('update: ' + this.localName);
		super.update(changedProperties);
	}

	updated(changedProperties) {
		console.log('updated: ' + this.localName);
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this.store && this._fetch(() => this.store.fetch(this.href, this.token));
		}
	}
};
