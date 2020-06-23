/* eslint quotes: 0 */

export default {
	"btnEditReleaseConditions": "Freigabebedingungen bearbeiten", // edit release conditions button
	"btnAddReleaseCondition": "Freigabebedingungen hinzufügen", // add release condition button
	"btnCreateNew": "Neu erstellen", // create new button
	"btnAddExisting": "Vorhandene hinzufügen", // add existing button
	"btnRemoveCondition": "Bedingung entfernen", // remove condition button
	"lblConditionsOperator": "Für die Ansicht dieses Elements müssen Benutzer Folgendes erfüllen:", // conditions operator label
	"txtNumReleaseConditions": "{count, plural, =1 {{count} Freigabebedingung} other {{count} Freigabebedingungen}}", // num release condition text
	"btnCancel": "Abbrechen", // cancel button
	"btnSave": "Speichern und schließen", // save and close button
	"btnSaveMobile": "Speichern", // save and close button for mobile devices
	"dueDate": "Abgabetermin", // ARIA label for the due date field when creating/editing an activity
	"endDate": "Enddatum", // ARIA label for the end date field when creating/editing an activity
	"startDate": "Startdatum", // ARIA label for the start date field when creating/editing an activity
	"dueTime": "Fälligkeit", // ARIA label for the due time field when creating/editing an activity
	"endTime": "Endzeit", // ARIA label for the end time field when creating/editing an activity
	"startTime": "Startzeit", // ARIA label for the start time field when creating/editing an activity
	"hidden": "Ausgeblendet", // Label displayed with the visibility switch when hidden
	"noDueDate": "Kein Abgabetermin", // Placeholder text for due date field when no due date is set
	"noEndDate": "Kein Enddatum", // Placeholder text for due date field when no due date is set
	"noStartDate": "Kein Startdatum", // Placeholder text for due date field when no due date is set
	"visible": "Sichtbar", // Label displayed with the visibility switch when visible
	"txtAvailabilityStartAndEnd": "Verfügbarkeit beginnt am {StartDate} und endet am {EndDate}", // start/end text
	"txtAvailabilityStartOnly": "Verfügbarkeit beginnt am {StartDate}", // start only text
	"txtAvailabilityEndOnly": "Verfügbarkeit endet am {EndDate}", // end only text
	"txtAvailabilityNeither": "Immer verfügbar", // always available text
	"ungraded": "Nicht bewertet", // State of score field when there is no score and no grade item, when creating/editing an activity
	"inGrades": "In Noten", // State of the grades field when there is a score, and an associated grade item
	"notInGrades": "Nicht in Noten", // State of the grades field when there is a score, but no associated grade item
	"addToGrades": "Zu Noten hinzufügen", // Menu item for adding grade association
	"addAGrade": "Eine Note hinzufügen", //ARIA label to add a grade to the activity
	"removeFromGrades": "Aus Noten entfernen", // Menu item for removing grade association
	"setUngraded": "Auf unbenotet zurücksetzen", // Menu item for setting the activity to ungraded
	"scoreOutOf": "Punktzahl von", // ARIA label for the score out of field, when creating/editing an activity
	"emptyScoreOutOfError": "In Noten muss ein Wert für Aktivitäten eingetragen werden", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"invalidScoreOutOfError": "Die „Punktzahl von“ muss größer oder gleich 0,01 und kleiner oder gleich 9.999.999.999 sein.", // Error message when an invalid score out of value is entered
	"loading": "Laden...", // Message displayed while page is loading
	"ok": "OK", // Text of dialog button to commit action
	"cancel": "Abbrechen", // Text of dialog button to cancel action
	"ariaToolbarShortcutInstructions": "Drücken Sie ALT-F10, um die Symbolleiste zu öffnen, und drücken Sie die ESC-Taste, um die Symbolleiste wieder zu schließen.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"chooseFromGrades": "Wählen Sie aus den Noten", // Link text and dialog title for the edit grades dialog,
	"hdrRubrics": "Bewertungsschemas", //Header for the rubrics section
	"startBeforeEndDate": "Das Startdatum muss vor dem Enddatum liegen.",
	"dueBetweenStartEndDate": "Das Abgabedatum muss nach dem Startdatum und vor oder gleich dem Enddatum sein",
	"dueAfterStartDate": "Der Abgabetermin muss nach dem Startdatum liegen.",
	"dueBeforeEndDate": "Der Abgabetermin muss vor oder gleich dem Enddatum sein",
	"createAndLinkToNewGradeItem": "Erstellen und mit einem neuen Benotungsgegenstand verknüpfen", //Radio button text
	"linkToExistingGradeItem": "Verknüpfung mit einem vorhandenen Benotungsgegenstand", //Radio button text
	"points": "{points} Punkte", // Text label for displaying points of a grade
	"noGradeItems": "Keine vorhandenen Benotungsgegenstände", // Reason why existing grade items cannot be linked in the choose grades dialog
	"noGradeCreatePermission": "Sie haben keine Berechtigung, einen neuen Benotungsgegenstand zu erstellen.", // Reason why a new grade items cannot be created in the choose grades dialog
	"competencies": "Lernziele", //Text label for the competencies tool integration
	"manageCompetencies": "Lernziele verwalten", //Button text to launch competencies tool dialog
	"competenciesCount": "{count, plural, =0 {No learning objectives} =1 {1 attached} other {{count} attached}}", //Label for number of associated competencies
	"competenciesCountSummary": "{count, plural, =0 {Keine Lernziele} =1 {1 Lernziel} andere {{count} Lernziele}}",
	"unevaluatedCompetencies": "{count, plural, =1 {1 not being evaluated} other {{count} not being evaluated}}", //Label for number of unevalated associated competencies
	"btnClose": "Schließen", //Label for Close button
	"btnCloseDialog": "Dieses Dialogfeld schließen" // close dialog button
};
