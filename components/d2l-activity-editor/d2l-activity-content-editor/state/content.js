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
		this.moduleDescriptionRichText = '';
	}

	cancelCreate() {
		// This is the function that is called when cancelling the creation of a NEW content item
		// TODO - add functionality to delete created activity and navigate back to lessons
		return;
	}

	get dirty() {
		return !this._contentModule.equals(this._makeModuleData());
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
		if (this.contentModuleHref) {
			this.fetchContentModule();
		}
	}

	loadContentModule(moduleEntity) {
		this._contentModule = moduleEntity;
		this.moduleTitle = moduleEntity.title();
		this.moduleDescriptionRichText = moduleEntity.descriptionRichText();
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
decorate(Content, {
	// props
	moduleTitle: observable,
	moduleDescriptionRichText: observable,
	// actions
	load: action,
	loadContentModule: action,
	setTitle: action,
	setDescription: action,
});
