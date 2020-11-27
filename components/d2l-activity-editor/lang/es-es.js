/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "Editar condiciones de publicación", // edit release conditions button
	"editor.btnAddReleaseCondition": "Añadir condiciones de publicación", // add release condition button
	"editor.btnCreateNew": "Crear nuevo", // create new button
	"editor.btnAddExisting": "Añadir existente", // add existing button
	"editor.btnRemoveCondition": "Quitar condición", // remove condition button
	"editor.lblConditionsOperator": "Para ver este elemento, los usuarios deben cumplir", // conditions operator label
	"editor.txtConditionAdded": "Condición añadida: {title}",
	"editor.txtConditionRemoved": "Condición eliminada: {title}",
	"editor.txtConditionsAdded": "Se han añadido {count} condiciones",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} condición de publicación} other {{count} condiciones de publicación}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {1 usuario con acceso especial} other {{userCount} usuarios con acceso especial}}", // num users with special access text
	"editor.btnCancel": "Cancelar", // cancel button
	"editor.btnSave": "Guardar y cerrar", // save and close button
	"editor.btnSaveMobile": "Guardar", // save and close button for mobile devices
	"editor.dueDate": "Fecha de vencimiento", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "Fecha final", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "Fecha de inicio", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "Hora de entrega", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "Hora de finalización", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "Hora de inicio", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "Oculto", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "No hay fecha de vencimiento", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "No hay fecha final", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "No hay fecha de inicio", // Placeholder text for due date field when no due date is set
	"editor.visible": "Visible", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "La disponibilidad comienza el {startDate} y finaliza el {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "La disponibilidad comienza el {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "La disponibilidad finaliza el {endDate}", // end only text
	"editor.txtAvailabilityNeither": "Siempre disponible", // always available text
	"editor.ungraded": "Sin calificación", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "En calificaciones", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "No en calificaciones", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "Añadir a las calificaciones", // Menu item for adding grade association
	"editor.addAGrade": "Añadir una calificación", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "Quitar de las calificaciones", // Menu item for removing grade association
	"editor.setUngraded": "Restablecer a Sin calificación", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "Puntuación sobre", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "Se debe especificar un valor de puntos para las actividades en las calificaciones", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "La puntuación sobre x debe ser superior o igual a 0,01 e inferior o igual a 9 999 999 999", // Error message when an invalid score out of value is entered
	"editor.loading": "Cargando…", // Message displayed while page is loading
	"editor.ok": "Aceptar", // Text of dialog button to commit action
	"editor.cancel": "Cancelar", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "Pulse ALT-F10 para ver la barra de herramientas y ESC para salir de la barra de herramientas.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "Elegir entre las calificaciones", // Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "Rúbricas", //Header for the rubrics section
	"editor.startBeforeEndDate": "La fecha de inicio debe ser anterior a la fecha final",
	"editor.dueBetweenStartEndDate": "La fecha de vencimiento debe ser posterior a la fecha de inicio y anterior o igual a la fecha final",
	"editor.dueAfterStartDate": "La fecha de vencimiento debe ser posterior a la fecha de inicio",
	"editor.dueBeforeEndDate": "La fecha de vencimiento debe ser anterior o igual a la fecha final",
	"editor.createAndLinkToNewGradeItem": "Crear y vincular un nuevo elemento de calificación", //Radio button text
	"editor.linkToExistingGradeItem": "Vincular a un elemento de calificación existente", //Radio button text
	"editor.points": "Puntos: {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "No hay elementos de calificación existentes", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "No tiene permiso para crear un nuevo elemento de calificación", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "Objetivos de aprendizaje", //Text label for the competencies tool integration
	"editor.manageCompetencies": "Administrar objetivos de aprendizaje", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1 adjunto} other {{count} adjuntos}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "No hay objetivos de aprendizaje", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 objetivo de aprendizaje} other {{count} objetivos de aprendizaje}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {falta 1 tarea} other {faltan {count} tareas}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "Cerrar", //Label for Close button
	"editor.btnCloseDialog": "Cerrar este cuadro de diálogo", // close dialog button
	"editor.btnManageSpecialAccess": "Administrar acceso especial", // manage special access button
	"editor.specialAccessRestrictedText": "Solo los usuarios con acceso especial pueden ver esta carpeta", // restricted special access description
	"editor.specialAccessNotRestrictedText": "Los usuarios pueden entregar fuera de las fechas de disponibilidad normales", // not restricted special access description
	"editor.specialAccessCount": "{count, plural, =1 {1 usuario} other {{count} usuarios}} con acceso especial", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "No hay usuarios", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "Administrar acceso especial", // Dialog title
	"editor.specialAccessHidden": "Oculto por acceso especial", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "¿Descartar cambios?", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "¿Seguro que desea descartar los cambios?", // Discard Changes User Prompt
	"editor.yesLabel": "Sí",
	"editor.noLabel": "No",

	"rubrics.btnAddRubric": "Agregar rúbrica", //text for add rubric button
	"rubrics.btnCreateNew": "Crear nuevo", //Text for create new dropdown
	"rubrics.btnAddExisting": "Añadir existente", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "Rúbricas", //Header for the rubrics section
	"rubrics.btnAttachRubric": "Adjuntar rúbrica", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "Cancelar", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "Añadir existente", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "No se ha añadido ninguna rúbrica", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 rúbrica añadida} other {{count} rúbricas añadidas}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "Eliminar rúbrica", // Text for deleting rubric icon
	"rubrics.btnClose": "Cerrar", // X button for exiting the create new rubric overlay
	"rubrics.txtRubricAdded": "Rúbrica añadida", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "Rúbrica eliminada", // Text for notifying screenreader rubric was removed
	"rubrics.defaultScoringRubric": "Rúbrica de puntuación predeterminada", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "Sin valores predeterminados", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "Puntos: {points}", // Text label for displaying points of a grade
	"grades.weight": "Ponderación: {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "Elemento de calificación", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.newGradeItemCategory": "Categoría de calificación", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "Ninguna categoría", // Category dropdown text for not selecting a category

	"attachments.addGoogleDriveLink": "Adjuntar desde Google Drive", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "Carga de archivo", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "Adjuntar enlace web", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "Adjuntar desde OneDrive", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "Adjuntar enlace a una actividad existente", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "Volver", // Text for a back button
	"attachments.closeDialog": "Cerrar el cuadro de diálogo", // ARIA text for button to close dialog
	"attachments.recordAudio": "Grabar audio", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "Grabar vídeo", // Text for a button that opens a dialog to record video
	"attachments.save": "Guardar", // Text for a save button,
	"attachments.attach": "Adjuntar", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "Carga de archivo", // Attach menu item text
	"attachments.addLinkMenu": "Enlace web", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "Actividad existente", // Attach menu item text

	"content.name": "Nombre", // Text label for name input field
	"content.emptyNameField": "El nombre es obligatorio", // Error text that appears below name field when it is left empty
	"content.description": "Descripción", // Text label for description input field
	"content.availabilityHeader": "Fechas de disponibilidad", // availability header
	"content.saveError": "El elemento de contenido no se ha guardado. Corrija los campos señalados en rojo.", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.addDueDate": "Agregar fecha de vencimiento" // Text label for name input field
};
