import { Assignment } from './assignment.js';
import { AssignmentCategories } from './assignment-categories';
import { ObjectStore } from '../../state/object-store.js';

export class AssignmentStore extends ObjectStore {
	constructor() {
		super(Assignment);
	}
}

export class AssignmentCategoriesStore extends ObjectStore {
	constructor() {
		super(AssignmentCategories);
	}
}

export const shared = new AssignmentStore();
export const sharedCategories = new AssignmentCategoriesStore();
