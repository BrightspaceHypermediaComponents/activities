import { ActivityUsage} from '../../../components/d2l-activity-editor/state/activity-usage.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';
import { AlignmentsCollectionEntity } from 'siren-sdk/src/alignments/AlignmentsCollectionEntity.js';
import { expect } from 'chai';
import { fetchEntity } from '../../../components/d2l-activity-editor/state/fetch-entity.js';
import sinon from 'sinon';
import { when } from 'mobx';

jest.mock('siren-sdk/src/activities/ActivityUsageEntity.js');
jest.mock('siren-sdk/src/alignments/AlignmentsCollectionEntity.js');
jest.mock('../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Activity Usage', function() {

	const defaultEntityMock = {
		startDate: () => '2020-01-22T04:59:00.000Z',
		dueDate: () => '2020-01-23T04:59:00.000Z',
		endDate: () => '2020-01-24T04:59:00.000Z',
		canEditDates: () => true,
		isDraft: () => true,
		canEditDraft: () => true,
		scoreOutOf: () => 10,
		inGrades: () => true,
		gradeType: () => 'Points',
		canEditScoreOutOf: () => true,
		canSeeGrades: () => true,
		canEditGrades: () => true,
		gradeHref: () => '',
		associatedGrade: () => undefined,
		gradeCandidatesHref: () => '',
		conditionsHref: () => undefined,
		getRubricAssociationsHref: () => undefined,
		newGradeCandidatesHref: () => undefined,
		isNewGradeCandidate: () => false,
		alignmentsHref: () => 'http://alignments-href/'
	};

	afterEach(() => {
		sinon.restore();
		ActivityUsageEntity.mockClear();
		AlignmentsCollectionEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	describe('fetching', () => {
		beforeEach(() => {
			sirenEntity = sinon.stub();

			ActivityUsageEntity.mockImplementation(() => {
				return defaultEntityMock;
			});

			AlignmentsCollectionEntity.mockImplementation(() => {
				return {
					getAlignments: () => [],
					canUpdateAlignments: () => true
				};
			});

			fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
		});

		it('fetches', async() => {
			const activity = new ActivityUsage('http://1', 'token');
			await activity.fetch();

			expect(activity.isDraft).to.be.true;
			expect(activity.canEditDraft).to.be.true;
			expect(activity.canUpdateAlignments).to.be.true;
			expect(activity.alignmentsHref).to.equal('http://alignments-href/');
			expect(activity.hasAlignments).to.be.false;

			expect(fetchEntity.mock.calls.length).to.equal(2);
			expect(fetchEntity.mock.calls[0][0]).to.equal('http://1');
			expect(fetchEntity.mock.calls[1][0]).to.equal('http://alignments-href/');
			expect(ActivityUsageEntity.mock.calls[0][0]).to.equal(sirenEntity);
			expect(ActivityUsageEntity.mock.calls[0][1]).to.equal('token');
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

		it('reacts to is draft', async(done) => {
			const activity = new ActivityUsage('http://1', 'token');
			await activity.fetch();

			when(
				() => activity.isDraft === false,
				() => {
					done();
				}
			);

			activity.setDraftStatus(false);
		});
	});

	describe('saving', () => {
		const save = jest.fn();

		beforeEach(() => {
			sirenEntity = sinon.stub();

			ActivityUsageEntity.mockImplementation(() => Object.assign({}, defaultEntityMock,	{
				save
			}));

			fetchEntity.mockImplementation(() => sirenEntity);
		});

		it('saves', async() => {
			const activity = new ActivityUsage('http://1', 'token');
			await activity.fetch();

			activity.dates.setStartDate('2020-02-22T04:59:00.000Z');
			activity.dates.setDueDate('2020-02-23T04:59:00.000Z');
			activity.dates.setEndDate('2020-02-24T04:59:00.000Z');
			activity.setDraftStatus(false);
			activity.scoreAndGrade.setNewGradeName('a new grade');
			await activity.save();

			expect(save.mock.calls.length).to.equal(1);
			expect(save.mock.calls[0][0]).to.eql({
				isDraft: false,
				dates: {
					startDate: '2020-02-22T04:59:00.000Z',
					dueDate: '2020-02-23T04:59:00.000Z',
					endDate: '2020-02-24T04:59:00.000Z'
				},
				scoreAndGrade: {
					associateNewGradeAction: undefined,
					associatedGrade: null,
					scoreOutOf: '10',
					inGrades: true,
					newGradeName: 'a new grade'
				}
			});
		});
	});
});
