import '../../../components/d2l-quick-eval/behaviors/d2l-hm-search-behavior.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

class D2LHMSearchBehaviourTestComponent extends mixinBehaviors([D2L.PolymerBehaviors.QuickEval.D2LHMSearchBehaviour], PolymerElement) {
	static get is() { return 'd2l-hm-search-behavior-test-component'; }
}

window.customElements.define(D2LHMSearchBehaviourTestComponent.is, D2LHMSearchBehaviourTestComponent);
