import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from '../QuickEvalLocalize.js';
import '../../d2l-activity-name/d2l-activity-name.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier3-icons.js';
import 'd2l-polymer-behaviors/d2l-visible-on-ancestor-behavior.js';
import './d2l-quick-eval-activity-card-items.js';
import './d2l-quick-eval-activity-card-unread-submissions.js';

class D2LQuickEvalActivityCard extends QuickEvalLocalize(PolymerElement) {
	static get is() { return 'd2l-quick-eval-activity-card'; }
	static get template() {
		return html`
			<style include="d2l-visible-on-ancestor-styles">
				.d2l-quick-eval-card {
					border: 3px solid var(--d2l-color-ferrite);
					border-radius: 10px;
					padding: 2.2rem;
					display: flex;
					justify-content: space-between;
				}
				.d2l-quick-eval-card:hover,
				.d2l-quick-eval-card:focus-within {
					border-color: var(--d2l-color-celestine-plus-1);
					outline: none;
				}
				d2l-quick-eval-activity-card-unread-submissions {
					width: 7.5rem;
					height: 3rem;
				}
				button.d2l-quick-eval-activity-card-item {
					width: 7.55rem;
				}
				.d2l-quick-eval-card-right {
					display: flex;
					align-items: center;
				}
				.d2l-quick-eval-activity-card-items-container {
					position: relative;
				}
				d2l-quick-eval-activity-card-items[visible-on-ancestor] {
					position: absolute;
					top: 0;
					left: 0;
				}
				.d2l-quick-eval-card:hover .d2l-quick-eval-activity-card-hovered-on,
				.d2l-quick-eval-card:focus-within .d2l-quick-eval-activity-card-hovered-on,
				.d2l-quick-eval-activity-card-hovered-off {
					fill: var(--d2l-color-tungsten);
				}
				.d2l-quick-eval-card:hover .d2l-quick-eval-activity-card-hovered-off,
				.d2l-quick-eval-card:focus-within .d2l-quick-eval-activity-card-hovered-off,
				.d2l-quick-eval-activity-card-hovered-on {
					fill: transparent;
				}
				button {
					background-color: white;
					outline: none;
				}
				button:hover,
				button:focus,
				button:hover d2l-icon,
				button:focus d2l-icon {
					color: var(--d2l-color-celestine-plus-1);
				}
				circle {
					stroke: var(--d2l-color-tungsten);
				}
				[hidden] {
					display: none;
				}
			</style>
			<div class="d2l-quick-eval-card d2l-visible-on-ancestor-target" on-click="_clicked" tabindex="-1">
				<div>
					<d2l-activity-name href="[[activityNameHref]]" token="[[token]]"></d2l-activity-name>
					<span>[[activityType]]</span> <span hidden$="[[!dueDate]]"> &bull; [[localize('due', 'date', dueDate)]]</span>
				</div>
				<div class="d2l-quick-eval-card-right">
					<d2l-quick-eval-activity-card-unread-submissions unread="[[unread]]" resubmitted="[[resubmitted]]" hidden$="[[!_showUnreadSubmissions(unread, resubmitted)]]"></d2l-quick-eval-activity-card-unread-submissions>
					<div class="d2l-quick-eval-activity-card-items-container">
						<d2l-quick-eval-activity-card-items>
							<span>[[completed]]/[[assigned]] [[localize('completed')]]</span>
							<span>[[evaluated]]/[[assigned]] [[localize('evaluated')]]</span>
							<span>[[published]]/[[assigned]] [[localize('published')]]</span>
						</d2l-quick-eval-activity-card-items>
						<d2l-quick-eval-activity-card-items visible-on-ancestor>
							<button class="d2l-quick-eval-activity-card-item"><d2l-icon icon="d2l-tier3:evaluate-all"></d2l-icon>[[localize('evaluateAll')]]</button>
							<button class="d2l-quick-eval-activity-card-item"><d2l-icon icon="d2l-tier3:view-submission-list"></d2l-icon>[[localize('submissionList')]]</button>
							<button class="d2l-quick-eval-activity-card-item"><d2l-icon icon="d2l-tier3:publish-all"></d2l-icon>[[localize('publishAll')]]</button>
						</d2l-quick-eval-activity-card-items>
					</div>
					<svg width=".7rem" height="1.4rem">
						<circle cx=".35rem" cy=".35rem" r=".25rem" stroke-width=".1rem" class="d2l-quick-eval-activity-card-hovered-off"></circle>
						<circle cx=".35rem" cy="1.1rem" r=".25rem" stroke-width=".1rem" class="d2l-quick-eval-activity-card-hovered-on"></circle>
					</svg>
				</div>
			</div>
		`;
	}
	static get properties() {
		return {
			assigned: {
				type: Number,
				value: 0
			},
			completed: {
				type: Number,
				value: 0
			},
			evaluated: {
				type: Number,
				value: 0
			},
			published: {
				type: Number,
				value: 0
			},
			unread: {
				type: Number,
				value: 0
			},
			resubmitted: {
				type: Number,
				value: 0
			},
			dueDate: {
				type: String,
				value: ''
			},
			activityNameHref: {
				type: String,
				value: ''
			},
			token: {
				type: String,
				value: ''
			},
			activityType: {
				type: String,
				value: ''
			},
			_focused: {
				type: Boolean,
				value: false
			}
		};
	}

	_clicked() {
		if (this._focused) {
			this.blur();
		}
		this._focused = !this._focused;
	}

	_showUnreadSubmissions(unread, resubmitted) {
		return (unread > 0) || (resubmitted > 0);
	}
}

window.customElements.define(D2LQuickEvalActivityCard.is, D2LQuickEvalActivityCard);
