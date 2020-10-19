import '../../components/d2l-activity-editor/d2l-activity-accordion-collapse.js';
import { fixture, html, oneEvent } from '@open-wc/testing';

describe('d2l-activity-accordion-collapse', function() {

	async function loadComponent(hasErrors) {
		return await fixture(html`
			<d2l-activity-accordion-collapse ?has-errors=${hasErrors}>
				<span slot="header">A Heading</span>
				<span slot="summary-items"><li>Item one of two</li></span>
				<span slot="summary-items"><li>Item two of two</li></span>
				<span slot="components">Other stuff</span>
			</d2l-activity-accordion-collapse>
		`);
	}

	it('initializes as closed when no errors', async() => {
		const el = await loadComponent();
		expect(el.shadowRoot.querySelector('d2l-labs-accordion-collapse').getAttribute('_state')).to.equal('closed');
	});

	it('initializes as opened when errors are present', async() => {
		const el = await loadComponent(true);
		expect(el.shadowRoot.querySelector('d2l-labs-accordion-collapse').getAttribute('_state')).to.equal('opened');
	});

	it('handles click event', async() => {
		const el = await loadComponent();
		expect(el.shadowRoot.querySelector('d2l-labs-accordion-collapse').getAttribute('_state')).to.equal('closed');

		const accordion = el.shadowRoot.querySelector('d2l-labs-accordion-collapse');
		const link = accordion.shadowRoot.querySelector('#trigger');
		setTimeout(() => link.click());

		await oneEvent(accordion, 'd2l-labs-accordion-collapse-state-changed');
		expect(el.shadowRoot.querySelector('d2l-labs-accordion-collapse').getAttribute('_state')).to.equal('opening');
	});
});
