import { ContentModule } from '../../../../components/d2l-activity-editor/d2l-activity-content-editor/module/state/content-module.js';
import { ContentModuleEntity } from 'siren-sdk/src/activities/content/ContentModuleEntity.js';
import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import sinon from 'sinon';

jest.mock('siren-sdk/src/activities/content/ContentModuleEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Content Module', function() {

	afterEach(() => {
		sinon.restore();
		ContentModuleEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	beforeEach(() => {
		sirenEntity = sinon.stub();

		ContentModuleEntity.mockImplementation(() => {
			return {
				title: () => 'Test Module Title',
				descriptionRichText: () => '<p>test module description</p>'
			};
		});

		fetchEntity.mockImplementation(() => sirenEntity);
	});

	it('fetches content module', async() => {
		const contentModule = new ContentModule('http://test-module-href.com', 'token');
		await contentModule.fetch();

		expect(contentModule.moduleTitle).to.equal('Test Module Title');
		expect(contentModule.moduleDescriptionRichText).to.equal('<p>test module description</p>');

		expect(fetchEntity.mock.calls.length).to.equal(1);
		expect(ContentModuleEntity.mock.calls[0][0]).to.equal(sirenEntity);
		expect(ContentModuleEntity.mock.calls[0][1]).to.equal('token');
	});
});
