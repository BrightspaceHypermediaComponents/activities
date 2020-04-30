/* eslint quotes: 0 */

export default {
	"btnEditReleaseConditions": "Releasevoorwaarden bewerken", // edit release conditions button
	"btnAddReleaseCondition": "Releasevoorwaarde toevoegen", // add release condition button
	"btnCreateNew": "Nieuwe maken", // create new button
	"btnAddExisting": "Bestaand toevoegen", // add existing button
	"btnRemoveCondition": "Voorwaarde verwijderen", // remove condition button
	"lblConditionsOperator": "Om dit item te bekijken, moeten gebruikers voldoen aan", // conditions operator label
	"txtNumReleaseConditions": "{count, plural, =1 {{count} Release Condition} other {{count} Release Conditions}}", // num release condition text
	"btnCancel": "Annuleren", // cancel button
	"btnSave": "Opslaan", // save and close button
	"dueDate": "Uiterste datum", // ARIA label for the due date field when creating/editing an activity
	"endDate": "Einddatum", // ARIA label for the end date field when creating/editing an activity
	"startDate": "Startdatum", // ARIA label for the start date field when creating/editing an activity
	"dueTime": "Uiterste datum", // ARIA label for the due time field when creating/editing an activity
	"endTime": "Eindtijd", // ARIA label for the end time field when creating/editing an activity
	"startTime": "Starttijd", // ARIA label for the start time field when creating/editing an activity
	"hidden": "Verborgen", // Label displayed with the visibility switch when hidden
	"ariaHidden": "Verborgen voor cursisten", // Aria Label for the visibility switch when hidden
	"noDueDate": "Geen uiterste datum", // Placeholder text for due date field when no due date is set
	"noEndDate": "Geen einddatum", // Placeholder text for due date field when no due date is set
	"noStartDate": "Geen startdatum", // Placeholder text for due date field when no due date is set
	"visible": "Zichtbaar", // Label displayed with the visibility switch when visible
	"ariaVisible": "Zichtbaar voor studenten", // Aria Label for the visibility switch when visible
	"txtAvailabilityStartAndEnd": "Beschikbaarheid begint op {startDate} en eindigt op {endDate}", // start/end text
	"txtAvailabilityStartOnly": "Beschikbaarheid begint op {startDate}", // start only text
	"txtAvailabilityEndOnly": "Beschikbaarheid eindigt op {endDate}", // end only text
	"txtAvailabilityNeither": "Altijd beschikbaar", // always available text
	"ungraded": "Zonder score", // State of score field when there is no score and no grade item, when creating/editing an activity
	"inGrades": "In Scores", // State of the grades field when there is a score, and an associated grade item
	"notInGrades": "Niet in Scores", // State of the grades field when there is a score, but no associated grade item
	"addToGrades": "Toevoegen aan Scores", // Menu item for adding grade association
	"removeFromGrades": "Verwijderen uit Scores", // Menu item for removing grade association
	"setUngraded": "Terugzetten naar Onbeoordeeld", // Menu item for setting the activity to ungraded
	"scoreOutOf": "Score uit", // ARIA label for the score out of field, when creating/editing an activity
	"emptyScoreOutOfError": "Er moet een puntenwaarde zijn opgegeven in Scores", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"invalidScoreOutOfError": "Score uit moet groter zijn dan of gelijk aan 0,01 en kleiner dan of gelijk aan 9.999.999.999", // Error message when an invalid score out of value is entered
	"loading": "Laden...", // Message displayed while page is loading
	"ok": "OK", // Text of dialog button to commit action
	"cancel": "Annuleren", // Text of dialog button to cancel action
	"ariaToolbarShortcutInstructions": "Druk op ALT+F10 om de taakbalk te tonen en druk op Esc om de taakbalk vervolgens te sluiten.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"chooseFromGrades": "Uit scores kiezen", // Link text and dialog title for the edit grades dialog,
	"hdrRubrics": "Rubrics", //Header for the rubrics section
	"startBeforeEndDate": "Startdatum moet eerder zijn dan einddatum",
	"dueBetweenStartEndDate": "Uiterste datum moet later zijn dan startdatum en eerder of tegelijk zijn met einddatum",
	"dueAfterStartDate": "Uiterste datum moet later zijn dan startdatum",
	"dueBeforeEndDate": "Uiterste datum moet eerder of tegelijk zijn met einddatum",
	"createAndLinkToNewGradeItem": "Maak een nieuw score-onderdeel en link ernaar", //Radio button text
	"linkToExistingGradeItem": "Koppeling naar bestaand score-onderdeel", //Radio button text
	"points": "Punten: {points}", // Text label for displaying points of a grade
	"noGradeItems": "No existing Grade Items exist to be linked", // Reason why existing grade items cannot be linked in the choose grades dialog
	"noGradeCreatePermission": "You do not have permission to create a new grade item" // Reason why a new grade items cannot be created in the choose grades dialog
};
