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
		this._sirenProvider.entityFactory(ActivityUsageEntity, href, token, this._onServerResponse.bind(this));
	}

	/**
	 * Set the siren provider. Allows for easier dependency injection
	 *
	 * @param {*} provider
	 * @memberof Collection
	 */
	_setSirenProvider(provider) {
		this._sirenProvider = provider;
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
		this.canEditDraft = usage.canEditDraft();

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
	 * @memberof Collection
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
		this.candidates = clear ? newCandidates : this.candidates.concat(newCandidates);
		this._loadedImages[imageChunk].total = totalInLoadingChunk;
	}

	/**
	 * Search for candidate activities
	 *
	 * @param {*} value
	 * @memberof Collection
	 */
	async searchCandidates(value) {
		const searchAction = this._actionCollectionEntity.getSearchAction();
		const fields = [{ name: 'collectionSearch', value: value }];
		await this.fetchCandidates(searchAction, fields, true);
	}

	save() {
		// in theory this will later send a single "publish" request
		// to the new 'draft' state API
		//this._specialization.setName(this.name);
		//this._specialization.setDescription(this.description);
		//usage.setDraftStatus(draftStatus)
	}

	// to be called whenever the user changes an input
	validate() {

	}

	/**
	 * Action to set the visibility status
	 *
	 * @param {*} value True or false
	 * @param {*} autosave Save this change to the entity
	 * @memberof Collection
	 */
	setIsVisible(value, autosave) {
		this.isVisible = value;
		if (autosave) {
			this._usage.setDraftStatus(!value);
		}
	}

	setIsLoaded(value) {
		this.isLoaded = value;
	}

	/**
	 * Sets the name if the new one is different
	 *
	 * @param {*} value New name to set
	 * @param {*} autosave Save this change to the entity
	 * @memberof Collection
	 */
	setName(value, autosave) {
		const oldValue = this.name;
		this.name = value.trim();
		if (oldValue !== value && autosave) {
			this._specialization.setName(value);
		}
	}

	/**
	 * Sets the name if the new one is different
	 *
	 * @param {*} value Name to set
	 * @param {*} autosave Save this change to the entity
	 */
	setDescription(value, autosave) {
		const oldValue = this.description;
		this.description = value;
		if (oldValue !== value && autosave) {
			this._specialization.setDescription(value);
		}
	}

	setActivities(activities) {
		this.activities = activities;
	}

	/**
	 * Add activities to the collection
	 *
	 * @param {*} activityKeys Array of activity keys
	 */
	async addActivities(activityKeys) {
		const addAction = this._actionCollectionEntity.getExecuteMultipleAction();
		const fields = [{ name: 'actionStates', value: activityKeys }];
		await this._sirenProvider.performAction(this.token, addAction, fields, true);
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
		if (this.activities.length - 1 === 0) {
			this.setIsVisible(false);
		}
	}

	// reorderActivity(activityToMove, activityBefore) {
	// 	//
	// }

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
	setDescription: action,
	setName: action,
	addActivity: action,
	removeActivity: action,
	reorderActivity: action,
	setActivities: action,
	setCandidatesAreLoaded: action
});

