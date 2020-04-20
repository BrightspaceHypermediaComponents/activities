import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { entityFactory } from 'siren-sdk/src/es6/EntityFactory.js';
import { NamedEntityMixin } from 'siren-sdk/src/entityAddons/named-entity-mixin.js';
import { DescribableEntityMixin } from 'siren-sdk/src/entityAddons/describable-entity-mixin.js';
import { SimpleEntity } from 'siren-sdk/src/es6/SimpleEntity.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';
import { ActionCollectionEntity } from 'siren-sdk/src/activities/ActionCollectionEntity.js';
import { performSirenAction } from 'siren-sdk/src/es6/SirenAction.js';

configureMobx({ enforceActions: 'observed' });

/**
 * Ideally, this will extend Activity. Collection contains the
 * logic for speaking to the hypermedia entities. It is a MobX enabled
 * state attached to the component via the MobXMixin
 *
 * @export
 * @class Collection
 */
export class Collection {
	constructor(href, token) {
		this._href = href;
		this._token = token;

		this._loadedImages = [];
		this._organizationImageChunk = {};
		this._candidateItemsLoading = false;
		this._candidateFirstLoad = false;
		this.activities = [];
		this.candidates = [];

		this._setSirenProvider({
			entityFactory: entityFactory,
			performAction: performSirenAction,
			createActionCollection: (parent, entity) => new ActionCollectionEntity(parent, entity)
		});
	}

	/**
	 * Set the siren provider. Allows for easier dependency injection
	 *
	 * @param {*} provider
	 */
	_setSirenProvider(provider) {
		this._sirenProvider = provider;
		this._sirenProvider.entityFactory(ActivityUsageEntity, this._href, this._token, this._onServerResponse.bind(this));
	}

	/**
	 * Callback function which occurs when we receive the entity
	 * from the server
	 *
	 * @param {*} usage
	 * @param {*} error
	 */
	async _onServerResponse(usage, error) {
		if (error) {
			return;
		}
		this._entity = usage; // for disposal
		this._usage = usage;
		usage.onSpecializationChange(NamedEntityMixin(DescribableEntityMixin(SimpleEntity)), (specialization) => {
			this._specialization = specialization;
			this.setName(specialization.getName());
			this.setDescription(specialization.getDescription());
		});

		this.setIsVisible(!usage.isDraft());
		this.setCanEditDraft(usage.canEditDraft());

		let hasACollection = false;
		usage.onActivityCollectionChange(async(collection, error) => {
			if (error) {
				return;
			}
			hasACollection = true;

			// load the activities onto the collection
			const items = [];
			let itemsLoadedOnce = false;
			const imageChunk = this._loadedImages.length;
			this._loadedImages[imageChunk] = { loaded: 0, total: null };
			let totalInLoadingChunk = 0;

			collection.onItemsChange((item, index) => {
				item.onActivityUsageChange((usage, error) => {
					if (error) {
						return;
					}
					usage.onOrganizationChange((organization, error) => {
						if (error) {
							return;
						}
						items[index] = organization;
						items[index].itemSelf = item.self();
						if (typeof this._organizationImageChunk[item.self()] === 'undefined') {
							this._organizationImageChunk[item.self()] = imageChunk;
							totalInLoadingChunk++;
						}

						if (itemsLoadedOnce) {
							this.setActivities(items);
						}
					});
				});
			});

			this._collection = collection;
			this._addExistingAction = collection._entity.getActionByName('start-add-existing-activity');

			await collection.subEntitiesLoaded();
			this.setActivities(items);
			itemsLoadedOnce = true;
			this._loadedImages[imageChunk].total = totalInLoadingChunk;
		});

		await usage.subEntitiesLoaded();
		if (!this.isLoaded) {
			// returns a promise
			this.fetchCandidates(this._addExistingAction, null, true);
		}
		if (!hasACollection) {
			this.setActivities([]);
		}
		this.setIsLoaded(true);
	}

