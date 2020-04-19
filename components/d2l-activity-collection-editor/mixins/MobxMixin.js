
import { dispose } from 'siren-sdk/src/es6/EntityFactory.js';
/**
 * Handles the connection between the LitElement component and the shared
 * state smart pointer, as well as cleanup
 *
 * @export
 */
export const MobxMixin = superclass => class extends superclass {
	/**
	 * LitElememnt function that declares properties. When a declared property
	 * changes, LitElement will schedule an update.
	 * https://lit-element.polymer-project.org/guide/properties#declare
	 *
	 * @readonly
	 * @static
	 */
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
	 * Results in an update if true
	 *
	 * @param {*} changedProperties
	 * @returns {boolean} true if both href and token exist
	 */
	shouldUpdate(changedProperties) {
		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this.dispose();
			this._makeState();
		}
		return this.href && this.token ? true : false;
	}
	/**
	 * Removes the reference to the state associated with the component
	 * Disposes the entity if there are no more references.
	 */
	dispose() {
		if (!sharedState || !sharedState.refCount()) {
			return;
		}
		sharedState.removeRef();
		if (sharedState.refCount() === 0) {
			dispose(this._state._entity);
			sharedState = null;
		}
		this._state = null;
	}

	/**
	 * Attaches the global state to the object if it exists.
	 * Creates a new global state object if needed
	 */
	_makeState() {
		if (sharedState) {
			this._state = sharedState.ref;
			sharedState.addRef();
			return;
		}
		this._state = stateFactory(this._stateType, this.href, this.token);
	}

	_setStateType(type) {
		if (typeof type !== 'function') {
			throw new StateError('State type has no constructor');
		}
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

class StateError extends Error {
	constructor(message) {
		super(message);
		this.name = 'StateError';
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
let sharedState = null;
