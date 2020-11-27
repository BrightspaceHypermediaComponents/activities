/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "Releasevoorwaarden bewerken", // edit release conditions button
	"editor.btnAddReleaseCondition": "Releasevoorwaarde toevoegen", // add release condition button
	"editor.btnCreateNew": "Nieuwe maken", // create new button
	"editor.btnAddExisting": "Bestaand toevoegen", // add existing button
	"editor.btnRemoveCondition": "Voorwaarde verwijderen", // remove condition button
	"editor.lblConditionsOperator": "Om dit item te bekijken, moeten gebruikers voldoen aan", // conditions operator label
	"editor.txtConditionAdded": "Toegevoegde voorwaarde: {title}",
	"editor.txtConditionRemoved": "Verwijderde voorwaarde: {condition}",
	"editor.txtConditionsAdded": "Toegevoegde {count} voorwaarden",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} releasevoorwaarde} other {{count} releasevoorwaarden}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {1 gebruiker met speciale toegang} other {{userCount} gebruikers met speciale toegang}}", // num users with special access text
	"editor.btnCancel": "Annuleren", // cancel button
	"editor.btnSave": "Opslaan en sluiten", // save and close button
	"editor.btnSaveMobile": "Opslaan", // save and close button for mobile devices
	"editor.dueDate": "Uiterste datum", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "Einddatum", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "Startdatum", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "Uiterste tijdstip", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "Eindtijd", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "Starttijd", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "Verborgen", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "Geen uiterste datum", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "Geen einddatum", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "Geen startdatum", // Placeholder text for due date field when no due date is set
	"editor.visible": "Zichtbaar", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "Beschikbaarheid begint op {startDate} en eindigt op {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "Beschikbaarheid begint op {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "Beschikbaarheid eindigt op {endDate}", // end only text
	"editor.txtAvailabilityNeither": "Altijd beschikbaar", // always available text
	"editor.ungraded": "Zonder score", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "In Scores", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "Niet in Scores", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "Toevoegen aan Scores", // Menu item for adding grade association
	"editor.addAGrade": "Een score toevoegen", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "Verwijderen uit Scores", // Menu item for removing grade association
	"editor.setUngraded": "Terugzetten naar Onbeoordeeld", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "Score uit", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "Er moet een puntenwaarde zijn opgegeven in Scores", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "Score uit moet groter zijn dan of gelijk aan 0,01 en kleiner dan of gelijk aan 9.999.999.999", // Error message when an invalid score out of value is entered
	"editor.loading": "Laden...", // Message displayed while page is loading
	"editor.ok": "OK", // Text of dialog button to commit action
	"editor.cancel": "Annuleren", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "Druk op ALT+F10 om de taakbalk te tonen en druk op Esc om de taakbalk vervolgens te sluiten.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "Uit scores kiezen", // Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "Rubrics", //Header for the rubrics section
	"editor.startBeforeEndDate": "Startdatum moet eerder zijn dan einddatum",
	"editor.dueBetweenStartEndDate": "Uiterste datum moet later zijn dan startdatum en eerder zijn dan of tegelijk zijn met einddatum",
	"editor.dueAfterStartDate": "Uiterste datum moet later zijn dan startdatum",
	"editor.dueBeforeEndDate": "Uiterste datum moet eerder zijn dan of tegelijk zijn met einddatum",
	"editor.createAndLinkToNewGradeItem": "Een nieuw score-onderdeel maken en ernaar koppelen", //Radio button text
	"editor.linkToExistingGradeItem": "Koppelen naar een bestaand score-onderdeel", //Radio button text
	"editor.points": "Punten: {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "Geen bestaande score-onderdelen", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "U bent niet gemachtigd om een nieuw score-onderdeel te maken", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "Leerdoelen", //Text label for the competencies tool integration
	"editor.manageCompetencies": "Leerdoelen beheren", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1 toegevoegd} andere {{count} toegevoegd}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "Geen leerdoelen", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 leerdoel} other {{count} leerdoelen}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 ontbrekende evaluatie} other {{count} ontbrekende evaluaties}}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "Sluiten", //Label for Close button
	"editor.btnCloseDialog": "Dit dialoogvenster sluiten", // close dialog button
	"editor.btnManageSpecialAccess": "Speciale toegang beheren", // manage special access button
	"editor.specialAccessRestrictedText": "Alleen gebruikers met speciale toegang kunnen deze map zien", // restricted special access description
	"editor.specialAccessNotRestrictedText": "Gebruikers kunnen antwoorden buiten de normale beschikbaarheidsdatums indienen", // not restricted special access description
	"editor.specialAccessCount": "{count, plural, =1 {1 gebruiker} other {{count} gebruikers}} met speciale toegang", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "Geen gebruikers", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "Speciale toegang beheren", // Dialog title
	"editor.specialAccessHidden": "Verborgen door speciale toegang", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "Wijzigingen verwijderen?", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "Weet u zeker dat u uw wijzigingen wilt verwijderen?", // Discard Changes User Prompt
	"editor.yesLabel": "Ja",
	"editor.noLabel": "Nee",

	"rubrics.btnAddRubric": "Rubric toevoegen", //text for add rubric button
	"rubrics.btnCreateNew": "Nieuwe maken", //Text for create new dropdown
	"rubrics.btnAddExisting": "Bestaand toevoegen", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "Rubrics", //Header for the rubrics section
	"rubrics.btnAttachRubric": "Rubric bijvoegen", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "Annuleren", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "Bestaand toevoegen", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "Geen rubric toegevoegd", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 rubric toegevoegd} other {{count} rubrics toegevoegd}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "Rubric verwijderen", // Text for deleting rubric icon
	"rubrics.btnClose": "Sluiten", // X button for exiting the create new rubric overlay
	"rubrics.txtRubricAdded": "Rubric toegevoegd", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "Rubric verwijderd", // Text for notifying screenreader rubric was removed
	"rubrics.defaultScoringRubric": "Standaardscorerubric", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "Geen standaard geselecteerd", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "Punten: {points}", // Text label for displaying points of a grade
	"grades.weight": "Zwaarte: {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "Score-onderdeel", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.newGradeItemCategory": "Scorecategorie", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "Geen categorie", // Category dropdown text for not selecting a category

	"attachments.addGoogleDriveLink": "Toevoegen vanuit Google Drive", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "Bestand uploaden", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "Koppeling toevoegen", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "Toevoegen vanuit OneDrive", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "Koppeling toevoegen aan bestaande activiteit", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "Terug", // Text for a back button
	"attachments.closeDialog": "Dialoogvenster sluiten", // ARIA text for button to close dialog
	"attachments.recordAudio": "Audio opnemen", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "Video opnemen", // Text for a button that opens a dialog to record video
	"attachments.save": "Opslaan", // Text for a save button,
	"attachments.attach": "Toevoegen", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "Bestand uploaden", // Attach menu item text
	"attachments.addLinkMenu": "Koppeling", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "Bestaande activiteit", // Attach menu item text

	"content.name": "Naam", // Text label for name input field
	"content.emptyNameField": "Naam is vereist", // Error text that appears below name field when it is left empty
	"content.description": "Beschrijving", // Text label for description input field
	"content.availabilityHeader": "Beschikbare data", // availability header
	"content.saveError": "Uw inhoudsitem is niet opgeslagen. Corrigeer de rood omlijnde velden.", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.addDueDate": "Uiterste datum toevoegen" // Text label for name input field
};
