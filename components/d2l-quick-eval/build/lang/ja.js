'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangJaImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ja = {
			'activities': 'アクティビティ',
			'activityName': 'アクティビティ名',
			'assignment': 'Assignment',
			'caughtUp': '学習はすべて順調に進んでいます！',
			'checkBackOften': '新規送信物を頻繁にチェックしてください。',
			'clearSearch': '検索のクリア',
			'completed': 'Completed',
			'courseName': 'コース',
			'discussion': 'Discussion',
			'displayName': '名、姓',
			'due': 'Due: {date}',
			'evaluate': '{displayName} さんの評価',
			'evaluateAll': 'Evaluate All',
			'evaluated': 'Evaluated',
			'failedToFilter': 'フィルタを適用できません。しばらくしてからもう一度試してください。',
			'failedToLoadData': '送信物を読み込めません。しばらくしてからもう一度試してください。',
			'failedToLoadMore': 'これ以上送信物を読み込めません。しばらくしてからもう一度試してください。',
			'failedToSearch': '検索を適用できません。しばらくしてからもう一度試してください。',
			'firstName': '名',
			'lastName': '姓',
			'loadMore': 'さらに読み込む',
			'loading': '読み込み中',
			'masterTeacher': '講師',
			'noCriteriaMatch': '条件に一致する送信物はありません。',
			'noResults': 'ここには結果がありません。',
			'noSubmissions': '確認が必要な送信物はありません。',
			'publishAll': 'Publish All',
			'published': 'Published',
			'quiz': 'Quiz',
			'search': '検索',
			'searchResultsMore': '{num} 件以上の検索結果',
			'searchResultsMultiple': '{num} 件の検索結果',
			'searchResultsSingle': '1 件の検索結果',
			'sortBy': '{columnName} で並べ替え',
			'submissionDate': '送信日',
			'submissionList': 'Submission List',
			'submissions': '送信物',
			'tableTitle': 'コースやツールをまたいだ、受講者からの未評価の送信物リスト',
			'tryAgain': 'もう一度試してください',
			'unreadSubmissions': '{num} unread submissions',
			'unreadSubmissionsDetail': '{unread} new, {resub} resubmissions',
			'viewBy': '表示対象:'
		};
	}
};

export const LangJa = dedupingMixin(LangJaImpl);

