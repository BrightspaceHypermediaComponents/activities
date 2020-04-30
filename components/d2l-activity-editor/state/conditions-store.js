import { Conditions } from './conditions.js';
import { ObjectStore } from './object-store.js';

export class ConditionsStore extends ObjectStore {

	constructor() {

		super(Conditions);
	}
}

export default new ConditionsStore();
