import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from './QuickEvalLocalize.js';
import 'd2l-alert/d2l-alert.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-table/d2l-table.js';
import 'd2l-button/d2l-button.js';
import 'd2l-offscreen/d2l-offscreen.js';
import 'd2l-polymer-behaviors/d2l-dom-focus.js';
import 'd2l-link/d2l-link.js';
import 'd2l-users/components/d2l-profile-image.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import '../d2l-activity-name/d2l-activity-name.js';
import '../d2l-activity-evaluation-icon/d2l-activity-evaluation-icon-base.js';
import './d2l-quick-eval-no-submissions-image.js';
import './d2l-quick-eval-no-criteria-results-image.js';
import './d2l-quick-eval-skeleton.js';
import './behaviors/d2l-quick-eval-siren-helper-behavior.js';
import 'd2l-loading-spinner/d2l-loading-spinner.js';

/**
 * @customElement
 * @polymer
 */

class D2LQuickEvalActivities extends mixinBehaviors([D2L.PolymerBehaviors.QuickEval.D2LQuickEvalSirenHelperBehavior], QuickEvalLocalize(PolymerElement)) {
	static get template() {
		const quickEvalActivitiesTemplate = html`
			<style>
				.d2l-quick-eval-top-bar {
					padding-top: 0.25rem;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					align-items: flex-end;
				}
			</style>
			<div class="d2l-quick-eval-top-bar">
				<d2l-quick-eval-view-toggle current-selected="activities"></d2l-quick-eval-view-toggle>
			</div>
		`;

		quickEvalActivitiesTemplate.setAttribute('strip-whitespace', 'strip-whitespace');
		return quickEvalActivitiesTemplate;
	}
	static get is() { return 'd2l-quick-eval-activities'; }
	static get properties() {
		return {
			_data: {
				type: Array,
				value: [ ]
			},
			_health: {
				type: Object,
				value: {
					isHealthy: true,
					errorMessage: ''
				}
			},
			_loading: {
				type: Boolean,
				value: true
			}
		};
	}
	static get observers() {
		return [
			'_loadData(entity)'
		];
	}
	ready() {
		super.ready();
		this.addEventListener('d2l-siren-entity-error', function() {
			this._loading = false;
			this._handleFullLoadFailure();
		}.bind(this));
	}

	constructor() { super(); }

	attached() {
		this.addEventListener('d2l-quick-eval-view-toggle-changed', this._toggleSelected);
	}

	detached() {
		this.removeEventListener('d2l-quick-eval-view-toggle-changed', this._toggleSelected);
	}

	setLoadingState(state) {
		this.set('_loading', state);
	}

	async _loadData(entity) {
		if (!entity) {
			return Promise.resolve();
		}
		this._loading = true;

		try {
			if (entity.entities) {
				const result = await this._parseActivities(entity);
				this._data = result;
			} else {
				this._data = [];
			}
			this._clearAlerts();

		} catch (e) {
			// Unable to load activities from entity.
			this._handleFullLoadFailure();
			return Promise.reject(e);
		} finally {
			this._loading = false;
		}
	}

	_clearAlerts() {
		this.set('_health', { isHealthy: true, errorMessage: '' });
	}

	_handleFullLoadFailure() {
		this.set('_health', { isHealthy: false, errorMessage: 'failedToLoadData' });
	}

	async _parseActivities(entity) {
		const result = entity;
		return result;
	}

	_toggleSelected(e) {
		if (e.detail.view === 'submissions') {
			this._dispatchChangeToSubmissions();
		}
	}

	_dispatchChangeToSubmissions() {
		this.dispatchEvent(
			new CustomEvent(
				'd2l-quick-eval-activities-change-to-submissions',
				{
					detail: {
						changeToSubmissions: true
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}
}

window.customElements.define(D2LQuickEvalActivities.is, D2LQuickEvalActivities);
