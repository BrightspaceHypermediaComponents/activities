/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "Editar condições de liberação", // edit release conditions button
	"editor.btnAddReleaseCondition": "Adicionar condição de liberação", // add release condition button
	"editor.btnCreateNew": "Criar novo", // create new button
	"editor.btnAddExisting": "Adicionar existente", // add existing button
	"editor.btnRemoveCondition": "Remover condição", // remove condition button
	"editor.lblConditionsOperator": "Para visualizar o item, os usuários devem atender a", // conditions operator label
	"editor.txtConditionAdded": "Condição adicionada: {title}",
	"editor.txtConditionRemoved": "Condição removida: {title}",
	"editor.txtConditionsAdded": "{count} condições adicionadas",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} condição de liberação} other {{count} condições de liberação}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {1 usuário com acesso especial} other {{userCount} usuários com acesso especial}}", // num users with special access text
	"editor.btnCancel": "Cancelar", // cancel button
	"editor.btnSave": "Salvar e fechar", // save and close button
	"editor.btnSaveMobile": "Salvar", // save and close button for mobile devices
	"editor.dueDate": "Prazo", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "Data final", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "Data de início", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "Hora limite", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "Hora final", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "Hora de início", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "Oculto", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "Sem prazo", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "Sem data final", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "Não há data de início", // Placeholder text for due date field when no due date is set
	"editor.visible": "Visível", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "A disponibilidade começa em {startDate} e termina em {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "Início da disponibilidade: {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "Término da disponibilidade: {endDate}", // end only text
	"editor.txtAvailabilityNeither": "Sempre disponível", // always available text
	"editor.ungraded": "Não Avaliado", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "Presente em Notas", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "Ausente em Notas", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "Adicionar às notas", // Menu item for adding grade association
	"editor.addAGrade": "Adicionar uma nota", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "Remover de Notas", // Menu item for removing grade association
	"editor.setUngraded": "Redefinir como Não Avaliado", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "Pontuação de", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "É preciso especificar um valor de pontos para as atividades em Notas", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "O valor do campo Pontuação de deve ser superior ou igual a 0,01 e inferior ou igual a 9.999.999.999", // Error message when an invalid score out of value is entered
	"editor.loading": "Carregando…", // Message displayed while page is loading
	"editor.ok": "OK", // Text of dialog button to commit action
	"editor.cancel": "Cancelar", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "Pressione ALT+F10 para entrar na barra de ferramentas e ESC para sair dela.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "Escolher em notas", // Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "Rubricas", //Header for the rubrics section
	"editor.startBeforeEndDate": "A data de início deve ser anterior à data final",
	"editor.dueBetweenStartEndDate": "O prazo deve ser posterior à data de início e anterior ou igual à data final",
	"editor.dueAfterStartDate": "O prazo deve ser posterior à data de início",
	"editor.dueBeforeEndDate": "O prazo deve ser anterior ou igual à data final",
	"editor.createAndLinkToNewGradeItem": "Criar e vincular a um novo item de nota", //Radio button text
	"editor.linkToExistingGradeItem": "Vincular a um item de nota existente", //Radio button text
	"editor.points": "Pontos: {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "Não há itens de nota existentes", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "Você não tem permissão para criar um novo item de nota", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "Objetivos de aprendizagem", //Text label for the competencies tool integration
	"editor.manageCompetencies": "Gerenciar objetivos de aprendizagem", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1 anexo} other {{count} anexos}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "Nenhum objetivo de aprendizagem", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 objetivo de aprendizagem} other {{count} objetivos de aprendizagem}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 avaliação ausente} other {{count} avaliações ausentes}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "Fechar", //Label for Close button
	"editor.btnCloseDialog": "Fechar esta caixa de diálogo", // close dialog button
	"editor.btnManageSpecialAccess": "Gerenciar acesso especial", // manage special access button
	"editor.specialAccessRestrictedText": "Apenas usuários com acesso especial podem ver esta pasta", // restricted special access description
	"editor.specialAccessNotRestrictedText": "Os usuários podem fazer envios fora das datas normais de disponibilidade", // not restricted special access description
	"editor.specialAccessCount": "{count, plural, =1 {1 usuário} other {{count} usuários}} com acesso especial", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "Nenhum usuário", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "Gerenciar acesso especial", // Dialog title
	"editor.specialAccessHidden": "Oculta por acesso especial", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "Descartar alterações?", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "Tem certeza que deseja descartar suas alterações?", // Discard Changes User Prompt
	"editor.yesLabel": "Sim",
	"editor.noLabel": "Não",

	"rubrics.btnAddRubric": "Adicionar rubrica", //text for add rubric button
	"rubrics.btnCreateNew": "Criar novo", //Text for create new dropdown
	"rubrics.btnAddExisting": "Adicionar existente", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "Rubricas", //Header for the rubrics section
	"rubrics.btnAttachRubric": "Anexar rubrica", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "Cancelar", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "Adicionar existente", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "Nenhuma rubrica adicionada", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 rubrica adicionada} other {{count} rubricas adicionadas}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "Excluir rubrica", // Text for deleting rubric icon
	"rubrics.btnClose": "Fechar", // X button for exiting the create new rubric overlay
	"rubrics.txtRubricAdded": "Rubrica adicionada", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "Rubrica removida", // Text for notifying screenreader rubric was removed
	"rubrics.defaultScoringRubric": "Rubrica de pontuação padrão", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "Nenhum padrão selecionado", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "Pontos: {points}", // Text label for displaying points of a grade
	"grades.weight": "Peso: {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "Item de nota", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.newGradeItemCategory": "Categoria de nota", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "Nenhuma categoria", // Category dropdown text for not selecting a category

	"attachments.addGoogleDriveLink": "Anexar arquivo do Google Drive", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "Carregamento de arquivo", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "Anexar link da Web", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "Anexar arquivo do OneDrive", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "Anexar link a uma atividade existente", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "Voltar", // Text for a back button
	"attachments.closeDialog": "Fechar caixa de diálogo", // ARIA text for button to close dialog
	"attachments.recordAudio": "Gravar áudio", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "Gravar vídeo", // Text for a button that opens a dialog to record video
	"attachments.save": "Salvar", // Text for a save button,
	"attachments.attach": "Anexar", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "Carregamento de arquivo", // Attach menu item text
	"attachments.addLinkMenu": "Link da Web", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "Atividade existente", // Attach menu item text

	"content.name": "Nome", // Text label for name input field
	"content.emptyNameField": "O campo Nome é obrigatório", // Error text that appears below name field when it is left empty
	"content.description": "Descrição", // Text label for description input field
	"content.availabilityHeader": "Datas de disponibilidade", // availability header
	"content.saveError": "Seu item de conteúdo não foi salvo. Corrija os campos destacados em vermelho.", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.addDueDate": "Adicionar prazo" // Text label for name input field
};
