'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangPtImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.pt = {
			'activityName': 'Nome da Atividade',
			'caughtUp': 'Você está em dia!',
			'checkBackOften': 'Verifique com frequência se há novos envios.',
			'clearSearch': 'Limpar Pesquisa',
			'courseName': 'Curso',
			'displayName': 'Nome e Sobrenome',
			'evaluate': 'Avaliar {displayName}',
			'failedToFilter': 'Não foi possível aplicar o filtro. Tente novamente em alguns minutos.',
			'failedToLoadData': 'Não foi possível carregar os envios. Tente novamente em alguns minutos.',
			'failedToLoadMore': 'Não foi possível carregar mais envios. Tente novamente em alguns minutos.',
			'failedToSearch': 'Não foi possível aplicar pesquisa. Tente novamente em alguns minutos.',
			'firstName': 'Nome',
			'lastName': 'Sobrenome',
			'loadMore': 'Carregar mais',
			'loading': 'Carregando',
			'masterTeacher': 'Professor',
			'noCriteriaMatch': 'Não há nenhum envio correspondente aos seus critérios.',
			'noResults': 'Nenhum resultado aqui.',
			'noSubmissions': 'Não há envios que precisem de sua atenção.',
			'search': 'Pesquisar',
			'searchResultsMore': '{num}+ Search Results',
			'searchResultsMultiple': '{num} resultados da pesquisa',
			'searchResultsSingle': '1 resultado da pesquisa',
			'sortBy': 'Classificar por {columnName}',
			'submissionDate': 'Data do Envio',
			'tableTitle': 'Lista de envios de alunos não avaliados de todos os cursos e ferramentas',
			'tryAgain': 'Tentar novamente'
		};
	}
};

export const LangPt = dedupingMixin(LangPtImpl);

