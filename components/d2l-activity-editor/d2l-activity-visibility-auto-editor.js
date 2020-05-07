import './d2l-activity-visibility-editor-toggle.js';
import { html, LitElement } from 'lit-element/lit-element';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { SaveStatusMixin } from './save-status-mixin';

class ActivityVisibilityAutoEditor extends SaveStatusMixin(EntityMixinLit(LitElement)) {

	static get properties() {
		return {
			disabled: { type: Boolean },
			_isDraft: { type: Boolean },
			_canEditDraft: { type: Boolean }
		};
	}

	constructor() {
		super();
		this._setEntityType(ActivityUsageEntity);
		this._isDraft = false;
		this.disabled = false;
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivityUsageChange(entity);
		}

		super._entity = entity;
	}

	_onActivityUsageChange(activityUsage) {
		if (activityUsage) {
			this._isDraft = activityUsage.isDraft();
			this._canEditDraft = activityUsage.canEditDraft();
		}
	}

	_updateVisibility() {
		this.wrapSaveAction(super._entity.setDraftStatus(!this._isDraft));
	}

	render() {

		return html`
			<d2l-activity-visibility-editor-toggle
				?disabled="${this.disabled}"
				?is-draft="${this._isDraft}"
				?can-edit-draft="${this._canEditDraft}"
				@click="${this._updateVisibility}"
			>
			</d2l-activity-visibility-editor-toggle>
		`;
	}
}
customElements.define('d2l-activity-visibility-auto-editor', ActivityVisibilityAutoEditor);
