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
		this.errors = [];
	}

	addRestriction() {
		this.ipRestrictions.push({ start: '', end: '' });
	}

	deleteIpRestriction(index) {
		if (index === undefined) {
			return;
		}

		const restriction = this.ipRestrictions.splice(index, 1)[0];
		if (!restriction) {
			return;
		}

		const isNew = restriction && restriction.id === undefined;

		if (this.ipRestrictions.length === 0) {
			this.ipRestrictions.push({ start: '', end: '' });
		}

		if (!isNew) {
			this._entity.deleteIpRestriction(restriction.id);
		}
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

		if (errors && errors.length) {
			this.setErrors(errors);

			return;
		}

		await this.fetch();
	}

	setErrors(errors) {
		this.errors = errors;
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
		const expectedRestrictions = this._entity.getIpRestrictions();

		for (const restriction of this.ipRestrictions) {

			const { start, end, id } = restriction || {};

			if (!start) {
				continue;
			}

			const expectedRestriction = expectedRestrictions.find(restriction => restriction.id === id);

			if (!expectedRestriction) {
				restrictionsToUpdate.push(restriction);
				continue;
			}

			if (start !== expectedRestriction.start || end !== expectedRestriction.end) {
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
	errors: observable,
	// actions
	load: action,
	setErrors: action,
	addRestriction: action,
	setIpRestriction: action,
	addIpRestriction: action,
	deleteIpRestriction: action
});
