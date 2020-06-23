/* eslint quotes: 0 */

export default {
	"btnEditReleaseConditions": "Sürüm Koşullarını Düzenle", // edit release conditions button
	"btnAddReleaseCondition": "Sürüm Koşulu Ekle", // add release condition button
	"btnCreateNew": "Yeni Oluştur", // create new button
	"btnAddExisting": "Mevcut Olanı Ekle", // add existing button
	"btnRemoveCondition": "Koşul Kaldır", // remove condition button
	"lblConditionsOperator": "Bu öğeyi görüntüleyebilmek için kullanıcı şunları karşılamalıdır", // conditions operator label
	"txtNumReleaseConditions": "{count, plural, =1 {{count} Sürüm Koşulu} other {{count} Sürüm Koşulu}}", // num release condition text
	"btnCancel": "İptal", // cancel button
	"btnSave": "Kaydet ve Kapat", // save and close button
	"btnSaveMobile": "Kaydet", // save and close button for mobile devices
	"dueDate": "Teslim Tarihi", // ARIA label for the due date field when creating/editing an activity
	"endDate": "Bitiş Tarihi", // ARIA label for the end date field when creating/editing an activity
	"startDate": "Başlangıç Tarihi", // ARIA label for the start date field when creating/editing an activity
	"dueTime": "Teslim Saati", // ARIA label for the due time field when creating/editing an activity
	"endTime": "Bitiş Saati", // ARIA label for the end time field when creating/editing an activity
	"startTime": "Başlangıç Saati", // ARIA label for the start time field when creating/editing an activity
	"hidden": "Gizli", // Label displayed with the visibility switch when hidden
	"noDueDate": "Teslim tarihi yok", // Placeholder text for due date field when no due date is set
	"noEndDate": "Bitiş tarihi yok", // Placeholder text for due date field when no due date is set
	"noStartDate": "Başlangıç tarihi yok", // Placeholder text for due date field when no due date is set
	"visible": "Görünür", // Label displayed with the visibility switch when visible
	"txtAvailabilityStartAndEnd": "Uygunluk, {startDate} tarihinde başlar ve {endDate} tarihinde sona erer", // start/end text
	"txtAvailabilityStartOnly": "Uygunluk, {startDate} tarihinde başlar", // start only text
	"txtAvailabilityEndOnly": "Uygunluk, {endDate} tarihinde sona erer", // end only text
	"txtAvailabilityNeither": "Her zaman uygun", // always available text
	"ungraded": "Notlandırılmamış", // State of score field when there is no score and no grade item, when creating/editing an activity
	"inGrades": "Notlarda", // State of the grades field when there is a score, and an associated grade item
	"notInGrades": "Notlarda Yok", // State of the grades field when there is a score, but no associated grade item
	"addToGrades": "Notlara Ekle", // Menu item for adding grade association
	"addAGrade": "Not Ekle", //ARIA label to add a grade to the activity
	"removeFromGrades": "Notlardan Kaldır", // Menu item for removing grade association
	"setUngraded": "Notlandırılmamış Durumuna Sıfırla", // Menu item for setting the activity to ungraded
	"scoreOutOf": "Maksimum Puan", // ARIA label for the score out of field, when creating/editing an activity
	"emptyScoreOutOfError": "Notlardaki etkinlikler için bir puan değeri belirtilmelidir", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"invalidScoreOutOfError": "Maksimum Puan, 0,01 veya daha büyük ya da 9.999.999.999 veya daha küçük olmalıdır", // Error message when an invalid score out of value is entered
	"loading": "Yükleniyor...", // Message displayed while page is loading
	"ok": "Tamam", // Text of dialog button to commit action
	"cancel": "İptal", // Text of dialog button to cancel action
	"ariaToolbarShortcutInstructions": "Araç çubuğuna giriş yapmak için ALT+F10 tuşlarına basın, araç çubuğundayken çıkış yapmak için ESC tuşuna basın.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"chooseFromGrades": "Notlar arasından seçim yap", // Link text and dialog title for the edit grades dialog,
	"hdrRubrics": "Rubrikler", //Header for the rubrics section
	"startBeforeEndDate": "Başlangıç Tarihi, Bitiş Tarihinden önce olmalıdır",
	"dueBetweenStartEndDate": "Sona Erme Tarihi, Başlangıç Tarihinden sonra ve Bitiş Tarihinden önce veya bu tarihle aynı olmalıdır",
	"dueAfterStartDate": "Sona Erme Tarihi, Başlangıç Tarihinden sonra olmalıdır",
	"dueBeforeEndDate": "Sona Erme Tarihi, Bitiş Tarihiyle aynı veya önce olmalıdır",
	"createAndLinkToNewGradeItem": "Oluştur ve yeni not öğesine bağlantı oluştur", //Radio button text
	"linkToExistingGradeItem": "Mevcut not öğesine bağlantı oluştur", //Radio button text
	"points": "Puan: {points}", // Text label for displaying points of a grade
	"noGradeItems": "Not öğesi mevcut değil", // Reason why existing grade items cannot be linked in the choose grades dialog
	"noGradeCreatePermission": "Yeni bir not öğesi oluşturma izniniz yok", // Reason why a new grade items cannot be created in the choose grades dialog
	"competencies": "Öğrenme Hedefleri", //Text label for the competencies tool integration
	"manageCompetencies": "Öğrenme Hedeflerini Yönet", //Button text to launch competencies tool dialog
	"competenciesCount": "{count, plural, =0 {No learning objectives} =1 {1 attached} other {{count} attached}}", //Label for number of associated competencies
	"competenciesCountSummary": "{count, plural, =0 {Öğrenme hedefi yok} =1 {1 öğrenme hedefi} other {{count} öğrenme hedefi}}",
	"unevaluatedCompetencies": "{count, plural, =1 {1 not being evaluated} other {{count} not being evaluated}}", //Label for number of unevalated associated competencies
	"btnClose": "Kapat", //Label for Close button
	"btnCloseDialog": "Bu Diyaloğu Kapat" // close dialog button
};
