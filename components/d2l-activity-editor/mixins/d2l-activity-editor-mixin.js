export const ActivityEditorMixin = superclass => class extends superclass {

	static get properties() {
		return {
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
		};
	}

	constructor() {
		super();
		this._container = null;
	}

	async save() {}

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
};
