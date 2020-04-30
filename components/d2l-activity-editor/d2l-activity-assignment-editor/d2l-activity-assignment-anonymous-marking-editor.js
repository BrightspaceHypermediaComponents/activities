import 'd2l-inputs/d2l-input-checkbox.js';
import 'd2l-inputs/d2l-input-checkbox-spacer.js';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { assignments as store } from './state/assignment-store.js';

class ActivityAssignmentAnonymousMarkingEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeMixin(MobxLitElement))) {

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

		super(store);
	}

	_saveAnonymousMarking(event) {

		const entity = store.get(this.href);
		entity.setAnonymousMarking(event.target.checked);
	}

	render() {

		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		const shouldRenderEditor = entity.isAnonymousMarkingAvailable;
		if (!shouldRenderEditor) {
			return html``;
		}

		return html`
			<label class="d2l-label-text">
				${this.localize('lblAnonymousMarking')}
			</label>
			<d2l-input-checkbox
				@change="${this._saveAnonymousMarking}"
				?checked="${entity.isAnonymousMarkingEnabled}"
				?disabled="${!entity.canEditAnonymousMarking}"
				ariaLabel="${this.localize('chkAnonymousMarking')}">
				${this.localize('chkAnonymousMarking')}
			</d2l-input-checkbox>
			<d2l-input-checkbox-spacer
				class="d2l-body-small"
				?hidden="${!entity.anonymousMarkingHelpText}">
				${entity.anonymousMarkingHelpText}
			</d2l-input-checkbox-spacer>
		`;
	}
}
customElements.define(
	'd2l-activity-assignment-anonymous-marking-editor',
	ActivityAssignmentAnonymousMarkingEditor
);
