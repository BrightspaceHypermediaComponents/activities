/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "Sürüm Koşullarını Düzenle", // edit release conditions button
	"editor.btnAddReleaseCondition": "Sürüm Koşulu Ekle", // add release condition button
	"editor.btnCreateNew": "Yeni Oluştur", // create new button
	"editor.btnAddExisting": "Mevcut Olanı Ekle", // add existing button
	"editor.btnRemoveCondition": "Koşul Kaldır", // remove condition button
	"editor.lblConditionsOperator": "Bu öğeyi görüntüleyebilmek için kullanıcı şunları karşılamalıdır", // conditions operator label
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} Sürüm Koşulu} other {{count} Sürüm Koşulu}}", // num release condition text
	"editor.btnCancel": "İptal", // cancel button
	"editor.btnSave": "Kaydet ve Kapat", // save and close button
	"editor.btnSaveMobile": "Kaydet", // save and close button for mobile devices
	"editor.dueDate": "Teslim Tarihi", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "Bitiş Tarihi", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "Başlangıç Tarihi", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "Teslim Saati", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "Bitiş Saati", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "Başlangıç Saati", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "Gizli", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "Teslim tarihi yok", // Placeholder text for due date field when no due date is set
	"editor.noEndDate": "Bitiş tarihi yok", // Placeholder text for due date field when no due date is set
	"editor.noStartDate": "Başlangıç tarihi yok", // Placeholder text for due date field when no due date is set
	"editor.visible": "Görünür", // Label displayed with the visibility switch when visible
	"editor.txtAvailabilityStartAndEnd": "Uygunluk, {startDate} tarihinde başlar ve {endDate} tarihinde sona erer", // start/end text
	"editor.txtAvailabilityStartOnly": "Uygunluk, {startDate} tarihinde başlar", // start only text
	"editor.txtAvailabilityEndOnly": "Uygunluk, {endDate} tarihinde sona erer", // end only text
	"editor.txtAvailabilityNeither": "Her zaman uygun", // always available text
	"editor.ungraded": "Notlandırılmamış", // State of score field when there is no score and no grade item, when creating/editing an activity
	"editor.inGrades": "Notlarda", // State of the grades field when there is a score, and an associated grade item
	"editor.notInGrades": "Notlarda Yok", // State of the grades field when there is a score, but no associated grade item
	"editor.addToGrades": "Notlara Ekle", // Menu item for adding grade association
	"editor.addAGrade": "Not Ekle", //ARIA label to add a grade to the activity
	"editor.removeFromGrades": "Notlardan Kaldır", // Menu item for removing grade association
	"editor.setUngraded": "Notlandırılmamış Durumuna Sıfırla", // Menu item for setting the activity to ungraded
	"editor.scoreOutOf": "Maksimum Puan", // ARIA label for the score out of field, when creating/editing an activity
	"editor.emptyScoreOutOfError": "Notlardaki etkinlikler için bir puan değeri belirtilmelidir", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"editor.invalidScoreOutOfError": "Maksimum Puan, 0,01 veya daha büyük ya da 9.999.999.999 veya daha küçük olmalıdır", // Error message when an invalid score out of value is entered
	"editor.loading": "Yükleniyor...", // Message displayed while page is loading
	"editor.ok": "Tamam", // Text of dialog button to commit action
	"editor.cancel": "İptal", // Text of dialog button to cancel action
	"editor.ariaToolbarShortcutInstructions": "Araç çubuğuna giriş yapmak için ALT+F10 tuşlarına basın, araç çubuğundayken çıkış yapmak için ESC tuşuna basın.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"editor.chooseFromGrades": "Notlar arasından seçim yap", // Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "Rubrikler", //Header for the rubrics section
	"editor.startBeforeEndDate": "Başlangıç Tarihi, Bitiş Tarihinden önce olmalıdır",
	"editor.dueBetweenStartEndDate": "Sona Erme Tarihi, Başlangıç Tarihinden sonra ve Bitiş Tarihinden önce veya bu tarihle aynı olmalıdır",
	"editor.dueAfterStartDate": "Sona Erme Tarihi, Başlangıç Tarihinden sonra olmalıdır",
	"editor.dueBeforeEndDate": "Sona Erme Tarihi, Bitiş Tarihiyle aynı veya önce olmalıdır",
	"editor.createAndLinkToNewGradeItem": "Oluştur ve yeni not öğesine bağlantı oluştur", //Radio button text
	"editor.linkToExistingGradeItem": "Mevcut not öğesine bağlantı oluştur", //Radio button text
	"editor.points": "Puan: {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "Not öğesi mevcut değil", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "Yeni bir not öğesi oluşturma izniniz yok", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "Öğrenme Hedefleri", //Text label for the competencies tool integration
	"editor.manageCompetencies": "Öğrenme Hedeflerini Yönet", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =0 {Öğrenme hedefi yok} =1 {1 ekli} other {{count} ekli}}", //Label for number of associated competencies
	"editor.competenciesCountSummary": "{count, plural, =0 {Öğrenme hedefi yok} =1 {1 öğrenme hedefi} other {{count} öğrenme hedefi}}",
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 eksik değerlendirme} other {{count} eksik değerlendirme}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "Kapat", //Label for Close button
	"editor.btnCloseDialog": "Bu Diyaloğu Kapat", // close dialog button

	"rubrics.btnAddRubric": "Rubrik ekle", //text for add rubric button
	"rubrics.btnCreateNew": "Yeni Oluştur", //Text for create new dropdown
	"rubrics.btnAddExisting": "Mevcut Olanı Ekle", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "Rubrikler", //Header for the rubrics section
	"rubrics.btnAttachRubric": "Rubrik Ekle", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "İptal", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "Mevcut Olanı Ekle", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "Rubrik eklenmedi", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 rubrik eklendi} other {{count} rubrik eklendi}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "Rubriği Sil", // Text for deleting rubric icon
	"rubrics.btnClose": "Kapat", // X button for exiting the create new rubric overlay
	"rubrics.txtRubricAdded": "Rubric added", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "Rubric removed", // Text for notifying screenreader rubric was removed 

	"grades.points": "Puan: {points}", // Text label for displaying points of a grade
	"grades.weight": "Ağırlık: {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "Not Öğesi", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.newGradeItemCategory": "Not Kategorisi", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "Kategori Yok", // Category dropdown text for not selecting a category

	"attachments.addGoogleDriveLink": "Google Drive\'dan Ekle", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "Dosya Yükleme", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "Web Bağlantısı Ekle", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "OneDrive\'dan ekle", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "Mevcut Etkinliğe Bağlantı Ekle", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "Geri", // Text for a back button
	"attachments.closeDialog": "İletişim Kutusunu Kapat", // ARIA text for button to close dialog
	"attachments.recordAudio": "Ses Kaydet", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "Video Kaydet", // Text for a button that opens a dialog to record video
	"attachments.save": "Kaydet", // Text for a save button,
	"attachments.attach": "Ekle", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "Dosya Yükleme", // Attach menu item text
	"attachments.addLinkMenu": "Web Bağlantısı", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "One Drive", // Attach menu item text
	"attachments.addQuicklinkMenu": "Mevcut Etkinlik" // Attach menu item text
};