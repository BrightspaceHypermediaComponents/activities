/* eslint quotes: 0 */

export default {
	"btnEditReleaseConditions": "编辑发布条件", // edit release conditions button
	"btnAddReleaseCondition": "添加发布条件", // add release condition button
	"btnCreateNew": "新建", // create new button
	"btnAddExisting": "添加现有", // add existing button
	"btnRemoveCondition": "删除条件", // remove condition button
	"lblConditionsOperator": "若要访问此项目，用户必须满足以下条件", // conditions operator label
	"txtNumReleaseConditions": "{count, plural, =1 {{count} 个发布条件} other {{count} 个发布条件}}", // num release condition text
	"btnCancel": "取消", // cancel button
	"btnSave": "保存并关闭", // save and close button
	"btnSaveMobile": "保存", // save and close button for mobile devices
	"dueDate": "截止日期", // ARIA label for the due date field when creating/editing an activity
	"endDate": "结束日期", // ARIA label for the end date field when creating/editing an activity
	"startDate": "开始日期", // ARIA label for the start date field when creating/editing an activity
	"dueTime": "截止时间", // ARIA label for the due time field when creating/editing an activity
	"endTime": "结束时间", // ARIA label for the end time field when creating/editing an activity
	"startTime": "开始时间", // ARIA label for the start time field when creating/editing an activity
	"hidden": "隐藏", // Label displayed with the visibility switch when hidden
	"ariaHidden": "对学员不可见", // Aria Label for the visibility switch when hidden
	"noDueDate": "无截止日期", // Placeholder text for due date field when no due date is set
	"noEndDate": "无结束日期", // Placeholder text for due date field when no due date is set
	"noStartDate": "无开始日期", // Placeholder text for due date field when no due date is set
	"visible": "可见", // Label displayed with the visibility switch when visible
	"ariaVisible": "对学员可见", // Aria Label for the visibility switch when visible
	"txtAvailabilityStartAndEnd": "可用开始日期 {startDate} 和结束日期 {endDate}", // start/end text
	"txtAvailabilityStartOnly": "可用开始日期 {startDate}", // start only text
	"txtAvailabilityEndOnly": "可用结束日期 {endDate}", // end only text
	"txtAvailabilityNeither": "始终可用", // always available text
	"ungraded": "无成绩", // State of score field when there is no score and no grade item, when creating/editing an activity
	"inGrades": "在成绩中", // State of the grades field when there is a score, and an associated grade item
	"notInGrades": "不在成绩中", // State of the grades field when there is a score, but no associated grade item
	"addToGrades": "添加至成绩", // Menu item for adding grade association
	"addAGrade": "添加成绩", //ARIA label to add a grade to the activity
	"removeFromGrades": "从成绩中删除", // Menu item for removing grade association
	"setUngraded": "重置为无成绩", // Menu item for setting the activity to ungraded
	"scoreOutOf": "总分", // ARIA label for the score out of field, when creating/editing an activity
	"emptyScoreOutOfError": "必须为“成绩”中的活动指定分数值", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"invalidScoreOutOfError": "总分必须大于或等于 0.01，同时小于或等于 9,999,999,999", // Error message when an invalid score out of value is entered
	"loading": "正在加载...", // Message displayed while page is loading
	"ok": "确定", // Text of dialog button to commit action
	"cancel": "取消", // Text of dialog button to cancel action
	"ariaToolbarShortcutInstructions": "按 ALT-F10 可调用工具栏；按 ESC 可退出正在使用的工具栏。", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"chooseFromGrades": "从成绩中选择", // Link text and dialog title for the edit grades dialog,
	"hdrRubrics": "量规", //Header for the rubrics section
	"startBeforeEndDate": "开始日期必须早于结束日期",
	"dueBetweenStartEndDate": "截止日期必须晚于开始日期且早于或等于结束日期",
	"dueAfterStartDate": "截止日期必须晚于开始日期",
	"dueBeforeEndDate": "截止日期不能晚于结束日期",
	"createAndLinkToNewGradeItem": "创建并链接到新成绩项目", //Radio button text
	"linkToExistingGradeItem": "链接到现有成绩项目", //Radio button text
	"points": "分数：{points}", // Text label for displaying points of a grade
	"noGradeItems": "无现有成绩项目", // Reason why existing grade items cannot be linked in the choose grades dialog
	"noGradeCreatePermission": "您没有权限创建新的成绩项目", // Reason why a new grade items cannot be created in the choose grades dialog
	"competencies": "学习目标", //Text label for the competencies tool integration
	"manageCompetencies": "管理学习目标", //Button text to launch competencies tool dialog
	"competenciesCount": "{count, plural, =0 {No learning objectives} =1 {1 attached} other {{count} attached}}", //Label for number of associated competencies
	"competenciesCountSummary": "{count, plural, =0 {无学习目标} =1 {1 个学习目标} 其他 {{count} 个学习目标}}",
	"unevaluatedCompetencies": "{count, plural, =1 {1 not being evaluated} other {{count} not being evaluated}}", //Label for number of unevalated associated competencies
	"btnClose": "关闭", //Label for Close button
	"btnCloseDialog": "关闭此对话框" // close dialog button
};
