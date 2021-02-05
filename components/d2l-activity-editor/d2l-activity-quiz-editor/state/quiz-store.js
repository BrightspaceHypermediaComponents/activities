import { ObjectStore } from '../../state/object-store.js';
import { Quiz } from './quiz.js';
import { QuizIpRestrictions } from './quiz-ipRestrictions';
import { QuizTiming } from './quiz-timing.js';

export class QuizStore extends ObjectStore {
	constructor() {
		super(Quiz);
	}
}

export class QuizIpRestrictionsStore extends ObjectStore {
	constructor() {
		super(QuizIpRestrictions);
	}
}
export class QuizTimingStore extends ObjectStore {
	constructor() {
		super(QuizTiming);
	}
}

export const shared = new QuizStore();
export const sharedIpRestrictions = new QuizIpRestrictionsStore();
export const sharedTiming = new QuizTimingStore();
