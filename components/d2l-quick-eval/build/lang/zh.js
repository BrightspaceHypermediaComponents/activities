'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zh = {
			'activityName': '活动名称',
			'courseName': '课程',
			'displayName': '名字，姓氏',
			'failedToLoadData': 'Unable to load submissions. Try again in a few minutes.',
			'failedToLoadMore': 'Unable to load more submissions. Try again in a few minutes.',
			'loadMore': '加载更多',
			'loading': '正在加载',
			'masterTeacher': 'Master Teacher',
			'submissionDate': '提交日期',
			'tryAgain': 'Try Again'
		};
	}
};

export const LangZh = dedupingMixin(LangZhImpl);

