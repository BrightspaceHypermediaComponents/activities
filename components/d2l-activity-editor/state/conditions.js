import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../state/fetch-entity.js';
import { LegacyConditions } from 'siren-sdk/src/activities/conditions/LegacyConditions.js';

configureMobx({ enforceActions: 'observed' });

export class Conditions {

	constructor(href, token) {

		this.href = href;
		this.token = token;

		this._conditions = new Map(); // Id -> { id, text }
		this._conditionsToCreate = new Map(); // Key -> LegacyDTO
		this._conditionsToRemove = new Set(); // Id
	}

	async fetch() {

		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {

			const entity = new LegacyConditions(sirenEntity, this.token);
			this.load(entity);
		}

		return this;
	}

	get canAttachExisting() {

		return this._entity ? this._entity.canAttachExisting() : false;
	}

	get attachExistingDialogUrl() {

		return this._entity ? this._entity.attachExistingDialogUrl() : null;
	}

	get attachExistingOpenButtonText() {

		return this._entity ? this._entity.attachExistingOpenButtonText() : null;
	}

	get attachExistingDialogTitle() {

		return this._entity ? this._entity.attachExistingDialogTitle() : null;
	}

	get attachExistingPositiveButtonText() {

		return this._entity ? this._entity.attachExistingPositiveButtonText() : null;
	}

	get attachExistingNegativeButtonText() {

		return this._entity ? this._entity.attachExistingNegativeButtonText() : null;
	}

	get canCreateNew() {

		return this._entity ? this._entity.canCreateNew() : false;
	}

	get createNewDialogUrl() {

		return this._entity ? this._entity.createNewDialogUrl() : null;
	}

	get createNewOpenButtonText() {

		return this._entity ? this._entity.createNewOpenButtonText() : null;
	}

	get createNewDialogTitle() {

		return this._entity ? this._entity.createNewDialogTitle() : null;
	}

	get createNewPositiveButtonText() {

		return this._entity ? this._entity.createNewPositiveButtonText() : null;
	}

	get createNewNegativeButtonText() {

		return this._entity ? this._entity.createNewNegativeButtonText() : null;
	}

	get conditions() {

		const results = [];

		for (const [key, item] of this._conditions) {

			if (!this._conditionsToRemove.has(key)) {

				results.push({ key: key, title: item.text });
			}
		}

		for (const [key, dto] of this._conditionsToCreate) {

			results.push({ key: key, title: dto.Text });
		}

		return results;
	}

	load(entity) {

		this._entity = entity;
		this._conditions = new Map(entity.conditions().map(x => [x.id, x]));
		this._conditionsToCreate = new Map();
		this._conditionsToRemove = new Set();
	}

	_constructKey(dto) {

		return `${dto.ConditionTypeId},${dto.Id1},${dto.Id2},${dto.Id2},${dto.Percentage1},${dto.Percentage2},${dto.Int1}`;
	}

	add(dto) {

		if (dto === undefined) {
			return;
		}

		if (Array.isArray(dto)) {
			dto.forEach(this.add, this);
			return;
		}

		const isExistingCondition = this._conditions.has(dto.Id);
		if (isExistingCondition) {
			this._conditionsToRemove.delete(dto.Id);
		} else {
			this._conditionsToCreate.set(this._constructKey(dto), dto);
		}
	}

	remove(key) {

		const didRemoveNewCondition = this._conditionsToCreate.delete(key);
		if (didRemoveNewCondition) {
			return;
		}

		const id = parseInt(key, 10);
		if (String(id) === String(key)) {
			this._conditionsToRemove.add(id);
		}
	}

	get canSave() {

		return this._entity ? this._entity.canSave() : false;
	}

	_formatNewCondition(dto) {

		return {
			ConditionType: dto.ConditionTypeId,
			Id1: dto.Id1,
			Id2: dto.Id2,
			Percentage1: dto.Percentage1,
			Percentage2: dto.Percentage2,
			Int1: dto.Int1
		};
	}

	async save() {

		if (!this.canSave) {
			return;
		}

		const newConditions = Array
			.from(this._conditionsToCreate.values())
			.map(this._formatNewCondition, this);
		const removeConditions = Array
			.from(this._conditionsToRemove);

		const shouldSave =
			newConditions.length > 0 ||
			removeConditions.length > 0;
		if (!shouldSave) {
			return;
		}

		await this._entity.save({
			RemoveConditions: removeConditions,
			NewConditions: newConditions
		});
		await this.fetch();
	}
}

decorate(Conditions, {
	// props
	_conditions: observable,
	_conditionsToCreate: observable,
	_conditionsToRemove: observable,
	// actions
	load: action,
	add: action,
	remove: action,
	save: action
});
