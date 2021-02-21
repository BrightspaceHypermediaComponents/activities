import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';

export const LocalizeWorkToDoMixin = superclass => class extends LocalizeDynamicMixin(superclass) {

	static get config() {
		return {
			importFunc: lang => import(`../lang/${lang}.js`),
			osloCollection: 'd2l-activities\\workToDo',
			exportName: 'val',
		};
	}
};
