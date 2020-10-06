import './d2l-activity-content-availability-editor.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ContentEditorSecondary extends AsyncContainerMixin(SkeletonMixin(RtlMixin(ActivityEditorMixin(LitElement)))) {

	static get styles() {
		return [
			super.styles,
			css`
				:host {
					background: var(--d2l-color-gypsum);
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				:host > * {
					background: var(--d2l-color-white);
					border-radius: 8px;
					margin-bottom: 10px;
					padding: 20px;
					padding-top: 0;
				}
			`
		];
	}

	constructor() {
		super();
		this.skeleton = true;
	}

	render() {
		return html`
			<d2l-activity-content-availability-editor
				.href="${this.href}"
				.token="${this.token}"
				?skeleton="${this.skeleton}"
			>
			</d2l-activity-content-availability-editor>
		`;
	}

	updated(changedProperties) {
		if (changedProperties.has('asyncState')) {
			this.skeleton = this.asyncState !== asyncStates.complete;
		}
	}
}
customElements.define('d2l-activity-content-editor-secondary', ContentEditorSecondary);
