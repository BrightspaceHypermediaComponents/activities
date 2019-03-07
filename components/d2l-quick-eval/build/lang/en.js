'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEnImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.en = {
			'activityName': 'Activity Name',
			'courseName': 'Course',
			'displayName': 'First Name, Last Name',
			'failedToLoadData': 'Unable to load submissions. Try again in a few minutes.',
			'failedToLoadMore': 'Unable to load more submissions. Try again in a few minutes.',
			'loading': 'Loading',
			'loadMore': 'Load more',
			'masterTeacher': 'Master Teacher',
			'submissionDate': 'Submission Date',
			'tryAgain': 'Try Again'
		};
	}
};

export const LangEn = dedupingMixin(LangEnImpl);

