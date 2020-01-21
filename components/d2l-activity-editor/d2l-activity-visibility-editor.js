import '@d2l/switch/d2l-switch.js';
import 'd2l-colors/d2l-colors';
import { css, html, LitElement } from 'lit-element/lit-element';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { SaveStatusMixin } from './save-status-mixin';

const baseUrl = import.meta.url;
class ActivityVisibilityEditor extends SaveStatusMixin(EntityMixinLit(LocalizeMixin(LitElement))) {

	static get properties() {
		return {
			disabled: { type: Boolean },
			_isDraft: { type: Boolean },
			_canEditDraft: {type: Boolean }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			d2l-switch .d2l-label-text {
				color: var(--d2l-color-ferrite);
				font-weight: normal;
			}
		`;
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, baseUrl);
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

		const switchVisibilityText = (this._isDraft ? this.localize('hidden') : this.localize('visible'));
		const switchVisibilityTextAria = (this._isDraft ? this.localize('ariaHidden') : this.localize('ariaVisible'));
		const icon = (this._isDraft ? 'tier1:visibility-hide' : 'tier1:visibility-show');
		const switchEnabled = this._canEditDraft && !this.disabled
			? html`
				<d2l-switch
					aria-label="${switchVisibilityTextAria}"
					label-right
					.checked=${!this._isDraft}
					@click="${this._updateVisibility}">
						<div class="d2l-label-text">
							<d2l-icon icon=${icon}></d2l-icon>
							${switchVisibilityText}
						</div>
				</d2l-switch>
			`
			: html`
				<div d2l-label-text>
					<d2l-icon icon=${icon}></d2l-icon>
					${switchVisibilityText}
				</div>
			`;

		return switchEnabled;
	}

}
customElements.define('d2l-activity-visibility-editor', ActivityVisibilityEditor);
