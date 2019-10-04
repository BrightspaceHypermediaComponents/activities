export async function getLocalizeResources(langs) {
	const imports = [];
	let supportedLanguage;
	for (const language of langs.reverse()) {
		switch (language) {
			case 'en':
				supportedLanguage = 'en';
				imports.push(import('./lang/build/en.js'));
				break;
			case 'fr':
				supportedLanguage = 'fr';
				imports.push(import('./lang/build/fr.js'));
				break;
		}
	}
	const translationFiles = await Promise.all(imports);
	const langterms = {};
	for (const translationFile of translationFiles) {
		for (const langterm in translationFile.translations) {
			langterms[langterm] = translationFile.translations[langterm].translation;
		}
	}
	return {
		language: supportedLanguage,
		resources: langterms
	};
}
