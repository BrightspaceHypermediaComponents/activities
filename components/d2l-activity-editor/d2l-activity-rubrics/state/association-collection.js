import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { AssociationCollectionEntity } from 'siren-sdk/src/activities/Associations.js';
import { AssociationEntity } from 'siren-sdk/src/activities/Association.js';
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
			const entity = new AssociationCollectionEntity(sirenEntity, this.token);
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;

		this.associationsMap = new Map();

		this._entity.getAllAssociations().forEach( asc => {

			const associationEntity = new AssociationEntity(asc, this.token);
			const rubricHref = associationEntity.getRubricLink();
			const formattedEntity = this._formatAssociationEntity( associationEntity );

			if (!this.associationsMap.has(rubricHref)) {
				this.associationsMap.set(rubricHref, formattedEntity);
			}
		});
	}

	get getAssociationsMap(){
		return this.associationsMap;
	}

	addAssociations(associationsToAdd) {
		const associationEntities = associationsToAdd.map(
			ata => new AssociationEntity(ata, this.token)
		);
		associationEntities.forEach( entity => {
		
			const rubricHref = entity.getRubricLink();

			if ( this.associationsMap.has(rubricHref)) {
				let association = this.associationsMap.get(rubricHref);

				if (association.isDeleting) {
					association.isDeleting = false;
				} else {
					if (association.isAssociated) {
						return;
					}
					association.isAssociating = true;
				}

				this.associationsMap.set(rubricHref, association);

			}
		})

	}

	deleteAssociation(rubricHref){
		
		if (this.associationsMap.has(rubricHref)) {
			let association = this.associationsMap.get( rubricHref );

			if (association.isAssociating) {
				association.isAssociating = false;
			} else {
				association.isDeleting = true;
			}

			this.associationsMap.set( rubricHref, association );

		}
	}

	async save() {
		const associations = this.associationsMap.values();
		
		for await (let association of associations) {
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
		}

		return associationObj;
	}

	async _saveChanges( association ) {
		if (association.isAssociating) {
			await association.entity.createAssociation();
		} else if( association.isDeleting) {
			await association.entity.deleteAssociation();
		}
	}
}

decorate(AssociationCollection, {
	// props
	associationsMap: observable,
	// actions
	load: action,
	save: action,
	addAssociations: action,
	deleteAssociation: action
});
