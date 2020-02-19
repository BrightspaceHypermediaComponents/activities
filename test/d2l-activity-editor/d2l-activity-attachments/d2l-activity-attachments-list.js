import '../../../components/d2l-activity-editor/d2l-activity-attachments/d2l-activity-attachments-list.js';
import { expect, fixture, html } from '@open-wc/testing';
import { Attachment } from '../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment.js';
import { AttachmentCollection } from '../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment-collection.js';
import { shared as attachmentStore } from '../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment-store.js';
import { shared as store } from '../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment-collections-store.js';

describe('d2l-activity-attachment', function() {

	let el, href, collection, attachment, attachmentHref;

	beforeEach(async() => {
		href = 'http://attachments/1';
		attachmentHref = 'http://attachment/1';

		collection = new AttachmentCollection(href, 'token');
		collection.setCanAddAttachments(true);
		collection.setAttachments([attachmentHref]);
		store.put(href, collection);

		attachment = new Attachment(attachmentHref, 'token');
		attachment.attachment = {
			id: 'http://attachment/1',
			name: 'Google Canada',
			url: 'http://google.ca'
		};

		attachmentStore.put(href, attachment);

		el = await fixture(html`
			<d2l-activity-attachments-list href=${href} token="token"></d2l-activity-attachments-list>
		`);
	});

	afterEach(() => {
		store.clear();
	});

	describe('renders attachment list', () => {

		it('passes accessibility test', async() => {
			await expect(el).to.be.accessible();
		});

		it('renders editable list', async() => {
			expect(el.shadowRoot.querySelector('d2l-labs-attachment-list').editing).to.be.true;
		});

		it('renders attachment', async() => {
			expect(el.shadowRoot.querySelector('d2l-activity-attachment').href).to.equal('http://attachment/1');
		});
	});
});
