import {Rels} from 'd2l-hypermedia-constants';
import SirenParse from 'siren-parser';

function resetSortHeaders(list) {
	list._headerColumns.forEach(column => {
		column.headers.forEach(header => {
			header.canSort = false;
			header.sorted = false;
			header.desc = false;
		});
	});
}

function stubLoadSorts(list, entity, enabledSorts) {
	const stub = sinon.stub(list, '_followLink');

	const sortEntity = {
		entities: enabledSorts.map(sort => formatSort(sort.className, sort.applied, sort.direction, sort.priority))
	};

	stub.withArgs(entity, Rels.sorts).returns(Promise.resolve({ entity: SirenParse(sortEntity) }));

	return stub;
}

suite('d2l-quick-eval-activities-list-sorting', () => {
	let list;

	setup(function() {
		list = fixture('basic');
		// huge hack, not sure why fixture is not resetting them
		resetSortHeaders(list);
	});

	test('sorting is disabled on all columns by default', () => {
		expect(list._headerColumns.filter(column => column.headers.some(h => h.canSort))).to.be.empty;
	});

	test('headers have expected sort classes', () => {
		const expectedKeyToSortClassHeaderMappings = {
			'firstName': 'first-name',
			'lastName': 'last-name',
			'activityName': 'activity-name',
			'courseName': 'course-name',
			'submissionDate': 'completion-date',
			'masterTeacher': 'primary-facilitator'
		};
		list.masterTeacher = true;
		const listOfHeaders = list._headerColumns
			.map(x=> x.headers)
			.reduce((acc, val) => acc.concat(val), []);

		const keyToSortClassHeaderMappings = {};
		listOfHeaders.forEach(header => {
			keyToSortClassHeaderMappings[header.key] = header.sortClass;
		});

		expect(keyToSortClassHeaderMappings).to.deep.equal(expectedKeyToSortClassHeaderMappings);
	});

	suite('_handleSorts', () => {
		test('_handleSorts does not call _followLink on null entity', () => {
			const stub = sinon.stub(list, '_followLink');
			return list._handleSorts(null)
				.then(() => {
					expect(stub.notCalled).to.be.true;
				});
		});

		suite('_handleSorts error cases', () => {
			const testData = [
				{
					name: 'null sortEntity',
					sortEntity: Promise.resolve(null)
				},
				{
					name: 'null sortEntity.entity',
					sortEntity: Promise.resolve({ entity: null })
				},
				{
					name: '_followLink rejection',
					sortEntity: Promise.reject()
				}
			];

			testData.forEach(testCase => {
				test('_handleSorts rejects on ' + testCase.name, (done) => {
					const stub = sinon.stub(list, '_followLink');
					const entity = {};

					stub.withArgs(entity, Rels.sorts)
						.returns(testCase.sortEntity);

					list._handleSorts(entity)
						.then(() => {
							done('_handleSorts should have rejected');
						})
						.catch(() => {
							done();
						});
				});
			});
		});

		test('_handleSorts determines which headers are sortable', () => {
			const enabledSortClasses = [{ className:'activity-name' }, {className: 'course-name' }];
			const entity = {};

			stubLoadSorts(list, entity, enabledSortClasses);

			return list._handleSorts(entity)
				.then(() => {
					const enabledSorts = list._headerColumns
						.map(column => column.headers)
						.reduce((acc, val) => acc.concat(val), []) // flatten
						.filter(h => h.canSort)
						.map(h => h.sortClass);

					expect(enabledSorts).to.have.same.members(enabledSortClasses.map(x => x.className));
				});
		});
		test('_handleSorts only sets the primary sort header to sorted', () => {
			const enabledSortClasses = [
				{ className: 'first-name', applied: true, direction: 'descending', priority: 0 },
				{ className: 'completion-date', applied: true, direction: 'ascending', priority: 1 },
				{ className: 'last-name', applied: false }
			];
			const entity = {};

			stubLoadSorts(list, entity, enabledSortClasses);

			return list._handleSorts(entity)
				.then(() => {
					const activeSorts = list._headerColumns
						.map(column => column.headers)
						.reduce((acc, val) => acc.concat(val), []) // flatten
						.filter(h => h.sorted);

					expect(activeSorts).to.have.lengthOf(1);
					expect(activeSorts[0]).to.have.property('sortClass', 'first-name');
					expect(activeSorts[0]).to.have.property('desc', true);
				});
		});
	});

	suite('_handleSortRequested', () => {
		suite('_handleSortRequested error cases', () => {
			const testData = [
				{
					name: 'header not found',
					id: {}
				},
				{
					name: 'unsortable header',
					id: 'activityName'
				}
			];
			testData.forEach(testCase => {
				test(testCase.name, (done) => {
					var stub = sinon.stub(list, '_applySortAndFetchData');
					const e = {
						detail: {
							headerId: testCase.id
						}
					};

					list._handleSortRequested(e)
						.then(() => {
							done('_handleSortRequested should have rejected');
						})
						.catch(() => {
							expect(stub.notCalled, '_applySortAndFetchData should not be called').to.be.true;
							done();
						})
						.catch((err) => {
							done(err);
						});
				});
			});
		});

		suite('_handleSortRequested only sets sortable header to sorted', () => {
			const testData = [
				{
					name: 'ascending',
					desc: false
				},
				{
					name: 'descending',
					desc: true
				}
			];

			testData.forEach(testCase => {
				test(testCase.name, () => {
					const activeSortKey = 'activityName';
					const stub = sinon.stub(list, '_applySortAndFetchData').callsFake(() => Promise.resolve());
					const e = {
						detail: {
							headerId: activeSortKey
						}
					};

					list._headerColumns.forEach(column => {
						column.headers.forEach(header => {
							if (header.key === activeSortKey) {
								header.canSort = true;
								header.desc = !testCase.desc;
								header.sorted = testCase.desc;
							}
						});
					});

					return list._handleSortRequested(e)
						.then(() => {
							const activeSorts = list._headerColumns
								.map(column => column.headers)
								.reduce((acc, val) => acc.concat(val), []) // flatten
								.filter(h => h.sorted);

							expect(activeSorts).to.have.lengthOf(1);
							expect(activeSorts[0]).to.have.property('key', activeSortKey);
							expect(activeSorts[0]).to.have.property('desc', testCase.desc);
							expect(stub.withArgs('activity-name', testCase.desc).calledOnce).to.be.true;
						});
				});
			});
		});
	});

	suite('_applySortAndFetchData', () => {
		test('_applySortAndFetchData correctly fetches data', () => {
			const appliedSortClass = 'activity-name';
			const activityNameSort = formatSort(appliedSortClass);
			const sorts = SirenParse(formatSimpleSorts([activityNameSort]));
			const sortAction = sorts.getSubEntityByClass(appliedSortClass).getActionByName('sort-ascending');
			const applyAction = sorts.getActionByName('apply');
			const collection = {};
			const customParams = { pageSize: 17 };

			const followLinkStub = sinon.stub(list, '_followLink');
			const performActionStub = sinon.stub(list, '_performSirenActionWithQueryParams');

			followLinkStub.withArgs(list.entity, Rels.sorts).returns(Promise.resolve({ entity: sorts }));
			performActionStub.withArgs(sortAction).returns(sorts);
			performActionStub.withArgs(applyAction, customParams).returns(collection);

			return list._applySortAndFetchData('activity-name', false, customParams)
				.then(actual => {
					expect(actual).to.deep.equal(collection);
				});
		});
	});
});

function formatSimpleSorts(sortEntities) {
	return {
		entities: sortEntities,
		actions: [
			{
				name: 'apply',
				href: '/collection',
				fields: [
					{
						class: ['base64', 'json'],
						type: 'hidden',
						name: 'sort',
						value: 'sortState'
					}
				]
			}
		]
	};
}

function formatSort(klass, applied, direction, priority) {
	return {
		rel: ['https://api.brightspace.com/rels/sort'],
		class: ['sort', klass],
		properties: {
			applied: applied,
			direction: direction,
			priority: priority
		},
		actions: [
			{
				name: 'sort-ascending',
				href: '/sorts',
				fields: [
					{
						type: 'hidden',
						name: 'sort',
						value: `${klass}-asc`
					}
				]
			},
			{
				name: 'sort-descending',
				href: '/sorts',
				fields: [
					{
						type: 'hidden',
						name: 'sort',
						value: `${klass}-desc`
					}
				]
			}
		]
	};
}
