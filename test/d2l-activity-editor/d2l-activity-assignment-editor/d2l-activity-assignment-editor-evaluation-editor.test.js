import '../../../components/d2l-activity-editor/d2l-activity-assignment-editor/d2l-activity-assignment-evaluation-editor.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { ActivityUsage } from '../../../components/d2l-activity-editor/state/activity-usage.js';
import { shared as activityUsageStore } from '../../../components/d2l-activity-editor/state/activity-store.js';
import { Assignment } from '../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment.js';
import { shared as assignmentStore } from '../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-store.js';
import { default as langTerms } from '../../../components/d2l-activity-editor/d2l-activity-assignment-editor/lang/en.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

describe('d2l-activity-assignment-editor-evaluation-editor', function() {

	let href, token, submissionAndCompletionProps, assignmentTypeProps, anonymousMarkingProps, assignment, activity, milestones;

	async function loadComponent() {
		assignment.setSubmissionAndCompletionProps(submissionAndCompletionProps);
		assignment.setAssignmentTypeProps(assignmentTypeProps);
		assignment.setAnonymousMarkingProps(anonymousMarkingProps);
		assignmentStore.put(href, assignment);

		activityUsageStore.put(href, activity);

		return await fixture(
			html`
				<d2l-activity-assignment-evaluation-editor
					href=${href}
					activityUsageHref=${href}
					.token="${token}"
					@d2l-request-provider="${_isMilestoneEnabled}"
				>
				</d2l-activity-assignment-evaluation-editor>
			`
		);
	}

	function _isMilestoneEnabled(e) {
		e.detail.provider = milestones[e.detail.key];
	}

	beforeEach(async() => {
		href = 'http://activity/1';
		token = 'token';

		submissionAndCompletionProps = {
			submissionTypeOptions: [
				{ title: 'File submission', value: 0, completionTypes: null, selected: false },
				{ title: 'Text submission', value: 1, completionTypes: null, selected: false },
				{ title: 'On paper submission', value: 2, completionTypes: [1, 2, 3], selected: true },
				{ title: 'Observed in person', value: 3, completionTypes: [1, 2, 3], selected: false }
			],
			submissionType: '1',
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
		};

		assignmentTypeProps = {
			isGroupAssignmentTypeDisabled: false,
			isIndividualAssignmentType: true,
			groupCategories: [],
			canEditAssignmentType: true,
			selectedGroupCategoryName: 'group 1'
		};

		anonymousMarkingProps = {
			isAnonymousMarkingEnabled: true,
			canEditAnonymousMarking: true,
			isAnonymousMarkingAvailable: true,
			anonymousMarkingHelpText: 'Anonymous marking help text',
			submissionType: submissionAndCompletionProps.submissionType
		};

		milestones = {
			'd2l-milestone-two': true,
			'd2l-milestone-three-competencies': true
		};

		assignment = new Assignment(href, token);
		assignment.canEditAnnotations = true;
		assignment.annotationToolsAvailable = false;

		activity = new ActivityUsage(href, token);
		activity.canEditCompetencies = true;
	});

	afterEach(() => {
		assignment = undefined;
		activity = undefined;
		submissionAndCompletionProps = undefined;
		assignmentTypeProps = undefined;
		anonymousMarkingProps = undefined;
		assignmentStore.clear();
		activityUsageStore.clear();
	});

	describe('constructor', () => {

		it('should construct', async() => {
			await loadComponent();
			runConstructor('d2l-activity-assignment-evaluation-editor');
		});

	});

	it('passes accessibility test', async() => {
		const el = await loadComponent();
		await expect(el).to.be.accessible();
	});

	describe('accordion', () => {

		it('accordion is not hidden on load', async() => {
			const el = await loadComponent();
			expect(el.shadowRoot.querySelector('d2l-activity-accordion-collapse').getAttribute('hidden')).to.be.null;
		});

		it('has a heading', async() => {
			const el = await loadComponent();
			const header = el.shadowRoot.querySelector('d2l-activity-accordion-collapse > span[slot="header"]');
			expect(header.innerText).to.equal(langTerms.evaluationAndFeedback);
		});

		it('has a summary', async() => {
			const el = await loadComponent();
			const summary = el.shadowRoot.querySelectorAll('d2l-activity-accordion-collapse > li[slot="summary-items"]');
			expect(summary.length).to.equal(4);
		});

		it('handles click event', async() => {
			const el = await loadComponent();
			//TODO: make this check if accordion opens/closes? (maybe out of scope?)
			setTimeout(() => el.click());
			const { target } = await oneEvent(el, 'click');
			expect(target).equals(el);
		});
	});

	describe('Annotations Editor', () => {
		it('loads properly and is visible when user can edit annotations', async() => {
			const el = await loadComponent();
			const annotationEditorComponent =
				el.shadowRoot.querySelectorAll('d2l-activity-accordion-collapse > span > .d2l-editor > d2l-activity-assignment-annotations-editor');
			const annotationEditor = await fixture(html`${annotationEditorComponent}`);

			const label = annotationEditor.shadowRoot.querySelectorAll('.d2l-label-text')[0];
			expect(label.innerText).to.equal(langTerms.annotationTools);

			const checkbox = annotationEditor.shadowRoot.querySelectorAll('d2l-input-checkbox')[0];
			expect(checkbox.innerText).to.equal(langTerms.annotationToolDescription);
			expect(checkbox.hidden).to.equal(false);
			expect(checkbox.disabled).to.equal(false);
			expect(checkbox.checked).to.equal(false);
			expect(checkbox.getAttribute('arialabel')).to.equal(langTerms.annotationToolDescription);
		});

		it('updates the annotations tools avaliable value when change event occurs', async() => {
			const el = await loadComponent();
			const annotationEditorComponent =
				el.shadowRoot.querySelectorAll('d2l-activity-accordion-collapse > span > .d2l-editor > d2l-activity-assignment-annotations-editor');
			const annotationEditor = await fixture(html`${annotationEditorComponent}`);

			const checkbox = annotationEditor.shadowRoot.querySelectorAll('d2l-input-checkbox')[0];

			expect(assignment.annotationToolsAvailable).to.equal(false);
			checkbox.simulateClick();
			expect(assignment.annotationToolsAvailable).to.equal(true);
		});
	});

	describe('Anonymous Marking Editor', () => {
		it('loads properly and is visible when anonymous marking is avaliable', async() => {
			const el = await loadComponent();
			const anonMarkingEditorComponent =
				el.shadowRoot.querySelectorAll('d2l-activity-accordion-collapse > span > .d2l-editor > d2l-activity-assignment-anonymous-marking-editor');
			const anonMarkingEditor = await fixture(html`${anonMarkingEditorComponent}`);

			const label = anonMarkingEditor.shadowRoot.querySelectorAll('.d2l-label-text')[0];
			expect(label.innerText).to.equal(langTerms.lblAnonymousMarking);

			const checkbox = anonMarkingEditor.shadowRoot.querySelectorAll('d2l-input-checkbox')[0];
			expect(checkbox.innerText).to.equal(langTerms.chkAnonymousMarking);
			expect(checkbox.hidden).to.equal(false);
			expect(checkbox.disabled).to.equal(false);
			expect(checkbox.checked).to.equal(true);
			expect(checkbox.getAttribute('arialabel')).to.equal(langTerms.chkAnonymousMarking);

			const checkboxSpacer = anonMarkingEditor.shadowRoot.querySelectorAll('d2l-input-checkbox-spacer')[0];
			expect(checkboxSpacer.hidden).to.equal(false);
			expect(checkboxSpacer.innerText).to.equal(anonymousMarkingProps.anonymousMarkingHelpText);
		});

		it('updates the anonymous marking is avaliable value when change event occurs', async() => {
			anonymousMarkingProps.isAnonymousMarkingEnabled = false;
			const el = await loadComponent();
			const anonMarkingEditorComponent =
				el.shadowRoot.querySelectorAll('d2l-activity-accordion-collapse > span > .d2l-editor > d2l-activity-assignment-anonymous-marking-editor');
			const anonMarkingEditor = await fixture(html`${anonMarkingEditorComponent}`);

			const checkbox = anonMarkingEditor.shadowRoot.querySelectorAll('d2l-input-checkbox')[0];

			expect(assignment.anonymousMarkingProps.isAnonymousMarkingEnabled).to.equal(false);
			checkbox.simulateClick();
			expect(assignment.anonymousMarkingProps.isAnonymousMarkingEnabled).to.equal(true);
		});
	});

	describe('Turn It In Editor', () => {
		it('loads properly and is visible when anonymous marking is avaliable', async() => {
			assignment.canEditTurnitin = true;

			const el = await loadComponent();
			const turnItInEditorComponent =
				el.shadowRoot.querySelectorAll('d2l-activity-accordion-collapse > span > .d2l-editor > d2l-assignment-turnitin-editor');
			const turnItInEditor = await fixture(html`${turnItInEditorComponent}`);

			const turnItInContainer = turnItInEditor.shadowRoot.querySelectorAll('#assignment-turnitin-container');
			expect(turnItInContainer.hidden).to.be.undefined;

			const heading = turnItInEditor.shadowRoot.querySelectorAll('.d2l-label-text')[0];
			expect(heading.innerText).to.equal(langTerms.hdrTurnitin);

			const button = turnItInEditor.shadowRoot.querySelectorAll('d2l-button-subtle')[0];
			expect(button.text).to.equal(langTerms.btnEditTurnitin);
		});

		it('only shows Originality Check and Grade Mark when they are enabled', async() => {
			assignment.canEditTurnitin = true;

			const el = await loadComponent();
			const turnItInEditorComponent =
				el.shadowRoot.querySelectorAll('d2l-activity-accordion-collapse > span > .d2l-editor > d2l-assignment-turnitin-editor');
			let turnItInEditor, featureSummary;

			assignment.setTurnitin(false, false);
			turnItInEditor = await fixture(html`${turnItInEditorComponent}`);
			featureSummary = turnItInEditor.shadowRoot.querySelectorAll('.d2l-feature-summary')[0];
			expect(featureSummary).to.be.undefined;

			assignment.setTurnitin(false, true);
			turnItInEditor = await fixture(html`${turnItInEditorComponent}`);
			featureSummary = turnItInEditor.shadowRoot.querySelectorAll('.d2l-feature-summary')[0];
			expect(featureSummary.getElementsByTagName('li').length).to.equal(1);

			assignment.setTurnitin(true, false);
			turnItInEditor = await fixture(html`${turnItInEditorComponent}`);
			featureSummary = turnItInEditor.shadowRoot.querySelectorAll('.d2l-feature-summary')[0];
			expect(featureSummary.getElementsByTagName('li').length).to.equal(1);

			assignment.setTurnitin(true, true);
			turnItInEditor = await fixture(html`${turnItInEditorComponent}`);
			featureSummary = turnItInEditor.shadowRoot.querySelectorAll('.d2l-feature-summary')[0];
			expect(featureSummary.getElementsByTagName('li').length).to.equal(2);
		});
	});
});
