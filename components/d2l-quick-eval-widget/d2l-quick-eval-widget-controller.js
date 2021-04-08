import 'd2l-fetch/d2l-fetch.js';
import 'd2l-polymer-siren-behaviors/store/entity-store.js';

const expectedClasses = ['assignment-activity', 'discussion-activity', 'quiz-activity'];

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

export async function fetchEvaluationHref(activityUsageEntity, token, evaluateAll) {
	const evalStatusRel = 'https://activities.api.brightspace.com/rels/evaluation-status';
	const evalStatusLink = activityUsageEntity.getLink(evalStatusRel);

	const evaluationStatusEntity = await fetch(evalStatusLink, token);

	const typeRel = evaluateAll ? 'https://assessments.api.brightspace.com/rels/assess-all-application' : 'https://assessments.api.brightspace.com/rels/assess-new-application';
	const path = evaluationStatusEntity.getSubEntityByRel(typeRel).properties.path;
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

export function validateActivity(activityUsageEntity) {
	const expectedType = activityUsageEntity.class.some(activityClass => expectedClasses.includes(activityClass));
	if (!expectedType) {
		console.error('[%s] is not an expected activity class and will not be displayed.', activityUsageEntity.class.toString());
		return false;
	}
	return true;
}
