import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-polymer-behaviors/d2l-visible-on-ancestor-behavior.js';
import 'd2l-colors/d2l-colors.js';

class D2LQuickEvalActivityCardItems extends mixinBehaviors([D2L.PolymerBehaviors.VisibleOnAncestorBehavior], PolymerElement) {
	static get is() { return 'd2l-quick-eval-activity-card-items'; }
	static get template() {
		return html`
			<style include="d2l-visible-on-ancestor-styles">
				.d2l-quick-eval-activity-card-items-container {
					display: flex;
					align-items: stretch;
					justify-content: space-between;
				}
				::slotted(*) {
					width: 7.5rem;
					height: 3rem;
					text-align: center;
					display: flex;
					align-items: flex-start;
					justify-content: space-around;
					flex: 1 1 0;
				}
				@media (min-width: 525px) {
					::slotted(*) {
						border-width: 0 1px 0 0;
						border-style: solid;
						border-color: var(--d2l-color-mica);
					}
					::slotted(*:last-child) {
						border-right-width: 0;
					}
					:host([small]) ::slotted(*) {
						border: none;
					}
				}
				@media (min-width: 900px) {
					:host([small]) ::slotted(*) {
						border-width: 0 1px 0 0;
						border-style: solid;
						border-color: var(--d2l-color-mica);
					}
					:host([small]) ::slotted(*:first-child),
					::slotted(*:first-child) {
						border-left-width: 1px;
					}
					:host([small]) ::slotted(*:last-child),
					::slotted(*:last-child) {
						border-right-width: 1px;
					}
				}
			</style>
			<div class="d2l-quick-eval-activity-card-items-container">
				<slot></slot>
			</div>
		`;
	}
}

window.customElements.define(D2LQuickEvalActivityCardItems.is, D2LQuickEvalActivityCardItems);
