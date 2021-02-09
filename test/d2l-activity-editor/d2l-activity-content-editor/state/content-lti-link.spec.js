import { ContentLTILink } from '../../../../components/d2l-activity-editor/d2l-activity-content-editor/lti-link/state/content-lti-link.js';
import { ContentLTILinkEntity } from 'siren-sdk/src/activities/content/ContentLTILinkEntity.js';
import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import sinon from 'sinon';

jest.mock('siren-sdk/src/activities/content/ContentLTILinkEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Content LTI Link', function() {

	afterEach(() => {
		sinon.restore();
		ContentLTILinkEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	beforeEach(() => {
		sirenEntity = sinon.stub();

		ContentLTILinkEntity.mockImplementation(() => {
			return {
				title: () => 'Test LTI Link Title',
				url: () => 'http://test.com',
				isExternalResource: () => false
			};
		});

		fetchEntity.mockImplementation(() => sirenEntity);
	});

	it('fetches content LTI link', async() => {
		const contentLTILink = new ContentLTILink('http://test-lti-link-href.com', 'token');
		await contentLTILink.fetch();

		expect(contentLTILink.title).to.equal('Test LTI Link Title');
		expect(contentLTILink.link).to.equal('http://test.com');
		expect(contentLTILink.isExternalResource).to.equal(false);

		expect(fetchEntity.mock.calls.length).to.equal(1);
		expect(ContentLTILinkEntity.mock.calls[0][0]).to.equal(sirenEntity);
		expect(ContentLTILinkEntity.mock.calls[0][1]).to.equal('token');
	});
});
