import '@polymer/iron-test-helpers/mock-interactions.js';

suite('d2l-quick-eval-activities', function() {

	let act, list, noSubmissionComponent, noCriteriaResultsComponent;

	const expectedData = [
		{
			name: 'Org Name',
			activities: [{
				key: 'data/org.json',
				courseName: 'Org Name',
				activityNameHref: 'data/assignmentActivity.json',
				assigned: 21,
				completed: 22,
				published: 23,
				evaluated: 24,
				unread: 25,
				resubmitted: 26,
				publishAll: {
					'name': 'publish-all-feedback',
					'href': 'assignment/publish-all-feedback'
				},
				dueDate: '2019-03-03T03:03:03.003Z',
				activityType: 'assignment'
			},
			{
				key: 'data/org.json',
				courseName: 'Org Name',
				activityNameHref: 'data/quizActivity.json',
				assigned: 11,
				completed: 12,
				published: 13,
				evaluated: 14,
				unread: 15,
				resubmitted: 16,
				publishAll: {
					'name': 'publish-all-feedback',
					'href': 'quiz/publish-all-feedback'
				},
				dueDate: '2019-02-02T02:02:02.002Z',
				activityType: 'quiz'
			},
			{
				key: 'data/org.json',
				courseName: 'Org Name',
				activityNameHref: 'data/topicActivity.json',
				assigned: 1,
				completed: 2,
				published: 3,
				evaluated: 4,
				unread: 5,
				resubmitted: 6,
				publishAll: {
					'name': 'publish-all-feedback',
					'href': 'topic/publish-all-feedback'
				},
				dueDate: '2019-01-01T01:01:01.001Z',
				activityType: 'discussion'
			}]
		}
	];

	setup(function() {
		window.D2L.Siren.WhitelistBehavior._testMode(true);
		act = fixture('basic');
		noSubmissionComponent = act.shadowRoot.querySelector('.d2l-quick-eval-no-submissions');
		noCriteriaResultsComponent = act.shadowRoot.querySelector('.d2l-quick-eval-no-criteria-results');
		list = act.shadowRoot.querySelector('d2l-quick-eval-activities-list');
		act._loading = false;
	});
	test('instantiating the element works', function() {
		assert.equal(act.tagName.toLowerCase(), 'd2l-quick-eval-activities');
	});
	test('attributes are set correctly', function() {
		assert.equal(act.href, 'blah');
		assert.equal(act.token, 't');
	});
	test('if there is no data, d2l-quick-eval-no-submissions-image is shown', () => {
		assert.notEqual(getComputedStyle(noSubmissionComponent).display, 'none');
		assert.equal(getComputedStyle(noCriteriaResultsComponent).display, 'none');
		assert.equal(getComputedStyle(list).display, 'none');
	});
	test('if there is no data and filters have been applied, d2l-quick-eval-no-criteria-results-image is shown', () => {
		act.filterApplied = true;

		assert.notEqual(getComputedStyle(noCriteriaResultsComponent).display, 'none');
		assert.equal(getComputedStyle(noSubmissionComponent).display, 'none');
		assert.equal(getComputedStyle(list).display, 'none');
	});
	test('if there is no data and search has been applied, d2l-quick-eval-no-criteria-results-image is shown', () => {
		act.searchApplied = true;

		assert.notEqual(getComputedStyle(noCriteriaResultsComponent).display, 'none');
		assert.equal(getComputedStyle(noSubmissionComponent).display, 'none');
		assert.equal(getComputedStyle(list).display, 'none');
	});
	test('if there is no data and filters and search have been applied, d2l-quick-eval-no-criteria-results-image is shown', () => {
		act.filterApplied = true;
		act.searchApplied = true;

		assert.notEqual(getComputedStyle(noCriteriaResultsComponent).display, 'none');
		assert.equal(getComputedStyle(noSubmissionComponent).display, 'none');
		assert.equal(getComputedStyle(list).display, 'none');
	});
	test('if there is data, the list is shown', () => {
		act._data = expectedData;
		assert.equal(getComputedStyle(noCriteriaResultsComponent).display, 'none');
		assert.equal(getComputedStyle(noSubmissionComponent).display, 'none');
		assert.notEqual(getComputedStyle(list).display, 'none');
	});
	test('data is imported correctly', (done) => {
		function checkData() {
			if (act._data.length) {
				assert.equal(act._data.length, expectedData.length);

				for (let i = 0; i < act._data.length; i++) {
					assert.equal(act._data[0].activities[i].key, expectedData[0].activities[i].key);
					assert.equal(act._data[0].activities[i].courseName, expectedData[0].activities[i].courseName);
					assert.equal(act._data[0].activities[i].activityNameHref, expectedData[0].activities[i].activityNameHref);
					assert.equal(act._data[0].activities[i].assigned, expectedData[0].activities[i].assigned);
					assert.equal(act._data[0].activities[i].completed, expectedData[0].activities[i].completed);
					assert.equal(act._data[0].activities[i].published, expectedData[0].activities[i].published);
					assert.equal(act._data[0].activities[i].evaluated, expectedData[0].activities[i].evaluated);
					assert.equal(act._data[0].activities[i].unread, expectedData[0].activities[i].unread);
					assert.equal(act._data[0].activities[i].resubmitted, expectedData[0].activities[i].resubmitted);
					assert.equal(act._data[0].activities[i].publishAll.name, expectedData[0].activities[i].publishAll.name);
					assert.equal(act._data[0].activities[i].publishAll.href, expectedData[0].activities[i].publishAll.href);
					assert.equal(act._data[0].activities[i].dueDate, expectedData[0].activities[i].dueDate);
					assert.equal(act._data[0].activities[i].activityType, expectedData[0].activities[i].activityType);
				}

				act.removeEventListener('d2l-siren-entity-changed', checkData);
				done();
			}
		}
		act.addEventListener('d2l-siren-entity-changed', checkData);
		act.href = 'data/unassessedActivitiesCollection.json';
	});
	[null, undefined, []].forEach(testCase => {
		test(`_groupByCourse returns an empty array when given ${JSON.stringify(testCase)}`, function() {
			const result = act._groupByCourse(testCase);
			assert.deepEqual(result, []);
		});
	});

	test('if data is loading or filtering or searching, show the loading skeleton', () => {
		const skeletonComponent = act.shadowRoot.querySelector('d2l-quick-eval-activities-skeleton');
		act._loading = true;
		assert.notEqual(getComputedStyle(skeletonComponent).display, 'none');
		act._loading = false;
		assert.equal(getComputedStyle(skeletonComponent).display, 'none');
		act.filtersLoading = true;
		assert.notEqual(getComputedStyle(skeletonComponent).display, 'none');
		act.filtersLoading = false;
		assert.equal(getComputedStyle(skeletonComponent).display, 'none');
		act.searchLoading = true;
		assert.notEqual(getComputedStyle(skeletonComponent).display, 'none');
		act.searchLoading = false;
		assert.equal(getComputedStyle(skeletonComponent).display, 'none');
	});
});
