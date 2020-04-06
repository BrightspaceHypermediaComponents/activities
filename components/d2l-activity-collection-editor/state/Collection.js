import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { entityFactory, dispose } from 'siren-sdk/src/es6/EntityFactory.js';
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

		entityFactory(ActivityUsageEntity, href, token, this._onServerResponse.bind(this));
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
			//do something with it
		}
		this._usage = usage;
		usage.onSpecializationChange(NamedEntityMixin(DescribableEntityMixin(SimpleEntity)), (specialization) => {
			this._specialization = specialization;
			this.setName(specialization.getName());
			this.setDescription(specialization.getDescription());
		});

		this.isVisible = !usage.isDraft();
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
				item.onActivityUsageChange((usage) => {
					usage.onOrganizationChange((organization) => {
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
		const resp = await performSirenAction(this._token, action, fields, true);
		// selfless entity - cannot be made with entity factory
		this._actionCollectionEntity = new ActionCollectionEntity(this._collection, resp);

		const newCandidates = [];
		const imageChunk = this._loadedImages.length;
		this._loadedImages[imageChunk] = { loaded: 0, total: null };
		let totalInLoadingChunk = 0;
		this._actionCollectionEntity._items().forEach(item => {
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

	setIsVisible(value) {
		this.isVisible = value;
		this._usage.setDraftStatus(!value);
	}

	setIsLoaded(value) {
		this.isLoaded = value;
	}

	setName(value) {
		const oldValue = this.name;
		this.name = value.trim();
		if (oldValue !== value) {
			this._specialization.setName(value);
		}
	}

	setDescription(value) {
		const oldValue = this.description;
		this.description = value;
		if (oldValue !== value) {
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
	 * @memberof Collection
	 */
	async addActivities(activityKeys) {
		const addAction = this._actionCollectionEntity.getExecuteMultipleAction();
		const fields = [{ name: 'actionStates', value: activityKeys }];
		await performSirenAction(this.token, addAction, fields, true);
	}

	/**
	 * Removes an activity from the collection.
	 * Sets the visibility to hidden if this results in an empty
	 * collection
	 *
	 * @param {*} activity
	 * @memberof Collection
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

/**
 * Handles the connection between the LitElement component and the shared
 * state smart pointer, as well as cleanup
 *
 * @export
 */
export const MobxMixin = superclass => class extends superclass {
	static get properties() {
		return {
			href: {
				type: String,
				reflect: true
			},
			/**
			 * Token JWT Token for brightspace | a function that returns a JWT token for brightspace | null (defaults to cookie authentication in a browser)
			 */
			token: { type: String },
		};
	}

	/**
	 * Lit-Element function called whenever properties are changed
	 *
	 * @param {*} changedProperties
	 * @returns {boolean} true if both href and token are set
	 * @memberof MobxMixin
	 */
	shouldUpdate(changedProperties) {
		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this.dispose();
			this._makeState();
		}
		return this.href && this.token;
	}
	/**
	 * Removes the reference to the state associated with the component
	 * Disposes the entity if there are no more references.
	 * @memberof MobxMixin
	 */
	dispose() {
		sharedState.removeRef();
		if (sharedState.refCount() === 0) {
			dispose(this._entity);
			this._state = null;
		}
	}

	/**
	 * Attaches the global state to the object if it exists.
	 * Creates a new global state object if needed
	 *
	 * @returns
	 * @memberof MobxMixin
	 */
	_makeState() {
		if (sharedState) {
			this._state = sharedState.ref;
			sharedState.addRef();
			return;
		}
		if (typeof this._stateType !== 'function') {
			throw Error('State creation failed - state type has no constructor');
		}
		this._state = stateFactory(this._stateType, this.href, this.token);
	}

	_setStateType(type) {
		this._stateType = type;
	}

	/**
	 * LitElement lifecycle event. Connects the component to the state
	 *
	 * @memberof MobxMixin
	 */
	connectedCallback() {
		super.connectedCallback();
		this._makeState();
	}

	/**
	 * Cleanup for disconnected lifecycle event
	 * de-registers the state
	 *
	 * @memberof MobxMixin
	 */
	disconnectedCallback() {
		this.dispose();
		super.disconnectedCallback();
	}
};

/**
 * Create a new state of the specified type
 *
 * @param {*} stateType Type of state object to create
 * @param {*} href Entity href
 * @param {*} token Entity token
 * @returns The state object of the given type
 */
function stateFactory(stateType, href, token) {
	sharedState = smartPointer(new stateType(href, token));
	return sharedState.ref;
}

/**
 * Creates a smart pointer allowing reference counting
*/
const smartPointer = (ref) => (function() {
	let refCount = 1;
	return {
		addRef: () => ++refCount,
		removeRef: () => --refCount,
		refCount: () => refCount,
		ref: ref,
	};
})();

// Global shared state smart pointer. Begins as null so we may dynamically
// create the state type
export let sharedState = null;
