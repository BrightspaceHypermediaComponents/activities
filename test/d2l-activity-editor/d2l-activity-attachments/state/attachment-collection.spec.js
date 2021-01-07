import chai, { expect } from 'chai';
import { AttachmentCollection } from '../../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment-collection.js';
import { AttachmentCollectionEntity } from 'siren-sdk/src/activities/AttachmentCollectionEntity.js';
import { AttachmentCollectionsStore } from '../../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment-collections-store.js';
import { AttachmentStore } from '../../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment-store.js';
import chaiAsPromised from 'chai-as-promised';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import { FilePreviewLocationEntity } from 'siren-sdk/src/files/FilePreviewLocationEntity.js';
import { FilesHomeEntity } from 'siren-sdk/src/files/FilesHomeEntity.js';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { when } from 'mobx';

chai.use(chaiAsPromised);
chai.use(sinonChai);

jest.mock('siren-sdk/src/activities/AttachmentCollectionEntity.js');
jest.mock('siren-sdk/src/files/FilesHomeEntity.js');
jest.mock('siren-sdk/src/files/FilePreviewLocationEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Attachment Collection', function() {

	const defaultCollectionEntityMock = {
		canAddAttachments: () => true,
		canAddLinkAttachment: () => true,
		canAddFileAttachment: () => true,
		canAddGoogleDriveLinkAttachment: () => false,
		canAddOneDriveLinkAttachment: () => true,
		canAddVideoNoteAttachment: () => true,
		canAddAudioNoteAttachment: () => false,
		getAttachmentEntityHrefs: () => [],
		getFilesHref: () => 'https://b4b1eaba-26aa-4017-b37c-33e22649e477.files.api.proddev.d2l/121213'
	};

	afterEach(() => {
		sinon.restore();
		AttachmentCollectionEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	beforeEach(() => {
		sirenEntity = sinon.stub();
		fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
	});

	describe('fetching', () => {

		beforeEach(() => {
			AttachmentCollectionEntity.mockImplementation(() => {
				return {
					...defaultCollectionEntityMock,
					getAttachmentEntityHrefs: () => ['http://attachment/1', 'http://attachment/2']
				};
			});
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
			expect(collection._filesHref).to.equal('https://b4b1eaba-26aa-4017-b37c-33e22649e477.files.api.proddev.d2l/121213');

			expect(collection.attachments.length).to.equal(2);
			expect(collection.attachments[0]).to.equal('http://attachment/1');
			expect(collection.attachments[1]).to.equal('http://attachment/2');

			expect(fetchEntity.mock.calls.length).to.equal(1);
			expect(AttachmentCollectionEntity.mock.calls[0][0]).to.equal(sirenEntity);
			expect(AttachmentCollectionEntity.mock.calls[0][1]).to.equal('token');
		});
	});

	describe('updating', () => {
		it('reacts to new attachment', async(done) => {
			const attachment = {
				href: 'http://attachment/1'
			};
			const collection = new AttachmentCollection('http://collection/1', 'token');

			when(
				() => collection.attachments.length === 1 && collection.attachments[0] === 'http://attachment/1',
				() => {
					done();
				}
			);

			collection.addAttachment(attachment);
		});
	});

	describe('file preview location', () => {

		let sirenFilePreviewLocationEntity;

		beforeEach(() => {
			sirenFilePreviewLocationEntity = sinon.stub();

			FilesHomeEntity.mockImplementation(() => {
				return {
					getFilePreviewLocationEntity: () => sirenFilePreviewLocationEntity
				};
			});

			FilePreviewLocationEntity.mockImplementation(() => {
				return {
					previewLocation: () => '/d2l/lp/files/12356'
				};
			});
		});

		afterEach(() => {
			FilesHomeEntity.mockClear();
			FilePreviewLocationEntity.mockClear();
		});

		it('fetches file preview location', async() => {
			const collection = new AttachmentCollection('http://collection/1', 'token');
			const previewLocation = await collection.getPreviewUrl();

			expect(previewLocation).to.equal('/d2l/lp/files/12356');

			expect(fetchEntity.mock.calls.length).to.equal(1);
			expect(FilesHomeEntity.mock.calls[0][0]).to.equal(sirenEntity);
			expect(FilesHomeEntity.mock.calls[0][1]).to.equal('token');
			expect(FilePreviewLocationEntity.mock.calls[0][0]).to.equal(sirenFilePreviewLocationEntity);
			expect(FilePreviewLocationEntity.mock.calls[0][1]).to.equal('token');
		});
	});

	describe('saving', () => {
		let store, attachmentStore, collection;

		beforeEach(async() => {
			AttachmentCollectionEntity.mockImplementation(() => {
				return defaultCollectionEntityMock;
			});

			store = new AttachmentCollectionsStore();
			attachmentStore = new AttachmentStore();
			store.setAttachmentStore(attachmentStore);

			collection = new AttachmentCollection('http://collection/1', 'token', store);

			await collection.fetch();
		});

		describe('errors', () => {
			it('throws error if no attachment store configured', async() => {
				expect(collection.save()).to.be.rejectedWith(Error);
			});
		});

		describe('succeeds', () => {

			function addToCollection(attachment) {
				collection.addAttachment(attachment);
				attachmentStore.put(attachment.href, attachment);
			}

			it('deletes existing attachments which were removed', async() => {
				const mockDelete = sinon.stub();
				const attachment = {
					href: 'http://attachment/1',
					deleted: true,
					creating: false,
					delete: mockDelete
				};

				addToCollection(attachment);
				await collection.save();

				expect(mockDelete).to.have.been.calledOnce;
				expect(fetchEntity.mock.calls.length).to.equal(1);
			});

			it('deletes existing attachments which were removed with save-in-place', async() => {
				const mockDelete = sinon.stub();
				const attachment = {
					href: 'http://attachment/1',
					deleted: true,
					creating: false,
					delete: mockDelete
				};
				addToCollection(attachment);
				await collection.save(true);

				expect(mockDelete).to.have.been.calledOnce;
				expect(fetchEntity.mock.calls.length).to.equal(2);
				expect(attachmentStore.get('http://attachment/1')).to.be.undefined;
			});

			it('ignores new attachments that were immediately removed', async() => {
				const mockDelete = sinon.stub();
				const attachment = {
					href: 'http://attachment/1',
					deleted: true,
					creating: true,
					delete: mockDelete
				};

				addToCollection(attachment);
				await collection.save();

				expect(mockDelete.callCount).to.equal(0);
			});

			it('ignores new attachments that were immediately removed with save-in-place', async() => {
				const mockDelete = sinon.stub();
				const attachment = {
					href: 'http://attachment/1',
					deleted: true,
					creating: true,
					delete: mockDelete
				};

				addToCollection(attachment);
				await collection.save(true);

				expect(attachmentStore.get('http://attachment/1')).to.be.undefined;
				expect(collection.attachments).to.be.empty;
			});

			it('saves new attachments', async() => {
				const mockSave = sinon.stub();
				const attachment = {
					href: 'http://attachment/1',
					deleted: false,
					creating: true,
					save: mockSave
				};

				addToCollection(attachment);
				await collection.save();

				expect(mockSave).to.have.been.calledWithExactly(AttachmentCollectionEntity.mock.results[0].value);
				expect(fetchEntity.mock.calls.length).to.equal(1);
			});

			it('saves new attachments with save-in-place', async() => {
				const mockSave = sinon.stub();
				const attachment = {
					href: 'http://attachment/1',
					deleted: false,
					creating: true,
					save: mockSave
				};
				addToCollection(attachment);
				await collection.save(true);

				expect(mockSave).to.have.been.calledWithExactly(AttachmentCollectionEntity.mock.results[0].value);
				expect(fetchEntity.mock.calls.length).to.equal(2);
				expect(attachmentStore.get('http://attachment/1')).to.be.undefined;
			});
		});
	});
	describe('detect change', () => {
		it('when attachment deleted=true creating=true', () => {
			const collection = new AttachmentCollection('http://collection/1', 'token', {});
			const attachment = { deleted: true, creating: true };
			const result = collection._hasChanged(attachment);
			expect(false).equals(result);
		});
		it('when attachment deleted=false creating=false', () => {
			const collection = new AttachmentCollection('http://collection/1', 'token', {});
			const attachment = { deleted: false, creating: false };
			const result = collection._hasChanged(attachment);
			expect(false).equals(result);
		});
		it('when attachment deleted=true creating=false', () => {
			const collection = new AttachmentCollection('http://collection/1', 'token', {});
			const attachment = { deleted: true, creating: false };
			const result = collection._hasChanged(attachment);
			expect(true).equals(result);
		});
		it('when attachment deleted=false creating=true', () => {
			const collection = new AttachmentCollection('http://collection/1', 'token', {});
			const attachment = { deleted: false, creating: true };
			const result = collection._hasChanged(attachment);
			expect(true).equals(result);
		});
	});
});
