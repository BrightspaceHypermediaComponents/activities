import '../../../../components/d2l-activity-editor/d2l-activity-content-editor/content-file/d2l-activity-content-file-detail.js';
import { expect, fixture, html } from '@open-wc/testing';
import { ContentFile } from '../../../../components/d2l-activity-editor/d2l-activity-content-editor/content-file/state/content-file.js';
import { shared as contentFileStore } from '../../../../components/d2l-activity-editor/d2l-activity-content-editor/content-file/state/content-file-store.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

describe('d2l-activity-content-content-file-detail', function() {

	let href, token, contentItem;

	async function loadComponent() {
		contentFileStore.put(href, contentItem);
		return await fixture(
			html`
				<d2l-activity-content-file-detail
					.href=${href}
					.token="${token}"
				>
				</d2l-activity-content-file-detail>
			`
		);
	}

	beforeEach(async() => {
		href = 'http://test-html-file-href.com';
		token = 'token';
		contentItem = new ContentFile(href, token);
	});

	afterEach(async() => {
		contentFileStore.clear();
	});

	it('should construct', async() => {
		await loadComponent();
		runConstructor('d2l-activity-content-file-detail');
	});

	it('passes accessibility test', async() => {
		const el = await loadComponent();
		await expect(el).to.be.accessible();
	});
});
