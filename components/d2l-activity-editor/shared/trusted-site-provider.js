export function trustedSitesProviderFn(trustedSitesEndpoint) {
	return () => url => {
		const origin = new URL(url).origin;
		const unfilteredContent = `<iframe src="${origin}"></iframe>`;

		return new Promise((resolve, reject) => {
			const params = {
				filterMode: 1, // strict mode for html filtering. Refer to D2L.LP.TextProcessing.FilterModes
				html: unfilteredContent
			};
			const options = {
				success: resolve,
				failure: reject
			};
			D2L.LP.Web.UI.Rpc.Connect(
				D2L.LP.Web.UI.Rpc.Verbs.POST,
				new D2L.LP.Web.Http.UrlLocation(trustedSitesEndpoint),
				params,
				options
			);
		}).then(filteredContent => {
			const matchSrc = function(str) {
				// excludes matching query string as filterHtml may modify the query string
				return str.match(/src=["']([^?"']+)/i);
			};
			const unfilteredMatch = matchSrc(unfilteredContent);
			const unfilteredSrc = unfilteredMatch && unfilteredMatch.length === 2 && unfilteredMatch[1];

			const filteredMatch = matchSrc(filteredContent);
			const filteredSrc = filteredMatch && filteredMatch.length === 2 && filteredMatch[1];

			return unfilteredSrc === filteredSrc;
		});
	};
}
