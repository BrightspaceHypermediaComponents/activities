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
				instructionsRichTextEditorConfig: () => {},
				activityUsageHref: () => 'http://activity/1',
				submissionTypeOptions: () => ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
				completionTypeOptions: () => [],
				canEditSubmissionType: () => true,
				canEditCompletionType: () => false,
				submissionType: () => 'Option 1',
				completionType: () => ''
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
		expect(assignment.submissionTypeOptions).to.include.ordered.members(['Option 1', 'Option 2', 'Option 3', 'Option 4']);
		expect(assignment.completionTypeOptions).to.include.ordered.members([]);
		expect(assignment.canEditSubmissionType).to.equal(true);
		expect(assignment.canEditCompletionType).to.equal(false);
		expect(assignment.submissionType).to.equal('Option 1');
		expect(assignment.completionType).to.equal('');

		expect(fetchEntity.mock.calls.length).to.equal(1);
		expect(AssignmentEntity.mock.calls[0][0]).to.equal(sirenEntity);
		expect(AssignmentEntity.mock.calls[0][1]).to.equal('token');
	});
});
