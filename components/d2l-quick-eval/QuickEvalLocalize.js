import 'd2l-localize-behavior/d2l-localize-behavior.js';
import ar from './lang/ar.js';
import cy from './lang/cy.js';
import da from './lang/da.js';
import de from './lang/de.js';
import en from './lang/en.js';
import es from './lang/es.js';
import eses from './lang/es-es.js';
import fr from './lang/fr.js';
import frfr from './lang/fr-fr.js';
import ja from './lang/ja.js';
import ko from './lang/ko.js';
import nl from './lang/nl.js';
import pt from './lang/pt.js';
import sv from './lang/sv.js';
import tr from './lang/tr.js';
import zhcn from './lang/zh-cn.js';
import zhtw from './lang/zh-tw.js';

// eslint-disable-next-line sort-imports
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

const QuickEvalLocalizeImpl = (superClass) => {

	return class extends mixinBehaviors([D2L.PolymerBehaviors.LocalizeBehavior], superClass) {
		static get properties() {
			return {
				resources: {
					value: function() {
						return {
							'en': en,
							'ar': ar,
							'cy': cygb,
							'da': dadk,
							'de': de,
							'es': es,
							'es-es': eses,
							'fr': fr,
							'fr-fr': frfr,
							'ja': ja,
							'ko': ko,
							'nl': nl,
							'pt': pt,
							'sv': sv,
							'tr': tr,
							'zh-cn': zhcn,
							'zh-tw': zhtw
						};
					}
				},
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

export const QuickEvalLocalize = dedupingMixin(QuickEvalLocalizeImpl);

export const LitQuickEvalLocalize = superclass => class extends LocalizeMixin(superclass) {

	static async getLocalizeResources(langs) {
		let translations;
		for await (const lang of langs) {
			switch (lang) {
				case 'ar':
					translations = ar;
					break;
				case 'cy':
					translations = cy;
					break;
				case 'da':
					translations = da;
					break;
				case 'de':
					translations = de;
					break;
				case 'en':
					translations = en;
					break;
				case 'es':
					translations = es;
					break;
				case 'es-es':
					translations = eses;
					break;
				case 'fi':
					translations = fi;
					break;
				case 'fr':
					translations = fr;
					break;
				case 'fr-fr':
					translations = frfr;
					break;
				case 'ja':
					translations = ja;
					break;
				case 'ko':
					translations = ko;
					break;
				case 'nl':
					translations = nl;
					break;
				case 'pt':
					translations = pt;
					break;
				case 'sv':
					translations = sv;
					break;
				case 'tr':
					translations = tr;
					break;
				case 'zh-cn':
					translations = zhcn;
					break;
				case 'zh-tw':
					translations = zhtw;
					break;
			}

			if (translations) {
				return {
					language: lang,
					resources: translations
				};
			}
		}
		translations = en;
		return {
			language: 'en',
			resources: translations
		};
	}
};
