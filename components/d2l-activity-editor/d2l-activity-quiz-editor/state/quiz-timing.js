import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { QuizTimingEntity } from 'siren-sdk/src/activities/quizzes/timing/QuizTimingEntity.js';

configureMobx({ enforceActions: 'observed' });

export class QuizTiming {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this._saving = null;
	}

	get dirty() {
		return !this._entity.equals(this._makeQuizData());
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);

		if (sirenEntity) {
			const entity = new QuizTimingEntity(sirenEntity, this.token, {
				remove: () => { },
			});
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.canEditTiming = entity.canEditTiming();
		this.isTimingEnforced = entity.isTimingEnforced();
		this.timingTypes = entity.timingTypes();
		this.submissionLateType = entity.submissionLateType();
		this.enforcedTimeLimit = entity.enforcedTimeLimit();
		this.enforcedGraceLimit = entity.enforcedGraceLimit();
		this.extendedDeadlineOptions = entity.extendedDeadlineOptions();
		this.isAutomaticZero = entity.isAutomaticZero();
		this.showClock = entity.showClock();
		this.recommendedTimeLimit = entity.recommendedTimeLimit();
		this.minRecommendedTimeLimit = entity.minRecommendedTimeLimit();
		this.maxRecommendedTimeLimit = entity.maxRecommendedTimeLimit();
		this.minEnforcedTimeLimit = entity.minEnforcedTimeLimit();
		this.maxEnforcedTimeLimit = entity.maxEnforcedTimeLimit();
		this.minEnforcedGraceLimit = entity.minEnforcedGraceLimit();
		this.maxEnforcedGraceLimit = entity.maxEnforcedGraceLimit();
	}

	setExceededTimeLimitBehaviour(data) {
		this.isAutomaticZero = this._entity.isAutomaticZero(data);
		this.updateProperty(() => this._entity.setExceededTimeLimitBehaviour(data));

	}

	setExtendedDeadline(data) {
		this.updateProperty(() => this._entity.setExtendedDeadline(data));
	}

	setGracePeriod(data) {
		this.updateProperty(() => this._entity.setGracePeriod(data));
	}

	setShowClock(data) {
		this.updateProperty(() => this._entity.setShowClock(data));
	}

	setTimeLimit(data) {
		this.updateProperty(() => this._entity.setTimeLimit(data));
	}

	setTimingType(data) {
		this.isTimingEnforced = this._entity.isTimingEnforced(data);
		this.updateProperty(() => this._entity.setTimingType(data));
	}

	async updateProperty(updateFunc) {
		const entity = await updateFunc();
		// The siren-sdk function called to perform an action first checks that the entity has permission to do so.
		// If the entity lacks permission, the function returns `undefined`, otherwise it returns a reconstructed siren-sdk timing entity.
		// If `undefined` is returned, it likely means the UI is out of sync with the entity state, and disallowed actions can be performed.
		// In this case, we should attempt to reload the MobX object, so that the UI state is in sync again.
		if (!entity) {
			this.fetch();
		}
		this._entity = entity;
	}

	_makeQuizData() {
		/* NOTE: if you add fields here, please make sure you update the corresponding equals method in siren-sdk.
					 The cancel workflow is making use of that to detect changes.
		*/
		const data = {};

		return data;
	}
}

decorate(QuizTiming, {
	// props
	name: observable,
	canEditTiming: observable,
	isTimingEnforced: observable,
	timingTypes: observable,
	submissionLateType: observable,
	enforcedTimeLimit: observable,
	enforcedGraceLimit: observable,
	extendedDeadlineOptions: observable,
	isAutomaticZero: observable,
	showClock: observable,
	recommendedTimeLimit: observable,
	minRecommendedTimeLimit: observable,
	maxRecommendedTimeLimit: observable,
	minEnforcedTimeLimit: observable,
	maxEnforcedTimeLimit: observable,
	minEnforcedGraceLimit: observable,
	maxEnforcedGraceLimit: observable,
	// actions
	load: action,
	setTimingType: action,
	setExceededTimeLimitBehaviour: action,
	setGracePeriod: action,
	setShowClock: action,
	setTimeLimit: action,
	setExtendedDeadline: action
});
