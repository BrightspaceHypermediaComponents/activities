(function() {
	let toggle;
	let activitiesView;
	let submissionsView;
	let invalidView;
	let sandbox;

	suite('d2l-quick-eval-view-toggle', function() {
		setup(function() {
			toggle = fixture('basic');
			activitiesView = fixture('activitiesView');
			submissionsView = fixture('submissionsView');
			invalidView = fixture('invalidView');
			sandbox = sinon.createSandbox();
		});

		teardown(function() {
			sandbox.restore();
		});

		test('instantiating the element works', function() {
			assert.equal(toggle.tagName.toLowerCase(), 'd2l-quick-eval-view-toggle');
		});

		test('should fire d2l-quick-eval-view-toggle-changed event when submissions is selected and activities is currently active', function(done) {
			toggle.currentSelected = 'activities';
			toggle.addEventListener('d2l-quick-eval-view-toggle-changed', function() {
				assert.equal('submissions', toggle.currentSelected);
				done();
			});

			toggle._selectSubmissions();
		});
		test('should fire d2l-quick-eval-view-toggle-changed event when activities is selected and submissions is currently active', function(done) {
			toggle.currentSelected = 'submissions';
			toggle.addEventListener('d2l-quick-eval-view-toggle-changed', function() {
				assert.equal('activities', toggle.currentSelected);
				done();
			});

			toggle._selectActivities();
		});
		test('should not fire d2l-quick-eval-view-toggle-changed event when activities is selected and activities is currently active', function() {
			toggle.currentSelected = 'activities';
			toggle.addEventListener('d2l-quick-eval-view-toggle-changed', function() {
				assert.fail('d2l-quick-eval-view-toggle-changed should not be fired when selecting the already active button');
			});
			toggle._selectActivities();
		});
		test('should not fire d2l-quick-eval-view-toggle-changed even when submissions is selected and submissions is currently active', function() {
			toggle.currentSelected = 'submissions';
			toggle.addEventListener('d2l-quick-eval-view-toggle-changed', function() {
				assert.fail('d2l-quick-eval-view-toggle-changed should not be fired when selecting the already active button');
			});
			toggle._selectSubmissions();
		});
		test('When toggleState not configured correctly then default to submission view', function() {
			assert.equal(toggle.currentSelected, 'submissions');
		});
		test('When toggleState is configured for activities view ensure configured to use activities view', function() {
			assert.equal(activitiesView.currentSelected, 'activities');
		});
		test('When toggleState is configured for submissions view ensure configured to use submissions view', function() {
			assert.equal(submissionsView.currentSelected, 'submissions');
		});
		test('When toggleState is configured to something invalid view ensure configured to use submissions view', function() {
			assert.equal(invalidView.currentSelected, 'submissions');
		});
		test('When _handleSelectionChange triggered without toggle href skip trying to save state', function(done) {
			const stubbedFetch = sandbox.stub(window.d2lfetch, 'fetch');
			toggle.toggleHref = '';

			toggle.addEventListener('d2l-quick-eval-view-toggle-changed', function() {
				assert.isTrue(stubbedFetch.notCalled);
				done();
			});

			toggle._handleSelectionChange('newView', 'oldView');
		});
		test('When _handleSelectionChange triggered when initially being initialized skip trying to save state', function(done) {
			const stubbedFetch = sandbox.stub(window.d2lfetch, 'fetch');
			toggle.toggleHref = 'validHref';

			toggle.addEventListener('d2l-quick-eval-view-toggle-changed', function() {
				assert.isTrue(stubbedFetch.notCalled);
				done();
			});

			toggle._handleSelectionChange('newView', undefined);
		});
		test('When _handleSelectionChange triggered with valid switch and valid href ensure config is updated', function(done) {
			const validHref = 'https://www.d2l.com/';
			sandbox.stub(window.d2lfetch, 'fetch').callsFake(function(request) {
				assert.equal(request.url, validHref);
				done();
			});

			toggle.toggleHref = validHref;
			toggle._handleSelectionChange('newView', 'oldView');
		});
	});
})();
