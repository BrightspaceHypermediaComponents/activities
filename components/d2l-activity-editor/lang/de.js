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
	"editor.txtAvailabilityStartAndEnd": "Verfügbarkeit beginnt am {startDate} und endet am {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "Verfügbarkeit beginnt am {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "Verfügbarkeit endet am {endDate}", // end only text
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
	"editor.editLinkExisting": "Bearbeiten oder Verknüpfen mit vorhandener", // New Link text and dialog title for the edit grades dialog,
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
	"editor.competenciesCount": "{count, plural, =1 {1 Anhang} other {{count} Anhänge}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "Keine Lernziele", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 Lernziel} other {{count} Lernziele}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 fehlende Bewertung} other {{count} fehlende Bewertungen}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "Schließen", //Label for Close button
	"editor.btnCloseDialog": "Dieses Dialogfeld schließen", // close dialog button
	"editor.btnManageSpecialAccess": "Beschränkten Zugriff verwalten", // manage special access button
	"editor.saveSuccessful": "Erfolgreich gespeichert", // alert message after a successful save
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
	"editor.notificationEmailLabel": "E-Mail-Benachrichtigung", // Label for notification email input field
	"editor.invalidNotificationEmailError": "Geben Sie eine gültige E-Mail-Adresse ein", // error shown on tooltip when notification email is invalid
	"editor.gradeOutOf": "Note aus", // ARIA label for the grade out of field, when creating/editing an activity
	"editor.inGradebook": "In Notenbuch", // New state of the grades field when there is a score, and an associated grade item
	"editor.notInGradebook": "Nicht in Notenbuch", // New state of the grades field when there is a score, but no associated grade item
	"editor.addToGradebook": "Zum Notenbuch hinzufügen", // New menu item for adding grade association

	"rubrics.btnAddRubric": "Bewertungsschema hinzufügen", //text for add rubric button
	"rubrics.btnCreateNew": "Neu erstellen", //Text for create new dropdown
	"rubrics.hdrCreateRubric": "Bewertungsschema erstellen", // Header for creating a new rubric
	"rubrics.btnDetach": "Trennen", //Text for the button to confirm detaching a rubric
	"rubrics.btnAddExisting": "Vorhandene hinzufügen", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "Bewertungsschemas", //Header for the rubrics section
	"rubrics.btnAttachRubric": "Bewertungsschema anhängen", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "Abbrechen", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "Vorhandene hinzufügen", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "Kein Bewertungsschema hinzugefügt", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 Rubrik hinzugefügt} other {{count} Rubriken hinzugefügt}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "Bewertungsschema löschen", // Text for deleting rubric icon
	"rubrics.txtRubricAdded": "Bewertungsschema hinzugefügt", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "Bewertungsschema entfernt", // Text for notifying screenreader rubric was removed
	"rubrics.txtConfirmDetachRubric": "Sobald die Rubrik getrennt ist, werden alle vorherigen Bewertungen der Rubrik in dieser Aktivität gelöscht. Trennen der Rubrik bestätigen?", //Text for the dialog to confirm detaching a rubric from an evaluated activity
	"rubrics.defaultScoringRubric": "Standardmäßiges Punktzahl-Bewertungsschema", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "Kein Standard ausgewählt", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "{points} Punkte", // Text label for displaying points of a grade
	"grades.weight": "{weight} Gewicht", // Text label for displaying weight of a grade
	"grades.gradeItem": "Benotungsgegenstand", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.gradeUnits": "Punkte", // unit label for GradeOutOf value (e.g. 10 points)
	"grades.chooseNewGradeItemCategory": "Notenkategorie auswählen", // Label for add category button
	"grades.newGradeItemCategory": "Notenkategorie", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "Keine Kategorie", // Category dropdown text for not selecting a category
	"grades.changeNewGradeTypeAndScheme": "Notentyp und -schema ändern", // Label for change type and scheme button
	"grades.newGradeType": "Notentyp", // Label for the grade type
	"grades.newGradeTypeNumeric": "Numerisch", // Label for numeric grade type radio option
	"grades.newGradeTypeSelectbox": "Auswahlfeld", // Label for selectbox grade type radio option
	"grades.numericDescription": "Benoten Sie Benutzer durch Zuweisen eines Werts aus einer festgelegten Gesamtpunktzahl.", // Description of numeric grade type
	"grades.numericDescriptionExample": "Beispiel: 8/10", // Example of numeric grade type
	"grades.selectboxDescription": "Benoten Sie Benutzer durch Auswahl einer Notenskalenebene, die ihre Leistung am besten widerspiegelt.", // Description of selectbox grade type
	"grades.selectboxDescriptionExample": "Beispiel: „sehr gut“ oder „B+“", // Example of selectbox grade type
	"grades.newGradeScheme": "Notenskala", // Label for the grade scheme
	"grades.defaultGradeScheme": "--Standard-- ({schemaName})", // name of default grade scheme

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
	"content.emptyNameField": "Name erforderlich.", // Error text that appears below name field when it is left empty
	"content.description": "Beschreibung", // Text label for description input field
	"content.pageContent": "Seiteninhalt", // Text label for page content input field (HTML files)
	"content.availabilityHeader": "Verfügbarkeitsdaten", // availability header
	"content.saveError": "Ihr Inhaltselement wurde nicht gespeichert. Korrigieren Sie die rot umrandeten Felder.", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.displayOptions": "Anzeigeoptionen", // Text label for display options
	"content.addDueDate": "Abgabetermin hinzufügen", // Text label for name input field
	"content.embedOnPage": "Auf der Seite eingebettet", // Text label for link radio button
	"content.openNewTab": "In neuer Registerkarte öffnen (empfohlen)", // Text label for link radio button
	"content.openNewTabRecommendation": "Diese Option wird empfohlen, um Authentifizierungsprobleme bei Ihrer Ressource zu vermeiden.", // Text for the help icon that explains reason for recommending new tab option
	"content.openNewTabHelp": "Zeit auf Seite wird nicht erfasst.", // Text for the help icon next to link radio button
	"content.link": "Link", //Text label for link input field
	"content.emptyLinkField": "Link ist erforderlich.", //Error message shown on link tooltip when the link is empty
	"content.invalidLink": "Bitte geben Sie eine gültige URL ein.", //Error message shown on link tooltip when the link is not formatted correctly
	"content.notHttps": "Nur Links, die mit „https“ beginnen, können eingebunden werden.", //Error message shown on link tooltip when https is not used for embedded links
	"content.noEmbed": "Die Site kann nicht eingebunden werden.", //Error message shown on link tooltip when the link cannot be embedded
	"content.previewLabel": "Vorschau", // The label text for the link preview
	"content.openInNewWindow": "In neuem Fenster öffnen", // The label text for the subtle-button for opening a LTI link in a new window
	"content.externalActivity": "Externe Aktivität", // The label text for the external activity section on the LTI link page
	"content.externalActivityOpened": "Öffnen Sie die Aktivität in einem neuen Fenster, um ihren Inhalt anzuzeigen.", // Text for displaying underneath the LTI link jump logo
	"content.externalActivityEmbeddedNotAllowed": "Diese externe Aktivität unterstützt das Einbetten nicht. Sie kann nur durch Öffnen in einem neuen Fenster angezeigt werden." // Text that replaces the LTI display options if embedding is not allowed
};
