/* eslint quotes: 0 */

export default {
	"btnEditReleaseConditions": "リリース条件の編集", // edit release conditions button
	"btnAddReleaseCondition": "リリース条件の追加", // add release condition button
	"btnCreateNew": "新規作成", // create new button
	"btnAddExisting": "既存の追加", // add existing button
	"btnRemoveCondition": "条件の削除", // remove condition button
	"lblConditionsOperator": "この項目を見るには、次の条件を満たしている必要があります", // conditions operator label
	"txtNumReleaseConditions": "{count, plural, =1 {{count} 個のリリース条件} other {{count} 個のリリース条件}}", // num release condition text
	"btnCancel": "キャンセル", // cancel button
	"btnSave": "保存して閉じる", // save and close button
	"dueDate": "期限", // ARIA label for the due date field when creating/editing an activity
	"endDate": "終了日", // ARIA label for the end date field when creating/editing an activity
	"startDate": "開始日", // ARIA label for the start date field when creating/editing an activity
	"dueTime": "期限時刻", // ARIA label for the due time field when creating/editing an activity
	"endTime": "終了時刻", // ARIA label for the end time field when creating/editing an activity
	"startTime": "開始時刻", // ARIA label for the start time field when creating/editing an activity
	"hidden": "非表示", // Label displayed with the visibility switch when hidden
	"ariaHidden": "受講者に対して非表示", // Aria Label for the visibility switch when hidden
	"noDueDate": "期限がありません", // Placeholder text for due date field when no due date is set
	"noEndDate": "終了日がありません", // Placeholder text for due date field when no due date is set
	"noStartDate": "開始日がありません", // Placeholder text for due date field when no due date is set
	"visible": "表示", // Label displayed with the visibility switch when visible
	"ariaVisible": "受講者に表示", // Aria Label for the visibility switch when visible
	"txtAvailabilityStartAndEnd": "使用可能期間開始日 {startDate}、終了日 {endDate}", // start/end text
	"txtAvailabilityStartOnly": "使用可能期間開始日 {startDate}", // start only text
	"txtAvailabilityEndOnly": "使用可能期間終了日 {endDate}", // end only text
	"txtAvailabilityNeither": "常に使用可能", // always available text
	"ungraded": "成績評価なし", // State of score field when there is no score and no grade item, when creating/editing an activity
	"inGrades": "成績にあり", // State of the grades field when there is a score, and an associated grade item
	"notInGrades": "成績になし", // State of the grades field when there is a score, but no associated grade item
	"addToGrades": "成績に追加", // Menu item for adding grade association
	"addAGrade": "成績の追加", //ARIA label to add a grade to the activity
	"removeFromGrades": "成績から削除", // Menu item for removing grade association
	"setUngraded": "成績評価なしにリセット", // Menu item for setting the activity to ungraded
	"scoreOutOf": "満点スコア", // ARIA label for the score out of field, when creating/editing an activity
	"emptyScoreOutOfError": "成績にあるアクティビティについてポイント値を指定する必要があります", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"invalidScoreOutOfError": "満点スコアは 0.01 以上 9,999,999,999 以下の数値にする必要があります。", // Error message when an invalid score out of value is entered
	"loading": "読み込み中...", // Message displayed while page is loading
	"ok": "OK", // Text of dialog button to commit action
	"cancel": "キャンセル", // Text of dialog button to cancel action
	"ariaToolbarShortcutInstructions": "ツールバーを表示するには ALT-F10 キーを、ツールバーを終了するにはツールバーにカーソルを置いた状態で ESC キーを押します。", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"chooseFromGrades": "成績から選択", // Link text and dialog title for the edit grades dialog,
	"hdrRubrics": "注釈", //Header for the rubrics section
	"startBeforeEndDate": "開始日は終了日の前である必要があります",
	"dueBetweenStartEndDate": "期限は開始日の後および終了日以前である必要があります",
	"dueAfterStartDate": "期限は開始日の後である必要があります",
	"dueBeforeEndDate": "期限は終了日以前である必要があります",
	"createAndLinkToNewGradeItem": "新規成績項目の作成および新規成績項目へのリンク", //Radio button text
	"linkToExistingGradeItem": "既存の成績項目へのリンク", //Radio button text
	"points": "ポイント: {points}", // Text label for displaying points of a grade
	"noGradeItems": "既存の成績項目がありません", // Reason why existing grade items cannot be linked in the choose grades dialog
	"noGradeCreatePermission": "新規成績項目を作成する権限がありません" // Reason why a new grade items cannot be created in the choose grades dialog
};
