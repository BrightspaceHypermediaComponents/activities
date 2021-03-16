import { getLocalizeOverrideResources } from '@brightspace-ui/core/helpers/getLocalizeResources.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

export const LocalizeActivityEditorMixin = superclass => class extends LocalizeMixin(superclass) {

	static async getLocalizeResources(langs) {

		function resolveOverridesFunc() {
			return 'd2l-activities\\activityEditor';
		}

		let translations;
		for await (const lang of langs) {
			switch (lang) {
				case 'ar':
					translations = await import('../lang/ar.js');
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
				case 'zh-cn':
					translations = await import('../lang/zh-cn.js');
					break;
				case 'zh-tw':
					translations = await import('../lang/zh-tw.js');
					break;
			}
			if (translations && translations.default) {
				return await getLocalizeOverrideResources(
					lang,
					translations.default,
					resolveOverridesFunc
				);
			}
		}
		translations = await import('../lang/en.js');

		return await getLocalizeOverrideResources(
			'en',
			translations.default,
			resolveOverridesFunc
		);

	}
};
