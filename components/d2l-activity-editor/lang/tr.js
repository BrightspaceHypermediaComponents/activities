/* eslint quotes: 0 */

export default {
	"editor.btnEditReleaseConditions": "Sürüm Koşullarını Düzenle", // edit release conditions button
	"editor.btnAddReleaseCondition": "Sürüm Koşulu Ekle", // add release condition button
	"editor.btnCreateNew": "Yeni Oluştur", // create new button
	"editor.btnAddExisting": "Mevcut Olanı Ekle", // add existing button
	"editor.btnRemoveCondition": "Koşulu Kaldır", // remove condition button
	"editor.lblConditionsOperator": "Bu öğeyi görüntüleyebilmek için kullanıcı şunları karşılamalıdır", // conditions operator label
	"editor.txtConditionAdded": "Eklenen koşul: {title}",
	"editor.txtConditionRemoved": "Kaldırılan koşul: {title}",
	"editor.txtConditionsAdded": "{count} koşul eklendi",
	"editor.txtNumReleaseConditions": "{count, plural, =1 {{count} sürüm koşulu} other {{count} sürüm koşulu}}", // num release condition text
	"editor.txtNumSpecialAccess": "{userCount, plural, =1 {özel erişime sahip 1 kullanıcı} other {özel erişime sahip {userCount} kullanıcı}}", // num users with special access text
	"editor.btnCancel": "İptal", // cancel button
	"editor.btnSave": "Kaydet ve Kapat", // save and close button
	"editor.btnSaveMobile": "Kaydet", // save and close button for mobile devices
	"editor.dueDate": "Sona Erme Tarihi", // ARIA label for the due date field when creating/editing an activity
	"editor.endDate": "Bitiş Tarihi", // ARIA label for the end date field when creating/editing an activity
	"editor.startDate": "Başlangıç Tarihi", // ARIA label for the start date field when creating/editing an activity
	"editor.dueTime": "Sona Erme Saati", // ARIA label for the due time field when creating/editing an activity
	"editor.endTime": "Bitiş Saati", // ARIA label for the end time field when creating/editing an activity
	"editor.startTime": "Başlangıç Saati", // ARIA label for the start time field when creating/editing an activity
	"editor.hidden": "Gizli", // Label displayed with the visibility switch when hidden
	"editor.noDueDate": "Sona erme tarihi yok", // Placeholder text for due date field when no due date is set
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
	"editor.chooseFromGrades": "Notlar Arasından Seç", // Link text and dialog title for the edit grades dialog,
	"editor.editLinkExisting": "Düzenle veya Mevcut Olana Bağla", // New Link text and dialog title for the edit grades dialog,
	"editor.hdrRubrics": "Rubrikler", //Header for the rubrics section
	"editor.startBeforeEndDate": "Başlangıç Tarihi, Bitiş Tarihinden önce olmalıdır",
	"editor.dueBetweenStartEndDate": "Sona Erme Tarihi, Başlangıç Tarihinden sonra ve Bitiş Tarihinden önce veya bu tarihle aynı olmalıdır",
	"editor.dueAfterStartDate": "Sona Erme Tarihi, Başlangıç Tarihinden sonra olmalıdır",
	"editor.dueBeforeEndDate": "Sona Erme Tarihi, Bitiş Tarihinden önce veya bu tarihle aynı olmalıdır",
	"editor.createAndLinkToNewGradeItem": "Oluştur ve yeni not öğesine bağlantı oluştur", //Radio button text
	"editor.linkToExistingGradeItem": "Mevcut not öğesine bağlantı oluştur", //Radio button text
	"editor.points": "Puan: {points}", // Text label for displaying points of a grade
	"editor.noGradeItems": "Not öğesi mevcut değil", // Reason why existing grade items cannot be linked in the choose grades dialog
	"editor.noGradeCreatePermission": "Yeni bir not öğesi oluşturma izniniz yok", // Reason why a new grade items cannot be created in the choose grades dialog
	"editor.competencies": "Öğrenme Hedefleri", //Text label for the competencies tool integration
	"editor.manageCompetencies": "Öğrenme Hedeflerini Yönet", //Button text to launch competencies tool dialog
	"editor.competenciesCount": "{count, plural, =1 {1 ekli} other {{count} ekli}}", //Label for number of associated competencies
	"editor.noLearningObjectives": "Öğrenme nesnesi yok", //text label when there are no associated learning objectives
	"editor.competenciesCountSummary": "{count, plural, =1 {1 öğrenme nesnesi} other {{count} öğrenme nesnesi}}", // num release condition text
	"editor.unevaluatedCompetencies": "{count, plural, =1 {1 eksik değerlendirme} other {{count} eksik değerlendirme}}", //Label for number of unevalated associated competencies
	"editor.btnClose": "Kapat", //Label for Close button
	"editor.btnCloseDialog": "Bu Diyaloğu Kapat", // close dialog button
	"editor.btnManageSpecialAccess": "Özel Erişimi Yönet", // manage special access button
	"editor.saveSuccessful": "Başarıyla kaydedildi", // alert message after a successful save
	"editor.specialAccessRestrictedText": "Yalnızca özel erişime sahip kullanıcılar bu klasörü görebilir", // restricted special access description
	"editor.specialAccessNotRestrictedText": "Kullanıcılar normal uygunluk tarihleri dışında gönderim yapabilir", // not restricted special access description
	"editor.specialAccessCount": "Özel erişime sahip {count, plural, =1 {1 kullanıcı} other {{count} kullanıcı}}", // Label for number of special access users
	"editor.noUsersWithSpecialAccess": "Kullanıcı yok", // text label when there are no users with special access
	"editor.specialAccessDialogTitle": "Özel Erişimi Yönet", // Dialog title
	"editor.specialAccessHidden": "Özel erişim ile gizlendi", // Warning label that the activity is restricted but is being hidden from all users by special access rules
	"editor.discardChangesTitle": "Değişiklikler atılsın mı?", // Discard Changes User Prompt
	"editor.discardChangesQuestion": "Değişiklerinizi atmak istediğinizden emin misiniz?", // Discard Changes User Prompt
	"editor.yesLabel": "Evet",
	"editor.noLabel": "Hayır",
	"editor.notificationEmailLabel": "Bildirim E-postası", // Label for notification email input field
	"editor.invalidNotificationEmailError": "Lütfen geçerli bir e-posta adresi girin", // error shown on tooltip when notification email is invalid
	"editor.gradeOutOf": "Şu Not Üzerinden Not:", // ARIA label for the grade out of field, when creating/editing an activity
	"editor.inGradebook": "Not Defterinde", // New state of the grades field when there is a score, and an associated grade item
	"editor.notInGradebook": "Not Defterinde Değil", // New state of the grades field when there is a score, but no associated grade item
	"editor.addToGradebook": "Not Defterine Ekle", // New menu item for adding grade association

	"rubrics.btnAddRubric": "Rubrik ekle", //text for add rubric button
	"rubrics.btnCreateNew": "Yeni Oluştur", //Text for create new dropdown
	"rubrics.hdrCreateRubric": "Rubrik Oluştur", // Header for creating a new rubric
	"rubrics.btnDetach": "Ayır", //Text for the button to confirm detaching a rubric
	"rubrics.btnAddExisting": "Mevcut Olanı Ekle", //Text for Add Existing dropdown
	"rubrics.hdrRubrics": "Rubrikler", //Header for the rubrics section
	"rubrics.btnAttachRubric": "Rubrik Ekle", //Button for the attach new rubric overlay
	"rubrics.btnCancel": "İptal", //Button for canceling out of the attach new rubric overlay
	"rubrics.txtAddExisting": "Mevcut Olanı Ekle", //Title for the attach rubrics dialog,
	"rubrics.txtNoRubricAdded": "Rubrik eklenmedi", // rubric summary for no rubrics
	"rubrics.txtRubricsAdded": "{count, plural, =1 {1 rubrik eklendi} other {{count} rubrik eklendi}}", // count of asoociated rubrics
	"rubrics.txtDeleteRubric": "Rubriği Sil", // Text for deleting rubric icon
	"rubrics.txtRubricAdded": "Rubrik eklendi", // Text for notifying screenreader rubric was added
	"rubrics.txtRubricRemoved": "Rubrik kaldırıldı", // Text for notifying screenreader rubric was removed
	"rubrics.txtConfirmDetachRubric": "Rubrik ayrıldıktan sonra, bu etkinlikteki rubrik ile ilgili önceki tüm değerlendirmeler silinecektir. Rubrik sökülmesini onaylıyor musunuz?", //Text for the dialog to confirm detaching a rubric from an evaluated activity
	"rubrics.defaultScoringRubric": "Varsayılan Puanlama Rubriği", // Sub heading for the default scoring rubric select dropdown
	"rubrics.noDefaultScoringRubricSelected": "Seçili varsayılan yok", // option in default scoring rubric when no default scoring rubric selected

	"grades.points": "Puan: {points}", // Text label for displaying points of a grade
	"grades.weight": "Ağırlık: {weight}", // Text label for displaying weight of a grade
	"grades.gradeItem": "Not Öğesi", //ARIA label for grade-item picker when linking an activity to an existing grade item
	"grades.gradeUnits": "puan", // unit label for GradeOutOf value (e.g. 10 points)
	"grades.chooseNewGradeItemCategory": "Not Kategorisi Seç", // Label for add category button
	"grades.newGradeItemCategory": "Not Kategorisi", // Label for selecting a category dropdown
	"grades.noGradeItemCategory": "Kategori Yok", // Category dropdown text for not selecting a category
	"grades.changeNewGradeTypeAndScheme": "Notlandırma Türünü ve Düzenini Değiştir", // Label for change type and scheme button
	"grades.newGradeType": "Not Türü", // Label for the grade type
	"grades.newGradeTypeNumeric": "Sayısal", // Label for numeric grade type radio option
	"grades.newGradeTypeSelectbox": "Seçim Kutusu", // Label for selectbox grade type radio option
	"grades.numericDescription": "Belirlenen bir toplam puan sayısı içinden bir değer atayarak kullanıcıları notlandırın.", // Description of numeric grade type
	"grades.numericDescriptionExample": "Örn. 8/10", // Example of numeric grade type
	"grades.selectboxDescription": "Başarılarına en iyi uyan not planı seviyesini seçerek kullanıcıları notlandırın.", // Description of selectbox grade type
	"grades.selectboxDescriptionExample": "Örn: \"Çok İyi\" veya \"B+\"", // Example of selectbox grade type
	"grades.newGradeScheme": "Not Planı", // Label for the grade scheme
	"grades.defaultGradeScheme": "--Varsayılan-- ({schemeName})", // name of default grade scheme

	"attachments.addGoogleDriveLink": "Google Drive'dan Ekle", // Tooltip for a button that adds a link to a Google Drive file
	"attachments.addFile": "Dosya Yükleme", // Tooltip for a button that opens a file upload dialog
	"attachments.addLink": "Web Bağlantısı Ekle", // Tooltip for a button that adds a link to a URL
	"attachments.addOneDriveLink": "OneDrive'dan Ekle", // Tooltip for a button that adds a link to a OneDrive file
	"attachments.addQuicklink": "Mevcut Etkinliğe Bağlantı Ekle", // Tooltip for a button that adds a link to an existing activity
	"attachments.back": "Geri", // Text for a back button
	"attachments.closeDialog": "Diyaloğu Kapat", // ARIA text for button to close dialog
	"attachments.recordAudio": "Ses Kaydet", // Text for a button that opens a dialog to record audio
	"attachments.recordVideo": "Video Kaydet", // Text for a button that opens a dialog to record video
	"attachments.save": "Kaydet", // Text for a save button,
	"attachments.attach": "Ekle", // Text for Attach button to open attachment row
	"attachments.addGoogleDriveLinkMenu": "Google Drive", // Attach menu item text
	"attachments.addFileMenu": "Dosya Yükleme", // Attach menu item text
	"attachments.addLinkMenu": "Web Bağlantısı", // Attach menu item text
	"attachments.addOneDriveLinkMenu": "OneDrive", // Attach menu item text
	"attachments.addQuicklinkMenu": "Mevcut Etkinlik", // Attach menu item text

	"content.name": "Ad", // Text label for name input field
	"content.emptyNameField": "Ad gerekli.", // Error text that appears below name field when it is left empty
	"content.description": "Açıklama", // Text label for description input field
	"content.pageContent": "Sayfa İçeriği", // Text label for page content input field (HTML files)
	"content.availabilityHeader": "Geçerlilik Tarihleri", // availability header
	"content.saveError": "İçerik öğeniz kaydedilmedi. Lütfen kırmızı ile gösterilen alanları düzeltin.", // Error message to inform the user that there was a problem saving the content item, instructing them to correct invalid fields
	"content.displayOptions": "Görüntüleme Seçenekleri", // Text label for display options
	"content.addDueDate": "Bitiş Tarihi Ekle", // Text label for name input field
	"content.embedOnPage": "Sayfaya göm", // Text label for link radio button
	"content.openNewTab": "Yeni pencerede aç (önerilen)", // Text label for link radio button
	"content.openNewTabRecommendation": "Bu seçenek, kaynağınızda kimlik doğrulama sorunlarını önlemek için önerilir.", // Text for the help icon that explains reason for recommending new tab option
	"content.openNewTabHelp": "Sayfadaki süre izlenmez.", // Text for the help icon next to link radio button
	"content.link": "Bağlantı", //Text label for link input field
	"content.emptyLinkField": "Bağlantı gerekli.", //Error message shown on link tooltip when the link is empty
	"content.invalidLink": "Lütfen geçerli bir URL girin.", //Error message shown on link tooltip when the link is not formatted correctly
	"content.notHttps": "Yalnızca \"https\" protokolünü kullanan bağlantılar gömülebilir.", //Error message shown on link tooltip when https is not used for embedded links
	"content.noEmbed": "Bu site gömülemez.", //Error message shown on link tooltip when the link cannot be embedded
	"content.previewLabel": "Önizle", // The label text for the link preview
	"content.openInNewWindow": "Yeni Pencerede Aç", // The label text for the subtle-button for opening a LTI link in a new window
	"content.externalActivity": "Harici Etkinlik", // The label text for the external activity section on the LTI link page
	"content.externalActivityOpened": "İçeriğini görüntülemek için etkinliği yeni pencerede açın.", // Text for displaying underneath the LTI link jump logo
	"content.externalActivityEmbeddedNotAllowed": "Bu harici etkinlik, içerik yerleştirmeyi desteklemiyor. Yalnızca yeni bir pencerede açılarak görüntülenebilir." // Text that replaces the LTI display options if embedding is not allowed
};
