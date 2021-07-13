import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { ContentWebLinkEntity } from 'siren-sdk/src/activities/content/ContentWebLinkEntity.js';
import { fetchEntity } from '../../../state/fetch-entity.js';
// TODO: Explore idea of using this shared WorkingCopy
// import { WorkingCopy } from '../../../state/working-copy.js';

configureMobx({ enforceActions: 'observed' });

export class ContentWebLink {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.title = '';
		this.link = '';
		this.isExternalResource = false;
		this.activityUsageHref = '';
	}

	async cancelCreate() {
		await this._contentWebLink.deleteWebLink();
	}

	get dirty() {
		return !this._contentWebLink.equals(this._makeWebLinkData());
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			let entity = new ContentWebLinkEntity(sirenEntity, this.token, { remove: () => { } });
			entity = await this._checkout(entity);
			this.load(entity);
		}

		return this;
	}

	load(webLinkEntity) {
		this._contentWebLink = webLinkEntity;
		this.href = webLinkEntity.self();
		this.title = webLinkEntity.title();
		this.link = webLinkEntity.url();
		this.isExternalResource = webLinkEntity.isExternalResource();
		this.activityUsageHref = webLinkEntity.getActivityUsageHref();
	}

	async save() {
		if (!this._contentWebLink) {
			return;
		}

		await this._contentWebLink.setWebLinkTitle(this.title);
		await this._contentWebLink.setWebLinkUrl(this.link);
		await this._contentWebLink.setWebLinkExternalResource(this.isExternalResource);
		const committedWebLinkEntity = await this._commit(this._contentWebLink);
		const editableWebLinkEntity = await this._checkout(committedWebLinkEntity);
		this.load(editableWebLinkEntity);

		return this._contentWebLink;
	}

	setExternalResource(value) {
		this.isExternalResource = value;
	}

	setLink(value) {
		this.link = value;
	}

	setTitle(value) {
		this.title = value;
	}

	async _checkout(webLinkEntity) {
		if (!webLinkEntity) {
			return;
		}

		const sirenEntity = await webLinkEntity.checkout();
		if (!sirenEntity) {
			return webLinkEntity;
		}

		return new ContentWebLinkEntity(sirenEntity, this.token, { remove: () => { } });
	}

	async _commit(webLinkEntity) {
		if (!webLinkEntity) {
			return;
		}

		const sirenEntity = await webLinkEntity.commit();
		if (!sirenEntity) {
			return webLinkEntity;
		}

		return new ContentWebLinkEntity(sirenEntity, this.token, { remove: () => { } });
	}

	_makeWebLinkData() {
		/* NOTE: if you add fields here, please make sure you update the corresponding equals method in siren-sdk.
			The cancel workflow is making use of that to detect changes.
		*/
		return {
			title: this.title,
			url: this.link,
			isExternalResource: this.isExternalResource
		};
	}
}

decorate(ContentWebLink, {
	// props
	title: observable,
	link: observable,
	isExternalResource: observable,
	// actions
	load: action,
	setTitle: action,
	setLink: action,
	setExternalResource: action
});
