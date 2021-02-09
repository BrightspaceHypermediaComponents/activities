/*
All functions in this file should work across all browsers.
Initially intended for enabling compatability with IE11, but applies to any browser missing some functionality.
*/

const _urlDecodePlusAsSpace = (str) => {
	if (!str) {
		return str;
	}
	const strWithPlusAsSpace = str.replace('+', ' ');
	const strDecoded = window.decodeURIComponent(strWithPlusAsSpace);
	return strDecoded;
};

const StringEndsWith = (str, search) => {
	if (typeof str !== 'string' || typeof search !== 'string') {
		return false;
	}
	if (search.length > str.length) {
		return false;
	}

	return str.substring(str.length - search.length, str.length) === search;
};

const DictToQueryString = (queryParams) => {
	if (queryParams === null || queryParams === undefined) {
		return '';
	}

	const queryParamsAsString = Object.keys(queryParams).map(function(key) {
		return window.encodeURIComponent(key) + '=' + window.encodeURIComponent(queryParams[key]);
	});

	if (queryParamsAsString.length <= 0) {
		return '';
	}

	return '?' + queryParamsAsString.join('&');
};

const GetQueryStringParams = (queryString) => {
	const query = {};
	if (queryString) {
		const trimmedQueryString = queryString[0] === '?' ? queryString.substr(1) : queryString;
		const queryStrings = trimmedQueryString.split('&');
		const validQueryStrings = queryStrings.filter(p => p.indexOf('=') >= 0);

		validQueryStrings.forEach(function(validQueryString) {
			const keyValuePair = validQueryString.split('=');
			const decodedKey = _urlDecodePlusAsSpace(keyValuePair[0]);

			if (!(decodedKey in query)) {
				const decodedValue = _urlDecodePlusAsSpace(keyValuePair[1]);
				query[decodedKey] = decodedValue;
			}
		});
	}
	return query;
};

const GetQueryStringParam = (name, url) => {
	const searchParams = GetQueryStringParams(url.search);

	if (name in searchParams) {
		return searchParams[name];
	}

	return null;
};

export { DictToQueryString, StringEndsWith, GetQueryStringParam, GetQueryStringParams };
