'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangTrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.tr = {
			'activityName': 'Etkinlik Adı',
			'courseName': 'Ders',
			'displayName': 'Ad, Soyad',
			'failedToLoadData': 'Unable to load submissions. Try again in a few minutes.',
			'failedToLoadMore': 'Unable to load more submissions. Try again in a few minutes.',
			'loadMore': 'Daha fazla yükle',
			'loading': 'Yükleniyor',
			'masterTeacher': 'Master Teacher',
			'submissionDate': 'Gönderme Tarihi',
			'tryAgain': 'Try Again'
		};
	}
};

export const LangTr = dedupingMixin(LangTrImpl);

