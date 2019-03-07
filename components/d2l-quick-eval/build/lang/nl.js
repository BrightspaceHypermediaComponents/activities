'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangNlImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.nl = {
			'activityName': 'Naam activiteit',
			'courseName': 'Cursus',
			'displayName': 'Voornaam, achternaam',
			'failedToLoadData': 'Unable to load submissions. Try again in a few minutes.',
			'failedToLoadMore': 'Unable to load more submissions. Try again in a few minutes.',
			'loadMore': 'Meer laden',
			'loading': 'Laden',
			'masterTeacher': 'Master Teacher',
			'submissionDate': 'Datum van indiening',
			'tryAgain': 'Try Again'
		};
	}
};

export const LangNl = dedupingMixin(LangNlImpl);

