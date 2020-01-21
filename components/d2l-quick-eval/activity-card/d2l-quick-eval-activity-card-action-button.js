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
					--d2l-quick-eval-card-button-icon-padding: 0.15rem;
					--d2l-quick-eval-card-button-icon-hover: 0 0 0 var(--d2l-quick-eval-card-button-icon-padding) var(--d2l-color-gypsum);
					--d2l-quick-eval-card-button-icon-focus-inner: 0 0 0 0.25rem white;
					--d2l-quick-eval-card-button-icon-focus-outer: 0 0 0 0.35rem var(--d2l-color-celestine);
					--d2l-quick-eval-card-button-icon-border-radius: .15rem;
					display: block;
				}
				:host([hidden]) {
					display: none !important;
				}
				button {
					display: flex;
					flex-direction: column;
					align-items: center;
					text-align: center;
					align-content: center;
					justify-content: space-between;
					font-family: inherit;
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
					border-radius: var(--d2l-quick-eval-card-button-icon-border-radius);
					display: flex;
					justify-content: center;
					align-items: center;
					z-index: 0; /* safari fix */
				}
				button:hover,
				button:hover d2l-icon,
				button:focus,
				button:focus d2l-icon {
					text-decoration: underline;
					color: var(--d2l-color-celestine-minus-1);
				}
				button:hover .d2l-quick-eval-activity-card-button-icon {
					background-color: var(--d2l-color-gypsum);
					box-shadow: var(--d2l-quick-eval-card-button-icon-hover);
				}
				button:focus .d2l-quick-eval-activity-card-button-icon {
					background-color: var(--d2l-color-gypsum);
					box-shadow: var(--d2l-quick-eval-card-button-icon-hover), var(--d2l-quick-eval-card-button-icon-focus-inner), var(--d2l-quick-eval-card-button-icon-focus-outer)
				}
				span {
					z-index: 0; /* safari fix */
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
						--d2l-quick-eval-card-button-icon-padding: 0.3rem;
						--d2l-quick-eval-card-button-icon-focus-inner: 0 0 0 0.4rem white;
						--d2l-quick-eval-card-button-icon-focus-outer: 0 0 0 0.5rem var(--d2l-color-celestine);
						--d2l-quick-eval-card-button-icon-border-radius: .01rem;
					}
				}
				:host([disabled]) button {
					opacity: .5;
				}
				:host([disabled]) button:hover,
				:host([disabled]) button:hover d2l-icon,
				:host([disabled]) button:hover .d2l-quick-eval-activity-card-button-icon,
				:host([disabled]) button:focus,
				:host([disabled]) button:focus d2l-icon,
				:host([disabled]) button:focus .d2l-quick-eval-activity-card-button-icon {
					text-decoration: none;
					color: var(--d2l-color-ferrite);
					background-color: transparent;
					box-shadow: none;
					cursor: auto;
				}
			</style>
			<button
				tabindex$="[[tabIndexNumber]]"
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
				<span id$="[[_labelledbyId]]">[[text]]</span>
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
			// Icon override, in case you don't want the default behaviour (t2 on small widths, t3 on large)
			iconFullName: {
				type: String
			},
			_labelledbyId: {
				type: String,
				computed: '_computeLabelledbyId()'
			},
			disabled: {
				type: Boolean
			},
			tabIndexNumber: {
				type: Number,
				value: 0
			}
		};
	}

	_computeIcon(tier) {
		if (this.iconFullName) {
			return this.iconFullName;
		}
		return `d2l-tier${tier}:${this.iconName}`;
	}

	_computeLabelledbyId() {
		return D2L.Id.getUniqueId();
	}

	focus() {
		this.shadowRoot.querySelector('button').focus();
	}
}

window.customElements.define('d2l-quick-eval-activity-card-action-button', D2LQuickEvalActivityCardActionButton);
