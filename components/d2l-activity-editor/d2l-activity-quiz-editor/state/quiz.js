import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { fetchEntity } from '../../state/fetch-entity.js';
import { QuizEntity } from 'siren-sdk/src/activities/quizzes/QuizEntity.js';

configureMobx({ enforceActions: 'observed' });

export class Quiz {
	constructor(href, token) {
		this.href = href;
		this.token = token;
		this._saving = null;
	}

	get dirty() {
		return !this._entity.equals(this._makeQuizData());
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new QuizEntity(sirenEntity, this.token, {
				remove: () => { },
			});
			this.load(entity);
		}
		return this;
	}

	load(entity) {
		this._entity = entity;
		this.name = entity.name();
		this.canEditName = entity.canEditName();
	}

	async save() {
		if (!this._entity) {
			return;
		}

		if (this._saving) {
			return this._saving;
		}

		// TODO: This method should handle saving all updated fields instead of just the quiz name
		this._saving = this._entity.setName(this.name);
		await this._saving;
		this._saving = null;

		await this.fetch();
	}

	setName(value) {
		this.name = value;
	}

	_makeQuizData() {
		/* NOTE: if you add fields here, please make sure you update the corresponding equals method in siren-sdk.
					 The cancel workflow is making use of that to detect changes.
		*/
		const data = {
			name: this.name
		};

		return data;
	}
}

decorate(Quiz, {
	// props
	name: observable,
	canEditName: observable,
	// actions
	load: action,
	setName: action,
	save: action,
});
