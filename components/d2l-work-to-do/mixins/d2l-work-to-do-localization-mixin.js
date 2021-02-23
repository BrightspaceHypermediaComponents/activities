import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';

export const LocalizeWorkToDoMixin = superclass => class extends LocalizeDynamicMixin(superclass) {

	static get config() {
		return {
			importFunc: lang => import(`../lang/${lang}.js`),
			supportedLangs: ['ar', 'cy-gb', 'cy', 'da', 'de', 'en', 'en-us', 'es-es', 'es', 'fr-ca', 'fr', 'ja', 'ko', 'nl', 'pt', 'sv', 'tr', 'zh-tw', 'zh'],
			osloCollection: 'd2l-activities\\workToDo',
			exportName: 'val',
		};
	}
};
