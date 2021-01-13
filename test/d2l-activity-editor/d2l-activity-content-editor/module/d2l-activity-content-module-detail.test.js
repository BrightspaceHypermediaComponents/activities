import '../../../../components/d2l-activity-editor/d2l-activity-content-editor/module/d2l-activity-content-module-detail.js';
import { expect, fixture, html } from '@open-wc/testing';
import { ContentModule } from '../../../../components/d2l-activity-editor/d2l-activity-content-editor/module/state/content-module.js';
import { shared as moduleStore } from '../../../../components/d2l-activity-editor/d2l-activity-content-editor/module/state/content-module-store.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

describe('d2l-activity-content-module-detail', function() {

	let href, token, contentItem;

	async function loadComponent() {
		moduleStore.put(href, contentItem);
		return await fixture(
			html`
				<d2l-activity-content-module-detail
					.href=${href}
					.token="${token}"
				>
				</d2l-activity-content-module-detail>
			`
		);
	}

	beforeEach(async() => {
		href = 'http://test-module-href.com';
		token = 'token';
		contentItem = new ContentModule(href, token);
	});

	afterEach(async() => {
		moduleStore.clear();
	});

	it('should construct', async() => {
		await loadComponent();
		runConstructor('d2l-activity-content-module-detail');
	});

	it('passes accessibility test', async() => {
		const el = await loadComponent();
		await expect(el).to.be.accessible();
	});
});
