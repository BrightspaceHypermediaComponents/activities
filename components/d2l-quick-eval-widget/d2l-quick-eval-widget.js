import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/link/link.js';
import '../d2l-quick-eval/d2l-quick-eval-no-submissions-image.js';
import '../d2l-work-to-do/d2l-work-to-do-activity-list-item-basic.js';

import { css, html, LitElement } from 'lit-element';
import { bodyCompactStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { fetchActivities, fetchEvaluateAllHref, fetchSubmissionCount, setToggleState } from './d2l-quick-eval-widget-controller.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

const errorState = 'error';
const loadedState = 'loaded';
const noSubmissionState = 'noSubmission';

export class QuickEvalWidget extends SkeletonMixin(LitElement) {
	static get properties() {
		return {
			_activities: { type: Array },
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
			d2l-quick-eval-no-submissions-image {
				padding-top: 30px;
				width: 100%;
			}
			.d2l-quick-eval-widget-no-submissions-text-container {
				text-align: center;
			}
			.d2l-quick-eval-widget-no-submissions-text-container h4 {
				margin-block-end: 0;
			}
			.d2l-quick-eval-widget-error {
				background: var(--d2l-color-regolith);
				border: 1px solid var(--d2l-color-mica);
				border-radius: 0.3rem;
				box-sizing: border-box;
				padding: 0 1rem;
				width: 100%;
			}
		` ];
	}

	constructor() {
		super();
		this._activities = [];
		this.count = 6;
	}

	async updated(changedProperties) {
		super.updated();

		if ((changedProperties.has('activitiesHref') || changedProperties.has('token')) && this.activitiesHref && this.token) {
			this.skeleton = true;
			try {
				this._activities = await this.getActivities(this.activitiesHref, this.token);
				this._state = this._activities.length > 0 ? loadedState : noSubmissionState;
			} catch (e) {
				console.error('quick-eval-widget: Unable to load activities from entity.');
				this._state = errorState;
			} finally {
				this.skeleton = false;
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
				.map(async activityUsage => {
					let submissionCount = await fetchSubmissionCount(activityUsage, token);

					// don't display submissionCounts of zero
					if (submissionCount === 0) {
						submissionCount = undefined;
					}

					const href = activityUsage.getLinkByRel('self').href;
					const evaluateAllHref = await fetchEvaluateAllHref(activityUsage, token);

					return {
						submissionCount,
						href,
						evaluateAllHref
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

	get errorTemplate() {
		return html`
		<div class="d2l-quick-eval-widget-error">
			<p class="d2l-body-compact">Whoops! Something went wrong and items could not be loaded. Please refresh the page or try again later.</p>
		</div>`;
	}

	get noSubmissionTemplate() {
		return html`
			<div class="d2l-quick-eval-widget-no-submissions">
				<d2l-quick-eval-no-submissions-image></d2l-quick-eval-no-submissions-image>
				<div class="d2l-quick-eval-widget-no-submissions-text-container">
					<h4 class="d2l-heading-4">You're all caught up!</h4>
					<p class="d2l-body-compact">You have no submissions that need evaluation. Check back later for new submissions.</p>
				</div>
				<d2l-button primary>View All Activities</d2l-button>
			</div>`;
	}

	get loadedTemplate() {
		const listItems = this._activities.map(activity => {
			return html`<d2l-work-to-do-activity-list-item-basic
					evaluate-all-href="${activity.evaluateAllHref}"
					href="${activity.href}"
					submission-count=${activity.submissionCount}
					.token=${ifDefined(this.token)}></d2l-work-to-do-activity-list-item-basic>`;
		});
		return html`
			<d2l-list class="d2l-quick-eval-widget-list" separators="none">${listItems}</d2l-list>
			${this.viewAllLinkTemplate}`;
	}

	get viewAllLinkTemplate() {
		return html`
			<d2l-link small @click="${this.handleViewAll}" href="${this.quickEvalHref}">View all activities</d2l-link>`;
	}

	render() {
		// delete when d2l-list supports SkeletonMixin
		if (this.skeleton) {
			const loading = [];
			for (let i = 0; i < this.count ; i++) {
				loading.push(html`<ol class="d2l-skeletize"><li></li><li></li></ol>`);
			}
			return html`
				${loading }
				${this.viewAllLinkTemplate}`;
		}

		switch (this._state) {
			case loadedState:
				return this.loadedTemplate;
			case noSubmissionState:
				return this.noSubmissionTemplate;
			case errorState:
			default:
				return this.errorTemplate;
		}
	}
}

customElements.define('d2l-quick-eval-widget', QuickEvalWidget);
