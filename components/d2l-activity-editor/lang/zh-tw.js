/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "編輯發佈條件", // edit release conditions button
	"editor.btnAddReleaseCondition": "新增發佈條件", // add release condition button
	"editor.btnCreateNew": "建立新的", // create new button
	"editor.btnAddExisting": "新增現有的", // add existing button
	"editor.btnRemoveCondition": "移除條件", // remove condition button
	"editor.lblConditionsOperator": "如果要檢視此項目，使用者必須符合", // conditions operator label
	"editor.txtConditionAdded": "已新增條件：{title}",
	"editor.txtConditionRemoved": "已移除條件：{title}",
	"editor.txtConditionsAdded": "已新增 {count} 個條件",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} 個發佈條件} other {{count} 個發佈條件}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {1 位使用者具有特殊存取權限} other {{userCount} 位使用者具有特殊存取權限}}", // num users with special access text
	"editor.btnCancel": "取消", // cancel button
	"editor.btnSave": "儲存並關閉", // save and close button
	"editor.btnSaveMobile": "儲存", // save and close button for mobile devices
	"editor.dueDate": "截止日期", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "結束日期", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "開始日期", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "截止時間", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "結束時間", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "開始時間", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "已隱藏", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "沒有截止日期", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "沒有結束日期", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "沒有開始日期", // Placeholder text for due date field when no due date is set
	"editor.visible": "顯示", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "可用情況開始於 {startDate} 並結束於 {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "可用情況開始於 {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "可用情況結束於 {endDate}", // end only text
	"editor.txtAvailabilityNeither": "一律可用", // always available text
	"editor.ungraded": "未評分", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "在「成績」中", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "未在「成績」中", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "新增至「成績」", // Menu item for adding grade association
	"editor.addAGrade": "新增成績", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "自「成績」中移除", // Menu item for removing grade association
	"editor.setUngraded": "重設為未評分", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "總分", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "「成績」中的活動必須指定分數值", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "「總分」必須大於或等於 0.01，並小於或等於 9,999,999,999", // Error message when an invalid score out of value is entered
	"editor.loading": "正在載入...", // Message displayed while page is loading
	"editor.ok": "確定", // Text of dialog button to commit action
	"editor.cancel": "取消", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "按下 ALT-F10 可存取工具列，按下 ESC 可退出工具列 (若已進入)。", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "從「成績」中選擇", // Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "量規", //Header for the rubrics section
	"editor.startBeforeEndDate": "開始日期必須在結束日期之前",
	"editor.dueBetweenStartEndDate": "截止日期必須在開始日期之後，並在結束日期當日或之前",
	"editor.dueAfterStartDate": "截止日期必須在開始日期之後",
	"editor.dueBeforeEndDate": "截止日期必須在結束日期當日或之前",
	"editor.createAndLinkToNewGradeItem": "建立並連結至新的成績項目", //Radio button text
	"editor.linkToExistingGradeItem": "連結至現有成績項目", //Radio button text
	"editor.points": "分數：{points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "無現有成績項目", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "您沒有建立新成績項目的權限", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "學習目標", //Text label for the competencies tool integration
	"editor.manageCompetencies": "管理學習目標", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1 個已附加} other {{count} 個已附加}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "沒有學習目標", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 個學習目標} other {{count} 個學習目標}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {缺少 1 項評量} other {缺少 {count} 項評量}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "關閉", //Label for Close button
	"editor.btnCloseDialog": "關閉此對話方塊", // close dialog button
	"editor.btnManageSpecialAccess": "管理特殊存取權限", // manage special access button
	"editor.specialAccessRestrictedText": "僅具有特殊存取權限的使用者可檢視此資料夾", // restricted special access description
	"editor.specialAccessNotRestrictedText": "使用者可於正常可用情況日期之外提交", // not restricted special access description
	"editor.specialAccessCount": "{count, plural, =1 {1 位使用者} other {{count} 位使用者}} 具有特殊存取權限", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "沒有使用者", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "管理特殊存取權限", // Dialog title
	"editor.specialAccessHidden": "由特殊存取權限隱藏", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "捨棄變更？", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "確定要捨棄您的變更？", // Discard Changes User Prompt
	"editor.yesLabel": "是",
	"editor.noLabel": "否",

	"rubrics.btnAddRubric": "新增量規", //text for add rubric button
	"rubrics.btnCreateNew": "建立新的", //Text for create new dropdown
	"rubrics.btnAddExisting": "新增現有的", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "量規", //Header for the rubrics section
	"rubrics.btnAttachRubric": "附加量規", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "取消", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "新增現有的", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "未新增量規", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {已新增 1 個量規} other {已新增 {count} 個量規}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "刪除量規", // Text for deleting rubric icon
	"rubrics.btnClose": "關閉", // X button for exiting the create new rubric overlay
	"rubrics.txtRubricAdded": "量規已新增", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "量規已移除", // Text for notifying screenreader rubric was removed
	"rubrics.defaultScoringRubric": "預設的評分量規", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "未選取預設", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "分數：{points}", // Text label for displaying points of a grade
	"grades.weight": "加權：{weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "成績項目", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.newGradeItemCategory": "成績類別", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "無類別", // Category dropdown text for not selecting a category

	"attachments.addGoogleDriveLink": "從 Google 雲端硬碟附加", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "檔案上傳", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "附加網頁連結", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "從 OneDrive 附加", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "附加現有活動連結", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "返回", // Text for a back button
	"attachments.closeDialog": "關閉對話方塊", // ARIA text for button to close dialog
	"attachments.recordAudio": "錄製音訊", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "錄製視訊", // Text for a button that opens a dialog to record video
	"attachments.save": "儲存", // Text for a save button,
	"attachments.attach": "附加", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google 雲端硬碟", // Attach menu item text
	"attachments.addFileMenu": "檔案上傳", // Attach menu item text
	"attachments.addLinkMenu": "網頁連結", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "現有活動", // Attach menu item text

	"content.name": "名稱", // Text label for name input field
	"content.emptyNameField": "名稱為必填", // Error text that appears below name field when it is left empty
	"content.description": "說明", // Text label for description input field
	"content.availabilityHeader": "可用情況日期", // availability header
	"content.saveError": "您的內容項目尚未儲存。請修正以紅色顯示的欄位。", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.addDueDate": "新增截止日期" // Text label for name input field
};
