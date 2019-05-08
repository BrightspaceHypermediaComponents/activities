import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from './QuickEvalLocalize.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import './behaviors/d2l-quick-eval-siren-helper-behavior.js';

/**
 * @customElement
 * @polymer
 */

class D2LTestChild extends mixinBehaviors([D2L.PolymerBehaviors.QuickEval.D2LQuickEvalSirenHelperBehavior], QuickEvalLocalize(PolymerElement)) {
	static get template() {
		const parentTemplate = html`
			<style include="d2l-table-style">
			</style>
			<div>
				<button>[[text]]</button>
			</div>
		`;

		parentTemplate.setAttribute('strip-whitespace', 'strip-whitespace');
		return parentTemplate;
	}
	static get is() { return 'd2l-test-child'; }
	static get properties() {
		return {
			_data: {
				type: Array,
				value: [ ]
			},
			text: {
				type: String,
				reflectToAttribute: true
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
	}

	constructor() { super(); }

	async _loadData(entity) {
		if (!entity) {
			return Promise.resolve();
		}

		this._data = [];
	}
}

window.customElements.define(D2LTestChild.is, D2LTestChild);
