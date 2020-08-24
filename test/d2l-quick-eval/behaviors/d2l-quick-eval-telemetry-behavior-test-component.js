import '../../../components/d2l-quick-eval/behaviors/d2l-quick-eval-telemetry-behavior.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

class D2LTelemetryBehaviourTestComponent extends mixinBehaviors([D2L.PolymerBehaviors.QuickEval.TelemetryBehaviorImpl], PolymerElement) {
	static get is() { return 'd2l-quick-eval-telemetry-behavior-test-component'; }
}

window.customElements.define(D2LTelemetryBehaviourTestComponent.is, D2LTelemetryBehaviourTestComponent);
