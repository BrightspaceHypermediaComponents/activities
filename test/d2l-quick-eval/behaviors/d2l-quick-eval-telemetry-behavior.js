(function() {
	var telemetryBehaviour;

	suite('d2l-quick-eval-telemetry-behavior', function() {
		setup(function() {
			telemetryBehaviour = fixture('basic');
		});
		test('nothing is returned with no event body', () => {
			//telemetryBehaviour.properties.dataTelemetryEndpoint = 'https:??test.string.d2l';
			// assert.isNotOk(telemetryBehaviour.searchAction);
			// assert.isFalse(telemetryBehaviour.searchApplied);
			// assert.isFalse(telemetryBehaviour.searchError);
			assert.equal(undefined, telemetryBehaviour._logEvent());
		});
	});
})();
