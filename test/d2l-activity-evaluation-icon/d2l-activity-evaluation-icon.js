(function() {

	async function loadPromise(url, activityEvaluationIconComponent) {
		var entity = await window.D2L.Siren.EntityStore.fetch(url, '');
		await activityEvaluationIconComponent._configureBase(entity.entity);
		return activityEvaluationIconComponent;
	}

	suite('d2l-activity-evaluation-icon', function() {
		var evaluationIcon;

		setup(function() {
			window.D2L.Siren.WhitelistBehavior._testMode(true);
			evaluationIcon = fixture('default');
		});

		test('instantiating the element works', function() {
			assert.equal(evaluationIcon.tagName.toLowerCase(), 'd2l-activity-evaluation-icon');
		});

		test('base configured as draft when data indicates evaluation in draft state', function(done) {
			loadPromise('data/activity-draft.json', evaluationIcon)
				.then(function(configuredEvaluationIcon) {
					var baseIcon = configuredEvaluationIcon.shadowRoot.querySelector('d2l-activity-evaluation-icon-base');
					assert.equal(true, baseIcon.hasAttribute('draft'));
					done();
				});
		});

		test('base not configured as draft when data does not contain evaluation information', function(done) {

			loadPromise('data/activity-no-evaluation.json', evaluationIcon)
				.then(function(configuredEvaluationIcon) {

					var baseIcon = configuredEvaluationIcon.shadowRoot.querySelector('d2l-activity-evaluation-icon-base');
					assert.equal(false, baseIcon.hasAttribute('draft'));
					done();
				});
		});
	});
})();
