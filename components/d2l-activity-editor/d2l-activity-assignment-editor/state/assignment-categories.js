import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { CategoriesEntity } from 'siren-sdk/src/activities/assignments/CategoriesEntity.js';
import { fetchEntity } from '../../state/fetch-entity.js';

const UNSELECTED_ID = '0'; // API expects 0 to unselect a category

configureMobx({ enforceActions: 'observed' });

export class AssignmentCategories {

	constructor(href, token) {
		this.href = href;
		this.token = token;
	}

	get dirty() {
		return !this._entity.equals(this._makeCategoriesData());
	}

	async fetch(bypassCache) {
		const sirenEntity = await fetchEntity(this.href, this.token, bypassCache);
		if (sirenEntity) {
			const entity = new CategoriesEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.categories = entity.getCategories();
		this.canEditCategories = entity.canEditCategories();
		this.canAddCategories = entity.canAddCategories();
		this.selectedCategory = entity.getSelectedCategory();
		this.initialCategory = this.initialCategory || this.selectedCategory || UNSELECTED_ID;
		this.selectedCategoryName = this.selectedCategory && this.selectedCategory.properties.name;
		this.selectedCategoryId = this.selectedCategory && this.selectedCategory.properties.categoryId;
		this.newCategoryName = '';
	}

	async reset() {
		if (!this._entity) {
			return;
		}

		if (this.initialCategory === UNSELECTED_ID) {
			await this._entity.save({ categoryId: UNSELECTED_ID });
		}

		this.initialCategory && await this._entity.save({ categoryId: this.initialCategory.properties.categoryId });
	}

	async save(shouldReset) {
		if (!this._entity) {
			return;
		}

		if (this._saving) {
			return this._saving;
		}

		this._saving = this._entity.save(this._makeCategoriesData());
		await this._saving;
		this._saving = null;

		shouldReset && this._resetInitalCategory();

		await this.fetch(true);
	}

	setNewCategoryName(name) {
		this.newCategoryName = name;
	}

	setSelectedCategory(categoryId, categoryName) {
		this.selectedCategoryId = categoryId;
		this.selectedCategoryName = categoryName;
	}

	_makeCategoriesData() {
		const data = {};

		if (this.newCategoryName) {
			data.categoryName = this.newCategoryName;
		}

		if (this.selectedCategoryId) {
			data.categoryId = this.selectedCategoryId;
		}

		return data;
	}

	_resetInitalCategory() {
		this.initialCategory = null;
	}
}

decorate(AssignmentCategories, {
	// props
	categories: observable,
	selectedCategory: observable,
	canEditCategories: observable,
	canAddCategories: observable,
	selectedCategoryId: observable,
	newCategoryName: observable,
	selectedCategoryName: observable,
	// actions
	load: action,
	setSelectedCategory: action,
	setNewCategoryName: action
});