	/**
	 * Fetch activities that can be added to the collection
	 *
	 * @param {*} action An href action to fetch from
	 * @param {*} fields The array of fields to search
	 * @param {*} clear Whether the previous canditates should be removed
	 * @returns
	 */
	async fetchCandidates(action, fields, clear) {
		if (!this._collection) {
			return;
		}
		this.setCandidatesAreLoaded(false);
		const resp = await this._sirenProvider.performAction(this._token, action, fields, true);
		// selfless entity - cannot be made with entity factory
		this._actionCollectionEntity = this._sirenProvider.createActionCollection(this._collection, resp);

		const newCandidates = [];
		const imageChunk = this._loadedImages.length;
		this._loadedImages[imageChunk] = { loaded: 0, total: null };
		let totalInLoadingChunk = 0;
		this._actionCollectionEntity.items().forEach(item => {
			item.onActivityUsageChange(async usage => {
				usage.onOrganizationChange((organization) => {
					const alreadyAdded = this.activities.findIndex(activity => activity.self() === organization.self()) >= 0;
					newCandidates.push({
						item,
						organization,
						alreadyAdded,
						itemSelf: organization.self(),
						name: organization.name()
					});
					this._organizationImageChunk[organization.self()] = imageChunk;
					totalInLoadingChunk++;
				});
			});
		});
		await this._collection.subEntitiesLoaded();
		this.setCandidatesAreLoaded(true);
		if (clear) {
			this.candidates = newCandidates;
		} else {
			this.candidates.push(...newCandidates);
		}
		this._loadedImages[imageChunk].total = totalInLoadingChunk;
	}

	/**
	 * Search for candidate activities
	 *
	 * @param {*} value
	 */
	async searchCandidates(value) {
		const searchAction = this._actionCollectionEntity.getSearchAction();
		const fields = [{ name: 'collectionSearch', value: value }];
		await this.fetchCandidates(searchAction, fields, true);
	}

	/**
	 * Method to save to publish the changes to the collection
	 * This method is not implemented
	 *
	 */
	save() {
		// in theory this will later send a single "publish" request
		// to the new 'draft' state API
		//this._specialization.setName(this.name);
		//this._specialization.setDescription(this.description);
		//usage.setDraftStatus(draftStatus)
	}

	/**
	 * Method to be called when the user makes changes to the collection
	 * This method is not implemented.
	 *
	 */
	validate() {

	}

	/**
	 * Action to set the visibility status
	 *
	 * @param {*} value True or false
	 * @param {*} autosave Save this change to the entity
	 */
	setIsVisible(value, autosave) {
		this.isVisible = value;
		if (autosave) {
			this._usage.setDraftStatus(!value);
		}
	}

	/**
	 * Action to set the ability for a user to edit draft
	 *
	 * @param {*} value
	 */
	setCanEditDraft(value) {
		this.canEditDraft = value;
	}

	/**
	 * Action to set the is loaded status
	 *
	 * @param {*} value
	 */
	setIsLoaded(value) {
		this.isLoaded = value;
	}

	/**
	 * Action that sets the name
	 *
	 * @param {*} value New name to set
	 * @param {*} autosave Save this change to the entity
	 */
	setName(value, autosave) {
		this.name = value.trim();
		if (autosave) {
			this._specialization.setName(value);
		}
	}

	/**
	 * Action that sets the description
	 *
	 * @param {*} value Name to set
	 * @param {*} autosave Save this change to the entity
	 */
	setDescription(value, autosave) {
		this.description = value;
		if (autosave) {
			this._specialization.setDescription(value);
		}
	}

	/**
	 * Action that sets the activities array
	 * Sets the visilibity to hidden if there are none
	 *
	 * @param {*} activities
	 */
	setActivities(activities) {
		this.activities = activities;
		// hide empty collections
		if (this.activities.length === 0 && this.isVisible) {
			this.setIsVisible(false);
		}
	}

	/**
	 * Add activities to the collection
	 *
	 * @param {*} activityKeys Array of activity keys
	 */
	async addActivities(activityKeys) {
		const addAction = this._actionCollectionEntity.getExecuteMultipleAction();
		const fields = [{ name: 'actionStates', value: activityKeys }];
		await this._sirenProvider.performAction(this._token, addAction, fields, true);
	}

	/**
	 * Removes an activity from the collection.
	 * Sets the visibility to hidden if this results in an empty
	 * collection
	 *
	 * @param {*} activity
	 */
	removeActivity(activity) {
		this._collection.removeItem(activity.itemSelf);
	}

	/**
	 * Action that sets the loaded status of the candidates array
	 *
	 * @param {*} value
	 */
	setCandidatesAreLoaded(value) {
		this.candidatesAreLoaded = value;
	}
}

decorate(Collection, {
	name: observable,
	description: observable,
	canEditDraft: observable,
	isVisible: observable,
	isLoaded: observable,
	activities: observable,
	candidatesAreLoaded: observable,

	setIsLoaded: action,
	setIsVisible: action,
	setDescription: action,
	setName: action,
	setCanEditDraft: action,
	addActivity: action,
	removeActivity: action,
	setActivities: action,
	setCandidatesAreLoaded: action
});

