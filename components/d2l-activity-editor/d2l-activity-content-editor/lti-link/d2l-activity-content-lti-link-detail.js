import '../shared-components/d2l-activity-content-editor-title.js';
import './d2l-activity-content-lti-link-options.js';
import './d2l-activity-content-lti-link-external-activity.js';
import { css, html } from 'lit-element/lit-element.js';
import { activityContentEditorStyles } from '../shared-components/d2l-activity-content-editor-styles.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { ContentLTILinkEntity } from 'siren-sdk/src/activities/content/ContentLTILinkEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { shared as ltiLinkStore } from './state/content-lti-link-store.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ContentLTILinkDetail extends SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(EntityMixinLit(RtlMixin(ActivityEditorMixin(MobxLitElement)))))) {

	static get properties() {
		return {
			activityUsageHref: { type: String },
		};
	}

	static get styles() {
		return  [
			super.styles,
			labelStyles,
			activityContentEditorStyles,
			css`
				d2l-activity-content-lti-link-external-activity {
					height: 100%;
					margin-top: 36px;
				}
			`,
		];
	}

	constructor() {
		super(ltiLinkStore);
		this._debounceJobs = {};
		this._setEntityType(ContentLTILinkEntity);
		this.skeleton = true;
		this.saveOrder = 2000;
		this.canEmbed = false;
	}

	connectedCallback() {
		super.connectedCallback();
		this.saveTitle = this.saveTitle.bind(this);
		this.saveLinkOptions = this.saveLinkOptions.bind(this);
	}

	render() {
		const ltiLinkEntity = ltiLinkStore.getContentLTILinkActivity(this.href);

		if (ltiLinkEntity) {
			this._canEmbedIframe().then(canEmbedIframe => {
				this.canEmbed = canEmbedIframe;
				this.skeleton = false;
			});
		}

		return html`
			<d2l-activity-content-editor-title
				.entity=${ltiLinkEntity}
				.onSave=${this.saveTitle}
				?skeleton="${this.skeleton}"
			>
			</d2l-activity-content-editor-title>
			<d2l-activity-content-editor-due-date
				.href="${this.activityUsageHref}"
				.token="${this.token}"
				?skeleton="${this.skeleton}"
				.expanded="true"
			>
			</d2l-activity-content-editor-due-date>

			<d2l-activity-content-lti-link-options
				.entity=${ltiLinkEntity}
				.onSave=${this.saveLinkOptions}
				?skeleton="${this.skeleton}"
				?showLinkOptions="${this.canEmbed}"
			>
			</d2l-activity-content-lti-link-options>

			<d2l-activity-content-lti-link-external-activity
				.entity=${ltiLinkEntity}
				?skeleton="${this.skeleton}"
				?showActivityPreview="${this.canEmbed}"
			>
			</d2l-activity-content-lti-link-external-activity>
		`;
	}

	async cancelCreate() {
		const ltiLinkEntity = ltiLinkStore.getContentLTILinkActivity(this.href);
		if (!ltiLinkEntity) {
			return;
		}

		await ltiLinkEntity.cancelCreate();
	}

	hasPendingChanges() {
		const ltiLinkEntity = ltiLinkStore.getContentLTILinkActivity(this.href);
		if (!ltiLinkEntity) {
			return false;
		}
		return ltiLinkEntity.dirty;
	}

	async save() {
		const ltiLinkEntity = ltiLinkStore.getContentLTILinkActivity(this.href);
		if (!ltiLinkEntity) {
			return;
		}

		await ltiLinkEntity.save();
	}

	saveLinkOptions(isExternalResource) {
		const ltiLinkEntity = ltiLinkStore.getContentLTILinkActivity(this.href);
		if (!ltiLinkEntity) {
			return;
		}
		ltiLinkEntity.setExternalResource(isExternalResource);
	}

	saveTitle(title) {
		const ltiLinkEntity = ltiLinkStore.getContentLTILinkActivity(this.href);
		if (!ltiLinkEntity) {
			return;
		}
		ltiLinkEntity.setTitle(title);
	}

	_canEmbedIframe() {
		const ltiLinkEntity = ltiLinkStore.getContentLTILinkActivity(this.href);
		if (!ltiLinkEntity) {
			return;
		}

		return ltiLinkEntity.canEmbedIframe();
	}
}

customElements.define('d2l-activity-content-lti-link-detail', ContentLTILinkDetail);
