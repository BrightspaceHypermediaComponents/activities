import '../d2l-activity-availability-dates-summary.js';
import '../d2l-activity-availability-dates-editor.js';
import '../d2l-activity-accordion-collapse.js';
import { accordionStyles } from '../styles/accordion-styles';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { html } from 'lit-element/lit-element.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as store } from '../state/activity-store';

class ContentAvailabilityEditor extends SkeletonMixin(LocalizeActivityEditorMixin((ActivityEditorMixin(RtlMixin(MobxLitElement))))) {

	static get properties() {
		return {
			href: { type: String },
			token: { type: Object }
		};
	}

	static get styles() {
		return [
			super.styles,
			accordionStyles
		];
	}

	connectedCallback() {
		super.connectedCallback();
	}

	render() {
		return html`
			<d2l-activity-accordion-collapse
				?has-errors=${this._errorInAccordion()}
				?skeleton="${this.skeleton}">
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

	_errorInAccordion() {
		const activity = store.get(this.href);

		if (!activity || !activity.dates) {
			return false;
		}

		return !!(activity.dates.endDateErrorTerm || activity.dates.startDateErrorTerm);
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
