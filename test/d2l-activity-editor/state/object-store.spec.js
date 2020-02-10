import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { ObjectStore } from '../../../components/d2l-activity-editor/state/object-store.js';
import { TestObject } from './test-object.js';
import { when } from 'mobx';

chai.use(chaiAsPromised);

jest.mock('./test-object.js');

describe('Object Store', function() {

	let store;

	beforeEach(() => {
		store = new ObjectStore(TestObject);
	});

	afterEach(() => {
		TestObject.mockClear();
	});

	describe('when succeeds', () => {
		let mockFetch;

		beforeEach(() => {
			TestObject.mockImplementation(() => {
				const object =  {};
				mockFetch = jest.fn(() => Promise.resolve(object));
				object.fetch = mockFetch;
				return object;
			});
		});

		it('fetches object', async() => {
			const object = await store.fetch('http://1', 'token');
			expect(store._objects.size).to.equal(1);

			const object2 = await store.fetch('http://1', 'token');
			expect(object2).to.equal(object);

			expect(TestObject.mock.calls.length).to.equal(1);
			expect(TestObject.mock.calls[0][0]).to.equal('http://1');
			expect(TestObject.mock.calls[0][1]).to.equal('token');
			expect(mockFetch.mock.calls.length).to.equal(1);

			const object3 = store.get('http://1');
			expect(object3).to.equal(object);
		});

		it('reacts to object get', async(done) => {
			when(
				() => !!store.get('http://1'),
				() => {
					done();
				}
			);

			await store.fetch('http://1', 'token');
		});
	});

	describe('When object throws an error', () => {
		beforeAll(() => {
			TestObject.mockImplementation(() => {
				return {
					fetch: () => 	Promise.reject()
				};
			});
		});

		it('propagates error', async() => {
			await expect(store.fetch('http://1', 'token')).to.be.rejected;
			expect(store._fetches.size).to.equal(0);
			expect(store._objects.size).to.equal(0);
		});
	});
});
