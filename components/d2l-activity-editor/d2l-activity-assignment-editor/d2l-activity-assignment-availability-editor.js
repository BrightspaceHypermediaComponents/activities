import '../d2l-activity-availability-dates-summary.js';
import '../d2l-activity-availability-dates-editor.js';
import '../d2l-activity-usage-conditions-editor.js';
import '../d2l-activity-usage-conditions-summary.js';
import '../d2l-activity-special-access-editor.js';
import '../d2l-activity-special-access-summary.js';
import '@brightspace-ui-labs/accordion/accordion-collapse.js';
import { ActivityEditorFeaturesMixin, Milestones } from '../mixins/d2l-activity-editor-features-mixin.js';
import { bodySmallStyles, heading3Styles, heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { summarizerHeaderStyles, summarizerSummaryStyles } from './activity-summarizer-styles.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { SkeletizeMixin } from '../mixins/d2l-skeletize-mixin';
import { shared as store } from '../state/activity-store.js';

class ActivityAssignmentAvailabilityEditor extends SkeletizeMixin(ActivityEditorFeaturesMixin(LocalizeActivityAssignmentEditorMixin(ActivityEditorMixin(MobxLitElement)))) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object },
			_opened: { type: Boolean },
			_m3ReleaseConditionsEnabled: { type: Boolean },
			_m3SpecialAccessEnabled: { type: Boolean }
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
			summarizerSummaryStyles
		];
	}

	constructor() {
		super();
		this._opened = false;
	}

	connectedCallback() {
		super.connectedCallback();

		this._m3ReleaseConditionsEnabled = this._isMilestoneEnabled(Milestones.M3ReleaseConditions);
		this._m3SpecialAccessEnabled = this._isMilestoneEnabled(Milestones.M3SpecialAccess);
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
					${this.localize('hdrAvailability')}
				</h3>
				<ul class="d2l-body-small d2l-activity-summarizer-summary d2l-skeletize" slot="summary">
					<li>${this._renderAvailabilityDatesSummary()}</li>
					<li>${this._renderReleaseConditionSummary()}</li>
					<li>${this._renderSpecialAccessSummary()}</li>
				</ul>
				${this._renderAvailabilityDatesEditor()}
				${this._renderReleaseConditionEditor()}
				${this._renderSpecialAccessEditor()}
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

	_renderReleaseConditionEditor() {
		const activity = store.get(this.href);
		if (!this._m3ReleaseConditionsEnabled || !activity || !activity.canEditReleaseConditions) {
			return html``;
		}

		return html`
			<div class="d2l-editor">
				<h3 class="d2l-heading-4">
					${this.localize('hdrReleaseConditions')}
				</h3>
				<d2l-activity-usage-conditions-editor
					description="${this.localize('hlpReleaseConditions')}"
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-usage-conditions-editor>
			</div>
		`;
	}
	_renderReleaseConditionSummary() {
		if (!this._m3ReleaseConditionsEnabled) {
			return html``;
		}

		return html`
			<d2l-activity-usage-conditions-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-usage-conditions-summary>
		`;
	}

	_renderSpecialAccessEditor() {
		const activity = store.get(this.href);

		if (!this._m3SpecialAccessEnabled || !activity || !activity.specialAccess) {
			return html``;
		}

		return html`
			<div class="d2l-editor">
				<h3 class="d2l-heading-4">
					${this.localize('hdrSpecialAccess')}
				</h3>
				<d2l-activity-special-access-editor
					description="${this.localize('hlpSpecialAccess')}"
					href="${this.href}"
					.token="${this.token}">
				</d2l-activity-special-access-editor>
			</div>
		`;
	}
	_renderSpecialAccessSummary() {
		if (!this._m3SpecialAccessEnabled) {
			return html``;
		}

		return html`
			<d2l-activity-special-access-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-special-access-summary>
		`;
	}

}

customElements.define(
	'd2l-activity-assignment-availability-editor',
	ActivityAssignmentAvailabilityEditor
);
