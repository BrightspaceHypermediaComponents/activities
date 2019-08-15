'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fr = {
			'activities': 'Activités',
			'activityName': 'Nom de l’activité',
			'assignment': 'Travail',
			'caughtUp': 'Vous avez terminé!',
			'checkBackOften': 'Revenez régulièrement pour de nouvelles soumissions.',
			'clearSearch': 'Effacer la recherche',
			'close': 'Close',
			'completed': 'Terminé(e)',
			'confirmation': 'Confirmation',
			'courseName': 'Cours',
			'discussion': 'Discussion',
			'displayName': 'Prénom et Nom de famille',
			'due': 'Date d\'échéance : {date}',
			'evaluate': 'Évaluer {displayName}',
			'evaluateAll': 'Tout évaluer',
			'evaluated': 'Évalué(e)',
			'failedToFilter': 'Impossible d’appliquer le filtre. Réessayez dans quelques minutes.',
			'failedToLoadData': 'Impossible de charger les soumissions. Réessayez dans quelques minutes.',
			'failedToLoadMore': 'Impossible de charger plus de soumissions. Réessayez dans quelques minutes.',
			'failedToSearch': 'Impossible d’appliquer la recherche. Réessayez dans quelques minutes.',
			'firstName': 'Prénom',
			'lastName': 'Nom de famille',
			'loadMore': 'En voir plus',
			'loading': 'Chargement',
			'masterTeacher': 'Enseignant',
			'no': 'No',
			'noCriteriaMatch': 'Aucune soumission ne correspond à vos critères.',
			'noCriteriaMatchActivities': 'There are no activities that match your criteria.',
			'noResults': 'Aucun résultat ici.',
			'noSubmissions': 'Aucune soumission ne requiert votre attention.',
			'publishAll': 'Tout publier',
			'publishAllConfirmDialogMessage': '{evaluated} out of {assigned} users will receive feedback on publishing. Do you want to continue?',
			'publishAllToastMessage': '{activityName} evaluations published successfully.',
			'publishAllToastMessageTruncated': '{truncatedActivityName}… evaluations published successfully.',
			'published': 'Publié',
			'quiz': 'Questionnaire',
			'search': 'Rechercher',
			'searchResultsMore': '{num}+ résultats de recherche',
			'searchResultsMultiple': '{num} résultats de recherche',
			'searchResultsSingle': '1 résultat de recherche',
			'sortBy': 'Trier par {columnName}',
			'submissionDate': 'Date de soumission',
			'submissionList': 'Liste des soumissions',
			'submissions': 'Soumissions',
			'tableTitle': 'Liste des soumissions des apprenants non évaluées provenant des cours et des outils',
			'toggleIndicatorLabel': 'Perform Actions on {target}',
			'tryAgain': 'Réessayer',
			'newSubmissions': 'New Submissions',
			'newSubmissionDetails': '{newNum} new, {resub} resubmissions',
			'newPosts': 'New Posts',
			'newPostDetails': '{numInteractions} threads or replies',
			'newAttempts': 'New Attempts',
			'newAttemptsDetails': '{newNum} new, {reAttemptNum} reattempts',
			'newAttemptsSingularReattemptDetails': '{newNum} new, 1 reattempt',
			'viewBy': 'Afficher par :',
			'yes': 'Yes'
		};
	}
};

export const LangFr = dedupingMixin(LangFrImpl);

