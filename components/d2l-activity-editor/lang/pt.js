/* eslint quotes: 0 */

export default {
	"btnEditReleaseConditions": "Editar Condições de Liberação", // edit release conditions button
	"btnAddReleaseCondition": "Adicionar Condição de Liberação", // add release condition button
	"btnCreateNew": "Criar", // create new button
	"btnAddExisting": "Adicionar Existente", // add existing button
	"btnRemoveCondition": "Remover Condição", // remove condition button
	"lblConditionsOperator": "Para visualizar o item, os usuários precisam atender a", // conditions operator label
	"txtNumReleaseConditions": "{count, plural, =1 {{count} Condição de Liberação} other {{count} Condições de Liberação}}", // num release condition text
	"btnCancel": "Cancelar", // cancel button
	"btnSave": "Salvar e Fechar", // save and close button
	"btnSaveMobile": "Salvar", // save and close button for mobile devices
	"dueDate": "Prazo", // ARIA label for the due date field when creating/editing an activity
	"endDate": "Data Final", // ARIA label for the end date field when creating/editing an activity
	"startDate": "Data de Início", // ARIA label for the start date field when creating/editing an activity
	"dueTime": "Hora Limite", // ARIA label for the due time field when creating/editing an activity
	"endTime": "Hora Final", // ARIA label for the end time field when creating/editing an activity
	"startTime": "Hora de Início", // ARIA label for the start time field when creating/editing an activity
	"hidden": "Oculto", // Label displayed with the visibility switch when hidden
	"noDueDate": "Sem prazo", // Placeholder text for due date field when no due date is set
	"noEndDate": "Sem data final", // Placeholder text for due date field when no due date is set
	"noStartDate": "Sem data de início", // Placeholder text for due date field when no due date is set
	"visible": "Visível", // Label displayed with the visibility switch when visible
	"txtAvailabilityStartAndEnd": "A disponibilidade começa em {startDate} e termina em {endDate}", // start/end text
	"txtAvailabilityStartOnly": "Início da disponibilidade: {startDate}", // start only text
	"txtAvailabilityEndOnly": "Término da disponibilidade: {endDate}", // end only text
	"txtAvailabilityNeither": "Sempre disponível", // always available text
	"ungraded": "Sem Nota", // State of score field when there is no score and no grade item, when creating/editing an activity
	"inGrades": "Presente em Notas", // State of the grades field when there is a score, and an associated grade item
	"notInGrades": "Ausente em Notas", // State of the grades field when there is a score, but no associated grade item
	"addToGrades": "Adicionar a Notas", // Menu item for adding grade association
	"addAGrade": "Adicionar uma Nota", //ARIA label to add a grade to the activity
	"removeFromGrades": "Remover de Notas", // Menu item for removing grade association
	"setUngraded": "Redefinir como Não Avaliado", // Menu item for setting the activity to ungraded
	"scoreOutOf": "Pontuação de", // ARIA label for the score out of field, when creating/editing an activity
	"emptyScoreOutOfError": "É preciso especificar um valor de pontos para as atividades em Notas", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"invalidScoreOutOfError": "O valor do campo Pontuação de precisa ser superior ou igual a 0,01 e inferior ou igual a 9.999.999.999", // Error message when an invalid score out of value is entered
	"loading": "Carregando...", // Message displayed while page is loading
	"ok": "OK", // Text of dialog button to commit action
	"cancel": "Cancelar", // Text of dialog button to cancel action
	"ariaToolbarShortcutInstructions": "Pressione ALT-F10 para entrar na barra de ferramentas e, para sair, pressione ESC.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"chooseFromGrades": "Escolher em Notas", // Link text and dialog title for the edit grades dialog,
	"hdrRubrics": "Rubricas", //Header for the rubrics section
	"startBeforeEndDate": "A data de início precisa ser anterior à data final",
	"dueBetweenStartEndDate": "O prazo precisa ser posterior à data de início e anterior ou igual à data final",
	"dueAfterStartDate": "O prazo precisa ser posterior à data de início",
	"dueBeforeEndDate": "O prazo precisa ser anterior ou igual à data final",
	"createAndLinkToNewGradeItem": "Criar e vincular a um novo item de nota", //Radio button text
	"linkToExistingGradeItem": "Vincular a um item de nota existente", //Radio button text
	"points": "Pontos: {points}", // Text label for displaying points of a grade
	"noGradeItems": "Não há itens de nota existentes", // Reason why existing grade items cannot be linked in the choose grades dialog
	"noGradeCreatePermission": "Você não tem permissão para criar um novo item de nota", // Reason why a new grade items cannot be created in the choose grades dialog
	"competencies": "Objetivos de Aprendizagem", //Text label for the competencies tool integration
	"manageCompetencies": "Gerenciar Objetivos de Aprendizagem", //Button text to launch competencies tool dialog
	"competenciesCount": "{count, plural, =0 {No learning objectives} =1 {1 attached} other {{count} attached}}", //Label for number of associated competencies
	"competenciesCountSummary": "{count, plural, =0 {Nenhum objetivo de aprendizagem} =1 {1 objetivo de aprendizagem} other {{count} objetivos de aprendizagem}}",
	"unevaluatedCompetencies": "{count, plural, =1 {1 not being evaluated} other {{count} not being evaluated}}", //Label for number of unevalated associated competencies
	"btnClose": "Fechar", //Label for Close button
	"btnCloseDialog": "Fechar esta Caixa de Diálogo" // close dialog button
};
