'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrfrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.frfr = {
			'activities': 'Activités',
			'activityName': 'Nom de l’activité',
			'assignment': 'Devoirs',
			'caughtUp': 'Vous êtes à jour !',
			'checkBackOften': 'Vérifiez régulièrement si vous avez de nouvelles soumissions de devoirs.',
			'clearSearch': 'Effacer la recherche',
			'close': 'Close',
			'completed': 'Completed',
			'confirmation': 'Confirmation',
			'courseName': 'Cours',
			'discussion': 'Discussion',
			'displayName': 'Prénom, Nom',
			'due': 'Due: {date}',
			'evaluate': 'Évaluer {displayName}',
			'evaluateAll': 'Evaluate All',
			'evaluated': 'Evaluated',
			'failedToFilter': 'Impossible d’appliquer le filtre. Réessayez dans quelques minutes.',
			'failedToLoadData': 'Impossible de charger les soumissions. Réessayez dans quelques minutes.',
			'failedToLoadActivities': 'Unable to load activities. Try again in a few minutes.',
			'failedToLoadMore': 'Impossible de charger plus de soumissions. Réessayez dans quelques minutes.',
			'failedToSearch': 'Impossible d’appliquer la recherche. Réessayez dans quelques minutes.',
			'firstName': 'Prénom',
			'lastName': 'Nom de famille',
			'loadMore': 'Charger plus',
			'loading': 'Chargement en cours',
			'masterTeacher': 'Enseignant',
			'no': 'No',
			'noCriteriaMatch': 'Aucune soumission ne correspond à vos critères.',
			'noCriteriaMatchActivities': 'There are no activities that match your criteria.',
			'noResults': 'Aucun résultat.',
			'noSubmissions': 'Aucune soumission ne nécessite votre attention.',
			'publishAll': 'Publish All',
			'publishAllConfirmDialogMessage': '{evaluated} out of {assigned} users will receive feedback on publishing. Do you want to continue?',
			'publishAllToastMessage': '{activityName} evaluations published successfully.',
			'publishAllToastMessageTruncated': '{truncatedActivityName}… evaluations published successfully.',
			'published': 'Published',
			'quiz': 'Quiz',
			'search': 'Rechercher',
			'searchResultsMore': 'Plus de {num} résultats de recherche',
			'searchResultsMultiple': '{num} résultats de recherche',
			'searchResultsSingle': '1 résultat de recherche',
			'sortBy': 'Trier par {columnName}',
			'submissionDate': 'Date de la soumission',
			'submissionList': 'Submission List',
			'submissions': 'Soumissions de devoirs',
			'tableTitle': 'Liste des soumissions non évaluées de l’apprenant dans l’ensemble des cours et des outils',
			'toggleIndicatorLabelActions': 'Perform Actions on {target}',
			'toggleIndicatorLabelInfo': 'Get Info on {target}',
			'tryAgain': 'Réessayez',
			'newSubmissions': 'New Submissions',
			'newSubmissionDetails': '{newNum, plural, =0 {{resub, plural, =1 {1 resubmission} other {{resub} resubmissions}}} other {{resub, plural, =0 {{newNum} new} =1{{newNum} new, 1 resubmission} other {{newNum} new, {resub} resubmissions}}}}',
			'newPosts': 'New Posts',
			'newPostDetails': '{numInteractions, plural, =1 {1 thread or reply} other {{numInteractions} threads or replies}}',
			'newAttempts': 'New Attempts',
			'newAttemptsDetails': '{newNum, plural, =0 {{reAttemptNum, plural, =1 {1 reattempt} other {{reAttemptNum} reattempts}}} other {{reAttemptNum, plural, =0 {{newNum} new} =1{{newNum} new, 1 reattempt} other {{newNum} new, {reAttemptNum} reattempts}}}}',
			'viewBy': 'Vue :',
			'yes': 'Yes'
		};
	}
};

export const LangFrfr = dedupingMixin(LangFrfrImpl);

