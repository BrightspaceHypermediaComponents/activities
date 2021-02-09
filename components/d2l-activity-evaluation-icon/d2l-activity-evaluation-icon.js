import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import './d2l-activity-evaluation-icon-base.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

/**
 * @customElement
 * @polymer
 */

class ActivityEvaluationIcon extends mixinBehaviors([D2L.PolymerBehaviors.Siren.EntityBehavior], PolymerElement) {
	static get template() {
		return html`
			<style>
				:host {
					display: inline;
				}
			</style>
			<d2l-activity-evaluation-icon-base draft$="[[_draft]]">
			</d2l-activity-evaluation-icon-base>
		`;
	}

	static get is() { return 'd2l-activity-evaluation-icon'; }

	static get properties() {
		return {
			_draft: {
				type: Boolean,
				value: false
			}
		};
	}

	static get observers() {
		return [
			'_configureBase(entity)'
		];
	}

	_configureBase(entity) {
		if (!entity || !entity.hasSubEntityByClass('evaluation')) {
			return;
		}

		const evaluation = entity.getSubEntityByClass('evaluation');
		if (evaluation.properties.state === 'Draft') {
			this._draft = true;
		}
		else {
			this._draft = false;
		}
	}
}

window.customElements.define('d2l-activity-evaluation-icon', ActivityEvaluationIcon);
