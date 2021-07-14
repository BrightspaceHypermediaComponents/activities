import { ContentWebLink } from '../../../../components/d2l-activity-editor/d2l-activity-content-editor/web-link/state/content-web-link.js';
import { ContentWebLinkEntity } from 'siren-sdk/src/activities/content/ContentWebLinkEntity.js';
import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import sinon from 'sinon';

jest.mock('siren-sdk/src/activities/content/ContentWebLinkEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Content Web Link', function() {

	let checkoutWebLinkMock;

	afterEach(() => {
		sinon.restore();
		ContentWebLinkEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	beforeEach(() => {
		sirenEntity = sinon.stub();

		checkoutWebLinkMock = jest.fn();

		ContentWebLinkEntity.mockImplementation(() => {
			return {
				title: () => 'Test Web Link Title',
				url: () => 'http://test.com',
				isExternalResource: () => false,
				self: () => 'http://test-web-link-href.com',
				getActivityUsageHref: () => 'http://test-activity-usage-link-href.com',
				checkout: checkoutWebLinkMock
			};
		});

		fetchEntity.mockImplementation(() => sirenEntity);
	});

	it('fetches content web link', async() => {
		const contentWebLink = new ContentWebLink('http://test-web-link-href.com', 'token');
		await contentWebLink.fetch();

		expect(contentWebLink.title).to.equal('Test Web Link Title');
		expect(contentWebLink.link).to.equal('http://test.com');
		expect(contentWebLink.isExternalResource).to.equal(false);

		expect(fetchEntity.mock.calls.length).to.equal(1);
		expect(ContentWebLinkEntity.mock.calls[0][0]).to.equal(sirenEntity);
		expect(ContentWebLinkEntity.mock.calls[0][1]).to.equal('token');
		expect(checkoutWebLinkMock.mock.calls.length).to.equal(1);
	});
});
