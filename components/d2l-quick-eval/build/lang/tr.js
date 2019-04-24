'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangTrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.tr = {
			'activityName': 'Etkinlik Adı',
			'caughtUp': 'Yetiştin!',
			'checkBackOften': 'Yeni gönderiler için belirli aralıklarla tekrar kontrol edin.',
			'clearSearch': 'Aramayı Temizle',
			'courseName': 'Ders',
			'displayName': 'Ad, Soyad',
			'evaluate': 'Değerlendir: {displayName}',
			'failedToFilter': 'Filtre uygulanamıyor. Birkaç dakika içinde tekrar deneyin.',
			'failedToLoadData': 'Gönderiler yüklenemiyor. Birkaç dakika içinde tekrar deneyin.',
			'failedToLoadMore': 'Daha fazla gönderi yüklenemiyor. Birkaç dakika içinde tekrar deneyin.',
			'failedToSearch': 'Arama uygulanamıyor. Birkaç dakika içinde tekrar deneyin.',
			'firstName': 'Adı',
			'lastName': 'Soyadı',
			'loadMore': 'Daha fazla yükle',
			'loading': 'Yükleniyor',
			'masterTeacher': 'Öğretmen',
			'noCriteriaMatch': 'Kriterinizle eşleşen gönderi yok.',
			'noResults': 'Sonuç yok.',
			'noSubmissions': 'İlgilenmeniz gereken gönderi yok.',
			'search': 'Ara',
			'searchResultsMore': '{num}+ Search Results',
			'searchResultsMultiple': '{num} Arama Sonucu',
			'searchResultsSingle': '1 Arama Sonucu',
			'sortBy': 'Şuna göre sırala: {columnName}',
			'submissionDate': 'Gönderme Tarihi',
			'tableTitle': 'Dersler ve araçlar genelinde değerlendirilmemiş Öğrenci gönderilerinin listesi',
			'tryAgain': 'Tekrar Dene'
		};
	}
};

export const LangTr = dedupingMixin(LangTrImpl);

