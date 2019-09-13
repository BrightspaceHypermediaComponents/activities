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
	logViewQuickEvalEvent: function(viewName) {
		const eventBody = new window.d2lTelemetryBrowserClient.EventBody();

		eventBody.setAction('View')
			.addCustom('ViewName', viewName || 'unknown');
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
	},
	perfMark: function(name) {
		if (!window.performance || !window.performance.mark) {
			return;
		}
		window.performance.mark(name);
	},
	logAndDestroyPerformanceEvent: function(viewName, startMark, endMark) {
		if (!window.performance || !window.performance.measure || !this._markExists(startMark)) {
			return;
		}
		window.performance.measure(viewName, startMark, endMark);
		const eventBody = new window.d2lTelemetryBrowserClient.PerformanceEventBody()
			.addUserTiming(window.performance.getEntriesByName(viewName))
			.addCustom('ViewName', `${viewName}LoadTime`);

		this._logEvent(eventBody);
		window.performance.clearMarks(startMark);
		window.performance.clearMarks(endMark);
		window.performance.clearMeasures(viewName);
	},
	_markExists(markName) {
		return window.performance.getEntriesByName(markName, 'mark').length > 0 ? true : false;
	}
};

/** @polymerBehavior */
D2L.PolymerBehaviors.QuickEval.TelemetryResultBehavior = [
	D2L.PolymerBehaviors.QuickEval.TelemetryBehaviorImpl
];
