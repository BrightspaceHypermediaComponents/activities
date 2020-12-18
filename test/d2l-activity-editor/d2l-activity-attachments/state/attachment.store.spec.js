import { AudioAttachment, FileAttachment, LinkAttachment, VideoAttachment } from '../../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment.js';
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
		it('creates new without a urn', () => {
			const link = store.createLink('Google Canada', 'http://google.ca');

			expect(link).to.be.an.instanceof(LinkAttachment);
			expect(link.attachment.name).to.equal('Google Canada');
			expect(link.attachment.url).to.equal('http://google.ca');
			expect(link.attachment.urn).to.equal(undefined);
			expect(store.get(link.href)).to.equal(link);
		});

		it('creates new with a urn', () => {
			const link = store.createLink('Google Canada', 'http://google.ca', 'd2l:brightspace:foo:::bar:car');

			expect(link).to.be.an.instanceof(LinkAttachment);
			expect(link.attachment.name).to.equal('Google Canada');
			expect(link.attachment.url).to.equal('http://google.ca');
			expect(link.attachment.urn).to.equal('d2l:brightspace:foo:::bar:car');
			expect(store.get(link.href)).to.equal(link);
		});
	});

	describe('Files', () => {
		it('creates new', () => {
			const file = store.createFile('MyDocument.pdf', 'Temp', '12345', 'https://fake.com/MyDocument.pdf/view');

			expect(file).to.be.an.instanceof(FileAttachment);
			expect(file.attachment.name).to.equal('MyDocument.pdf');
			expect(file.attachment.url).to.equal('https://fake.com/MyDocument.pdf/view');
			expect(store.get(file.href)).to.equal(file);
		});
	});

	describe('Audio', () => {
		it('creates new', () => {
			const file = store.createAudio('MyDocument.mp3', 'Temp', '12345', 'https://fake.com/MyDocument.mp3/view');

			expect(file).to.be.an.instanceof(AudioAttachment);
			expect(file.attachment.name).to.equal('MyDocument.mp3');
			expect(file.attachment.url).to.equal('https://fake.com/MyDocument.mp3/view');
			expect(store.get(file.href)).to.equal(file);
		});
	});

	describe('Video', () => {
		it('creates new', () => {
			const file = store.createVideo('MyDocument.mp4', 'Temp', '12345', 'https://fake.com/MyDocument.mp4/view');

			expect(file).to.be.an.instanceof(VideoAttachment);
			expect(file.attachment.name).to.equal('MyDocument.mp4');
			expect(file.attachment.url).to.equal('https://fake.com/MyDocument.mp4/view');
			expect(store.get(file.href)).to.equal(file);
		});
	});
});
