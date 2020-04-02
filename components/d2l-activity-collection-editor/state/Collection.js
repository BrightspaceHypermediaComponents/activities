import { action, configure as configureMobx, decorate, observable, runInAction } from 'mobx';
import { entityFactory, dispose } from '../es6/EntityFactory.js';
import { NamedEntityMixin } from 'siren-sdk/src/entityAddons/named-entity-mixin.js';
import { DescribableEntityMixin } from 'siren-sdk/src/entityAddons/describable-entity-mixin.js';
import { SimpleEntity } from 'siren-sdk/src/es6/SimpleEntity.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';

configureMobx({ enforceActions: 'observed' });

// ideally, this will extend Activity
export class Collection {
	constructor(href, token) {
		this._href = href;
		this._token = token;
		entityFactory(ActivityUsageEntity, href, token, this._onServerResponse.bind(this));
	}

	// called when we receive a response from the href
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

// handles cleanup and other things we don't want to deal with
// will need smart pointer approach
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
	// LitElement function called when a property changes
	shouldUpdate(changedProperties) {
		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this.dispose();
			this._makeState();
		}
		return this.href && this.token;
	}

	dispose() {
		// stuff
	}

	_makeState() {
		if (typeof this._stateType !== 'function') {
			return;
		}
		this._state = stateFactory(this._stateType, this.href, this.token);
	}

	_setStateType(type) {
		this._stateType = type;
	}
	// LitElement function called when connected to a document-connected element
	connectedCallback() {
		// connects the mobx state class
		// if it already exists, use that
		// otherwise make a new one

	}

	disconnectedCallback() {
		// clean up and call dispose on the instance of the
		// Collection instance, IF others are not using it
		// use a smart pointer to do this
		// deregister
	}
}

function stateFactory(stateType, href, token) {
	// TODO: add smart pointer reference counting stuff
	return new stateType(href, token);
}
