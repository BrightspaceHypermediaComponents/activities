import { Attachment, FileAttachment, LinkAttachment } from '../../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment.js';
import { AttachmentEntity } from 'siren-sdk/src/activities/AttachmentEntity.js';
import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import sinon from 'sinon';
import { when } from 'mobx';

jest.mock('siren-sdk/src/activities/AttachmentEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Attachment', function() {
	const defaultEntityMock = {
		canDeleteAttachment: () => true,
		hasClass: () => false,
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

		it('reacts to deleted status', async(done) => {
			const attachment = new Attachment('http://attachment/1', 'token');

			when(
				() => attachment.deleted,
				() => {
					done();
				}
			);

			attachment.markDeleted(true);
		});

		it('deletes', async() => {
			const attachment = new Attachment('http://attachment/1', 'token');

			attachment.markDeleted(true);
			await attachment.delete();

			expect(attachment.creating).to.be.false;
			expect(attachment.deleted).to.be.true;
		});
	});

	describe('LinkAttachment', () => {
		it('initializes without urn', () => {
			const link = new LinkAttachment('http://attachment/1', 'token');
			link.initLink('Google Canada', 'http://google.ca');

			expect(link.attachment.name).to.equal('Google Canada');
			expect(link.attachment.id).to.equal('http://attachment/1');
			expect(link.attachment.url).to.equal('http://google.ca');
			expect(link.attachment.urn).to.equal(undefined);

			expect(link.creating).to.be.true;
			expect(link.editing).to.be.true;
			expect(link.deleted).to.be.false;
		});

		it('initializes with d2lrn', () => {
			const link = new LinkAttachment('http://attachment/1', 'token');
			link.initLink('Google Canada', 'http://google.ca', 'd2l:brightspace:foo:::bar:car');

			expect(link.attachment.name).to.equal('Google Canada');
			expect(link.attachment.id).to.equal('http://attachment/1');
			expect(link.attachment.url).to.equal('http://google.ca');
			expect(link.attachment.urn).to.equal('d2l:brightspace:foo:::bar:car');

			expect(link.creating).to.be.true;
			expect(link.editing).to.be.true;
			expect(link.deleted).to.be.false;
		});

		it('saves the url when a urn is not provided', async() => {
			const link = new LinkAttachment('http://attachment/1', 'token');
			link.initLink('Google Canada', 'http://google.ca');

			const entity = { addLinkAttachment: sinon.spy() };
			await link.save(entity);
			expect(entity.addLinkAttachment.args[0][1]).to.equal('http://google.ca');

			expect(link.creating).to.be.false;
			expect(link.editing).to.be.true;
			expect(link.deleted).to.be.false;
		});

		it('saves the urn when it is provided', async() => {
			const link = new LinkAttachment('http://attachment/1', 'token');
			link.initLink('Google Canada', 'http://google.ca', 'd2l:brightspace:foo:::bar:car');

			const entity = { addLinkAttachment: sinon.spy() };
			await link.save(entity);
			expect(entity.addLinkAttachment.args[0][1]).to.equal('d2l:brightspace:foo:::bar:car');

			expect(link.creating).to.be.false;
			expect(link.editing).to.be.true;
			expect(link.deleted).to.be.false;
		});
	});

	describe('FileAttachment', () => {
		it('initializes', () => {
			const file = new FileAttachment('http://attachment/1', 'token');
			file.initFile('MyDocument.pdf', 'Temp', '12345', 'https://fake.com/MyDocument.pdf/view');

			expect(file.attachment.name).to.equal('MyDocument.pdf');
			expect(file.attachment.id).to.equal('http://attachment/1');
			expect(file.attachment.type).to.equal('Document');
			expect(file.fileSystemType).to.equal('Temp');
			expect(file.fileId).to.equal('12345');

			expect(file.attachment.url).to.equal('https://fake.com/MyDocument.pdf/view');

			expect(file.creating).to.be.true;
			expect(file.editing).to.be.true;
			expect(file.deleted).to.be.false;
		});

		it('saves', async() => {
			const file = new FileAttachment('http://attachment/1', 'token');
			file.initFile('MyDocument.pdf', 'Temp', '12345', 'https://fake.com/MyDocument.pdf/view');

			const mockAttachmentCollectionEntity = {
				addFileAttachment: () => true
			};
			await file.save(mockAttachmentCollectionEntity);

			expect(file.creating).to.be.false;
			expect(file.editing).to.be.true;
			expect(file.deleted).to.be.false;
		});
	});

});
