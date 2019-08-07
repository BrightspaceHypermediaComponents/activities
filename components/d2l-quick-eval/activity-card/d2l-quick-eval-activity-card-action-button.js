import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier3-icons.js';
import 'd2l-icons/tier2-icons.js';
import 'd2l-polymer-behaviors/d2l-id.js';
import 'd2l-button/d2l-button-behavior.js';

class D2LQuickEvalActivityCardActionButton extends mixinBehaviors(
	[
		D2L.PolymerBehaviors.Button.Behavior
	], PolymerElement) {
	static get template() {
		return html`
			<style>
				:host {
					--d2l-quick-eval-card-button-icon-size: 1.2rem;
					--d2l-quick-eval-card-button-icon-background-size: 1.5rem;
					--d2l-quick-eval-card-button-font-size: .6rem;
					--d2l-quick-eval-card-button-icon-padding: calc(calc(var(--d2l-quick-eval-card-button-icon-background-size) - var(--d2l-quick-eval-card-button-icon-size)) / 2);
					--d2l-quick-eval-card-button-icon-hover: 0 0 0 var(--d2l-quick-eval-card-button-icon-padding) var(--d2l-color-gypsum);
					--d2l-quick-eval-card-button-icon-focus-inner: 0 0 0 calc(var(--d2l-quick-eval-card-button-icon-padding) + 2px) white;
					--d2l-quick-eval-card-button-icon-focus-outer: 0 0 0 calc(var(--d2l-quick-eval-card-button-icon-padding) + 4px) var(--d2l-color-celestine);
				}
				button {
					display: flex;
					flex-direction: column;
					align-items: center;
					text-align: center;
					align-content: center;
					justify-content: space-between;
					font-size: var(--d2l-quick-eval-card-button-font-size);
					line-height: calc(var(--d2l-quick-eval-card-button-font-size) - .2rem);
					color: var(--d2l-color-ferrite);
					background: white;
					height: 100%;
					width: 100%;
					outline: none;
					border: none;
					padding: 0;
					cursor: pointer;
				}
				.d2l-quick-eval-activity-card-button-icon {
					width: var(--d2l-quick-eval-card-button-icon-size);
					height: var(--d2l-quick-eval-card-button-icon-size);
					border-radius: .3rem;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				:host(:hover) button,
				:host(:hover) d2l-icon,
				:host(:focus-within) button,
				:host(:focus-within) d2l-icon,
				:host(:focus) button,
				:host(:focus) d2l-icon {
					text-decoration: underline;
					color: var(--d2l-color-celestine-minus-1);
				}
				:host(:hover) .d2l-quick-eval-activity-card-button-icon {
					background-color: var(--d2l-color-gypsum);
					box-shadow: var(--d2l-quick-eval-card-button-icon-hover);
				}
				:host(:focus) .d2l-quick-eval-activity-card-button-icon,
				:host(:focus-within) .d2l-quick-eval-activity-card-button-icon {
					background-color: var(--d2l-color-gypsum);
					box-shadow: var(--d2l-quick-eval-card-button-icon-hover), var(--d2l-quick-eval-card-button-icon-focus-inner), var(--d2l-quick-eval-card-button-icon-focus-outer)
				}
				.d2l-quick-eval-card-button-icon-large {
					display: none;
				}
				@media (min-width: 900px) {
					.d2l-quick-eval-card-button-icon-large {
						display: unset;
					}
					.d2l-quick-eval-card-button-icon-small {
						display: none;
					}
					:host {
						--d2l-quick-eval-card-button-icon-size: 1.5rem;
						--d2l-quick-eval-card-button-icon-background-size: 2.1rem;
						--d2l-quick-eval-card-button-font-size: .7rem;
					}
				}
				:host([disabled]) button {
					opacity: .5;
				}
				:host([disabled]:hover) button,
				:host([disabled]:hover) d2l-icon,
				:host([disabled]:hover) .d2l-quick-eval-activity-card-button-icon,
				:host([disabled]:focus) button,
				:host([disabled]:focus) d2l-icon,
				:host([disabled]:focus) .d2l-quick-eval-activity-card-button-icon,
				:host([disabled]:focus-within) button,
				:host([disabled]:focus-within) d2l-icon,
				:host([disabled]:focus-within) .d2l-quick-eval-activity-card-button-icon {
					text-decoration: none;
					color: var(--d2l-color-ferrite);
					background-color: transparent;
					box-shadow: none;
					cursor: auto;
				}
			</style>
			<button
				aria-labelledby$="[[_labelledbyId]]"
				aria-expanded$="[[ariaExpanded]]"
				aria-haspopup$="[[ariaHaspopup]]"
				aria-label$="[[_ariaLabel]]"
				form$="[[form]]"
				formaction$="[[formaction]]"
				formenctype$="[[formenctype]]"
				formmethod$="[[formmethod]]"
				formnovalidate$="[[formnovalidate]]"
				formtarget$="[[formtarget]]"
				name$="[[name]]"
				title$="[[text]]"
				type$="[[type]]"
				disabled$="[[disabled]]">
				<div class="d2l-quick-eval-activity-card-button-icon">
					<d2l-icon icon="[[_computeIcon(3)]]" class="d2l-quick-eval-card-button-icon-large"></d2l-icon>
					<d2l-icon icon="[[_computeIcon(2)]]" class="d2l-quick-eval-card-button-icon-small"></d2l-icon>
				</div>
				<span id="[[_labelledbyId]]">[[text]]</span>
			</button>
		`;
	}
	static get properties() {
		return {
			text: {
				type: String
			},
			iconName: {
				type: String
			},
			_labelledbyId: {
				type: String,
				computed: '_computeLabelledbyId()'
			},
			disabled: {
				type: Boolean
			}
		};
	}

	_computeIcon(tier) {
		return `d2l-tier${tier}:${this.iconName}`;
	}

	_computeLabelledbyId() {
		return D2L.Id.getUniqueId();
	}
}

window.customElements.define('d2l-quick-eval-activity-card-action-button', D2LQuickEvalActivityCardActionButton);
