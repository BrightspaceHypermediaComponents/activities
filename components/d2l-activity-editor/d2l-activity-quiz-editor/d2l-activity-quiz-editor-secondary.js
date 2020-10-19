import './d2l-activity-quiz-availability-editor.js';
import '@brightspace-ui/core/components/colors/colors.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityEditorFeaturesMixin } from '../mixins/d2l-activity-editor-features-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class QuizEditorSecondary extends ActivityEditorFeaturesMixin(AsyncContainerMixin(SkeletonMixin(RtlMixin(LitElement)))) {

	static get properties() {
		return {
			activityUsageHref: { type: String, attribute: 'activity-usage-href' },
		};
	}

	static get styles() {
		return [
			super.styles,
			labelStyles,
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
		this._debounceJobs = {};
		this.skeleton = true;
	}

	render() {
		const availabilityAccordian = html`
			<d2l-activity-quiz-availability-editor
				.href="${this.activityUsageHref}"
				.token="${this.token}"
				?skeleton="${this.skeleton}">
			</d2l-activity-quiz-availability-editor>
		`;

		return html`
			${availabilityAccordian}
		`;

	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if (changedProperties.has('asyncState')) {
			this.skeleton = this.asyncState !== asyncStates.complete;
		}
	}

}
customElements.define('d2l-activity-quiz-editor-secondary', QuizEditorSecondary);
