import 'd2l-telemetry-browser-client/d2l-telemetry-browser-client.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.QuickEval = window.D2L.PolymerBehaviors.QuickEval || {};

/**
 * Behavior for sending telemetry messages to the telemetry service
 * @polymerBehavior
 */
D2L.PolymerBehaviors.QuickEval.TelemetryBehaviorImpl = {
	properties: {
		dataTelemetryEndpoint: {
			type: String
		}
	},
	eventType: 'TelemetryEvent',
	sourceId: 'quick-eval',

	logSortEvent: function(telemetryData) {
		const eventBody = new window.d2lTelemetryBrowserClient.EventBody();

		eventBody.setAction('Sort')
			.addCustom('columnName', telemetryData.columnName || 'unknown')
			.addCustom('sortDirection', telemetryData.sortDirection || 'unknown');
		this._logEvent(eventBody);
		return eventBody;
	},

	_logEvent: function(eventBody) {
		if (!eventBody || !this.dataTelemetryEndpoint) {
			return;
		}

		const client = new window.d2lTelemetryBrowserClient.Client({ endpoint: this.dataTelemetryEndpoint });

		const event = new window.d2lTelemetryBrowserClient.TelemetryEvent()
			.setDate(new Date())
			.setType(this.eventType)
			.setSourceId(this.sourceId)
			.setBody(eventBody);

		client.logUserEvent(event);

		return event;
	}
};

/** @polymerBehavior */
D2L.PolymerBehaviors.QuickEval.TelemetryResultBehavior = [
	D2L.PolymerBehaviors.QuickEval.TelemetryBehaviorImpl
];
