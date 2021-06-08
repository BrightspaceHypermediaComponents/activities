import { action, configure as configureMobx, decorate, observable, runInAction } from 'mobx';
import { Association } from 'siren-sdk/src/activities/Association.js';
import { Associations } from 'siren-sdk/src/activities/Associations.js';
import { fetchEntity } from '../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class AssociationCollection {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.associationsMap = new Map();
	}

	addAssociations(associationsToAdd) {

		for (const ata of associationsToAdd) {
			const entity = new Association(ata, this.token);

			const rubricHref = entity.getRubricLink();

			if (this.associationsMap.has(rubricHref)) {
				const association = this.associationsMap.get(rubricHref);

				runInAction(() => this.addDefaultScoringRubricOption(association.rubricHref));

				if (association.isDeleting) {
					association.isDeleting = false;
				} else {
					if (association.isAssociated) {
						continue;
					}
					association.isAssociating = true;
				}

			}

		}

	}

	async addDefaultScoringRubricOption(rubricHref) {
		if (rubricHref) {
			const rubricEntity = await fetchEntity(rubricHref, this.token);
			const rubricId = this.getRubricIdFromHref(rubricHref);

			const rubricAlreadyAnOption = this.defaultScoringRubricOptions.some(option => option.value === rubricId);

			if (rubricEntity && !rubricAlreadyAnOption) {
				runInAction(() => this.defaultScoringRubricOptions.push({ title: rubricEntity.properties.name, value: rubricId }));
			}
		}
	}
	addPotentialAssociationToMap(rubricHref, formattedEntity) {
		if (!this.associationsMap.has(rubricHref)) {
			this.associationsMap.set(rubricHref, formattedEntity);
		}
	}

	async createPotentialAssociation() {
		const newAssociation = await this._entity.createPotentialAssociation();
		const associationEntity = new Association(newAssociation, this.token);

		const rubricHref = associationEntity.getRubricLink();
		const formattedEntity = this._formatAssociationEntity(associationEntity);
		this.addPotentialAssociationToMap(rubricHref, formattedEntity);

		return newAssociation;
	}
	deleteAssociation(rubricHref, assignment) {

		if (this.associationsMap.has(rubricHref)) {
			const association = this.associationsMap.get(rubricHref);

			this.removeDefaultScoringRubricOption(rubricHref, assignment);

			if (association.isAssociating) {
				association.isAssociating = false;
			} else {
				association.isDeleting = true;
			}

		}
	}
	deleteAssociation_DoNotUse(rubricHref) {

		if (this.associationsMap.has(rubricHref)) {
			const association = this.associationsMap.get(rubricHref);

			if (association.isAssociating) {
				association.isAssociating = false;
			} else {
				association.isDeleting = true;
			}

		}
	}
	get dirty() {
		const associations = Array.from(this.associationsMap.values());
		for (const association of associations) {
			if (association.isAssociating || association.isDeleting) {
				return true;
			}
		}

		return false;
	}
	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);

		if (sirenEntity) {
			const entity = new Associations(sirenEntity, this.token);
			this.load(entity);
		}
		return this;
	}

	fetchAssociations() {
		return Array.from(this.associationsMap.values());
	}

	fetchAttachedAssociationsCount() {
		const associations = Array.from(this.associationsMap.values());
		let attachedAssociationCount = 0;

		for (const association of associations) {
			if ((association.isAssociated || association.isAssociating)
				&& !association.isDeleting
			) {
				attachedAssociationCount++;
			}
		}
		return attachedAssociationCount;
	}
	getRubricIdFromHref(rubricHref) {
		if (!rubricHref) {
			return;
		}

		return rubricHref.split('/').pop();
	}

	load(entity) {
		this._entity = entity;

		this.associationsMap = new Map();

		this.defaultScoringRubricOptions = [];

		this._entity.getAllAssociations().forEach(asc => {

			const associationEntity = new Association(asc, this.token);
			const rubricHref = associationEntity.getRubricLink();
			const formattedEntity = this._formatAssociationEntity(associationEntity);

			if (!this.associationsMap.has(rubricHref)) {
				this.associationsMap.set(rubricHref, formattedEntity);
			}
		});

		this.canCreateAssociation = this._entity.canCreateAssociation();
		this.canCreatePotentialAssociation = this._entity.canCreatePotentialAssociation();

		const associations = this.fetchAssociations();
		const validDefaultScoringOption = associations.filter(association => (association.isAssociating || association.isAssociated) && !association.isDeleting);

		for (const option of validDefaultScoringOption) {
			this.addDefaultScoringRubricOption(option.rubricHref);
		}
	}

	removeDefaultScoringRubricOption(rubricHref, assignment) {
		if (rubricHref && assignment) {
			const rubricId = this.getRubricIdFromHref(rubricHref);
			if (assignment.defaultScoringRubricId === rubricId) {
				assignment.resetDefaultScoringRubricId();
			}

			this.defaultScoringRubricOptions = this.defaultScoringRubricOptions.filter(
				option => option.value !== rubricId
			);
		}
	}

	async save() {
		const associations = this.associationsMap.values();

		for await (const association of associations) {
			await this._saveChanges(association);
		}
	}

	_formatAssociationEntity(entity) {

		const id = entity.getRubricLink();

		const isAssociated = entity.isSingleAssociation();

		const associationObj = {
			entity: entity,
			rubricHref: id,
			isAssociated: isAssociated,
			isAssociating: false,
			isDeleting: false
		};

		return associationObj;
	}

	async _saveChanges(association) {
		if (association.isAssociating) {
			await association.entity.createAssociation();
		} else if (association.isDeleting) {
			await association.entity.deleteAssociation();
		}
	}

}

decorate(AssociationCollection, {
	// props
	associationsMap: observable,
	defaultScoringRubricOptions: observable,
	// actions
	load: action,
	save: action,
	addAssociations: action,
	deleteAssociation: action,
	addPotentialAssociationToMap: action,
	addDefaultScoringRubricOption: action,
	removeDefaultScoringRubricOption: action,
	deleteAssociation_DoNotUse: action,
});
