import 'd2l-fetch/d2l-fetch.js';
import 'd2l-polymer-siren-behaviors/store/entity-store.js';

const evalStatusRel = 'https://activities.api.brightspace.com/rels/evaluation-status';

async function fetch(href, token) {
	return (await window.D2L.Siren.EntityStore.fetch(href, token)).entity;
}

export async function fetchEvaluationCount(activityUsageEntity, token) {

	const evalStatusLink = activityUsageEntity.getLink(evalStatusRel);

	const evaluationStatusEntity = await fetch(evalStatusLink, token);

	const evaluations = evaluationStatusEntity.properties.evaluated;
	return evaluations || 0;
}
