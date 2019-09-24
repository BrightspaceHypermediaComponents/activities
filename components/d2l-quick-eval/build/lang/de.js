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
			'close': 'Schließen',
			'completed': 'Abgeschlossen',
			'confirmation': 'Bestätigung',
			'courseName': 'Kurs',
			'discussion': 'Diskussion',
			'displayName': 'Vorname, Nachname',
			'due': 'Abgabetermin:',
			'evaluate': '{displayName} bewerten',
			'evaluateAll': 'Alle bewerten',
			'evaluated': 'Bewertet',
			'failedToFilter': 'Filter konnte nicht angewendet werden. Versuchen Sie es in ein paar Minuten erneut.',
			'failedToLoadActivities': 'Aktivitäten können nicht geladen werden. Versuchen Sie es in einigen Minuten erneut.',
			'failedToLoadData': 'Abgaben können nicht geladen werden. Versuchen Sie es in ein paar Minuten erneut.',
			'failedToLoadMore': 'Es können keine weiteren Abgaben geladen werden. Versuchen Sie es in ein paar Minuten erneut.',
			'failedToSearch': 'Suche konnte nicht durchgeführt werden. Versuchen Sie es in ein paar Minuten erneut.',
			'firstName': 'Vorname',
			'lastName': 'Nachname',
			'loadMore': 'Mehr laden',
			'loading': 'Wird geladen',
			'masterTeacher': 'Lehrer',
			'newAttempts': 'Neue Versuche',
			'newAttemptsDetails': '{newNum, plural, =0 {{reAttemptNum, plural, =1 {1 neuer Versuch} other {{reAttemptNum} neue Versuche}}} other {{reAttemptNum, plural, =0 {{newNum} neu} =1{{newNum} neu, 1 neuer Versuch} other {{newNum} neu, {reAttemptNum} neue Versuche}}}}',
			'newPostDetails': '{numInteractions, plural, =1 {1 Unterhaltung oder Antwort} other {{numInteractions} Unterhaltungen oder Antworten}}',
			'newPosts': 'Neue Beiträge',
			'newSubmissionDetails': '{newNum, plural, =0 {{resub, plural, =1 {1 erneute Abgabe} other {{resub} erneute Abgaben}}} other {{resub, plural, =0 {{newNum} neu} =1{{newNum} neu, 1 erneute Abgabe} other {{newNum} neu, {resub} erneute Abgaben}}}}',
			'newSubmissions': 'Neue Abgaben',
			'no': 'Nein',
			'noCriteriaMatch': 'Es gibt keine Abgaben, die mit Ihren Kriterien übereinstimmen.',
			'noCriteriaMatchActivities': 'Es gibt keine Aktivitäten, die mit Ihren Kriterien übereinstimmen.',
			'noResults': 'Keine Ergebnisse',
			'noSubmissions': 'Es gibt keine Abgaben, die Ihre Aufmerksamkeit erfordern.',
			'publishAll': 'Alle veröffentlichen',
			'publishAllConfirmDialogMessage': '{evaluated} von {assigned} Benutzern erhalten Feedback zur Veröffentlichung. Möchten Sie den Vorgang fortsetzen?',
			'publishAllToastMessage': '{activityName}-Bewertungen erfolgreich veröffentlicht.',
			'publishAllToastMessageTruncated': '{trunatedActivityName}-...-Bewertungen erfolgreich veröffentlicht.',
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
			'toggleIndicatorLabelActions': 'Aktionen für {target} ausführen',
			'toggleIndicatorLabelInfo': 'Informationen auf {target} anzeigen',
			'tryAgain': 'Erneut versuchen',
			'viewBy': 'Anzeigen nach:',
			'yes': 'Ja'
		};
	}
};

export const LangDe = dedupingMixin(LangDeImpl);

