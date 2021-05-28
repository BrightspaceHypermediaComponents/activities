import '../shared-components/d2l-activity-content-editor-title.js';
import '../../d2l-activity-text-editor.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { activityContentEditorStyles } from '../shared-components/d2l-activity-content-editor-styles.js';
import { ActivityEditorMixin } from '../../mixins/d2l-activity-editor-mixin.js';
import { activityHtmlEditorStyles } from '../shared-components/d2l-activity-html-editor-styles.js';
import { ContentEditorConstants } from '../constants';
import { ContentModuleEntity } from 'siren-sdk/src/activities/content/ContentModuleEntity.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { html } from 'lit-element/lit-element.js';
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
			activityHtmlEditorStyles
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

		const newEditorEvent = new CustomEvent('d2l-request-provider', {
			detail: { key: 'd2l-provider-html-new-editor-enabled' },
			bubbles: true,
			composed: true,
			cancelable: true
		});

		this.dispatchEvent(newEditorEvent);
		const htmlNewEditorEnabled = newEditorEvent.detail.provider;

		//@d2l-activity-text-editor-change for the new editor is on blur, while the old editor is on change
		//we don't want the debouncer on the new editor in case the user clicks directly onto a button from the editor
		const activityTextEditorChange = htmlNewEditorEnabled ? this._onRichtextChange : this._onRichtextChangeDebounced;

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
				<div class="d2l-skeletize ${htmlNewEditorEnabled ? 'd2l-new-html-editor-container' : ''}">
					<d2l-activity-text-editor
						.ariaLabel="${this.localize('content.description')}"
						.key="content-description"
						.value="${descriptionRichText}"
						@d2l-activity-text-editor-change="${activityTextEditorChange}"
						.richtextEditorConfig="${{}}"
						html-editor-height="100%"
						full-page
						full-page-font-size="12pt"
						full-page-font-family="Lato"
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
		this._saveDescription(descriptionRichText);
	}

	_onRichtextChangeDebounced(e) {
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
