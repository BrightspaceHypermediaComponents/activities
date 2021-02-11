import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

export const LocalizeWorkToDoMixin = superclass => class extends LocalizeMixin(superclass) {

	static async getLocalizeResources(langs) {
		let translations;
		for await (const lang of langs) {
			switch (lang) {
				case 'en':
					translations = await import('../lang/en.js');
					break;
				case 'es':
					translations = await import('../lang/es.js');
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
				return {
					language: lang,
					resources: translations.val
				};
			}
		}

		translations = await import('../lang/en.js');
		return {
			language: 'en',
			resources: translations.val
		};
	}
};
