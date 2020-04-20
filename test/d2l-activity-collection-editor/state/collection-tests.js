import { Collection } from '../../../components/d2l-activity-collection-editor/state/Collection.js';

describe('Collection unit tests', () => {
	let sandbox,
		state,
		usageEntity,
		specializationEntity,
		collectionEntity,
		itemEntity,
		itemUsageEntity,
		organizationEntity;
	beforeEach(() => {
		sandbox = sinon.createSandbox();
		state = new Collection(null, null);
		state._setSirenProvider({
			entityFactory: sandbox.stub(),
			performAction: sandbox.stub(),
			createActionCollection: sandbox.stub().returns({
				items: () => [{...itemEntity}, {...itemEntity}]
			})
		});
		usageEntity = {
			isDraft: () => true,
			canEditDraft: () => true,
			onSpecializationChange: sandbox.stub(),
			onActivityCollectionChange: sandbox.stub(),
			subEntitiesLoaded: sandbox.stub().resolves(true)
		};
		specializationEntity = {
			getName: () => 'Name',
			getDescription: () => 'Description',
			setName: () => {},
			setDescription: () => {}
		};
		collectionEntity = {
			onItemsChange: sandbox.stub(),
			subEntitiesLoaded: sandbox.stub().resolves(true),
			_entity: {
				getActionByName: sandbox.stub().returns('http://2')
			},
			removeItem: sandbox.stub()
		};
		itemEntity = {
			onActivityUsageChange: (func) => func(itemUsageEntity),
			self: sandbox.stub()
		};
		itemUsageEntity = {
			onOrganizationChange: (func) => func({ ...organizationEntity })
		};
		organizationEntity = {
			self: sandbox.stub().returns('http://org'),
			name: () => 'Org name'
		};
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('_onServerResponse', () => {
		it('Sets the visibility', async() => {
			await state._onServerResponse(usageEntity);
			expect(state.isVisible).to.be.false;
			expect(state.activities).to.be.empty;
		});

		it('Sets the name and description', async() => {
			usageEntity.onSpecializationChange = (type, func) => func(specializationEntity);
			await state._onServerResponse(usageEntity);
			expect(state.name).to.equal('Name');
			expect(state.description).to.equal('Description');
		});

		it('Sets the activities array', async() => {
			state.fetchCandidates = sandbox.stub(state, 'fetchCandidates');
			collectionEntity.onItemsChange = (func) => {
				// clone itemEntity and run callback three times
				for (let i = 0; i < 3; i++) {
					func({ ...itemEntity }, i);
				}
			};
			usageEntity.onActivityCollectionChange = (func) => func(collectionEntity);
			await state._onServerResponse(usageEntity);

			expect(state._loadedImages).is.not.empty;
			expect(state.activities).has.length(3);
		});
	});

	describe('_fetchCandidates', () => {
		beforeEach(async() => {
			state._collection = collectionEntity;
		});

		it('Sets the candidates', async() => {
			expect(state.candidates).to.be.empty;
			await state.fetchCandidates('http://3', [], true);
			expect(state.candidates).to.be.lengthOf(2);
		});
	});
});
