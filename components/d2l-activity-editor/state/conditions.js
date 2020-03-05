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
		this._parser = new DOMParser();
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

	get operators() {

		const results = [];

		for (const { value, title } of this._operators) {

			results.push({ value, title, selected: value === this._operator });
		}

		return results;
	}

	_getSelectedOperator(operators) {

		const item = _operators.find(x => x.selected);
		return item ? item.value : DefaultOperator;
	}

	load(entity) {

		this._entity = entity;
		this._operators = entity.operatorOptions();
		this._operator = this._getSelectedOperator(this._operators);
		this._conditions = new Map(entity.conditions().map(x => [x.id, x]));
		this._conditionsToCreate = new Map();
		this._conditionsToRemove = new Set();
	}

	_constructKey(dto) {

		return `${dto.ConditionTypeId},${dto.Id1},${dto.Id2},${dto.Id2},${dto.Percentage1},${dto.Percentage2},${dto.Int1}`;
	}

	_asPlainText(legacyHtml) {

		const doc = this._parser.parseFromString(legacyHtml, 'text/html');
		return doc.body.textContent || '';
	}

	setOperator(value) {

		const item = this._operators.find(x => x.value === value);
		if (item) {
			this._operator = item.value;
		}
	}

	add(dto) {

		if (dto === undefined) {
			return;
		}

		if (Array.isArray(dto)) {
			dto.forEach(this.add, this);
			return;
		}

		// Legacy gives us HTML, which we can't render quite yet.
		dto.Text = this._asPlainText(dto.Text);

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

	get _shouldSave() {

		if (this._conditionsToCreate.size > 0) {
			return true;
		}

		if (this._conditionsToRemove.size > 0) {
			return true;
		}

		const operator = this._getSelectedOperator(this._operators);
		if (operator !== this._operator) {
			return true;
		}

		return false;
	}

	async save() {

		if (!this.canSave) {
			return;
		}

		if (!this._shouldSave) {
			return;
		}

		const newConditions = Array
			.from(this._conditionsToCreate.values())
			.map(this._formatNewCondition, this);
		const removeConditions = Array
			.from(this._conditionsToRemove);

		await this._entity.save({
			Operator: this._operator,
			RemoveConditions: removeConditions,
			NewConditions: newConditions
		});
		await this.fetch();
	}
}

decorate(Conditions, {
	// props
	_operator: observable,
	_operators: observable,
	_conditions: observable,
	_conditionsToCreate: observable,
	_conditionsToRemove: observable,
	// actions
	load: action,
	setOperator: action,
	add: action,
	remove: action,
	save: action
});
