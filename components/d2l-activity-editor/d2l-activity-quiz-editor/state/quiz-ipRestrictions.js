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

	deleteIpRestriction(index) {
		if (this.ipRestrictions.length === 1) {
			return;
		}

		const restriction = this.ipRestrictions.splice(index, 1);
		const isNew = restriction && restriction[0].id === undefined;

		if (!isNew) {
			this._entity.deleteIpRestriction(index);
		}
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

		const promises = this._createPromises(restrictionsToSave);

		const errors = [];
		const results = await Promise.allSettled(promises);

		results.forEach(res => {
			if (res.status === 'rejected') {
				errors.push(...res.reason.json.properties.errors);
			}
		});

		if (errors) {
			//TODO: handle errors
		}
	}

	setIpRestriction(index, key, val) {
		const currentVal = this.ipRestrictions[index];
		this.ipRestrictions[index] = { ...currentVal, [key]: val };
	}

	updateIpRestriction(restriction) {
		this._entity.updateIpRestriction(restriction);
	}

	_createPromises(restrictions) {
		return restrictions.map(restriction => {
			const isNew = restriction.id === undefined;
			if (isNew) {
				return this._entity.addIpRestriction(restriction);
			}

			return this._entity.updateIpRestriction(restriction);
		});
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
				restrictionsToUpdate.push(restriction);
			}
		}

		return restrictionsToUpdate;
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
