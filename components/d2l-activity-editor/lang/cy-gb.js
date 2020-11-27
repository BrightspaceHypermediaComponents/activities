/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "Golygu Amodau Rhyddhau", // edit release conditions button
	"editor.btnAddReleaseCondition": "Ychwanegu Amod Rhyddhau", // add release condition button
	"editor.btnCreateNew": "Creu Un Newydd", // create new button
	"editor.btnAddExisting": "Ychwanegu’r Presennol", // add existing button
	"editor.btnRemoveCondition": "Tynnu’r Amod", // remove condition button
	"editor.lblConditionsOperator": "I weld yr eitem hon, rhaid i ddefnyddwyr fodloni", // conditions operator label
	"editor.txtConditionAdded": "Amod a ychwanegwyd: {title}",
	"editor.txtConditionRemoved": "Amod a dynnwyd: {condition}",
	"editor.txtConditionsAdded": "Ychwanegwyd {count} amod",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} amod rhyddhau} other {{count} amod rhyddhau}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {1 user with special access} other {{userCount} users with special access}}", // num users with special access text
	"editor.btnCancel": "Canslo", // cancel button
	"editor.btnSave": "Cadw a Chau", // save and close button
	"editor.btnSaveMobile": "Cadw", // save and close button for mobile devices
	"editor.dueDate": "Dyddiad Cyflwyno", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "Dyddiad dod i ben", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "Dyddiad Dechrau", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "Amser Cyflwyno", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "Amser Gorffen", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "Amser Dechrau", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "Cudd", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "Dim dyddiad cyflwyno", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "Dim dyddiad dod i ben", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "Dim dyddiad dechrau", // Placeholder text for due date field when no due date is set
	"editor.visible": "Gweladwy", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "Argaeledd yn dechrau {startDate} ac yn dod i ben {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "Argaeledd yn dechrau {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "Argaeledd yn dod i ben {endDate}", // end only text
	"editor.txtAvailabilityNeither": "Ar gael bob amser", // always available text
	"editor.ungraded": "Heb eu graddio", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "Yn Graddau", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "Dim yn Graddau", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "Ychwanegu at Graddau", // Menu item for adding grade association
	"editor.addAGrade": "Ychwanegu Gradd", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "Tynnu o Graddau", // Menu item for removing grade association
	"editor.setUngraded": "Ailosod i Heb eu graddio", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "Sgôr Allan O", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "Rhaid nodi gwerth pwyntiau ar gyfer gweithgareddau yn Graddau", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "Rhaid i’r Sgôr Allan O fod yn fwy na neu’n hafal i 0.01 ac yn llai na neu’n hafal i 9,999,999,999.", // Error message when an invalid score out of value is entered
	"editor.loading": "Wrthi\'n llwytho...", // Message displayed while page is loading
	"editor.ok": "Iawn", // Text of dialog button to commit action
	"editor.cancel": "Canslo", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "Pwyswch ALT-F10 i weld y bar offer, a phwyswch ESC i adael y bar offer pan fyddwch i mewn.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "Dewis o Graddau", // Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "Cyfeirebau", //Header for the rubrics section
	"editor.startBeforeEndDate": "Rhaid i\'r Dyddiad Dechrau fod cyn y Dyddiad Dod i Ben.",
	"editor.dueBetweenStartEndDate": "Rhaid i’r Dyddiad Cyflwyno fod ar ôl y Dyddiad Dechrau a cyn neu’r un peth â’r Dyddiad Dod i Ben",
	"editor.dueAfterStartDate": "Rhaid i’r Dyddiad Cyflwyno fod ar ôl y Dyddiad Dechrau",
	"editor.dueBeforeEndDate": "Rhaid i’r Dyddiad Cyflwyno fod cyn neu’r un peth â’r Dyddiad Dod i Ben",
	"editor.createAndLinkToNewGradeItem": "Creu a chysylltu ag eitem gradd newydd", //Radio button text
	"editor.linkToExistingGradeItem": "Cysylltu ag eitem gradd sydd eisoes yn bodoli", //Radio button text
	"editor.points": "Pwyntiau: {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "Dim eitemau gradd sydd eisoes yn bodoli", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "Nid oes gennych ganiatâd i greu eitem gradd newydd", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "Amcanion Dysgu", //Text label for the competencies tool integration
	"editor.manageCompetencies": "Rheoli Amcanion Dysgu", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1 wedi’i atodi} other {{count} wedi’u hatodi}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "Dim amcanion dysgu", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 amcan dysgu} other {{count} amcan dysgu}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 missing assessment} other {{count} missing assessments}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "Cau", //Label for Close button
	"editor.btnCloseDialog": "Caewch y Ddeialog hon", // close dialog button
	"editor.btnManageSpecialAccess": "Rheoli Mynediad Arbennig", // manage special access button
	"editor.specialAccessRestrictedText": "Defnyddwyr â mynediad arbennig yn unig gall gweld y ffolder hwn", // restricted special access description
	"editor.specialAccessNotRestrictedText": "Gall defnyddwyr gyflwyno y tu allan i’r dyddiadau argaeledd arferol", // not restricted special access description
	"editor.specialAccessCount": "{count, plural, =1 {1 user} other {{count} users}} â mynediad arbennig", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "Dim Defnyddwyr", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "Rheoli Mynediad Arbennig", // Dialog title
	"editor.specialAccessHidden": "Cudd gan fynediad arbennig", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "Dileu newidiadau?", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "Ydych chi\'n siŵr eich bod chi eisiau dileu\'ch newidiadau?", // Discard Changes User Prompt
	"editor.yesLabel": "Ie",
	"editor.noLabel": "Na",

	"rubrics.btnAddRubric": "Ychwanegu cyfeireb", //text for add rubric button
	"rubrics.btnCreateNew": "Creu Un Newydd", //Text for create new dropdown
	"rubrics.btnAddExisting": "Ychwanegu’r Presennol", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "Cyfeirebau", //Header for the rubrics section
	"rubrics.btnAttachRubric": "Atodi Cyfeireb", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "Canslo", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "Ychwanegu’r Presennol", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "Dim cyfeireb wedi’i hychwanegu", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 rubric added} arall {{count} rubrics added}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "Dileu Cyfeireb", // Text for deleting rubric icon
	"rubrics.btnClose": "Cau", // X button for exiting the create new rubric overlay
	"rubrics.txtRubricAdded": "Wedi ychwanegu cyfeireb", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "Wedi tynnu cyfeireb", // Text for notifying screenreader rubric was removed
	"rubrics.defaultScoringRubric": "Cyfeireb Sgorio Ddiofyn", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "Ni ddewiswyd modd diofyn", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "Pwyntiau: {points}", // Text label for displaying points of a grade
	"grades.weight": "Pwysau: {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "Eitem Gradd", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.newGradeItemCategory": "Categori Gradd", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "Dim Categori", // Category dropdown text for not selecting a category

	"attachments.addGoogleDriveLink": "Atodi o Google Drive", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "Lanlwytho Ffeil", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "Atodi Dolen We", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "Atodi o OneDrive", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "Atodi Dolen i Weithgaredd sy’n Bodoli Eisoes", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "Yn ôl", // Text for a back button
	"attachments.closeDialog": "Cau’r Dialog", // ARIA text for button to close dialog
	"attachments.recordAudio": "Recordio Sain", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "Recordio Fideo", // Text for a button that opens a dialog to record video
	"attachments.save": "Cadw", // Text for a save button,
	"attachments.attach": "Atodi", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "Lanlwytho Ffeil", // Attach menu item text
	"attachments.addLinkMenu": "Dolen We", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "Gweithgaredd Presennol", // Attach menu item text

	"content.name": "Enw", // Text label for name input field
	"content.emptyNameField": "Mae angen enw", // Error text that appears below name field when it is left empty
	"content.description": "Disgrifiad", // Text label for description input field
	"content.availabilityHeader": "Dyddiadau Argaeledd", // availability header
	"content.saveError": "Ni chadwyd eich eitem cynnwys. Cywirwch y meysydd a amlinellir mewn coch.", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.addDueDate": "Ychwanegu Dyddiad Cyflwyno" // Text label for name input field
};
