'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangPtImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.pt = {
			'activityName': 'Nome da Atividade',
			'courseName': 'Curso',
			'displayName': 'Nome e Sobrenome',
			'failedToLoadData': 'Unable to load submissions. Try again in a few minutes.',
			'failedToLoadMore': 'Unable to load more submissions. Try again in a few minutes.',
			'loadMore': 'Carregar mais',
			'loading': 'Carregando',
			'masterTeacher': 'Master Teacher',
			'submissionDate': 'Data do Envio',
			'tryAgain': 'Try Again'
		};
	}
};

export const LangPt = dedupingMixin(LangPtImpl);

