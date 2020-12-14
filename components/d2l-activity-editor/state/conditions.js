import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../state/fetch-entity.js';
import { LegacyConditions } from 'siren-sdk/src/activities/conditions/LegacyConditions.js';

configureMobx({ enforceActions: 'observed' });

const DefaultOperator = 'All';

export class Conditions {

	constructor(href, token) {

		this.href = href;
		this.token = token;

		this._operators = [];
		this._operator = DefaultOperator;
		this._conditions = new Map(); // Id -> { id, text }
		this._conditionsToCreate = new Map(); // Key -> LegacyDTO
		this._conditionsToRemove = new Set(); // Id
		this._conditionsToAdd = new Map(); // Id -> text
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
		} else if (dto.Id) {
			this._conditionsToAdd.set(`${dto.Id}`, dto.Text);
		} else {
			this._conditionsToCreate.set(this._constructKey(dto), dto);
		}
	}
	get attachExistingDialogTitle() {

		return this._entity ? this._entity.attachExistingDialogTitle() : null;
	}
	get attachExistingDialogUrl() {

		return this._entity ? this._entity.attachExistingDialogUrl() : null;
	}
	get attachExistingNegativeButtonText() {

		return this._entity ? this._entity.attachExistingNegativeButtonText() : null;
	}
	get attachExistingOpenButtonText() {

		return this._entity ? this._entity.attachExistingOpenButtonText() : null;
	}
	get attachExistingPositiveButtonText() {

		return this._entity ? this._entity.attachExistingPositiveButtonText() : null;
	}
	get canAttachExisting() {

		return this._entity ? this._entity.canAttachExisting() : false;
	}

	get canCreateNew() {

		return this._entity ? this._entity.canCreateNew() : false;
	}
	get canSave() {

		return this._entity ? this._entity.canSave() : false;
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

		for (const [key, text] of this._conditionsToAdd) {

			results.push({ key: key, title: text });
		}

		return results;
	}
	get createNewDialogTitle() {

		return this._entity ? this._entity.createNewDialogTitle() : null;
	}
	get createNewDialogUrl() {

		return this._entity ? this._entity.createNewDialogUrl() : null;
	}
	get createNewNegativeButtonText() {

		return this._entity ? this._entity.createNewNegativeButtonText() : null;
	}
	get createNewOpenButtonText() {

		return this._entity ? this._entity.createNewOpenButtonText() : null;
	}
	get createNewPositiveButtonText() {

		return this._entity ? this._entity.createNewPositiveButtonText() : null;
	}

	get dirty() {

		if (this._conditionsToCreate.size > 0) {
			return true;
		}

		if (this._conditionsToRemove.size > 0) {
			return true;
		}

		if (this._conditionsToAdd.size > 0) {
			return true;
		}

		const operator = this._getSelectedOperator(this._operators);
		if (operator !== this._operator) {
			return true;
		}

		return false;
	}

	async fetch() {

		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {

			const entity = new LegacyConditions(sirenEntity, this.token);
			this.load(entity);
		}

		return this;
	}

	load(entity) {

		this._entity = entity;
		this._operators = entity.operatorOptions();
		this._operator = this._getSelectedOperator(this._operators);
		this._conditions = new Map(entity.conditions().map(x => [x.id, x]));
		this._conditionsToCreate = new Map();
		this._conditionsToRemove = new Set();
		this._conditionsToAdd = new Map();
	}
	get operators() {

		const results = [];

		for (const { value, title } of this._operators) {

			results.push({ value, title, selected: value === this._operator });
		}

		return results;
	}

	remove(key) {

		const didRemoveNewCondition =
			this._conditionsToCreate.delete(key)
				|| this._conditionsToAdd.delete(key);
		if (didRemoveNewCondition) {
			return;
		}

		const id = parseInt(key, 10);
		if (String(id) === String(key)) {
			this._conditionsToRemove.add(id);
		}
	}
	async save() {

		if (!this.canSave) {
			return;
		}

		if (!this.dirty) {
			return;
		}

		const newConditions = Array
			.from(this._conditionsToCreate.values())
			.map(this._formatNewCondition, this);
		const removeConditions = Array
			.from(this._conditionsToRemove);
		const addConditions = Array
			.from(this._conditionsToAdd.keys());

		await this._entity.save({
			Operator: this._operator,
			RemoveConditions: removeConditions,
			NewConditions: newConditions,
			AddConditions: addConditions
		});
		await this.fetch();
	}
	setOperator(value) {

		const item = this._operators.find(x => x.value === value);
		if (item) {
			this._operator = item.value;
		}
	}
	_constructKey(dto) {

		return `${dto.ConditionTypeId},${dto.Id1},${dto.Id2},${dto.Id2},${dto.Percentage1},${dto.Percentage2},${dto.Int1}`;
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
	_getSelectedOperator(operators) {

		const item = operators.find(x => x.selected);
		return item ? item.value : DefaultOperator;
	}

}

decorate(Conditions, {
	// props
	_operator: observable,
	_operators: observable,
	_conditions: observable,
	_conditionsToCreate: observable,
	_conditionsToRemove: observable,
	_conditionsToAdd: observable,
	// actions
	load: action,
	setOperator: action,
	add: action,
	remove: action,
	save: action
});
