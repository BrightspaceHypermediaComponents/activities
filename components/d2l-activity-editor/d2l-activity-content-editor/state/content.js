import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { CONTENT_TYPES, ContentEntity } from 'siren-sdk/src/activities/content/ContentEntity.js';
import { ContentModuleEntity } from 'siren-sdk/src/activities/content/ContentModuleEntity.js';
import { fetchEntity } from '../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class Content {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.entityType = null;
		this.moduleTitle = '';
		this.moduleDescriptionRichText = '';
	}

	cancelCreate() {
		// This is the function that is called when cancelling the creation of a NEW content item
		// TODO - add functionality to delete created activity
		return;
	}

	get dirty() {
		// TODO add more dirty checks as we add more content types
		if (this.entityType === CONTENT_TYPES.module) {
			return !this._contentModule.equals(this._makeModuleData());
		}
		return false;
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new ContentEntity(sirenEntity, this.token, { remove: () => { } });
			await this.load(entity);
		}
		return this;
	}

	async fetchContentModule() {
		const sirenEntity = await fetchEntity(this._contentModuleHref, this.token);
		if (sirenEntity) {
			const entity = new ContentModuleEntity(sirenEntity, this.token, { remove: () => { } });
			this.loadContentModule(entity);
		}
		return this;
	}

	async load(contentEntity) {
		this._entity = contentEntity;
		this._contentModuleHref = contentEntity.getModuleHref();
		this.entityType = contentEntity.getEntityType();
		if (this._contentModuleHref && this.entityType === CONTENT_TYPES.module) {
			await this.fetchContentModule();
		}
	}

	loadContentModule(moduleEntity) {
		this._contentModule = moduleEntity;
		this.moduleTitle = moduleEntity.title();
		this.moduleDescriptionRichText = moduleEntity.descriptionRichText();
	}

	async save() {
		// TODO add more save functions as we add more content types
		if (this.entityType === CONTENT_TYPES.module) {
			await this.saveContentModule();
		}
	}

	async saveContentModule() {
		if (!this._contentModule) {
			return;
		}
		await this._contentModule.setModuleTitle(this.moduleTitle);
		await this._contentModule.setModuleDescription(this.moduleDescriptionRichText);
		await this.fetch();
	}

	setDescription(richText) {
		if (this.entityType === CONTENT_TYPES.module) {
			this.moduleDescriptionRichText = richText;
		}
	}

	setTitle(value) {
		if (this.entityType === CONTENT_TYPES.module) {
			this.moduleTitle = value;
		}
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
decorate(Content, {
	// props
	entityType: observable,
	moduleTitle: observable,
	moduleDescriptionRichText: observable,
	// actions
	load: action,
	loadContentModule: action,
	setTitle: action,
	setDescription: action,
});
