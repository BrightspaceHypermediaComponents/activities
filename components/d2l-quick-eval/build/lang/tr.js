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
			'close': 'Close',
			'completed': 'Tamamlandı',
			'confirmation': 'Confirmation',
			'courseName': 'Ders',
			'discussion': 'Tartışma',
			'displayName': 'Ad, Soyad',
			'due': 'Bitiş:{date}',
			'evaluate': 'Değerlendir: {displayName}',
			'evaluateAll': 'Tümünü Değerlendir',
			'evaluated': 'Değerlendirildi',
			'failedToFilter': 'Filtre uygulanamıyor. Birkaç dakika içinde tekrar deneyin.',
			'failedToLoadData': 'Gönderiler yüklenemiyor. Birkaç dakika içinde tekrar deneyin.',
			'failedToLoadMore': 'Daha fazla gönderi yüklenemiyor. Birkaç dakika içinde tekrar deneyin.',
			'failedToSearch': 'Arama uygulanamıyor. Birkaç dakika içinde tekrar deneyin.',
			'firstName': 'Adı',
			'lastName': 'Soyadı',
			'loadMore': 'Daha fazla yükle',
			'loading': 'Yükleniyor',
			'masterTeacher': 'Öğretmen',
			'no': 'No',
			'noCriteriaMatch': 'Kriterinizle eşleşen gönderi yok.',
			'noCriteriaMatchActivities': 'There are no activities that match your criteria.',
			'noResults': 'Sonuç yok.',
			'noSubmissions': 'İlgilenmeniz gereken gönderi yok.',
			'publishAll': 'Tümünü Yayımla',
			'publishAllConfirmDialogMessage': '{evaluated} out of {assigned} users will receive feedback on publishing. Do you want to continue?',
			'publishAllToastMessage': '{activityName} evaluations published successfully.',
			'publishAllToastMessageTruncated': '{truncatedActivityName}… evaluations published successfully.',
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
			'toggleIndicatorLabel': 'Perform Actions on {target}',
			'tryAgain': 'Tekrar Dene',
			'newSubmissions': 'New Submissions',
			'newSubmissionDetails': '{newNum} new, {resub} resubmissions',
			'newSubmissionSingularDetails': '{newNum} new, 1 resubmission',
			'newPosts': 'New Posts',
			'newPostDetails': '{numInteractions} threads or replies',
			'newPostSingularDetails': '{numInteractions} thread or reply',
			'newAttempts': 'New Attempts',
			'newAttemptsDetails': '{newNum} new, {reAttemptNum} reattempts',
			'newAttemptsSingularReattemptDetails': '{newNum} new, 1 reattempt',
			'viewBy': 'Görüntüleme ölçütü:',
			'yes': 'Yes'
		};
	}
};

export const LangTr = dedupingMixin(LangTrImpl);

