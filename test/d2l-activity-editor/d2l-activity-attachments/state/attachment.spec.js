import { Attachment } from '../../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment.js';
import { AttachmentEntity } from 'siren-sdk/src/activities/AttachmentEntity.js';
import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import sinon from 'sinon';

jest.mock('siren-sdk/src/activities/AttachmentEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Attachment', function() {

	const defaultEntityMock = {
		canDeleteAttachment: () => true,
		name: () => 'Google Canada',
		href: () => 'http://google.ca',
		self: () => 'http://attachment/1'
	};

	afterEach(() => {
		sinon.restore();
		AttachmentEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	describe('fetching', () => {
		beforeEach(() => {
			sirenEntity = sinon.stub();

			AttachmentEntity.mockImplementation(() => {
				return defaultEntityMock;
			});

			fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
		});

		it('fetches', async() => {
			const attachment = new Attachment('http://1', 'token');
			await attachment.fetch();

			expect(attachment.editing).to.be.true;
			expect(attachment.creating).to.be.false;
			expect(attachment.deleted).to.be.false;
			expect(attachment.attachment.id).to.equal('http://attachment/1');
			expect(attachment.attachment.name).to.equal('Google Canada');
			expect(attachment.attachment.url).to.equal('http://google.ca');

			expect(fetchEntity.mock.calls.length).to.equal(1);
			expect(AttachmentEntity.mock.calls[0][0]).to.equal(sirenEntity);
			expect(AttachmentEntity.mock.calls[0][1]).to.equal('token');
		});
	});
});
