/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "リリース条件の編集", // edit release conditions button
	"editor.btnAddReleaseCondition": "リリース条件の追加", // add release condition button
	"editor.btnCreateNew": "新規作成", // create new button
	"editor.btnAddExisting": "既存の追加", // add existing button
	"editor.btnRemoveCondition": "条件の削除", // remove condition button
	"editor.lblConditionsOperator": "この項目を見るには、次の条件を満たしている必要があります", // conditions operator label
	"editor.txtConditionAdded": "条件: {title} が追加されました",
	"editor.txtConditionRemoved": "条件: {title} が削除されました",
	"editor.txtConditionsAdded": "{count} 個の条件が追加されました",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} 個のリリース条件} other {{count} 個のリリース条件}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {特殊なアクセスを持つ 1 人のユーザー} other {特殊なアクセスを持つ {userCount} 人のユーザー}}", // num users with special access text
	"editor.btnCancel": "キャンセル", // cancel button
	"editor.btnSave": "保存して閉じる", // save and close button
	"editor.btnSaveMobile": "保存", // save and close button for mobile devices
	"editor.dueDate": "期限", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "終了日", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "開始日", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "期限時刻", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "終了時刻", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "開始時刻", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "非表示", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "期限がありません", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "終了日がありません", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "開始日がありません", // Placeholder text for due date field when no due date is set
	"editor.visible": "表示", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "使用可能期間開始日 {startDate}、終了日 {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "使用可能期間開始日 {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "使用可能期間終了日 {endDate}", // end only text
	"editor.txtAvailabilityNeither": "常に使用可能", // always available text
	"editor.ungraded": "成績評価なし", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "成績にあり", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "成績になし", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "成績に追加", // Menu item for adding grade association
	"editor.addAGrade": "成績の追加", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "成績から削除", // Menu item for removing grade association
	"editor.setUngraded": "成績評価なしにリセット", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "満点スコア", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "成績にあるアクティビティについてポイント値を指定する必要があります", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "満点スコアは 0.01 以上 9,999,999,999 以下の数値にする必要があります。", // Error message when an invalid score out of value is entered
	"editor.loading": "読み込み中...", // Message displayed while page is loading
	"editor.ok": "OK", // Text of dialog button to commit action
	"editor.cancel": "キャンセル", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "ツールバーを表示するには ALT-F10 キーを、ツールバーを終了するにはツールバーにカーソルを置いた状態で ESC キーを押します。", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "成績から選択", // Link text and dialog title for the edit grades dialog,
	"editor.editLinkExisting": "既存の項目の編集またはリンク", // New Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "注釈", //Header for the rubrics section
	"editor.startBeforeEndDate": "開始日は終了日の前である必要があります",
	"editor.dueBetweenStartEndDate": "期限は開始日の後および終了日以前である必要があります",
	"editor.dueAfterStartDate": "期限は開始日の後である必要があります",
	"editor.dueBeforeEndDate": "期限は終了日以前である必要があります",
	"editor.createAndLinkToNewGradeItem": "新規成績項目の作成および新規成績項目へのリンク", //Radio button text
	"editor.linkToExistingGradeItem": "既存の成績項目へのリンク", //Radio button text
	"editor.points": "ポイント: {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "既存の成績項目がありません", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "新規成績項目を作成する権限がありません", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "学習目的", //Text label for the competencies tool integration
	"editor.manageCompetencies": "学習目的の管理", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1 個添付} other {{count} 個添付}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "学習目的がありません", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 個の学習目的} other {{count} 個の学習目的}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 件評価なし} other {{count} 件評価なし}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "閉じる", //Label for Close button
	"editor.btnCloseDialog": "このダイアログを閉じる", // close dialog button
	"editor.btnManageSpecialAccess": "特殊なアクセスの管理", // manage special access button
	"editor.saveSuccessful": "正常に保存されました", // alert message after a successful save
	"editor.specialAccessRestrictedText": "特殊なアクセスを持つユーザーのみがこのフォルダを表示することができます", // restricted special access description
	"editor.specialAccessNotRestrictedText": "ユーザーは、通常の利用可能日以外の日にも送信することができます", // not restricted special access description
	"editor.specialAccessCount": "特殊なアクセスを持つ {count, plural, =1 {1 人のユーザー} other {{count} 人のユーザー}}", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "ユーザーはいません", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "特殊なアクセスの管理", // Dialog title
	"editor.specialAccessHidden": "特殊なアクセスで非表示", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "変更を破棄しますか？", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "この変更を破棄してもよろしいですか？", // Discard Changes User Prompt
	"editor.yesLabel": "はい",
	"editor.noLabel": "いいえ",
	"editor.notificationEmailLabel": "通知電子メール", // Label for notification email input field
	"editor.invalidNotificationEmailError": "有効な電子メールアドレスを入力してください", // error shown on tooltip when notification email is invalid
	"editor.gradeOutOf": "満点の成績", // ARIA label for the grade out of field, when creating/editing an activity
	"editor.inGradebook": "グレードブック（成績表）中にあり", // New state of the grades field when there is a score, and an associated grade item
	"editor.notInGradebook": "グレードブック（成績表）中になし", // New state of the grades field when there is a score, but no associated grade item
	"editor.addToGradebook": "グレードブック（成績表）に追加", // New menu item for adding grade association

	"rubrics.btnAddRubric": "注釈の追加", //text for add rubric button
	"rubrics.btnCreateNew": "新規作成", //Text for create new dropdown
	"rubrics.hdrCreateRubric": "注釈の作成", // Header for creating a new rubric
	"rubrics.btnDetach": "取り外し", //Text for the button to confirm detaching a rubric
	"rubrics.btnAddExisting": "既存の追加", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "注釈", //Header for the rubrics section
	"rubrics.btnAttachRubric": "注釈の添付", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "キャンセル", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "既存の追加", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "追加された注釈がありません", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 つの注釈が追加されました} other {{count} 個の注釈が追加されました}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "注釈の削除", // Text for deleting rubric icon
	"rubrics.txtRubricAdded": "注釈が追加されました", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "注釈が削除されました", // Text for notifying screenreader rubric was removed
	"rubrics.txtConfirmDetachRubric": "注釈を取り外すと、このアクティビティの注釈の以前の評価はすべて削除されます。注釈を取り外しますか？", //Text for the dialog to confirm detaching a rubric from an evaluated activity
	"rubrics.defaultScoringRubric": "デフォルトのスコア注釈", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "デフォルトが選択されていません", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "ポイント: {points}", // Text label for displaying points of a grade
	"grades.weight": "加重: {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "成績項目", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.gradeUnits": "ポイント", // unit label for GradeOutOf value (e.g. 10 points)
	"grades.chooseNewGradeItemCategory": "成績カテゴリの選択", // Label for add category button
	"grades.newGradeItemCategory": "成績カテゴリ", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "カテゴリなし", // Category dropdown text for not selecting a category
	"grades.changeNewGradeTypeAndScheme": "成績タイプとスキームの変更", // Label for change type and scheme button
	"grades.newGradeType": "成績タイプ", // Label for the grade type
	"grades.newGradeTypeNumeric": "数値", // Label for numeric grade type radio option
	"grades.newGradeTypeSelectbox": "選択ボックス", // Label for selectbox grade type radio option
	"grades.numericDescription": "指定した合計ポイント数から値を割り当てることにより、ユーザーに成績を付けます。", // Description of numeric grade type
	"grades.numericDescriptionExample": "例: 8/10", // Example of numeric grade type
	"grades.selectboxDescription": "成績に最も一致する成績スキームレベルを選択することにより、ユーザーに成績を付けます。", // Description of selectbox grade type
	"grades.selectboxDescriptionExample": "例: 「とても良い」または「B+」", // Example of selectbox grade type
	"grades.newGradeScheme": "成績スキーム", // Label for the grade scheme
	"grades.defaultGradeScheme": "-- デフォルト -- （{schemeName}）", // name of default grade scheme

	"attachments.addGoogleDriveLink": "Google ドライブから添付", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "ファイルアップロード", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "ウェブリンクの添付", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "OneDrive から添付", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "既存アクティビティへのリンクの添付", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "戻る", // Text for a back button
	"attachments.closeDialog": "ダイアログを閉じる", // ARIA text for button to close dialog
	"attachments.recordAudio": "オーディオの録音", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "ビデオの録画", // Text for a button that opens a dialog to record video
	"attachments.save": "保存", // Text for a save button,
	"attachments.attach": "添付", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google ドライブ", // Attach menu item text
	"attachments.addFileMenu": "ファイルアップロード", // Attach menu item text
	"attachments.addLinkMenu": "ウェブリンク", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "既存アクティビティ", // Attach menu item text

	"content.name": "名前", // Text label for name input field
	"content.emptyNameField": "名前は必須です。", // Error text that appears below name field when it is left empty
	"content.description": "説明", // Text label for description input field
	"content.pageContent": "ページコンテンツ", // Text label for page content input field (HTML files)
	"content.availabilityHeader": "使用可能日", // availability header
	"content.saveError": "コンテンツ項目は保存されませんでした。赤で囲まれたフィールドを修正してください。", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.displayOptions": "表示オプション", // Text label for display options
	"content.addDueDate": "期限の追加", // Text label for name input field
	"content.embedOnPage": "ページに埋め込み", // Text label for link radio button
	"content.openNewTab": "新規タブで開く（推奨）", // Text label for link radio button
	"content.openNewTabRecommendation": "リソースに対する認証の問題を回避するには、このオプションを推奨します。", // Text for the help icon that explains reason for recommending new tab option
	"content.openNewTabHelp": "ページにとどまった時間は追跡されません。", // Text for the help icon next to link radio button
	"content.link": "リンク", //Text label for link input field
	"content.emptyLinkField": "リンクは必須です。", //Error message shown on link tooltip when the link is empty
	"content.invalidLink": "有効な URL を入力してください。", //Error message shown on link tooltip when the link is not formatted correctly
	"content.notHttps": "埋め込みできるのは「https」を使ったリンクのみです。", //Error message shown on link tooltip when https is not used for embedded links
	"content.noEmbed": "そのサイトを埋め込むことはできません。", //Error message shown on link tooltip when the link cannot be embedded
	"content.previewLabel": "プレビュー", // The label text for the link preview
	"content.openInNewWindow": "新規ウィンドウで開く", // The label text for the subtle-button for opening a LTI link in a new window
	"content.externalActivity": "外部アクティビティ", // The label text for the external activity section on the LTI link page
	"content.externalActivityOpened": "アクティビティの内容を表示するには新しいウィンドウで開きます。", // Text for displaying underneath the LTI link jump logo
	"content.externalActivityEmbeddedNotAllowed": "この外部アクティビティは埋め込みをサポートしていません。新しいウィンドウで開くことでのみ表示できます。" // Text that replaces the LTI display options if embedding is not allowed
};
