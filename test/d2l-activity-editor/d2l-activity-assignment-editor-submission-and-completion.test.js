import '../../components/d2l-activity-editor/d2l-activity-assignment-editor/d2l-activity-assignment-editor-submission-and-completion.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { default as langTerms } from '../../components/d2l-activity-editor/d2l-activity-assignment-editor/lang/en.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

describe('d2l-activity-assignment-editor-submission-and-completion', function() {

	let el, href;

	function getAccordion() {
		// returns an Element
		return el.shadowRoot.querySelector('.accordion');
	}

	beforeEach(async() => {
		href = 'http://activity/1';

		el = await fixture(
			html`
				<d2l-activity-assignment-editor-submission-and-completion-editor href=${href} .token="token">
				</d2l-activity-assignment-editor-submission-and-completion-editor>
			`
		);
	});

	// afterEach(() => {
	// 	store.clear();
	// });

	describe('constructor', () => {

		it('should construct', () => {
			runConstructor('d2l-activity-assignment-editor-submission-and-completion-editor');
		});

	});

	it('passes accessibility test', async() => {
		await expect(el).to.be.accessible();
	});

	it('accordion is not hidden', async() => {
		expect(getAccordion().getAttribute('hidden')).to.be.null;
	});

	it('accordion has a heading', async() => {
		const header = el.shadowRoot.querySelectorAll('.accordion > .activity-summarizer-header');
		expect(header[0].slot).to.equal('header'); //TODO: probably remove this, impl detail
		expect(header[0].innerText).to.equal(langTerms.submissionCompletionAndCategorization);
	});

	it('accordion has a summary', async() => {
		const summary = el.shadowRoot.querySelectorAll('.accordion > .activity-summarizer-summary');
		expect(summary[0].slot).to.equal('summary'); //TODO: probably remove this, impl detail
		expect(summary[0].getElementsByTagName('li').length).to.equal(3);
	});

	it('accordion initializes as closed', async() => {
		expect(getAccordion().getAttribute('_state')).to.equal('closed');
	});

	it('handles click event', async() => {
		setTimeout(() => el.click());
		const { target } = await oneEvent(el, 'click');
		expect(target).equals(el);
	});
});
