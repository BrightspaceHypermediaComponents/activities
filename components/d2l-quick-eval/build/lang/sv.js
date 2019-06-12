'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangSvImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.sv = {
			'activities': 'Aktiviteter',
			'activityName': 'Aktivitetsnamn',
			'caughtUp': 'Du är ifatt!',
			'checkBackOften': 'Du bör kontrollera om det finns nya inlämningar här med regelbundna intervall.',
			'clearSearch': 'Rensa sökning',
			'completed': 'Completed',
			'courseName': 'Kurs',
			'displayName': 'Förnamn, efternamn',
			'due': 'Due: {date}',
			'evaluate': 'Utvärdera {displayName}',
			'evaluateAll': 'Evaluate All',
			'evaluated': 'Evaluated',
			'failedToFilter': 'Det gick inte att använda filtret. Försök igen om några minuter.',
			'failedToLoadData': 'Det gick inte att läsa in inlämningarna. Försök igen om några minuter.',
			'failedToLoadMore': 'Det gick inte att läsa in fler inlämningar. Försök igen om några minuter.',
			'failedToSearch': 'Det gick inte att använda sökningen. Försök igen om några minuter.',
			'firstName': 'Förnamn',
			'lastName': 'Efternamn',
			'loadMore': 'Ladda mer',
			'loading': 'Laddar',
			'masterTeacher': 'Lärare',
			'noCriteriaMatch': 'Det finns inga inlämningar som matchar dina kriterier.',
			'noResults': 'Det finns inga resultat här.',
			'noSubmissions': 'Det finns inga inlämningar som du behöver utföra någon åtgärd på.',
			'publishAll': 'Publish All',
			'published': 'Published',
			'search': 'Sökning',
			'searchResultsMore': '{num}+ sökresultat',
			'searchResultsMultiple': '{num} sökresultat',
			'searchResultsSingle': '1 sökresultat',
			'sortBy': 'Sortera efter {columnName}',
			'submissionDate': 'Inlämningsdatum',
			'submissionList': 'Submission List',
			'submissions': 'inlämningar',
			'tableTitle': 'Lista över ej utvärderade elevinlämningar från kurser och verktyg',
			'tryAgain': 'Försök på nytt',
			'unreadSubmissions': '{num} unread submissions',
			'unreadSubmissionsDetail': '{unread} new, {resub} resubmissions',
			'viewBy': 'Visa enligt:'
		};
	}
};

export const LangSv = dedupingMixin(LangSvImpl);

