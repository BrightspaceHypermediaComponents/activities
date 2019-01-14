(function() {
	var list;

	async function loadPromise(url) {
		var entity = await window.D2L.Siren.EntityStore.fetch(url, '');
		await list.loadData(entity.entity);
	}

	var expectedData = [
		{
			displayName: 'User Name',
			courseName: 'Org Name',
			activityName: 'Assignment Name',
			submissionDate: '2018-02-03T17:00:00.000Z',
			activityLink: 'https://www.example.com/'
		}
	];
	var expectedHeaders = [
		'Submitter', 'Activity Name', 'Course Name', 'Submission Date'
	];

	suite('d2l-evaluation-hub-activities-list', function() {
		setup(function() {
			list = fixture('basic');
		});
		test('instantiating the element works', function() {
			assert.equal(list.tagName.toLowerCase(), 'd2l-evaluation-hub-activities-list');
		});
		test('attributes are set correctly', function() {
			assert.equal(list.href, 'blah');
			assert.equal(list.token, 't');
		});
		test('headers display correctly', function() {
			flush(function() {
				var headers = list.shadowRoot.querySelectorAll('d2l-th');
				for (var i = 0; i < expectedHeaders.length; i++) {
					assert.equal(expectedHeaders[i], headers[i].innerHTML);
				}
			});
		});
		test('data is imported correctly', async() => {
			await loadPromise('data/unassessedActivities.json');

			assert.equal(list._data.length, expectedData.length);
			assert.deepEqual(list._data, expectedData);
		});
		test('data displays correctly', async() => {
			var expected = [];
			var expectedLink = [];

			expectedData.forEach(function(item) {
				expected.push(item.displayName);
				expected.push(item.activityName);
				expected.push(item.courseName);
				expected.push(item.submissionDate);
				expectedLink.push(item.activityLink);
			});

			await loadPromise('data/unassessedActivities.json');

			var data = list.shadowRoot.querySelectorAll('d2l-td');
			for (var i = 0; i < expected.length; i++) {

				if (i % 4 === 0) {
					var link = data[i].querySelector('a');
					assert.equal(expected[i], link.innerHTML);
					assert.equal(expectedLink[Math.floor(i / 4)], link.href);
				} else {
					var span = data[i].querySelector('span');
					assert.equal(expected[i], span.innerHTML);
					assert.equal(undefined, span.href);
				}
			}
		});
		test('_loading is set to false after data is loaded', async() => {
			await loadPromise('data/unassessedActivities.json');
			assert.equal(list._loading, false);
		});
	});
})();
