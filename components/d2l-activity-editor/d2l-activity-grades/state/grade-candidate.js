import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { GradeCandidateEntity } from 'siren-sdk/src/activities/GradeCandidateEntity.js';
import { GradeCategoryEntity } from 'siren-sdk/src/activities/associateGrade/GradeCategoryEntity.js';
import { GradeEntity } from 'siren-sdk/src/activities/GradeEntity.js';

configureMobx({ enforceActions: 'observed' });

export class GradeCandidate {

	constructor(gradeCandidateEntity, token) {
		this.gradeCandidateEntity = gradeCandidateEntity;
		this.token = token;
		this.isCategory = false;
		this.isNewGradeCandidate = false;
		this.isCurrentAssociation = false;
		this.gradeCandidates = [];
	}

	async associateGrade(associateGradeStore) {
		const sirenEntity = await this.gradeCandidateEntity.associateGrade();
		if (!sirenEntity || !associateGradeStore) return;

		const href = sirenEntity.self();
		const entity = associateGradeStore.get(href);
		await entity.load(sirenEntity);
		associateGradeStore.put(href, entity);
	}

	async fetch(bypassCache) {
		const href = this.gradeCandidateEntity.href();
		let sirenEntity;
		if (href) {
			sirenEntity = await fetchEntity(href, this.token, bypassCache);
		}
		if (sirenEntity) {
			let entity;
			if (this.gradeCandidateEntity.isCategory() || this.gradeCandidateEntity.isNewGradeCandidate()) {
				entity = new GradeCategoryEntity(sirenEntity, this.token, { remove: () => { } });
			} else {
				entity = new GradeEntity(sirenEntity, this.token, { remove: () => { } });
			}
			await this.load(entity);
		}
		return this;
	}

	async fetchGradeCandidate(gradeCandidateEntity) {
		const gradeCandidate = new GradeCandidate(gradeCandidateEntity, this.token);
		await gradeCandidate.fetch();
		return gradeCandidate;
	}

	isNewGradeCandidateWithCategory() {
		return this.isNewGradeCandidate && this.href;
	}
	async load(entity) {
		this.href = this.gradeCandidateEntity.href();
		this.isNewGradeCandidate = this.gradeCandidateEntity.isNewGradeCandidate();
		this.isCategory = this.gradeCandidateEntity.isCategory();
		this.isCurrentAssociation = this.gradeCandidateEntity.isCurrentAssociation();

		this._entity = entity;
		this.name = entity.name();
		if (!this.isCategory && !this.isNewGradeCandidate) {
			this.baseWeight = entity.baseWeight();
			this.maxPoints = entity.maxPoints();
		}
		const gradeCandidatePromises = this.gradeCandidateEntity.getGradeCandidates().map(gc => {
			const gradeCandidateEntity = new GradeCandidateEntity(gc, this.token, { remove: () => { } });
			return this.fetchGradeCandidate(gradeCandidateEntity);
		});
		this.gradeCandidates = await Promise.all(gradeCandidatePromises);
	}
}

decorate(GradeCandidate, {
	// props
	baseWeight: observable,
	gradeCandidates: observable,
	isCategory: observable,
	isNewGradeCandidate: observable,
	isCurrentAssociation: observable,
	maxPoints: observable,
	name: observable,
	// actions
	load: action,
	associateGrade: action
});
