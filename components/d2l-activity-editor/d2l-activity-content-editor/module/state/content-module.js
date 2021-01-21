import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { ContentModuleEntity } from 'siren-sdk/src/activities/content/ContentModuleEntity.js';
import { fetchEntity } from '../../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class ContentModule {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.title = '';
		this.descriptionRichText = '';
	}

	async cancelCreate() {
		await this._contentModule.deleteModule();
	}

	get dirty() {
		return !this._contentModule.equals(this._makeModuleData());
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new ContentModuleEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}
		return this;
	}

	load(moduleEntity) {
		this._contentModule = moduleEntity;
		this.title = moduleEntity.title();
		this.descriptionRichText = moduleEntity.descriptionRichText();
	}

	async save() {
		if (!this._contentModule) {
			return;
		}
		await this._contentModule.setModuleTitle(this.title);
		await this._contentModule.setModuleDescription(this.descriptionRichText);
		await this.fetch();
	}

	setDescription(richText) {
		this.descriptionRichText = richText;
	}

	setTitle(value) {
		this.title = value;
	}

	_makeModuleData() {
		/* NOTE: if you add fields here, please make sure you update the corresponding equals method in siren-sdk.
			The cancel workflow is making use of that to detect changes.
		*/
		return {
			title: this.title,
			descriptionRichText: this.descriptionRichText
		};
	}
}
decorate(ContentModule, {
	// props
	title: observable,
	descriptionRichText: observable,
	// actions
	load: action,
	setTitle: action,
	setDescription: action,
});
