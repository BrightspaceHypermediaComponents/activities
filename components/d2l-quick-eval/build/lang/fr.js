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
			'completed': 'Terminé(e)',
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
			'noCriteriaMatch': 'Aucune soumission ne correspond à vos critères.',
			'noResults': 'Aucun résultat ici.',
			'noSubmissions': 'Aucune soumission ne requiert votre attention.',
			'publishAll': 'Tout publier',
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
			'tryAgain': 'Réessayer',
			'newSubmissions': 'New Submissions',
			'newSubmissionDetails': '{newNum} new, {resub} resubmissions',
			'newPosts': 'New Posts',
			'newPostDetails': '{newNum} new, {resub} reposts',
			'newAttempts': 'New Attempts',
			'newAttemptsDetails': '{newNum} new',
			'viewBy': 'Afficher par :'
		};
	}
};

export const LangFr = dedupingMixin(LangFrImpl);

