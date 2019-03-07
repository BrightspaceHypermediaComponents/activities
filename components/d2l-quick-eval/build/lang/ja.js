'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangJaImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ja = {
			'activityName': 'アクティビティ名',
			'courseName': 'コース',
			'displayName': '名, 姓',
			'failedToLoadData': 'Unable to load submissions. Try again in a few minutes.',
			'failedToLoadMore': 'Unable to load more submissions. Try again in a few minutes.',
			'loadMore': 'さらに読み込む',
			'loading': '読み込み中',
			'masterTeacher': 'Master Teacher',
			'submissionDate': '送信日',
			'tryAgain': 'Try Again'
		};
	}
};

export const LangJa = dedupingMixin(LangJaImpl);

