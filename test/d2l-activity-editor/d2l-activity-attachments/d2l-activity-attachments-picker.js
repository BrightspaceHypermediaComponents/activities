import '../../../components/d2l-activity-editor/d2l-activity-attachments/d2l-activity-attachments-editor.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { AttachmentCollection } from '../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment-collection.js';
import { shared as store } from '../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment-collections-store.js';

describe('d2l-activity-attachments-picker', function() {

	let el, href, collection;

	beforeEach(async() => {
		href = 'http://activity/1';
		collection = new AttachmentCollection(href, 'token');
		collection.setCanAddFile(true);
		collection.setCanAddLink(true);
		collection.setCanAddGoogleDriveLink(true);
		collection.setCanAddOneDriveLink(true);
		collection.setCanRecordVideo(true);
		collection.setCanRecordAudio(true);
		store.put(href, collection);

		el = await fixture(html`
			<d2l-activity-attachments-picker href=${href} token="token"></d2l-activity-attachments-picker>
		`);
	});

	afterEach(() => {
		store.clear();
	});

	describe('all picker buttons enabled', () => {
		it('passes accessibility test', async() => {
			await expect(el).to.be.accessible();
		});

		it('renders buttons', async() => {
			expect(el.shadowRoot.querySelector('d2l-activity-attachments-picker-presentational').shadowRoot.querySelectorAll('d2l-button-icon').length).to.equal(8);
			expect(el.shadowRoot.querySelector('d2l-activity-attachments-picker-presentational').shadowRoot.querySelectorAll('d2l-button-subtle').length).to.equal(2);
		});
	});

	describe('file button disabled', () => {
		beforeEach(async() => {
			collection.setCanAddFile(false);
			await elementUpdated(el);
		});

		it('passes accessibility test', async() => {
			await expect(el).to.be.accessible();
		});

		it('hides file button', async() => {
			expect(el.shadowRoot.querySelector('d2l-activity-attachments-picker-presentational').shadowRoot.querySelector('d2l-button-icon#add-file-button')).to.have.attr('hidden');
		});
	});

	describe('events fire when files uploaded', () => {
		it('fires file uploaded events when files uploaded', (done) => {
			const files = [];
			el.addEventListener('d2l-activity-attachments-picker-files-uploaded', (e) => {
				expect(e.detail.files).to.equal(files);
				done();
			});
			D2L.ActivityEditor.FileUploadDialogCallback(files);
		});
	});
});
