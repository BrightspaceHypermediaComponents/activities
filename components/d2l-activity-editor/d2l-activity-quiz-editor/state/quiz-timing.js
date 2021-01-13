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
		this.showClock = entity.showClock();
		this.showClockTitle = entity.showClockTitle();
		this.recommendedTimeLimit = entity.recommendedTimeLimit();
	}

	setTimingType(data) {
		this._entity.setTimingType(data);
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
	showClock: observable,
	showClockTitle: observable,
	recommendedTimeLimit: observable,
	// actions
	load: action,
	setTimingType: action
});
