import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { checkboxStyles } from '../styles/checkbox-styles.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/assignment-store.js';

class ActivityAssignmentAnnotationsEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityAssignmentEditorMixin(MobxLitElement))) {

	static get styles() {

		return [
			labelStyles,
			checkboxStyles,
			css`
				d2l-input-checkbox {
					margin: 0;
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

		return html`
			<label class="d2l-label-text">
				${this.localize('annotationTools')}
			</label>
			<d2l-input-checkbox
				@change="${this._toggleAnnotationToolsAvailability}"
				?checked="${entity.annotationToolsAvailable}"
				ariaLabel="${this.localize('annotationToolDescription')}"
				?disabled="${!entity.canEditAnnotations}">
				${this.localize('annotationToolDescription')}
			</d2l-input-checkbox>
		`;
	}
	_toggleAnnotationToolsAvailability(event) {

		const entity = store.get(this.href);
		entity.setAnnotationToolsAvailable(event.target.checked);
	}

}

customElements.define(
	'd2l-activity-assignment-annotations-editor',
	ActivityAssignmentAnnotationsEditor
);
