'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDadkImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.dadk = {
			'activities': 'Aktiviteter',
			'activityName': 'Aktivitetsnavn',
			'assignment': 'Assignment',
			'caughtUp': 'Du er helt med!',
			'checkBackOften': 'Kom tilbage med jævne mellemrum for at se nye afleveringer.',
			'clearSearch': 'Ryd søgning',
			'completed': 'Completed',
			'courseName': 'Kursus',
			'discussion': 'Discussion',
			'displayName': 'Fornavn, Efternavn',
			'due': 'Due: {date}',
			'evaluate': 'Evaluer {displayName}',
			'evaluateAll': 'Evaluate All',
			'evaluated': 'Evaluated',
			'failedToFilter': 'Kunne ikke anvende filter. Prøv igen om et par minutter.',
			'failedToLoadData': 'Kunne ikke indlæse afleveringer. Prøv igen om et par minutter.',
			'failedToLoadMore': 'Kunne ikke indlæse flere afleveringer. Prøv igen om et par minutter.',
			'failedToSearch': 'Kunne ikke gennemføre søgning. Prøv igen om et par minutter.',
			'firstName': 'Fornavn',
			'lastName': 'Efternavn',
			'loadMore': 'Indlæs flere',
			'loading': 'Indlæser',
			'masterTeacher': 'Lærer',
			'noCriteriaMatch': 'Der er ingen afleveringer, der matcher dine kriterier.',
			'noResults': 'Ingen resultater her.',
			'noSubmissions': 'Der er ingen afleveringer, der kræver din opmærksomhed.',
			'publishAll': 'Publish All',
			'published': 'Published',
			'quiz': 'Quiz',
			'search': 'Søg',
			'searchResultsMore': '{num}+ søgeresultater',
			'searchResultsMultiple': '{num} søgeresultater',
			'searchResultsSingle': '1 søgeresultat',
			'sortBy': 'Sortér efter {columnName}',
			'submissionDate': 'Afleveringsdato',
			'submissionList': 'Submission List',
			'submissions': 'Afleveringer',
			'tableTitle': 'Liste over ikke-evaluerede elevafleveringer på tværs af kurser og værktøjer',
			'tryAgain': 'Prøv igen',
			'unreadSubmissions': '{num} unread submissions',
			'unreadSubmissionsDetail': '{unread} new, {resub} resubmissions',
			'viewBy': 'Vis efter:'
		};
	}
};

export const LangDadk = dedupingMixin(LangDadkImpl);

