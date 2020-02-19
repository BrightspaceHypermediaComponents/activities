import '../../../components/d2l-activity-editor/d2l-activity-attachments/d2l-activity-attachments-editor.js';
import { expect, fixture, html } from '@open-wc/testing';
import { Attachment } from '../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment.js';
import { shared as store } from '../../../components/d2l-activity-editor/d2l-activity-attachments/state/attachment-store.js';

describe('d2l-activity-attachment', function() {

	let el, href, attachment;

	beforeEach(async() => {
		href = 'http://attachment/1';
		attachment = new Attachment(href, 'token');
		attachment.attachment = {
			id: 'http://attachment/1',
			name: 'Google Canada',
			url: 'http://google.ca'
		};

		store.put(href, attachment);

		el = await fixture(html`
			<d2l-activity-attachment href=${href} token="token"></d2l-activity-attachment>
		`);
	});

	afterEach(() => {
		store.clear();
	});

	describe('renders attachment', () => {

		it('passes accessibility test', async() => {
			await expect(el).to.be.accessible();
		});

		it('renders attachment', async() => {
			expect(el.shadowRoot.querySelector('d2l-labs-attachment').attachment).to.eql(attachment.attachment);
		});
	});
});
