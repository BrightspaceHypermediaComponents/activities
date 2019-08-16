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
			'close': 'Close',
			'completed': 'Voltooid',
			'confirmation': 'Confirmation',
			'courseName': 'Cursus',
			'discussion': 'Discussie',
			'displayName': 'Voornaam, achternaam',
			'due': 'Uiterste datum: {date}',
			'evaluate': '{displayName} evalueren',
			'evaluateAll': 'Alles evalueren',
			'evaluated': 'Geëvalueerd',
			'failedToFilter': 'Kan filter niet toepassen. Probeer het nogmaals over een paar minuten.',
			'failedToLoadData': 'Kan indieningen via postvak niet laden. Probeer het nogmaals over een paar minuten.',
			'failedToLoadActivities': 'Unable to load activities. Try again in a few minutes.',
			'failedToLoadMore': 'Kan niet meer indieningen via postvak laden. Probeer het nogmaals over een paar minuten.',
			'failedToSearch': 'Kan zoekopdracht niet toepassen. Probeer het nogmaals over een paar minuten.',
			'firstName': 'Voornaam',
			'lastName': 'Achternaam',
			'loadMore': 'Meer laden',
			'loading': 'Laden',
			'masterTeacher': 'Docent',
			'no': 'No',
			'noCriteriaMatch': 'Er zijn geen indieningen via postvak die overeenkomen met uw criteria.',
			'noCriteriaMatchActivities': 'There are no activities that match your criteria.',
			'noResults': 'Geen resultaten hier.',
			'noSubmissions': 'Er zijn geen indieningen via postvak die uw aandacht nodig hebben.',
			'publishAll': 'Alles publiceren',
			'publishAllConfirmDialogMessage': '{evaluated} out of {assigned} users will receive feedback on publishing. Do you want to continue?',
			'publishAllToastMessage': '{activityName} evaluations published successfully.',
			'publishAllToastMessageTruncated': '{truncatedActivityName}… evaluations published successfully.',
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
			'toggleIndicatorLabel': 'Perform Actions on {target}',
			'tryAgain': 'Probeer het opnieuw',
			'newSubmissions': 'New Submissions',
			'newSubmissionDetails': '{newNum, plural, =0 {{resub, plural, =1 {1 resubmission} other {{resub} resubmissions}}} other {{resub, plural, =0 {{newNum} new} =1{{newNum} new, 1 resubmission} other {{newNum} new, {resub} resubmissions}}}}',
			'newPosts': 'New Posts',
			'newPostDetails': '{numInteractions, plural, =1 {1 thread or reply} other {{numInteractions} threads or replies}}',
			'newAttempts': 'New Attempts',
			'newAttemptsDetails': '{newNum, plural, =0 {{reAttemptNum, plural, =1 {1 reattempt} other {{reAttemptNum} reattempts}}} other {{reAttemptNum, plural, =0 {{newNum} new} =1{{newNum} new, 1 reattempt} other {{newNum} new, {reAttemptNum} reattempts}}}}',
			'viewBy': 'Weergeven op:',
			'yes': 'Yes'
		};
	}
};

export const LangNl = dedupingMixin(LangNlImpl);

