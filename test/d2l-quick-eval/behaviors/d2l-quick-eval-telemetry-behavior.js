import 'd2l-telemetry-browser-client/d2l-telemetry-browser-client.js';
(function() {
	var telemetryBehaviour;
	let sandbox;

	suite('d2l-quick-eval-telemetry-behavior', function() {
		setup(function() {
			telemetryBehaviour = fixture('basic');
			window.d2lfetch = {
				fetch: function() {}
			};
			sandbox = sinon.sandbox.create();
		});

		teardown(function() {
			sandbox.restore();
		});
		test('_logEvent nothing is returned with no event body', () => {
			telemetryBehaviour.dataTelemetryEndpoint = 'https:??test.string.d2l';
			assert.equal(undefined, telemetryBehaviour._logEvent());
		});

		test('_logEvent nothing is returned with no telemetry endpoint', () => {
			telemetryBehaviour.dataTelemetryEndpoint = 'testEndpoint';
			assert.equal(undefined, telemetryBehaviour._logEvent());
		});

		test('_logEvent event is created properly', () => {
			telemetryBehaviour.dataTelemetryEndpoint = 'testEndpoint';
			const eventBody = new window.d2lTelemetryBrowserClient.EventBody();
			const eventData = {
				Action: 'Sort',
				EventType: 'TelemetryEvent',
				SourceId: 'quick-eval',
				Custom: [
					{
						name:'columnName',
						value:'activityName'
					},
					{
						name:'sortDirection',
						value:'testValue'
					}
				]
			};

			eventBody.setAction(eventData.Action)
				.addCustom('columnName', eventData.Custom[0].value)
				.addCustom('sortDirection', eventData.Custom[1].value);

			const event = telemetryBehaviour._logEvent(eventBody);
			assert.equal(eventData.EventType, event._eventType);
			assert.equal(eventData.SourceId, event._sourceId);
			assert.equal(eventData.Action, event._eventBody._action);
			assert.deepEqual(eventData.Custom, event._eventBody._custom);
		});

		test('logSortEvent event is created properly', () => {
			telemetryBehaviour.dataTelemetryEndpoint = 'testEndpoint';
			const telemetryData =
					{
						columnName:'testColumn',
						sortDirection:'testDirection'
					};

			const event = telemetryBehaviour.logSortEvent(telemetryData);
			assert.equal(telemetryData.columnName, event._custom[0].value);
			assert.equal(telemetryData.sortDirection, event._custom[1].value);
		});

		test('logViewQuickEvalEvent event is created properly', () => {
			telemetryBehaviour.dataTelemetryEndpoint = 'testEndpoint';
			const telemetryData = 'testView';

			const event = telemetryBehaviour.logViewQuickEvalEvent(telemetryData);
			assert.equal(telemetryData, event._custom[0].value);
		});

		test('logAndDestroyPerformanceEvent event is created properly', () => {
			telemetryBehaviour.dataTelemetryEndpoint = 'testEndpoint';
			const viewName = 'testView';
			const expectedViewName = 'testViewLoadTime';
			const startMark = 'start';
			const endMark = 'end';
			const actionName = 'LoadView';
			const performanceMock = sandbox.mock(window.performance);
			performanceMock.expects('clearMarks').withArgs(startMark);
			performanceMock.expects('clearMarks').withArgs(endMark);
			performanceMock.expects('measure').withArgs(viewName, startMark, endMark);
			performanceMock.expects('clearMeasures').withArgs(viewName);
			performanceMock.expects('getEntriesByName').withArgs(startMark).returns([1, 2]);
			performanceMock.expects('getEntriesByName').withArgs(viewName).returns([1, 2]);

			const event = telemetryBehaviour.logAndDestroyPerformanceEvent(viewName, startMark, endMark);
			assert.equal(expectedViewName, event._custom[0].value);
			assert.equal(actionName, event._action);

			sandbox.verify();
		});

		test('logAndDestroyPerformanceEvent is not created when mark doesnt exist', () => {
			telemetryBehaviour.dataTelemetryEndpoint = 'testEndpoint';
			const viewName = 'testView';
			const startMark = 'start';
			const endMark = 'end';
			const performanceMock = sandbox.mock(window.performance);
			performanceMock.expects('getEntriesByName').withArgs(startMark, 'mark').returns([]);

			const event = telemetryBehaviour.logAndDestroyPerformanceEvent(viewName, startMark, endMark);

			assert.equal(undefined, event);
			sandbox.verify();
		});
	});
})();
