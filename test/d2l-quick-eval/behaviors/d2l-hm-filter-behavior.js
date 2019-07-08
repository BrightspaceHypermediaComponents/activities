import SirenParse from 'siren-parser';

suite('d2l-hm-filter-behavior', function() {
	let filterBehavior;
	setup(function() {
		filterBehavior = fixture('basic');
	});
	test('default state is correct', () => {
		assert.isNotOk(filterBehavior.filterHref);
		assert.isNotOk(filterBehavior.filterError);
		assert.isFalse(filterBehavior.filterApplied);
		assert.isFalse(filterBehavior.filtersLoading);
	});

	test('Properly set filterHref given valid entity', () => {
		const entity = {
			'links': [
				{
					'rel': ['https://api.brightspace.com/rels/filters'],
					'href': '/not/a/real/url'
				}
			]
		};

		filterBehavior.entity = SirenParse(entity);
		assert.isOk(filterBehavior.filterHref);
	});
	test('Properly set filterHref given invalid entity', () => {
		filterBehavior.entity = null;
		assert.isNotOk(filterBehavior.filterHref);
	});

	test('d2l-hm-filter-filters-loaded sets filterApplied to true when at least 1 filter is applied', () => {
		filterBehavior.dispatchEvent(
			new CustomEvent(
				'd2l-hm-filter-filters-loaded',
				{
					detail: {
						totalSelectedFilters: 1
					}
				}
			)
		);
		assert.isTrue(filterBehavior.filterApplied);
	});
	test('d2l-hm-filter-filters-loaded sets filterApplied to false when no filters are applied', () => {
		filterBehavior.dispatchEvent(
			new CustomEvent(
				'd2l-hm-filter-filters-loaded',
				{
					detail: {
						totalSelectedFilters: 0
					}
				}
			)
		);
		assert.isFalse(filterBehavior.filterApplied);
	});
	test('d2l-hm-filter-filters-loaded sets filterError to falsy', () => {
		filterBehavior.dispatchEvent(
			new CustomEvent(
				'd2l-hm-filter-filters-loaded',
				{
					detail: {
						totalSelectedFilters: 0
					}
				}
			)
		);
		assert.isNotOk(filterBehavior.filterError);
	});
	test('d2l-hm-filter-filters-loaded calls this._clearErrors with no parameters', (done) => {
		filterBehavior._clearErrors = done;
		filterBehavior.dispatchEvent(
			new CustomEvent(
				'd2l-hm-filter-filters-loaded',
				{
					detail: {
						totalSelectedFilters: 0
					}
				}
			)
		);
	});

	test('d2l-hm-filter-filters-updating sets filtersLoading to true', () => {
		filterBehavior.dispatchEvent(
			new CustomEvent('d2l-hm-filter-filters-updating', {})
		);
		assert.isTrue(filterBehavior.filtersLoading);
	});
	test('d2l-hm-filter-filters-updating sets filterError to falsy', () => {
		filterBehavior.dispatchEvent(
			new CustomEvent('d2l-hm-filter-filters-updating', {})
		);
		assert.isNotOk(filterBehavior.filterError);
	});
	test('d2l-hm-filter-filters-updating calls this._clearErrors with no parameters', (done) => {
		filterBehavior._clearErrors = done;
		filterBehavior.dispatchEvent(
			new CustomEvent('d2l-hm-filter-filters-updating', {})
		);
	});

	test('d2l-hm-filter-filters-updated sets entity', () => {
		const entity = { key: 'value' };
		filterBehavior.dispatchEvent(
			new CustomEvent(
				'd2l-hm-filter-filters-updated',
				{
					detail: {
						filteredActivities: entity
					}
				}
			)
		);
		assert.equal(filterBehavior.entity, entity);
	});
	test('d2l-hm-filter-filters-updated sets filtersLoaded to false', () => {
		filterBehavior.dispatchEvent(
			new CustomEvent(
				'd2l-hm-filter-filters-updated',
				{
					detail: {
						filteredActivities: {}
					}
				}
			)
		);
		assert.isFalse(filterBehavior.filtersLoading);
	});
	test('d2l-hm-filter-filters-updated sets filterError to falsy', () => {
		filterBehavior.dispatchEvent(
			new CustomEvent(
				'd2l-hm-filter-filters-updated',
				{
					detail: {
						filteredActivities: {}
					}
				}
			)
		);
		assert.isNotOk(filterBehavior.filterError);
	});
	test('d2l-hm-filter-filters-updated calls this._clearErrors with no parameters', (done) => {
		filterBehavior._clearErrors = done;
		filterBehavior.dispatchEvent(
			new CustomEvent(
				'd2l-hm-filter-filters-updated',
				{
					detail: {
						filteredActivities: {}
					}
				}
			)
		);
	});

	test('d2l-hm-filter-filter-error sets filtersLoading to false', () => {
		filterBehavior.dispatchEvent(
			new CustomEvent(
				'd2l-hm-filter-error',
				{
					detail: {}
				}
			)
		);
		assert.isFalse(filterBehavior.filtersLoading);
	});
	test('d2l-hm-filter-filter-error sets filterError', () => {
		const error = new Error();
		filterBehavior.dispatchEvent(
			new CustomEvent(
				'd2l-hm-filter-error',
				{
					detail: error
				}
			)
		);
		assert.equal(filterBehavior.filterError, error);
	});

	test('default implementation of _clearErrors sets filterError to falsy', () => {
		filterBehavior._clearErrors();
		assert.isNotOk(filterBehavior.filterError);
	});
});
