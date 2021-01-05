import '../shared-components/d2l-activity-content-editor-title.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { ContentWebLinkEntity } from 'siren-sdk/src/activities/content/ContentWebLinkEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as webLinkStore } from './state/content-web-link-store.js';

class ContentWebLinkDetail extends AsyncContainerMixin(SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(EntityMixinLit(RtlMixin(ActivityEditorMixin(MobxLitElement))))))) {

	static get styles() {
		return  [
			super.styles,
			labelStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				:host > div {
					padding-bottom: 20px;
				}
				.d2l-activity-label-container {
					margin-bottom: 7px;
				}
			`
		];
	}

	constructor() {
		super(webLinkStore);
		this._debounceJobs = {};
		this._setEntityType(ContentWebLinkEntity);
		this.skeleton = true;
		this.saveOrder = 2000;
	}

	connectedCallback() {
		super.connectedCallback();
		this.saveTitle = this.saveTitle.bind(this);
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
			>
			</d2l-activity-content-editor-title>
			<slot name="due-date"></slot>
		`;
	}

	updated(changedProperties) {
		if (changedProperties.has('asyncState')) {
			this.skeleton = this.asyncState !== asyncStates.complete;
		}
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

		await webLinkEntity.save();
	}

	saveTitle(value) {
		const webLinkEntity = webLinkStore.getContentWebLinkActivity(this.href);
		if (!webLinkEntity) {
			return;
		}
		webLinkEntity.setTitle(value);
	}
}
customElements.define('d2l-activity-content-web-link-detail', ContentWebLinkDetail);
