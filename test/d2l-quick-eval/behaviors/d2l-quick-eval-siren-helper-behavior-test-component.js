import '../../../components/d2l-quick-eval/behaviors/d2l-quick-eval-siren-helper-behavior.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

class D2LQuickEvalSirenHelperBehaviorTestComponent extends mixinBehaviors([D2L.PolymerBehaviors.QuickEval.D2LQuickEvalSirenHelperBehavior], PolymerElement) {
	static get is() { return 'd2l-quick-eval-siren-helper-behavior-test-component'; }

	static get behaviors() { return [ D2L.PolymerBehaviors.Siren.EntityBehavior]; }
}

window.customElements.define(D2LQuickEvalSirenHelperBehaviorTestComponent.is, D2LQuickEvalSirenHelperBehaviorTestComponent);
