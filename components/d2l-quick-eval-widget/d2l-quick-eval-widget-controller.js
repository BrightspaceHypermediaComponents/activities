import 'd2l-polymer-siren-behaviors/store/entity-store.js';
import 'd2l-fetch/d2l-fetch.js';

async function fetch(href, token) {
	return (await window.D2L.Siren.EntityStore.fetch(href, token)).entity;
}

export async function fetchActivities(href, token) {
	if (href && token) {
		return await fetch(href, token);
	}
}

export async function fetchActivityName(activityUsageEntity, token) {

	const specializationRel = 'https://api.brightspace.com/rels/specialization';
	const specializationLink = activityUsageEntity.getLink(specializationRel);

	const specializationEntity = await fetch(specializationLink, token);
	return specializationEntity.properties.name;
}

export async function fetchCourseName(activityUsageEntity, token) {

	const orgRel = 'https://api.brightspace.com/rels/organization';
	const orgLink = activityUsageEntity.getLink(orgRel);

	const orgEntity = await fetch(orgLink, token);
	return orgEntity.properties.name;
}

export function getDueDate(activityUsageEntity) {

	if (!activityUsageEntity.hasSubEntityByClass('due-date')) {
		return false;
	}

	return activityUsageEntity.getSubEntityByClass('due-date').properties.localizedDate;
}

export async function fetchSubmissionCount(activityUsageEntity, token) {

	const evalStatusRel = 'https://activities.api.brightspace.com/rels/evaluation-status';
	const evalStatusLink = activityUsageEntity.getLink(evalStatusRel);

	const evaluationStatusEntity = await fetch(evalStatusLink, token);

	return evaluationStatusEntity.properties.newsubmissions + evaluationStatusEntity.properties.resubmissions;
}

export function determineIcon(au) {
	if (au.hasClass('discussion-activity')) {
		return 'tier1:discussions';
	}
	if (au.hasClass('assignment-activity')) {
		return 'tier1:assignments';
	}
	if (au.hasClass('quiz-activity')) {
		return 'tier1:quizzing';
	}
}

export async function fetchEvaluateAllHref(activityUsageEntity, token) {
	const evalStatusRel = 'https://activities.api.brightspace.com/rels/evaluation-status';
	const evalStatusLink = activityUsageEntity.getLink(evalStatusRel);

	const evaluationStatusEntity = await fetch(evalStatusLink, token);

	return evaluationStatusEntity.getSubEntityByRel('https://assessments.api.brightspace.com/rels/assess-all-application').properties.path;
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
