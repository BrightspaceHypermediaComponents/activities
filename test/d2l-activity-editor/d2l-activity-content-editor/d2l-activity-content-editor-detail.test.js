import '../../../components/d2l-activity-editor/d2l-activity-content-editor/d2l-activity-content-editor-detail.js';
import { expect, fixture, html } from '@open-wc/testing';
import { Content } from '../../../components/d2l-activity-editor/d2l-activity-content-editor/state/content.js';
import { shared as contentStore } from '../../../components/d2l-activity-editor/d2l-activity-content-editor/state/content-store.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

describe('d2l-activity-content-editor-detail', function() {

	let href, token, contentItem;

	async function loadComponent() {
		contentStore.put(href, contentItem);
		return await fixture(
			html`
				<d2l-activity-content-editor-detail
					.href=${href}
					.token="${token}"
				>
				</d2l-activity-content-editor-detail>
			`
		);
	}

	beforeEach(async() => {
		href = 'http://content/1';
		token = 'token';
		contentItem = new Content(href, token);
	});

	afterEach(async() => {
		contentStore.clear();
	});

	it('should construct', async() => {
		await loadComponent();
		runConstructor('d2l-activity-content-editor-detail');
	});

	it('passes accessibility test', async() => {
		const el = await loadComponent();
		await expect(el).to.be.accessible();
	});
});
