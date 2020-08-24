import { Assignment } from './assignment.js';
import { AssignmentActivityUsage } from './assignment-activity-usage.js';
import { ObjectStore } from '../../state/object-store.js';

export class AssignmentStore {
	constructor() {
		this._assignments = new ObjectStore(Assignment);
		this._activities = new ObjectStore(AssignmentActivityUsage);
	}

	clear() {
		this._assignments.clear();
		this._activities.clear();
	}

	fetchActivity(href, token) {
		return this._activities.fetch(href, token);
	}

	fetchAssignment(href, token) {
		return this._assignments.fetch(href, token);
	}

	getActivity(href) {
		return this._activities.get(href);
	}

	getAssignment(href) {
		return this._assignments.get(href);
	}

	put(href, object) {
		this._assignments.put(href, object);
	}
}

export const shared = new AssignmentStore();
export const { _assignments: assignments } = shared;
