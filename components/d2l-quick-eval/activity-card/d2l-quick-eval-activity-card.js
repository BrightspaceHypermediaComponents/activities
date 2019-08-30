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
import './d2l-quick-eval-activity-card-action-button.js';
import './d2l-quick-eval-activity-card-subtitle.js';
import 'd2l-typography/d2l-typography-shared-styles.js';

class D2LQuickEvalActivityCard extends QuickEvalLocalize(PolymerElement) {
	static get is() { return 'd2l-quick-eval-activity-card'; }
	static get template() {
		return html`
			<style include="d2l-visible-on-ancestor-styles">
				.d2l-activity-name-wrapper {
					@apply --d2l-body-standard-text;
					margin: 0;
				}
				d2l-activity-name {
					min-height: .9rem;
					max-width: 24rem;
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}
				.d2l-quick-eval-card {
					padding-bottom: .9rem;
					padding-top: .6rem;
				}
				.d2l-quick-eval-card-actions {
					padding-top: .6rem;
				}
				.d2l-quick-eval-card-actions d2l-quick-eval-activity-card-action-button {
					height: 2.1rem;
					background: white;
					display: block;
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
				.d2l-quick-eval-card-titles d2l-quick-eval-activity-card-subtitle {
					min-height: .9rem;
				}
				d2l-quick-eval-activity-card-unread-submissions {
					border-bottom: 1px solid var(--d2l-color-mica);
					height: 2.1rem;
					display: flex;
					justify-content: center;
				}

				@media (min-width: 525px) {
					.d2l-quick-eval-card {
						border: 1px solid var(--d2l-color-mica);
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
					.d2l-quick-eval-card-titles d2l-quick-eval-activity-card-subtitle {
						display: inline;
					}
					.d2l-quick-eval-card-titles {
						display: flex;
						flex-wrap: wrap;
					}
					.d2l-quick-eval-card-titles h3 {
						display: inline-block;
						margin-right: .9rem;
						max-width: 100%;
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
						border-color: var(--d2l-color-celestine-minus-1);
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
						min-width: 0;
						min-height: 3rem;
						display: block;
					}
					.d2l-quick-eval-card-titles h3 {
						display: block;
						max-width: unset;
					}
					.d2l-quick-eval-card-titles d2l-quick-eval-activity-card-subtitle {
						min-height: 1.8rem;
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
					.d2l-quick-eval-card-actions d2l-quick-eval-activity-card-action-button {
						width: 7.5rem;
						height: 3rem;
					}
				}
				[hidden] {
					display: none;
				}
				button[aria-pressed="true"] .d2l-quick-eval-activity-card-hovered-on,
				button[aria-pressed="false"] .d2l-quick-eval-activity-card-hovered-off {
					fill: var(--d2l-color-tungsten);
				}
				button[aria-pressed="true"] .d2l-quick-eval-activity-card-hovered-off,
				button[aria-pressed="false"] .d2l-quick-eval-activity-card-hovered-on {
					fill: transparent;
				}
				button {
					background-color: white;
					border: none;
					width: 100%;
					height: 100%;
				}
				.d2l-quick-eval-card-indicator circle {
					stroke: var(--d2l-color-tungsten);
				}

			</style>
			<div
				class="d2l-quick-eval-card d2l-visible-on-ancestor-target"
				on-mouseenter="_handleOnMouseenter"
				on-mouseleave="_handleOnMouseleave"
				on-focusin="_handleOnFocusin"
				on-focusout="_handleOnFocusout">
				<div class="d2l-quick-eval-card-titles">
					<h3 class="d2l-activity-name-wrapper">
						<d2l-activity-name href="[[activityNameHref]]" token="[[token]]"></d2l-activity-name>
					</h3>
					<d2l-quick-eval-activity-card-subtitle activity-type="[[activityType]]" due-date="[[dueDate]]"></d2l-quick-eval-activity-card-subtitle>
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
							on-click="_dispatchViewEvaluateNewEvent"
							unread="[[unread]]"
							resubmitted="[[resubmitted]]"
							activity-type="[[activityType]]"
							hidden$="[[!_showUnreadSubmissions(unread, resubmitted)]]"></d2l-quick-eval-activity-card-unread-submissions>
						<div class="d2l-quick-eval-card-actions">
							<d2l-quick-eval-activity-card-items visible-on-ancestor small>
								<d2l-quick-eval-activity-card-action-button
									icon-name="evaluate-all"
									text="[[localize('evaluateAll')]]"
									on-click="_dispatchViewEvaluateAllEvent"></d2l-quick-eval-activity-card-action-button>
								<d2l-quick-eval-activity-card-action-button
									icon-name="view-submission-list"
									text="[[localize('submissionList')]]"
									on-click="_dispatchViewSubmissionListEvent"></d2l-quick-eval-activity-card-action-button>
								<d2l-quick-eval-activity-card-action-button
									icon-name="publish-all"
									text="[[localize('publishAll')]]"
									on-click="_dispatchPublishAllEvent"
									disabled$="[[_disablePublishAllButton(publishAll)]]"></d2l-quick-eval-activity-card-action-button>
							</d2l-quick-eval-activity-card-items>
						</div>
					</div>
					<button
						class="d2l-quick-eval-card-indicator"
						on-click="_handleIndicatorToggle"
						aria-label$="[[_computeIndicatorLabel(activityName)]]"
						aria-pressed$="[[_indicatorPressed]]">
						<svg width="12px" height="33px" viewBox="0 0 12 33">
							<circle class="d2l-quick-eval-activity-card-hovered-off" stroke-width="2" cx="5.5" cy="5.5" r="4.5"></circle>
							<circle class="d2l-quick-eval-activity-card-hovered-on" stroke-width="2" cx="5.5" cy="26.5" r="4.5"></circle>
						</svg>
					</button>
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
			publishAll: {
				type: Object
			},
			submissionListHref: {
				type: String,
				value: ''
			},
			evaluateAllHref: {
				type: String,
				value: ''
			},
			evaluateNewHref: {
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
			activityName: {
				type: String
			},
			_indicatorPressed: {
				type: String,
				value: 'false'
			},
			_hovered: {
				type: Boolean,
				value: false
			},
			// Becaue IE11 and Edge don't have :focus-within selector.
			focusWithin: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
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

	_dispatchViewEvaluateAllEvent() {
		this.dispatchEvent(
			new CustomEvent(
				'd2l-quick-eval-activity-view-evaluate-all',
				{
					detail: {
						evaluateAllHref: this.evaluateAllHref
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}

	_dispatchViewEvaluateNewEvent() {
		this.dispatchEvent(
			new CustomEvent(
				'd2l-quick-eval-activity-view-evaluate-new',
				{
					detail: {
						evaluateNewHref: this.evaluateNewHref
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}

	_dispatchPublishAllEvent() {
		if (!this.publishAll) {
			return;
		}

		const confirmMessage = this.localize('publishAllConfirmDialogMessage', 'evaluated', this.evaluated, 'assigned', this.assigned);

		this.dispatchEvent(
			new CustomEvent(
				'd2l-quick-eval-activity-publish-all',
				{
					detail: {
						publishAll: this.publishAll,
						confirmMessage: confirmMessage
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

	_computeIndicatorLabel(activityName) {
		return this.localize('toggleIndicatorLabel', 'target', activityName);
	}

	_handleIndicatorToggle() {
		const attr = 'd2l-visible-on-ancestor-hide';
		const actions = this.shadowRoot.querySelector('.d2l-quick-eval-card-actions d2l-quick-eval-activity-card-items');
		if (actions.hasAttribute(attr)) {
			actions.removeAttribute(attr);
			const firstButton = this.shadowRoot.querySelector('d2l-quick-eval-activity-card-action-button');
			firstButton.focus();
			this._indicatorPressed = 'true';
		} else {
			actions.setAttribute(attr, attr);
			this._indicatorPressed = 'false';
		}
	}

	_handleOnMouseenter() {
		this._indicatorPressed = 'true';
		this._hovered = true;
	}

	_handleOnMouseleave() {
		this._indicatorPressed = 'false';
		this._hovered = false;
	}

	_handleOnFocusin() {
		this.focusWithin = true;
		this._indicatorPressed = 'true';
	}

	_handleOnFocusout() {
		this.focusWithin = false;
		if (!this._hovered) {
			this._indicatorPressed = 'false';
		}
	}

	_disablePublishAllButton() {
		return !this.publishAll;
	}
}

window.customElements.define(D2LQuickEvalActivityCard.is, D2LQuickEvalActivityCard);
