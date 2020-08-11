import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { assignments as store } from './state/assignment-store.js';

class ActivityAssignmentAnnotationsEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityAssignmentEditorMixin(MobxLitElement))) {

	static get styles() {

		return [
			labelStyles,
			css`
			:host {
				display: block;
			}

			:host([hidden]) {
				display: none;
			}

			d2l-input-checkbox {
				padding-right: 1rem;
				margin: 0;
			}

			:host([dir="rtl"]) d2l-input-checkbox {
				padding-right: 0;
				padding-left: 1rem;
			}
			`
		];
	}

	constructor() {

		super(store);
	}

	_toggleAnnotationToolsAvailability(event) {

		const entity = store.get(this.href);
		entity.setAnnotationToolsAvailable(event.target.checked);
	}

	render() {

		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		const shouldRenderEditor = entity.canSeeAnnotations;
		if (!shouldRenderEditor) {
			return html``;
		}

		return html`
			<label class="d2l-label-text">
				${this.localize('annotationTools')}
			</label>
			<d2l-input-checkbox
				@change="${this._toggleAnnotationToolsAvailability}"
				?checked="${entity.annotationToolsAvailable}"
				ariaLabel="${this.localize('annotationToolDescription')}">
				${this.localize('annotationToolDescription')}
			</d2l-input-checkbox>
		`;
	}
}

customElements.define(
	'd2l-activity-assignment-annotations-editor',
	ActivityAssignmentAnnotationsEditor
);
