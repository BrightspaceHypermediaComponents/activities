import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import { GradeCandidate } from '../../../../components/d2l-activity-editor/d2l-activity-grades/state/grade-candidate.js';
import { GradeCandidateEntity } from 'siren-sdk/src/activities/GradeCandidateEntity.js';
import { GradeCategoryEntity } from 'siren-sdk/src/activities/associateGrade/GradeCategoryEntity.js';
import { GradeEntity } from 'siren-sdk/src/activities/GradeEntity.js';
import sinon from 'sinon';

jest.mock('siren-sdk/src/activities/GradeEntity.js');
jest.mock('siren-sdk/src/activities/GradeCandidateEntity.js');
jest.mock('siren-sdk/src/activities/associateGrade/GradeCategoryEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Grade Candidate', function() {
	afterEach(() => {
		sinon.restore();
		GradeEntity.mockClear();
		GradeCandidateEntity.mockClear();
		GradeCategoryEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	describe('grade', () => {
		let gradeCandidateEntityMock;

		beforeEach(() => {
			sirenEntity = sinon.stub();

			gradeCandidateEntityMock = {
				isCategory: () => false,
				isCurrentAssociation: () => false,
				href: () => 'http://grade-candidate-href-grade',
				getGradeCandidates: () => [],
				newGradeCandidatesHref: () => undefined,
				isNewGradeCandidate: () => false
			};

			const gradeEntityMock = {
				name: () => 'Grade 1',
				baseWeight: () => '',
				maxPoints: () => 50
			};

			GradeEntity.mockImplementation(() => {
				return gradeEntityMock;
			});

			fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
		});

		describe('fetching', () => {
			it('fetches', async() => {
				const gc = new GradeCandidate(gradeCandidateEntityMock, 'token');
				await gc.fetch();

				expect(gc.name).to.equal('Grade 1');
				expect(gc.isCategory).to.be.false;
				expect(gc.isCurrentAssociation).to.be.false;
				expect(gc.baseWeight).to.be.empty;
				expect(gc.maxPoints).to.equal(50);
				expect(gc.gradeCandidates).to.be.empty;

				expect(fetchEntity.mock.calls.length).to.equal(1);
				expect(GradeEntity.mock.calls[0][0]).to.equal(sirenEntity);
				expect(GradeEntity.mock.calls[0][1]).to.equal('token');
			});
		});
	});

	describe('category', () => {
		let gradeCandidateEntityMock;

		beforeEach(() => {
			sirenEntity = sinon.stub();

			gradeCandidateEntityMock = {
				isCategory: () => true,
				isCurrentAssociation: () => false,
				href: () => 'http://grade-candidate-href-category',
				getGradeCandidates: () => [
					{ 'testgrade' : 1 }
				],
				newGradeCandidatesHref: () => undefined,
				isNewGradeCandidate: () => false
			};

			const gradeCategoryEntityMock = {
				name: () => 'Grade Category 1'
			};

			GradeCategoryEntity.mockImplementation(() => {
				return gradeCategoryEntityMock;
			});

			const childGradeCandidateEntityMock = {
				isCategory: () => false,
				isCurrentAssociation: () => false,
				href: () => 'http://grade-candidate-href-grade',
				getGradeCandidates: () => [],
				newGradeCandidatesHref: () => undefined,
				isNewGradeCandidate: () => false
			};

			GradeCandidateEntity.mockImplementation(() => {
				return childGradeCandidateEntityMock;
			});

			fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
		});

		describe('fetching', () => {
			it('fetches', async() => {
				const gc = new GradeCandidate(gradeCandidateEntityMock, 'token');
				await gc.fetch();

				expect(gc.name).to.equal('Grade Category 1');
				expect(gc.isCategory).to.be.true;
				expect(gc.isCurrentAssociation).to.be.false;
				expect(gc.baseWeight).to.be.undefined;
				expect(gc.maxPoints).to.be.undefined;
				expect(gc.gradeCandidates).to.have.lengthOf(1);

				expect(fetchEntity.mock.calls.length).to.equal(2);
				expect(fetchEntity.mock.calls[0][0]).to.equal('http://grade-candidate-href-category');
				expect(fetchEntity.mock.calls[1][0]).to.equal('http://grade-candidate-href-grade');

				expect(GradeCategoryEntity.mock.calls[0][0]).to.equal(sirenEntity);
				expect(GradeCategoryEntity.mock.calls[0][1]).to.equal('token');

				expect(GradeCandidateEntity.mock.calls.length).to.equal(1);
			});
		});
	});

	describe('new grade', () => {
		let newGradeCandidateEntityMock1, newGradeCandidateEntityMock2;

		beforeEach(() => {
			sirenEntity = sinon.stub();

			newGradeCandidateEntityMock1 = {
				isCategory: () => false,
				isCurrentAssociation: () => false,
				href: () => 'http://new-grade-candidate-category-href',
				getGradeCandidates: () => [],
				newGradeCandidatesHref: () => 'http://new-grade-candidates-href',
				isNewGradeCandidate: () => true
			};

			const gradeCategoryEntityMock = {
				name: () => 'Grade Candidate Category 1'
			};

			GradeCategoryEntity.mockImplementation(() => {
				return gradeCategoryEntityMock;
			});

			newGradeCandidateEntityMock2 = {
				isCategory: () => false,
				isCurrentAssociation: () => false,
				href: () => undefined,
				getGradeCandidates: () => [],
				newGradeCandidatesHref: () => 'http://new-grade-candidates-href',
				isNewGradeCandidate: () => true
			};

			fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
		});

		describe('fetching', () => {
			it('fetches with category', async() => {
				const gc = new GradeCandidate(newGradeCandidateEntityMock1, 'token');
				await gc.fetch();

				expect(gc.name).to.equal('Grade Candidate Category 1');
				expect(gc.isCategory).to.be.false;
				expect(gc.isCurrentAssociation).to.be.false;
				expect(gc.baseWeight).to.be.undefined;
				expect(gc.maxPoints).to.be.undefined;
				expect(gc.gradeCandidates).to.be.empty;

				expect(fetchEntity.mock.calls.length).to.equal(1);
				expect(GradeCategoryEntity.mock.calls[0][0]).to.equal(sirenEntity);
			});

			it('skips fetch without category', async() => {
				const gc = new GradeCandidate(newGradeCandidateEntityMock2, 'token');
				await gc.fetch();

				expect(gc.isCategory).to.be.false;
				expect(gc.isCurrentAssociation).to.be.false;
				expect(gc.gradeCandidates).to.be.empty;
				expect(gc.name).to.be.undefined;
				expect(gc.baseWeight).to.be.undefined;
				expect(gc.maxPoints).to.be.undefined;

				expect(fetchEntity.mock.calls.length).to.equal(0);
			});
		});
	});
});
