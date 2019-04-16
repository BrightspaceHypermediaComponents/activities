const StringEndsWith = (str, search) => {
	if (typeof str !== 'string' || typeof search !== 'string') {
		return false;
	}
	if (search.length > str.length) {
		return false;
	}

	return str.substring(str.length - search.length, str.length) === search;
};

const GetQueryStringParams = (queryString) => {
	const query = {};
	if (queryString) {
		const trimmedQueryString = queryString[0] === '?' ? queryString.substr(1) : queryString;
		const queryStrings = trimmedQueryString.split('&');
		const validQueryStrings = queryStrings.filter(p => p.indexOf('=') >= 0);

		validQueryStrings.forEach(function(validQueryString) {
			const keyValuePair = validQueryString.split('=');
			const decodedKey = window.decodeURIComponent(keyValuePair[0]);

			if (!(decodedKey in query)) {
				const decodedValue = window.decodeURIComponent(keyValuePair[1]);
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

export { StringEndsWith, GetQueryStringParam, GetQueryStringParams };
