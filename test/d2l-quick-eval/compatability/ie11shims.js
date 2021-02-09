import {
	DictToQueryString,
	StringEndsWith,
	GetQueryStringParams,
	GetQueryStringParam
} from '../../../components/d2l-quick-eval/compatability/ie11shims.js';

suite('StringEndsWith', () => {
	const testCases = [
		{ str: undefined, endingStr: undefined, expectedResult: false },
		{ str: undefined, endingStr: null, expectedResult: false },
		{ str: undefined, endingStr: '', expectedResult: false },
		{ str: null, endingStr: '', expectedResult: false },
		{ str: null, endingStr: undefined, expectedResult: false },
		{ str: null, endingStr: null, expectedResult: false },
		{ str: 'racecar', endingStr: undefined, expectedResult: false },
		{ str: 'racecar', endingStr: null, expectedResult: false },
		{ str: 'racecar', endingStr: 'racecar ', expectedResult: false },
		{ str: 'racecar', endingStr: ' ', expectedResult: false },
		{ str: 'racecar', endingStr: 'car', expectedResult: true },
		{ str: 'racecar', endingStr: 'r', expectedResult: true },
		{ str: 'racecar', endingStr: '', expectedResult: true }
	];

	testCases.forEach(function(testCase) {
		const str = testCase.str;
		const endingStr = testCase.endingStr;
		const expectedResult = testCase.expectedResult;

		test(`String ${str} should return ${expectedResult} when checking for ${endingStr}`, () => {
			assert.equal(expectedResult, StringEndsWith(str, endingStr));
		});
	});
});

suite('GetQueryStringParams', () => {
	const testCases = [
		{ queryString: undefined, expectedResult: {} },
		{ queryString: null, expectedResult: {} },
		{ queryString: '', expectedResult: {} },
		{ queryString: '?x', expectedResult: {} },
		{ queryString: '?x=', expectedResult: { x: '' } },
		{ queryString: '?x=1&x=2', expectedResult: { x: '1' } },
		{ queryString: '?x=1&y=2', expectedResult: { x: '1', y: '2' } },
		{ queryString: '?x=1&&y=2', expectedResult: { x: '1', y: '2' } },
		{ queryString: '?x=%3Fencoded%3Dstring%25%26here&y=2', expectedResult: { x: '?encoded=string%&here', y: '2' } },
		{ queryString: '?%3F%3F=1', expectedResult: { '??': '1' } }
	];

	testCases.forEach(function(testCase) {
		const queryString = testCase.queryString;
		const expectedResult = testCase.expectedResult;

		test(`Given ${queryString} params should be ${JSON.stringify(expectedResult)}`, () => {
			assert.deepEqual(expectedResult, GetQueryStringParams(queryString));
		});
	});
});

suite('GetQueryStringParam', () => {
	const testCases = [
		{ url: 'https://www.d2l.com?', name: 'x', expectedResult: null },
		{ url: 'https://www.d2l.com?x', name: 'x', expectedResult: null },
		{ url: 'https://www.d2l.com?x=', name: 'x', expectedResult: '' },
		{ url: 'https://www.d2l.com?x=1', name: 'y', expectedResult: null },
		{ url: 'https://www.d2l.com?x=1', name: 'x', expectedResult: '1' },
		{ url: 'https://www.d2l.com/?x=1', name: 'x', expectedResult: '1' },
		{ url: 'https://www.d2l.com/?x=1&y=2', name: 'x', expectedResult: '1' },
		{ url: 'https://www.d2l.com/?x=1&y=2', name: 'y', expectedResult: '2' },
		{ url: 'https://www.d2l.com/?x=%3Fencoded%3Dstring%25%26here&y=2', name: 'x', expectedResult: '?encoded=string%&here' },
		{ url: 'https://www.d2l.com/?%3F%3F=1', name: '??', expectedResult: '1' },
		{ url: 'https://www.d2l.com/?emptyValue=', name: 'emptyValue', expectedResult: '' },
		{ url: 'https://www.d2l.com/?key+with%2Bplus=value+with%2Bplus', name: 'key with+plus', expectedResult: 'value with+plus' }
	];

	testCases.forEach(function(testCase) {
		const url = testCase.url;
		const name = testCase.name;
		const expectedResult = testCase.expectedResult;

		test(`Given ${url} searching for query param ${name} should return ${expectedResult}`, () => {
			assert.equal(expectedResult, GetQueryStringParam(name, new window.URL(url)));
		});
	});
});

suite('DictToQueryString', () => {
	const testCases = [
		{ params: {}, expectedStringParams: [] },
		{ params: { 'x': null }, expectedStringParams: ['x=null'] },
		{ params: { 'x': undefined }, expectedStringParams: ['x=undefined'] },
		{ params: { 'x': 1 }, expectedStringParams: ['x=1'] },
		{ params: { 'x': 1, 'y': 2 }, expectedStringParams: ['x=1', 'y=2'] },
		{ params: { 'y': 2, 'x': 1 }, expectedStringParams: ['x=1', 'y=2'] },
		{ params: { 'x': '??' }, expectedStringParams: ['x=%3F%3F'] },
		{ params: { '??': 1 }, expectedStringParams: ['%3F%3F=1'] },
	];

	testCases.forEach(function(testCase) {
		const params = testCase.params;
		const expectedStringParams = testCase.expectedStringParams;

		test(`Given ${JSON.stringify(params)} should contains these query params ${JSON.stringify(expectedStringParams)}`, () => {
			const result = DictToQueryString(params);

			if (expectedStringParams && expectedStringParams.length > 0) {
				assert.equal('?', result[0]);

				const stringParams = result.substr(1).split('&');

				expectedStringParams.forEach(function(expectedStringParam) {
					assert.isTrue(
						stringParams.some(function(stringParam) { return stringParam === expectedStringParam; }),
						`Query param string '${expectedStringParam}' not found in '${result}'`
					);
				});
			}
			else {
				assert.equal('', result);
			}
		});
	});
});
