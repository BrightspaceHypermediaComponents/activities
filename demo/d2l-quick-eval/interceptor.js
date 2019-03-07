/*eslint no-console: "off"*/

function parsePathNoLeadingSlash(input) {
	const parsed = new window.URL(input, 'https://doesntmatter.org/');
	const path = parsed.pathname.substring(1);

	return path;
}

function startMockServer(mappings, debug) {
	const oldFetch = window.d2lfetch.fetch.bind(window.d2lfetch);

	if (debug) {
		console.group('All Mappings');
		console.log(mappings);
		console.groupEnd();
	}

	window.d2lfetch.fetch = function(input, options) {
		const path = parsePathNoLeadingSlash(input);
		if (debug) {
			console.groupCollapsed(input);
		}
		return intercept(input, path, mappings, debug).catch(() => {
			if (debug) {
				console.log('No mappings found, falling back to d2lfetch.fetch');
				console.groupEnd();
			}
			return oldFetch(input, options);
		});
	};

	const oldEntityFetch = window.D2L.Siren.EntityStore.fetch.bind(window.D2L.Siren.EntityStore);

	window.D2L.Siren.EntityStore.fetch = function(entityId, token) {
		return oldEntityFetch(entityId, token, true);
	};
}

function intercept(input, path, mappings, debug) {
	if (mappings[path]) {

		let endpoint = mappings[path];
		if (mappings[path] instanceof Function) {
			endpoint = mappings[path](input);
		}

		if (debug) {
			console.dir(endpoint);
			console.log(JSON.stringify(endpoint, null, 2));
			console.groupEnd();
		}
		return Promise.resolve({
			ok: true,
			json: function() {
				return Promise.resolve(endpoint);
			}
		});
	}
	return Promise.reject();
}

export default startMockServer;
