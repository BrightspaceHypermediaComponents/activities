import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from '../QuickEvalLocalize.js';
import {QuickEvalLogging} from '../QuickEvalLogging.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-alert/d2l-alert-toast.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import './d2l-quick-eval-ellipsis-dismiss-dialog.js';
import '../behaviors/d2l-quick-eval-siren-helper-behavior.js';

/**
 * @customElement
 * @polymer
 */

// This is being made as a Polymer component so that we can take advantage of the helper functions in D2LQuickEvalSirenHelperBehavior.
class D2LQuickEvalDismissedActivities extends mixinBehaviors(
	[ D2L.PolymerBehaviors.QuickEval.D2LQuickEvalSirenHelperBehavior
	],
	QuickEvalLogging(QuickEvalLocalize(PolymerElement))
) {
	static get template() {
		const quickEvalActivitiesTemplate = html`
			<d2l-quick-eval-ellipsis-dialog
				opened="[[opened]]"
				dismissed-activities="[[_data]]"
				on-d2l-dialog-close="_submitData"
				loading="[[_loading]]"
				restore-disabled= "[[_restoreDisabled]]"
				on-d2l-quick-eval-dismissed-activity-selected="_handleListItemSelected"></d2l-quick-eval-ellipsis-dialog>
			<d2l-alert-toast class="d2l-quick-eval-dismissed-list-success" type="success">[[successMessage]]</d2l-alert-toast>
			<d2l-alert-toast class="d2l-quick-eval-dismissed-list-critical" type="critical">[[failedMessage]]</d2l-alert-toast>
		`;

		quickEvalActivitiesTemplate.setAttribute('strip-whitespace', 'strip-whitespace');
		return quickEvalActivitiesTemplate;
	}

	static get properties() {
		return {
			_data: {
				type: Array,
				value: []
			},
			_loading: {
				type: Boolean,
				value: true
			},
			_isError: {
				type: Boolean,
				value: false,
			},
			opened: {
				type: Boolean,
				value: false
			},
			selectedCount: {
				type: Number,
				value: 0,
			},
			failedCount: {
				type: Number,
				value: 0,
			},
			successMessage: {
				type: String,
				computed: '_computeSuccessMessage(selectedCount)',
			},
			failedMessage: {
				type: String,
				computed: '_computeFailedMessage(selectedCount, failedCount)',
			},
			_restoreDisabled: {
				type: Boolean,
				computed: '_computeRestoreDisabled(_loading, _data.*)'
			}
		};
	}
	static get observers() {
		return [
			'_loadData(entity)'
		];
	}

	async _loadData(entity) {
		if (!entity) {
			return;
		}
		this._loading = true;
		try {
			if (entity.entities) {
				const result = await this._parseActivities(entity);
				this._data = result;
			} else {
				this._data = [];
			}
			this._handleLoadSuccess();
		} catch (e) {
			this._handleLoadFailure();
			throw e;
		} finally {
			this._loading = false;
		}
	}

	async _parseActivities(entity) {
		const result = await Promise.all(entity.entities.map(async function(activity) {
			try {
				const courseName = await this._getCourseNamePromise(activity);
				const activityName = await this._getActivityName(activity);
				const dismiss = await this._getDismissPromise(activity);
				return {
					type: this._getActivityType(activity),
					name: activityName,
					course: courseName,
					dismissedDate: dismiss.dismissedOn,
					unDismiss: dismiss.unDismissAction
				};
			} catch (e) {
				this._logError(e, {developerMessage: `Error loading activity data for ${this._getHref(activity, 'self')}.`});
				return null;
			}
		}.bind(this)));
		return result;
	}

	_getSelectedActivities() {
		if (this._data) {
			return this._data.filter(da => da.selected);
		}
		return [];
	}

	_computeSuccessMessage(selectedCount) {
		return this.localize('activityRestored', 'count', selectedCount);
	}

	_computeFailedMessage(selectedCount, failedCount) {
		if (failedCount === selectedCount) {
			return this.localize('failedToRestoreActivity');
		} else {
			return this.localize('failedToRestoreSomeActivities', 'x', failedCount, 'y', selectedCount);
		}
	}

	_handleLoadFailure() {
		this._isError = true;
	}

	_handleLoadSuccess() {
		this._isError = false;
	}

	_handleListItemSelected(e) {
		if (this._data)
		{
			const act = this._data[e.detail.key];
			if (act) {
				this.set(`_data.${e.detail.key}.selected`, e.detail.selected);
			}
		}
	}

	_submitData(e) {
		if (e.detail.action === 'done') {
			const selectedData = this._getSelectedActivities();
			this.selectedCount = selectedData.length;
			const result = Promise.all(selectedData.map((act)=> {
				try {
					return this.performSirenAction(act.unDismiss);
				} catch (e) {
					return new Error();
				}
			}));
			result.then((results)=> {
				this.failedCount = results.filter(a=>a instanceof Error).length;
				if (this.failedCount > 0) {
					this._logError(e, {developerMessage: 'Error dismissing activities'});
					this.shadowRoot.querySelector('.d2l-quick-eval-dismissed-list-critical').open = true;
				} else {
					this.shadowRoot.querySelector('.d2l-quick-eval-dismissed-list-success').open = true;
				}
			}).then(() => {
				window.dispatchEvent(new CustomEvent('d2l-quick-eval-refresh-activities'));
				window.dispatchEvent(new CustomEvent('d2l-quick-eval-refresh-submissions'));
				window.dispatchEvent(new CustomEvent('d2l-quick-eval-refresh-dismissed'));
			});
		}
	}
	_computeRestoreDisabled(loading, data) {
		return loading || !(data.base && data.base.some(d => d.selected));
	}

	ready() {
		super.ready();
		this.addEventListener('d2l-siren-entity-error', ()=> {
			this._loading = false;
			this._handleLoadFailure();
		});
	}

	constructor() {
		super();
		this._boundRefresh = this.refresh.bind(this);
	}

	connectedCallback() {
		super.connectedCallback();
		window.addEventListener('d2l-quick-eval-refresh-dismissed', this._boundRefresh);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener('d2l-quick-eval-refresh-dismissed', this._boundRefresh);
	}

	refresh() {
		const selfHref = this._getSelfLink(this.entity);
		if (selfHref) {
			window.D2L.Siren.EntityStore.fetch(selfHref, this.token, true);
		}
	}
}
window.customElements.define('d2l-quick-eval-dismissed-activities', D2LQuickEvalDismissedActivities);
