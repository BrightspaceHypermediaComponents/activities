import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'd2l-colors/d2l-colors.js';

class D2LQuickEvalActivityCardItems extends PolymerElement {
	static get template() {
		return html`
			<style>
				:host {
					display: flex;
					align-items: stretch;
					justify-content: space-between;
				}
				:host ::slotted(*) {
					width: 7.5rem;
					height: 3rem;
					text-align: center;
					display: flex;
					align-items: flex-start;
					justify-content: space-around;
					flex: 1 1 auto;
				}
				@media (min-width: 525px) {
					:host ::slotted(div) {
						border-width: 0 1px 0 0;
						border-style: solid;
						border-color: var(--d2l-color-mica);
					}
					:host ::slotted(*:last-child) {
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
					:host ::slotted(*:first-child) {
						border-left-width: 1px;
					}
					:host([small]) ::slotted(*:last-child),
					:host ::slotted(*:last-child) {
						border-right-width: 1px;
					}
				}
			</style>
			<slot></slot>
		`;
	}
}

window.customElements.define('d2l-quick-eval-activity-card-items', D2LQuickEvalActivityCardItems);
