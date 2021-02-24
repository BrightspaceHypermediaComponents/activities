import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { getLocalizeOverrideResources } from '@brightspace-ui/core/helpers/getLocalizeResources.js';

export const LocalizeWorkToDoMixin = superclass => class extends LocalizeMixin(superclass) {

	static async getLocalizeResources(langs) {

		function resolveOverridesFunc() {
			return 'd2l-activities\\workToDo';
		}

		let translations;
		for await (const lang of langs) {
			switch (lang) {
				case 'ar':
					translations = await import('../lang/ar.js');
					break;
				case 'cy-gb':
					translations = await import('../lang/cy-gb.js');
					break;
				case 'cy':
					translations = await import('../lang/cy.js');
					break;
				case 'da':
					translations = await import('../lang/da.js');
					break;
				case 'de':
					translations = await import('../lang/de.js');
					break;
				case 'en':
					translations = await import('../lang/en.js');
					break;
				case 'es-es':
					translations = await import('../lang/es-es.js');
					break;
				case 'es':
					translations = await import('../lang/es.js');
					break;
				case 'fr-ca':
					translations = await import('../lang/fr-ca.js');
					break;
				case 'fr':
					translations = await import('../lang/fr.js');
					break;
				case 'ja':
					translations = await import('../lang/ja.js');
					break;
				case 'ko':
					translations = await import('../lang/ko.js');
					break;
				case 'nl':
					translations = await import('../lang/nl.js');
					break;
				case 'pt':
					translations = await import('../lang/pt.js');
					break;
				case 'sv':
					translations = await import('../lang/sv.js');
					break;
				case 'tr':
					translations = await import('../lang/tr.js');
					break;
				case 'zh-tw':
					translations = await import('../lang/zh-tw.js');
					break;
				case 'zh':
					translations = await import('../lang/zh.js');
					break;
			}
			if (translations && translations.val) {
				return await getLocalizeOverrideResources(
					lang,
					translations.val,
					resolveOverridesFunc
				);
			}
		}

		translations = await import('../lang/en.js');
		return await getLocalizeOverrideResources(
			'en',
			translations.val,
			resolveOverridesFunc
		);
	}
};
