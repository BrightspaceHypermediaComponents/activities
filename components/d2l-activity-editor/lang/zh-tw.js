/* eslint quotes: 0 */

export default {
	"btnEditReleaseConditions": "編輯發佈條件", // edit release conditions button
	"btnAddReleaseCondition": "新增發佈條件", // add release condition button
	"btnCreateNew": "建立新的", // create new button
	"btnAddExisting": "新增現有的", // add existing button
	"btnRemoveCondition": "移除條件", // remove condition button
	"lblConditionsOperator": "如果要檢視此項目，使用者必須符合", // conditions operator label
	"txtNumReleaseConditions": "{count, plural, =1 {{count} 個發佈條件} other {{count} 個發佈條件}}", // num release condition text
	"btnCancel": "取消", // cancel button
	"btnSave": "儲存並關閉", // save and close button
	"btnSaveMobile": "儲存", // save and close button for mobile devices
	"dueDate": "截止日期", // ARIA label for the due date field when creating/editing an activity
	"endDate": "結束日期", // ARIA label for the end date field when creating/editing an activity
	"startDate": "開始日期", // ARIA label for the start date field when creating/editing an activity
	"dueTime": "截止時間", // ARIA label for the due time field when creating/editing an activity
	"endTime": "結束時間", // ARIA label for the end time field when creating/editing an activity
	"startTime": "開始時間", // ARIA label for the start time field when creating/editing an activity
	"hidden": "已隱藏", // Label displayed with the visibility switch when hidden
	"noDueDate": "沒有截止日期", // Placeholder text for due date field when no due date is set
	"noEndDate": "沒有結束日期", // Placeholder text for due date field when no due date is set
	"noStartDate": "沒有開始日期", // Placeholder text for due date field when no due date is set
	"visible": "顯示", // Label displayed with the visibility switch when visible
	"txtAvailabilityStartAndEnd": "可用情況開始於 {startDate} 並結束於 {endDate}", // start/end text
	"txtAvailabilityStartOnly": "可用情況開始於 {startDate}", // start only text
	"txtAvailabilityEndOnly": "可用情況結束於 {endDate}", // end only text
	"txtAvailabilityNeither": "一律可用", // always available text
	"ungraded": "未評分", // State of score field when there is no score and no grade item, when creating/editing an activity
	"inGrades": "在「成績」中", // State of the grades field when there is a score, and an associated grade item
	"notInGrades": "未在「成績」中", // State of the grades field when there is a score, but no associated grade item
	"addToGrades": "新增至「成績」", // Menu item for adding grade association
	"addAGrade": "新增成績", //ARIA label to add a grade to the activity
	"removeFromGrades": "自「成績」中移除", // Menu item for removing grade association
	"setUngraded": "重設為未評分", // Menu item for setting the activity to ungraded
	"scoreOutOf": "總分", // ARIA label for the score out of field, when creating/editing an activity
	"emptyScoreOutOfError": "「成績」中的活動必須指定分數值", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"invalidScoreOutOfError": "「總分」必須大於或等於 0.01，並小於或等於 9,999,999,999", // Error message when an invalid score out of value is entered
	"loading": "正在載入...", // Message displayed while page is loading
	"ok": "確定", // Text of dialog button to commit action
	"cancel": "取消", // Text of dialog button to cancel action
	"ariaToolbarShortcutInstructions": "按下 ALT-F10 可存取工具列，按下 ESC 可退出工具列。", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"chooseFromGrades": "從「成績」中選擇", // Link text and dialog title for the edit grades dialog,
	"hdrRubrics": "量規", //Header for the rubrics section
	"startBeforeEndDate": "開始日期必須在結束日期之前",
	"dueBetweenStartEndDate": "截止日期必須在開始日期之後，並在結束日期當日或之前",
	"dueAfterStartDate": "截止日期必須在開始日期之後",
	"dueBeforeEndDate": "截止日期必須在結束日期當日或之前",
	"createAndLinkToNewGradeItem": "建立並連結至新的成績項目", //Radio button text
	"linkToExistingGradeItem": "連結至現有成績項目", //Radio button text
	"points": "分數：{points}", // Text label for displaying points of a grade
	"noGradeItems": "無現有成績項目", // Reason why existing grade items cannot be linked in the choose grades dialog
	"noGradeCreatePermission": "您沒有建立新成績項目的權限", // Reason why a new grade items cannot be created in the choose grades dialog
	"competencies": "學習目標", //Text label for the competencies tool integration
	"manageCompetencies": "管理學習目標", //Button text to launch competencies tool dialog
	"competenciesCount": "{count, plural, =0 {沒有學習目標} =1 {已附加 1 項} other {已附加 {count} 項}}", //Label for number of associated competencies
	"competenciesCountSummary": "{count, plural, =0 {沒有學習目標} =1 {1 個學習目標} other {{count} 個學習目標}}",
	"unevaluatedCompetencies": "{count, plural, =1 {缺少 1 項評量} other {缺少 {count} 項評量}}", //Label for number of unevalated associated competencies
	"btnClose": "關閉", //Label for Close button
	"btnCloseDialog": "關閉此對話方塊" // close dialog button
};
