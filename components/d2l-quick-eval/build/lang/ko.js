'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangKoImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ko = {
			'activityName': '활동 이름',
			'courseName': '강의',
			'displayName': '이름, 성',
			'failedToLoadData': 'Unable to load submissions. Try again in a few minutes.',
			'failedToLoadMore': 'Unable to load more submissions. Try again in a few minutes.',
			'loadMore': '더 많이 로드',
			'loading': '로드 중',
			'masterTeacher': 'Master Teacher',
			'submissionDate': '제출일',
			'tryAgain': 'Try Again'
		};
	}
};

export const LangKo = dedupingMixin(LangKoImpl);

