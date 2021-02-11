export const getWeblinkError = (link, isExternalResource, isSubmitting = false) => {
	if (link.length === 0) {
		// This error should only show when the user tries to submit, not on keystroke
		return isSubmitting ? 'content.emptyLinkField' : null;
	}

	const expression = /^(?:https?:\/\/)?(?:[a-zA-Z0-9][a-zA-Z0-9-]*\.)+[a-zA-Z0-9][a-zA-Z0-9-]*(?::\d+)?(?:$|[/?#].*$)/;
	const urlRegExp = new RegExp(expression);

	if (!urlRegExp.test(link)) {
		return 'content.invalidLink';
	}

	if (!isExternalResource && link.substr(0, 7) === 'http://') {
		return 'content.notHttps';
	}

	// TODO: there is some more url processing here (see WebLinkView.jsx in smart-curriculum)...
	// TODO: Need access to the site valence host to determine if url is an LMS Link
	// eg: AppContext.getValenceHost().toLowerCase() + '/d2l/'
	const isLMSLink = false;
	if (!isExternalResource && isLMSLink) {
		return 'content.noEmbed';
	}

	return null;
};
