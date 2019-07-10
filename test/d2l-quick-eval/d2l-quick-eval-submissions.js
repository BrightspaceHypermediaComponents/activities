import '@polymer/iron-test-helpers/mock-interactions.js';

suite('d2l-quick-eval-submissions', function() {

	let submissions;

	setup(function() {
		window.D2L.Siren.WhitelistBehavior._testMode(true);
		submissions = fixture('basic');
	});

	test('instantiating the element works', function() {
		assert.equal(submissions.tagName.toLowerCase(), 'd2l-quick-eval-submissions');
	});

	test('_numberOfActivitiesToShow starts with default value of 20', function() {
		assert.equal(20, submissions._numberOfActivitiesToShow);
	});

	test('attributes are set correctly', function() {
		assert.equal(submissions.href, 'blah');
		assert.equal(submissions.token, 't');
	});

	test('headers display correctly', function(done) {
		var expectedColumnHeaders = [
			['First Name', 'Last Name'],
			['Activity Name'],
			['Course'],
			['Submission Date']
		];

		flush(function() {
			var headers = submissions.shadowRoot.querySelector('d2l-quick-eval-submissions-table').shadowRoot.querySelectorAll('d2l-th');

			assert.equal(expectedColumnHeaders.length, headers.length);

			for (var i = 0; i < expectedColumnHeaders.length; i++) {
				expectedColumnHeaders[i].forEach(function(expectedHeader) {
					assert.include(headers[i].innerHTML, expectedHeader);
				});
			}
			done();
		});
	});

	test('headers include master teacher when toggled on, and is display correctly', function(done) {
		var expectedColumnHeadersWithMasterTeacher = [
			['First Name', 'Last Name'],
			['Activity Name'],
			['Course'],
			['Submission Date'],
			['Teacher']
		];
		const list = submissions.shadowRoot.querySelector('d2l-quick-eval-submissions-table');
		list.setAttribute('master-teacher', '');

		flush(function() {

			var headers = list.shadowRoot.querySelectorAll('d2l-th');
			assert.equal(expectedColumnHeadersWithMasterTeacher.length, headers.length);

			for (var i = 0; i < expectedColumnHeadersWithMasterTeacher.length; i++) {
				expectedColumnHeadersWithMasterTeacher[i].forEach(function(expectedHeader) {
					assert.include(headers[i].innerHTML, expectedHeader);
				});
			}
			done();
		});
	});

	test('firstName begins before lastName, clicking lastName puts it before firstName and clicking firstName puts it before lastName', (done) => {

		var nameHeaders = submissions._headerColumns[0].headers;
		assert.equal('firstName', nameHeaders[0].key);

		submissions._headerColumns[0].headers[0].canSort = true;
		submissions._headerColumns[0].headers[1].canSort = true;

		const list = submissions.shadowRoot.querySelector('d2l-quick-eval-submissions-table');

		flush(function() {
			var lastNameHeader = list.shadowRoot.querySelector('#lastName');

			var verifyFirstNameNameFirst = function() {
				assert.equal('firstName', nameHeaders[0].key);
				assert.equal(',', nameHeaders[0].suffix);
				assert.equal('', nameHeaders[1].suffix);

				done();
			};

			var verifyLastNameFirst = function() {
				assert.equal('lastName', nameHeaders[0].key);
				assert.equal(',', nameHeaders[0].suffix);
				assert.equal('', nameHeaders[1].suffix);

				lastNameHeader.removeEventListener('click', verifyLastNameFirst);

				var firstNameHeader = list.shadowRoot.querySelector('#firstName');
				firstNameHeader.addEventListener('click', verifyFirstNameNameFirst);

				MockInteractions.tap(firstNameHeader);
			};

			lastNameHeader.addEventListener('click', verifyLastNameFirst);
			MockInteractions.tap(lastNameHeader);

		});
	});

	test('_computeNumberOfActivitiesToShow returns max of data length, and previously shown number of activities', function() {
		const numberOfActivitiesToShowWhenDataLarger = submissions._computeNumberOfActivitiesToShow([1, 2, 3, 4], 1);
		assert.equal(4, numberOfActivitiesToShowWhenDataLarger);

		const numberOfActivitiesToShowWhenPreviousLarger = submissions._computeNumberOfActivitiesToShow([1], 5);
		assert.equal(5, numberOfActivitiesToShowWhenPreviousLarger);
	});
});
