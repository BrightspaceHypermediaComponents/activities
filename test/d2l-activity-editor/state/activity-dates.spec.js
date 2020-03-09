import { ActivityDates } from '../../../components/d2l-activity-editor/state/activity-dates.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';
import { expect } from 'chai';
import { fetchEntity } from '../../../components/d2l-activity-editor/state/fetch-entity.js';
import sinon from 'sinon';
import { when } from 'mobx';

jest.mock('siren-sdk/src/activities/ActivityUsageEntity.js');
jest.mock('../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Activity Usage', function() {

	const defaultEntityMock = {
		startDate: () => '2020-01-22T04:59:00.000Z',
		dueDate: () => '2020-01-23T04:59:00.000Z',
		endDate: () => '2020-01-24T04:59:00.000Z',
		canEditDates: () => true
	};

	afterEach(() => {
		sinon.restore();
		ActivityUsageEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	describe('fetching', () => {
		it('initializes with dates', async() => {
			const activity = new ActivityDates(defaultEntityMock);

			expect(activity.canEditDates).to.be.true;
			expect(activity.startDate).to.equal('2020-01-22T04:59:00.000Z');
			expect(activity.dueDate).to.equal('2020-01-23T04:59:00.000Z');
			expect(activity.endDate).to.equal('2020-01-24T04:59:00.000Z');
		});
	});

	describe('updating', () => {
		beforeEach(() => {
			sirenEntity = sinon.stub();

			ActivityUsageEntity.mockImplementation(() => {
				return defaultEntityMock;
			});

			fetchEntity.mockImplementation(() => sirenEntity);
		});

		it('reacts to start date', async(done) => {
			const activity = new ActivityDates(defaultEntityMock);

			when(
				() => activity.startDate === '2020-02-21T04:59:00.000Z',
				() => {
					done();
				}
			);

			activity.setStartDate('2020-02-21T04:59:00.000Z');
		});

		it('reacts to due date', async(done) => {
			const activity = new ActivityDates(defaultEntityMock);

			when(
				() => activity.dueDate === '2020-02-23T04:59:00.000Z',
				() => {
					done();
				}
			);

			activity.setDueDate('2020-02-23T04:59:00.000Z');
		});

		it('reacts to end date', async(done) => {
			const activity = new ActivityDates(defaultEntityMock);

			when(
				() => activity.endDate === '2020-02-25T04:59:00.000Z',
				() => {
					done();
				}
			);

			activity.setEndDate('2020-02-25T04:59:00.000Z');
		});
	});
});
