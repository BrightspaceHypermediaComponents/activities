import '../shared-components/d2l-activity-content-editor-title.js';
import '../../d2l-activity-text-editor.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { css, html } from 'lit-element/lit-element.js';
import { activityContentEditorStyles } from '../shared-components/d2l-activity-content-editor-styles.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { ContentEditorConstants } from '../constants';
import { ContentModuleEntity } from 'siren-sdk/src/activities/content/ContentModuleEntity.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as moduleStore } from './state/content-module-store.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';

class ContentModuleDetail extends AsyncContainerMixin(SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(EntityMixinLit(RtlMixin(ActivityEditorMixin(MobxLitElement))))))) {

	static get styles() {
		return  [
			super.styles,
			labelStyles,
			activityContentEditorStyles,
			css`
				.d2l-activity-label-container {
					margin-bottom: 7px;
				}
				#html-editor-container {
					min-height: 300px;
				}
			`
		];
	}

	constructor() {
		super(moduleStore);
		this._debounceJobs = {};
		this._setEntityType(ContentModuleEntity);
		this.skeleton = true;
		this.saveOrder = 2000;
	}

	connectedCallback() {
		super.connectedCallback();
		this.saveTitle = this.saveTitle.bind(this);
	}

	render() {
		const moduleEntity = moduleStore.getContentModuleActivity(this.href);
		let descriptionRichText = undefined;
		if (moduleEntity) {
			this.skeleton = false;
			descriptionRichText = moduleEntity.descriptionRichText;
		}

		return html`
			<d2l-activity-content-editor-title
				.entity=${moduleEntity}
				.onSave=${this.saveTitle}
			></d2l-activity-content-editor-title>
			<slot name="due-date"></slot>
			<div id="content-description-container">
				<div class="d2l-activity-label-container d2l-label-text d2l-skeletize">
					${this.localize('content.description')}
				</div>
				<div id="html-editor-container" class="d2l-skeletize">
					<d2l-activity-text-editor
						ariaLabel="${this.localize('content.description')}"
						.key="content-description"
						.value="${descriptionRichText}"
						@d2l-activity-text-editor-change="${this._onRichtextChange}"
						.richtextEditorConfig="${{}}"
						htmlEditorHeight="325px"
					>
					</d2l-activity-text-editor>
				</div>
			</div>
		`;
	}

	updated(changedProperties) {
		if (changedProperties.has('asyncState')) {
			this.skeleton = this.asyncState !== asyncStates.complete;
		}
	}

	async cancelCreate() {
		const moduleEntity = moduleStore.getContentModuleActivity(this.href);
		if (!moduleEntity) {
			return;
		}

		await moduleEntity.cancelCreate();
	}

	hasPendingChanges() {
		const moduleEntity = moduleStore.getContentModuleActivity(this.href);
		if (!moduleEntity) {
			return false;
		}
		return moduleEntity.dirty;
	}

	async save() {
		const moduleEntity = moduleStore.getContentModuleActivity(this.href);
		if (!moduleEntity) {
			return;
		}

		this._saveOnChange('description');
		await moduleEntity.save();
	}

	saveTitle(value) {
		const moduleEntity = moduleStore.getContentModuleActivity(this.href);
		if (!moduleEntity) {
			return;
		}
		moduleEntity.setTitle(value);
	}

	_onRichtextChange(e) {
		const descriptionRichText = e.detail.content;
		this._debounceJobs.description = Debouncer.debounce(
			this._debounceJobs.description,
			timeOut.after(ContentEditorConstants.DEBOUNCE_TIMEOUT),
			() => this._saveDescription(descriptionRichText)
		);
	}

	_saveDescription(richText) {
		const moduleEntity = moduleStore.getContentModuleActivity(this.href);
		if (!moduleEntity) {
			return;
		}
		moduleEntity.setDescription(richText);
	}

	_saveOnChange(jobName) {
		this._debounceJobs[jobName] && this._debounceJobs[jobName].flush();
	}
}
customElements.define('d2l-activity-content-module-detail', ContentModuleDetail);
