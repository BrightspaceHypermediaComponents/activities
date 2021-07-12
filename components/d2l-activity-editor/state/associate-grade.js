import { action, configure as configureMobx, decorate, observable, runInAction } from 'mobx';
import { AssociateGradeEntity, GradeType } from 'siren-sdk/src/activities/associateGrade/AssociateGradeEntity.js';
import { fetchEntity } from './fetch-entity.js';
import { GradeCandidateCollection } from '../d2l-activity-grades/state/grade-candidate-collection.js';
import { GradeCategoryCollection } from '../d2l-activity-grades/state/grade-category-collection.js';
import { GradeSchemeCollection } from '../d2l-activity-grades/state/grade-scheme-collection.js';

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
		if (this.gradeCandidateCollection) return;

		const gradeCandidateCollectionEntity = await this._entity.getGradeCandidates();
		if (!gradeCandidateCollectionEntity) return;
		runInAction(() => {
			this.gradeCandidateCollection = new GradeCandidateCollection(gradeCandidateCollectionEntity.self(), this.token);
		});
		await this.gradeCandidateCollection.load(gradeCandidateCollectionEntity);
	}

	async getGradeCategories() {
		if (this.gradeCategoryCollection) return;

		const gradeCategoryCollectionEntity = await this._entity.getGradeCategories();
		if (!gradeCategoryCollectionEntity) return;
		runInAction(() => {
			this.gradeCategoryCollection = new GradeCategoryCollection(gradeCategoryCollectionEntity, this.token);
		});
		await this.gradeCategoryCollection.fetch();
	}

	async getGradeSchemes(bypassCache) {
		if (!bypassCache && this.gradeSchemeCollection) return;

		const gradeSchemeCollectionEntity = await this._entity.getGradeSchemesForType(this.gradeType);
		if (!gradeSchemeCollectionEntity) return;
		runInAction(() => {
			this.gradeSchemeCollection = new GradeSchemeCollection(gradeSchemeCollectionEntity, this.token);
		});

		await this.gradeSchemeCollection.fetch();

		runInAction(async() => {
			this.schemesIsEmpty = this.gradeType === GradeType.Selectbox ?
				this.gradeSchemeCollection.gradeSchemes.length === 0 :
				this.gradeSchemeCollection.gradeSchemes.length === 1;

			this.isDefaultSchemeSelected = this._isDefaultSchemeSelected();
		});
	}

	async load(entity) {
		this._entity = entity;
		this.gradebookStatus = entity.gradebookStatus();
		this.gradeName = entity.gradeName();
		this.maxPoints = entity.maxPoints();
		this.canCreateNewGrade = entity.canCreateNewGrade();
		this.canEditNewGrade = entity.canEditNewGrade();
		this.selectedSchemeHref = entity.selectedSchemeHref();
		this.selectedCategoryHref = entity.selectedCategoryHref();

		const existingGradeType = this.gradeType;
		this.gradeType = entity.gradeType();
		this.canGetSchemes = entity.canGetSchemesForType(this.gradeType);

		if (this.gradeSchemeCollection && existingGradeType && existingGradeType !== this.gradeType) {
			await this.getGradeSchemes(true);
		}

		runInAction(async() => {
			this.isDefaultSchemeSelected = this._isDefaultSchemeSelected();
		});
	}

	async setGradebookStatus(newStatus) {
		this.gradebookStatus = newStatus;
		await this._updateProperty(() => this._entity.setGradebookStatus(newStatus));
	}

	setGradeMaxPoints(maxPoints) {
		this.maxPoints = maxPoints;
		this._updateProperty(() => this._entity.setGradeMaxPoints(maxPoints));
	}

	setGradeName(gradeName) {
		this.gradeName = gradeName;
		this._updateProperty(() => this._entity.setGradeName(gradeName));
	}

	async setGradeType(gradeType) {
		await this._updateProperty(() => this._entity.setGradeType(gradeType));
	}

	_isDefaultSchemeSelected() {
		const gradeScheme = this.gradeSchemeCollection && this.gradeSchemeCollection.findGradeScheme(this.selectedSchemeHref);
		return !gradeScheme || gradeScheme.isDefault;
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
	canGetSchemes: observable,
	gradebookStatus: observable,
	gradeName: observable,
	maxPoints: observable,
	gradeType: observable,
	gradeCategoryCollection: observable,
	gradeCandidateCollection: observable,
	gradeSchemeCollection: observable,
	selectedSchemeHref: observable,
	schemesIsEmpty: observable,
	selectedCategoryHref: observable,
	isDefaultSchemeSelected: observable,
	// actions
	load: action,
	getGradeCategories: action,
	getGradeCandidates: action,
	getGradeSchemes: action,
	setGradebookStatus: action,
	setGradeMaxPoints: action,
	setGradeName: action,
	setGradeType: action
});
