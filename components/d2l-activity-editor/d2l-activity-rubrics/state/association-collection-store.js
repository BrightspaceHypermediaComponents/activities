import { AssociationCollection } from './association-collection.js';
import { ObjectStore } from '../../state/object-store.js';

export class AssociationCollectionStore extends ObjectStore {
	constructor() {
		super(AssociationCollection);
	}

}

export default new AssociationCollectionStore();
