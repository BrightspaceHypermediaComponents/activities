import { Assignment } from '../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import sinon from 'sinon';

jest.mock('siren-sdk/src/activities/assignments/AssignmentEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Assignment ', function() {

	afterEach(() => {
		sinon.restore();
		AssignmentEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	beforeEach(() => {
		sirenEntity = sinon.stub();

		AssignmentEntity.mockImplementation(() => {
			return {
				name: () => 'Homework 101',
				canEditName: () => true,
				instructionsEditorHtml: () => 'These are your instructions',
				canEditInstructions: () => true,
				canEditTurnitin: () => undefined,
				attachmentsCollectionHref: () => 'http://attachmentsCollectionHref/1',
				editTurnitinUrl: () => undefined,
				isOriginalityCheckEnabled: () => undefined,
				isGradeMarkEnabled: () => undefined,
				instructionsRichTextEditorConfig: () => {},
				isAnonymousMarkingAvailable: () => true,
				isAnonymousMarkingEnabled: () => true,
				canEditAnonymousMarking: () => true,
				getAnonymousMarkingHelpText: () => 'Anonymous marking help text',
				canEditAnnotations: () => undefined,
				getAvailableAnnotationTools: () => undefined,
				getCategoriesLink: () => 'http://categories.com',
				activityUsageHref: () => 'http://activity/1',
				submissionTypeOptions: () => [
					{ title: 'File submission', value: 0, completionTypes: null, selected: false },
					{ title: 'Text submission', value: 1, completionTypes: null, selected: false },
					{ title: 'On paper submission', value: 2, completionTypes: [1, 2], selected: true },
					{ title: 'Observed in person', value: 3, completionTypes: [3], selected: false }
				],
				allCompletionTypeOptions: () => [
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
				canEditSubmissionType: () => true,
				canEditCompletionType: () => true,
				canEditFilesSubmissionLimit: () => true,
				canEditDefaultScoringRubric: () => true,
				getDefaultScoringRubric: () => '-1',
				filesSubmissionLimit: () => 'unlimited',
				submissionType: () => { return { title: 'On paper submission', value: 2 }; },
				completionType: () => { return { title: 'Manually by learners', value: 2 }; },
				completionTypeValue: () => { return '2'; },
				isGroupAssignmentTypeDisabled: () => false,
				isIndividualAssignmentType: () => true,
				getAssignmentTypeGroupCategoryOptions: () => [],
				getAssignmentTypeInformationText: () => '',
				isAssignmentTypeReadOnly: () => false,
				assignmentHasSubmissions: () => false,
				getAssignmentTypeSelectedGroupCategoryName: () => null,
				canEditSubmissionsRule: () => true,
				submissionsRule: () => 'keepall',
				notificationEmail: () => '',
				canEditNotificationEmail: () => true,
				getSubmissionsRuleOptions: () => [
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
				]
			};
		});

		fetchEntity.mockImplementation(() => sirenEntity);
	});

	it('fetches', async() => {
		const assignment = new Assignment('http://assignment/1', 'token');
		await assignment.fetch();

		expect(assignment.name).to.equal('Homework 101');
		expect(assignment.instructions).to.equal('These are your instructions');
		expect(assignment.activityUsageHref).to.equal('http://activity/1');
		expect(assignment.submissionAndCompletionProps.submissionTypeOptions).to.eql([
			{ title: 'File submission', value: 0, completionTypes: null, selected: false },
			{ title: 'Text submission', value: 1, completionTypes: null, selected: false },
			{ title: 'On paper submission', value: 2, completionTypes: [1, 2], selected: true },
			{ title: 'Observed in person', value: 3, completionTypes: [3], selected: false }
		]);
		expect(assignment.submissionAndCompletionProps.completionTypeOptions).to.eql([
			{ selected: false, title: 'Manually by learners', value: 1 },
			{ selected: false, title: 'Automatically on evaluation', value: 2 }
		]);
		expect(assignment.submissionAndCompletionProps.canEditSubmissionType).to.equal(true);
		expect(assignment.submissionAndCompletionProps.canEditCompletionType).to.equal(true);
		expect(assignment.submissionAndCompletionProps.submissionType).to.equal('2');
		expect(assignment.submissionAndCompletionProps.completionType).to.equal('2');
		expect(assignment.anonymousMarkingProps.isAnonymousMarkingAvailable).to.equal(false);

		expect(fetchEntity.mock.calls.length).to.equal(1);
		expect(AssignmentEntity.mock.calls[0][0]).to.equal(sirenEntity);
		expect(AssignmentEntity.mock.calls[0][1]).to.equal('token');
	});

	it('setSubmissionType when new submission type has completion types', async() => {
		const assignment = new Assignment('http://assignment/1', 'token');
		await assignment.fetch();
		assignment.submissionAndCompletionProps.submissionType = '1';
		assignment.submissionAndCompletionProps.completionType = null;
		assignment.setSubmissionType('3');

		expect(assignment.submissionAndCompletionProps.submissionType).to.equal('3');
		expect(assignment.submissionAndCompletionProps.completionType).to.equal('3');
		expect(assignment.submissionAndCompletionProps.canEditCompletionType).to.equal(true);
		expect(assignment.anonymousMarkingProps.isAnonymousMarkingAvailable).to.equal(false);
	});

	it('setSubmissionType when new submission type does not have completion types', async() => {
		const assignment = new Assignment('http://assignment/1', 'token');
		await assignment.fetch();
		assignment.submissionAndCompletionProps.submissionType = '3';
		assignment.submissionAndCompletionProps.completionType = '3';
		assignment.setSubmissionType('1');

		expect(assignment.submissionAndCompletionProps.submissionType).to.equal('1');
		expect(assignment.submissionAndCompletionProps.completionType).to.equal(null);
		expect(assignment.submissionAndCompletionProps.canEditCompletionType).to.equal(true);
		expect(assignment.anonymousMarkingProps.isAnonymousMarkingAvailable).to.equal(true);
	});

	it('setSubmissionType when current completion type is valid', async() => {
		const assignment = new Assignment('http://assignment/1', 'token');
		await assignment.fetch();
		assignment.submissionAndCompletionProps.submissionTypeOptions[3].completionTypes = [2, 3, 4];
		assignment.setSubmissionType('3');

		expect(assignment.submissionAndCompletionProps.submissionType).to.equal('3');
		expect(assignment.submissionAndCompletionProps.completionType).to.equal('2');
		expect(assignment.submissionAndCompletionProps.canEditCompletionType).to.equal(true);
	});

	it('setSubmissionType when current completion type is no longer valid', async() => {
		const assignment = new Assignment('http://assignment/1', 'token');
		await assignment.fetch();
		assignment.setSubmissionType('0');

		expect(assignment.submissionAndCompletionProps.submissionType).to.equal('0');
		expect(assignment.submissionAndCompletionProps.completionType).to.equal(null);
		expect(assignment.submissionAndCompletionProps.canEditCompletionType).to.equal(true);
	});

	it('setTurnitin', async() => {
		const assignment = new Assignment('http://assignment/1', 'token');
		await assignment.fetch();
		assignment.setTurnitin(true, true);

		expect(assignment.isOriginalityCheckEnabled).to.equal(true);
		expect(assignment.isGradeMarkEnabled).to.equal(true);
	});

	it('setDefaultScoringRubric when valid ID', async() => {
		const assignment = new Assignment('http://assignment/1', 'token');
		await assignment.fetch();
		assignment.setDefaultScoringRubric(2);

		expect(assignment.defaultScoringRubricId).to.equal('2');
	});

	it('setDefaultScoringRubric when NOT valid ID', async() => {
		const assignment = new Assignment('http://assignment/1', 'token');
		await assignment.fetch();
		assignment.setDefaultScoringRubric(undefined);

		expect(assignment.defaultScoringRubricId).to.equal('-1');
	});

	it('resetDefaultScoringRubricId', async() => {
		const assignment = new Assignment('http://assignment/1', 'token');
		await assignment.fetch();
		assignment.setDefaultScoringRubric(2);
		assignment.resetDefaultScoringRubricId();

		expect(assignment.defaultScoringRubricId).to.equal('-1');
	});
});
