import '../shared-components/d2l-activity-content-editor-title.js';
import './d2l-activity-content-lti-link-options.js';
import './d2l-activity-content-lti-link-external-activity.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
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

class ContentLTILinkDetail extends AsyncContainerMixin(SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(EntityMixinLit(RtlMixin(ActivityEditorMixin(MobxLitElement))))))) {

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
	}

	connectedCallback() {
		super.connectedCallback();
		this.saveTitle = this.saveTitle.bind(this);
		this.saveLinkOptions = this.saveLinkOptions.bind(this);
	}

	render() {
		const ltiLinkEntity = ltiLinkStore.getContentLTILinkActivity(this.href);
		if (ltiLinkEntity) {
			this.skeleton = false;
		}

		return html`
			<d2l-activity-content-editor-title
				.entity=${ltiLinkEntity}
				.onSave=${this.saveTitle}
			>
			</d2l-activity-content-editor-title>
			<slot name="due-date"></slot>

			<d2l-activity-content-lti-link-options
				.entity=${ltiLinkEntity}
				.onSave=${this.saveLinkOptions}
			>
			</d2l-activity-content-lti-link-options>

			<d2l-activity-content-lti-link-external-activity
				.entity=${ltiLinkEntity}
			>
			</d2l-activity-content-lti-link-external-activity>
		`;
	}

	updated(changedProperties) {
		if (changedProperties.has('asyncState')) {
			this.skeleton = this.asyncState !== asyncStates.complete;
		}
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
}

customElements.define('d2l-activity-content-lti-link-detail', ContentLTILinkDetail);
