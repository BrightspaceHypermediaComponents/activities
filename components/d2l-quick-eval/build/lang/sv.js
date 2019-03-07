'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangSvImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.sv = {
			'activityName': 'Aktivitetsnamn',
			'courseName': 'Kurs',
			'displayName': 'Förnamn, efternamn',
			'failedToLoadData': 'Unable to load submissions. Try again in a few minutes.',
			'failedToLoadMore': 'Unable to load more submissions. Try again in a few minutes.',
			'loadMore': 'Ladda mer',
			'loading': 'Laddar',
			'masterTeacher': 'Master Teacher',
			'submissionDate': 'Inlämningsdatum',
			'tryAgain': 'Try Again'
		};
	}
};

export const LangSv = dedupingMixin(LangSvImpl);

