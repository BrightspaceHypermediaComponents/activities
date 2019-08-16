'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDeImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.de = {
			'activities': 'Aktivitäten',
			'activityName': 'Name der Aktivität',
			'assignment': 'Übung',
			'caughtUp': 'Sie sind auf dem neuesten Stand!',
			'checkBackOften': 'Sehen Sie regelmäßig nach, ob neue Abgaben verfügbar sind.',
			'clearSearch': 'Suche löschen',
			'close': 'Close',
			'completed': 'Abgeschlossen',
			'confirmation': 'Confirmation',
			'courseName': 'Kurs',
			'discussion': 'Diskussion',
			'displayName': 'Vorname, Nachname',
			'due': 'Abgabetermin:',
			'evaluate': '{displayName} bewerten',
			'evaluateAll': 'Alle bewerten',
			'evaluated': 'Bewertet',
			'failedToFilter': 'Filter konnte nicht angewendet werden. Versuchen Sie es in ein paar Minuten erneut.',
			'failedToLoadData': 'Abgaben können nicht geladen werden. Versuchen Sie es in ein paar Minuten erneut.',
			'failedToLoadActivities': 'Unable to load activities. Try again in a few minutes.',
			'failedToLoadMore': 'Es können keine weiteren Abgaben geladen werden. Versuchen Sie es in ein paar Minuten erneut.',
			'failedToSearch': 'Suche konnte nicht durchgeführt werden. Versuchen Sie es in ein paar Minuten erneut.',
			'firstName': 'Vorname',
			'lastName': 'Nachname',
			'loadMore': 'Mehr laden',
			'loading': 'Wird geladen',
			'masterTeacher': 'Lehrer',
			'no': 'No',
			'noCriteriaMatch': 'Es gibt keine Abgaben, die mit Ihren Kriterien übereinstimmen.',
			'noCriteriaMatchActivities': 'There are no activities that match your criteria.',
			'noResults': 'Keine Ergebnisse',
			'noSubmissions': 'Es gibt keine Abgaben, die Ihre Aufmerksamkeit erfordern.',
			'publishAll': 'Alle veröffentlichen',
			'publishAllConfirmDialogMessage': '{evaluated} out of {assigned} users will receive feedback on publishing. Do you want to continue?',
			'publishAllToastMessage': '{activityName} evaluations published successfully.',
			'publishAllToastMessageTruncated': '{truncatedActivityName}… evaluations published successfully.',
			'published': 'Veröffentlicht',
			'quiz': 'Test',
			'search': 'Suchen',
			'searchResultsMore': 'Über {num} Suchergebnisse',
			'searchResultsMultiple': '{num} Suchergebnisse',
			'searchResultsSingle': '1 Suchergebnis',
			'sortBy': 'Sortieren nach {columnName}',
			'submissionDate': 'Abgabedatum',
			'submissionList': 'Abgabeliste',
			'submissions': 'Abgaben',
			'tableTitle': 'Liste nicht bewerteter Abgaben von Lernern in allen Kursen und Tools',
			'toggleIndicatorLabel': 'Perform Actions on {target}',
			'tryAgain': 'Erneut versuchen',
			'newSubmissions': 'New Submissions',
			'newSubmissionDetails': '{newNum, plural, =0 {{resub, plural, =1 {1 resubmission} other {{resub} resubmissions}}} other {{resub, plural, =0 {{newNum} new} =1{{newNum} new, 1 resubmission} other {{newNum} new, {resub} resubmissions}}}}',
			'newPosts': 'New Posts',
			'newPostDetails': '{numInteractions, plural, =1 {1 thread or reply} other {{numInteractions} threads or replies}}',
			'newAttempts': 'New Attempts',
			'newAttemptsDetails': '{newNum, plural, =0 {{reAttemptNum, plural, =1 {1 reattempt} other {{reAttemptNum} reattempts}}} other {{reAttemptNum, plural, =0 {{newNum} new} =1{{newNum} new, 1 reattempt} other {{newNum} new, {reAttemptNum} reattempts}}}}',
			'viewBy': 'Anzeigen nach:',
			'yes': 'Yes'
		};
	}
};

export const LangDe = dedupingMixin(LangDeImpl);

