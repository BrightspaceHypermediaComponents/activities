'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zh = {
			'activities': '活动',
			'activityName': '活动名称',
			'assignment': '作业',
			'caughtUp': '您已跟上进度！',
			'checkBackOften': '请稍后时常查看新的提交。',
			'clearSearch': '清除搜索',
			'completed': '已完成',
			'courseName': '课程',
			'discussion': '讨论',
			'displayName': '名字，姓氏',
			'due': '截止日期：{date}',
			'evaluate': '评估 {displayName}',
			'evaluateAll': '全部评估',
			'evaluated': '已评估',
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
			'publishAll': '全部发布',
			'published': '已发布',
			'quiz': '测验',
			'search': '搜索',
			'searchResultsMore': '{num}+ 搜索结果',
			'searchResultsMultiple': 'LOR 搜索结果',
			'searchResultsSingle': '个搜索结果',
			'sortBy': 'Sort by {columnName}',
			'submissionDate': '提交日期',
			'submissionList': '提交列表',
			'submissions': '提交',
			'tableTitle': '来自各个课程和工具的未评估学员提交的列表',
			'tryAgain': '请重试',
			'newSubmissions': 'New Submissions',
			'newSubmissionDetails': '{newNum} new, {resub} resubmissions',
			'newPosts': 'New Posts',
			'newPostDetails': '{newNum} new, {resub} reposts',
			'newAttempts': 'New Attempts',
			'newAttemptsDetails': '{newNum} new',
			'viewBy': '查看方式：'
		};
	}
};

export const LangZh = dedupingMixin(LangZhImpl);

