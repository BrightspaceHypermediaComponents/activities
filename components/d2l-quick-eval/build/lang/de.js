'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDeImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.de = {
			'activityName': 'Name der Aktivität',
			'courseName': 'Kurs',
			'displayName': 'Vorname, Nachname',
			'failedToLoadData': 'Unable to load submissions. Try again in a few minutes.',
			'failedToLoadMore': 'Unable to load more submissions. Try again in a few minutes.',
			'loadMore': 'Mehr laden',
			'loading': 'Wird geladen',
			'masterTeacher': 'Master Teacher',
			'submissionDate': 'Abgabedatum',
			'tryAgain': 'Try Again'
		};
	}
};

export const LangDe = dedupingMixin(LangDeImpl);

