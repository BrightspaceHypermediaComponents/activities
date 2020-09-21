import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import { bodySmallStyles, heading3Styles, heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { summarizerHeaderStyles, summarizerSummaryStyles } from '../d2l-activity-assignment-editor/activity-summarizer-styles.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ContentAvailabilityEditor extends LocalizeActivityEditorMixin(RtlMixin(LitElement)) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object },
			_opened: { type: Boolean }
		};
	}

	static get styles() {
		return [
			bodySmallStyles,
			heading3Styles,
			heading4Styles,
			css`
				:host {
					display: block;
				}

				:host([hidden]) {
					display: none;
				}

				.d2l-editor {
					margin: 1rem 0;
				}

				.d2l-editor:last-child {
					margin-bottom: 0;
				}

				.d2l-heading-4 {
					margin: 0 0 0.6rem 0;
				}
			`,
			summarizerHeaderStyles,
			summarizerSummaryStyles,
		];
	}

	constructor() {
		super();
		this._opened = false;
	}

	render() {
		return html`
			<d2l-labs-accordion-collapse
				flex
				header-border
				?opened=${this._isOpened()}
				@d2l-labs-accordion-collapse-state-changed=${this._onAccordionStateChange}>
				<h3 class="d2l-heading-3 d2l-activity-summarizer-header" slot="header">
					${this.localize('content.availabilityHeader')}
				</h3>
				<ul class="d2l-body-small d2l-activity-summarizer-summary" slot="summary">
					<li>${this._renderAvailabilityDatesSummary()}</li>
				</ul>
				${this._renderAvailabilityDatesEditor()}
			</d2l-labs-accordion-collapse>
		`;
	}

	_isOpened() {
		return this._opened;
	}

	_onAccordionStateChange(e) {
		this._opened = e.detail.opened;
	}

	_renderAvailabilityDatesEditor() {

		return html`
			<div>
				TODO - add availability dates editor
			</div>
		`;
	}

	_renderAvailabilityDatesSummary() {

		return html`
			<div>
				TODO - add availability dates summary
			</div>
		`;
	}
}
customElements.define('d2l-activity-content-availability-editor', ContentAvailabilityEditor);
