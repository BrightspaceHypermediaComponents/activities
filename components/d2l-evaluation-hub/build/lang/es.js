'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEsImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.es = {
			'activityName': 'Nombre de la actividad',
			'caughtUp': 'You\'re all caught up!',
			'checkBackOften': 'Check back often for new submissions.',
			'courseName': 'Curso',
			'displayName': 'Nombre Apellido',
			'failedToLoadData': 'Unable to load submissions. Try again in a few minutes.',
			'failedToLoadMore': 'Unable to load more submissions. Try again in a few minutes.',
			'loadMore': 'Cargar más',
			'loading': 'Cargando',
			'masterTeacher': 'Master Teacher',
			'noSubmissions': 'There are no submissions that need your attention.',
			'submissionDate': 'Fecha del material enviado',
			'tryAgain': 'Try Again'
		};
	}
};

export const LangEs = dedupingMixin(LangEsImpl);

