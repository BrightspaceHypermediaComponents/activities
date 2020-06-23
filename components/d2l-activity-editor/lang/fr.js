/* eslint quotes: 0 */

export default {
	"btnEditReleaseConditions": "Modifier les conditions de diffusion", // edit release conditions button
	"btnAddReleaseCondition": "Ajouter une condition de diffusion", // add release condition button
	"btnCreateNew": "Créer", // create new button
	"btnAddExisting": "Ajouter existant", // add existing button
	"btnRemoveCondition": "Supprimer la condition", // remove condition button
	"lblConditionsOperator": "Pour consulter cet article, les utilisateurs doivent respecter", // conditions operator label
	"txtNumReleaseConditions": "{count, plural, =1 {{count} condition de diffusion} other {{count} conditions de diffusion}}", // num release condition text
	"btnCancel": "Annuler", // cancel button
	"btnSave": "Enregistrer et fermer", // save and close button
	"btnSaveMobile": "Enregistrer", // save and close button for mobile devices
	"dueDate": "Date d’échéance", // ARIA label for the due date field when creating/editing an activity
	"endDate": "Date de fin", // ARIA label for the end date field when creating/editing an activity
	"startDate": "Date de début", // ARIA label for the start date field when creating/editing an activity
	"dueTime": "Heure d’échéance", // ARIA label for the due time field when creating/editing an activity
	"endTime": "Heure de fin", // ARIA label for the end time field when creating/editing an activity
	"startTime": "Heure de début", // ARIA label for the start time field when creating/editing an activity
	"hidden": "Masqué", // Label displayed with the visibility switch when hidden
	"noDueDate": "Aucune date d’échéance", // Placeholder text for due date field when no due date is set
	"noEndDate": "Pas de date de fin", // Placeholder text for due date field when no due date is set
	"noStartDate": "Pas de date de début", // Placeholder text for due date field when no due date is set
	"visible": "Visible", // Label displayed with the visibility switch when visible
	"txtAvailabilityStartAndEnd": "La disponibilité commence le {startDate} et se termine le {endDate}", // start/end text
	"txtAvailabilityStartOnly": "La disponibilité commence le {startDate}", // start only text
	"txtAvailabilityEndOnly": "La disponibilité se termine le {endDate}", // end only text
	"txtAvailabilityNeither": "Toujours disponible", // always available text
	"ungraded": "Non noté", // State of score field when there is no score and no grade item, when creating/editing an activity
	"inGrades": "Dans Notes", // State of the grades field when there is a score, and an associated grade item
	"notInGrades": "Pas dans Notes d’appréciation", // State of the grades field when there is a score, but no associated grade item
	"addToGrades": "Ajouter à Notes", // Menu item for adding grade association
	"addAGrade": "Inclure une Note d\'appréciation", //ARIA label to add a grade to the activity
	"removeFromGrades": "Retirer des Notes d’appréciation", // Menu item for removing grade association
	"setUngraded": "Réinitialisation au statut non noté", // Menu item for setting the activity to ungraded
	"scoreOutOf": "Note sur", // ARIA label for the score out of field, when creating/editing an activity
	"emptyScoreOutOfError": "Une valeur en points doit être précisée pour les activités dans l’outil Notes d’appréciation", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"invalidScoreOutOfError": "La note sur doit être égale ou supérieure à 0,01 et égale ou inférieure à 9 999 999 999.", // Error message when an invalid score out of value is entered
	"loading": "Chargement…", // Message displayed while page is loading
	"ok": "OK", // Text of dialog button to commit action
	"cancel": "Annuler", // Text of dialog button to cancel action
	"ariaToolbarShortcutInstructions": "Cliquez sur Alt + F10 pour afficher la barre d’outils et sur Échap pour la faire disparaître.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"chooseFromGrades": "Faire un choix dans les Notes d\'appréciation", // Link text and dialog title for the edit grades dialog,
	"hdrRubrics": "Rubriques", //Header for the rubrics section
	"startBeforeEndDate": "La date du début doit être antérieure à la date de fin.",
	"dueBetweenStartEndDate": "La date d\'échéance doit être postérieure à la date du début et antérieure ou correspondre à la date de fin.",
	"dueAfterStartDate": "La date d\'échéance doit être postérieure à la date du début.",
	"dueBeforeEndDate": "La date d\'échéance doit être antérieure ou correspondre à la date de fin.",
	"createAndLinkToNewGradeItem": "Créer et lier à un nouvel élément de note", //Radio button text
	"linkToExistingGradeItem": "Lier à un élément de note existant", //Radio button text
	"points": "Points : {points}", // Text label for displaying points of a grade
	"noGradeItems": "Aucun élément de note existant", // Reason why existing grade items cannot be linked in the choose grades dialog
	"noGradeCreatePermission": "Vous n\'êtes pas autorisé(e) à créer un élément de note", // Reason why a new grade items cannot be created in the choose grades dialog
	"competencies": "Objectifs d\'apprentissage", //Text label for the competencies tool integration
	"manageCompetencies": "Gérer les objectifs d’apprentissage", //Button text to launch competencies tool dialog
	"competenciesCount": "{count, plural, =0 {No learning objectives} =1 {1 attached} other {{count} attached}}", //Label for number of associated competencies
	"competenciesCountSummary": "{count, plural, =0 {Aucun objectif d’apprentissage} =1 {1 objectif d’apprentissage} other {{count} objectifs d’apprentissage}}",
	"unevaluatedCompetencies": "{count, plural, =1 {1 not being evaluated} other {{count} not being evaluated}}", //Label for number of unevalated associated competencies
	"btnClose": "Fermer", //Label for Close button
	"btnCloseDialog": "Fermer ce dialogue" // close dialog button
};
