import { Collection } from '../../../components/d2l-activity-collection-editor/state/Collection.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';
import { fixture, html, oneEvent, waitUntil, expect } from '@open-wc/testing';

describe('Collection', () => {
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
		// real call to entityFactory within constructor does nothing
		usageEntity = {
			isDraft: () => true,
			canEditDraft: () => true,
			onSpecializationChange: sinon.stub(),
			onActivityCollectionChange: sinon.stub(),
			subEntitiesLoaded: sinon.stub().resolves(true)
		};
		specializationEntity = {
			getName: () => 'Name',
			getDescription: () => 'Description',
			setName: () => {},
			setDescription: () => {}
		};
		collectionEntity = {
			onItemsChange: sinon.stub(),
			subEntitiesLoaded: sinon.stub().resolves(true),
			_entity: {
				getActionByName: sinon.stub().returns('http://2')
			}
		};
		itemEntity = {
			onActivityUsageChange: (func) => func(itemUsageEntity),
			self: sinon.stub()
		};
		itemUsageEntity = {
			onOrganizationChange: (func) => func({ ...organizationEntity })
		};
		organizationEntity = {};
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
			state.fetchCandidates = sinon.stub(state, 'fetchCandidates');
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

			state.fetchCandidates.restore();
		});
	});

	describe('_fetchCandidates', () => {

	});
});
