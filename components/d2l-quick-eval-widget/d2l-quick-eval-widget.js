import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/link/link.js';
import '../d2l-work-to-do/d2l-work-to-do-activity-list-item-basic.js';

import { css, html, LitElement } from 'lit-element';
import { bodyCompactStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { fetchActivities, fetchEvaluateAllHref, fetchSubmissionCount, setToggleState } from './d2l-quick-eval-widget-controller.js';
import { LocalizeQuickEvalWidget } from './lang/localize-quick-eval-widget.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

export class QuickEvalWidget extends LocalizeQuickEvalWidget(SkeletonMixin(LitElement)) {
	static get properties() {
		return {
			_activities: { type: Array },
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
			} finally {
				this.skeleton = false;
			}
		}
	}

	async getActivities(href, token) {
		const unassessedActivityCollection = await fetchActivities(href, token);
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

	render() {
		const listItems = this._activities.map(activity => {
			return html`<d2l-work-to-do-activity-list-item-basic
					evaluate-all-href="${activity.evaluateAllHref}"
					href="${activity.href}"
					submission-count=${activity.submissionCount}
					.token=${ifDefined(this.token)}></d2l-work-to-do-activity-list-item-basic>`;
		});

		const loaded = html`<d2l-list class="d2l-quick-eval-widget-list" separators="none">${listItems}</d2l-list>`;

		// delete when d2l-list supports SkeletonMixin
		const loading = [];
		for (let i = 0; i < this.count ; i++) {
			loading.push(html`<ol class="d2l-skeletize"><li></li><li></li></ol>`);
		}

		return html`
			${ this.skeleton ? loading : loaded }
			<d2l-link small @click="${this.handleViewAll}" href="${this.quickEvalHref}">${this.localize('ViewAllActivities')}</d2l-link>
		`;
	}
}

customElements.define('d2l-quick-eval-widget', QuickEvalWidget);
