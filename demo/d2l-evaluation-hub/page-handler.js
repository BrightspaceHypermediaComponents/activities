import { parseSortFromUrl, encodeSortState, decodeSortState } from './sort-handler';
import { formatActivities } from './activity-handler';
import chunk from 'lodash-es/chunk';

function applySorts(activities, sorts, sortState) {
	sortState.forEach(appliedSort => {
		const sortDefn = sorts.filter(s => s.id === appliedSort.id)[0];

		let sortFn = sortDefn.fn;

		if (appliedSort.direction === 'd') {
			sortFn = (x, y) => -sortDefn.fn(x, y);
		}

		activities.sort(sortFn);
	});

	return activities;
}

function addSortToHref(href, sortState) {
	if (href) {
		if (sortState && sortState.length > 0) {
			return `${href}?sort=${encodeSortState(sortState)}`;
		}
		return href;
	}
}

function createPageEndpoint(activities, sorts, pageNumber, filtersHref, sortsHref, nextPageHref, failFirstTime) {
	var shouldFail = failFirstTime;

	return (url) => {
		const serializedSortState = parseSortFromUrl(url);
		const sortState = decodeSortState(serializedSortState);

		const sortedActivities = applySorts(activities, sorts, sortState);
		const formattedSortedActivities = formatActivities(sortedActivities);
		const pagedActivities = chunk(formattedSortedActivities, 3);

		if (shouldFail) {
			shouldFail = false;
			return null;
		}

		return formatPage(pagedActivities[pageNumber], filtersHref, addSortToHref(sortsHref, sortState), addSortToHref(nextPageHref, sortState));
	};
}

function formatPage(entities, filterLocation, sortsLocation, nextLocation) {

	const entity = {
		'links': [
			{
				'rel': [
					'https://api.brightspace.com/rels/filters'
				],
				'href': filterLocation
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/sorts'
				],
				'href': sortsLocation
			},

		],
		'entities': entities
	};

	if (nextLocation) {
		entity.links.push({
			'rel': [
				'next'
			],
			'href': nextLocation
		});
	}

	return entity;
}

export { createPageEndpoint, formatPage };
