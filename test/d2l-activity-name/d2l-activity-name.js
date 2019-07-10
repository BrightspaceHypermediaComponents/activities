(function() {
	let activityName;

	async function loadPromise(url) {
		const entity = await window.D2L.Siren.EntityStore.fetch(url, '');
		await activityName._loadData(entity.entity);
	}

	suite('d2l-activity-name base', function() {
		setup(function() {
			window.D2L.Siren.WhitelistBehavior._testMode(true);
			activityName = fixture('assignment');
		});
		test('instantiating the element works', function() {
			assert.equal(activityName.tagName.toLowerCase(), 'd2l-activity-name');
		});
		test('attributes are set correctly', function() {
			assert.equal(activityName.href, 'data/assignmentActivity.json');
			assert.equal(activityName.token, 'faketoken');
		});
		test('activityName is set correctly', (done) => {
			loadPromise('data/assignmentActivity.json').then(function() {
				assert.equal(activityName._activityName, 'Folder 1');
				done();
			});
		});
		test('activityIcon is set correctly', (done) => {
			loadPromise('data/assignmentActivity.json').then(function() {
				assert.equal(activityName._activityIcon, 'd2l-tier1:assignments');
				done();
			});
		});
	});
	suite('d2l-activity-name quiz attempt', function() {
		setup(function() {
			activityName = fixture('quizAttempt');
		});
		test('activityName and activityIcon are set correctly for quiz attempt activity', (done) => {
			loadPromise('data/quizActivity.json').then(function() {
				assert.equal(activityName._activityName, 'Quiz 1');
				assert.equal(activityName._activityIcon, 'd2l-tier1:quizzing');
				done();
			});
		});
	});
	suite('d2l-activity-name discussion topic', function() {
		setup(function() {
			activityName = fixture('topic');
		});
		test('activityName and activityIcon are set correctly for discussion topic activity', (done) => {
			loadPromise('data/topicActivity.json').then(function() {
				assert.equal(activityName._activityName, 'Topic 1');
				assert.equal(activityName._activityIcon, 'd2l-tier1:discussions');
				done();
			});
		});
	});
})();
