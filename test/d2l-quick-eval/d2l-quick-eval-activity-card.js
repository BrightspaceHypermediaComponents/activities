(function() {
	let qeActivityCard;
	suite('d2l-quick-eval-activity-card', function() {
		setup(function() {
			qeActivityCard = fixture('basic');
		});

		test('instantiating the element works', function() {
			assert.equal(qeActivityCard.tagName.toLowerCase(), 'd2l-quick-eval-activity-card');
		});

		test('allsubmissions event fires with submissionListHref', function(done) {
			qeActivityCard.addEventListener('d2l-quick-eval-activity-view-submission-list', function(e) {
				assert.equal(e.detail.submissionListHref, '');
				done();
			});

			qeActivityCard._dispatchViewSubmissionListEvent();
		});

		test('_denominatorOver99 works', function() {
			assert.isFalse(qeActivityCard._denominatorOver99(50));
			assert.isFalse(qeActivityCard._denominatorOver99(99));
			assert.isTrue(qeActivityCard._denominatorOver99(100));
			assert.isTrue(qeActivityCard._denominatorOver99(200));
		});

		test('_computeFormattedDueDate works as intended when activity has valid dueDate', function() {
			const dueDate = '2012-09-01T13:00:00.000';
			const expectedFormattedDate = '9/1/2012 1:00 PM';

			assert.equal(qeActivityCard._computeFormattedDueDate(dueDate), expectedFormattedDate);
		});

		test('_computeFormattedDueDate works as intended when activity does not have dueDate', function() {
			const dueDate = '';
			const expectedFormattedDate = '';

			assert.equal(qeActivityCard._computeFormattedDueDate(dueDate), expectedFormattedDate);
		});

		test('when dueDate changes, formattedDueDate also changes', function() {
			let dueDate = '';
			assert.equal(qeActivityCard._computeFormattedDueDate(dueDate), dueDate);

			dueDate = '2016-03-07T00:20:00.000';
			const expectedFormattedDate = '3/7/2016 12:20 AM';
			assert.equal(qeActivityCard._computeFormattedDueDate(dueDate), expectedFormattedDate);
		});
	});
})();
