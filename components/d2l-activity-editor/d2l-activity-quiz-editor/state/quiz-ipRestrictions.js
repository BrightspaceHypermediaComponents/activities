import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { QuizIpRestrictionsEntity } from 'siren-sdk/src/activities/quizzes/ipRestrictions/QuizIpRestrictionsEntity.js';

configureMobx({ enforceActions: 'observed' });

export class QuizIpRestrictions {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this._saving = null;
		this.ipRestrictions = [];
	}

	addRestriction() {
		this.ipRestrictions.push({ start: '', end: '' });
	}

	deleteIpRestriction(start, end) {
		this._entity.deleteIpRestriction(start, end);
	}

	get dirty() {
		return !this._entity.equals(this._makeQuizData());
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);

		if (sirenEntity) {
			const entity = new QuizIpRestrictionsEntity(sirenEntity, this.token, {
				remove: () => { },
			});
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.canEditIpRestrictions = entity.canEditIpRestrictions();
		this.ipRestrictions = entity.getIpRestrictions();
	}

	async saveRestrictions() {
		const restrictionsToSave = this._filterOldRestrictions();

		if (!restrictionsToSave) {
			return;
		}

		const promises = restrictionsToSave.map(restriction => {
			this._entity.addIpRestriction(restriction);
		});

		await Promise.all(promises);
	}

	setIpRestriction(index, key, val) {
		const currentVal = this.ipRestrictions[index];
		this.ipRestrictions[index] = { ...currentVal, [key]: val };
	}

	_filterOldRestrictions() {
		const restrictionsToUpdate = [];
		const oldRestrictions = this._entity.getIpRestrictions();

		for (const [index, restriction] of this.ipRestrictions.entries()) {

			const { start, end } = restriction || {};
			const { start: oldStart, end: oldEnd } = oldRestrictions[index] || {};

			if (!start || !end) {
				continue;
			}

			if (start !== oldStart || end !== oldEnd) {
				restrictionsToUpdate.push({ ...restriction, oldStart, oldEnd });
			}
		}

		return restrictionsToUpdate;
	}

	_makeQuizData() {
		/* NOTE: if you add fields here, please make sure you update the corresponding equals method in siren-sdk.
					 The cancel workflow is making use of that to detect changes.
		*/
		const data = {};

		return data;
	}
}

decorate(QuizIpRestrictions, {
	// props
	canEditIpRestrictions: observable,
	ipRestrictions: observable,
	// actions
	load: action,
	addRestriction: action,
	setIpRestriction: action,
	addIpRestriction: action,
	deleteIpRestriction: action
});
