'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zh = {
			'activityName': '活动名称',
			'caughtUp': '您已跟上进度！',
			'checkBackOften': '请稍后时常查看新的提交。',
			'clearSearch': '清除搜索',
			'courseName': '课程',
			'displayName': '名字，姓氏',
			'evaluate': '评估 {displayName}',
			'failedToFilter': '无法应用筛选器。请在几分钟后重试。',
			'failedToLoadData': '无法加载提交。请在几分钟后重试。',
			'failedToLoadMore': '无法加载更多提交。请在几分钟后重试。',
			'failedToSearch': '无法应用筛选器。请在几分钟后重试。',
			'firstName': '名字',
			'lastName': '姓氏',
			'loadMore': '加载更多',
			'loading': '正在加载',
			'masterTeacher': '教师',
			'noCriteriaMatch': '没有与筛选条件匹配的提交。',
			'noResults': '此处没有结果。',
			'noSubmissions': '没有需要您注意的提交。',
			'search': '搜索',
			'searchResultsMore': '{num}+ Search Results',
			'searchResultsMultiple': 'LOR 搜索结果',
			'searchResultsSingle': '个搜索结果',
			'sortBy': 'Sort by {columnName}',
			'submissionDate': '提交日期',
			'tableTitle': '来自各个课程和工具的未评估学员提交的列表',
			'tryAgain': '请重试'
		};
	}
};

export const LangZh = dedupingMixin(LangZhImpl);

