import '../../components/d2l-activity-editor/d2l-activity-assignment-editor/d2l-activity-assignment-editor-submission-and-completion.js';
import { Actions, Rels, Classes } from 'siren-sdk/src/hypermedia-constants';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { default as createHypermediaEntityStub} from './createHypermediaEntityStub.js';
import { default as langTerms } from '../../components/d2l-activity-editor/d2l-activity-assignment-editor/lang/en.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import sinon from 'sinon';
import { shared as store } from '../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-store.js';

describe('d2l-activity-assignment-editor-submission-and-completion', function() {

	let href, entityStoreGet, entityStoreFetch;
	function getAccordion() {
		// returns an Element
		return el.shadowRoot.querySelector('.accordion');
	}

	async function loadComponent() {
		return await fixture(
			html`
				<d2l-activity-assignment-editor-submission-and-completion-editor href=${href} token="token">
				</d2l-activity-assignment-editor-submission-and-completion-editor>
			`
		);
	}

	beforeEach(async() => {
		href = 'http://activity/1';

		entityStoreGet = sinon.stub(window.D2L.Siren.EntityStore, 'get').returns(createHypermediaEntityStub());
		entityStoreFetch = sinon.stub(window.D2L.Siren.EntityStore, 'fetch').returns(createHypermediaEntityStub());

		await store.fetchAssignment(href, 'token');
	});

	afterEach(() => {
		entityStoreGet.restore();
		entityStoreFetch.restore();
	});

	describe('constructor', () => {

		it('should construct', async() => {
			await loadComponent();
			runConstructor('d2l-activity-assignment-editor-submission-and-completion-editor');
		});

	});

	it('passes accessibility test', async() => {
		const el = await loadComponent()
		await expect(el).to.be.accessible();
	});

	it('accordion is not hidden on load', async() => {
		const el = await loadComponent()
		expect(getAccordion().getAttribute('hidden')).to.be.null;
	});

	it('accordion has a heading', async() => {
		const el = await loadComponent()
		const header = el.shadowRoot.querySelectorAll('.accordion > .activity-summarizer-header');
		expect(header[0].slot).to.equal('header'); //TODO: probably remove this, impl detail
		expect(header[0].innerText).to.equal(langTerms.submissionCompletionAndCategorization);
	});

	it('accordion has a summary', async() => {
		const el = await loadComponent()
		const summary = el.shadowRoot.querySelectorAll('.accordion > .activity-summarizer-summary');
		expect(summary[0].slot).to.equal('summary'); //TODO: probably remove this, impl detail
		expect(summary[0].getElementsByTagName('li').length).to.equal(3);
	});

	it('accordion initializes as closed', async() => {
		const el = await loadComponent()
		expect(getAccordion().getAttribute('_state')).to.equal('closed');
	});

	it('handles click event', async() => {
		const el = await loadComponent()
		//TODO: make this check if accordion opens/closes? (maybe out of scope?)
		setTimeout(() => el.click());
		const { target } = await oneEvent(el, 'click');
		expect(target).equals(el);
	});

	describe('submission-type-container', () => {
		it.only('submission type options loads correctly', async() => {
			const el = await loadComponent();
			const submissionSelect = el.shadowRoot.querySelector('#assignment-submission-type');
			console.log(submissionSelect)
			expect(submissionSelect.getAttribute('disabled')).to.be.null;
			expect(submissionSelect.getElementsByTagName('option').length).to.equal(2);
		});

		it.only('missing canEditSubmissionType action', async() => {
			entityStoreGet().hasActionByName.withArgs(Actions.assignments.updateSubmissionType).returns(false);
			entityStoreGet().hasActionByName.withArgs(Actions.assignments.updateCompletionType).returns(false);
			const el = await loadComponent();
			const submissionSelect = el.shadowRoot.querySelector('#assignment-submission-type');
			console.log(submissionSelect)
			expect(submissionSelect.getAttribute('disabled')).to.not.be.null;
		});
	});

	// describe('completion-type-container', () => {
	// 	it('completion type options loads correctly', async() => {
	// 		const completionSelect = el.shadowRoot.querySelector('#assignment-completion-type');
	// 		expect(completionSelect.getElementsByTagName('option').length).to.equal(2);
	// 	});
	// });
});
