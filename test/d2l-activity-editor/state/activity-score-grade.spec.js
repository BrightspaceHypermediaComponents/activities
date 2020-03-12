import { ActivityScoreGrade} from '../../../components/d2l-activity-editor/state/activity-score-grade.js';
import { expect } from 'chai';
import { fetchEntity } from '../../../components/d2l-activity-editor/state/fetch-entity.js';
import { GradeCandidate } from '../../../components/d2l-activity-editor/d2l-activity-grades/state/grade-candidate.js';
import { GradeEntity } from 'siren-sdk/src/activities/GradeEntity.js';
import sinon from 'sinon';
import { when } from 'mobx';

jest.mock('siren-sdk/src/activities/GradeEntity.js');
jest.mock('../../../components/d2l-activity-editor/state/fetch-entity.js');

function catchErrors(done, callback) {
	return function() {
		try {
			callback(...arguments);
			done();
		} catch (e) {
			done.fail(e);
		}
	};
}

describe('Activity Score Grade', function() {

	let defaultEntityMock;

	beforeEach(() => {
		defaultEntityMock = {
			scoreOutOf: () => 10,
			inGrades: () => true,
			gradeType: () => 'Points',
			canEditScoreOutOf: () => true,
			canSeeGrades: () => true,
			canEditGrades: () => true,
			associatedGrade: () => null,
			gradeHref: () => 'http://test-grade-href',
			gradeCandidatesHref: () => ''
		};
	});

	describe('fetching', () => {

		it('initializes with score and in grades', async() => {
			const activity = new ActivityScoreGrade(defaultEntityMock);

			expect(activity.isUngraded).to.be.false;
		});

		it('initializes with score only', async() => {
			defaultEntityMock.inGrades = () => false;

			const activity = new ActivityScoreGrade(defaultEntityMock);

			expect(activity.isUngraded).to.be.false;
		});

		it('initializes with ungraded', async() => {
			defaultEntityMock.scoreOutOf = () => '';
			defaultEntityMock.inGrades = () => false;

			const activity = new ActivityScoreGrade(defaultEntityMock);

			expect(activity.isUngraded).to.be.true;
		});
	});

	describe('updating', () => {

		it('reacts to ungraded', async(done) => {
			const activity = new ActivityScoreGrade(defaultEntityMock);

			when(
				() => activity.isUngraded,
				catchErrors(done, () => {
					expect(activity.scoreOutOf).to.be.empty;
					expect(activity.inGrades).to.be.false;
					expect(activity.associatedGrade).to.be.null;
					expect(activity.gradeHref).to.be.empty;
				})
			);

			activity.setUngraded();
		});

		it('reacts to graded', async(done) => {
			const activity = new ActivityScoreGrade(defaultEntityMock);
			activity.setUngraded();

			when(
				() => activity.inGrades,
				catchErrors(done, () => {
					expect(activity.isUngraded).to.be.false;
				})
			);

			activity.setGraded();
		});

		it('reacts to remove from grades', async(done) => {
			const activity = new ActivityScoreGrade(defaultEntityMock);

			when(
				() => !activity.inGrades,
				catchErrors(done, () => {
					expect(activity.associatedGrade).to.be.null;
					expect(activity.gradeHref).to.be.empty;
				})
			);

			activity.removeFromGrades();
		});

		it('reacts to set score', async(done) => {
			const activity = new ActivityScoreGrade(defaultEntityMock);

			when(
				() => activity.scoreOutOf === '99',
				done
			);

			activity.setScoreOutOf('99');
		});

		describe('associated grade', () => {
			let sirenEntity;

			const gradeEntityMock = {
				name: () => '',
				baseWeight: () => '',
				maxPoints: () => 50
			};

			beforeEach(() => {
				sirenEntity = sinon.stub();

				GradeEntity.mockImplementation(() => {
					return gradeEntityMock;
				});

				fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
			});

			afterEach(() => {
				sinon.restore();
				GradeEntity.mockClear();
				fetchEntity.mockClear();
			});

			it('reacts to set associated grade', async(done) => {
				const activity = new ActivityScoreGrade(defaultEntityMock);

				when(
					() => activity.associatedGrade,
					catchErrors(done, () => {
						expect(activity.gradeHref).to.equal('http://grade-candidate-href');
						expect(activity.inGrades).to.be.true;
						expect(activity.isUngraded).to.be.false;
						expect(activity.scoreOutOf).to.equal('50');
					})
				);

				const gradeCandidateEntityMock = {
					isCategory: () => false,
					isCurrentAssociation: () => false,
					href: () => 'http://grade-candidate-href',
					getGradeCandidates: () => []
				};

				const gradeCandidate = new GradeCandidate(gradeCandidateEntityMock, 'token');
				await gradeCandidate.fetch();

				activity.setAssociatedGrade(gradeCandidate);
			});
		});
	});

	describe('validating', () => {
		it('validates empty score when graded', () => {
			defaultEntityMock.scoreOutOf = () => '';
			defaultEntityMock.inGrades = () => false;

			const activity = new ActivityScoreGrade(defaultEntityMock);
			activity.setGraded();

			expect(activity.validate()).to.be.false;
			expect(activity.scoreOutOfError).to.equal('emptyScoreOutOfError');
		});

		it('validates invalid score', () => {
			const activity = new ActivityScoreGrade(defaultEntityMock);
			activity.setScoreOutOf('abc');
			expect(activity.scoreOutOfError).to.equal('invalidScoreOutOfError');
		});

		it('resets empty score error when remove from grades', () => {
			const activity = new ActivityScoreGrade(defaultEntityMock);
			activity.setScoreOutOf('');
			expect(activity.scoreOutOfError).to.equal('emptyScoreOutOfError');

			activity.removeFromGrades();
			expect(activity.scoreOutOfError).to.be.null;
		});

		it('does not reset invalid score error when remove from grades', () => {
			const activity = new ActivityScoreGrade(defaultEntityMock);
			activity.setScoreOutOf('abc');
			expect(activity.scoreOutOfError).to.equal('invalidScoreOutOfError');

			activity.removeFromGrades();
			expect(activity.scoreOutOfError).to.equal('invalidScoreOutOfError');
		});

		it('resets score and invalid error when set ungraded', () => {
			const activity = new ActivityScoreGrade(defaultEntityMock);
			activity.setScoreOutOf('abc');
			expect(activity.scoreOutOfError).to.equal('invalidScoreOutOfError');

			activity.setUngraded();

			expect(activity.scoreOutOf).to.equal('');
			expect(activity.scoreOutOfError).to.be.null;
		});

		it('resets score and empty error when set ungraded', () => {
			const activity = new ActivityScoreGrade(defaultEntityMock);
			activity.setScoreOutOf('');
			expect(activity.scoreOutOfError).to.equal('emptyScoreOutOfError');

			activity.setUngraded();

			expect(activity.scoreOutOf).to.equal('');
			expect(activity.scoreOutOfError).to.be.null;
		});

		it('reacts to score error', async(done) => {
			const activity = new ActivityScoreGrade(defaultEntityMock);
			when(
				() => !activity.scoreOutOfError,
				done
			);

			activity.setScoreOutOf('abc');
		});
	});
});
