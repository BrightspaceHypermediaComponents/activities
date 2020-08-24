import '../../../components/d2l-quick-eval/behaviors/d2l-hm-filter-behavior.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

class D2LHMFilterBehaviourTestComponent extends mixinBehaviors([D2L.PolymerBehaviors.QuickEval.D2LHMFilterBehaviour], PolymerElement) {
	static get is() { return 'd2l-hm-filter-behavior-test-component'; }
}

window.customElements.define(D2LHMFilterBehaviourTestComponent.is, D2LHMFilterBehaviourTestComponent);
