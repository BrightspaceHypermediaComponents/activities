import '../d2l-activity-availability-dates-summary.js';
import '../d2l-activity-availability-dates-editor.js';
import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import { bodySmallStyles, heading3Styles, heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { summarizerHeaderStyles, summarizerSummaryStyles } from '../d2l-activity-assignment-editor/activity-summarizer-styles.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as store } from '../state/activity-store.js';

class ContentAvailabilityEditor extends SkeletonMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object },
			_opened: { type: Boolean }
		};
	}

	static get styles() {
		return [
			super.styles,
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
				?disabled="${this.skeleton}"
				?no-icons="${this.skeleton}"
				@d2l-labs-accordion-collapse-state-changed=${this._onAccordionStateChange}>
				<h3 class="d2l-heading-3 d2l-activity-summarizer-header d2l-skeletize" slot="header">
					${this.localize('content.availabilityHeader')}
				</h3>
				<ul class="d2l-body-small d2l-activity-summarizer-summary d2l-skeletize" slot="summary">
					<li>${this._renderAvailabilityDatesSummary()}</li>
				</ul>
				${this._renderAvailabilityDatesEditor()}
			</d2l-labs-accordion-collapse>
		`;
	}

	// Returns true if any error states relevant to this accordion are set
	_errorInAccordion() {
		const activity = store.get(this.href);
		if (!activity || !activity.dates) {
			return false;
		}

		return !!(activity.dates.endDateErrorTerm || activity.dates.startDateErrorTerm);
	}

	_isOpened() {
		return this._opened || this._errorInAccordion();
	}

	_onAccordionStateChange(e) {
		this._opened = e.detail.opened;
	}

	_renderAvailabilityDatesEditor() {

		return html`
			<div class="d2l-editor">
				<d2l-activity-availability-dates-editor
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-availability-dates-editor>
			</div>
		`;
	}

	_renderAvailabilityDatesSummary() {

		return html`
			<d2l-activity-availability-dates-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-availability-dates-summary>
		`;
	}
}
customElements.define('d2l-activity-content-availability-editor', ContentAvailabilityEditor);
