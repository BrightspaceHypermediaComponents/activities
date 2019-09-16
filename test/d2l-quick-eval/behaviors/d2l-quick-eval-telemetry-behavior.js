import 'd2l-telemetry-browser-client/d2l-telemetry-browser-client.js';
(function() {
	var telemetryBehaviour;

	suite('d2l-quick-eval-telemetry-behavior', function() {
		setup(function() {
			telemetryBehaviour = fixture('basic');
			window.d2lfetch = {
				fetch: function() {}
			};
			window.performance = {
				mark: function() {},
				clearMarks: function() {},
				clearMeasures: function() {},
				measure: function() {},
				getEntriesByName: function(x) {
					return [x];
				}
			};
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
			const telemetryData = 'testView';
			const expectedTelemetryData = 'testViewLoadTime';

			const event = telemetryBehaviour.logAndDestroyPerformanceEvent(telemetryData);
			assert.equal(expectedTelemetryData, event._custom[0].value);
		});

		test('logAndDestroyPerformanceEvent is not created when mark doesnt exist', () => {
			window.performance = {
				getEntriesByName: function() {
					return false;
				}
			};
			telemetryBehaviour.dataTelemetryEndpoint = 'testEndpoint';
			const telemetryData = 'testView';

			const event = telemetryBehaviour.logAndDestroyPerformanceEvent(telemetryData, 'fake', 'fake');

			window.performance = {
				getEntriesByName: function(x) {
					return x;
				}
			};

			assert.equal(undefined, event);
		});
	});
})();
