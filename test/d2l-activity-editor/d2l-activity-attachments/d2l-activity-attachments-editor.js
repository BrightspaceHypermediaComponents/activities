import '../../../components/d2l-activity-editor/d2l-activity-attachments/d2l-activity-attachments-editor.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { AttachmentCollection } from '../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment-collection.js';
import { shared as store } from '../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment-collections-store.js';

describe('d2l-activity-attachments-editor', function() {

	let el, href, collection;

	beforeEach(async() => {
		href = 'http://activity/1';
		collection = new AttachmentCollection(href, 'token');
		collection.setCanAddAttachments(true);
		store.put(href, collection);

		el = await fixture(html`
			<d2l-activity-attachments-editor href=${href} token="token"></d2l-activity-attachments-editor>
		`);
	});

	afterEach(() => {
		store.clear();
	});

	describe('add attachments enabled', () => {

		it('passes accessibility test', async() => {
			await expect(el).to.be.accessible();
		});

		it('renders picker', async() => {
			expect(el.shadowRoot.querySelectorAll('d2l-activity-attachments-picker')).to.exist;
		});
	});

	describe('add attachments disabled', () => {
		beforeEach(async() => {
			collection.setCanAddAttachments(false);
			await elementUpdated(el);
		});

		it('passes accessibility test', async() => {
			await expect(el).to.be.accessible();
		});

		it.only('hides picker', async() => {
			expect(el.shadowRoot.querySelectorAll('d2l-activity-attachments-picker')).to.not.exist;
		});
	});
});
