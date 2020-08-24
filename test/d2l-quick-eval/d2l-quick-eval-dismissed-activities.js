import '@polymer/iron-test-helpers/mock-interactions.js';

suite('d2l-quick-eval-activities', function() {

	let act;

	function expectedData() {
		return [
			{
				name: 'Assignment Name',
				course: 'Org Name',
				unDismiss: {
					'name': 'un-dismiss',
					'href': 'assignment/un-dismiss'
				},
				dismissedDate: '2019-03-03T03:03:03.003Z',
				type: 'assignment'
			},
			{
				name: 'Quiz Name',
				course: 'Org Name',
				unDismiss: {
					'name': 'un-dismiss',
					'href': 'quiz/un-dismiss'
				},
				dismissedDate: '2019-02-02T02:02:02.002Z',
				type: 'quiz'
			},
			{
				name: 'Topic Name',
				course: 'Org Name',
				unDismiss: {
					'name': 'un-dismiss',
					'href': 'topic/un-dismiss'
				},
				dismissedDate: '2019-01-01T01:01:01.001Z',
				type: 'discussion'
			}
		];
	}

	setup(function() {
		window.D2L.Siren.WhitelistBehavior._testMode(true);
		act = fixture('basic');
		act._loading = false;
	});
	test('instantiating the element works', function() {
		assert.equal(act.tagName.toLowerCase(), 'd2l-quick-eval-dismissed-activities');
	});
	test('attributes are set correctly', function() {
		assert.equal(act.href, 'blah');
		assert.equal(act.token, 't');
	});
	test('data is imported correctly', function(done) {
		const expected = expectedData();
		window.D2L.Siren.EntityStore.fetch('data/unassessedActivitiesCollection.json', '')
			.then((entity) => {
				act._loadData(entity.entity)
					.then(() => {
						if (act._data.length) {
							assert.equal(act._data.length, expected.length);
							for (let i = 0; i < act._data.length; i++) {
								assert.equal(act._data[i].name, expected[i].name);
								assert.equal(act._data[i].course, expected[i].course);
								assert.equal(act._data[i].unDismiss.name, expected[i].unDismiss.name);
								assert.equal(act._data[i].unDismiss.href, expected[i].unDismiss.href);
								assert.equal(act._data[i].dismissedDate, expected[i].dismissedDate);
								assert.equal(act._data[i].type, expected[i].type);
							}
						}
						done();
					});
			});
	});

	[
		{ toggles: [], expected: { length: 0, states: [ undefined, undefined, undefined ] } },
		{ toggles: [0], expected: { length: 1, states: [ true, undefined, undefined ] } },
		{ toggles: [2], expected: { length: 1, states: [ undefined, undefined, true ] } },
		{ toggles: [0, 2], expected: { length: 2, states: [ true, undefined, true ] } },
		{ toggles: [0, 1, 2], expected: { length: 3, states: [ true, true, true ] } },
		{ toggles: [0, 0], expected: { length: 0, states: [ false, undefined, undefined ] } },
		{ toggles: [1, 0, 1], expected: { length: 1, states: [ true, false, undefined ] } },
		{ toggles: [0, 1, 2, 0, 1, 2], expected: { length: 0, states: [ false, false, false ] } }
	].forEach(testCase => {
		test('_getSelectedActivities returns correct result', () => {
			act._data = expectedData();
			testCase.toggles.forEach(tc => {
				act._handleListItemSelected({ detail:{ key: tc, selected: !(act._data[tc].selected) } });
			});
			const selected = act._getSelectedActivities();
			assert.equal(selected.length, testCase.expected.length);
			act._data.forEach((a, i) => {
				assert.equal(a.selected, testCase.expected.states[i]);
			});
		});
	});
});
