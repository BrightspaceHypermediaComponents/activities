import { ActivitySpecialAccess} from '../../../components/d2l-activity-editor/state/activity-special-access.js';
import { ActivitySpecialAccessEntity } from 'siren-sdk/src/activities/ActivitySpecialAccessEntity.js';
import { expect } from 'chai';
import { fetchEntity } from '../../../components/d2l-activity-editor/state/fetch-entity.js';
import sinon from 'sinon';
import { when } from 'mobx';

jest.mock('siren-sdk/src/activities/ActivitySpecialAccessEntity.js');
jest.mock('../../../components/d2l-activity-editor/state/fetch-entity.js');

describe('Activity Special Access', function() {

	function defaultEntityMock() {
		return {
			isRestricted: () => false,
			userCount: () => 1,
			url: () => 'http://special-access-dialog-href'
		};
	}

	afterEach(() => {
		sinon.restore();
		ActivitySpecialAccessEntity.mockClear();
		fetchEntity.mockClear();
	});

	let sirenEntity;

	describe('fetching', () => {
		beforeEach(() => {
			sirenEntity = sinon.stub();

			ActivitySpecialAccessEntity.mockImplementation(() => {
				return defaultEntityMock();
			});

			fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
		});

		it('fetches', async() => {
			const activitySpecialAccess = new ActivitySpecialAccess('http://1', 'token');
			await activitySpecialAccess.fetch();

			expect(activitySpecialAccess.isRestricted).to.be.false;
			expect(activitySpecialAccess.userCount).to.equal(1);
			expect(activitySpecialAccess.url).to.equal('http://special-access-dialog-href');
		});
	});

	describe('updating', () => {
		beforeEach(() => {
			sirenEntity = sinon.stub();

			ActivitySpecialAccessEntity.mockImplementation(() => {
				return defaultEntityMock();
			});

			fetchEntity.mockImplementation(() => Promise.resolve(sirenEntity));
		});

		it('set isRestricted', async(done) => {
			const activitySpecialAccess = new ActivitySpecialAccess('http://1', 'token');
			await activitySpecialAccess.fetch();

			when(
				() => activitySpecialAccess.isRestricted,
				() => {
					done();
				}
			);

			activitySpecialAccess.setIsRestricted(true);
		});

		it('set userCount', async(done) => {
			const activitySpecialAccess = new ActivitySpecialAccess('http://1', 'token');
			await activitySpecialAccess.fetch();

			when(
				() => activitySpecialAccess.userCount === 99,
				() => {
					done();
				}
			);

			activitySpecialAccess.setUserCount(99);
		});
	});
});
