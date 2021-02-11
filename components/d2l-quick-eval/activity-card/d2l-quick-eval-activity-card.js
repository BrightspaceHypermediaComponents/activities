import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { QuickEvalLocalize } from '../QuickEvalLocalize.js';
import '../../d2l-activity-name/d2l-activity-name.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier3-icons.js';
import '@brightspace-ui/core/components/meter/meter-radial.js';
import './d2l-quick-eval-activity-card-items.js';
import './d2l-quick-eval-activity-card-new-submissions.js';
import './d2l-quick-eval-activity-card-action-button.js';
import './d2l-quick-eval-activity-card-action-button-more.js';
import './d2l-quick-eval-activity-card-subtitle.js';
import 'd2l-typography/d2l-typography-shared-styles.js';

class D2LQuickEvalActivityCard extends QuickEvalLocalize(PolymerElement) {
	static get template() {
		return html`
			<style>
				:host {
					display: block;
				}
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
				.d2l-quick-eval-card-actions d2l-quick-eval-activity-card-action-button,
				.d2l-quick-eval-card-actions d2l-quick-eval-activity-card-action-button-more {
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
				.d2l-quick-eval-card-titles d2l-quick-eval-activity-card-subtitle {
					min-height: .9rem;
				}
				d2l-quick-eval-activity-card-new-submissions {
					border-bottom: 1px solid var(--d2l-color-mica);
					height: 2.1rem;
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
					d2l-quick-eval-activity-card-new-submissions {
						border: none;
						flex-grow: 1;
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
					d2l-quick-eval-activity-card-items {
						transition: transform 200ms ease-out, opacity 200ms ease-out;
					}
					@media (prefers-reduced-motion: reduce) {
						d2l-quick-eval-activity-card-items {
							transition: none;
						}
					}
					.d2l-quick-eval-card-actions d2l-quick-eval-activity-card-items {
						position: absolute;
						top: 0;
						right: 2.1rem;
					}
					:host(:dir(rtl)) .d2l-quick-eval-card-actions d2l-quick-eval-activity-card-items {
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
					d2l-quick-eval-activity-card-new-submissions {
						border: none;
						padding: 0;
						order: -1;
					}
					d2l-quick-eval-activity-card-new-submissions {
						height: 2.5rem;
						width: 7.5rem;
					}
					.d2l-quick-eval-card-meters span,
					.d2l-quick-eval-card-actions d2l-quick-eval-activity-card-action-button,
					.d2l-quick-eval-card-actions d2l-quick-eval-activity-card-action-button-more {
						height: 3rem;
						width: 7.5rem;
					}
					[not-seen-desktop] {
						opacity: 0;
						transform: translateY(-10px);
					}
				}
				:host([hidden]) {
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
				class="d2l-quick-eval-card"
				on-mouseenter="_handleOnMouseenter"
				on-mouseleave="_handleOnMouseleave">
				<div class="d2l-quick-eval-card-titles">
					<h3 class="d2l-activity-name-wrapper">
						<d2l-activity-name href="[[activityNameHref]]" token="[[token]]"></d2l-activity-name>
					</h3>
					<d2l-quick-eval-activity-card-subtitle activity-type="[[activityType]]" due-date="[[dueDate]]"></d2l-quick-eval-activity-card-subtitle>
				</div>
				<div class="d2l-quick-eval-card-right">
					<div class="d2l-quick-eval-activity-card-items-container">
						<div class="d2l-quick-eval-card-meters">
							<d2l-quick-eval-activity-card-items not-seen-desktop$="[[_indicatorPressed]]">
								<div class="d2l-meter-radial-container" aria-hidden$="[[_computeIndicatorPressed(_indicatorPressed, _desktopView)]]">
									<d2l-meter-radial value="[[completed]]" max="[[assigned]]" percent$="[[_denominatorOver99(assigned)]]" text="[[localize('completed')]]"></d2l-meter-radial>
								</div>
								<div class="d2l-meter-radial-container" aria-hidden$="[[_computeIndicatorPressed(_indicatorPressed, _desktopView)]]">
									<d2l-meter-radial value="[[evaluated]]" max="[[assigned]]" percent$="[[_denominatorOver99(assigned)]]" text="[[localize('evaluated')]]"></d2l-meter-radial>
								</div>
								<div class="d2l-meter-radial-container" aria-hidden$="[[_computeIndicatorPressed(_indicatorPressed, _desktopView)]]">
									<d2l-meter-radial value="[[published]]" max="[[assigned]]" percent$="[[_denominatorOver99(assigned)]]" text="[[localize('published')]]"></d2l-meter-radial>
								</div>
							</d2l-quick-eval-activity-card-items>
						</div>
						<d2l-quick-eval-activity-card-new-submissions
							href="[[evaluateNewHref]]"
							new-submissions="[[newSubmissions]]"
							resubmitted="[[resubmitted]]"
							activity-type="[[activityType]]"
							hidden$="[[!_showNewSubmissions(newSubmissions, resubmitted)]]"></d2l-quick-eval-activity-card-new-submissions>
						<button
							class="d2l-quick-eval-card-indicator"
							on-click="_handleIndicatorToggle"
							aria-label$="[[_computeIndicatorLabel(activityName, _indicatorPressed)]]"
							aria-pressed$="[[_computeIndicatorPressed(_indicatorPressed, _desktopView)]]">
							<svg width="12px" height="33px" viewBox="0 0 12 33">
								<circle class="d2l-quick-eval-activity-card-hovered-off" stroke-width="2" cx="5.5" cy="5.5" r="4.5"></circle>
								<circle class="d2l-quick-eval-activity-card-hovered-on" stroke-width="2" cx="5.5" cy="26.5" r="4.5"></circle>
							</svg>
						</button>
						<div class="d2l-quick-eval-card-actions">
							<d2l-quick-eval-activity-card-items not-seen-desktop$="[[!_indicatorPressed]]" small>
								<d2l-quick-eval-activity-card-action-button
									icon-name="evaluate-all"
									text="[[localize('evaluateAll')]]"
									on-click="_dispatchViewEvaluateAllEvent"
									tab-index-number="[[_computeTabstop(_indicatorPressed, _desktopView)]]"
									aria-hidden$="[[_computeOppositeIndicatorPressed(_indicatorPressed, _desktopView)]]"></d2l-quick-eval-activity-card-action-button>
								<d2l-quick-eval-activity-card-action-button
									icon-name="view-submission-list"
									text="[[localize('submissionList')]]"
									on-click="_dispatchViewSubmissionListEvent"
									tab-index-number="[[_computeTabstop(_indicatorPressed, _desktopView)]]"
									aria-hidden$="[[_computeOppositeIndicatorPressed(_indicatorPressed, _desktopView)]]"></d2l-quick-eval-activity-card-action-button>
								<d2l-quick-eval-activity-card-action-button
									hidden$="[[dismissEnabled]]"
									icon-name="publish-all"
									text="[[localize('publishAll')]]"
									on-click="_dispatchPublishAllEvent"
									disabled$="[[_disablePublishAllButton(publishAll)]]"
									tab-index-number="[[_computeTabstop(_indicatorPressed, _desktopView)]]"
									aria-hidden$="[[_computeOppositeIndicatorPressed(_indicatorPressed, _desktopView)]]"></d2l-quick-eval-activity-card-action-button>
								<d2l-quick-eval-activity-card-action-button-more
									hidden$="[[!dismissEnabled]]"
									tabindexnumber="[[_computeTabstop(_indicatorPressed, _desktopView)]]"
									aria-hidden$="[[_computeOppositeIndicatorPressed(_indicatorPressed, _desktopView)]]">
										<d2l-menu-item 
											text="[[localize('publishAll')]]" 
											on-d2l-menu-item-select="_dispatchPublishAllEvent" 
											disabled="[[_disablePublishAllButton(publishAll)]]"
											aria-disabled$="[[_disablePublishAllButtonString(publishAll)]]"></d2l-menu-item>
										<d2l-menu-item text="[[localize('dismissUntil')]]" on-d2l-menu-item-select="_dispatchDismissUntilEvent"></d2l-menu-item>
									</d2l-quick-eval-activity-card-action-button-more>
							</d2l-quick-eval-activity-card-items>
						</div>
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
			newSubmissions: {
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
			dismissEnabled: {
				type: Boolean,
				value: false
			},
			dismissHref: {
				type: String,
				value: ''
			},
			_indicatorPressed: {
				type: Boolean,
				value: false
			},
			_hovered: {
				type: Boolean,
				value: false
			},
			_desktopView: {
				type: Boolean,
				value: false
			},
			mql: {
				type: Object
			}
		};
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

	connectedCallback() {
		super.connectedCallback();
		this.mql = window.matchMedia('(min-width: 900px)');
		this._updateScreenWidth = this._updateScreenWidth.bind(this);
		this._updateScreenWidth(this.mql);
		this.mql.addListener(this._updateScreenWidth);
	}

	disconnectedCallback() {
		this.mql.removeListener(this._updateScreenWidth);
	}

	_updateScreenWidth(e) {
		this._desktopView = e.matches;
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

	_dispatchPublishAllEvent() {
		if (!this.publishAll) {
			return;
		}

		const confirmMessage = this.localize('publishAllConfirmDialogMessage', 'evaluated', this.evaluated - this.published, 'assigned', this.assigned);

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

	_dispatchDismissUntilEvent() {
		this.dispatchEvent(
			new CustomEvent(
				'd2l-quick-eval-activity-dismiss-until',
				{
					detail: {
						dismissHref: this.dismissHref
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}

	_showNewSubmissions(newSubmissions, resubmitted) {
		return (newSubmissions > 0) || (resubmitted > 0);
	}

	_denominatorOver99(num) {
		return num > 99;
	}

	_computeIndicatorLabel(activityName, _indicatorPressed) {
		if (_indicatorPressed) {
			return this.localize('toggleIndicatorLabelInfo', 'target', activityName);
		} else {
			return this.localize('toggleIndicatorLabelActions', 'target', activityName);
		}
	}

	_computeIndicatorPressed(_indicatorPressed, _desktopView) {
		return (_indicatorPressed && _desktopView).toString();
	}

	_computeOppositeIndicatorPressed(_indicatorPressed, _desktopView) {
		return this._computeIndicatorPressed(!_indicatorPressed, _desktopView);
	}

	_computeTabstop(_indicatorPressed, _desktopView) {
		return _indicatorPressed || !_desktopView ? 0 : -1;
	}

	_handleIndicatorToggle() {
		this._indicatorPressed = !this._indicatorPressed;
	}

	_handleOnMouseenter() {
		this._indicatorPressed = true;
		this._hovered = true;
	}

	_handleOnMouseleave() {
		this._indicatorPressed = false;
		this._hovered = false;
	}

	_disablePublishAllButton() {
		return !this.publishAll;
	}
	_disablePublishAllButtonString() {
		return this._disablePublishAllButton().toString();
	}
}

window.customElements.define('d2l-quick-eval-activity-card', D2LQuickEvalActivityCard);
