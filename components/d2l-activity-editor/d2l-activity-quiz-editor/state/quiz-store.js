import { ObjectStore } from '../../state/object-store.js';
import { Quiz } from './quiz.js';
import { QuizIpRestrictions } from './quiz-ipRestrictions';

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

export const shared = new QuizStore();
export const sharedIpRestrictions = new QuizIpRestrictionsStore();
