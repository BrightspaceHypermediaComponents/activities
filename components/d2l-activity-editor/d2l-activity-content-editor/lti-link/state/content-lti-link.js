import { action, configure as configureMobx, decorate, observable } from 'mobx';
import { ContentLTILinkEntity } from 'siren-sdk/src/activities/content/ContentLTILinkEntity.js';
import { ContentLTILinkFrameOptionsEntity } from 'siren-sdk/src/activities/content/ContentLTILinkFrameOptionsEntity.js';
import { fetchEntity } from '../../../state/fetch-entity.js';

configureMobx({ enforceActions: 'observed' });

export class ContentLTILink {

	constructor(href, token) {
		this.href = href;
		this.token = token;
		this.title = '';
		this.link = '';
		this.isExternalResource = false;
	}

	async cancelCreate() {
		await this._contentLTILink.deleteLTILink();
	}

	async canEmbedIframe() {
		const frameOptionsEntityHref = this._contentLTILink.getFrameOptionsHref();

		if (!frameOptionsEntityHref) {
			return true;
		}

		const frameOptionsResponse = await fetchEntity(frameOptionsEntityHref, this.token);

		if (!frameOptionsResponse) {
			return true;
		}

		const frameOptionsEntity = new ContentLTILinkFrameOptionsEntity(frameOptionsResponse, this.token, { remove: () => { } });
		return (frameOptionsEntity.canBeEmbedded() !== undefined) ? frameOptionsEntity.canBeEmbedded() : true;
	}

	get dirty() {
		return !this._contentLTILink.equals(this._makeLTILinkData());
	}

	async fetch() {
		const sirenEntity = await fetchEntity(this.href, this.token);
		if (sirenEntity) {
			const entity = new ContentLTILinkEntity(sirenEntity, this.token, { remove: () => { } });
			this.load(entity);
		}
		return this;
	}

	load(ltiLinkEntity) {
		this._contentLTILink = ltiLinkEntity;
		this.title = ltiLinkEntity.title();
		this.link = ltiLinkEntity.url();
		this.isExternalResource = ltiLinkEntity.isExternalResource();
	}

	async save() {
		if (!this._contentLTILink) {
			return;
		}

		await this._contentLTILink.setLTILinkTitle(this.title);
		await this._contentLTILink.setLTILinkExternalResource(this.isExternalResource);
		await this.fetch();
	}

	setExternalResource(value) {
		this.isExternalResource = value;
	}

	setTitle(value) {
		this.title = value;
	}

	_makeLTILinkData() {
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

decorate(ContentLTILink, {
	// props
	title: observable,
	link: observable,
	isExternalResource: observable,
	// actions
	load: action,
	setTitle: action,
	setExternalResource: action
});
