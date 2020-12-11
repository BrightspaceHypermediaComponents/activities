import 'd2l-inputs/d2l-input-checkbox.js';
import 'd2l-inputs/d2l-input-checkbox-spacer.js';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { checkboxStyles } from '@brightspace-ui/core/components/inputs/input-checkbox';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/assignment-store.js';

class ActivityAssignmentAnonymousMarkingEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityAssignmentEditorMixin(MobxLitElement))) {

	static get styles() {

		return [
			bodySmallStyles,
			labelStyles,
			checkboxStyles,
			css`
			.d2l-body-small {
				margin: 0 0 0.3rem 0;
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

	constructor() {

		super(store);
	}

	render() {

		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		const shouldRenderEditor = entity.anonymousMarkingProps.isAnonymousMarkingAvailable;
		if (!shouldRenderEditor) {
			return html``;
		}

		return html`
			<label class="d2l-label-text">
				${this.localize('lblAnonymousMarking')}
			</label>
			<d2l-input-checkbox
				@change="${this._saveAnonymousMarking}"
				?checked="${entity.anonymousMarkingProps.isAnonymousMarkingEnabled}"
				?disabled="${!entity.anonymousMarkingProps.canEditAnonymousMarking}"
				ariaLabel="${this.localize('chkAnonymousMarking')}">
				${this.localize('chkAnonymousMarking')}
			</d2l-input-checkbox>
			<d2l-input-checkbox-spacer
				class="d2l-body-small"
				?hidden="${!entity.anonymousMarkingProps.anonymousMarkingHelpText}">
				${entity.anonymousMarkingProps.anonymousMarkingHelpText}
			</d2l-input-checkbox-spacer>
		`;
	}
	_saveAnonymousMarking(event) {

		const entity = store.get(this.href);
		entity.setAnonymousMarking(event.target.checked);
	}

}
customElements.define(
	'd2l-activity-assignment-anonymous-marking-editor',
	ActivityAssignmentAnonymousMarkingEditor
);
