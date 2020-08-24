import '../../components/d2l-activity-editor/d2l-activity-assignment-editor/d2l-activity-assignment-editor-submission-and-completion.js';
import { aTimeout, expect, fixture, html, oneEvent } from '@open-wc/testing';
import { Actions } from 'siren-sdk/src/hypermedia-constants';
import { Assignment } from '../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment.js';
import { default as createHypermediaEntityStub } from './createHypermediaEntityStub.js';
import { default as langTerms } from '../../components/d2l-activity-editor/d2l-activity-assignment-editor/lang/en.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import sinon from 'sinon';
import { shared as store } from '../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-store.js';
import { SubmissionAndCompletionProps } from '../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-submission-and-completion.js';

describe('d2l-activity-assignment-editor-submission-and-completion', function() {

	let href, entityStoreGet, entityStoreFetch;

	async function loadComponent() {
		const submissionAndCompletionProps = new SubmissionAndCompletionProps({
			submissionTypeOptions: [
				{ title: 'File submission', value: 0, completionTypes: null, selected: false },
				{ title: 'Text submission', value: 1, completionTypes: null, selected: false },
				{ title: 'On paper submission', value: 2, completionTypes: [1, 2], selected: true },
				{ title: 'Observed in person', value: 3, completionTypes: [3], selected: false }
			],
			submissionType: { title: '1', value: 0 },
			canEditSubmissionType: true,
			canEditSubmissionsRule: true,
			submissionsRule: [],
			submissionsRuleOptions: [],
			canEditFilesSubmissionLimit: true,
			filesSubmissionLimit: '2',
			assignmentHasSubmissions: false,
			allCompletionTypeOptions: [],
			canEditCompletionType: true,
			completionType: { title: 'Completion Type', value: 0 }
		});

		const assignmentStore = new Assignment();
		assignmentStore.setSubmissionAndCompletionProps(submissionAndCompletionProps);
		store.put(href, assignmentStore);

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
	});

	afterEach(() => {
		entityStoreGet.restore();
		entityStoreFetch.restore();
		store.clear();
	});

	describe('constructor', () => {

		it.only('should construct', async() => {
			await loadComponent();
			runConstructor('d2l-activity-assignment-editor-submission-and-completion-editor');
		});

	});

	it('passes accessibility test', async() => {
		const el = await loadComponent();
		await expect(el).to.be.accessible();
	});

	it('accordion is not hidden on load', async() => {
		const el = await loadComponent();
		expect(el.shadowRoot.querySelector('.accordion').getAttribute('hidden')).to.be.null;
	});

	describe('accordion', () => {

		it('has a heading', async() => {
			const el = await loadComponent();
			const header = el.shadowRoot.querySelectorAll('.accordion > .activity-summarizer-header');
			expect(header[0].slot).to.equal('header'); //TODO: probably remove this, impl detail
			expect(header[0].innerText).to.equal(langTerms.submissionCompletionAndCategorization);
		});

		it('has a summary', async() => {
			const el = await loadComponent();
			const summary = el.shadowRoot.querySelectorAll('.accordion > .activity-summarizer-summary');
			expect(summary[0].slot).to.equal('summary'); //TODO: probably remove this, impl detail
			expect(summary[0].getElementsByTagName('li').length).to.equal(3);
		});

		it('initializes as closed', async() => {
			const el = await loadComponent();
			expect(el.shadowRoot.querySelector('.accordion').getAttribute('_state')).to.equal('closed');
		});

		it('handles click event', async() => {
			const el = await loadComponent();
			//TODO: make this check if accordion opens/closes? (maybe out of scope?)
			setTimeout(() => el.click());
			const { target } = await oneEvent(el, 'click');
			expect(target).equals(el);
		});
	});

	describe('submission-type-container', () => {
		it('loads correctly', async() => {
			entityStoreGet().hasActionByName.withArgs(Actions.assignments.updateSubmissionType).returns(true);
			const el = await loadComponent();
			const submissionSelect = el.shadowRoot.querySelector('#assignment-submission-type');
			expect(submissionSelect.getAttribute('disabled')).to.be.null;
			expect(submissionSelect.getElementsByTagName('option').length).to.equal(2);
		});

		it('handles change event', async() => {
			const el = await loadComponent();
			const submissionSelect = el.shadowRoot.querySelector('#assignment-submission-type');

			setTimeout(() => submissionSelect.change());
			const { target } = await oneEvent(submissionSelect, 'onchange');
			await aTimeout(1);

		});

		it('is disabled when missing updateSubmissionType action', async() => {
			entityStoreGet().hasActionByName.withArgs(Actions.assignments.updateSubmissionType).returns(false);
			const el = await loadComponent();
			const submissionSelect = el.shadowRoot.querySelector('#assignment-submission-type');
			expect(submissionSelect.getAttribute('disabled')).to.not.be.null;
		});
	});

	describe('completion-type-container', () => {
		it('completion type options loads correctly', async() => {
			entityStoreGet().hasActionByName.withArgs(Actions.assignments.updateCompletionType).returns(true);
			const el = await loadComponent();
			const completionSelect = el.shadowRoot.querySelector('#assignment-completion-type');
			expect(completionSelect.getAttribute('disabled')).to.be.null;
			// expect(completionSelect.getElementsByTagName('option').length).to.equal(2);
		});

		it('is disabled when missing updateCompletionType action', async() => {
			entityStoreGet().hasActionByName.withArgs(Actions.assignments.updateCompletionType).returns(false);
			const el = await loadComponent();
			const completionSelect = el.shadowRoot.querySelector('#assignment-completion-type');
			expect(completionSelect.getAttribute('disabled')).to.not.be.null;
		});
	});
});
