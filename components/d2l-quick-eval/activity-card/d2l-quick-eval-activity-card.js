import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from '../QuickEvalLocalize.js';
import '../../d2l-activity-name/d2l-activity-name.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier3-icons.js';
import 'd2l-polymer-behaviors/d2l-visible-on-ancestor-behavior.js';
import '@brightspace-ui/core/components/meter/meter-radial.js';
import './d2l-quick-eval-activity-card-items.js';
import './d2l-quick-eval-activity-card-unread-submissions.js';

class D2LQuickEvalActivityCard extends QuickEvalLocalize(PolymerElement) {
	static get is() { return 'd2l-quick-eval-activity-card'; }
	static get template() {
		return html`
			<style include="d2l-visible-on-ancestor-styles">
				d2l-activity-name {
					min-height: .9rem;
				}
				.d2l-quick-eval-card {
					padding-bottom: .9rem;
					padding-top: .6rem;
				}
				.d2l-quick-eval-card-actions {
					padding-top: .6rem;
				}
				.d2l-quick-eval-card-actions div {
					height: 2.1rem;
				}
				.d2l-quick-eval-card-indicator {
					display: none;
				}
				.d2l-quick-eval-card-meters {
					padding-bottom: .6rem;
					padding-top: .9rem;
					border-bottom: 1px solid var(--d2l-color-mica);
				}
				.d2l-quick-eval-card-meters span {
					height: 2.7rem;
				}
				.d2l-quick-eval-card-subtitle {
					font-size: .6rem;
					height: .9rem;
				}
				d2l-quick-eval-activity-card-unread-submissions {
					border-bottom: 1px solid var(--d2l-color-mica);
					height: 2.1rem;
					display: flex;
					justify-content: center;
				}

				@media (min-width: 525px) {
					d2l-activity-name {
						display: inline;
					}
					.d2l-quick-eval-card {
						border: 1px solid var(--d2l-color-galena);
						border-radius: 6px;
						padding: .9rem;
					}
					.d2l-quick-eval-card-actions {
						flex-grow: 3;
						padding-top: .9rem;
						width: 75%;
					}
					.d2l-quick-eval-activity-card-items-container {
						display: flex;
						flex-wrap: wrap;
						align-items: center;
					}
					.d2l-quick-eval-card-meters {
						width: 100%;
						padding-bottom: .9rem;
						padding-top: 1.2rem;
						border-bottom: 1px solid var(--d2l-color-mica);
					}
					.d2l-quick-eval-card-meters span {
						height: 3rem;
					}
					.d2l-quick-eval-card-subtitle {
						display: inline;
					}
					d2l-quick-eval-activity-card-unread-submissions {
						flex-grow: 1;
						border: none;
						padding-top: .9rem;
						width: 25%;
					}
				}
				@media (min-width: 900px) {
					d2l-activity-name {
						height: 1.2rem;
					}
					.d2l-quick-eval-card {
						padding: 1.2rem;
						padding-right: 0;
						display: flex;
						justify-content: space-between;
					}
					.d2l-quick-eval-card:hover,
					.d2l-quick-eval-card:focus-within {
						border-color: var(--d2l-color-celestine-plus-1);
						outline: none;
					}
					.d2l-quick-eval-card-indicator {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 2.1rem;
						height: 3rem;
					}
					d2l-quick-eval-activity-card-items[visible-on-ancestor] {
						position: absolute;
						top: 0;
						right: 0;
					}
					:host(:dir(rtl)) d2l-quick-eval-activity-card-items[visible-on-ancestor] {
						left: 0;
						right: initial;
					}
					.d2l-quick-eval-activity-card-items-container {
						position: relative;
						display: flex;
					}
					.d2l-quick-eval-card-meters,
					.d2l-quick-eval-card-actions {
						height: 3rem;
						padding: 0;
						border: none;
						width: auto;
					}
					.d2l-quick-eval-card-right {
						display: flex;
						align-items: center;
						min-width: 32.3rem;
						justify-content: flex-end;
					}
					.d2l-quick-eval-card-titles {
						min-height: 3rem;
					}
					.d2l-quick-eval-card-subtitle {
						font-size: .7rem;
						line-height: .7rem;
						height: 1.8rem;
						display: flex;
						align-items: flex-end;
						margin-left: 1.5rem;
					}
					d2l-quick-eval-activity-card-unread-submissions {
						border: none;
						padding: 0;
						order: -1;
					}
					d2l-quick-eval-activity-card-unread-submissions,
					.d2l-quick-eval-card-meters span,
					.d2l-quick-eval-card-actions div {
						width: 7.5rem;
						height: 3rem;
					}
				}
				[hidden] {
					display: none;
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
					border: none;
					width: 100%;
					height: 100%;
				}
				button:hover,
				button:focus,
				button:hover d2l-icon,
				button:focus d2l-icon {
					color: var(--d2l-color-celestine-plus-1);
				}
				.d2l-quick-eval-card-indicator circle {
					stroke: var(--d2l-color-tungsten);
				}
			</style>
			<div class="d2l-quick-eval-card d2l-visible-on-ancestor-target">
				<div class="d2l-quick-eval-card-titles">
					<d2l-activity-name href="[[activityNameHref]]" token="[[token]]"></d2l-activity-name>
					<div class="d2l-quick-eval-card-subtitle"><span>[[localize(activityType)]]</span> <span hidden$="[[!formattedDueDate]]"> &bull; [[localize('due', 'date', formattedDueDate)]]</span></div>
				</div>
				<div class="d2l-quick-eval-card-right">
					<div class="d2l-quick-eval-activity-card-items-container">
						<div class="d2l-quick-eval-card-meters">
							<d2l-quick-eval-activity-card-items>
								<div>
							<d2l-meter-radial value="[[completed]]" max="[[assigned]]" percent$="[[_denominatorOver99(assigned)]]" text="[[localize('completed')]]"></d2l-meter-radial>
								</div>
								<div>
							<d2l-meter-radial value="[[evaluated]]" max="[[assigned]]" percent$="[[_denominatorOver99(assigned)]]" text="[[localize('evaluated')]]"></d2l-meter-radial>
								</div>
								<div>
							<d2l-meter-radial value="[[published]]" max="[[assigned]]" percent$="[[_denominatorOver99(assigned)]]" text="[[localize('published')]]"></d2l-meter-radial>
								</div>
							</d2l-quick-eval-activity-card-items>
						</div>
						<d2l-quick-eval-activity-card-unread-submissions
							unread="[[unread]]"
							resubmitted="[[resubmitted]]"
							activity-type="[[activityType]]"
							hidden$="[[!_showUnreadSubmissions(unread, resubmitted)]]"></d2l-quick-eval-activity-card-unread-submissions>
						<div class="d2l-quick-eval-card-actions">
							<d2l-quick-eval-activity-card-items visible-on-ancestor small>
								<div>
									<button class="d2l-quick-eval-activity-card-item">
										<d2l-icon icon="d2l-tier3:evaluate-all"></d2l-icon>[[localize('evaluateAll')]]
									</button>
								</div>
                                <div>
                                    <button class="d2l-quick-eval-activity-card-item" on-click="_dispatchViewSubmissionListEvent">
                                        <d2l-icon icon="d2l-tier3:view-submission-list"></d2l-icon>[[localize('submissionList')]]
                                    </button>
                                </div>
								<div>
									<button class="d2l-quick-eval-activity-card-item" on-click="_dispatchPublishAllEvent">
										<d2l-icon icon="d2l-tier3:publish-all"></d2l-icon>[[localize('publishAll')]]
									</button>
								</div>
							</d2l-quick-eval-activity-card-items>
						</div>
					</div>
					<div class="d2l-quick-eval-card-indicator">
						<svg width="12px" height="33px" viewBox="0 0 12 33">
							<circle class="d2l-quick-eval-activity-card-hovered-off" stroke-width="2" cx="5.5" cy="5.5" r="4.5"></circle>
							<circle class="d2l-quick-eval-activity-card-hovered-on" stroke-width="2" cx="5.5" cy="26.5" r="4.5"></circle>
						</svg>
					</div>
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
			formattedDueDate: {
				type: String,
				computed: '_computeFormattedDueDate(dueDate)'
			},
			publishAll: {
				type: Object
			},
			submissionListHref: {
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
			}
		};
	}

	ready() {
		super.ready();
		window.addEventListener('resize', this._onWindowResize.bind(this));
		this._onWindowResize();
	}

	_dispatchViewSubmissionListEvent() {
		this.dispatchEvent(
			new CustomEvent(
				'd2l-quick-eval-activity-view-submission-list',
				{
					detail: {
						submissionListHref: this.submissionListHref
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}

	_dispatchPublishAllEvent() {
		this.dispatchEvent(
			new CustomEvent(
				'd2l-quick-eval-activity-publish-all',
				{
					detail: {
						publishAll: this.publishAll
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}

	_showUnreadSubmissions(unread, resubmitted) {
		return (unread > 0) || (resubmitted > 0);
	}

	_onWindowResize() {
		const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		const actions = this.shadowRoot.querySelector('.d2l-quick-eval-card-actions d2l-quick-eval-activity-card-items');
		if (width >= 900) {
			actions.setAttribute('visible-on-ancestor', '');
		} else {
			actions.removeAttribute('visible-on-ancestor');
			actions.removeAttribute('d2l-visible-on-ancestor-hide');
		}
	}

	_denominatorOver99(num) {
		return num > 99;
	}

	_computeFormattedDueDate(dueDate) {
		if (dueDate) {
			return this.formatDateTime(new Date(dueDate));
		}
		return '';
	}
}

window.customElements.define(D2LQuickEvalActivityCard.is, D2LQuickEvalActivityCard);
