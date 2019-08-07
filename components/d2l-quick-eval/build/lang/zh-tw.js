'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhtwImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zhtw = {
			'activities': '活動',
			'activityName': '活動名稱',
			'assignment': '作業',
			'caughtUp': '您已趕上最新進度！',
			'checkBackOften': '請經常返回查看新的提交項目。',
			'clearSearch': '清除搜尋',
			'close': 'Close',
			'completed': '已完成',
			'confirmation': 'Confirmation',
			'courseName': '課程',
			'discussion': '討論',
			'displayName': '名字，姓氏',
			'due': '截止日期：{date}',
			'evaluate': '評估{displayName}',
			'evaluateAll': '全部評估',
			'evaluated': '已評估',
			'failedToFilter': '無法套用篩選器。請在幾分鐘後再試一次。',
			'failedToLoadData': '無法載入提交項目。請在幾分鐘後再試一次。',
			'failedToLoadMore': '無法載入更多提交項目。請在幾分鐘後再試一次。',
			'failedToSearch': '無法套用搜尋。請在幾分鐘後再試一次。',
			'firstName': '名字',
			'lastName': '姓氏',
			'loadMore': '載入更多',
			'loading': '正在載入',
			'masterTeacher': '教師',
			'no': 'No',
			'noCriteriaMatch': '沒有提交項目符合您的標準。',
			'noResults': '這裡沒有任何結果。',
			'noSubmissions': '沒有提交項目需要您注意。',
			'publishAll': '全部發佈',
			'publishAllConfirmDialogMessage': '{evaluated} out of {assigned} users will receive feedback on publishing. Do you want to continue?',
			'published': '已發佈',
			'quiz': '測驗',
			'search': '搜尋',
			'searchResultsMore': '{num}+ 個搜尋結果',
			'searchResultsMultiple': '{num} 個搜尋結果',
			'searchResultsSingle': '1 個搜尋結果',
			'sortBy': '排序方式：{columnName}',
			'submissionDate': '提交日期',
			'submissionList': '提交清單',
			'submissions': '提交項目',
			'tableTitle': '此清單包含所有課程和工具中未評估的學習者提交項目',
			'tryAgain': '再試一次',
			'newSubmissions': 'New Submissions',
			'newSubmissionDetails': '{newNum} new, {resub} resubmissions',
			'newPosts': 'New Posts',
			'newPostDetails': '{newNum} new, {resub} reposts',
			'newAttempts': 'New Attempts',
			'newAttemptsDetails': '{newNum} new',
			'viewBy': '檢視依據：',
			'yes': 'Yes'
		};
	}
};

export const LangZhtw = dedupingMixin(LangZhtwImpl);

