'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fr = {
			'activityName': 'Nom de l\'activité',
			'courseName': 'Cours',
			'displayName': 'Prénom et Nom de famille',
			'failedToLoadData': 'Unable to load submissions. Try again in a few minutes.',
			'failedToLoadMore': 'Unable to load more submissions. Try again in a few minutes.',
			'loadMore': 'En voir plus',
			'loading': 'Chargement',
			'masterTeacher': 'Master Teacher',
			'submissionDate': 'Date de soumission',
			'tryAgain': 'Try Again'
		};
	}
};

export const LangFr = dedupingMixin(LangFrImpl);

