import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { QuizTimingEntity } from 'siren-sdk/src/activities/quizzes/timing/QuizTimingEntity.js';

configureMobx({ enforceActions: 'observed' });

export class QuizTiming {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.saving = null;
	}

	async fetch(bypassCache) {
		const sirenEntity = await fetchEntity(this.href, this.token, bypassCache);

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
		this.canEditTimeLimit = entity.canEditTimeLimit();
		this.canEditGracePeriod = entity.canEditGracePeriod();
		this.canEditExtendedDeadline = entity.canEditExtendedDeadline();
		this.canEditExceededTimeLimitBehaviour = entity.canEditExceededTimeLimitBehaviour();
		this.canEditShowClock = entity.canEditShowClock();
		this.extendedDeadline = entity.getExtendedDeadline();
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
		this.timingType = entity.timingType();
		this.submissionLateTypeIdTitle = entity.getSubmissionLateTypeIdTitle();
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
		this.saving = updateFunc();
		const entity = await this.saving;
		this.saving = null;
		// The siren-sdk function called to perform an action first checks that the entity has permission to do so.
		// If the entity lacks permission, the function returns `undefined`, otherwise it returns a reconstructed siren-sdk timing entity.
		// If `undefined` is returned, it likely means the UI is out of sync with the entity state, and disallowed actions can be performed.
		// In this case, we should attempt to reload the MobX object, so that the UI state is in sync again.
		if (!entity) {
			this.fetch();
			return;
		}
		this._entity = entity;
	}
}

decorate(QuizTiming, {
	// props
	canEditTiming: observable,
	canEditTimeLimit: observable,
	canEditGracePeriod: observable,
	canEditExtendedDeadline: observable,
	canEditExceededTimeLimitBehaviour: observable,
	canEditShowClock: observable,
	extendedDeadline: observable,
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
	submissionLateTypeIdTitle: observable,
	timingType: observable,
	saving: observable,
	// actions
	load: action,
	setTimingType: action,
	setExceededTimeLimitBehaviour: action,
	setGracePeriod: action,
	setShowClock: action,
	setTimeLimit: action,
	setExtendedDeadline: action
});
