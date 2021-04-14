import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { QuizAttemptsEntity } from 'siren-sdk/src/activities/quizzes/attempts/QuizAttemptsEntity.js';

configureMobx({ enforceActions: 'observed' });

export class QuizAttempts {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.saving = null;
	}

	async fetch(bypassCache) {
		const sirenEntity = await fetchEntity(this.href, this.token, bypassCache);

		if (sirenEntity) {
			const entity = new QuizAttemptsEntity(sirenEntity, this.token, {
				remove: () => { },
			});
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.canUpdateAttemptsAllowed = entity.canUpdateAttemptsAllowed();
		this.attemptsAllowed = entity.attemptsAllowed();
		this.attemptsAllowedOptions = entity.attemptsAllowedOptions();
		this.canUpdateOverallGradeCalculation = entity.canUpdateOverallGradeCalculation();
		this.overallGradeCalculationType = entity.overallGradeCalculationType();
		this.overallGradeCalculationOptions = entity.overallGradeCalculationOptions();
		this.canUpdateRetakeIncorrectOnly = entity.canUpdateRetakeIncorrectOnly();
		this.isRetakeIncorrectOnly = entity.isRetakeIncorrectOnly();
		this.attemptConditions = entity.attemptConditions();
	}

	setAttemptCondition(data) {
		if (!data || data.attempt < 2) {
			return;
		}
		const attemptCondition = this.attemptConditions.find((ac) => ac.properties.attempt === data.attempt);
		const attempt = data.attempt;
		let min = null, max = null;
		// update min or max with new value: `undefined`(deleting) or values: [0, 100]
		if ('min' in data) min = data.min;
		if ('max' in data) max = data.max;
		// set original value for the min or max that is still null to be sent in the request
		if (min === null || max === null) {
			if (attemptCondition && min === null && attemptCondition.properties.min !== undefined) {
				min = attemptCondition.properties.min;
			}
			if (attemptCondition && max === null && attemptCondition.properties.max !== undefined) {
				max = attemptCondition.properties.max;
			}
		}

		const updatedAttemptCondition = { properties: { attempt, min, max } };
		const attemptConditions = this.attemptConditions.map((ac) => {
			if (ac.properties.attempt === data.attempt) return updatedAttemptCondition;
			else return ac;
		});
		this.updateAttemptConditions(attemptConditions);
		this.updateProperty(() => this._entity.setAttemptCondition({ attempt, min, max }));
	}

	setAttemptsAllowed(data) {
		this.attemptsAllowed = data;
		this.updateProperty(() => this._entity.setAttemptsAllowed(data));
	}

	setOverallGradeCalculationType(data) {
		this.overallGradeCalculationType = data;
		this.updateProperty(() => this._entity.setOverallGradeCalculationType(data));
	}

	setRetakeIncorrectOnly(data) {
		this.isRetakeIncorrectOnly = data;
		this.updateProperty(() => this._entity.setRetakeIncorrectOnly(data));
	}

	updateAttemptConditions(attemptConditions) {
		this.attemptConditions = attemptConditions;
	}

	async updateProperty(updateFunc) {
		this.saving = updateFunc();
		const entity = await this.saving;
		this.saving = null;
		// The siren-sdk function called to perform an action first checks that the entity has permission to do so.
		// If the entity lacks permission, the function returns `undefined`, otherwise it returns a reconstructed siren-sdk attempts entity.
		// If `undefined` is returned, it likely means the UI is out of sync with the entity state, and disallowed actions can be performed.
		// In this case, we should attempt to reload the MobX object, so that the UI state is in sync again.
		if (!entity) {
			this.fetch();
			return;
		}
		this._entity = entity;
	}
}

decorate(QuizAttempts, {
	// props
	canUpdateAttemptsAllowed: observable,
	attemptsAllowed: observable,
	attemptsAllowedOptions: observable,
	canUpdateOverallGradeCalculation: observable,
	overallGradeCalculationType: observable,
	overallGradeCalculationOptions: observable,
	canUpdateRetakeIncorrectOnly: observable,
	isRetakeIncorrectOnly: observable,
	canUpdateAttemptConditions: observable,
	attemptConditions: observable,

	// actions
	load: action,
	setAttemptsAllowed: action,
	setOverallGradeCalculationType: action,
	setRetakeIncorrectOnly: action,
	setAttemptCondtion: action,
	updateAttemptConditions: action
});
