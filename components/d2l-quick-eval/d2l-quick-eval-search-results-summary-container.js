import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { QuickEvalLocalize } from './QuickEvalLocalize.js';
import 'd2l-link/d2l-link.js';

class D2LQuickEvalSearchResultsSummaryContainer extends QuickEvalLocalize(PolymerElement) {
	static get template() {
		return html `
		<style>
			:host {
				border-radius: 8px;
				background-color: var(--d2l-color-regolith);
				border: 1px solid var(--d2l-color-gypsum);
				color: var(--d2l-color-ferrite);
				display: block;
				padding: 10px 20px;
			}
			span {
				margin-right: 2.3em;
			}
			:host(:dir(rtl)) span {
				margin-right: 0;
				margin-left: 2.3em;
			}
			:host([hidden]) {
				display: none;
			}
		</style>
		<span class="d2l-quick-eval-search-results-summary">[[_getSummaryString(searchResultsCount, moreResults)]]</span>
		<d2l-link on-click="_linkClicked">[[localize('clearSearch')]]</d2l-link>
		`;
	}
	static get properties() {
		return {
			searchResultsCount: {
				type: Number,
				value: 0
			},
			moreResults: {
				type: Boolean,
				value: false
			}
		};
	}

	_getSummaryString(searchResults, moreResults) {
		if (searchResults === 0) {
			return this.localize('searchResultsMultiple', 'num', searchResults);
		} else if (searchResults === 1 && !moreResults) {
			return this.localize('searchResultsSingle');
		} else if (moreResults) {
			return this.localize('searchResultsMore', 'num', searchResults);
		}
		return this.localize('searchResultsMultiple', 'num', searchResults);
	}

	_linkClicked() {
		this.dispatchEvent(
			new CustomEvent(
				'd2l-quick-eval-search-results-summary-container-clear-search',
				{
					composed: true,
					bubbles: true
				}
			)
		);
	}
}

window.customElements.define('d2l-quick-eval-search-results-summary-container', D2LQuickEvalSearchResultsSummaryContainer);
