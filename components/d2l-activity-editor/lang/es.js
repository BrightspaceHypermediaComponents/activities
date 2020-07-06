/* eslint quotes: 0 */

export default {
	"btnEditReleaseConditions": "Editar condiciones de publicación", // edit release conditions button
	"btnAddReleaseCondition": "Agregar condición de publicación", // add release condition button
	"btnCreateNew": "Crear nuevo", // create new button
	"btnAddExisting": "Agregar existente", // add existing button
	"btnRemoveCondition": "Quitar condición", // remove condition button
	"lblConditionsOperator": "Para ver este elemento, los usuarios deben cumplir con los siguientes requisitos:", // conditions operator label
	"txtNumReleaseConditions": "{count, plural, =1 {{count} condición de publicación} other {{count} condiciones de publicación}}", // num release condition text
	"btnCancel": "Cancelar", // cancel button
	"btnSave": "Guardar y cerrar", // save and close button
	"btnSaveMobile": "Guardar", // save and close button for mobile devices
	"dueDate": "Fecha de vencimiento", // ARIA label for the due date field when creating/editing an activity
	"endDate": "Fecha final", // ARIA label for the end date field when creating/editing an activity
	"startDate": "Fecha de inicio", // ARIA label for the start date field when creating/editing an activity
	"dueTime": "Hora de entrega", // ARIA label for the due time field when creating/editing an activity
	"endTime": "Hora final", // ARIA label for the end time field when creating/editing an activity
	"startTime": "Hora de inicio", // ARIA label for the start time field when creating/editing an activity
	"hidden": "Oculto", // Label displayed with the visibility switch when hidden
	"noDueDate": "No hay fecha de vencimiento", // Placeholder text for due date field when no due date is set
	"noEndDate": "No hay fecha final", // Placeholder text for due date field when no due date is set
	"noStartDate": "No hay fecha de inicio", // Placeholder text for due date field when no due date is set
	"visible": "Visible", // Label displayed with the visibility switch when visible
	"txtAvailabilityStartAndEnd": "La disponibilidad comienza el {startDate} y termina el {endDate}", // start/end text
	"txtAvailabilityStartOnly": "La disponibilidad comienza el {startDate}", // start only text
	"txtAvailabilityEndOnly": "La disponibilidad finaliza el {endDate}", // end only text
	"txtAvailabilityNeither": "Siempre disponible", // always available text
	"ungraded": "Sin calificación", // State of score field when there is no score and no grade item, when creating/editing an activity
	"inGrades": "En Calificaciones", // State of the grades field when there is a score, and an associated grade item
	"notInGrades": "No está en Calificaciones", // State of the grades field when there is a score, but no associated grade item
	"addToGrades": "Agregar a las calificaciones", // Menu item for adding grade association
	"addAGrade": "Agregar una calificación", //ARIA label to add a grade to the activity
	"removeFromGrades": "Eliminar de Calificaciones", // Menu item for removing grade association
	"setUngraded": "Restablecer a Sin calificación", // Menu item for setting the activity to ungraded
	"scoreOutOf": "Puntuación sobre", // ARIA label for the score out of field, when creating/editing an activity
	"emptyScoreOutOfError": "Se debe especificar un valor en puntos para las actividades en Calificaciones", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"invalidScoreOutOfError": "Puntuación sobre debe ser mayor o igual que 0.01 y menor o igual que 9,999,999,999", // Error message when an invalid score out of value is entered
	"loading": "Cargando…", // Message displayed while page is loading
	"ok": "Aceptar", // Text of dialog button to commit action
	"cancel": "Cancelar", // Text of dialog button to cancel action
	"ariaToolbarShortcutInstructions": "Presione ALT-F10 para ver la barra de herramientas y presione ESC para salir de la barra de herramientas.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"chooseFromGrades": "Elegir desde Calificaciones", // Link text and dialog title for the edit grades dialog,
	"hdrRubrics": "Rúbricas", //Header for the rubrics section
	"startBeforeEndDate": "La fecha de inicio debe ser una fecha anterior a la fecha final",
	"dueBetweenStartEndDate": "La fecha de vencimiento debe ser una fecha posterior a la fecha de inicio y una fecha anterior o igual a la fecha final.",
	"dueAfterStartDate": "La fecha de vencimiento debe ser una fecha posterior a la fecha de inicio.",
	"dueBeforeEndDate": "La fecha de vencimiento debe ser una fecha anterior o igual a la fecha final.",
	"createAndLinkToNewGradeItem": "Crear y vincular a un nuevo elemento de calificación", //Radio button text
	"linkToExistingGradeItem": "Vincular un elemento de calificación existente", //Radio button text
	"points": "Puntos: {points}", // Text label for displaying points of a grade
	"noGradeItems": "No hay elementos de calificación existentes", // Reason why existing grade items cannot be linked in the choose grades dialog
	"noGradeCreatePermission": "No tiene permiso para crear un nuevo elemento de calificación", // Reason why a new grade items cannot be created in the choose grades dialog
	"competencies": "Objetivos de aprendizaje", //Text label for the competencies tool integration
	"manageCompetencies": "Administrar objetivos de aprendizaje", //Button text to launch competencies tool dialog
	"competenciesCount": "{count, plural, =0 {Sin objetivos de aprendizaje} =1 {1 adjunto} other {{count} adjuntos}}", //Label for number of associated competencies
	"competenciesCountSummary": "{count, plural, =0 {Sin objetivos de aprendizaje} =1 {1 objetivo de aprendizaje} other {{count} objetivos de aprendizaje}}",
	"unevaluatedCompetencies": "{count, plural, =1 {1 evaluación faltante} other {{count} evaluaciones faltantes}}", //Label for number of unevalated associated competencies
	"btnClose": "Cerrar", //Label for Close button
	"btnCloseDialog": "Cerrar este cuadro de diálogo" // close dialog button
};
