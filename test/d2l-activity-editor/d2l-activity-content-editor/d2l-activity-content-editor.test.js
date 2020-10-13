import '../../../components/d2l-activity-editor/d2l-activity-content-editor/d2l-activity-content-editor.js';
import { expect, fixture, html } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

describe('d2l-activity-content-editor', function() {

	async function loadComponent() {
		const href = 'http://content/1';
		const token = 'token';

		return await fixture(
			html`
				<d2l-activity-content-editor
					.href=${href}
					.token="${token}"
				>
				</d2l-activity-content-editor>
			`
		);
	}

	it('should construct', async() => {
		await loadComponent();
		runConstructor('d2l-activity-content-editor');
	});

	it('passes accessibility test', async() => {
		const el = await loadComponent();
		await expect(el).to.be.accessible();
	});
});
