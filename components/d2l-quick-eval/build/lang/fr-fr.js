'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrfrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.frfr = {
			'activities': 'Activités',
			'activityName': 'Nom de l’activité',
			'assignment': 'Assignment',
			'caughtUp': 'Vous êtes à jour !',
			'checkBackOften': 'Vérifiez régulièrement si vous avez de nouvelles soumissions de devoirs.',
			'clearSearch': 'Effacer la recherche',
			'completed': 'Completed',
			'courseName': 'Cours',
			'discussion': 'Discussion',
			'displayName': 'Prénom, Nom',
			'due': 'Due: {date}',
			'evaluate': 'Évaluer {displayName}',
			'evaluateAll': 'Evaluate All',
			'evaluated': 'Evaluated',
			'failedToFilter': 'Impossible d’appliquer le filtre. Réessayez dans quelques minutes.',
			'failedToLoadData': 'Impossible de charger les soumissions. Réessayez dans quelques minutes.',
			'failedToLoadMore': 'Impossible de charger plus de soumissions. Réessayez dans quelques minutes.',
			'failedToSearch': 'Impossible d’appliquer la recherche. Réessayez dans quelques minutes.',
			'firstName': 'Prénom',
			'lastName': 'Nom de famille',
			'loadMore': 'Charger plus',
			'loading': 'Chargement en cours',
			'masterTeacher': 'Enseignant',
			'noCriteriaMatch': 'Aucune soumission ne correspond à vos critères.',
			'noResults': 'Aucun résultat.',
			'noSubmissions': 'Aucune soumission ne nécessite votre attention.',
			'publishAll': 'Publish All',
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
			'tryAgain': 'Réessayez',
			'unreadSubmissions': '{num} unread submissions',
			'unreadSubmissionsDetail': '{unread} new, {resub} resubmissions',
			'viewBy': 'Vue :'
		};
	}
};

export const LangFrfr = dedupingMixin(LangFrfrImpl);

