import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import { bodySmallStyles, heading3Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ActivityAccordionCollapse extends SkeletonMixin(LitElement) {

	static get properties() {

		return {
			hasErrors: { type: Boolean, attribute: 'has-errors' },
			_opened: { type: Boolean }
		};
	}

	static get styles() {

		return [
			super.styles,
			bodySmallStyles,
			heading3Styles,
			css`
				:host {
					display: block;
				}

				:host([hidden]) {
					display: none;
				}

				.d2l-activity-summarizer-header {
					margin-bottom: 12px !important;
					margin-top: 20px !important;
				}

				:host([skeleton]) .d2l-activity-summarizer-header.d2l-skeletize::before {
					white-space: nowrap;
					width: 70%;
				}

				:host([skeleton]) .d2l-activity-summarizer-header.d2l-skeletize {
					height: 1.5rem;
				}

				.d2l-activity-summarizer-summary {
					color: var(--d2l-color-tungsten);
					list-style: none;
					margin-top: 5px;
					min-height: 20px;
					padding: 0;
				}

				ul.d2l-activity-summarizer-summary > li {
					margin-bottom: 8px;
				}

				ul.d2l-activity-summarizer-summary > li:last-child {
					margin-bottom: 0;
				}

				:host([skeleton]) .d2l-activity-summarizer-summary.d2l-skeletize::before {
					width: 60%;
				}
				:host([skeleton]) .d2l-activity-summarizer-summary.d2l-skeletize {
					height: 1rem;
				}
			`
		];
	}

	constructor() {
		super();
		this._opened = false;
	}

	connectedCallback() {
		super.connectedCallback();
	}

	render() {
		return html`
			<d2l-labs-accordion-collapse
				flex
				header-border
				?opened=${this._isOpened()}
				?disabled="${this.skeleton}"
				?no-icons="${this.skeleton}"
				@d2l-labs-accordion-collapse-state-changed=${this._onAccordionStateChange}>

				<h3 class="d2l-heading-3 d2l-activity-summarizer-header d2l-skeletize" slot="header">
					<slot name="header"></slot>
				</h3>
				<ul class="d2l-body-small d2l-activity-summarizer-summary d2l-skeletize" slot="summary">
					<slot name="summary-items"></slot>
				</ul>
				<slot name="components"></slot>
			</d2l-labs-accordion-collapse>
		`;
	}

	_isOpened() {
		return this._opened || this.hasErrors;
	}
	_onAccordionStateChange(e) {
		this._opened = e.detail.opened;
	}
}

customElements.define(
	'd2l-activity-accordion-collapse',
	ActivityAccordionCollapse
);
