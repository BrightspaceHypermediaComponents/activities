import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { ContentModuleEntity } from 'siren-sdk/src/activities/content/ContentModuleEntity.js';
import { fetchEntity } from '../../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class ContentModule {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.moduleTitle = '';
		this.moduleDescriptionRichText = '';
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
		this.moduleTitle = moduleEntity.title();
		this.moduleDescriptionRichText = moduleEntity.descriptionRichText();
	}

	async save() {
		if (!this._contentModule) {
			return;
		}
		await this._contentModule.setModuleTitle(this.moduleTitle);
		await this._contentModule.setModuleDescription(this.moduleDescriptionRichText);
	}

	setDescription(richText) {
		this.moduleDescriptionRichText = richText;
	}

	setTitle(value) {
		this.moduleTitle = value;
	}

	_makeModuleData() {
		/* NOTE: if you add fields here, please make sure you update the corresponding equals method in siren-sdk.
			The cancel workflow is making use of that to detect changes.
		*/
		return {
			title: this.moduleTitle,
			descriptionRichText: this.moduleDescriptionRichText
		};
	}
}
decorate(ContentModule, {
	// props
	moduleTitle: observable,
	moduleDescriptionRichText: observable,
	// actions
	load: action,
	setTitle: action,
	setDescription: action,
});
