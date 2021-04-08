import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/link/link.js';
import './d2l-quick-eval-widget-no-submissions-image.js';
import '../d2l-work-to-do/d2l-work-to-do-activity-list-item-basic.js';

import { css, html, LitElement } from 'lit-element';
import { bodyCompactStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { fetchActivities, fetchEvaluationHref, fetchSubmissionCount, setToggleState, validateActivity } from './d2l-quick-eval-widget-controller.js';
import { LocalizeQuickEvalWidget } from './lang/localize-quick-eval-widget.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

const errorState = 'error';
const listState = 'list';
const noSubmissionState = 'noSubmission';

export class QuickEvalWidget extends LocalizeQuickEvalWidget(SkeletonMixin(LitElement)) {
	static get properties() {
		return {
			_activities: { type: Array },
			_loading: { type: Boolean },
			_loadedElements: { type: Array },
			_state: { type: String },
			activitiesHref: {
				attribute: 'href',
				type: String
			},
			count: { type: Number },
			quickEvalHref: {
				attribute: 'quick-eval-href',
				type: String
			},
			toggleHref: {
				attribute: 'toggle-href',
				type: String
			},
			toggleState: {
				attribute: 'toggle-state',
				type: String
			},
			token: {
				type: Object,
				converter: {
					formatAttribute(value) {
						const retVal = String(value);
						return retVal;
					},
					toAttribute(value) {
						const retVal = Object(value);
						return retVal;
					}
				}
			},
		};
	}

	static get styles() {
		return [ super.styles,
			bodyCompactStyles, css`
			.d2l-quick-eval-widget-list {
				margin-top: 0.5rem;
			}
			.d2l-quick-eval-widget-no-submissions {
				align-items: center;
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
			}
			d2l-quick-eval-widget-no-submissions-image {
				padding-top: 30px;
				width: 100%;
			}
			.d2l-quick-eval-widget-error {
				background: var(--d2l-color-regolith);
				border: 1px solid var(--d2l-color-mica);
				border-radius: 0.3rem;
				box-sizing: border-box;
				padding: 0 1rem;
				width: 100%;
			}
			.d2l-quick-eval-widget-no-submissions-text-container {
				text-align: center;
			}
			.d2l-quick-eval-widget-no-submissions-text-container h4 {
				margin-block-end: 0;
			}
		` ];
	}

	constructor() {
		super();
		this._activities = [];
		this._loading = true;
		this._loadedElements = [];
		this._state = listState;
		this.count = 6;
	}

	async updated(changedProperties) {
		super.updated();

		if ((changedProperties.has('activitiesHref') || changedProperties.has('token')) && this.activitiesHref && this.token) {
			try {
				this._activities = await this.getActivities(this.activitiesHref, this.token);
				this._state = this._activities.length > 0 ? listState : noSubmissionState;
				this._loading = true;
			} catch (e) {
				console.error('quick-eval-widget: Unable to load activities from entity.');
				this._state = errorState;
			}
		}
	}

	async getActivities(href, token) {
		const unassessedActivityCollection = await fetchActivities(href, token);
		if (unassessedActivityCollection.entities === undefined) {
			return [];
		}
		return Promise.all(
			unassessedActivityCollection.entities
				.slice(0, this.count)
				.filter( activityUsage => {
					return validateActivity(activityUsage);
				})
				.map(async activityUsage => {
					const submissionCount = await fetchSubmissionCount(activityUsage, token);

					const href = activityUsage.getLinkByRel('self').href;
					const evaluateAll = submissionCount === 0;
					const evaluationHref = await fetchEvaluationHref(activityUsage, token, evaluateAll);

					return {
						submissionCount,
						href,
						evaluationHref
					};
				}));
	}

	async handleViewAll() {
		try {
			await setToggleState(this.toggleHref, this.toggleState);
		} finally {
			window.location = this.quickEvalHref;
		}
	}

	_itemLoaded(event) {
		if (this._loading) {
			this._loadedElements.push(event.target);

			if (this._loadedElements.length === this._activities.length) {
				this._loading = false;
				this._loadedElements = [];
			}
		}
	}

	get errorTemplate() {
		return html`
		<div class="d2l-quick-eval-widget-error">
			<p class="d2l-body-compact">${this.localize('Error')}</p>
		</div>
		${this.viewAllLinkTemplate}`;
	}

	get noSubmissionTemplate() {
		return html`
			<div class="d2l-quick-eval-widget-no-submissions">
				<d2l-quick-eval-widget-no-submissions-image></d2l-quick-eval-widget-no-submissions-image>
				<div class="d2l-quick-eval-widget-no-submissions-text-container">
					<h4 class="d2l-heading-4">${this.localize('CaughtUp')}</h4>
					<p class="d2l-body-compact">${this.localize('NoSubmissions')}</p>
				</div>
				<d2l-button primary @click="${this.handleViewAll}" href="${this.quickEvalHref}">
					${this.localize('ViewAllActivities')}
				</d2l-button>
			</div>`;
	}

	get listTemplate() {
		const listItems = this._activities.map(activity => {
			return html`<d2l-work-to-do-activity-list-item-basic
					evaluate-href="${activity.evaluationHref}"
					href="${activity.href}"
					?skeleton=${this._loading || this.skeleton}
					submission-count=${activity.submissionCount}
					.token=${this.token}
					@data-loaded=${this._itemLoaded}></d2l-work-to-do-activity-list-item-basic>`;
		});
		return html`
			<d2l-list class="d2l-quick-eval-widget-list" separators="none">${listItems}</d2l-list>
			${this.viewAllLinkTemplate}`;
	}

	get viewAllLinkTemplate() {
		return html`
			<d2l-link small
				class="d2l-quick-eval-widget-view-all-link"
				@click="${this.handleViewAll}"
				href="${this.quickEvalHref}">${this.localize('ViewAllActivities')}</d2l-link>`;
	}

	render() {
		switch (this._state) {
			case listState:
				return this.listTemplate;
			case noSubmissionState:
				return this.noSubmissionTemplate;
			case errorState:
			default:
				return this.errorTemplate;
		}
	}
}

customElements.define('d2l-quick-eval-widget', QuickEvalWidget);
