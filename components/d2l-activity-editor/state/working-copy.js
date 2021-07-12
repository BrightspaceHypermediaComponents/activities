import { action, configure as configureMobx, decorate } from 'mobx';
import { fetchEntity } from '../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class WorkingCopy {

	constructor(StateType, EntityType) {
		this.StateType = StateType;
		this.EntityType = EntityType;
		this._saving = null;
		this._checkedOut = null;
	}

	async checkin(store, refetch, skipStoringResult) {
		if (!this._entity) {
			return;
		}

		if (this._saving) {
			return this._saving;
		}

		this._saving = this._entity.checkin();
		let sirenEntity;
		try {
			sirenEntity = await this._saving;
		} catch (e) {
			return;
		} finally {
			this._saving = null;
		}

		if (!sirenEntity) return;
		const href = sirenEntity.self();
		if (!skipStoringResult) {
			const entity = new this.StateType(href, this.token);
			entity.load(sirenEntity);
			store.put(href, entity);
		}

		if (refetch) {
			this.fetch(true);
		}

		return { sirenEntity };
	}

	checkout(store, forcedCheckout) {
		if (!forcedCheckout && this._checkedOut) {
			return this._checkedOut;
		}

		let href = this.href;
		const getHrefPromise = this._entity.checkout().then(sirenEntity => {
			if (sirenEntity) {
				href = sirenEntity.self();
				const entity = new this.StateType(href, this.token);
				entity.load(sirenEntity);
				store.put(href, entity);
			}
			return href;
		}, () => {
			return href;
		});

		if (!forcedCheckout) {
			this._checkedOut = getHrefPromise;
		}

		return getHrefPromise;
	}

	async dirty(store) {
		const checkedOutHref = await this._checkedOut;
		const checkedOutEntity = store && store.get(checkedOutHref);

		// Check that this entity is not dirty, then check that it's checked out working copy does not have a `canCheckin` action.
		// It avoids recursively fetching a working copy's working copy by not passing in a store the second time.
		const isDirty = !this._entity.equals(this._makeEntityData()) || this._entity.canCheckin();
		const isCheckedOutEntityDirty = checkedOutEntity && await checkedOutEntity.dirty();

		return isDirty || isCheckedOutEntityDirty;
	}

	async fetch(bypassCache) {
		const sirenEntity = await fetchEntity(this.href, this.token, bypassCache);
		if (sirenEntity) {
			const entity = new this.EntityType(sirenEntity, this.token, { remove: () => { } });
			await this.load(entity);
		}
		return this;
	}

	async save(createSelectboxGradeItemEnabled) {
		if (!this._entity) {
			return;
		}

		if (this._saving) {
			return this._saving;
		}

		this._saving = this._entity.save(this._makeEntityData(), createSelectboxGradeItemEnabled);
		await this._saving;
		this._saving = null;

		await this.fetch();
	}

	_makeEntityData() { }
}

decorate(WorkingCopy, {
	// actions
	save: action,
	checkout: action,
	checkin: action
});
