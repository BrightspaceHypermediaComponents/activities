'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangSvImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.sv = {
			'activities': 'Aktiviteter',
			'activityName': 'Aktivitetsnamn',
			'assignment': 'Uppgift',
			'caughtUp': 'Du är ifatt!',
			'checkBackOften': 'Du bör kontrollera om det finns nya inlämningar här med regelbundna intervall.',
			'clearSearch': 'Rensa sökning',
			'close': 'Stäng',
			'completed': 'Slutförd',
			'confirmation': 'Bekräftelse',
			'courseName': 'Kurs',
			'discussion': 'Diskussion',
			'displayName': 'Förnamn, efternamn',
			'due': 'Förfaller: {date}',
			'evaluate': 'Utvärdera {displayName}',
			'evaluateAll': 'Utvärdera alla',
			'evaluated': 'Utvärderad',
			'failedToFilter': 'Det gick inte att använda filtret. Försök igen om några minuter.',
			'failedToLoadActivities': 'Det gick inte att läsa in aktiviteterna. Försök igen om några minuter.',
			'failedToLoadData': 'Det gick inte att läsa in inlämningarna. Försök igen om några minuter.',
			'failedToLoadMore': 'Det gick inte att läsa in fler inlämningar. Försök igen om några minuter.',
			'failedToSearch': 'Det gick inte att använda sökningen. Försök igen om några minuter.',
			'firstName': 'Förnamn',
			'lastName': 'Efternamn',
			'loadMore': 'Ladda mer',
			'loading': 'Laddar',
			'masterTeacher': 'Lärare',
			'newAttempts': 'Nya försök',
			'newAttemptsDetails': '{newNum, plural, =0 {{reAttemptNum, plural, =1 {1 reattempt} other {{reAttemptNum} återförsök}}} other {{reAttemptNum, plural, =0 {{newNum} new} =1{{newNum} nytt, 1 återförsök} other {{newNum} new, {reAttemptNum} återförsök}}}}',
			'newPostDetails': '{numInteractions, plural, =1 {1 tråd eller svar} other {{numInteractions} trådar eller svar}}',
			'newPosts': 'Nya inlägg',
			'newSubmissionDetails': '{new Num, plural, =0 {{resub, plural, =1 {1 återinlämning} other {{resub} återinlämningar}}} other {{resub, plural, =0 {{newNum} new} =1{{newNum} ny, 1 återinlämning} other {{newNum} new, {resub} återinlämningar}}}}',
			'newSubmissions': 'Nya inlämningar',
			'no': 'Nej',
			'noCriteriaMatch': 'Det finns inga inlämningar som matchar dina kriterier.',
			'noCriteriaMatchActivities': 'Det finns inga aktiviteter som matchar dina kriterier.',
			'noResults': 'Det finns inga resultat här.',
			'noSubmissions': 'Det finns inga inlämningar som du behöver utföra någon åtgärd på.',
			'publishAll': 'Publicera alla',
			'publishAllConfirmDialogMessage': '{evaluated} av {assigned} användare får feedback vid publicering. Vill du fortsätta?',
			'publishAllToastMessage': '{activityName} utvärderingar har publicerats.',
			'publishAllToastMessageTruncated': '{truncatedActivityName}… utvärderingar har publicerats.',
			'published': 'Publicerad',
			'quiz': 'Förhör',
			'search': 'Sökning',
			'searchResultsMore': '{num}+ sökresultat',
			'searchResultsMultiple': '{num} sökresultat',
			'searchResultsSingle': '1 sökresultat',
			'sortBy': 'Sortera efter {columnName}',
			'submissionDate': 'Inlämningsdatum',
			'submissionList': 'Inlämningslista',
			'submissions': 'inlämningar',
			'tableTitle': 'Lista över ej utvärderade elevinlämningar från kurser och verktyg',
			'toggleIndicatorLabel': 'Utför åtgärder på {target}',
			'tryAgain': 'Försök på nytt',
			'viewBy': 'Visa enligt:',
			'yes': 'Ja'
		};
	}
};

export const LangSv = dedupingMixin(LangSvImpl);

