/* eslint quotes: 0 */

export default {
	"btnEditReleaseConditions": "Edit Release Conditions", // edit release conditions button
	"btnAddReleaseCondition": "Add Release Condition", // add release condition button
	"btnCreateNew": "Create New", // create new button
	"btnAddExisting": "Add Existing", // add existing button
	"btnRemoveCondition": "Remove Condition", // remove condition button
	"lblConditionsOperator": "To view this item, users must satisfy", // conditions operator label
	"txtNumReleaseConditions": "{count, plural, =1 {{count} release condition} other {{count} release conditions}}", // num release condition text
	"txtNumSpecialAccess": "{userCount, plural, =1 {1 user with special access} other {{userCount} users with special access}}", // num users with special access text
	"btnCancel": "Cancel", // cancel button
	"btnSave": "Save and Close", // save and close button
	"btnSaveMobile": "Save", // save and close button for mobile devices
	"dueDate": "Due Date", // ARIA label for the due date field when creating/editing an activity
	"endDate": "End Date", // ARIA label for the end date field when creating/editing an activity
	"startDate": "Start Date", // ARIA label for the start date field when creating/editing an activity
	"dueTime": "Due Time", // ARIA label for the due time field when creating/editing an activity
	"endTime": "End Time", // ARIA label for the end time field when creating/editing an activity
	"startTime": "Start Time", // ARIA label for the start time field when creating/editing an activity
	"hidden": "Hidden", // Label displayed with the visibility switch when hidden
	"noDueDate": "No due date", // Placeholder text for due date field when no due date is set
	"noEndDate": "No end date", // Placeholder text for due date field when no due date is set
	"noStartDate": "No start date", // Placeholder text for due date field when no due date is set
	"visible": "Visible", // Label displayed with the visibility switch when visible
	"txtAvailabilityStartAndEnd": "Availability starts {startDate} and ends {endDate}", // start/end text
	"txtAvailabilityStartOnly": "Availability starts {startDate}", // start only text
	"txtAvailabilityEndOnly": "Availability ends {endDate}", // end only text
	"txtAvailabilityNeither": "Always available", // always available text
	"ungraded": "Ungraded", // State of score field when there is no score and no grade item, when creating/editing an activity
	"inGrades": "In Grades", // State of the grades field when there is a score, and an associated grade item
	"notInGrades": "Not in Grades", // State of the grades field when there is a score, but no associated grade item
	"addToGrades": "Add to Grades", // Menu item for adding grade association
	"addAGrade": "Add a Grade", //ARIA label to add a grade to the activity
	"removeFromGrades": "Remove from Grades", // Menu item for removing grade association
	"setUngraded": "Reset to Ungraded", // Menu item for setting the activity to ungraded
	"scoreOutOf": "Score Out Of", // ARIA label for the score out of field, when creating/editing an activity
	"emptyScoreOutOfError": "A points value must be specified for activities in Grades", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"invalidScoreOutOfError": "Score Out Of must be greater than or equal to 0.01 and less than or equal to 9,999,999,999", // Error message when an invalid score out of value is entered
	"loading": "Loading...", // Message displayed while page is loading
	"ok": "OK", // Text of dialog button to commit action
	"cancel": "Cancel", // Text of dialog button to cancel action
	"ariaToolbarShortcutInstructions": "Press ALT-F10 for toolbar, and press ESC to exit toolbar once inside.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"chooseFromGrades": "Choose from Grades", // Link text and dialog title for the edit grades dialog,
	"hdrRubrics": "Rubrics", //Header for the rubrics section
	"startBeforeEndDate": "Start Date must be before End Date",
	"dueBetweenStartEndDate": "Due Date must be after Start Date and before or equal to End Date",
	"dueAfterStartDate": "Due Date must be after Start Date",
	"dueBeforeEndDate": "Due Date must be before or equal to End Date",
	"createAndLinkToNewGradeItem": "Create and link to a new grade item", //Radio button text
	"linkToExistingGradeItem": "Link to an existing grade item", //Radio button text
	"points": "Points: {points}", // Text label for displaying points of a grade
	"noGradeItems": "No existing grade items", // Reason why existing grade items cannot be linked in the choose grades dialog
	"noGradeCreatePermission": "You do not have permission to create a new grade item", // Reason why a new grade items cannot be created in the choose grades dialog
	"competencies": "Learning Objectives", //Text label for the competencies tool integration
	"manageCompetencies": "Manage Learning Objectives", //Button text to launch competencies tool dialog
	"competenciesCount": "{count, plural, =0 {No learning objectives} =1 {1 attached} other {{count} attached}}", //Label for number of associated competencies
	"competenciesCountSummary": "{count, plural, =0 {No learning objectives} =1 {1 learning objective} other {{count} learning objectives}}",
	"unevaluatedCompetencies": "{count, plural, =1 {1 missing assessment} other {{count} missing assessments}}", //Label for number of unevalated associated competencies
	"btnClose": "Close", //Label for Close button
	"btnCloseDialog": "Close this Dialog", // close dialog button
	"btnManageSpecialAccess": "Manage Special Access", // manage special access button
	"specialAccessRestrictedText": "Only users with special access can see this folder", // restricted special access description
	"specialAccessNotRestrictedText": "Users can submit outside normal availability dates", // not restricted special access description
	"specialAccessCount": "{count, plural, =1 {1 user} other {{count} users}} with special access", // Label for number of special access users
	"specialAccessDialogTitle": "Manage Special Access" // Dialog title
};
