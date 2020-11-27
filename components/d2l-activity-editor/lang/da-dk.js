/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "Rediger betingelser for offentliggørelse", // edit release conditions button
	"editor.btnAddReleaseCondition": "Tilføj betingelse for offentliggørelse", // add release condition button
	"editor.btnCreateNew": "Opret ny", // create new button
	"editor.btnAddExisting": "Tilføj eksisterende", // add existing button
	"editor.btnRemoveCondition": "Fjern betingelse", // remove condition button
	"editor.lblConditionsOperator": "For at få vist dette element skal brugerne opfylde", // conditions operator label
	"editor.txtConditionAdded": "Tilføjet betingelse: {title}",
	"editor.txtConditionRemoved": "Fjernet betingelse, {title}",
	"editor.txtConditionsAdded": "Tilføjede {count} betingelser",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} betingelse for offentliggørelse} other {{count} betingelser for offentliggørelse}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {1 bruger med særlig adgang} other {{userCount} brugere med særlig adgang}}", // num users with special access text
	"editor.btnCancel": "Annuller", // cancel button
	"editor.btnSave": "Gem og luk", // save and close button
	"editor.btnSaveMobile": "Gem", // save and close button for mobile devices
	"editor.dueDate": "Forfaldsdato", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "Slutdato", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "Startdato", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "Forfaldstidspunkt", // ARIA label for the due time field when creating/editing an activity
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
	"editor.ungraded": "Uden karakter", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "I Karakterer", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "Ikke i Karakterer", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "Føj til Karakterer", // Menu item for adding grade association
	"editor.addAGrade": "Tilføj en karakter", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "Fjern fra Karakterer", // Menu item for removing grade association
	"editor.setUngraded": "Nulstil til uden karakter", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "Score ud af", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "Der skal angives en pointværdi for aktiviteter i Karakterer", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "\"Score ud af\" skal være større end eller lig med 0,01 og mindre end eller lig med 9.999.999.999", // Error message when an invalid score out of value is entered
	"editor.loading": "Indlæser ...", // Message displayed while page is loading
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
	"editor.competenciesCount": "{count, plural, =1 {1 attached} other {{count} attached}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "Ingen undervisningsformål", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 learning objective} other {{count} learning objectives}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 manglende vurdering} other {{count} manglende vurderinger}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "Luk", //Label for Close button
	"editor.btnCloseDialog": "Luk denne dialogboks", // close dialog button
	"editor.btnManageSpecialAccess": "Administrer særlig adgang", // manage special access button
	"editor.specialAccessRestrictedText": "Kun brugere med særlig adgang kan se denne mappe", // restricted special access description
	"editor.specialAccessNotRestrictedText": "Brugere kan aflevere uden for datoer for normal tilgængelighed", // not restricted special access description
	"editor.specialAccessCount": "{count, plural, =1 {1 bruger} other {{count} brugere}} med særlig adgang", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "Ingen brugere", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "Administrer særlig adgang", // Dialog title
	"editor.specialAccessHidden": "Skjult af særlig adgang", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "Slet ændringer?", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "Er du sikker på, at du vil slette dine ændringer?", // Discard Changes User Prompt
	"editor.yesLabel": "Ja",
	"editor.noLabel": "Nej",

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
	"rubrics.btnClose": "Luk", // X button for exiting the create new rubric overlay
	"rubrics.txtRubricAdded": "Rubrik tilføjet", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "Rubrik fjernet", // Text for notifying screenreader rubric was removed
	"rubrics.defaultScoringRubric": "Standardscoringsrubrik", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "Ingen standard valgt", // option in default scoring rubric when no default scoring rubric selected

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
	"attachments.recordAudio": "Optag lyd", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "Optag video", // Text for a button that opens a dialog to record video
	"attachments.save": "Gem", // Text for a save button,
	"attachments.attach": "Vedhæft", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drev", // Attach menu item text
	"attachments.addFileMenu": "Upload af fil", // Attach menu item text
	"attachments.addLinkMenu": "Weblink", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "Eksisterende aktivitet", // Attach menu item text

	"content.name": "Navn", // Text label for name input field
	"content.emptyNameField": "Navn påkrævet", // Error text that appears below name field when it is left empty
	"content.description": "Beskrivelse", // Text label for description input field
	"content.availabilityHeader": "Datoer for tilgængelighed", // availability header
	"content.saveError": "Dit indholdselement blev ikke gemt. Ret de felter, der er markeret med rødt.", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.addDueDate": "Tilføj forfaldsdato" // Text label for name input field
};
