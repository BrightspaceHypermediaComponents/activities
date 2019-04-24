'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangNlImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.nl = {
			'activityName': 'Naam activiteit',
			'caughtUp': 'U bent weer helemaal bij!',
			'checkBackOften': 'Kijk regelmatig of er nieuwe indieningen via postvak zijn.',
			'clearSearch': 'Zoekopdracht wissen',
			'courseName': 'Cursus',
			'displayName': 'Voornaam, achternaam',
			'evaluate': '{displayName} evalueren',
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
			'search': 'Zoeken',
			'searchResultsMore': '{num}+ Search Results',
			'searchResultsMultiple': '{num} zoekresultaten',
			'searchResultsSingle': '1 zoekresultaat',
			'sortBy': 'Sorteren op {columnName}',
			'submissionDate': 'Datum van indiening via postvak',
			'tableTitle': 'Lijst van niet-geëvalueerde indieningen via postvak van cursisten van alle cursussen en tools',
			'tryAgain': 'Probeer het opnieuw'
		};
	}
};

export const LangNl = dedupingMixin(LangNlImpl);

