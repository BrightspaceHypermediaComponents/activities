/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "Modifier les conditions de diffusion", // edit release conditions button
	"editor.btnAddReleaseCondition": "Ajouter des conditions de diffusion", // add release condition button
	"editor.btnCreateNew": "Créer", // create new button
	"editor.btnAddExisting": "Ajouter un élément existant", // add existing button
	"editor.btnRemoveCondition": "Supprimer la condition", // remove condition button
	"editor.lblConditionsOperator": "Pour afficher cet élément, l’utilisateur doit satisfaire", // conditions operator label
	"editor.txtConditionAdded": "Condition ajoutée : {title}",
	"editor.txtConditionRemoved": "Condition supprimée : {condition}",
	"editor.txtConditionsAdded": "{count} conditions ajoutées",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} condition de diffusion} other {{count} conditions de diffusion}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {1 utilisateur avec accès spécial} other {{userCount} utilisateurs avec accès spécial}}", // num users with special access text
	"editor.btnCancel": "Annuler", // cancel button
	"editor.btnSave": "Enregistrer et fermer", // save and close button
	"editor.btnSaveMobile": "Enregistrer", // save and close button for mobile devices
	"editor.dueDate": "Date d’échéance", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "Date de fin", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "Date de début", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "Heure d’échéance", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "Heure de fin", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "Heure de début", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "Masqué", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "Aucune date d’échéance", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "Aucune date de fin", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "Aucune date de début", // Placeholder text for due date field when no due date is set
	"editor.visible": "Visible", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "La disponibilité commence le {startDate} et se termine le {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "La disponibilité commence le {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "Fin de disponibilité le {endDate}", // end only text
	"editor.txtAvailabilityNeither": "Toujours disponible", // always available text
	"editor.ungraded": "Non noté", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "Dans Notes", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "Introuvable dans Notes", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "Ajouter aux Notes", // Menu item for adding grade association
	"editor.addAGrade": "Ajouter une note", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "Supprimer des Notes", // Menu item for removing grade association
	"editor.setUngraded": "Réinitialiser à la valeur Non noté", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "Note sur", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "Des valeurs en points doivent être déterminées pour les activités dans Notes", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "La valeur de Note sur doit être supérieure ou égale à 0,01 et inférieure ou égale à 9 999 999 999", // Error message when an invalid score out of value is entered
	"editor.loading": "Chargement en cours...", // Message displayed while page is loading
	"editor.ok": "OK", // Text of dialog button to commit action
	"editor.cancel": "Annuler", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "Appuyez sur Alt-F10 pour accéder à la barre d’outils. Pour quitter cette barre d’outils, appuyez sur Échap.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "Choisir parmi les Notes", // Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "Grilles d’évaluation", //Header for the rubrics section
	"editor.startBeforeEndDate": "La date de début doit être antérieure à la date de fin",
	"editor.dueBetweenStartEndDate": "La date d’échéance doit être postérieure à la date de début et antérieure ou égale à la date de fin",
	"editor.dueAfterStartDate": "La date d’échéance doit être postérieure à la date de début",
	"editor.dueBeforeEndDate": "La date d’échéance doit être antérieure ou égale à la date de fin",
	"editor.createAndLinkToNewGradeItem": "Créer et associer à un nouvel élément de note", //Radio button text
	"editor.linkToExistingGradeItem": "Associer à un élément de note existant", //Radio button text
	"editor.points": "Points : {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "Aucun élément de note", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "Vous ne disposez pas des autorisations requises pour créer un élément de note", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "Objectifs d’apprentissage", //Text label for the competencies tool integration
	"editor.manageCompetencies": "Gérer les objectifs d’apprentissage", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1 associé} other {{count} associés}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "Aucun objet d\'apprentissage", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 objet d’apprentissage} other {{count} objets d’apprentissage}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 évaluation manquante} other {{count} évaluations manquantes}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "Fermer", //Label for Close button
	"editor.btnCloseDialog": "Fermer cette boîte de dialogue", // close dialog button
	"editor.btnManageSpecialAccess": "Gérer l’accès spécial", // manage special access button
	"editor.specialAccessRestrictedText": "Seuls les utilisateurs avec l’accès spécial peuvent voir ce dossier", // restricted special access description
	"editor.specialAccessNotRestrictedText": "Les utilisateurs peuvent soumettre des demandes en dehors des dates de disponibilité normales", // not restricted special access description
	"editor.specialAccessCount": "{count, plural, =1 {1 utilisateur} other {{count} utilisateurs}} avec accès spécial", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "Aucun utilisateur", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "Gérer l’accès spécial", // Dialog title
	"editor.specialAccessHidden": "Masqué par un accès spécial", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "Annuler les modifications ?", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "Voulez-vous vraiment annuler vos modifications ?", // Discard Changes User Prompt
	"editor.yesLabel": "Oui",
	"editor.noLabel": "Non",

	"rubrics.btnAddRubric": "Ajouter une grille d’évaluation", //text for add rubric button
	"rubrics.btnCreateNew": "Créer", //Text for create new dropdown
	"rubrics.btnAddExisting": "Ajouter un élément existant", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "Grilles d’évaluation", //Header for the rubrics section
	"rubrics.btnAttachRubric": "Joindre la grille d’évaluation", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "Annuler", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "Ajouter un élément existant", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "Aucune grille d’évaluation ajoutée", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 grille d’évaluation ajoutée} other {{count} grilles d’évaluation ajoutées}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "Supprimer la grille d’évaluation", // Text for deleting rubric icon
	"rubrics.btnClose": "Fermer", // X button for exiting the create new rubric overlay
	"rubrics.txtRubricAdded": "Grille d’évaluation ajoutée", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "Grille d’évaluation supprimée", // Text for notifying screenreader rubric was removed
	"rubrics.defaultScoringRubric": "Grille d’évaluation d’attribution de note par défaut", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "Aucune valeur par défaut sélectionnée", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "Points : {points}", // Text label for displaying points of a grade
	"grades.weight": "Pondération : {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "Élément de note", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.newGradeItemCategory": "Catégorie de note", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "Aucune catégorie", // Category dropdown text for not selecting a category

	"attachments.addGoogleDriveLink": "Joindre depuis Google Drive", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "Téléchargement du fichier", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "Joindre un lien Web", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "Joindre depuis OneDrive", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "Joindre un lien à une activité existante", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "Retour", // Text for a back button
	"attachments.closeDialog": "Fermer la boîte de dialogue", // ARIA text for button to close dialog
	"attachments.recordAudio": "Enregistrer un fichier audio", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "Enregistrer une vidéo", // Text for a button that opens a dialog to record video
	"attachments.save": "Enregistrer", // Text for a save button,
	"attachments.attach": "Joindre", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "Téléchargement du fichier", // Attach menu item text
	"attachments.addLinkMenu": "Lien Web", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "Activité existante", // Attach menu item text

	"content.name": "Nom", // Text label for name input field
	"content.emptyNameField": "Le nom est obligatoire", // Error text that appears below name field when it is left empty
	"content.description": "Description", // Text label for description input field
	"content.availabilityHeader": "Dates de disponibilité", // availability header
	"content.saveError": "Votre élément de contenu n’a pas été enregistré. Corrigez les champs indiqués en rouge.", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.addDueDate": "Ajouter la date d’échéance" // Text label for name input field
};
