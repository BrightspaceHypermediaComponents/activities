import { AssignmentActivityUsage } from '../../../../components/d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-activity-usage.js';
import { AssignmentActivityUsageEntity } from 'siren-sdk/src/activities/assignments/AssignmentActivityUsageEntity.js';
import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import sinon from 'sinon';

jest.mock('siren-sdk/src/activities/assignments/AssignmentActivityUsageEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Assignment Activity Usage', function() {

	afterEach(() => {
		sinon.restore();
		AssignmentActivityUsageEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	beforeEach(() => {
		sirenEntity = sinon.stub();

		AssignmentActivityUsageEntity.mockImplementation(() => {
			return {
				assignmentHref: () => 'http://assignment/1'
			};
		});

		fetchEntity.mockImplementation(() => sirenEntity);
	});

	it('fetches', async() => {
		const activity = new AssignmentActivityUsage('http://1', 'token');
		await activity.fetch();

		expect(activity.assignmentHref).to.equal('http://assignment/1');

		expect(fetchEntity.mock.calls.length).to.equal(1);
		expect(AssignmentActivityUsageEntity.mock.calls[0][0]).to.equal(sirenEntity);
		expect(AssignmentActivityUsageEntity.mock.calls[0][1]).to.equal('token');
	});
});
