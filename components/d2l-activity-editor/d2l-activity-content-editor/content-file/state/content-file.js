import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { ContentFileEntity, FILE_TYPES } from 'siren-sdk/src/activities/content/ContentFileEntity.js';
import { ContentHtmlFileEntity } from 'siren-sdk/src/activities/content/ContentHtmlFileEntity.js';
import { FileEntity } from 'siren-sdk/src/files/FileEntity.js';
import { fetchEntity } from '../../../state/fetch-entity.js';
// TODO: Explore idea of using this shared WorkingCopy
// import { WorkingCopy } from '../../../state/working-copy.js';

configureMobx({ enforceActions: 'observed' });

export class ContentFile {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.title = '';
		this.htmlContent = null;
	}

	async cancelCreate() {
		await this._contentFile.deleteFile();
	}

	get dirty() {
		return !this._contentFile.equals(this._makeContentFileData());
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			let entity = new ContentFileEntity(sirenEntity, this.token, { remove: () => { } });

			if (entity.getFileType() === FILE_TYPES.html) {
				entity = new ContentHtmlFileEntity(entity, this.token, { remove: () => { } });
				entity = await this._checkout(entity);
	
				const fileEntityHref = await fetchEntity(entity.getFileHref(), this.token);
				const fileEntity = new FileEntity(fileEntityHref, this.token, { remove: () => { } });
				const htmlContentFetchResponse = await fetch(fileEntity.getFileLocationHref()); 
				const htmlContent = await htmlContentFetchResponse.text();
				this.load(entity, htmlContent);
			} else {
				entity = await this._checkout(entity);
				this.load(entity);
			}
		}
		return this;
	}

	load(contentFileEntity, htmlContent = null) {
		this._contentFile = contentFileEntity;
		this.title = contentFileEntity.title();
		if (htmlContent && this._contentFile.getFileType() === FILE_TYPES.html) {
			this.htmlContent = htmlContent;
		}
	}

	async save() {
		if (!this._contentFile) {
			return;
		}

		await this._contentFile.setFileTitle(this.title);
		
		if (this._contentFile.getFileType() === FILE_TYPES.html) {
			await this._contentFile.setHtmlFileHtmlContent(this.htmlContent);
		}

		const committedContentFileEntity = await this._commit(this._contentFile);
		const editableContentFileEntity = await this._checkout(committedContentFileEntity);
		this.load(editableContentFileEntity);
	}

	setTitle(value) {
		this.title = value;
	}

	setPageContent(pageContent) {
		this.htmlContent = pageContent;
	}

	async _checkout(contentFileEntity) {
		if (!contentFileEntity) {
			return;
		}

		const sirenEntity = await contentFileEntity.checkout();
		if (!sirenEntity) {
			return contentFileEntity;
		}
		
		let entity = new ContentFileEntity(sirenEntity, this.token, { remove: () => { } });
		if (entity.getFileType() === FILE_TYPES.html) {
			return new ContentHtmlFileEntity(sirenEntity, this.token, { remove: () => { } });
		}
		return entity;
	}

	async _commit(contentFileEntity) {
		if (!contentFileEntity) {
			return;
		}

		const sirenEntity = await contentFileEntity.commit();
		if (!sirenEntity) {
			return contentFileEntity;
		}
		
		let entity = new ContentFileEntity(sirenEntity, this.token, { remove: () => { } });
		if (entity.getFileType() === FILE_TYPES.html) {
			return new ContentHtmlFileEntity(sirenEntity, this.token, { remove: () => { } });
		}
		return entity;
	}

	_makeContentFileData() {
		/* NOTE: if you add fields here, please make sure you update the corresponding equals method in siren-sdk.
			The cancel workflow is making use of that to detect changes.
		*/
		return {
			title: this.title,
		};
	}
}

decorate(ContentFile, {
	// props
	title: observable,
	// actions
	load: action,
	setTitle: action,
});
