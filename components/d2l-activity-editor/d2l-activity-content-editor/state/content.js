import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { ContentEntity } from 'siren-sdk/src/activities/content/ContentEntity.js';
import { ContentModuleEntity } from 'siren-sdk/src/activities/content/ContentModuleEntity.js';
import { fetchEntity } from '../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class Content {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.contentModuleHref = '';
		this.moduleTitle = '';
		this.moduleDescriptionText = '';
		this.moduleDescriptionHtml = '';
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new ContentEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}
		return this;
	}

	async fetchContentModule() {
		const sirenEntity = await fetchEntity(this.contentModuleHref, this.token);
		if (sirenEntity) {
			const entity = new ContentModuleEntity(sirenEntity, this.token, { remove: () => { } });
			this.loadContentModule(entity);
		}
		return this;
	}

	load(contentEntity) {
		this._entity = contentEntity;
		this.contentModuleHref = contentEntity.getModuleHref();
		if (this.contentModuleHref !== '') {
			this.fetchContentModule();
		}
	}

	loadContentModule(moduleEntity) {
		this._contentModule = moduleEntity;
		this.moduleTitle = moduleEntity.title();
		this.moduleDescriptionText = moduleEntity.descriptionText();
		this.moduleDescriptionHtml = moduleEntity.descriptionHtml();
	}

	async save() {
		if (!this._contentModule) {
			return;
		}

		await this._contentModule.setModuleTitle(this.moduleTitle);

		await this.fetch();
	}

	setTitle(value) {
		this.moduleTitle = value;
	}

}

decorate(Content, {
	// props
	moduleTitle: observable,
	moduleDescriptionText: observable,
	moduleDescriptionHtml: observable,
	// actions
	load: action,
	loadContentModule: action,
	setTitle: action,
});
