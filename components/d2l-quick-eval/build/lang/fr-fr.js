'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrfrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.frfr = {
			'activities': 'Activités',
			'activityName': 'Nom de l’activité',
			'caughtUp': 'Vous êtes à jour !',
			'checkBackOften': 'Vérifiez régulièrement si vous avez de nouvelles soumissions de devoirs.',
			'clearSearch': 'Effacer la recherche',
			'completed': 'Completed',
			'courseName': 'Cours',
			'displayName': 'Prénom, Nom',
			'due': 'Due: {date}',
			'evaluate': 'Évaluer {displayName}',
			'evaluateAll': 'Evaluate All',
			'evaluated': 'Evaluated',
			'failedToFilter': 'Impossible d’appliquer le filtre. Réessayez dans quelques minutes.',
			'failedToLoadData': 'Impossible de charger les soumissions. Réessayez dans quelques minutes.',
			'failedToLoadMore': 'Impossible de charger plus de soumissions. Réessayez dans quelques minutes.',
			'failedToSearch': 'Unable to apply search. Try again in a few minutes.',
			'firstName': 'Prénom',
			'lastName': 'Nom de famille',
			'loadMore': 'Charger plus',
			'loading': 'Chargement en cours',
			'masterTeacher': 'Enseignant',
			'noCriteriaMatch': 'There are no submissions that match your criteria.',
			'noResults': 'Aucun résultat.',
			'noSubmissions': 'Aucune soumission ne nécessite votre attention.',
			'publishAll': 'Publish All',
			'published': 'Published',
			'search': 'Rechercher',
			'searchResultsMore': 'Plus de {num} résultats de recherche',
			'searchResultsMultiple': '{num} Search Results',
			'searchResultsSingle': '1 Search Result',
			'sortBy': 'Sort by {columnName}',
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

