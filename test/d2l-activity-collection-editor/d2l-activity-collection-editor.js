import { fixture, html, waitUntil, expect, elementUpdated } from '@open-wc/testing';

describe('d2l-activity-collection-editor', () => {
	let element;

	describe('Null Collection', () => {
		it('Passes A11y aXe tests', async() => {
			element = await fixture(html`
				<d2l-activity-collection-editor>
				</d2l-activity-collection-editor>
			`);
			await expect(element).to.be.accessible();
		});
	});

	describe('Collection with name/description', () => {
		beforeEach(async() => {
			element = await fixture(html`
				<d2l-activity-collection-editor
					href="data/activity-usage-lp.json"
					token="1234">
				</d2l-activity-collection-editor>
			`);
			await waitUntil(() => element._state.isLoaded, 'Element did not load fully');
		});

		it('Sets the state properties from the hypermedia response', () => {
			expect(element._state.name).to.exist;
			expect(element._state.description).to.exist;
			expect(element._state.isVisible).to.be.false;
			expect(element._state.activities).to.be.empty;
		});

		it('Does not re-render if name is touched outside of first load', async() => {
			element._state.setName('Foobar');
			await elementUpdated(element);
			const name = element.shadowRoot.querySelector('.d2l-activity-collection-title-header d2l-labs-edit-in-place').value;
			expect(name).to.be.equal('Learning Path Test');
		});
	});

});
