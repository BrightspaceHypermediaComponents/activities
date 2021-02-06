import { expect } from 'chai';
import { fetchEntity } from '../../../../components/d2l-activity-editor/state/fetch-entity.js';
import { QuizIpRestrictions } from '../../../../components/d2l-activity-editor/d2l-activity-quiz-editor/state/quiz-ipRestrictions.js';
import { QuizIpRestrictionsEntity } from 'siren-sdk/src/activities/quizzes/ipRestrictions/QuizIpRestrictionsEntity.js';
import sinon from 'sinon';

jest.mock('siren-sdk/src/activities/quizzes/ipRestrictions/QuizIpRestrictionsEntity.js');
jest.mock('../../../../components/d2l-activity-editor/state/fetch-entity.js');

const mockRestriction = { start: '1.1.1.1', end: '2.2.2.2', id: 0 };

describe('Activity IP Restrictions', function() {

	function defaultEntityMock() {
		return {
			canEditIpRestrictions: () => true,
			getIpRestrictions: () => [ mockRestriction ]
		};
	}

	function readOnlyEntityMock() {
		return {
			canEditIpRestrictions: () => false,
			getIpRestrictions: () => [ mockRestriction ]
		};
	}

	afterEach(() => {
		sinon.restore();
		QuizIpRestrictionsEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	describe('ipRestrictions', () => {
		beforeEach(() => {
			sirenEntity = sinon.stub();

			QuizIpRestrictionsEntity.mockImplementation(() => {
				return defaultEntityMock();
			});

			fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
		});

		it('fetches', async() => {
			const activityIpRestrictions = new QuizIpRestrictions('http://1', 'token');
			await activityIpRestrictions.fetch();

			expect(activityIpRestrictions.canEditIpRestrictions).to.be.true;
			expect(activityIpRestrictions.ipRestrictions.length).to.equal(1);
		});

		describe('setting restrictions', () => {
			it('updates local state', async() => {
				const activityIpRestrictions = new QuizIpRestrictions('http://1', 'token');
				await activityIpRestrictions.fetch();

				activityIpRestrictions.setIpRestriction(0, 'start', '8.8.8.8');

				expect(activityIpRestrictions.ipRestrictions[0].start).to.equal('8.8.8.8');
			});
		});

		describe('filter old restrictions', () => {
			it('should skip restrictions which have not changed', async() => {
				const activityIpRestrictions = new QuizIpRestrictions('http://1', 'token');
				await activityIpRestrictions.fetch();

				const newEntity = { start: '5.5.5.5', end: '6.6.6.6' };

				activityIpRestrictions.ipRestrictions.push(newEntity);

				const entitiesToUpdate = activityIpRestrictions._filterOldRestrictions();

				expect(entitiesToUpdate.length).to.equal(1);
				expect(entitiesToUpdate[0].start).to.equal(newEntity.start);
				expect(entitiesToUpdate[0].end).to.equal(newEntity.end);
			});
		});
	});

	describe('fetching readonly', () => {
		beforeEach(() => {
			sirenEntity = sinon.stub();

			QuizIpRestrictionsEntity.mockImplementation(() => {
				return readOnlyEntityMock();
			});

			fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
		});

		it('fetches readonly entity', async() => {
			const activityIpRestrictions = new QuizIpRestrictions('http://1', 'token');
			await activityIpRestrictions.fetch();

			expect(activityIpRestrictions.canEditIpRestrictions).to.be.false;
		});
	});
});

