import 'd2l-fetch/d2l-fetch.js';
import 'd2l-polymer-siren-behaviors/store/entity-store.js';

async function fetch(href, token) {
	return (await window.D2L.Siren.EntityStore.fetch(href, token)).entity;
}

export async function fetchActivities(href, token) {
	if (href && token) {
		return await fetch(href, token);
	}
}

export async function fetchSubmissionCount(activityUsageEntity, token) {

	const evalStatusRel = 'https://activities.api.brightspace.com/rels/evaluation-status';
	const evalStatusLink = activityUsageEntity.getLink(evalStatusRel);

	const evaluationStatusEntity = await fetch(evalStatusLink, token);

	const newSubmissions = evaluationStatusEntity.properties.newsubmissions + evaluationStatusEntity.properties.resubmissions;
	return newSubmissions || 0;
}

export async function fetchEvaluateAllHref(activityUsageEntity, token) {
	const evalStatusRel = 'https://activities.api.brightspace.com/rels/evaluation-status';
	const evalStatusLink = activityUsageEntity.getLink(evalStatusRel);

	const evaluationStatusEntity = await fetch(evalStatusLink, token);

	const path = evaluationStatusEntity.getSubEntityByRel('https://assessments.api.brightspace.com/rels/assess-all-application').properties.path;
	const placeHolderHost = 'http://fake.commm';
	const newUrl = new URL(path, placeHolderHost);
	newUrl.searchParams.append('cft', 'qe');

	return newUrl.pathname + newUrl.search;
}

export async function setToggleState(href, toggleState) {
	const data = { toggleState: toggleState };

	return await window.d2lfetch.fetch(
		new Request(
			href,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			}
		)
	);
}
