import '../../../components/d2l-activity-editor/d2l-activity-assignment-editor/d2l-activity-assignment-editor-submission-and-completion.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { AnonymousMarkingProps } from '../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-anonymous-marking.js';
import { Assignment } from '../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment.js';
import { AssignmentTypeProps } from '../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-type.js';
import { default as langTerms } from '../../../components/d2l-activity-editor/d2l-activity-assignment-editor/lang/en.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import { shared as store } from '../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-store.js';
import { SubmissionAndCompletionProps } from '../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-submission-and-completion.js';

describe('d2l-activity-assignment-editor-submission-and-completion', function() {

	let href, token, submissionAndCompletionProps, assignmentTypeProps, anonymousMarkingProps, assignmentStore;

	async function loadComponent() {
		assignmentStore = new Assignment(href, token);
		assignmentStore.setSubmissionAndCompletionProps(submissionAndCompletionProps);
		assignmentStore.setAssignmentTypeProps(assignmentTypeProps);
		assignmentStore.setAnonymousMarkingProps(anonymousMarkingProps);
		store.put(href, assignmentStore);

		return await fixture(
			html`
				<d2l-activity-assignment-editor-submission-and-completion-editor href=${href} .token="${token}">
				</d2l-activity-assignment-editor-submission-and-completion-editor>
			`
		);
	}

	beforeEach(async() => {
		submissionAndCompletionProps = new SubmissionAndCompletionProps({
			submissionTypeOptions: [
				{ title: 'File submission', value: 0, completionTypes: null, selected: false },
				{ title: 'Text submission', value: 1, completionTypes: null, selected: false },
				{ title: 'On paper submission', value: 2, completionTypes: [1, 2, 3], selected: true },
				{ title: 'Observed in person', value: 3, completionTypes: [1, 2, 3], selected: false }
			],
			submissionType: 2,
			canEditSubmissionType: true,
			canEditSubmissionsRule: true,
			submissionsRule: 'keepall',
			submissionsRuleOptions: [
				{
					'type': 'radio',
					'name': 'submissionsRule',
					'value': [
						{
							'title': 'All submissions are kept',
							'value': 'keepall',
							'selected': true
						},
						{
							'title': 'Only one submission allowed',
							'value': 'onlyone',
							'selected': false
						},
						{
							'title': 'Only the most recent submission is kept',
							'value': 'overwritesubmissions',
							'selected': false
						}
					]
				}
			],
			canEditFilesSubmissionLimit: true,
			filesSubmissionLimit: '2',
			assignmentHasSubmissions: false,
			allCompletionTypeOptions: [
				{
					'title': 'Automatically on submission',
					'value': 0,
					'selected': false
				},
				{
					'title': 'Manually by learners',
					'value': 1,
					'selected': false
				},
				{
					'title': 'Automatically on evaluation',
					'value': 2,
					'selected': false
				},
				{
					'title': 'Automatically on due date',
					'value': 3,
					'selected': true
				}
			],
			canEditCompletionType: true,
			completionType: { title: 'Manually by learners', value: 2 },
			completionTypeValue: '2'
		});

		assignmentTypeProps = new AssignmentTypeProps({
			isGroupAssignmentTypeDisabled: false,
			isIndividualAssignmentType: true,
			groupCategories: [],
			canEditAssignmentType: true,
			selectedGroupCategoryName: 'group 1'
		});

		anonymousMarkingProps = new AnonymousMarkingProps({
			isAnonymousMarkingEnabled: true,
			canEditAnonymousMarking: true,
			isAnonymousMarkingAvailable: true,
			anonymousMarkingHelpText: 'Anonymous marking help text',
			submissionType: submissionAndCompletionProps.submissionType
		});

		href = 'http://activity/1';
		token = 'token';
	});

	afterEach(() => {
		assignmentStore = undefined;
		submissionAndCompletionProps = undefined;
		assignmentTypeProps = undefined;
		anonymousMarkingProps = undefined;
		store.clear();
	});

	describe('constructor', () => {

		it('should construct', async() => {
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
		expect(el.shadowRoot.querySelector('d2l-activity-accordion-collapse').getAttribute('hidden')).to.be.null;
	});

	describe('accordion', () => {

		it('has a heading', async() => {
			const el = await loadComponent();
			const header = el.shadowRoot.querySelector('d2l-activity-accordion-collapse > span[slot="header"]');
			expect(header.innerText).to.equal(langTerms.submissionCompletionAndCategorization);
		});

		it('has a summary', async() => {
			const el = await loadComponent();
			const summary = el.shadowRoot.querySelectorAll('d2l-activity-accordion-collapse > li[slot="summary-items"]');
			expect(summary.length).to.equal(5);
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
			const el = await loadComponent();
			const submissionSelect = el.shadowRoot.querySelector('#assignment-submission-type');
			expect(submissionSelect.getAttribute('disabled')).to.be.null;
			expect(submissionSelect.getElementsByTagName('option').length).to.equal(4);
		});

		it('handles click event', async() => {
			submissionAndCompletionProps.canEditSubmissionType = true;
			const el = await loadComponent();
			const submissionSelect = el.shadowRoot.querySelector('#assignment-submission-type');

			const listener = oneEvent(submissionSelect, 'click');
			submissionSelect.click();

			const { detail } = await listener;
			expect(detail).to.equal(0);

		});

		it('is disabled when missing updateSubmissionType action', async() => {
			submissionAndCompletionProps.canEditSubmissionType = false;
			const el = await loadComponent();
			const submissionSelect = el.shadowRoot.querySelector('.d2l-body-compact');
			expect(submissionSelect.innerText).to.equal('On paper submission');
		});
	});

	describe('completion-type-container', () => {
		it('completion type options loads correctly', async() => {
			const el = await loadComponent();
			const completionSelect = el.shadowRoot.querySelector('#assignment-completion-type');
			expect(completionSelect.getElementsByTagName('option').length).to.equal(3);
		});

		it('is disabled when missing updateCompletionType action', async() => {
			submissionAndCompletionProps.canEditCompletionType = false;
			submissionAndCompletionProps.completionType = { title: 'Manually by learners', value: 2 };
			submissionAndCompletionProps.completionTypeValue = '2';
			const el = await loadComponent();
			const completionSelect = el.shadowRoot.querySelector('.d2l-body-compact');
			expect(completionSelect.innerText).to.equal(submissionAndCompletionProps.completionType.title);
		});

		it('handles click event', async() => {
			submissionAndCompletionProps.canEditCompletionType = true;
			const el = await loadComponent();
			const completionSelect = el.shadowRoot.querySelector('#assignment-completion-type');

			const listener = oneEvent(completionSelect, 'click');
			completionSelect.click();

			const { detail } = await listener;
			expect(detail).to.equal(0);

		});
	});
});
