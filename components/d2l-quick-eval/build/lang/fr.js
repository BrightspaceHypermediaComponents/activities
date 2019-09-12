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
			'close': 'Fermer',
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
			'failedToLoadActivities': 'Impossible de charger les activités. Réessayez dans quelques minutes.',
			'failedToLoadData': 'Impossible de charger les soumissions. Réessayez dans quelques minutes.',
			'failedToLoadMore': 'Impossible de charger plus de soumissions. Réessayez dans quelques minutes.',
			'failedToSearch': 'Impossible d’appliquer la recherche. Réessayez dans quelques minutes.',
			'firstName': 'Prénom',
			'lastName': 'Nom de famille',
			'loadMore': 'En voir plus',
			'loading': 'Chargement',
			'masterTeacher': 'Enseignant',
			'newAttempts': 'Nouvelles tentatives',
			'newAttemptsDetails': '{newNum, plural, =0 {{reAttemptNum, plural, =1 {1 nouvelle tentative} other {{reAttemptNum} nouvelles tentatives}}} other {{reAttemptNum, plural, =0 {{newNum} nouvelle} =1{{newNum} nouvelle, 1 nouvelle tentative} other {{newNum} nouvelle, {reAttemptNum} nouvelles tentatives}}}}',
			'newPostDetails': '{numInteractions, plural, =1 {1 fil ou réponse} other {{numInteractions} fils ou réponses}}',
			'newPosts': 'Nouvelles publications',
			'newSubmissionDetails': '{newNum, plural, =0 {{resub, plural, =1 {1 resoumission} other {{resub} resoumissions}}} other {{resub, plural, =0 {{newNum} nouvelle} =1{{newNum} nouvelle, 1 resoumission} other {{newNum} nouvelles, {resub} resoumissions}}}}',
			'newSubmissions': 'Nouvelles soumissions',
			'no': 'Non',
			'noCriteriaMatch': 'Aucune soumission ne correspond à vos critères.',
			'noCriteriaMatchActivities': 'Aucune activité ne correspond à vos critères.',
			'noResults': 'Aucun résultat ici.',
			'noSubmissions': 'Aucune soumission ne requiert votre attention.',
			'publishAll': 'Tout publier',
			'publishAllConfirmDialogMessage': '{evaluated} utilisateurs sur {assigned} recevront de la rétroaction à la publication. Voulez-vous continuer?',
			'publishAllToastMessage': 'Évaluations {activityName} publiées avec succès.',
			'publishAllToastMessageTruncated': 'Évaluations {truncatedActivityName}… publiées avec succès.',
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
			'toggleIndicatorLabelActions': 'Exécuter des actions sur {target}',
			'toggleIndicatorLabelInfo': 'Get Info on {target}',
			'tryAgain': 'Réessayer',
			'viewBy': 'Afficher par :',
			'yes': 'Oui'
		};
	}
};

export const LangFr = dedupingMixin(LangFrImpl);

