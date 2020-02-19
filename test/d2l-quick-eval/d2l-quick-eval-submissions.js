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

	suite('Headers', () => {
		[
			{ masterTeacher: true, courseLevel: true, expected: [ 'displayName', 'activityName', 'localizedSubmissionDate', 'masterTeacher']},
			{ masterTeacher: true, courseLevel: false, expected: [ 'displayName', 'activityName', 'courseName', 'localizedSubmissionDate', 'masterTeacher']},
			{ masterTeacher: false, courseLevel: true, expected: [ 'displayName', 'activityName', 'localizedSubmissionDate']},
			{ masterTeacher: false, courseLevel: false, expected: [ 'displayName', 'activityName', 'courseName', 'localizedSubmissionDate']}
		].forEach(testCase => {
			test('Headers are computed correctly', () => {
				submissions.masterTeacher = testCase.masterTeacher;
				submissions.courseLevel = testCase.courseLevel;
				assert.deepEqual(submissions._headerColumns.map(hc => hc.key), testCase.expected);
			});
		});

		test('_handleNameSwap switches the firstName and lastName headers.', () => {

			const nameHeaders = submissions._headerColumns[0].headers;
			assert.equal('firstName', nameHeaders[0].key);

			nameHeaders[0].canSort = true;
			nameHeaders[1].canSort = true;

			// clicking on the header that's already first shouldn't switch them.
			submissions._handleNameSwap(submissions._headerColumns[0], 'firstName');
			assert.equal('firstName', nameHeaders[0].key);

			submissions._handleNameSwap(submissions._headerColumns[0], 'lastName');

			assert.equal('lastName', nameHeaders[0].key);
			assert.equal(',', nameHeaders[0].suffix);
			assert.equal('', nameHeaders[1].suffix);

			submissions._handleNameSwap(submissions._headerColumns[0], 'firstName');

			assert.equal('firstName', nameHeaders[0].key);
			assert.equal(',', nameHeaders[0].suffix);
			assert.equal('', nameHeaders[1].suffix);
		});
	});

	test('_computeNumberOfActivitiesToShow returns max of data length, and previously shown number of activities', function() {
		const numberOfActivitiesToShowWhenDataLarger = submissions._computeNumberOfActivitiesToShow([1, 2, 3, 4], 1);
		assert.equal(4, numberOfActivitiesToShowWhenDataLarger);

		const numberOfActivitiesToShowWhenPreviousLarger = submissions._computeNumberOfActivitiesToShow([1], 5);
		assert.equal(5, numberOfActivitiesToShowWhenPreviousLarger);
	});
});
