import { Content } from '../../../../components/d2l-activity-editor/d2l-activity-content-editor/state/content.js';
import { ContentEntity } from 'siren-sdk/src/activities/content/ContentEntity.js';
import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import sinon from 'sinon';

jest.mock('siren-sdk/src/activities/content/ContentEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Content', function() {

	afterEach(() => {
		sinon.restore();
		ContentEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	beforeEach(() => {
		sirenEntity = sinon.stub();

		ContentEntity.mockImplementation(() => {
			return {
				title: () => 'Test Content Entity',
			};
		});

		fetchEntity.mockImplementation(() => sirenEntity);
	});

	it('fetches', async() => {
		const content = new Content('http://content/1', 'token');
		await content.fetch();

		expect(content.title).to.equal('Test Content Entity');

		expect(fetchEntity.mock.calls.length).to.equal(1);
		expect(ContentEntity.mock.calls[0][0]).to.equal(sirenEntity);
		expect(ContentEntity.mock.calls[0][1]).to.equal('token');
	});
});
