import { ObjectStore } from '../../state/object-store.js';
import { Quiz } from './quiz.js';
import { QuizTiming } from './quiz-timing.js';

export class QuizStore extends ObjectStore {
	constructor() {
		super(Quiz);
	}
}

export class QuizTimingStore extends ObjectStore {
	constructor() {
		super(QuizTiming);
	}
}

export const shared = new QuizStore();
export const sharedTiming = new QuizTimingStore();
