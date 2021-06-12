import { action, configure as configureMobx, decorate, observable, runInAction } from 'mobx';
import { AssociateGradeEntity } from 'siren-sdk/src/activities/associateGrade/AssociateGradeEntity.js';
import { fetchEntity } from './fetch-entity.js';
import { GradeCandidateCollection } from '../d2l-activity-grades/state/grade-candidate-collection.js';
import { GradeCategoryCollection } from '../d2l-activity-grades/state/grade-category-collection.js';

configureMobx({ enforceActions: 'observed' });

export class AssociateGrade {
	constructor(href, token) {
		this.href = href;
		this.token = token;
	}

	async fetch(bypassCache) {
		const sirenEntity = await fetchEntity(this.href, this.token, bypassCache);
		if (sirenEntity) {
			const entity = new AssociateGradeEntity(sirenEntity, this.token, {
				remove: () => { },
			});
			await this.load(entity);
		}
		return this;
	}

	async getGradeCandidates() {
		const gradeCandidateCollectionEntity = await this._entity.getGradeCandidates();
		if (!gradeCandidateCollectionEntity) return;
		runInAction(() => {
			this.gradeCandidateCollection = new GradeCandidateCollection(gradeCandidateCollectionEntity, this.token);
		});
		await this.gradeCandidateCollection.fetch();
	}

	async getGradeCategories() {
		const gradeCategoryCollectionEntity = await this._entity.getGradeCategories();
		if (!gradeCategoryCollectionEntity) return;
		runInAction(() => {
			this.gradeCategoryCollection = new GradeCategoryCollection(gradeCategoryCollectionEntity, this.token);
		});
		await this.gradeCategoryCollection.fetch();
	}

	async load(entity) {
		this._entity = entity;
		this.gradebookStatus = entity.gradebookStatus();
		this.gradeName = entity.gradeName();
		this.maxPoints = entity.maxPoints();
		this.gradeType = entity.gradeType();
		this.canCreateNewGrade = entity.canCreateNewGrade();
		this.canEditNewGrade = entity.canEditNewGrade();

		this.gradeCandidateCollection || this.getGradeCandidates();
		this.gradeCategoryCollection || this.getGradeCategories();
	}

	async setGradebookStatus(newStatus, gradeName, maxPoints) {
		if (gradeName) this.gradeName = gradeName;
		if (maxPoints) this.maxPoints = maxPoints;
		await this._updateProperty(() => this._entity.setGradebookStatus(newStatus, gradeName, maxPoints));
	}

	setGradeMaxPoints(maxPoints) {
		this._updateProperty(() => this._entity.setGradeMaxPoints(maxPoints));
	}

	setGradeName(gradeName) {
		this._updateProperty(() => this._entity.setGradeName(gradeName));
	}

	setGradeType(gradeType) {
		this._updateProperty(() => this._entity.setGradeType(gradeType));
	}

	async _updateProperty(updateFunc) {
		const entity = await updateFunc();
		if (!entity) {
			this.fetch();
			return;
		}

		this.load(entity);
	}
}

decorate(AssociateGrade, {
	// props
	canCreateNewGrade: observable,
	canEditNewGrade: observable,
	gradebookStatus: observable,
	gradeName: observable,
	maxPoints: observable,
	gradeType: observable,
	gradeCategoryCollection: observable,
	gradeCandidateCollection: observable,
	// actions
	load: action,
	getGradeCategories: action,
	getGradeCandidates: action,
	setGradebookStatus: action,
	setGradeMaxPoints: action,
	setGradeName: action,
	setGradeType: action
});
