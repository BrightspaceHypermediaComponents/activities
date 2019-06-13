import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-telemetry-browser-client/d2l-telemetry-browser-client.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.QuickEval = window.D2L.PolymerBehaviors.QuickEval || {};

/**
 * Behavior for sending telemetry messages to the telemetry service
 * @polymerBehavior
 */
D2L.PolymerBehaviors.QuickEval.TelemetryBehaviorImpl = {
	logSortEvent: function(telemetryData) {
		if (!telemetryData || !telemetryData.endpoint) {
			return;
		}

		const client = new window.d2lTelemetryBrowserClient.Client({ endpoint: telemetryData.endpoint });
		const eventBody = new window.d2lTelemetryBrowserClient.EventBody();

		eventBody.setAction('Sort')
			.addCustom('columnName', telemetryData.columnName || 'unknown')
			.addCustom('sortDirection', telemetryData.sortDirection || 'unknown');

		const event = new window.d2lTelemetryBrowserClient.TelemetryEvent()
			.setDate(new Date())
			.setType('TelemetryEvent')
			.setSourceId('quick-eval')
			.setBody(eventBody);

		client.logUserEvent(event);
	}
};

/** @polymerBehavior */
D2L.PolymerBehaviors.QuickEval.TelemetryResultBehavior = [
	D2L.PolymerBehaviors.QuickEval.TelemetryBehaviorImpl,
	window.D2L.Hypermedia.HMConstantsBehavior
];
