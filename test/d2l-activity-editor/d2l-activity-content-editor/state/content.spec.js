import { Content } from '../../../../components/d2l-activity-editor/d2l-activity-content-editor/state/content.js';
import { ContentEntity } from 'siren-sdk/src/activities/content/ContentEntity.js';
import { ContentModuleEntity } from 'siren-sdk/src/activities/content/ContentModuleEntity.js';
import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import sinon from 'sinon';

jest.mock('siren-sdk/src/activities/content/ContentEntity.js');
jest.mock('siren-sdk/src/activities/content/ContentModuleEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Content', function() {

	afterEach(() => {
		sinon.restore();
		ContentEntity.mockClear();
		ContentModuleEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	beforeEach(() => {
		sirenEntity = sinon.stub();

		ContentEntity.mockImplementation(() => {
			return {
				getModuleHref: () => 'http://test-href.com',
				getEntityType: () => 'module'
			};
		});

		ContentModuleEntity.mockImplementation(() => {
			return {
				title: () => 'Test Module Title',
				descriptionRichText: () => '<p>test module description</p>'
			};
		});

		fetchEntity.mockImplementation(() => sirenEntity);
	});

	it('fetches content module', async() => {
		const content = new Content('http://content/1', 'token');
		await content.fetch();

		expect(content.moduleTitle).to.equal('Test Module Title');
		expect(content.moduleDescriptionRichText).to.equal('<p>test module description</p>');

		expect(fetchEntity.mock.calls.length).to.equal(2);
		expect(ContentEntity.mock.calls[0][0]).to.equal(sirenEntity);
		expect(ContentEntity.mock.calls[0][1]).to.equal('token');
		expect(ContentModuleEntity.mock.calls[0][0]).to.equal(sirenEntity);
		expect(ContentModuleEntity.mock.calls[0][1]).to.equal('token');
	});
});
