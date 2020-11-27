/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "编辑发布条件", // edit release conditions button
	"editor.btnAddReleaseCondition": "添加发布条件", // add release condition button
	"editor.btnCreateNew": "新建", // create new button
	"editor.btnAddExisting": "添加现有", // add existing button
	"editor.btnRemoveCondition": "删除条件", // remove condition button
	"editor.lblConditionsOperator": "若要访问此项目，用户必须满足以下条件", // conditions operator label
	"editor.txtConditionAdded": "已添加条件：{title}",
	"editor.txtConditionRemoved": "已移除条件：{title}",
	"editor.txtConditionsAdded": "添加了 {count} 个条件",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} 个发布条件} other {{count} 个发布条件}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {1 位具有特殊访问权限的用户} other {{userCount} 位具有特殊访问权限的用户}}", // num users with special access text
	"editor.btnCancel": "取消", // cancel button
	"editor.btnSave": "保存并关闭", // save and close button
	"editor.btnSaveMobile": "保存", // save and close button for mobile devices
	"editor.dueDate": "截止日期", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "结束日期", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "开始日期", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "截止时间", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "结束时间", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "开始时间", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "隐藏", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "无截止日期", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "无结束日期", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "无开始日期", // Placeholder text for due date field when no due date is set
	"editor.visible": "可见", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "可用开始日期 {startDate} 和结束日期 {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "可用开始日期 {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "可用结束日期 {endDate}", // end only text
	"editor.txtAvailabilityNeither": "始终可用", // always available text
	"editor.ungraded": "无成绩", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "在成绩中", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "不在成绩中", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "添加至成绩", // Menu item for adding grade association
	"editor.addAGrade": "添加成绩", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "从成绩中删除", // Menu item for removing grade association
	"editor.setUngraded": "重置为无成绩", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "总分", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "必须为“成绩”中的活动指定分数值", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "总分必须大于或等于 0.01，同时小于或等于 9,999,999,999", // Error message when an invalid score out of value is entered
	"editor.loading": "正在加载...", // Message displayed while page is loading
	"editor.ok": "确定", // Text of dialog button to commit action
	"editor.cancel": "取消", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "按 ALT-F10 可调用工具栏；按 ESC 可退出正在使用的工具栏。", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "从成绩中选择", // Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "量规", //Header for the rubrics section
	"editor.startBeforeEndDate": "开始日期必须早于结束日期",
	"editor.dueBetweenStartEndDate": "截止日期必须晚于开始日期且早于或等于结束日期",
	"editor.dueAfterStartDate": "截止日期必须晚于开始日期",
	"editor.dueBeforeEndDate": "截止日期不能晚于结束日期",
	"editor.createAndLinkToNewGradeItem": "创建并链接到新成绩项目", //Radio button text
	"editor.linkToExistingGradeItem": "链接到现有成绩项目", //Radio button text
	"editor.points": "分数：{points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "无现有成绩项目", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "您没有权限创建新的成绩项目", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "学习目标", //Text label for the competencies tool integration
	"editor.manageCompetencies": "管理学习目标", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1 个附件} other {{count} 个附件}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "没有学习目标", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 个学习目标} other {{count} 个学习目标}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 个评估缺失} other {{count} 个评估缺失}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "关闭", //Label for Close button
	"editor.btnCloseDialog": "关闭此对话框", // close dialog button
	"editor.btnManageSpecialAccess": "管理特殊访问权限", // manage special access button
	"editor.specialAccessRestrictedText": "仅具有特殊访问权限的用户才能查看此文件夹", // restricted special access description
	"editor.specialAccessNotRestrictedText": "用户可以在正常可用日期之外提交", // not restricted special access description
	"editor.specialAccessCount": "{count, plural, =1 {1 位用户} other {{count} 位用户}} 具有特殊访问权限", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "没有用户", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "管理特殊访问权限", // Dialog title
	"editor.specialAccessHidden": "按特殊访问权限隐藏", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "放弃更改？", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "是否确定要放弃您所做的更改？", // Discard Changes User Prompt
	"editor.yesLabel": "是",
	"editor.noLabel": "否",

	"rubrics.btnAddRubric": "添加量规", //text for add rubric button
	"rubrics.btnCreateNew": "新建", //Text for create new dropdown
	"rubrics.btnAddExisting": "添加现有", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "量规", //Header for the rubrics section
	"rubrics.btnAttachRubric": "附加量规", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "取消", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "添加现有", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "未添加量规", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {添加了 1 个量规} other {添加了 {count} 个量规}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "删除量规", // Text for deleting rubric icon
	"rubrics.btnClose": "关闭", // X button for exiting the create new rubric overlay
	"rubrics.txtRubricAdded": "量规已添加", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "量规已移除", // Text for notifying screenreader rubric was removed
	"rubrics.defaultScoringRubric": "默认评分量规", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "无已选择的默认值", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "分数：{points}", // Text label for displaying points of a grade
	"grades.weight": "权重：{weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "成绩项目", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.newGradeItemCategory": "成绩类别", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "无类别", // Category dropdown text for not selecting a category

	"attachments.addGoogleDriveLink": "从 Google Drive 附加", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "文件上传", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "附加网页链接", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "从 OneDrive 附加", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "将链接附加至现有活动", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "返回", // Text for a back button
	"attachments.closeDialog": "关闭对话框", // ARIA text for button to close dialog
	"attachments.recordAudio": "录制音频", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "录像", // Text for a button that opens a dialog to record video
	"attachments.save": "保存", // Text for a save button,
	"attachments.attach": "附加", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "文件上传", // Attach menu item text
	"attachments.addLinkMenu": "网页链接", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "现有活动", // Attach menu item text

	"content.name": "名称", // Text label for name input field
	"content.emptyNameField": "需要提供名称", // Error text that appears below name field when it is left empty
	"content.description": "描述", // Text label for description input field
	"content.availabilityHeader": "可用日期", // availability header
	"content.saveError": "您的内容项目未保存。请更正以红色标出的字段。", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.addDueDate": "添加截止日期" // Text label for name input field
};
