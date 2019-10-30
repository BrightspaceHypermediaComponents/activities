import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-localize-behavior/d2l-localize-behavior.js';
import {LangAr} from './build/lang/ar.js';
import {LangDe} from './build/lang/de.js';
import {LangEn} from './build/lang/en.js';
import {LangEs} from './build/lang/es.js';
import {LangFi} from './build/lang/fi.js';
import {LangFr} from './build/lang/fr.js';
import {LangJa} from './build/lang/ja.js';
import {LangKo} from './build/lang/ko.js';
import {LangNl} from './build/lang/nl.js';
import {LangPt} from './build/lang/pt.js';
import {LangSv} from './build/lang/sv.js';
import {LangTr} from './build/lang/tr.js';
import {LangZhtw} from './build/lang/zh-tw.js';
import {LangZh} from './build/lang/zh.js';

const LangImpl = (prefix, langObj, superClass) => class extends superClass {
	constructor() {
		super();
		this[prefix] = langObj;
	}
};

const LANGUAGES = ['ar', 'de', 'en', 'es', 'fi', 'fr', 'ja', 'ko', 'nl', 'pt', 'sv', 'tr', 'zh-tw', 'zh'];

/* @polymerMixin */
const ActivityListItemLocalizeImpl = (superClass) => {
	const langMixins = [
		LangAr,
		LangDe,
		LangEn,
		LangEs,
		LangFi,
		LangFr,
		LangJa,
		LangKo,
		LangNl,
		LangPt,
		LangSv,
		LangTr,
		LangZhtw,
		LangZh
	];
	let mixinLang = mixinBehaviors([D2L.PolymerBehaviors.LocalizeBehavior], superClass);
	LANGUAGES.forEach((langPrefix, index)=> {
		mixinLang = dedupingMixin(LangImpl.bind(null, langPrefix, langMixins[index])).call(null, mixinLang);
	});
	return class extends mixinLang {
		constructor() {
			super();
			this.resources = {
				'en': this.en,
				'ar': this.ar,
				'de': this.de,
				'es': this.es,
				'fi': this.fi,
				'fr': this.fr,
				'ja': this.ja,
				'ko': this.ko,
				'nl': this.nl,
				'pt': this.pt,
				'sv': this.sv,
				'tr': this.tr,
				'zh': this.zh,
				'zh-tw': this.zhtw
			};
		}
		static get properties() {
			return {
				locale: {
					type: String,
					value: function() {
						return document.documentElement.lang
							|| document.documentElement.getAttribute('data-lang-default')
							|| 'en-us';
					}
				}
			};
		}
	};
};

export const ActivityListItemLocalize = dedupingMixin(ActivityListItemLocalizeImpl);

