import '../../../components/d2l-activity-editor/d2l-activity-content-editor/web-link/d2l-activity-content-web-link-detail.js';
import { expect, fixture, html } from '@open-wc/testing';
import { ContentWebLink } from '../../../components/d2l-activity-editor/d2l-activity-content-editor/web-link/state/content-web-link.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import { shared as webLinkStore } from '../../../components/d2l-activity-editor/d2l-activity-content-editor/web-link/state/content-web-link-store.js';

describe('d2l-activity-content-module-detail', function() {

	let href, token, contentItem;

	async function loadComponent() {
		webLinkStore.put(href, contentItem);
		return await fixture(
			html`
				<d2l-activity-content-web-link-detail
					.href=${href}
					.token="${token}"
				>
				</d2l-activity-content-web-link-detail>
			`
		);
	}

	beforeEach(async() => {
		href = 'http://test-web-link-href.com';
		token = 'token';
		contentItem = new ContentWebLink(href, token);
	});

	afterEach(async() => {
		webLinkStore.clear();
	});

	it('should construct', async() => {
		await loadComponent();
		runConstructor('d2l-activity-content-web-link-detail');
	});

	it('passes accessibility test', async() => {
		const el = await loadComponent();
		await expect(el).to.be.accessible();
	});
});
