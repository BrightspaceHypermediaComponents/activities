import Events from 'd2l-telemetry-browser-client';

export const ActivityEditorTelemetryMixin = superclass => class extends superclass {
	logLoadEvent(href, type, telemetryId) {
		if (!href || !type || !telemetryId) return;

		const measureName = `d2l-activity-${type}-editor.page.rendered`;
		performance.measure(measureName);
		this._logUserEvent(href, 'LoadView', type, telemetryId, measureName);
	}

	logSaveEvent(href, type, telemetryId) {
		if (!href || !type || !telemetryId) return;

		const measureName = `d2l-activity-${type}-editor.page.saved`;
		performance.clearMeasures(measureName);

		const saveStartMarkName = this._getSaveStartMarkName(type);
		performance.measure(measureName, saveStartMarkName);
		this._logUserEvent(href, 'Saved', type, telemetryId, measureName);
	}

	async logTelemetryEvent(href, action, type, telemetryId) {
		if (!href || !action || !type || !telemetryId) return;

		let client;
		try {
			client = await D2L.Telemetry.CreateClient();
		} catch (e) {
			return;
		}

		const eventBody = new Events.EventBody()
			.setAction(action)
			.setObject(href, type);
		const event = new Events.TelemetryEvent()
			.setType('TelemetryEvent')
			.setDate(new Date())
			.setSourceId(telemetryId)
			.setBody(eventBody);
		client.logUserEvent(event);
	}

	markSaveStart(type, telemetryId) {
		if (!type || !telemetryId) return;
		const saveStartMarkName = this._getSaveStartMarkName(type);
		performance.clearMarks(saveStartMarkName);
		performance.mark(saveStartMarkName);
	}

	_getSaveStartMarkName(type) {
		return `d2l-activity-${type}-editor.page.save.start`;
	}

	async _logUserEvent(href, action, type, telemetryId, performanceMeasureName) {
		if (!href || !action || !type || !telemetryId || !performanceMeasureName) return;

		const eventBody = new Events.PerformanceEventBody()
			.setAction(action)
			.setObject(href, type)
			.addUserTiming(performance.getEntriesByName(performanceMeasureName));
		const event = new Events.TelemetryEvent()
			.setType('PerformanceEvent')
			.setDate(new Date())
			.setSourceId(telemetryId)
			.setBody(eventBody);
		const client = await D2L.Telemetry.CreateClient();
		client.logUserEvent(event);
	}
};
