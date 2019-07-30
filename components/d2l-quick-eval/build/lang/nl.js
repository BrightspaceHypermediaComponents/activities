'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangNlImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.nl = {
			'activities': 'Activiteiten',
			'activityName': 'Naam activiteit',
			'assignment': 'Opdracht',
			'caughtUp': 'U bent weer helemaal bij!',
			'checkBackOften': 'Kijk regelmatig of er nieuwe indieningen via postvak zijn.',
			'clearSearch': 'Zoekopdracht wissen',
			'completed': 'Voltooid',
			'courseName': 'Cursus',
			'discussion': 'Discussie',
			'displayName': 'Voornaam, achternaam',
			'due': 'Uiterste datum: {date}',
			'evaluate': '{displayName} evalueren',
			'evaluateAll': 'Alles evalueren',
			'evaluated': 'Geëvalueerd',
			'failedToFilter': 'Kan filter niet toepassen. Probeer het nogmaals over een paar minuten.',
			'failedToLoadData': 'Kan indieningen via postvak niet laden. Probeer het nogmaals over een paar minuten.',
			'failedToLoadMore': 'Kan niet meer indieningen via postvak laden. Probeer het nogmaals over een paar minuten.',
			'failedToSearch': 'Kan zoekopdracht niet toepassen. Probeer het nogmaals over een paar minuten.',
			'firstName': 'Voornaam',
			'lastName': 'Achternaam',
			'loadMore': 'Meer laden',
			'loading': 'Laden',
			'masterTeacher': 'Docent',
			'noCriteriaMatch': 'Er zijn geen indieningen via postvak die overeenkomen met uw criteria.',
			'noResults': 'Geen resultaten hier.',
			'noSubmissions': 'Er zijn geen indieningen via postvak die uw aandacht nodig hebben.',
			'publishAll': 'Alles publiceren',
			'published': 'Gepubliceerd',
			'quiz': 'Test',
			'search': 'Zoeken',
			'searchResultsMore': '{num}+ zoekresultaten',
			'searchResultsMultiple': '{num} zoekresultaten',
			'searchResultsSingle': '1 zoekresultaat',
			'sortBy': 'Sorteren op {columnName}',
			'submissionDate': 'Datum van indiening via postvak',
			'submissionList': 'Lijst met indieningen via postvak',
			'submissions': 'Indieningen',
			'tableTitle': 'Lijst van niet-geëvalueerde indieningen via postvak van cursisten van alle cursussen en tools',
			'tryAgain': 'Probeer het opnieuw',
			'newSubmissions': 'New Submissions',
			'newSubmissionDetails': '{newNum} new, {resub} resubmissions',
			'newPosts': 'New Posts',
			'newPostDetails': '{newNum} new, {resub} reposts',
			'newAttempts': 'New Attempts',
			'newAttemptsDetails': '{newNum} new',
			'viewBy': 'Weergeven op:'
		};
	}
};

export const LangNl = dedupingMixin(LangNlImpl);

