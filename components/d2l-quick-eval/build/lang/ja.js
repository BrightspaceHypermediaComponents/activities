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
			'close': '閉じる',
			'completed': '完了',
			'confirmation': '確認',
			'courseName': 'コース',
			'discussion': 'ディスカッション',
			'displayName': '名、姓',
			'due': '期限: {date}',
			'evaluate': '{displayName} さんの評価',
			'evaluateAll': 'すべて評価',
			'evaluated': '評価済み',
			'failedToFilter': 'フィルタを適用できません。しばらくしてからもう一度試してください。',
			'failedToLoadActivities': 'アクティビティを読み込めません。しばらくしてからもう一度試してください。',
			'failedToLoadData': '送信物を読み込めません。しばらくしてからもう一度試してください。',
			'failedToLoadMore': 'これ以上送信物を読み込めません。しばらくしてからもう一度試してください。',
			'failedToSearch': '検索を適用できません。しばらくしてからもう一度試してください。',
			'firstName': '名',
			'lastName': '姓',
			'loadMore': 'さらに読み込む',
			'loading': '読み込み中',
			'masterTeacher': '講師',
			'newAttempts': '新しい試行',
			'newAttemptsDetails': '{newNum, plural, =0 {{reAttemptNum, plural, =1 {1 回の再試行} other {{reAttemptNum} 回の再試行}}} other {{reAttemptNum, plural, =0 {{newNum} new} =1{{newNum} 新しい 1 回の再試行} other {{newNum} 新しい {reAttemptNum} 回の再試行}}}}',
			'newPostDetails': '{numInteractions, plural, =1 {1 個のスレッドまたは返信} other {{numInteractions} 個のスレッドまたは返信}}',
			'newPosts': '新規投稿',
			'newSubmissionDetails': '{newNum, plural, =0 {{resub, plural, =1 {1 件の再送信} other {{resub} 件の再送信}}} other {{resub, plural, =0 {{newNum} new} =1{{newNum} 新しい 1 件の再送信} other {{newNum} 新しい {resub} 件の再送信}}}}',
			'newSubmissions': '新規送信',
			'no': 'いいえ',
			'noCriteriaMatch': '条件に一致する送信物はありません。',
			'noCriteriaMatchActivities': '条件に一致するアクティビティはありません。',
			'noResults': 'ここには結果がありません。',
			'noSubmissions': '確認が必要な送信物はありません。',
			'publishAll': 'すべて公開',
			'publishAllConfirmDialogMessage': '{assigned} 人中 {evaluated} 人のユーザーが、公開に関するフィードバックを受け取ります。続行しますか？',
			'publishAllToastMessage': '{activityName} の評価が正常に発行されました。',
			'publishAllToastMessageTruncated': '{truncatedActivityName}… の評価が正常に発行されました。',
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
			'toggleIndicatorLabel': '{target} のアクションの実行',
			'tryAgain': 'もう一度試してください',
			'viewBy': '表示対象:',
			'yes': 'はい'
		};
	}
};

export const LangJa = dedupingMixin(LangJaImpl);

