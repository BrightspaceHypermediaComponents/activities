import './d2l-activity-assignment-availability-editor.js';
import './d2l-activity-assignment-evaluation-editor.js';
import './d2l-activity-assignment-editor-submission-and-completion.js';
import '@brightspace-ui/core/components/colors/colors.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class AssignmentEditorSecondary extends AsyncContainerMixin(SkeletonMixin(RtlMixin(LocalizeActivityAssignmentEditorMixin(LitElement)))) {

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
		this.skeleton = true;
	}

	render() {
		const availabilityAccordian = html`
			<d2l-activity-assignment-availability-editor
				.href="${this.activityUsageHref}"
				.token="${this.token}"
				?skeleton="${this.skeleton}">
			</d2l-activity-assignment-availability-editor>
		`;

		const submissionCompletionCategorizationAccordian = html`
			<d2l-activity-assignment-editor-submission-and-completion-editor
				href="${this.href}"
				.token="${this.token}"
				?skeleton="${this.skeleton}">
			</d2l-activity-assignment-editor-submission-and-completion-editor>
		` ;

		const evaluationAccordian =  html`
			<d2l-activity-assignment-evaluation-editor
				href="${this.href}"
				.token="${this.token}"
				.activityUsageHref="${this.activityUsageHref}"
				?skeleton="${this.skeleton}">
			</d2l-activity-assignment-evaluation-editor>
		`;

		return html`
			${availabilityAccordian}
			${submissionCompletionCategorizationAccordian}
			${evaluationAccordian}
		`;

	}

	updated(changedProperties) {
		super.updated(changedProperties);

		if (changedProperties.has('asyncState')) {
			this.skeleton = this.asyncState !== asyncStates.complete;
		}
	}

}
customElements.define('d2l-activity-assignment-editor-secondary', AssignmentEditorSecondary);
