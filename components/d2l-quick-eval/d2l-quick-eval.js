import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import './d2l-quick-eval-activities-list.js';

/**
 * @customElement
 * @polymer
 */
class D2LQuickEval extends mixinBehaviors([D2L.PolymerBehaviors.Siren.EntityBehavior], PolymerElement) {
	static get template() {
		return html`
			<style>
				:host {
					display: block;
				}
			</style>
			<d2l-quick-eval-activities-list href="[[href]]" token="[[token]]" master-teacher="[[masterTeacher]]"></d2l-quick-eval-activities-list>
		`;
	}

	static get properties() {
		return {
			'masterTeacher': {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			}
		};
	}

	static get is() { return 'd2l-quick-eval'; }

}

window.customElements.define('d2l-quick-eval', D2LQuickEval);
