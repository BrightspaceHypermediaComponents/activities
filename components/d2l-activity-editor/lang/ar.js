/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "تحرير شروط الإصدار", // edit release conditions button
	"editor.btnAddReleaseCondition": "إضافة شروط الإصدار", // add release condition button
	"editor.btnCreateNew": "إنشاء جديد", // create new button
	"editor.btnAddExisting": "إضافة موجود", // add existing button
	"editor.btnRemoveCondition": "إزالة شرط", // remove condition button
	"editor.lblConditionsOperator": "لعرض هذه المادة، يجب على المستخدمين استيفاء", // conditions operator label
	"editor.txtConditionAdded": "شرط مضاف: {title}",
	"editor.txtConditionRemoved": "شرط تمت إزالته: {title}",
	"editor.txtConditionsAdded": "تمت إضافة {count} من الشروط",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} شرط إصدار} other ‏{{count} من شروط الإصدار}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {مستخدم واحد يتمتع بإمكانية وصول خاص} other ‏{{userCount} من المستخدمين الذين يتمتعون بإمكانية وصول خاص}}", // num users with special access text
	"editor.btnCancel": "إلغاء", // cancel button
	"editor.btnSave": "حفظ وإغلاق", // save and close button
	"editor.btnSaveMobile": "حفظ", // save and close button for mobile devices
	"editor.dueDate": "تاريخ الاستحقاق", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "تاريخ الانتهاء", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "تاريخ البدء", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "وقت الاستحقاق", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "وقت النهاية", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "وقت البدء", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "مخفي", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "ما من تاريخ استحقاق", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "ما من تاريخ نهاية", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "ما من تاريخ بدء", // Placeholder text for due date field when no due date is set
	"editor.visible": "ظاهر", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "يبدأ التوفّر بتاريخ {startDate} وينتهي بتاريخ {endDate}", // start/end text
	"editor.txtAvailabilityStartOnly": "يبدأ التوفّر بتاريخ {startDate}", // start only text
	"editor.txtAvailabilityEndOnly": "تاريخ انتهاء التوفّر {endDate}", // end only text
	"editor.txtAvailabilityNeither": "متوفر دائمًا", // always available text
	"editor.ungraded": "لم توضَع علامة عليها", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "في حقل العلامات", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "ليست في حقل العلامات", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "إضافة إلى حقل العلامات", // Menu item for adding grade association
	"editor.addAGrade": "إضافة علامة", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "الإزالة من حقل العلامات", // Menu item for removing grade association
	"editor.setUngraded": "إعادة التعيين إلى لم توضَع علامة عليها", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "مجموع الدرجات من أصل", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "يجب تحديد قيمة نقاط الأنشطة في حقل العلامات", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "يجب أن يكون \"مجموع الدرجات من أصل\" أكبر من 0,01 أو مساويًا له وأقل من 9999999999 أو مساويًا له", // Error message when an invalid score out of value is entered
	"editor.loading": "يتم الآن التحميل...", // Message displayed while page is loading
	"editor.ok": "موافق", // Text of dialog button to commit action
	"editor.cancel": "إلغاء", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "اضغط على ALT-F10 لفتح شريط الأدوات، واضغط على ESC للخروج من شريط الأدوات عندما يكون مفتوحًا.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "اختيار من العلامات", // Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "آليات التقييم", //Header for the rubrics section
	"editor.startBeforeEndDate": "يجب أن يقع تاريخ البدء قبل تاريخ النهاية",
	"editor.dueBetweenStartEndDate": "يجب أن يقع تاريخ الاستحقاق بعد تاريخ البدء ويوم تاريخ النهاية أو قبله",
	"editor.dueAfterStartDate": "يجب أن يقع تاريخ الاستحقاق بعد تاريخ البدء",
	"editor.dueBeforeEndDate": "يجب أن يقع تاريخ الاستحقاق يوم تاريخ النهاية أو قبله",
	"editor.createAndLinkToNewGradeItem": "إنشاء مادة جديدة سيتم وضع علامة عليها والربط بها", //Radio button text
	"editor.linkToExistingGradeItem": "ربط بمادة حالية سيتم وضع علامة عليها", //Radio button text
	"editor.points": "النقاط: {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "ما من مواد حالية سيتم وضع علامة عليها", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "ليس لديك الإذن لإنشاء مادة جديدة سيتم وضع علامة عليها", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "أهداف التعلّم", //Text label for the competencies tool integration
	"editor.manageCompetencies": "إدارة أهداف التعلّم", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {مرفق واحد} other ‏{{count} من المرفقات}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "ما من أهداف تعلّم", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {هدف تعلّم واحد} other ‏{{count} من أهداف التعلّم}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {تقييم واحد مفقود} other ‏{{count} من التقييمات المفقودة}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "إغلاق", //Label for Close button
	"editor.btnCloseDialog": "إغلاق مربع الحوار هذا", // close dialog button
	"editor.btnManageSpecialAccess": "إدارة إمكانية الوصول الخاص", // manage special access button
	"editor.specialAccessRestrictedText": "يمكن فقط للمستخدمين الذين يتمتعون بإمكانية وصول خاص رؤية هذا المجلد", // restricted special access description
	"editor.specialAccessNotRestrictedText": "يمكن للمستخدمين إجراء عملية الإرسال خارج تواريخ التوفّر الاعتيادية", // not restricted special access description
	"editor.specialAccessCount": "يتمتع {count, plural, =1 {مستخدم واحد} other ‏{{count} من المستخدمين}} بإمكانية وصول خاص", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "ما من مستخدمين", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "إدارة إمكانية الوصول الخاص", // Dialog title
	"editor.specialAccessHidden": "تم الإخفاء بواسطة الوصول الخاص", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "هل تريد تجاهل التغييرات؟", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "هل أنت متأكد من أنك تريد تجاهل التغييرات التي أجريتها؟", // Discard Changes User Prompt
	"editor.yesLabel": "نعم",
	"editor.noLabel": "لا",

	"rubrics.btnAddRubric": "إضافة آلية تقييم", //text for add rubric button
	"rubrics.btnCreateNew": "إنشاء جديد", //Text for create new dropdown
	"rubrics.btnAddExisting": "إضافة موجود", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "آليات التقييم", //Header for the rubrics section
	"rubrics.btnAttachRubric": "إرفاق آلية تقييم", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "إلغاء", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "إضافة موجود", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "لم تتم إضافة آلية تقييم", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {آلية تقييم واحدة مضافة} other ‏{{count} من آليات التقييم المضافة}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "حذف آلية التقييم", // Text for deleting rubric icon
	"rubrics.btnClose": "إغلاق", // X button for exiting the create new rubric overlay
	"rubrics.txtRubricAdded": "تمت إضافة آلية تقييم", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "تمت إزالة آلية تقييم", // Text for notifying screenreader rubric was removed
	"rubrics.defaultScoringRubric": "آلية تقييم مجموع الدرجات الافتراضية", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "لم يتم تحديد آلية تقييم مجموع الدرجات الافتراضية", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "النقاط: {points}", // Text label for displaying points of a grade
	"grades.weight": "الوزن: {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "مادة سيتم وضع علامة عليها", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.newGradeItemCategory": "فئة العلامات", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "لا توجد فئة", // Category dropdown text for not selecting a category

	"attachments.addGoogleDriveLink": "إرفاق من Google Drive", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "تحميل ملف", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "إرفاق ارتباط ويب", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "إرفاق من OneDrive", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "إرفاق ارتباط بنشاط موجود", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "الخلف", // Text for a back button
	"attachments.closeDialog": "إغلاق مربع الحوار", // ARIA text for button to close dialog
	"attachments.recordAudio": "تسجيل الصوت", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "تسجيل الفيديو", // Text for a button that opens a dialog to record video
	"attachments.save": "حفظ", // Text for a save button,
	"attachments.attach": "إرفاق", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "تحميل ملف", // Attach menu item text
	"attachments.addLinkMenu": "ارتباط ويب", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "النشاط الحالي", // Attach menu item text

	"content.name": "الاسم", // Text label for name input field
	"content.emptyNameField": "الاسم مطلوب", // Error text that appears below name field when it is left empty
	"content.description": "وصف", // Text label for description input field
	"content.availabilityHeader": "تواريخ إمكانية التوفّر", // availability header
	"content.saveError": "لم يتم حفظ مادة المحتوى الخاصة بك. يُرجى تصحيح الحقول الموضّحة باللون الأحمر.", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.addDueDate": "إضافة تاريخ الاستحقاق" // Text label for name input field
};
