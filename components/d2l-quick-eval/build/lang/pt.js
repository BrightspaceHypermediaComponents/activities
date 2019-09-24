'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangPtImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.pt = {
			'activities': 'Atividades',
			'activityName': 'Nome da Atividade',
			'assignment': 'Atribuição',
			'caughtUp': 'Você está em dia!',
			'checkBackOften': 'Verifique com frequência se há novos envios.',
			'clearSearch': 'Limpar Pesquisa',
			'close': 'Fechar',
			'completed': 'Concluído',
			'confirmation': 'Confirmação',
			'courseName': 'Curso',
			'discussion': 'Discussão',
			'displayName': 'Nome e Sobrenome',
			'due': 'Prazo: {date}',
			'evaluate': 'Avaliar {displayName}',
			'evaluateAll': 'Avaliar Tudo',
			'evaluated': 'Avaliado',
			'failedToFilter': 'Não foi possível aplicar o filtro. Tente novamente em alguns minutos.',
			'failedToLoadActivities': 'Não foi possível carregar as atividades. Tente novamente em alguns minutos.',
			'failedToLoadData': 'Não foi possível carregar os envios. Tente novamente em alguns minutos.',
			'failedToLoadMore': 'Não foi possível carregar mais envios. Tente novamente em alguns minutos.',
			'failedToSearch': 'Não foi possível aplicar pesquisa. Tente novamente em alguns minutos.',
			'firstName': 'Nome',
			'lastName': 'Sobrenome',
			'loadMore': 'Carregar mais',
			'loading': 'Carregando',
			'masterTeacher': 'Professor',
			'newAttempts': 'Novas Tentativas',
			'newAttemptsDetails': '{newNum, plural, =0 {{reAttemptNum, plural, =1 {1 nova tentativa} other {{reAttemptNum} novas tentativas}}} other {{reAttemptNum, plural, =0 {{newNum} new} =1{{newNum} new, 1 nova tentativa} other {{newNum} new, {reAttemptNum} novas tentativas}}}}',
			'newPostDetails': '{numInteractions, plural, =1 {1 conversa ou resposta} other {{numInteractions} conversas ou repostas}}',
			'newPosts': 'Novas postagens',
			'newSubmissionDetails': '{newNum, plural, =0 {{resub, plural, =1 {1 reenvio} other {{resub} reenvios}}} other {{resub, plural, =0 {{newNum} new} =1{{newNum} new, 1 reenvio} other {{newNum} new, {resub} reenvios}}}}',
			'newSubmissions': 'Novos Envios',
			'no': 'Não',
			'noCriteriaMatch': 'Não há nenhum envio correspondente aos seus critérios.',
			'noCriteriaMatchActivities': 'Não há nenhuma atividade correspondente aos seus critérios.',
			'noResults': 'Nenhum resultado aqui.',
			'noSubmissions': 'Não há envios que precisem de sua atenção.',
			'publishAll': 'Publicar Tudo',
			'publishAllConfirmDialogMessage': '{evaluated} pelos usuários {assigned} receberão comentários sobre a publicação. Deseja continuar?',
			'publishAllToastMessage': 'Avaliações de {activityName} publicadas com êxito.',
			'publishAllToastMessageTruncated': '{truncedActivityName}... Avaliações publicadas com êxito.',
			'published': 'Publicado',
			'quiz': 'Questionário',
			'search': 'Pesquisar',
			'searchResultsMore': '{num}+ resultados da pesquisa',
			'searchResultsMultiple': '{num} resultados da pesquisa',
			'searchResultsSingle': '1 resultado da pesquisa',
			'sortBy': 'Classificar por {columnName}',
			'submissionDate': 'Data do Envio',
			'submissionList': 'Lista de Envio',
			'submissions': 'Envios',
			'tableTitle': 'Lista de envios de alunos não avaliados de todos os cursos e ferramentas',
			'toggleIndicatorLabelActions': 'Executar ações em {target}',
			'toggleIndicatorLabelInfo': 'Visualizar informação em {target}',
			'tryAgain': 'Tentar novamente',
			'viewBy': 'Exibir por:',
			'yes': 'Sim'
		};
	}
};

export const LangPt = dedupingMixin(LangPtImpl);

