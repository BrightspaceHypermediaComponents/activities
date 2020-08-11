/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "Edit Release Conditions", // edit release conditions button
	"editor.btnAddReleaseCondition": "Add Release Condition", // add release condition button
	"editor.btnCreateNew": "Create New", // create new button
	"editor.btnAddExisting": "Add Existing", // add existing button
	"editor.btnRemoveCondition": "Remove Condition", // remove condition button
	"editor.lblConditionsOperator": "To view this item, users must satisfy", // conditions operator label
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} release condition} other {{count} release conditions}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {1 user with special access} other {{userCount} users with special access}}", // num users with special access text
	"editor.btnCancel": "Cancel", // cancel button
	"editor.btnSave": "Save and Close", // save and close button
	"editor.btnSaveMobile": "Save", // save and close button for mobile devices
	"editor.dueDate": "Due Date", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "End Date", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "Start Date", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "Due Time", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "End Time", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "Start Time", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "Hidden", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "No due date", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "No end date", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "No start date", // Placeholder text for due date field when no due date is set
	"editor.visible": "Visible", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "Availability starts {startDate} and ends {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "Availability starts {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "Availability ends {endDate}", // end only text
	"editor.txtAvailabilityNeither": "Always available", // always available text
	"editor.ungraded": "Ungraded", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "In Grades", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "Not in Grades", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "Add to Grades", // Menu item for adding grade association
	"editor.addAGrade": "Add a Grade", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "Remove from Grades", // Menu item for removing grade association
	"editor.setUngraded": "Reset to Ungraded", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "Score Out Of", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "A points value must be specified for activities in Grades", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "Score Out Of must be greater than or equal to 0.01 and less than or equal to 9,999,999,999", // Error message when an invalid score out of value is entered
	"editor.loading": "Loading...", // Message displayed while page is loading
	"editor.ok": "OK", // Text of dialog button to commit action
	"editor.cancel": "Cancel", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "Press ALT-F10 for toolbar, and press ESC to exit toolbar once inside.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "Choose from Grades", // Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "Rubrics", //Header for the rubrics section
	"editor.startBeforeEndDate": "Start Date must be before End Date",
	"editor.dueBetweenStartEndDate": "Due Date must be after Start Date and before or equal to End Date",
	"editor.dueAfterStartDate": "Due Date must be after Start Date",
	"editor.dueBeforeEndDate": "Due Date must be before or equal to End Date",
	"editor.createAndLinkToNewGradeItem": "Create and link to a new grade item", //Radio button text
	"editor.linkToExistingGradeItem": "Link to an existing grade item", //Radio button text
	"editor.points": "Points: {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "No existing grade items", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "You do not have permission to create a new grade item", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "Learning Objectives", //Text label for the competencies tool integration
	"editor.manageCompetencies": "Manage Learning Objectives", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =0 {No learning objectives} =1 {1 attached} other {{count} attached}}", //Label for number of associated competencies
	"editor.competenciesCountSummary": "{count, plural, =0 {No learning objectives} =1 {1 learning objective} other {{count} learning objectives}}",
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 missing assessment} other {{count} missing assessments}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "Close", //Label for Close button
	"editor.btnCloseDialog": "Close this Dialog", // close dialog button
	"editor.btnManageSpecialAccess": "Manage Special Access", // manage special access button
	"editor.specialAccessRestrictedText": "Only users with special access can see this folder", // restricted special access description
	"editor.specialAccessNotRestrictedText": "Users can submit outside normal availability dates", // not restricted special access description
	"editor.specialAccessCount": "{count, plural, =0 {No users} =1 {1 user} other {{count} users}} with special access", // Label for number of special access users
	"editor.specialAccessDialogTitle": "Manage Special Access", // Dialog title
	"editor.specialAccessHidden": "Hidden by special access", // Warning label that the activity is restricted but is being hidden from all users by special access rules

	"rubrics.btnAddRubric": "Add rubric", //text for add rubric button
	"rubrics.btnCreateNew": "Create New", //Text for create new dropdown
	"rubrics.btnAddExisting": "Add Existing", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "Rubrics", //Header for the rubrics section
	"rubrics.btnAttachRubric": "Attach Rubric", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "Cancel", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "Add Existing", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "No rubric added", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 rubric added} other {{count} rubrics added}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "Delete Rubric", // Text for deleting rubric icon
	"rubrics.btnClose": "Close", // X button for exiting the create new rubric overlay
	"rubrics.txtRubricAdded": "Rubric added", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "Rubric removed", // Text for notifying screenreader rubric was removed
	"rubrics.defaultScoringRubric": "Default Scoring Rubric", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "No default selected", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "Points: {points}", // Text label for displaying points of a grade
	"grades.weight": "Weight: {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "Grade Item", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.newGradeItemCategory": "Grade Category", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "No Category", // Category dropdown text for not selecting a category

	"attachments.addGoogleDriveLink": "Attach from Google Drive", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "File Upload", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "Attach Weblink", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "Attach from OneDrive", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "Attach Link to Existing Activity", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "Back", // Text for a back button
	"attachments.closeDialog": "Close Dialog", // ARIA text for button to close dialog
	"attachments.recordAudio": "Record Audio", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "Record Video", // Text for a button that opens a dialog to record video
	"attachments.save": "Save", // Text for a save button,
	"attachments.attach": "Attach", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "File Upload", // Attach menu item text
	"attachments.addLinkMenu": "Weblink", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "Existing Activity" // Attach menu item text
};
