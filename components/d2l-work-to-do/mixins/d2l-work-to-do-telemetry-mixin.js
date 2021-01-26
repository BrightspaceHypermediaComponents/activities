import Events from 'd2l-telemetry-browser-client';

export const WorkToDoTelemetryMixin = superclass => class extends superclass {

	static get properties() {
		return {
			/** Represents telemetry endpoint to publish events to */
			_telemetryEndpoint: { type: String, attribute: 'data-telemetry-endpoint' },
		};
	}

	constructor() {
		super();

		this._telemetryEndpoint = undefined;
		this._client = undefined;
	}

	attributeChangedCallback(name, oldval, newval) {
		if (name === 'data-telemetry-endpoint') {
			this._client = newval
				? new Events.Client(newval)
				: undefined;
		}

		super.attributeChangedCallback(name, oldval, newval);
	}
};
