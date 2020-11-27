/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "Modifier les conditions de diffusion", // edit release conditions button
	"editor.btnAddReleaseCondition": "Ajouter une condition de diffusion", // add release condition button
	"editor.btnCreateNew": "Créer", // create new button
	"editor.btnAddExisting": "Ajouter existant", // add existing button
	"editor.btnRemoveCondition": "Supprimer la condition", // remove condition button
	"editor.lblConditionsOperator": "Pour consulter cet article, les utilisateurs doivent respecter", // conditions operator label
	"editor.txtConditionAdded": "Condition ajoutée : {title}",
	"editor.txtConditionRemoved": "Condition retirée : {title}",
	"editor.txtConditionsAdded": "{count} conditions ajoutées",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} condition de diffusion} other {{count} conditions de diffusion}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {1 utilisateur ayant l’accès spécial} other {{userCount} utilisateurs ayant l’accès spécial}}", // num users with special access text
	"editor.btnCancel": "Annuler", // cancel button
	"editor.btnSave": "Enregistrer et fermer", // save and close button
	"editor.btnSaveMobile": "Enregistrer", // save and close button for mobile devices
	"editor.dueDate": "Date d’échéance", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "Date de fin", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "Date du début", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "Heure d’échéance", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "Heure de fin", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "Heure de début", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "Masqué", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "Aucune date d’échéance", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "Pas de date de fin", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "Pas de date de début", // Placeholder text for due date field when no due date is set
	"editor.visible": "Visible", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "La disponibilité commence le {startDate} et se termine le {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "La disponibilité commence le {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "La disponibilité se termine le {endDate}", // end only text
	"editor.txtAvailabilityNeither": "Toujours disponible", // always available text
	"editor.ungraded": "Non noté", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "Dans Notes", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "Pas dans Notes d’appréciation", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "Ajouter aux Notes d’appréciation", // Menu item for adding grade association
	"editor.addAGrade": "Inclure une Note d’appréciation", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "Retirer des Notes d’appréciation", // Menu item for removing grade association
	"editor.setUngraded": "Réinitialisation au statut non noté", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "Note sur", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "Une valeur en points doit être précisée pour les activités dans l’outil Notes d’appréciation", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "La note sur doit être égale ou supérieure à 0,01 et égale ou inférieure à 9 999 999 999.", // Error message when an invalid score out of value is entered
	"editor.loading": "Chargement…", // Message displayed while page is loading
	"editor.ok": "OK", // Text of dialog button to commit action
	"editor.cancel": "Annuler", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "Cliquez sur Alt + F10 pour afficher la barre d’outils et sur Échap pour la faire disparaître.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "Faire un choix dans les Notes d’appréciation", // Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "Rubriques", //Header for the rubrics section
	"editor.startBeforeEndDate": "La date du début doit être antérieure à la date de fin.",
	"editor.dueBetweenStartEndDate": "La date d’échéance doit être postérieure à la date du début et antérieure ou correspondre à la date de fin.",
	"editor.dueAfterStartDate": "La date d’échéance doit être postérieure à la date du début.",
	"editor.dueBeforeEndDate": "La date d’échéance doit être antérieure ou correspondre à la date de fin.",
	"editor.createAndLinkToNewGradeItem": "Créer et lier à un nouvel élément de note", //Radio button text
	"editor.linkToExistingGradeItem": "Lier à un élément de note existant", //Radio button text
	"editor.points": "Points : {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "Aucun élément de note existant", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "Vous n’êtes pas autorisé(e) à créer un élément de note", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "Objectifs d’apprentissage", //Text label for the competencies tool integration
	"editor.manageCompetencies": "Gérer les objectifs d’apprentissage", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1 pièce jointe} other {{count} pièces jointes}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "Aucun objectif d’apprentissage", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 objectif d’apprentissage} other {{count} objectifs d’apprentissage}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 évaluation manquante} other {{count} évaluations manquantes}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "Fermer", //Label for Close button
	"editor.btnCloseDialog": "Fermer ce dialogue", // close dialog button
	"editor.btnManageSpecialAccess": "Gérer l’accès spécial", // manage special access button
	"editor.specialAccessRestrictedText": "Seuls les utilisateurs ayant l’accès spécial ont la possibilité de prendre connaissance de ce dossier", // restricted special access description
	"editor.specialAccessNotRestrictedText": "Les utilisateurs peuvent effectuer la soumission en dehors des dates de disponibilité normales", // not restricted special access description
	"editor.specialAccessCount": "{count, plural,= 1 {1 utilisateur} other {{count} utilisateurs}} ayant l’accès spécial", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "Aucun utilisateur", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "Gérer l’accès spécial", // Dialog title
	"editor.specialAccessHidden": "Masqué par accès spécial", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "Abandonner les modifications?", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "Êtes-vous certain de vouloir abandonner vos modifications?", // Discard Changes User Prompt
	"editor.yesLabel": "Oui",
	"editor.noLabel": "Non",

	"rubrics.btnAddRubric": "Ajouter une rubrique", //text for add rubric button
	"rubrics.btnCreateNew": "Créer", //Text for create new dropdown
	"rubrics.btnAddExisting": "Ajouter existant", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "Rubriques", //Header for the rubrics section
	"rubrics.btnAttachRubric": "Joindre la rubrique", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "Annuler", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "Ajouter existant", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "Aucune rubrique n’a été ajoutée", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 rubrique ajoutée} other {{count} rubriques ajoutées}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "Supprimer la rubrique", // Text for deleting rubric icon
	"rubrics.btnClose": "Fermer", // X button for exiting the create new rubric overlay
	"rubrics.txtRubricAdded": "Rubrique ajoutée", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "Rubrique supprimée", // Text for notifying screenreader rubric was removed
	"rubrics.defaultScoringRubric": "Rubrique de notation par défaut", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "Aucune valeur par défaut sélectionnée", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "Points : {points}", // Text label for displaying points of a grade
	"grades.weight": "Poids : {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "Élément de note", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.newGradeItemCategory": "Catégorie de note d’appréciation", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "Aucune catégorie", // Category dropdown text for not selecting a category

	"attachments.addGoogleDriveLink": "Joindre à partir de Google Drive", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "Téléversement de fichier", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "Joindre un lien Web", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "Joindre à partir de OneDrive", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "Joindre un lien à l’activité existante", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "Précédent", // Text for a back button
	"attachments.closeDialog": "Fermer la boîte de dialogue", // ARIA text for button to close dialog
	"attachments.recordAudio": "Enregistrer un fichier audio", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "Enregistrer une vidéo", // Text for a button that opens a dialog to record video
	"attachments.save": "Enregistrer", // Text for a save button,
	"attachments.attach": "Joindre", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "Téléversement de fichier", // Attach menu item text
	"attachments.addLinkMenu": "Lien Web", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "Activité existante", // Attach menu item text

	"content.name": "Nom", // Text label for name input field
	"content.emptyNameField": "Le nom est obligatoire", // Error text that appears below name field when it is left empty
	"content.description": "Description", // Text label for description input field
	"content.availabilityHeader": "Dates de disponibilité", // availability header
	"content.saveError": "Votre élément de contenu n’a pas été enregistré. Veuillez corriger les champs indiqués en rouge.", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.addDueDate": "Ajouter la date d’échéance" // Text label for name input field
};
