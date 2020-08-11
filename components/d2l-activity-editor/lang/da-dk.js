/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "Edit Release Conditions", // edit release conditions button
	"editor.btnAddReleaseCondition": "Tilføj betingelse for offentliggørelse", // add release condition button
	"editor.btnCreateNew": "Opret ny", // create new button
	"editor.btnAddExisting": "Tilføj eksisterende", // add existing button
	"editor.btnRemoveCondition": "Fjern betingelse", // remove condition button
	"editor.lblConditionsOperator": "For at få vist dette element skal brugerne opfylde", // conditions operator label
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} betingelse for offentliggørelse} other {{count} betingelser for offentliggørelse}}", // num release condition text
	"editor.btnCancel": "Annuller", // cancel button
	"editor.btnSave": "Gem og luk", // save and close button
	"editor.btnSaveMobile": "Gem", // save and close button for mobile devices
	"editor.dueDate": "Forfaldsdato", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "Slutdato", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "Startdato", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "Due Time", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "Sluttidspunkt", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "Starttidspunkt", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "Skjult", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "Ingen forfaldsdato", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "Ingen slutdato", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "Ingen startdato", // Placeholder text for due date field when no due date is set
	"editor.visible": "Synlig", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "Tilgængelighed starter d. {startDate} og slutter d. {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "Tilgængelighed starter d. {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "Ikke længere tilgængeligt d. {endDate}", // end only text
	"editor.txtAvailabilityNeither": "Altid tilgængelig", // always available text
	"editor.ungraded": "Ungraded", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "In Grades", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "Not in Grades", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "Føj til Karakterer", // Menu item for adding grade association
	"editor.addAGrade": "Tilføj en karakter", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "Remove from Grades", // Menu item for removing grade association
	"editor.setUngraded": "Nulstil til uden karakter", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "Score Out Of", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "A points value must be specified for activities in Grades", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "Score Out Of must be greater than or equal to 0.01 and less than or equal to 9,999,999,999", // Error message when an invalid score out of value is entered
	"editor.loading": "Indlæser...", // Message displayed while page is loading
	"editor.ok": "OK", // Text of dialog button to commit action
	"editor.cancel": "Annuller", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "Tryk på Alt-F10 for værktøjslinjen, og tryk på ESC for at afslutte værktøjslinjen, når du er inde.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "Vælg mellem karakterer", // Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "Rubrikker", //Header for the rubrics section
	"editor.startBeforeEndDate": "Startdato skal være før slutdato",
	"editor.dueBetweenStartEndDate": "Forfaldsdato skal være efter startdato og før eller lig med slutdato",
	"editor.dueAfterStartDate": "Forfaldsdato skal ligge efter startdato",
	"editor.dueBeforeEndDate": "Forfaldsdato skal være før eller lig med slutdato",
	"editor.createAndLinkToNewGradeItem": "Opret og link til et nyt karakterelement", //Radio button text
	"editor.linkToExistingGradeItem": "Link til et eksisterende karakterelement", //Radio button text
	"editor.points": "Point: {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "Ingen eksisterende karakterelementer", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "Du har ikke tilladelse til at oprette et nyt karakterelement", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "Undervisningsformål", //Text label for the competencies tool integration
	"editor.manageCompetencies": "Administrer undervisningsformål", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =0 {No learning objectives} =1 {1 attached} other {{count} attached}}", //Label for number of associated competencies
	"editor.competenciesCountSummary": "{count, plural, =0 {No learning objectives} =1 {1 learning objective} other {{count} learning objectives}}",
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 not being evaluated} other {{count} not being evaluated}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "Luk", //Label for Close button
	"editor.btnCloseDialog": "Luk denne dialogboks", // close dialog button

	"rubrics.btnAddRubric": "Tilføj rubrik", //text for add rubric button
	"rubrics.btnCreateNew": "Opret ny", //Text for create new dropdown
	"rubrics.btnAddExisting": "Tilføj eksisterende", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "Rubrikker", //Header for the rubrics section
	"rubrics.btnAttachRubric": "Vedhæft rubrik", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "Annuller", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "Tilføj eksisterende", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "Ingen rubrik tilføjet", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 rubrik tilføjet} other {{count} rubrikker tilføjet}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "Slet rubrik", // Text for deleting rubric icon
	"rubrics.btnClose": "Close", // X button for exiting the create new rubric overlay
	"rubrics.txtRubricAdded": "Rubric added", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "Rubric removed", // Text for notifying screenreader rubric was removed

	"grades.points": "Point: {points}", // Text label for displaying points of a grade
	"grades.weight": "Vægt: {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "Karakterelement", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.newGradeItemCategory": "Karakterkategori", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "Ingen kategori", // Category dropdown text for not selecting a category

	"attachments.addGoogleDriveLink": "Vedhæft fra Google Drev", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "Upload af fil", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "Vedhæft weblink", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "Vedhæft fra OneDrive", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "Vedhæft link til eksisterende aktivitet", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "Tilbage", // Text for a back button
	"attachments.closeDialog": "Luk dialogboks", // ARIA text for button to close dialog
	"attachments.recordAudio": "Record Audio", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "Record Video", // Text for a button that opens a dialog to record video
	"attachments.save": "Gem", // Text for a save button,
	"attachments.attach": "Vedhæft", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drev", // Attach menu item text
	"attachments.addFileMenu": "Upload af fil", // Attach menu item text
	"attachments.addLinkMenu": "Weblink", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "Eksisterende aktivitet", // Attach menu item text
};