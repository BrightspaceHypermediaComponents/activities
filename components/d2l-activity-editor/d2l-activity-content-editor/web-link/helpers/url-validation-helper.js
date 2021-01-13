export const getInvalidWeblinkKey = (link, isExternalResource) => {
	if (link.length === 0) {
		return 'content.emptyLinkField';
	}

	const expression = /^(?:https?:\/\/)?(?:[a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z0-9][a-zA-Z0-9\-]*(?::\d+)?(?:$|[\/\?#].*$)/;
	const urlRegExp = new RegExp(expression);

	if (!urlRegExp.test(link)) {
		return 'content.invalidLink';
	}

	if (!isExternalResource && link.substr(0, 7) === 'http://') {
		return 'content.notHttps';
	}

	//there is some more url processing here (see WebLinkView.jsx in smart-curriculum)...

	// TODO: How exactly is this determined?
	const isLMSLink = false;
	if (!isExternalResource && isLMSLink) {
		return 'content.noEmbed';
	}

	return null;
};
