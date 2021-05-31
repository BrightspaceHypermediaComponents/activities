import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { GradeCategory } from './grade-category.js';
import { GradeCategoryCollectionEntity } from 'siren-sdk/src/activities/associateGrade/GradeCategoryCollectionEntity.js';
import { GradeCategoryLinkedEntity } from 'siren-sdk/src/activities/associateGrade/GradeCategoryLinkedEntity.js';

configureMobx({ enforceActions: 'observed' });

export class GradeCategoryCollection {

	constructor(gradeCategoryCollectionEntity, token) {
		this.gradeCategoryCollectionEntity = gradeCategoryCollectionEntity;
		this.token = token;
		this.gradeCategories = [];
		this.selected = null;
	}

	async fetchGradeCategory(gradeCategoryLinkedEntity) {
		const gradeCategory = new GradeCategory(gradeCategoryLinkedEntity, this.token);
		await gradeCategory.fetch();
		return gradeCategory;
	}

	async fetch() {
		const gradeCategoryPromises = this.gradeCategoryCollectionEntity.getGradeCategories().map(category => {
			const gradeCategoryLinkedEntity = new GradeCategoryLinkedEntity(category, this.token, { remove: () => { } });
			return this.fetchGradeCategory(gradeCategoryLinkedEntity);
		});

		await Promise.all(gradeCategoryPromises);
		await this.load();
		return this;
	}

	async load() {
		this.selected = this.gradeCategoryCollectionEntity.getSelectedCategory();
		this.gradeCategories = this.gradeCategoryCollectionEntity.getGradeCategories();
	}
}

decorate(GradeCategoryCollection, {
	// props
	gradeCategories: observable,
	selected: observable,
	// actions
	load: action
});
