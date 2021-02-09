import { Assignment } from './assignment.js';
import { ObjectStore } from '../../state/object-store.js';

export class AssignmentStore extends ObjectStore {
	constructor() {
		super(Assignment);
	}
}

export const shared = new AssignmentStore();
