import '../d2l-activity-accordion-collapse.js';
import '../d2l-activity-notification-email-editor.js';
import './d2l-activity-quiz-notification-email-summary.js';
import './d2l-activity-quiz-manage-attempts-container';
import './d2l-activity-quiz-attempts-summary.js';
import { accordionStyles } from '../styles/accordion-styles';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { html } from 'lit-element/lit-element.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { shared as store } from './state/quiz-store';

class ActivityQuizAttemptsAndCompletionEditor extends ActivityEditorMixin(AsyncContainerMixin(LocalizeActivityQuizEditorMixin(SkeletonMixin(MobxLitElement)))) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object }
		};
	}

	static get styles() {

		return [
			super.styles,
			accordionStyles,
		];
	}

	constructor() {
		super(store);
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
					${this.localize('hdrAttemptsAndCompletion')}
				</span>
				<li slot="summary-items">${this._renderAttemptsSummary()}</li>
				<li slot="summary-items">${this._renderNotificationEmailSummary()}</li>

				<div class="d2l-editor" slot="components">
					${this._renderManageAttemptsEditor()}
				</div>

				<div class="d2l-editor" slot="components">
					${this._renderNotificationEmailEditor()}
				</div>

			</d2l-activity-accordion-collapse>
		`;
	}
	// Returns true if any error states relevant to this accordion are set
	_errorInAccordion() {
		return false; // Todo: implement error handling
	}

	_onNotificationEmailChanged(event) {
		const entity = store.get(this.href);
		const data = event.detail.value;
		entity.setNotificationEmail(data);
	}

	_renderAttemptsSummary() {
		const entity = this.checkedOutHref && store.get(this.checkedOutHref);
		if (!entity) return html``;
		const { attemptsHref } = entity || {};
		if (!attemptsHref) return html``;

		return html`
			<d2l-activity-quiz-attempts-summary
				href="${attemptsHref}"
				.token="${this.token}">
			</d2l-activity-quiz-attempts-summary>
		`;
	}

	_renderManageAttemptsEditor() {
		const entity = store.get(this.href);
		if (!entity) return html``;

		return html`
			<d2l-activity-quiz-manage-attempts-container
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-manage-attempts-container>`;
	}

	_renderNotificationEmailEditor() {
		const entity = store.get(this.href);
		if (!entity) return html``;

		return html`
			<d2l-activity-notification-email-editor
				value="${entity.notificationEmail}"
				?disabled="${!entity.canEditNotificationEmail}"
				@activity-notification-email-changed="${this._onNotificationEmailChanged}">
				<p slot="description">
					${this.localize('hlpSubmissionNotificationEmail')}
				</p>
			</d2l-activity-notification-email-editor>
		`;
	}

	_renderNotificationEmailSummary() {
		return html`
			<d2l-activity-quiz-notification-email-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-notification-email-summary>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-attempts-and-completion-editor',
	ActivityQuizAttemptsAndCompletionEditor
);
