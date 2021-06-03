import { ActivitySpecialAccessEntity } from 'siren-sdk/src/activities/ActivitySpecialAccessEntity.js';
import { ActivityUsage } from '../../../components/d2l-activity-editor/state/activity-usage.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';
import { AlignmentsHierarchicalEntity } from 'siren-sdk/src/alignments/AlignmentsHierarchicalEntity.js';
import { CompetenciesEntity } from 'siren-sdk/src/competencies/CompetenciesEntity.js';
import { expect } from 'chai';
import { fetchEntity } from '../../../components/d2l-activity-editor/state/fetch-entity.js';
import { GradeCandidateCollectionEntity } from 'siren-sdk/src/activities/GradeCandidateCollectionEntity';
import sinon from 'sinon';
import { when } from 'mobx';

jest.mock('siren-sdk/src/activities/ActivitySpecialAccessEntity.js');
jest.mock('siren-sdk/src/activities/ActivityUsageEntity.js');
jest.mock('siren-sdk/src/alignments/AlignmentsHierarchicalEntity.js');
jest.mock('siren-sdk/src/competencies/CompetenciesEntity.js');
jest.mock('siren-sdk/src/activities/GradeCandidateCollectionEntity.js');
jest.mock('../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Activity Usage', function() {

	function defaultEntityMock(useCompetencies) {
		const alignmentsHref = useCompetencies ? null : 'http://alignments-href/';
		const competenciesHref = useCompetencies ? 'http://competencies-href/' : null;
		const associatedCompetenciesCount = useCompetencies ? 13 : null;
		const unevaluatedCompetenciesCount = useCompetencies ? 10 : null;
		const competenciesDialogUrl = useCompetencies ? 'http://competencies-dialog-href/' : null;

		return {
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
			canEditReleaseConditions: () => true,
			getDirectRubricAssociationsHref: () => undefined,
			newGradeCandidatesHref: () => undefined,
			isNewGradeCandidate: () => false,
			alignmentsHierarchicalHref: () => alignmentsHref,
			competenciesHref: () => competenciesHref,
			associatedCompetenciesCount: () => associatedCompetenciesCount,
			unevaluatedCompetenciesCount: () => unevaluatedCompetenciesCount,
			competenciesDialogUrl: () => competenciesDialogUrl,
			specialAccessHref: () => null,
			specializationHref: () => null,
			fetchLinkedScoreOutOfEntity: () => null,
			associateGradeHref: () => null,
			activityCollectionHref: () => undefined
		};
	}

	afterEach(() => {
		sinon.restore();
		ActivitySpecialAccessEntity.mockClear();
		ActivityUsageEntity.mockClear();
		AlignmentsHierarchicalEntity.mockClear();
		GradeCandidateCollectionEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	describe('fetching', () => {
		beforeEach(() => {
			sirenEntity = sinon.stub();

			ActivityUsageEntity.mockImplementation(() => {
				return defaultEntityMock();
			});

			AlignmentsHierarchicalEntity.mockImplementation(() => {
				return {
					canUpdateAlignments: () => true
				};
			});

			CompetenciesEntity.mockImplementation(() => {
				return {
					dialogUrl: () => 'http://competencies-dialog-href/',
					associatedCount: () => 13,
					unevaluatedCount: () => 10
				};
			});

			ActivitySpecialAccessEntity.mockImplementation(() => {
				return {
					url: () => 'http://special-access-dialog-href/',
					userCount: () => 0,
					isRestricted: () => false
				};
			});

			fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
		});

		it('fetches with alignments (learning outcomes)', async() => {
			const activity = new ActivityUsage('http://1', 'token');
			await activity.fetch();

			expect(activity.isDraft).to.be.true;
			expect(activity.canEditDraft).to.be.true;
			expect(activity.specialAccess).to.be.null;
			expect(activity.canUpdateAlignments).to.be.true;
			expect(activity.alignmentsHref).to.equal('http://alignments-href/');
			expect(activity.competenciesHref).to.be.null;
			expect(activity.associatedCompetenciesCount).to.be.null;
			expect(activity.unevaluatedCompetenciesCount).to.be.null;
			expect(activity.competenciesDialogUrl).to.be.null;
			expect(activity.canEditCompetencies).to.be.false;

			expect(fetchEntity.mock.calls.length).to.equal(2);
			expect(fetchEntity.mock.calls[0][0]).to.equal('http://1');
			expect(fetchEntity.mock.calls[1][0]).to.equal('http://alignments-href/');
			expect(ActivityUsageEntity.mock.calls[0][0]).to.equal(sirenEntity);
			expect(ActivityUsageEntity.mock.calls[0][1]).to.equal('token');
		});

		it('fetches with competencies', async() => {
			ActivityUsageEntity.mockImplementation(() => {
				return defaultEntityMock(true);
			});

			const activity = new ActivityUsage('http://1', 'token');
			await activity.fetch();

			expect(activity.isDraft).to.be.true;
			expect(activity.canEditDraft).to.be.true;
			expect(activity.canUpdateAlignments).to.be.false;
			expect(activity.alignmentsHref).to.be.null;
			expect(activity.competenciesHref).to.equal('http://competencies-href/');
			expect(activity.associatedCompetenciesCount).to.equal(13);
			expect(activity.unevaluatedCompetenciesCount).to.equal(10);
			expect(activity.competenciesDialogUrl).to.equal('http://competencies-dialog-href/');
			expect(activity.canEditCompetencies).to.be.true;

			expect(fetchEntity.mock.calls.length).to.equal(2);
			expect(fetchEntity.mock.calls[0][0]).to.equal('http://1');
			expect(fetchEntity.mock.calls[1][0]).to.equal('http://competencies-href/');
			expect(ActivityUsageEntity.mock.calls[0][0]).to.equal(sirenEntity);
			expect(ActivityUsageEntity.mock.calls[0][1]).to.equal('token');
		});

		it('fetches new competencies values', async() => {
			// Setup default activity-usage with default values
			ActivityUsageEntity.mockImplementation(() => {
				return defaultEntityMock(true);
			});

			const activity = new ActivityUsage('http://1', 'token');
			await activity.fetch();

			// Assert default values
			expect(activity.competenciesHref).to.equal('http://competencies-href/');
			expect(activity.associatedCompetenciesCount).to.equal(13);
			expect(activity.unevaluatedCompetenciesCount).to.equal(10);
			expect(activity.competenciesDialogUrl).to.equal('http://competencies-dialog-href/');
			expect(activity.canEditCompetencies).to.be.true;

			// Override competencies with new values
			CompetenciesEntity.mockImplementation(() => {
				return {
					dialogUrl: () => 'http://competencies-dialog-href-2/',
					associatedCount: () => 22,
					unevaluatedCount: () => 11
				};
			});

			await activity.loadCompetencies();

			// Assert override values
			expect(activity.competenciesHref).to.equal('http://competencies-href/');
			expect(activity.associatedCompetenciesCount).to.equal(22);
			expect(activity.unevaluatedCompetenciesCount).to.equal(11);
			expect(activity.competenciesDialogUrl).to.equal('http://competencies-dialog-href-2/');
			expect(activity.canEditCompetencies).to.be.true;

			expect(fetchEntity.mock.calls.length).to.equal(3);
			expect(fetchEntity.mock.calls[0][0]).to.equal('http://1');
			expect(fetchEntity.mock.calls[1][0]).to.equal('http://competencies-href/');
			expect(fetchEntity.mock.calls[2][0]).to.equal('http://competencies-href/');
		});

		it('does not fetch competencies without href', async() => {
			// Setup default activity-usage with default values
			ActivityUsageEntity.mockImplementation(() => {
				return defaultEntityMock();
			});

			const activity = new ActivityUsage('http://1', 'token');

			const assertExpectations = () => {
				expect(activity.competenciesHref).to.be.null;
				expect(activity.associatedCompetenciesCount).to.be.null;
				expect(activity.unevaluatedCompetenciesCount).to.be.null;
				expect(activity.competenciesDialogUrl).to.be.null;
				expect(activity.canEditCompetencies).to.be.false;

				expect(fetchEntity.mock.calls.length).to.equal(2);
				expect(fetchEntity.mock.calls[0][0]).to.equal('http://1');
				expect(fetchEntity.mock.calls[1][0]).to.equal('http://alignments-href/');
			};

			await activity.fetch();
			assertExpectations();

			await activity.loadCompetencies();
			assertExpectations();
		});

		it('fetches special access', async() => {
			ActivityUsageEntity.mockImplementation(() => {
				const defaultEntity = defaultEntityMock();
				defaultEntity.specialAccessHref = () => 'http://special-access-href';
				return defaultEntity;
			});

			const activity = new ActivityUsage('http://1', 'token');
			await activity.fetch();
			expect(activity.specialAccess).to.be.an('object');
		});
	});

	describe('updating', () => {
		beforeEach(() => {
			sirenEntity = sinon.stub();

			ActivityUsageEntity.mockImplementation(() => {
				return defaultEntityMock();
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

			ActivityUsageEntity.mockImplementation(() => Object.assign({}, defaultEntityMock(),	{
				save
			}));

			fetchEntity.mockImplementation(() => sirenEntity);

			const gradeCandidateCollectionEntityMock = {
				href: () => 'http://grade-candidate-collection-href',
				getGradeCandidates: () => [],
				getAssociateNewGradeAction: () => {}
			};
			GradeCandidateCollectionEntity.mockImplementation(() => gradeCandidateCollectionEntityMock);
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
