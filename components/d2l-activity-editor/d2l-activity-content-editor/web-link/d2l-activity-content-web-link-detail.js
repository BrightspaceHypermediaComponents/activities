import '../shared-components/d2l-activity-content-editor-due-date.js';
import '../shared-components/d2l-activity-content-editor-title.js';
import './d2l-activity-content-web-link-url-preview.js';
import './d2l-activity-content-editor-link.js';
import { activityContentEditorStyles } from '../shared-components/d2l-activity-content-editor-styles.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { ContentWebLinkEntity } from 'siren-sdk/src/activities/content/ContentWebLinkEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { html } from 'lit-element/lit-element.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as webLinkStore } from './state/content-web-link-store.js';

class ContentWebLinkDetail extends SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(EntityMixinLit(RtlMixin(ActivityEditorMixin(MobxLitElement)))))) {

	static get properties() {
		return {
			activityUsageHref: { type: String }
		};
	}

	static get styles() {
		return  [
			super.styles,
			labelStyles,
			activityContentEditorStyles
		];
	}

	constructor() {
		super(webLinkStore);
		this._debounceJobs = {};
		this._setEntityType(ContentWebLinkEntity);
		this.skeleton = true;
		this.saveOrder = 500;
	}

	connectedCallback() {
		super.connectedCallback();
		this.saveTitle = this.saveTitle.bind(this);
		this.saveLink = this.saveLink.bind(this);
	}

	render() {
		const webLinkEntity = webLinkStore.getContentWebLinkActivity(this.href);
		if (webLinkEntity) {
			this.skeleton = false;
		}

		return html`
			<d2l-activity-content-editor-title
				.entity=${webLinkEntity}
				.onSave=${this.saveTitle}
				?skeleton="${this.skeleton}"
			>
			</d2l-activity-content-editor-title>
			<d2l-activity-content-editor-due-date
				.href="${this.activityUsageHref}"
				.token="${this.token}"
				?skeleton="${this.skeleton}"
				expanded="true"
			>
			</d2l-activity-content-editor-due-date>
			<d2l-activity-content-editor-link
				.entity=${webLinkEntity}
				.onSave=${this.saveLink}
				?skeleton="${this.skeleton}"
			>
			</d2l-activity-content-editor-link>

			<d2l-activity-content-web-link-url-preview
				.entity=${webLinkEntity}
				?skeleton="${this.skeleton}"
			>
			</d2l-activity-content-web-link-url-preview>
		`;
	}

	async cancelCreate() {
		const webLinkEntity = webLinkStore.getContentWebLinkActivity(this.href);
		if (!webLinkEntity) {
			return;
		}

		await webLinkEntity.cancelCreate();
	}

	hasPendingChanges() {
		const webLinkEntity = webLinkStore.getContentWebLinkActivity(this.href);
		if (!webLinkEntity) {
			return false;
		}
		return webLinkEntity.dirty;
	}

	async save() {
		const webLinkEntity = webLinkStore.getContentWebLinkActivity(this.href);
		if (!webLinkEntity) {
			return;
		}

		const originalActivityUsageHref = this.activityUsageHref;
		const updatedEntity = await webLinkEntity.save();
		const event = new CustomEvent('d2l-content-working-copy-committed', {
			detail: {
				originalActivityUsageHref: originalActivityUsageHref,
				updatedActivityUsageHref: updatedEntity.getActivityUsageHref()
			},
			bubbles: true,
			composed: true,
			cancelable: true
		});
		await this.dispatchEvent(event);
	}

	saveLink(link, isExternal) {
		const webLinkEntity = webLinkStore.getContentWebLinkActivity(this.href);
		if (!webLinkEntity) {
			return;
		}

		webLinkEntity.setLink(link);
		webLinkEntity.setExternalResource(isExternal);
	}

	saveTitle(title) {
		const webLinkEntity = webLinkStore.getContentWebLinkActivity(this.href);
		if (!webLinkEntity) {
			return;
		}
		webLinkEntity.setTitle(title);
	}
}

customElements.define('d2l-activity-content-web-link-detail', ContentWebLinkDetail);
