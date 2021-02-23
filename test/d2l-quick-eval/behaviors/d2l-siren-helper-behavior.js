(function() {
	let component;

	suite('d2l-quick-eval-siren-helper-behavior', function() {
		setup(function() {
			component = fixture('basic');
		});
		suite('performSirenAction', function() {
			test('when calling perform siren action with no query params and no fields, the fields are empty', () => {

				const action = {
					href : 'http://127.0.0.1/',
					name: 'apply',
					type: 'application/x-www-form-urlencoded',
					method: 'GET'
				};

				const stub = sinon.stub(component, 'performSirenAction').callsFake(function(passedAction) {
					assert.deepEqual(action, passedAction);
				});

				component._performSirenActionWithQueryParams(action);
				sinon.assert.calledWith(stub, action);
			});
			test('when calling perform siren action with no query params, the fields are not modified', () => {

				const action = {
					href : 'http://127.0.0.1/',
					name: 'apply',
					type: 'application/x-www-form-urlencoded',
					method: 'GET',
					fields : [
						{
							type: 'hidden',
							name : 'existingField',
							value: 'existingValue'
						}]
				};

				const stub = sinon.stub(component, 'performSirenAction').callsFake(function(passedAction) {
					assert.deepEqual(action, passedAction);
				});

				component._performSirenActionWithQueryParams(action);
				sinon.assert.calledWith(stub, action);
			});
			test('when calling perform siren action with no query params and custom params, fields contain custom params', () => {

				const action = {
					href : 'http://127.0.0.1/',
					name: 'apply',
					type: 'application/x-www-form-urlencoded',
					method: 'GET'
				};

				const customParams = { customParam1: 'custom', customParam2: 'custom2' };
				sinon.stub(component, 'performSirenAction').callsFake(function(passedAction) {
					const fields = passedAction.fields;
					assert.equal(Object.keys(customParams).length, fields.length);

					Object.keys(customParams).forEach(function(p) {
						assert.isTrue(fields.some(function(elm) { return elm.name === p && elm.value === customParams[p]; }));
					});
				});

				component._performSirenActionWithQueryParams(action, customParams);
			});
			test('when calling perform siren action with query params, the query params are added as fields', () => {

				const action = {
					href : 'http://127.0.0.1?testname=testvalue&anothertestname=anothertestvalue',
					name: 'apply',
					type: 'application/x-www-form-urlencoded',
					method: 'GET',
					fields : [
						{
							type: 'hidden',
							name : 'existingField',
							value: 'existingValue'
						}]
				};

				const expectedAction = {
					href : 'http://127.0.0.1?testname=testvalue&anothertestname=anothertestvalue',
					name: 'apply',
					type: 'application/x-www-form-urlencoded',
					method: 'GET',
					fields : [
						{
							type: 'hidden',
							name : 'existingField',
							value: 'existingValue'
						},
						{
							type: 'hidden',
							name : 'testname',
							value: 'testvalue'
						},
						{
							type: 'hidden',
							name : 'anothertestname',
							value: 'anothertestvalue'
						}]
				};

				const stub = sinon.stub(component, 'performSirenAction').callsFake(function(passedAction) {
					assert.deepEqual(expectedAction, passedAction);
				});

				component._performSirenActionWithQueryParams(action);
				sinon.assert.calledWith(stub, action);
			});
			test('when calling perform siren action with query params and custom params, fields contain query params and custom params', () => {

				const defaultParams = [
					{
						type: 'hidden',
						name : 'testname',
						value: 'testvalue'
					},
					{
						type: 'hidden',
						name : 'anothertestname',
						value: 'anothertestvalue'
					}
				];

				const action = {
					href : 'http://127.0.0.1/',
					name: 'apply',
					type: 'application/x-www-form-urlencoded',
					method: 'GET',
					fields : defaultParams
				};

				const customParams = { customParam1: 'custom', customParam2: 'custom2' };
				sinon.stub(component, 'performSirenAction').callsFake(function(passedAction) {
					const fields = passedAction.fields;
					assert.equal(4, fields.length);

					assert.isTrue(fields.some(function(elm) { return elm.name === 'testname' && elm.value === 'testvalue'; }));
					assert.isTrue(fields.some(function(elm) { return elm.name === 'anothertestname' && elm.value === 'anothertestvalue'; }));

					Object.keys(customParams).forEach(function(p) {
						assert.isTrue(fields.some(function(elm) { return elm.name === p && elm.value === customParams[p]; }));
					});
				});

				component._performSirenActionWithQueryParams(action, customParams);
			});
		});
		suite('parsing url (_getExtraParams)', function() {
			test('when parsing url for sort and filter params and url is null, return empty array', () => {

				const params = component._getExtraParams('');
				assert.equal(params.length, 0);
			});
			test('when parsing url for sort and filter params and url is null, return empty array', () => {

				const params = component._getExtraParams(null);
				assert.equal(params.length, 0);
			});
			test('when parsing url for sort, filter, and collectionSearch params, if they are all present, return array with correct values', () => {
				const url = 'https://www.example.com/?pageSize=20&filter=96W3siU29ydCI6eyJJ&sort=Y3Rpb24iOjB9&collectionSearch=arthas';

				const params = component._getExtraParams(url);
				assert.equal(params.length, 3);

				const expectedParams = [
					{
						name: 'filter',
						value: '96W3siU29ydCI6eyJJ'
					},
					{
						name: 'sort',
						value: 'Y3Rpb24iOjB9'
					},
					{
						name: 'collectionSearch',
						value: window.btoa('arthas')
					}
				];
				assert.deepEqual(params, expectedParams);
			});
			test('when parsing url for sort and filter params, if only sort is present, return array with correct values', () => {
				const url = 'https://www.example.com/?pageSize=20&sort=Y3Rpb24iOjB9';

				const params = component._getExtraParams(url);
				assert.equal(params.length, 1);

				const expectedParams = [
					{
						name: 'sort',
						value: 'Y3Rpb24iOjB9'
					}
				];
				assert.deepEqual(params, expectedParams);
			});
			test('when parsing url for sort and filter params, if only filter is present, return array with correct values', () => {
				const url = 'https://www.example.com/?pageSize=20&filter=96W3siU29ydCI6eyJJ';

				const params = component._getExtraParams(url);
				assert.equal(params.length, 1);

				const expectedParams = [
					{
						name: 'filter',
						value: '96W3siU29ydCI6eyJJ'
					}
				];
				assert.deepEqual(params, expectedParams);
			});

			test('when parsing url for sort and filter params, if only collectionSearch is present, return array with correct values', () => {
				const url = 'https://www.example.com/?pageSize=20&collectionSearch=ragnaros';

				const params = component._getExtraParams(url);
				assert.equal(params.length, 1);

				const expectedParams = [
					{
						name: 'collectionSearch',
						value: window.btoa('ragnaros')
					}
				];
				assert.deepEqual(params, expectedParams);
			});
		});
		suite('creating a link (_buildRelativeUri)', function() {
			test('when creating a link, if there are no extra params, return original link', () => {
				const url = '/d2l/lms/tool/mark.d2l?ou=122041&db=1004';
				const params = [];

				const evalLink = component._buildRelativeUri(url, params);
				assert.equal(evalLink, url);
			});
			test('when creating a link, if there is an extra param, return correct link', () => {
				const url = '/d2l/lms/tool/mark.d2l?ou=122041&db=1004';
				const params = [
					{
						name: 'sort',
						value: 'Y3Rpb24iOjB9'
					}
				];
				const expectedEvalLink = url + '&cfi=sort~Y3Rpb24iOjB9';

				const evalLink = component._buildRelativeUri(url, params);
				assert.equal(evalLink, expectedEvalLink);
			});
			test('when creating a link, if there are extra params, return correct link', () => {
				const url = '/d2l/lms/tool/mark.d2l?ou=122041&db=1004';
				const params = [
					{
						name: 'filter',
						value: '96W3siU29ydCI6eyJJ'
					},
					{
						name: 'sort',
						value: 'Y3Rpb24iOjB9'
					}
				];
				const expectedEvalLink = url + '&cfi=filter~96W3siU29ydCI6eyJJ%7Csort~Y3Rpb24iOjB9';

				const evalLink = component._buildRelativeUri(url, params);
				assert.equal(evalLink, expectedEvalLink);
			});
			test('when creating a, if there are extra params and url has no original params, return correct link', () => {
				const url = '/d2l/lms/tool/122041/mark/1004/';
				const params = [
					{
						name: 'filter',
						value: '96W3siU29ydCI6eyJJ'
					},
					{
						name: 'sort',
						value: 'Y3Rpb24iOjB9'
					}
				];
				const expectedEvalLink = url + '?cfi=filter~96W3siU29ydCI6eyJJ%7Csort~Y3Rpb24iOjB9';

				const evalLink = component._buildRelativeUri(url, params);
				assert.equal(evalLink, expectedEvalLink);
			});
		});
		suite('_hasNonEmptyQueryParam', () => {

			const queryParam = 'param';
			const testCases = [
				{
					testName: 'query param is present',
					url: 'https://d2l.com/?param=123',
					expected: true
				},
				{
					testName: 'query param is empty',
					url: 'https://d2l.com/?param=',
					expected: false
				},
				{
					testName: 'no query param',
					url: 'https://d2l.com/',
					expected: false
				},
				{
					testName: 'other query param',
					url: 'https://d2l.com/?hello=123',
					expected: false
				},
				{
					testName: 'relative url with qp',
					url: '/api/path/?param=123',
					expected: true
				},
				{
					testName: 'relative url without qp',
					url: '/api/path/',
					expected: false
				}
			];

			testCases.forEach(testCase => {
				test(testCase.testName, () => {
					const actual = component._hasNonEmptyQueryParam(testCase.url, queryParam);
					assert.equal(actual, testCase.expected);
				});
			});
		});
	});
})();
