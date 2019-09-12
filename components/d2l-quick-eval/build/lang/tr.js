'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangTrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.tr = {
			'activities': 'Etkinlikler',
			'activityName': 'Etkinlik Adı',
			'assignment': 'Ödev',
			'caughtUp': 'Yetiştin!',
			'checkBackOften': 'Yeni gönderiler için belirli aralıklarla tekrar kontrol edin.',
			'clearSearch': 'Aramayı Temizle',
			'close': 'Kapat',
			'completed': 'Tamamlandı',
			'confirmation': 'Onay',
			'courseName': 'Ders',
			'discussion': 'Tartışma',
			'displayName': 'Ad, Soyad',
			'due': 'Bitiş:{date}',
			'evaluate': 'Değerlendir: {displayName}',
			'evaluateAll': 'Tümünü Değerlendir',
			'evaluated': 'Değerlendirildi',
			'failedToFilter': 'Filtre uygulanamıyor. Birkaç dakika içinde tekrar deneyin.',
			'failedToLoadActivities': 'Etkinlikler yüklenemiyor. Birkaç dakika içinde tekrar deneyin.',
			'failedToLoadData': 'Gönderiler yüklenemiyor. Birkaç dakika içinde tekrar deneyin.',
			'failedToLoadMore': 'Daha fazla gönderi yüklenemiyor. Birkaç dakika içinde tekrar deneyin.',
			'failedToSearch': 'Arama uygulanamıyor. Birkaç dakika içinde tekrar deneyin.',
			'firstName': 'Adı',
			'lastName': 'Soyadı',
			'loadMore': 'Daha fazla yükle',
			'loading': 'Yükleniyor',
			'masterTeacher': 'Öğretmen',
			'newAttempts': 'Yeni Denemeler',
			'newAttemptsDetails': '{newNum, plural, =0 {{reAttemptNum, plural, =1 {1 yeniden deneme} other {{reAttemptNum} reattempts}}} other {{reAttemptNum, plural, =0 {{newNum} new} =1{{newNum} new, 1 yeniden deneme} other {{newNum} new, {reAttemptNum} yeniden deneme}}}}',
			'newPostDetails': '{numInteractions, plural, =1 {1 dizi veya yanıt} other {{numInteractions} dizi veya yanıt}}',
			'newPosts': 'Yeni Gönderiler',
			'newSubmissionDetails': '{newNum, plural, =0 {{resub, plural, =1 {1 yeniden gönderim} other {{resub} yeniden gönderim}}} other {{resub, plural, =0 {{newNum} new} =1{{newNum} new, 1 yeniden gönderim} other {{newNum} new, {resub} yeniden gönderim}}}}',
			'newSubmissions': 'Yeni Gönderim Kutusu Gönderimleri',
			'no': 'Hayır',
			'noCriteriaMatch': 'Kriterinizle eşleşen gönderi yok.',
			'noCriteriaMatchActivities': 'Kriterinizle eşleşen etkinlik yok.',
			'noResults': 'Sonuç yok.',
			'noSubmissions': 'İlgilenmeniz gereken gönderi yok.',
			'publishAll': 'Tümünü Yayımla',
			'publishAllConfirmDialogMessage': '{assigned} kullanıcıdan {evaluated} tanesi yayımlama konusunda geri bildirim alacak. Devam etmek istiyor musunuz?',
			'publishAllToastMessage': '{activityName} değerlendirmeler başarılı bir şekilde yayınlandı.',
			'publishAllToastMessageTruncated': '{truncatedActivityName}… değerlendirmeler başarılı bir şekilde yayınlandı.',
			'published': 'Yayınlandı',
			'quiz': 'Sınav',
			'search': 'Ara',
			'searchResultsMore': '{num}+ Arama Sonucu',
			'searchResultsMultiple': '{num} Arama Sonucu',
			'searchResultsSingle': '1 Arama Sonucu',
			'sortBy': 'Şuna göre sırala: {columnName}',
			'submissionDate': 'Gönderme Tarihi',
			'submissionList': 'Gönderim Listesi',
			'submissions': 'Gönderimler',
			'tableTitle': 'Dersler ve araçlar genelinde değerlendirilmemiş Öğrenci gönderilerinin listesi',
			'toggleIndicatorLabelActions': '{target} Üzerinde Eylemler Gerçekleştir',
			'toggleIndicatorLabelInfo': 'Get Info on {target}',
			'tryAgain': 'Tekrar Dene',
			'viewBy': 'Görüntüleme ölçütü:',
			'yes': 'Evet'
		};
	}
};

export const LangTr = dedupingMixin(LangTrImpl);

