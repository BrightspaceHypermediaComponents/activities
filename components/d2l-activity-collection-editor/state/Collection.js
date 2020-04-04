import { action, configure as configureMobx, decorate, observable, runInAction } from 'mobx';
import { entityFactory, dispose } from 'siren-sdk/src/es6/EntityFactory.js';
import { NamedEntityMixin } from 'siren-sdk/src/entityAddons/named-entity-mixin.js';
import { DescribableEntityMixin } from 'siren-sdk/src/entityAddons/describable-entity-mixin.js';
import { SimpleEntity } from 'siren-sdk/src/es6/SimpleEntity.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';

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
		usage.onSpecializationChange(NamedEntityMixin(DescribableEntityMixin(SimpleEntity)), (specialization) => {
			this._specialization = specialization;
			setName(specialization.getName());
			setDescription(specialization.getDescription());
		});

		await usage.subEntitiesLoaded();
		setIsLoaded(true);
	}

	save() {
		// in theory this will later send a single "publish" request
		// to the new 'draft' state API
		this._specialization.setName(this.name);
		this._specialization.setDescription(this.description);
	}

	// to be called whenever the user changes an input
	validate() {

	}

	setIsLoaded(value) {
		this.isLoaded = value;
	}

	setName(value) {
		this.name = value.trim();
	}

	setDescription(value) {
		this.description = value;
	}

	addActivity(activity) {
		//
	}

	removeActivity(activity) {
		//
	}

	reorderActivity(activityToMove, activityBefore) {
		//
	}
}

decorate(Collection, {
	name: observable,
	description: observable,
	isLoaded: observable,
	setTitle: action,
	setDescription: action,
	addActivity: action,
	removeActivity: action,
	reorderActivity: action
});

/**
 * Handles the connection between the LitElement component and the shared
 * state smart pointer, as well as cleanup
 *
 * @export
 * @class MobxMixin
 */
export class MobxMixin {
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
		shared.removeRef();
		if (shared.refCount() === 0){
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
		if (shared) {
			this._state = shared.ref;
			shared.addRef();
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
		super.disconnectedCallback();
		this.dispose();
	}
}

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
