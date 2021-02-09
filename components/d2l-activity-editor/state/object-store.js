import { action, decorate, observable } from 'mobx';

export class ObjectStore {
	constructor(Type) {
		this.Type = Type;
		this._fetches = new Map();
		this._objects = new Map();
	}

	clear() {
		this._objects.clear();
		this._fetches.clear();
	}
	async fetch(href, token) {
		let promise = this._fetches.get(href);
		if (!promise) {
			const object = new this.Type(href, token, this);

			promise = object.fetch();
			this._fetches.set(href, promise);

			try {
				await promise;
				this._objects.set(href, object);
			} catch (e) {
				this._fetches.delete(href);
			}
		}
		return promise;
	}

	get(href) {
		return this._objects.get(href);
	}

	put(href, object) {
		this._objects.set(href, object);
		this._fetches.set(href, Promise.resolve(object));
	}

	remove(href) {
		this._objects.delete(href);
		this._fetches.delete(href);
	}

}

decorate(ObjectStore, {
	// properties
	_objects: observable.shallow,
	// actions
	fetch: action,
	put: action,
	clear: action,
	remove: action
});

