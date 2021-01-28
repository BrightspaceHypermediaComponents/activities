import '@brightspace-ui/core/components/colors/colors';
import '@brightspace-ui/core/components/status-indicator/status-indicator';

import { heading2Styles, heading3Styles, heading4Styles, labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html, LitElement } from 'lit-element/lit-element';
import { Constants, getUpcomingWeekLimit } from './env';
import { classMap } from 'lit-html/directives/class-map.js';
import { formatDate } from '@brightspace-ui/intl/lib/dateTime';
import { LocalizeWorkToDoMixin } from './localization';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin';

const ro = new ResizeObserver(entries => {
	entries.forEach(entry => {
		const observerSize = entry && ((entry.contentBoxSize && entry.contentBoxSize[0]) || entry.contentBoxSize || entry.contentRect);
		const width = observerSize && observerSize.width || observerSize.inlineSize;

		if (entry && entry.target && entry.target.resizedCallback && width) {
			entry.target.resizedCallback(width);
		}
	});
});

/**
 * Provides Title and Count for associated activity usage list
 */
class ActivityListHeader extends SkeletonMixin(LocalizeWorkToDoMixin(LitElement)) {

	static get properties() {
		return {
			/** Total count for activity usage entities that match the subcategory header range. */
			count: { type: Number },
			/** Represents if component is to render fullscreen version */
			fullscreen: { type: Boolean },
			/** Represents if corresponding entities are overdue or upcoming */
			isOverdue: { type: Boolean, attribute: 'overdue' },
		};
	}

	static get styles() {
		return [
			super.styles,
			heading2Styles,
			heading3Styles,
			heading4Styles,
			labelStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-activity-list-header-basic {
					border-bottom: 1px solid var(--d2l-color-mica);
					display: flex;
					justify-content: space-between;
					margin-bottom: 1px;
					padding-bottom: 0.3rem;
				}
				.d2l-activity-list-header-detailed {
					display: flex;
					justify-content: space-between;
					padding-bottom: 0;
				}
				.d2l-activity-list-header-message {
					width: 80%;
				}
				.d2l-activity-list-counter {
					background-color: var(--d2l-color-carnelian-minus-1);
					border: 1px solid var(--d2l-color-carnelian-minus-1);
					border-radius: 0.6rem;
					color: white;
					display: inline-block;
					height: fit-content;
					line-height: 1;
					padding: 0.15rem 0.3rem;
					vertical-align: middle;
				}
				.d2l-activity-list-counter.d2l-heading-3 {
					border-radius: 0.8rem;
					padding: 0.25rem 0.45rem 0.25rem 0.45rem;
				}
				.d2l-body-small,
				.d2l-heading-2,
				.d2l-heading-3,
				.d2l-heading-4 {
					margin: auto 0;
				}
				:host([skeleton]) .d2l-activity-list-header-basic,
				:host([skeleton]) .d2l-activity-list-counter {
					border-color: transparent;
				}
				:host([skeleton]) .d2l-activity-list-counter-container {
					min-width: 2rem;
				}
			`
		];
	}

	constructor() {
		super();
		this.count = 0;
		this.fullscreen = false;
		this.isOverdue = false;
	}

	connectedCallback() {
		super.connectedCallback();
		ro.observe(this);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		ro.unobserve(this);
	}

	render() {
		const containerClasses = {
			'd2l-activity-list-header-basic': !this.fullscreen,
			'd2l-activity-list-header-detailed': this.fullscreen
		};
		const messageClasses = {
			'd2l-activity-list-header-message': true,
			'd2l-heading-4': !this.fullscreen,
			'd2l-heading-2': this.fullscreen,
			'd2l-skeletize': true,
			'd2l-skeletize-65': !this.fullscreen,
			'd2l-skeletize-35': this.fullscreen
		};
		const counterContainerClasses = {
			'd2l-activity-list-counter-container': true,
			'd2l-heading-3': !this.fullscreen,
			'd2l-heading-2': this.fullscreen,
			'd2l-skeletize': true,
		};
		const counterClasses = {
			'd2l-activity-list-counter': true,
			'd2l-label-text': !this.fullscreen,
			'd2l-heading-3': this.fullscreen,
		};

		const messageTemplate = html`
			<div class=${classMap(messageClasses)}>
				${this._message}
			</div>`;

		const counterTemplate = html`
			<div class=${classMap(counterContainerClasses)}>
				<div class=${classMap(counterClasses)}>
					${this._counterString}
				</div>
			</div>`;

		return html`
			<div class=${classMap(containerClasses)}>
				${messageTemplate}
				${counterTemplate}
			</div>
		`;
	}

	get _counterString() {
		if (this.skeleton) {
			return '';
		}
		return this.count > Constants.MaxActivityCount
			? `${Constants.MaxActivityCount}+`
			: `${this.count}`;
	}

	get _message() {
		if (this.skeleton) {
			return '';
		}
		if (this.isOverdue) {
			return this.localize('overdue');
		}
		if (this.fullscreen) {
			return this.localize('upcoming');
		}

		const now = new Date();
		const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (getUpcomingWeekLimit() * 7), 23, 59, 59, 999);
		const startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
		const monthFormat = this._width <= 228 ? 'MMM' : 'MMMM';

		const startDay = formatDate(startDate, { format: 'd' });
		const startMonth = formatDate(startDate, { format: monthFormat });
		const endDay = formatDate(endDate, { format: 'd' });
		const endMonth = formatDate(endDate, { format: monthFormat });

		return this.localize(
			'dateHeader',
			'startMonth', startMonth,
			'startDay', startDay,
			'endMonth', endMonth,
			'endDay', endDay
		);
	}

	resizedCallback(width) {
		this._width = width;
		this.requestUpdate('_message');
	}
}
customElements.define('d2l-work-to-do-activity-list-header', ActivityListHeader);
