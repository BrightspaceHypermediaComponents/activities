import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { CategoriesEntity } from 'siren-sdk/src/activities/CategoriesEntity.js';
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
		this.selectedCategory = entity.getSelectedCategory();
		this.selectedCategoryId = this.selectedCategory && this.selectedCategory.properties.categoryId;
		this.categoryName = '';
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
		this.categoryName = name;
	}

	setSelectedCategoryId(categoryId) {
		this.selectedCategoryId = categoryId;
	}

	_makeCategoriesData() {
		return {
			categoryId: this.selectedCategoryId,
			categoryName: this.categoryName
		};
	}
}

decorate(AssignmentCategories, {
	// props
	categories: observable,
	selectedCategory: observable,
	canEditCategories: observable,
	selectedCategoryId: observable,
	categoryName: observable,
	// actions
	load: action,
	setSelectedCategoryId: action,
	setNewCategoryName: action
});
