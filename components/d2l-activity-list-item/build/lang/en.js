'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEnImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.en = {
			'enroll': 'Enroll',
			'clickToViewActivity': 'Click to view activity'
		};
	}
};

export const LangEn = dedupingMixin(LangEnImpl);

