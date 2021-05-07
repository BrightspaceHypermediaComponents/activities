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
		this.fileContent = null;
		this.fileType = null;
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
			let fileContent = '';

			entity = await this._checkout(entity);

			if(!this._isNewFile(entity)) { //this needs to die 
				const fileEntityHref = await fetchEntity(entity.getFileHref(), this.token);
				const fileEntity = new FileEntity(fileEntityHref, this.token, { remove: () => { } });
				const fileContentFetchResponse = await fetch(fileEntity.getFileLocationHref()); 
				fileContent = await fileContentFetchResponse.text();
			}

			this.load(entity, fileContent);
		}
		return this;
	}

	load(contentFileEntity, fileContent = null) {
		this._contentFile = contentFileEntity;
		this.title = contentFileEntity.title();
		this.fileContent = fileContent;
		this.fileType = contentFileEntity.getFileType();
	}

	async save() {
		if (!this._contentFile) {
			return;
		}

		await this._contentFile.setFileTitle(this.title);
		
		if (this._contentFile.getFileType() === FILE_TYPES.html) {
			let htmlEntity = new ContentHtmlFileEntity(this._contentFile, this.token, { remove: () => { } });
			await htmlEntity.setHtmlFileHtmlContent(this.htmlContent);
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

	_isNewFile(entity) { //ewwwwwwwwwwwwwwwwwww
		let url = new URL(entity.self());
		return url.pathname.includes('-1');
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
