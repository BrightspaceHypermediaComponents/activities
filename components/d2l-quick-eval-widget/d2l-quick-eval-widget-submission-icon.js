import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/icons/icon';

import { css, html, LitElement } from 'lit-element/lit-element.js';
import { offscreenStyles } from '@brightspace-ui/core/components/offscreen/offscreen.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

/**
 * An icon with a badge
 */
class SubmissionIcon extends RtlMixin(LitElement) {

	static get properties() {
		return {
			/**
			 * REQUIRED: Preset icon key (e.g. "tier1:gear")
			 */
			icon: { type: String, reflect: true },
			/**
			 * Submission count to display as a superscript on the icon
			 */
			submissionCount: { type: String, attribute: 'submission-count', reflect: true },
			/**
			 * Does not make the component fully skeleton compatible, but makes it more comparable to
			 * d2l-icon which doesn't support it either (prevents visual weirdness of count bubble displaying behind skeleton)
			 */
			skeleton: { type: Boolean }
		};
	}

	static get styles() {
		return [
			offscreenStyles,
			css`
				:host {
					display: inline-block;
					left: 0.15rem;
					margin-right: 0.3rem;
					position: relative;
					top: -0.6rem;
				}
				:host[hidden] {
					display: none;
				}
				:host([dir="rtl"]) {
					left: auto;
					margin-left: 0.3rem;
					margin-right: 0;
					right: 0.15rem;
				}
				.d2l-quick-eval-widget-submission-icon-content {
					display: inline-block;
					line-height: 0;
					padding: 0.6rem;
					position: relative;
					text-align: center;
				}
				.d2l-quick-eval-widget-submission-icon-submission-count {
					background-color: var(--d2l-color-carnelian-minus-1);
					border: 2px solid var(--d2l-color-carnelian-minus-1);
					border-radius: 0.75rem;
					box-shadow: 0 0 0 2px white;
					box-sizing: content-box;
					color: white;
					display: inline-block;
					font-size: 0.55rem;
					font-weight: 400;
					line-height: 100%;
					min-width: 0.5rem;
					padding: 2px;
					position: relative;
				}
				.d2l-quick-eval-widget-submission-icon-submission-count-container {
					position: absolute;
					right: 1rem;
					top: 0;
					width: 1px;
				}
				:host([dir="rtl"]) .d2l-quick-eval-widget-submission-icon-submission-count-container {
					left: 1rem;
					right: auto;
				}
				d2l-icon {
					height: 1.3rem;
					width: 1.3rem;
				}
		`];
	}

	render() {
		return html`
			<div class="d2l-quick-eval-widget-submission-icon-content">
				<d2l-icon icon="${this.icon}" ></d2l-icon>
				<div class="d2l-quick-eval-widget-submission-icon-submission-count-container" ?hidden=${!this.submissionCount || this.skeleton}>
					<div class="d2l-quick-eval-widget-submission-icon-submission-count">${this.submissionCount}</div>
				</div>
			</div>
		`;
	}

}

customElements.define('d2l-quick-eval-widget-submission-icon', SubmissionIcon);
