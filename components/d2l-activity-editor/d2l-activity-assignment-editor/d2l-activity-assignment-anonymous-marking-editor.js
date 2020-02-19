import 'd2l-inputs/d2l-input-checkbox.js';
import 'd2l-inputs/d2l-input-checkbox-spacer.js';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentEntity } from 'siren-sdk/src/activities/assignments/AssignmentEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SaveStatusMixin } from '../save-status-mixin.js';

class ActivityAssignmentAnonymousMarkingEditor
	extends SaveStatusMixin(RtlMixin(EntityMixinLit(LocalizeMixin(LitElement)))) {

	static get properties() {

		return {
			_isAnonymousMarkingAvailable: { type: Boolean },
			_isAnonymousMarkingEnabled: { type: Boolean },
			_canEditAnonymousMarking: { type: Boolean },
			_anonymousMarkingHelpText: { type: String }
		};
	}

	static get styles() {

		return [
			bodySmallStyles,
			labelStyles,
			css`
			:host {
				display: block;
			}

			:host([hidden]) {
				display: none;
			}

			.d2l-body-small {
				margin: 0 0 0.3rem 0;
			}

			d2l-input-checkbox {
				padding-right: 1rem;
			}

			:host([dir="rtl"]) d2l-input-checkbox {
				padding-right: 0;
				padding-left: 1rem;
			}

			d2l-input-checkbox-spacer {
				margin-top: -0.9rem;
			}

			d2l-input-checkbox-spacer[hidden] {
				display: none;
			}
			`
		];
	}

	static async getLocalizeResources(langs) {

		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {

		super();
		this._setEntityType(AssignmentEntity);
	}

	set _entity(entity) {

		if (this._entityHasChanged(entity)) {
			this._onAssignmentChange(entity);
			super._entity = entity;
		}
	}

	_onAssignmentChange(assignment) {

		if (!assignment) {
			return;
		}

		this._isAnonymousMarkingAvailable = assignment.isAnonymousMarkingAvailable();
		this._isAnonymousMarkingEnabled = assignment.isAnonymousMarkingEnabled();
		this._canEditAnonymousMarking = assignment.canEditAnonymousMarking();
		this._anonymousMarkingHelpText = assignment.getAnonymousMarkingHelpText();
	}

	_saveAnonymousMarking(event) {
		this.wrapSaveAction(super._entity.setAnonymousMarking(event.target.checked));
	}

	render() {

		const shouldRenderEditor = this._isAnonymousMarkingAvailable;
		if (!shouldRenderEditor) {
			return html``;
		}

		return html`
			<label class="d2l-label-text">
				${this.localize('lblAnonymousMarking')}
			</label>
			<d2l-input-checkbox
				@change="${this._saveAnonymousMarking}"
				?checked="${this._isAnonymousMarkingEnabled}"
				?disabled="${!this._canEditAnonymousMarking}"
				ariaLabel="${this.localize('chkAnonymousMarking')}">
				${this.localize('chkAnonymousMarking')}
			</d2l-input-checkbox>
			<d2l-input-checkbox-spacer
				class="d2l-body-small"
				?hidden="${!this._anonymousMarkingHelpText}">
				${this._anonymousMarkingHelpText}
			</d2l-input-checkbox-spacer>
		`;
	}
}
customElements.define(
	'd2l-activity-assignment-anonymous-marking-editor',
	ActivityAssignmentAnonymousMarkingEditor
);
