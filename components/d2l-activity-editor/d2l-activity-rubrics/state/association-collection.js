import { action, computed, configure as configureMobx, decorate, observable } from 'mobx';
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

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);

		if (sirenEntity) {
			const entity = new Associations(sirenEntity, this.token);
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;

		this.associationsMap = new Map();

		this.associatedRubrics = [];

		this._entity.getAllAssociations().forEach(asc => {

			const associationEntity = new Association(asc, this.token);
			const rubricHref = associationEntity.getRubricLink();
			const formattedEntity = this._formatAssociationEntity(associationEntity);

			if (!this.associationsMap.has(rubricHref)) {
				this.associationsMap.set(rubricHref, formattedEntity);
			}
		});
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

	addAssociations(associationsToAdd) {

		for (const ata of associationsToAdd) {
			const entity = new Association(ata, this.token);

			const rubricHref = entity.getRubricLink();

			if (this.associationsMap.has(rubricHref)) {
				const association = this.associationsMap.get(rubricHref);

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

	deleteAssociation(rubricHref) {

		if (this.associationsMap.has(rubricHref)) {
			const association = this.associationsMap.get(rubricHref);

			if (association.isAssociating) {
				association.isAssociating = false;
			} else {
				association.isDeleting = true;
			}

		}
	}

	async save() {
		const associations = this.associationsMap.values();

		for await (const association of associations) {
			await this._saveChanges(association);
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

	canCreatePotentialAssociation() {
		return this._entity.canCreatePotentialAssociation();
	}

	canCreateAssociation() {
		return this._entity.canCreateAssociation();
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

	get dirty() {
		const associations = Array.from(this.associationsMap.values());
		for (const association of associations) {
			if (association.isAssociating || association.isDeleting) {
				return true;
			}
		}

		return false;
	}

	associatedRubrics() {
		const associations = Array.from(this.associationsMap.values());

		const associated = associations.filter(association => (association.isAssociating || association.isAssociated) && !association.isDeleting);

		return Promise.all(associated.map(async association => {
			const rubricEntity = await fetchEntity(association.rubricHref, this.token);

			if (!rubricEntity || !rubricEntity.properties) {
				return;
			}
			console.log("rubricEntity", rubricEntity);

			associatedRubrics.push({title: rubricEntity.properties.name, value: 1});
		}));
	}
}

decorate(AssociationCollection, {
	// props
	associationsMap: observable,
	associatedRubricNames: observable,
	//computed
	associatedRubrics: action,
	// actions
	load: action,
	save: action,
	addAssociations: action,
	deleteAssociation: action,
	addPotentialAssociationToMap: action
});
