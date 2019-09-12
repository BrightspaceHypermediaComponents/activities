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
			'close': 'Close',
			'completed': 'Completed',
			'confirmation': 'Confirmation',
			'courseName': 'Kursus',
			'discussion': 'Discussion',
			'displayName': 'Fornavn, Efternavn',
			'due': 'Due: {date}',
			'evaluate': 'Evaluer {displayName}',
			'evaluateAll': 'Evaluate All',
			'evaluated': 'Evaluated',
			'failedToFilter': 'Kunne ikke anvende filter. Prøv igen om et par minutter.',
			'failedToLoadData': 'Kunne ikke indlæse afleveringer. Prøv igen om et par minutter.',
			'failedToLoadActivities': 'Unable to load activities. Try again in a few minutes.',
			'failedToLoadMore': 'Kunne ikke indlæse flere afleveringer. Prøv igen om et par minutter.',
			'failedToSearch': 'Kunne ikke gennemføre søgning. Prøv igen om et par minutter.',
			'firstName': 'Fornavn',
			'lastName': 'Efternavn',
			'loadMore': 'Indlæs flere',
			'loading': 'Indlæser',
			'masterTeacher': 'Lærer',
			'no': 'No',
			'noCriteriaMatch': 'Der er ingen afleveringer, der matcher dine kriterier.',
			'noCriteriaMatchActivities': 'There are no activities that match your criteria.',
			'noResults': 'Ingen resultater her.',
			'noSubmissions': 'Der er ingen afleveringer, der kræver din opmærksomhed.',
			'publishAll': 'Publish All',
			'publishAllConfirmDialogMessage': '{evaluated} out of {assigned} users will receive feedback on publishing. Do you want to continue?',
			'publishAllToastMessage': '{activityName} evaluations published successfully.',
			'publishAllToastMessageTruncated': '{truncatedActivityName}… evaluations published successfully.',
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
			'toggleIndicatorLabelActions': 'Perform Actions on {target}',
			'toggleIndicatorLabelInfo': 'Get Info on {target}',
			'tryAgain': 'Prøv igen',
			'newSubmissions': 'New Submissions',
			'newSubmissionDetails': '{newNum, plural, =0 {{resub, plural, =1 {1 resubmission} other {{resub} resubmissions}}} other {{resub, plural, =0 {{newNum} new} =1{{newNum} new, 1 resubmission} other {{newNum} new, {resub} resubmissions}}}}',
			'newPosts': 'New Posts',
			'newPostDetails': '{numInteractions, plural, =1 {1 thread or reply} other {{numInteractions} threads or replies}}',
			'newAttempts': 'New Attempts',
			'newAttemptsDetails': '{newNum, plural, =0 {{reAttemptNum, plural, =1 {1 reattempt} other {{reAttemptNum} reattempts}}} other {{reAttemptNum, plural, =0 {{newNum} new} =1{{newNum} new, 1 reattempt} other {{newNum} new, {reAttemptNum} reattempts}}}}',
			'viewBy': 'Vis efter:',
			'yes': 'Yes'
		};
	}
};

export const LangDadk = dedupingMixin(LangDadkImpl);

