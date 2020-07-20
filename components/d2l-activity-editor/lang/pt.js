/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "Editar Condições de Liberação", // edit release conditions button
	"editor.btnAddReleaseCondition": "Adicionar Condição de Liberação", // add release condition button
	"editor.btnCreateNew": "Criar", // create new button
	"editor.btnAddExisting": "Adicionar Existente", // add existing button
	"editor.btnRemoveCondition": "Remover Condição", // remove condition button
	"editor.lblConditionsOperator": "Para visualizar o item, os usuários precisam atender a", // conditions operator label
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} Condição de Liberação} other {{count} Condições de Liberação}}", // num release condition text
	"editor.btnCancel": "Cancelar", // cancel button
	"editor.btnSave": "Salvar e Fechar", // save and close button
	"editor.btnSaveMobile": "Salvar", // save and close button for mobile devices
	"editor.dueDate": "Prazo", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "Data Final", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "Data de Início", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "Hora Limite", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "Hora Final", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "Hora de Início", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "Oculto", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "Sem prazo", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "Sem data final", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "Sem data de início", // Placeholder text for due date field when no due date is set
	"editor.visible": "Visível", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "A disponibilidade começa em {startDate} e termina em {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "Início da disponibilidade: {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "Término da disponibilidade: {endDate}", // end only text
	"editor.txtAvailabilityNeither": "Sempre disponível", // always available text
	"editor.ungraded": "Sem Nota", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "Presente em Notas", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "Ausente em Notas", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "Adicionar a Notas", // Menu item for adding grade association
	"editor.addAGrade": "Adicionar uma Nota", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "Remover de Notas", // Menu item for removing grade association
	"editor.setUngraded": "Redefinir como Não Avaliado", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "Pontuação de", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "É preciso especificar um valor de pontos para as atividades em Notas", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "O valor do campo Pontuação de precisa ser superior ou igual a 0,01 e inferior ou igual a 9.999.999.999", // Error message when an invalid score out of value is entered
	"editor.loading": "Carregando...", // Message displayed while page is loading
	"editor.ok": "OK", // Text of dialog button to commit action
	"editor.cancel": "Cancelar", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "Pressione ALT-F10 para entrar na barra de ferramentas e, para sair, pressione ESC.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "Escolher em Notas", // Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "Rubricas", //Header for the rubrics section
	"editor.startBeforeEndDate": "A data de início precisa ser anterior à data final",
	"editor.dueBetweenStartEndDate": "O prazo precisa ser posterior à data de início e anterior ou igual à data final",
	"editor.dueAfterStartDate": "O prazo precisa ser posterior à data de início",
	"editor.dueBeforeEndDate": "O prazo precisa ser anterior ou igual à data final",
	"editor.createAndLinkToNewGradeItem": "Criar e vincular a um novo item de nota", //Radio button text
	"editor.linkToExistingGradeItem": "Vincular a um item de nota existente", //Radio button text
	"editor.points": "Pontos: {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "Não há itens de nota existentes", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "Você não tem permissão para criar um novo item de nota", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "Objetivos de Aprendizagem", //Text label for the competencies tool integration
	"editor.manageCompetencies": "Gerenciar Objetivos de Aprendizagem", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =0 {Nenhum objetivo de aprendizagem} =1 {1 anexado} other {{count} anexados}}", //Label for number of associated competencies
	"editor.competenciesCountSummary": "{count, plural, =0 {Nenhum objetivo de aprendizagem} =1 {1 objetivo de aprendizagem} other {{count} objetivos de aprendizagem}}",
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 avaliação ausente} other {{count} avaliações ausentes}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "Fechar", //Label for Close button
	"editor.btnCloseDialog": "Fechar esta Caixa de Diálogo", // close dialog button

	"rubrics.btnAddRubric": "Adicionar Rubrica", //text for add rubric button
	"rubrics.btnCreateNew": "Criar", //Text for create new dropdown
	"rubrics.btnAddExisting": "Adicionar Existente", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "Rubricas", //Header for the rubrics section
	"rubrics.btnAttachRubric": "Anexar Rubrica", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "Cancelar", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "Adicionar Existente", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "Nenhuma rubrica adicionada", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 rubrica adicionada} other {{count} rubricas adicionadas}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "Excluir Rubrica", // Text for deleting rubric icon
	"rubrics.btnClose": "Fechar", // X button for exiting the create new rubric overlay
	"rubrics.txtRubricAdded": "Rubric added", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "Rubric removed", // Text for notifying screenreader rubric was removed 

	"grades.points": "Pontos: {points}", // Text label for displaying points of a grade
	"grades.weight": "Peso: {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "Item de notas", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.newGradeItemCategory": "Categoria de Nota", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "Nenhuma Categoria", // Category dropdown text for not selecting a category

	"attachments.addGoogleDriveLink": "Anexar Arquivo do Google Drive", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "Carregamento de Arquivo", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "Anexar Link da Web", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "Anexar Arquivo do OneDrive", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "Anexar Link a uma Atividade Existente", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "Voltar", // Text for a back button
	"attachments.closeDialog": "Fechar Caixa de Diálogo", // ARIA text for button to close dialog
	"attachments.recordAudio": "Gravar Áudio", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "Gravar Vídeo", // Text for a button that opens a dialog to record video
	"attachments.save": "Salvar", // Text for a save button,
	"attachments.attach": "Anexar", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "Carregamento de Arquivo", // Attach menu item text
	"attachments.addLinkMenu": "Link da Web", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "Atividade Existente" // Attach menu item text

};