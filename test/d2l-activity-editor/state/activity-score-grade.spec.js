import { ActivityScoreGrade } from '../../../components/d2l-activity-editor/state/activity-score-grade.js';
import { expect } from 'chai';
import { fetchEntity } from '../../../components/d2l-activity-editor/state/fetch-entity.js';
import { GradeCandidate } from '../../../components/d2l-activity-editor/d2l-activity-grades/state/grade-candidate.js';
import { GradeCandidateCollectionEntity } from 'siren-sdk/src/activities/GradeCandidateCollectionEntity';
import { GradeCandidateEntity } from 'siren-sdk/src/activities/GradeCandidateEntity';
import { GradeEntity } from 'siren-sdk/src/activities/GradeEntity.js';
import { when } from 'mobx';

jest.mock('siren-sdk/src/activities/GradeEntity.js');
jest.mock('siren-sdk/src/activities/GradeCandidateEntity.js');
jest.mock('siren-sdk/src/activities/GradeCandidateCollectionEntity.js');
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
			gradeCandidatesHref: () => 'http://grade-candidate-collection-href',
			newGradeCandidatesHref: () => undefined,
			isNewGradeCandidate: () => false,
			fetchLinkedScoreOutOfEntity: () => null
		};
	});

	describe('fetching', () => {

		it('initializes with score and in grades', async() => {
			const activity = new ActivityScoreGrade('token');
			await activity.fetch(defaultEntityMock);
			expect(activity.isUngraded).to.be.false;
		});

		it('initializes with score only', async() => {
			defaultEntityMock.inGrades = () => false;

			const activity = new ActivityScoreGrade('token');
			await activity.fetch(defaultEntityMock);
			expect(activity.isUngraded).to.be.false;
		});

		it('initializes with ungraded', async() => {
			defaultEntityMock.scoreOutOf = () => '';
			defaultEntityMock.inGrades = () => false;

			const activity = new ActivityScoreGrade('token');
			await activity.fetch(defaultEntityMock);
			expect(activity.isUngraded).to.be.true;
		});

		it('initializes with correct createNewGrade', async() => {
			const activity = new ActivityScoreGrade('token');
			await activity.fetch(defaultEntityMock);

			expect(activity.createNewGrade).to.be.false;
		});
	});

	describe('updating', () => {

		it('reacts to ungraded', async(done) => {
			const activity = new ActivityScoreGrade('token');
			await activity.fetch(defaultEntityMock);

			when(
				() => activity.isUngraded,
				catchErrors(done, () => {
					expect(activity.scoreOutOf).to.be.empty;
					expect(activity.inGrades).to.be.false;
					expect(activity.createNewGrade).to.be.false;
				})
			);

			activity.setUngraded();
		});

		it('reacts to graded', async(done) => {
			const activity = new ActivityScoreGrade('token');
			await activity.fetch(defaultEntityMock);
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
			const activity = new ActivityScoreGrade('token');
			await activity.fetch(defaultEntityMock);

			when(
				() => !activity.inGrades,
				catchErrors(done, () => {
					expect(activity.createNewGrade).to.be.false;
				})
			);

			activity.removeFromGrades();
		});

		it('reacts to set score', async(done) => {
			const activity = new ActivityScoreGrade('token');
			await activity.fetch(defaultEntityMock);

			when(
				() => activity.scoreOutOf === '99',
				done
			);

			activity.setScoreOutOf('99');
		});

		it('reacts to set new grade name', async(done) => {
			const activity = new ActivityScoreGrade('token');
			await activity.fetch(defaultEntityMock);

			when(
				() => activity.newGradeName === 'a new grade name',
				done
			);

			activity.setNewGradeName('a new grade name');
		});

		it('reacts to link to new grade', async(done) => {
			const activity = new ActivityScoreGrade('token');
			await activity.fetch(defaultEntityMock);

			when(
				() => activity.createNewGrade,
				catchErrors(done, () => {
					expect(activity.createNewGrade).to.be.true;
					expect(activity.isUngraded).to.be.false;
				})
			);

			activity.linkToNewGrade();
		});

		describe('reacts to link to existing grade', () => {
			let gradeCandidate;

			beforeEach(async() => {
				const gradeEntityMock = {
					name: () => '',
					baseWeight: () => '',
					maxPoints: () => 50
				};
				GradeEntity.mockImplementation(() => gradeEntityMock);

				const gradeCandidateEntityMock = {
					isCategory: () => false,
					isCurrentAssociation: () => false,
					href: () => 'http://grade-candidate-href',
					getGradeCandidates: () => [],
					newGradeCandidatesHref: () => undefined,
					isNewGradeCandidate: () => false
				};

				gradeCandidate = new GradeCandidate(gradeCandidateEntityMock, 'token');
				await gradeCandidate.fetch();

				const gradeCandidateCollectionEntityMock = {
					href: () => 'http://grade-candidate-collection-href',
					getGradeCandidates: () => [gradeCandidate],
					selected: () => gradeCandidate,
					getAssociateNewGradeAction: () => {}
				};
				GradeCandidateCollectionEntity.mockImplementation(() => gradeCandidateCollectionEntityMock);
				GradeCandidateEntity.mockImplementation(() => gradeCandidateEntityMock);
				fetchEntity.mockImplementation(() => Promise.resolve({}));
			});

			it('sets scoreOutOf when scoreOutOf is empty', async(done) => {
				defaultEntityMock.scoreOutOf = () => '';
				const activity = new ActivityScoreGrade('token');
				await activity.fetch(defaultEntityMock);
				await activity.fetchGradeCandidates();

				when(
					() => activity.scoreOutOf === '50',
					done
				);

				activity.linkToExistingGrade();
			});

			it('links and sets scoreOutOf when coming from ungraded with create new and link selected', async(done) => {

				const activity = new ActivityScoreGrade('token');
				activity.linkToNewGrade();
				activity.setUngraded();

				await activity.fetchGradeCandidates();

				when(
					() => !activity.createNewGrade,
					catchErrors(done, () => {
						expect(activity.inGrades).to.be.true;
						expect(activity.isUngraded).to.be.false;
						expect(activity.scoreOutOf).to.equal('50');
					})
				);

				activity.linkToExistingGrade();
			});

			it('links and sets scoreOutOf', async(done) => {
				const activity = new ActivityScoreGrade('token');
				await activity.fetch(defaultEntityMock);

				await activity.fetchGradeCandidates();

				when(
					() => activity.scoreOutOf === '50',
					catchErrors(done, () => {
						expect(activity.createNewGrade).to.be.false;
						expect(activity.inGrades).to.be.true;
						expect(activity.isUngraded).to.be.false;
					})
				);

				activity.linkToExistingGrade();
			});
		});
	});

	describe('validating', () => {
		it('validates empty score when graded', async() => {
			defaultEntityMock.scoreOutOf = () => '';
			defaultEntityMock.inGrades = () => false;

			const activity = new ActivityScoreGrade('token');
			await activity.fetch(defaultEntityMock);
			activity.setGraded();

			expect(activity.validate()).to.be.false;
			expect(activity.scoreOutOfError).to.equal('emptyScoreOutOfError');
		});

		it('validates invalid score', async() => {
			const activity = new ActivityScoreGrade('token');
			await activity.fetch(defaultEntityMock);
			activity.setScoreOutOf('abc');
			expect(activity.scoreOutOfError).to.equal('invalidScoreOutOfError');
		});

		it('resets empty score error when remove from grades', async() => {
			const activity = new ActivityScoreGrade('token');
			await activity.fetch(defaultEntityMock);
			activity.setScoreOutOf('');
			expect(activity.scoreOutOfError).to.equal('emptyScoreOutOfError');

			activity.removeFromGrades();
			expect(activity.scoreOutOfError).to.be.null;
		});

		it('does not reset invalid score error when remove from grades', async() => {
			const activity = new ActivityScoreGrade('token');
			await activity.fetch(defaultEntityMock);
			activity.setScoreOutOf('abc');
			expect(activity.scoreOutOfError).to.equal('invalidScoreOutOfError');

			activity.removeFromGrades();
			expect(activity.scoreOutOfError).to.equal('invalidScoreOutOfError');
		});

		it('resets score and invalid error when set ungraded', async() => {
			const activity = new ActivityScoreGrade('token');
			await activity.fetch(defaultEntityMock);
			activity.setScoreOutOf('abc');
			expect(activity.scoreOutOfError).to.equal('invalidScoreOutOfError');

			activity.setUngraded();

			expect(activity.scoreOutOf).to.equal('');
			expect(activity.scoreOutOfError).to.be.null;
		});

		it('resets score and empty error when set ungraded', async() => {
			const activity = new ActivityScoreGrade('token');
			await activity.fetch(defaultEntityMock);
			activity.setScoreOutOf('');
			expect(activity.scoreOutOfError).to.equal('emptyScoreOutOfError');

			activity.setUngraded();

			expect(activity.scoreOutOf).to.equal('');
			expect(activity.scoreOutOfError).to.be.null;
		});

		it('reacts to score error', async(done) => {
			const activity = new ActivityScoreGrade('token');
			await activity.fetch(defaultEntityMock);
			when(
				() => !activity.scoreOutOfError,
				done
			);

			activity.setScoreOutOf('abc');
		});
	});
});
