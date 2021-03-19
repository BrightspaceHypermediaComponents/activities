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
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

const ActivityCardImpl = (superClass) => {

	return class extends mixinBehaviors([D2L.PolymerBehaviors.LocalizeBehavior], superClass) {
		static get properties() {
			return {
				resources: {
					value: function() {
						return {
							'en': en,
							'ar': ar,
							'cy': cy,
							'da': da,
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

export const ActivityCardLocalize = dedupingMixin(ActivityCardImpl);
