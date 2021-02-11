import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { QuickEvalLogging } from '../../components/d2l-quick-eval/QuickEvalLogging.js';

class QuickEvalLoggingTestComponent extends QuickEvalLogging(PolymerElement) {
	static get is() { return 'quick-eval-logging-test-component'; }
}

window.customElements.define(QuickEvalLoggingTestComponent.is, QuickEvalLoggingTestComponent);
