import { GradeCandidateCollection } from './grade-candidate-collection.js';
import { ObjectStore } from '../../state/object-store.js';

export class GradeCandidateCollectionStore extends ObjectStore {
	constructor() {
		super(GradeCandidateCollection);
	}
}

export const shared = new GradeCandidateCollectionStore();
