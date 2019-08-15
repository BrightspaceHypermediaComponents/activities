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
			'close': 'Close',
			'completed': 'Concluído',
			'confirmation': 'Confirmation',
			'courseName': 'Curso',
			'discussion': 'Discussão',
			'displayName': 'Nome e Sobrenome',
			'due': 'Prazo: {date}',
			'evaluate': 'Avaliar {displayName}',
			'evaluateAll': 'Avaliar Tudo',
			'evaluated': 'Avaliado',
			'failedToFilter': 'Não foi possível aplicar o filtro. Tente novamente em alguns minutos.',
			'failedToLoadData': 'Não foi possível carregar os envios. Tente novamente em alguns minutos.',
			'failedToLoadMore': 'Não foi possível carregar mais envios. Tente novamente em alguns minutos.',
			'failedToSearch': 'Não foi possível aplicar pesquisa. Tente novamente em alguns minutos.',
			'firstName': 'Nome',
			'lastName': 'Sobrenome',
			'loadMore': 'Carregar mais',
			'loading': 'Carregando',
			'masterTeacher': 'Professor',
			'no': 'No',
			'noCriteriaMatch': 'Não há nenhum envio correspondente aos seus critérios.',
			'noCriteriaMatchActivities': 'There are no activities that match your criteria.',
			'noResults': 'Nenhum resultado aqui.',
			'noSubmissions': 'Não há envios que precisem de sua atenção.',
			'publishAll': 'Publicar Tudo',
			'publishAllConfirmDialogMessage': '{evaluated} out of {assigned} users will receive feedback on publishing. Do you want to continue?',
			'publishAllToastMessage': '{activityName} evaluations published successfully.',
			'publishAllToastMessageTruncated': '{truncatedActivityName}… evaluations published successfully.',
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
			'toggleIndicatorLabel': 'Perform Actions on {target}',
			'tryAgain': 'Tentar novamente',
			'newSubmissions': 'New Submissions',
			'newSubmissionDetails': '{newNum} new, {resub} resubmissions',
			'newSubmissionSingularDetails': '{newNum} new, 1 resubmission',
			'newPosts': 'New Posts',
			'newPostDetails': '{numInteractions} threads or replies',
			'newPostSingularDetails': '{numInteractions} thread or reply',
			'newAttempts': 'New Attempts',
			'newAttemptsDetails': '{newNum} new, {reAttemptNum} reattempts',
			'newAttemptsSingularReattemptDetails': '{newNum} new, 1 reattempt',
			'viewBy': 'Exibir por:',
			'yes': 'Yes'
		};
	}
};

export const LangPt = dedupingMixin(LangPtImpl);

