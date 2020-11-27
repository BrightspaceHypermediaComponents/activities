/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "Freigabebedingungen bearbeiten", // edit release conditions button
	"editor.btnAddReleaseCondition": "Freigabebedingungen hinzufügen", // add release condition button
	"editor.btnCreateNew": "Neu erstellen", // create new button
	"editor.btnAddExisting": "Vorhandene hinzufügen", // add existing button
	"editor.btnRemoveCondition": "Bedingung entfernen", // remove condition button
	"editor.lblConditionsOperator": "Für die Ansicht dieses Elements müssen Benutzer Folgendes erfüllen:", // conditions operator label
	"editor.txtConditionAdded": "Bedingung hinzugefügt: {title}",
	"editor.txtConditionRemoved": "Bedingung entfernt: {title}",
	"editor.txtConditionsAdded": "{count} Bedingungen hinzugefügt",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} Freigabebedingung} other {{count} Freigabebedingungen}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {1 Benutzer mit beschränktem Zugriff} other {{userCount} Benutzer mit beschränktem Zugriff}}", // num users with special access text
	"editor.btnCancel": "Abbrechen", // cancel button
	"editor.btnSave": "Speichern und schließen", // save and close button
	"editor.btnSaveMobile": "Speichern", // save and close button for mobile devices
	"editor.dueDate": "Abgabetermin", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "Enddatum", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "Startdatum", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "Fälligkeit", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "Endzeit", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "Startzeit", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "Ausgeblendet", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "Kein Abgabetermin", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "Kein Enddatum", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "Kein Startdatum", // Placeholder text for due date field when no due date is set
	"editor.visible": "Sichtbar", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "Verfügbarkeit beginnt am {StartDate} und endet am {EndDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "Verfügbarkeit beginnt am {StartDate}", // start only text
	"editor.txtAvailabilityEndOnly": "Verfügbarkeit endet am {EndDate}", // end only text
	"editor.txtAvailabilityNeither": "Immer verfügbar", // always available text
	"editor.ungraded": "Nicht bewertet", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "In Noten", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "Nicht in Noten", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "Zu Noten hinzufügen", // Menu item for adding grade association
	"editor.addAGrade": "Eine Note hinzufügen", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "Aus Noten entfernen", // Menu item for removing grade association
	"editor.setUngraded": "Auf unbenotet zurücksetzen", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "Punktzahl von", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "In Noten muss ein Wert für Aktivitäten eingetragen werden", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "Die „Punktzahl von“ muss größer oder gleich 0,01 und kleiner oder gleich 9.999.999.999 sein.", // Error message when an invalid score out of value is entered
	"editor.loading": "Laden...", // Message displayed while page is loading
	"editor.ok": "OK", // Text of dialog button to commit action
	"editor.cancel": "Abbrechen", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "Drücken Sie Alt+F10, um die Toolbar zu öffnen und Escape, um Sie wieder zu schließen", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "Wählen Sie aus den Noten", // Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "Bewertungsschemas", //Header for the rubrics section
	"editor.startBeforeEndDate": "Das Startdatum muss vor dem Enddatum liegen.",
	"editor.dueBetweenStartEndDate": "Das Abgabedatum muss nach dem Startdatum und vor oder gleich dem Enddatum sein",
	"editor.dueAfterStartDate": "Der Abgabetermin muss nach dem Startdatum liegen.",
	"editor.dueBeforeEndDate": "Der Abgabetermin muss vor oder gleich dem Enddatum sein",
	"editor.createAndLinkToNewGradeItem": "Erstellen und mit einem neuen Benotungsgegenstand verknüpfen", //Radio button text
	"editor.linkToExistingGradeItem": "Verknüpfung mit einem vorhandenen Benotungsgegenstand", //Radio button text
	"editor.points": "{points} Punkte", // Text label for displaying points of a grade
	"editor.noGradeItems": "Keine vorhandenen Benotungsgegenstände", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "Sie haben keine Berechtigung, einen neuen Benotungsgegenstand zu erstellen.", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "Lernziele", //Text label for the competencies tool integration
	"editor.manageCompetencies": "Lernziele verwalten", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1 Anhang} other {{Anzahl} Anhänge}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "Keine Lernziele", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 Lernziel} andere {{count} Lernziele}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, Plural, =1 {1 fehlende Bewertung} andere {{count} fehlende Bewertungen}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "Schließen", //Label for Close button
	"editor.btnCloseDialog": "Dieses Dialogfeld schließen", // close dialog button
	"editor.btnManageSpecialAccess": "Beschränkten Zugriff verwalten", // manage special access button
	"editor.specialAccessRestrictedText": "Nur Benutzer mit beschränktem Zugriff können diesen Ordner sehen", // restricted special access description
	"editor.specialAccessNotRestrictedText": "Benutzer können außerhalb normaler Verfügbarkeitszeiträume einreichen", // not restricted special access description
	"editor.specialAccessCount": "{count, plural, =1 {1 Benutzer} other {{count} Benutzer}} mit beschränktem Zugriff", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "Keine Benutzer", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "Beschränkten Zugriff verwalten", // Dialog title
	"editor.specialAccessHidden": "Durch beschränkten Zugriff ausgeblendet", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "Änderungen verwerfen?", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "Möchten Sie Ihre Änderungen wirklich verwerfen?", // Discard Changes User Prompt
	"editor.yesLabel": "Ja",
	"editor.noLabel": "Nein",

	"rubrics.btnAddRubric": "Bewertungsschema hinzufügen", //text for add rubric button
	"rubrics.btnCreateNew": "Neu erstellen", //Text for create new dropdown
	"rubrics.btnAddExisting": "Vorhandene hinzufügen", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "Bewertungsschemas", //Header for the rubrics section
	"rubrics.btnAttachRubric": "Bewertungsschema anhängen", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "Abbrechen", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "Vorhandene hinzufügen", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "Kein Bewertungsschema hinzugefügt", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 Rubrik hinzugefügt} other {{count} Rubriken hinzugefügt}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "Bewertungsschema löschen", // Text for deleting rubric icon
	"rubrics.btnClose": "Schließen", // X button for exiting the create new rubric overlay
	"rubrics.txtRubricAdded": "Bewertungsschema hinzugefügt", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "Bewertungsschema entfernt", // Text for notifying screenreader rubric was removed
	"rubrics.defaultScoringRubric": "Standardmäßiges Punktzahl-Bewertungsschema", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "Kein Standard ausgewählt", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "{points} Punkte", // Text label for displaying points of a grade
	"grades.weight": "{weight} Gewicht", // Text label for displaying weight of a grade
	"grades.gradeItem": "Benotungsgegenstand", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.newGradeItemCategory": "Notenkategorie", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "Keine Kategorie", // Category dropdown text for not selecting a category

	"attachments.addGoogleDriveLink": "Anlage aus Google Drive hinzufügen", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "Datei-Upload", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "Weblink hinzufügen", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "Anlage aus OneDrive hinzufügen", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "Link zu Vorhandener Aktivität hinzufügen", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "Zurück", // Text for a back button
	"attachments.closeDialog": "Dialogfeld schließen", // ARIA text for button to close dialog
	"attachments.recordAudio": "Audioaufzeichnung erstellen", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "Video aufnehmen", // Text for a button that opens a dialog to record video
	"attachments.save": "Speichern", // Text for a save button,
	"attachments.attach": "Anhängen", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "Datei-Upload", // Attach menu item text
	"attachments.addLinkMenu": "Weblink", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "Vorhandene Aktivität", // Attach menu item text

	"content.name": "Name", // Text label for name input field
	"content.emptyNameField": "Name erforderlich", // Error text that appears below name field when it is left empty
	"content.description": "Beschreibung", // Text label for description input field
	"content.availabilityHeader": "Verfügbarkeitsdaten", // availability header
	"content.saveError": "Ihr Inhaltselement wurde nicht gespeichert. Korrigieren Sie die rot umrandeten Felder.", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.addDueDate": "Abgabetermin hinzufügen" // Text label for name input field
};
