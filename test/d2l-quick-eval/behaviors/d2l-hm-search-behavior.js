import SirenParse from 'siren-parser';

(function() {
	let searchBehavior;

	function makeEntity(term) {
		const entity = {
			'actions': [
				{
					'name': 'search',
					'href': '/not/a/real/url',
					fields: [
						{ name: 'collectionSearch' }
					]
				}
			]
		};

		if (term) {
			entity.actions[0].fields[0].value = term;
		}

		const parsedEntity = SirenParse(entity);

		return parsedEntity;
	}

	suite('d2l-hm-search-behavior', function() {
		setup(function() {
			searchBehavior = fixture('basic');
		});
		test('default state is correct', () => {
			assert.isNotOk(searchBehavior.searchAction);
			assert.isFalse(searchBehavior.searchApplied);
			assert.isNull(searchBehavior.searchError);
			assert.isFalse(searchBehavior.searchLoading);
		});
		test('properly sets searchAction given valid entity', () => {
			const parsedEntity = makeEntity();

			searchBehavior.entity = parsedEntity;
			assert.isOk(searchBehavior.searchAction);
			assert.equal(searchBehavior.searchAction, parsedEntity.actions[0]);
		});

		test('Properly set searchAction given invalid entity', () => {
			searchBehavior.entity = null;
			assert.isNotOk(searchBehavior.searchAction);
		});

		test('properly sets searchTerm given valid entity', () => {
			const searchTerm = 'assignment';
			const parsedEntity = makeEntity(searchTerm);

			searchBehavior.entity = parsedEntity;
			assert.equal(searchBehavior.searchTerm, searchTerm);
		});

		test('properly sets searchTerm given invalid entity', () => {
			searchBehavior.entity = null;
			assert.isNotOk(searchBehavior.searchTerm);
		});

		test('d2l-hm-search-results-loading sets searchLoading to true', () => {
			searchBehavior.dispatchEvent(
				new CustomEvent(
					'd2l-hm-search-results-loading'
				)
			);
			assert.isTrue(searchBehavior.searchLoading);
		});

		test('d2l-hm-search-results-loaded sets searchLoading to false and entity to results and error to null', () => {
			const parsedEntity = makeEntity();

			searchBehavior.dispatchEvent(
				new CustomEvent(
					'd2l-hm-search-results-loaded',
					{
						detail: {
							results: parsedEntity,
							searchIsCleared: false
						}
					}
				)
			);
			assert.isTrue(searchBehavior.searchApplied);
			assert.isFalse(searchBehavior.searchLoading);
			assert.equal(parsedEntity, searchBehavior.entity);
			assert.isNull(searchBehavior.searchError);
		});

		test('_clearErrors sets searchError to null', () => {
			searchBehavior.searchError = true;
			searchBehavior._clearErrors();
			assert.isNull(searchBehavior.searchError);
		});

		test('d2l-hm-search-error sets searchError correctly', () => {
			const errorDetail = { error: true };
			searchBehavior.dispatchEvent(
				new CustomEvent(
					'd2l-hm-search-error',
					{
						detail: errorDetail
					}
				)
			);
			assert.isFalse(searchBehavior.searchLoading);
			assert.equal(errorDetail, searchBehavior.searchError);
		});

		test('searchIsCleared sets searchApplied to false', () => {
			searchBehavior.dispatchEvent(
				new CustomEvent(
					'd2l-hm-search-results-loaded',
					{
						detail: {
							results: makeEntity(),
							searchIsCleared: true
						}
					}
				)
			);
			assert.isFalse(searchBehavior.searchLoading);
			assert.isFalse(searchBehavior.searchApplied);
		});
	});
})();
