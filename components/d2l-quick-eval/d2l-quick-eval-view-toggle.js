import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { QuickEvalLocalize } from './QuickEvalLocalize.js';
import './view-toggle/d2l-quick-eval-view-toggle-button.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-fetch/d2l-fetch.js';

/**
 * @customElement
 * @polymer
 */
class D2LQuickEvalViewToggle extends QuickEvalLocalize(PolymerElement) {
	static get template() {
		const toggleTemplate = html`
			<style>
				:host {
					width: 100%;
					display: flex;
				}
				label {
					display: none;
				}
				@media (min-width: 525px) {
					:host {
						margin: 0 -0.9rem;
						display: block;
						width: auto;
					}
					label {
						margin: 0 0.9rem;
						display: inline;
					}
				}
			</style>
			<label>[[localize('viewBy')]]</label>
			<d2l-quick-eval-view-toggle-button
				side="left"
				on-click="_selectSubmissions"
				selected="[[_isSelected(_viewTypes.submissions, currentSelected)]]"
			>[[localize('submissions')]]</d2l-quick-eval-view-toggle-button>
			<d2l-quick-eval-view-toggle-button
				side="right"
				on-click="_selectActivities"
				selected="[[_isSelected(_viewTypes.activities, currentSelected)]]"
			>[[localize('activities')]]</d2l-quick-eval-view-toggle-button>
		`;
		toggleTemplate.setAttribute('strip-whitespace', 'strip-whitespace');
		return toggleTemplate;
	}
	static get properties() {
		return {
			currentSelected: {
				type: String,
				observer: '_handleSelectionChange'
			},
			toggleHref: {
				type: String
			},
			_viewTypes: {
				type: Object,
				value: {
					submissions: 'submissions',
					activities: 'activities'
				}
			}
		};
	}

	ready() {
		super.ready();
		if (
			(this.currentSelected !== this._viewTypes.submissions)
			&& (this.currentSelected !== this._viewTypes.activities)
		) {
			this.currentSelected = this._viewTypes.submissions;
		}
	}

	_selectSubmissions() {
		if (this.currentSelected !== this._viewTypes.submissions) {
			this.currentSelected = this._viewTypes.submissions;
		}
	}
	_selectActivities() {
		if (this.currentSelected !== this._viewTypes.activities) {
			this.currentSelected = this._viewTypes.activities;
		}
	}
	_isSelected(view) {
		return this.currentSelected === view;
	}
	_isPressed(view) {
		return this._isSelected(view).toString();
	}
	_handleSelectionChange(view, previousView) {

		if (
			this.toggleHref
			&& previousView !== null
			&& previousView !== undefined
		) {
			const data = { toggleState: view };

			window.d2lfetch.fetch(
				new Request(
					this.toggleHref,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(data)
					}
				)
			);
		}

		this.dispatchEvent(
			new CustomEvent(
				'd2l-quick-eval-view-toggle-changed',
				{
					detail: {
						view: view
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}
}

window.customElements.define('d2l-quick-eval-view-toggle', D2LQuickEvalViewToggle);
