import { FileAttachment, LinkAttachment } from '../../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment.js';
import { AttachmentStore } from '../../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment-store.js';
import { expect } from 'chai';

describe('Attachment Store', function() {

	let store;

	beforeEach(() => {
		store = new AttachmentStore();
	});

	describe('Attachments', () => {
		it('creates unique ids for new attachments', () => {
			const link = store.createLink('Google Canada', 'http://google.ca');
			const file = store.createFile('MyDocument.pdf', 'Temp', '12345');
			expect(file.href).to.not.equal(link.href);
		});
	});

	describe('Links', () => {
		it('creates new', () => {
			const link = store.createLink('Google Canada', 'http://google.ca');

			expect(link).to.be.an.instanceof(LinkAttachment);
			expect(link.attachment.name).to.equal('Google Canada');
			expect(link.attachment.url).to.equal('http://google.ca');
			expect(store.get(link.href)).to.equal(link);
		});
	});

	describe('Files', () => {
		it('creates new', () => {
			const file = store.createFile('MyDocument.pdf', 'Temp', '12345');

			expect(file).to.be.an.instanceof(FileAttachment);
			expect(file.attachment.name).to.equal('MyDocument.pdf');
			expect(file.attachment.url).to.equal('MyDocument.pdf');
			expect(store.get(file.href)).to.equal(file);
		});
	});
});
