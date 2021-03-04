import '../d2l-activity-accordion-collapse.js';
import '../d2l-activity-availability-dates-editor.js';
import '../d2l-activity-availability-dates-summary.js';
import '../d2l-activity-usage-conditions-editor.js';
import '../d2l-activity-usage-conditions-summary.js';
import './d2l-activity-ip-restrictions-summary.js';
import './d2l-activity-quiz-password-summary';
import './d2l-activity-quiz-password-editor.js';
import './d2l-activity-quiz-ip-restrictions-container.js';
import { css, html } from 'lit-element/lit-element.js';
import { accordionStyles } from '../styles/accordion-styles';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as quizStore } from './state/quiz-store';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as store } from '../state/activity-store.js';

class ActivityQuizAvailabilityEditor extends ActivityEditorMixin(AsyncContainerMixin(LocalizeActivityQuizEditorMixin(SkeletonMixin(MobxLitElement)))) {

	static get properties() {

		return {
			activityUsageHref: { type: String },
			href: { type: String },
			token: { type: Object }
		};
	}

	static get styles() {

		return [
			super.styles,
			heading4Styles,
			accordionStyles,
			css`
				.d2l-editor {
					margin: 1rem 0;
				}

				.d2l-editor:last-child {
					margin-bottom: 0;
				}

				.d2l-heading-4 {
					margin: 0 0 0.6rem 0;
				}
			`
		];
	}

	constructor() {
		super(quizStore);
		this.checkoutOnLoad = true;
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
					${this.localize('hdrAvailability')}
				</span>

				<li slot="summary-items">${this._renderAvailabilityDatesSummary()}</li>
				<li slot="summary-items">${this._renderReleaseConditionSummary()}</li>
				<li slot="summary-items">${this._renderPasswordSummary()}</li>
				<li slot="summary-items">${this._renderIpRestrictionsSummary()}</li>

				<span slot="components">
					${this._renderAvailabilityDatesEditor()}
					${this._renderReleaseConditionEditor()}
					${this._renderPasswordEditor()}
					${this._renderIpRestrictionEditor()}
				</span>
			</d2l-activity-accordion-collapse>
		`;
	}
	// Returns true if any error states relevant to this accordion are set
	_errorInAccordion() {
		const activity = store.get(this.activityUsageHref);
		if (!activity || !activity.dates) {
			return false;
		}

		return !!(activity.dates.endDateErrorTerm || activity.dates.startDateErrorTerm);
	}

	_renderAvailabilityDatesEditor() {

		return html`
			<div class="d2l-editor">
				<d2l-activity-availability-dates-editor
					href="${this.activityUsageHref}"
					.token="${this.token}">
				</d2l-activity-availability-dates-editor>
			</div>
		`;
	}

	_renderAvailabilityDatesSummary() {

		return html`
			<d2l-activity-availability-dates-summary
				href="${this.activityUsageHref}"
				.token="${this.token}">
			</d2l-activity-availability-dates-summary>
		`;
	}

	_renderIpRestrictionEditor() {

		return html`
			<d2l-activity-quiz-ip-restrictions-container
				.href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-ip-restrictions-container>
		`;
	}

	_renderIpRestrictionsSummary() {
		const quizEntity = quizStore.get(this.checkedOutHref);
		if (!quizEntity || !quizEntity.ipRestrictionsHref) {
			return;
		}

		return html`
			<d2l-activity-ip-restrictions-summary
				href="${quizEntity.ipRestrictionsHref}"
				.token="${this.token}">
			</d2l-activity-ip-restrictions-summary>
		`;
	}

	_renderPasswordEditor() {

		return html`
			<div class="d2l-editor">
				<d2l-activity-quiz-password-editor
					.href="${this.href}"
					.token="${this.token}">
				</d2l-activity-quiz-password-editor>
			</div>
		`;
	}

	_renderPasswordSummary() {
		return html`
			<d2l-activity-quiz-password-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-password-summary>
		`;
	}

	_renderReleaseConditionEditor() {

		return html`
			<div class="d2l-editor">
				<h3 class="d2l-heading-4">
					${this.localize('hdrReleaseConditions')}
				</h3>
				<d2l-activity-usage-conditions-editor
					description="${this.localize('hlpReleaseConditions')}"
					href="${this.activityUsageHref}"
					.token="${this.token}">
				</d2l-activity-usage-conditions-editor>
			</div>
		`;
	}

	_renderReleaseConditionSummary() {
		return html`
			<d2l-activity-usage-conditions-summary
				href="${this.activityUsageHref}"
				.token="${this.token}">
			</d2l-activity-usage-conditions-summary>
		`;
	}

}

customElements.define(
	'd2l-activity-quiz-availability-editor',
	ActivityQuizAvailabilityEditor
);
