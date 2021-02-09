import { ActivityUsage } from './activity-usage.js';
import { ObjectStore } from './object-store.js';

export class ActivityStore extends ObjectStore {
	constructor() {
		super(ActivityUsage);
	}
}

export const shared = new ActivityStore();
