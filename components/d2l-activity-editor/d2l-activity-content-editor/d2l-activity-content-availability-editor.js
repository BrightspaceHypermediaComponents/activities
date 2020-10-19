import '../d2l-activity-availability-dates-summary.js';
import '../d2l-activity-availability-dates-editor.js';
import '../d2l-activity-accordion-collapse.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ContentAvailabilityEditor extends SkeletonMixin(LocalizeActivityEditorMixin(RtlMixin(LitElement))) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object }
		};
	}

	static get styles() {
		return [
			super.styles,
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
			`
		];
	}

	render() {
		return html`
			<d2l-activity-accordion-collapse ?skeleton="${this.skeleton}">
				<span slot="header">
					${this.localize('content.availabilityHeader')}
				</span>
				<li slot="summary-items">${this._renderAvailabilityDatesSummary()}</li>
				<span slot="components">
					${this._renderAvailabilityDatesEditor()}
				</span>
			</d2l-activity-accordion-collapse>
		`;
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
