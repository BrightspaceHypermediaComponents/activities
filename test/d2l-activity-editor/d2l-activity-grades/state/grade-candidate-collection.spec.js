import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import { GradeCandidateCollection } from '../../../../components/d2l-activity-editor/d2l-activity-grades/state/grade-candidate-collection.js';
import { GradeCandidateCollectionEntity } from 'siren-sdk/src/activities/GradeCandidateCollectionEntity.js';
import { GradeCandidateEntity } from 'siren-sdk/src/activities/GradeCandidateEntity.js';
import sinon from 'sinon';

jest.mock('siren-sdk/src/activities/GradeCandidateCollectionEntity.js');
jest.mock('siren-sdk/src/activities/GradeCandidateEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Grade Candidate Collection', function() {
	afterEach(() => {
		sinon.restore();
		GradeCandidateCollectionEntity.mockClear();
		GradeCandidateEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	beforeEach(() => {
		sirenEntity = sinon.stub();

		const gradeCandidateCollectionEntityMock = {
			getGradeCandidates: () => [
				{ 'test': 1 },
				{ 'test': 2 }
			],
			getAssociateNewGradeAction: () => {}
		};

		GradeCandidateCollectionEntity.mockImplementation(() => {
			return gradeCandidateCollectionEntityMock;
		});

		fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
	});

	describe('fetching', () => {
		it('fetches (and correctly sets currently associated grade as selected)', async() => {
			const gradeCandidateEntityMock1 = {
				isCategory: () => false,
				isCurrentAssociation: () => false,
				href: () => 'http://grade-candidate-href-grade/1',
				getGradeCandidates: () => [],
				newGradeCandidatesHref: () => undefined,
				isNewGradeCandidate: () => false
			};

			const gradeCandidateEntityMock2 = {
				isCategory: () => false,
				isCurrentAssociation: () => true,
				href: () => 'http://grade-candidate-href-grade/2',
				getGradeCandidates: () => [],
				newGradeCandidatesHref: () => undefined,
				isNewGradeCandidate: () => false
			};

			GradeCandidateEntity
				.mockImplementationOnce(() => gradeCandidateEntityMock1)
				.mockImplementationOnce(() => gradeCandidateEntityMock2);

			const gc = new GradeCandidateCollection('http://1', 'token');
			await gc.fetch();

			expect(gc.gradeCandidates).to.have.lengthOf(2);
			expect(gc.selected.href).to.equal('http://grade-candidate-href-grade/2');

			expect(fetchEntity.mock.calls.length).to.equal(3);
			expect(fetchEntity.mock.calls[0][0]).to.equal('http://1');
			expect(fetchEntity.mock.calls[1][0]).to.equal('http://grade-candidate-href-grade/1');
			expect(fetchEntity.mock.calls[2][0]).to.equal('http://grade-candidate-href-grade/2');

			expect(GradeCandidateCollectionEntity.mock.calls[0][0]).to.equal(sirenEntity);
			expect(GradeCandidateCollectionEntity.mock.calls[0][1]).to.equal('token');

			expect(GradeCandidateEntity.mock.calls.length).to.equal(2);
		});

		it('fetches (and correctly sets first candidate as selected as there is no grade currently associated)', async() => {
			const gradeCandidateEntityMock1 = {
				isCategory: () => false,
				isCurrentAssociation: () => false,
				href: () => 'http://grade-candidate-href-grade/1',
				getGradeCandidates: () => [],
				newGradeCandidatesHref: () => undefined,
				isNewGradeCandidate: () => false
			};

			const gradeCandidateEntityMock2 = {
				isCategory: () => false,
				isCurrentAssociation: () => false,
				href: () => 'http://grade-candidate-href-grade/2',
				getGradeCandidates: () => [],
				newGradeCandidatesHref: () => undefined,
				isNewGradeCandidate: () => false
			};

			GradeCandidateEntity
				.mockImplementationOnce(() => gradeCandidateEntityMock1)
				.mockImplementationOnce(() => gradeCandidateEntityMock2);

			const gc = new GradeCandidateCollection('http://1', 'token');
			await gc.fetch();

			expect(gc.gradeCandidates).to.have.lengthOf(2);
			expect(gc.selected.href).to.equal('http://grade-candidate-href-grade/1');

			expect(fetchEntity.mock.calls.length).to.equal(3);
			expect(fetchEntity.mock.calls[0][0]).to.equal('http://1');
			expect(fetchEntity.mock.calls[1][0]).to.equal('http://grade-candidate-href-grade/1');
			expect(fetchEntity.mock.calls[2][0]).to.equal('http://grade-candidate-href-grade/2');

			expect(GradeCandidateCollectionEntity.mock.calls[0][0]).to.equal(sirenEntity);
			expect(GradeCandidateCollectionEntity.mock.calls[0][1]).to.equal('token');

			expect(GradeCandidateEntity.mock.calls.length).to.equal(2);
		});
	});
});

describe('New Grade Candidate Collection', function() {
	afterEach(() => {
		sinon.restore();
		GradeCandidateCollectionEntity.mockClear();
		GradeCandidateEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	beforeEach(() => {
		sirenEntity = sinon.stub();

		const gradeCandidateCollectionEntityMock = {
			getGradeCandidates: () => [
				{ 'test': 1 },
				{ 'test': 2 }
			],
			getAssociateNewGradeAction: () => {}
		};

		GradeCandidateCollectionEntity.mockImplementation(() => {
			return gradeCandidateCollectionEntityMock;
		});

		fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
	});

	describe('fetching', () => {
		it('fetches (and correctly sets default grade-without-category as selected)', async() => {
			const gradeCandidateEntityMock1 = {
				isCategory: () => false,
				isCurrentAssociation: () => false,
				href: () => undefined,
				getGradeCandidates: () => [],
				newGradeCandidatesHref: () => 'http://new-grade-candidates-href',
				isNewGradeCandidate: () => true
			};

			const gradeCandidateEntityMock2 = {
				isCategory: () => false,
				isCurrentAssociation: () => false,
				href: () => 'http://grade-candidate-category-href/1',
				getGradeCandidates: () => [],
				newGradeCandidatesHref: () => 'http://new-grade-candidates-href',
				isNewGradeCandidate: () => false
			};

			GradeCandidateEntity
				.mockImplementationOnce(() => gradeCandidateEntityMock1)
				.mockImplementationOnce(() => gradeCandidateEntityMock2);

			const gc = new GradeCandidateCollection('http://1', 'token');
			await gc.fetch();

			expect(gc.gradeCandidates).to.have.lengthOf(2);
			expect(gc.selected.href).to.be.undefined;

			expect(fetchEntity.mock.calls.length).to.equal(2);
			expect(fetchEntity.mock.calls[0][0]).to.equal('http://1');
			expect(fetchEntity.mock.calls[1][0]).to.equal('http://grade-candidate-category-href/1');

			expect(GradeCandidateCollectionEntity.mock.calls[0][0]).to.equal(sirenEntity);
			expect(GradeCandidateCollectionEntity.mock.calls[0][1]).to.equal('token');

			expect(GradeCandidateEntity.mock.calls.length).to.equal(2);
		});
	});
});
