import { runAxe } from '@brightspace-ui/core/tools/a11y-test-helper.js';
import { fixture, html, expect } from '@open-wc/testing';

describe('d2l-activity-collection-editor', () => {
	let element;

	describe('Null collection', () => {
		beforeEach(async() => {
			element = await fixture(html`<d2l-activity-collection-editor></d2l-activity-collection-editor>`);
			await element.updateComplete;
		});

		it('should pass all axe tests', async() => {
			await runAxe(element);
		});
	});

	describe('Collection with name/description', () => {
		beforeEach(async() => {
			window.D2L.Siren.WhitelistBehavior._testMode(true);
			element = await fixture(html`
				<d2l-activity-collection-editor
					href="data/activity-usage-lp.json"
					token="1234">
				</d2l-activity-collection-editor>
			`);
			await element.updateComplete;
		});

		it('Sets the state properties from the hypermedia response', () => {
			expect(element._state.name).to.exist;
			expect(element._state.description).to.exist;
		});

		it('Updates when the state is updated', () => {

		});
	});

});
