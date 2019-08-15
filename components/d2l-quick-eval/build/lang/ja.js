'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangJaImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ja = {
			'activities': 'アクティビティ',
			'activityName': 'アクティビティ名',
			'assignment': '課題',
			'caughtUp': '学習はすべて順調に進んでいます！',
			'checkBackOften': '新規送信物を頻繁にチェックしてください。',
			'clearSearch': '検索のクリア',
			'close': 'Close',
			'completed': '完了',
			'confirmation': 'Confirmation',
			'courseName': 'コース',
			'discussion': 'ディスカッション',
			'displayName': '名、姓',
			'due': '期限: {date}',
			'evaluate': '{displayName} さんの評価',
			'evaluateAll': 'すべて評価',
			'evaluated': '評価済み',
			'failedToFilter': 'フィルタを適用できません。しばらくしてからもう一度試してください。',
			'failedToLoadData': '送信物を読み込めません。しばらくしてからもう一度試してください。',
			'failedToLoadMore': 'これ以上送信物を読み込めません。しばらくしてからもう一度試してください。',
			'failedToSearch': '検索を適用できません。しばらくしてからもう一度試してください。',
			'firstName': '名',
			'lastName': '姓',
			'loadMore': 'さらに読み込む',
			'loading': '読み込み中',
			'masterTeacher': '講師',
			'no': 'No',
			'noCriteriaMatch': '条件に一致する送信物はありません。',
			'noCriteriaMatchActivities': 'There are no activities that match your criteria.',
			'noResults': 'ここには結果がありません。',
			'noSubmissions': '確認が必要な送信物はありません。',
			'publishAll': 'すべて公開',
			'publishAllConfirmDialogMessage': '{evaluated} out of {assigned} users will receive feedback on publishing. Do you want to continue?',
			'publishAllToastMessage': '{activityName} evaluations published successfully.',
			'publishAllToastMessageTruncated': '{truncatedActivityName}… evaluations published successfully.',
			'published': '公開済み',
			'quiz': 'クイズ',
			'search': '検索',
			'searchResultsMore': '{num} 件以上の検索結果',
			'searchResultsMultiple': '{num} 件の検索結果',
			'searchResultsSingle': '1 件の検索結果',
			'sortBy': '{columnName} で並べ替え',
			'submissionDate': '送信日',
			'submissionList': '送信リスト',
			'submissions': '送信物',
			'tableTitle': 'コースやツールをまたいだ、受講者からの未評価の送信物リスト',
			'toggleIndicatorLabel': 'Perform Actions on {target}',
			'tryAgain': 'もう一度試してください',
			'newSubmissions': 'New Submissions',
			'newSubmissionDetails': '{newNum} new, {resub} resubmissions',
			'newPosts': 'New Posts',
			'newPostDetails': '{numInteractions} threads or replies',
			'newAttempts': 'New Attempts',
			'newAttemptsDetails': '{newNum} new, {reAttemptNum} reattempts',
			'newAttemptsSingularReattemptDetails': '{newNum} new, 1 reattempt',
			'viewBy': '表示対象:',
			'yes': 'Yes'
		};
	}
};

export const LangJa = dedupingMixin(LangJaImpl);

