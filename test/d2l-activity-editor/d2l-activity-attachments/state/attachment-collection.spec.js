import { AttachmentCollection } from '../../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment-collection.js';
import { AttachmentCollectionEntity } from 'siren-sdk/src/activities/AttachmentCollectionEntity.js';
import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import sinon from 'sinon';

jest.mock('siren-sdk/src/activities/AttachmentCollectionEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Attachment Collection', function() {

	const defaultEntityMock = {
		canAddAttachments: () => true,
		canAddLinkAttachment: () => true,
		canAddFileAttachment: () => true,
		canAddGoogleDriveLinkAttachment: () => false,
		canAddOneDriveLinkAttachment: () => true,
		canAddVideoNoteAttachment: () => true,
		canAddAudioNoteAttachment: () => false,
		getAttachmentEntityHrefs: () => ['http://attachment/1', 'http://attachment/2']
	};

	afterEach(() => {
		sinon.restore();
		AttachmentCollectionEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	describe('fetching', () => {
		beforeEach(() => {
			sirenEntity = sinon.stub();

			AttachmentCollectionEntity.mockImplementation(() => {
				return defaultEntityMock;
			});

			fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
		});

		it('fetches', async() => {
			const collection = new AttachmentCollection('http://1', 'token');
			await collection.fetch();

			expect(collection.canAddAttachments).to.be.true;
			expect(collection.canAddLink).to.be.true;
			expect(collection.canAddFile).to.be.true;
			expect(collection.canAddGoogleDriveLink).to.be.false;
			expect(collection.canAddOneDriveLink).to.be.true;
			expect(collection.canRecordVideo).to.be.true;
			expect(collection.canRecordAudio).to.be.false;

			expect(collection.attachments.length).to.equal(2);
			expect(collection.attachments[0]).to.equal('http://attachment/1');
			expect(collection.attachments[1]).to.equal('http://attachment/2');

			expect(fetchEntity.mock.calls.length).to.equal(1);
			expect(AttachmentCollectionEntity.mock.calls[0][0]).to.equal(sirenEntity);
			expect(AttachmentCollectionEntity.mock.calls[0][1]).to.equal('token');
		});
	});
});
