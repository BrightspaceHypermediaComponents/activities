import 'd2l-inputs/d2l-input-text.js';
import 'd2l-tooltip/d2l-tooltip';
import '@brightspace-ui/core/components/button/button-subtle.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { css, html } from 'lit-element/lit-element.js';
import { DEBOUNCE_TIMEOUT, TITLE_MAX_LENGTH } from '../d2l-activity-content-editor-detail.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { ContentWebLinkEntity } from 'siren-sdk/src/activities/content/ContentWebLinkEntity.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { shared as webLinkStore } from './state/content-web-link-store.js';

class ContentWebLinkDetail extends AsyncContainerMixin(SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(EntityMixinLit(RtlMixin(ActivityEditorMixin(MobxLitElement))))))) {

	static get properties() {
		return {
			_titleError: { type: String }
		};
	}

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

	render() {
		const webLinkEntity = webLinkStore.getContentWebLinkActivity(this.href);
		let title = '';
		this.skeleton = true;
		if (webLinkEntity) {
			// Show loading skeleton until we have the module entity loaded into state
			this.skeleton = false;
			title = webLinkEntity.title;
		}

		return html`
			<div id="content-title-container">
				<d2l-input-text
					id="content-title"
					maxlength="${TITLE_MAX_LENGTH}"
					value="${title}"
					@change="${this._saveOnChange('title')}"
					@input="${this._saveTitleOnInput}"
					label="${this.localize('content.name')} *"
					aria-invalid="${this._titleError ? 'true' : ''}"
					prevent-submit
					novalidate
					?skeleton="${this.skeleton}"
				>
				</d2l-input-text>
				${this._renderTitleTooltip()}
			</div>
			<slot name="dueDate"></slot>
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

	_renderTitleTooltip() {
		if (!this._titleError) {
			return html ``;
		}

		return html`
			<d2l-tooltip
				id="title-tooltip"
				for="content-title"
				position="bottom"
				?showing="${!!this._titleError}">
				${this._titleError}
			</d2l-tooltip>
		`;
	}

	_saveOnChange(jobName) {
		this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	}

	_saveTitle(value) {
		const webLinkEntity = webLinkStore.getContentWebLinkActivity(this.href);
		if (!webLinkEntity) {
			return;
		}
		webLinkEntity.setTitle(value);
	}

	_saveTitleOnInput(e) {
		const title = e.target.value;
		const isTitleEmpty = (title || '').trim().length === 0;

		if (isTitleEmpty) {
			this.setError('_titleError', 'content.emptyNameField', 'title-tooltip');
		} else {
			this.clearError('_titleError');
			this._debounceJobs.title = Debouncer.debounce(
				this._debounceJobs.title,
				timeOut.after(DEBOUNCE_TIMEOUT),
				() => this._saveTitle(title)
			);
		}
	}
}
customElements.define('d2l-activity-content-web-link-detail', ContentWebLinkDetail);
