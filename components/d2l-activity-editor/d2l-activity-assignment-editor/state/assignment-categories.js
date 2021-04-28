import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { CategoriesEntity } from 'siren-sdk/src/activities/assignments/CategoriesEntity.js';
import { fetchEntity } from '../../state/fetch-entity.js';

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
		this.selectedCategoryName = this.selectedCategory && this.selectedCategory.properties.name;
		this.selectedCategoryId = this.selectedCategory && this.selectedCategory.properties.categoryId;
		this.newCategoryName = '';
	}

	async save() {
		if (!this._entity) {
			return;
		}

		if (this._saving) {
			return this._saving;
		}

		this._saving = this._entity.save(this._makeCategoriesData());
		await this._saving;
		this._saving = null;

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
			const initialId = this.selectedCategory && this.selectedCategory.properties.categoryId;
			const shouldUpdateCategoryId = this.selectedCategoryId !== initialId;

			if (shouldUpdateCategoryId) {
				data.categoryId = this.selectedCategoryId;
			}
		}

		return data;
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
