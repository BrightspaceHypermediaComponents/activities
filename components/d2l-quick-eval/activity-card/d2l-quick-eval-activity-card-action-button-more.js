import { css, html, LitElement } from 'lit-element/lit-element.js';
import {LitQuickEvalLocalize} from '../LitQuickEvalLocalize.js';
import 'd2l-dropdown/d2l-dropdown.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import 'd2l-menu/d2l-menu.js';
import './d2l-quick-eval-activity-card-action-button.js';

class D2LQuickEvalActivityCardActionButtonMore extends LitQuickEvalLocalize(LitElement) {

	static get styles() {
		return css`
			:host([hidden]) {
				display: none !important;
			}
			d2l-quick-eval-activity-card-action-button {
				height: 100%;
				width: 100%;
			}
			d2l-dropdown {
				height: 100%;
				width: 100%;
			}
		`;
	}
	render() {
		return html`
			<d2l-dropdown text="${this.localize('moreActions')}">
				<d2l-quick-eval-activity-card-action-button 
					icon-full-name="tier1:more"
					text="${this.localize('moreActions')}"
					class="d2l-dropdown-opener"
					tab-index-number="${this.tabIndexNumber}"></d2l-quick-eval-activity-card-action-button>
				<d2l-dropdown-menu>
					<d2l-menu label="${this.localize('moreActions')}">
						<slot></slot>
					</d2l-menu>
				</d2l-dropdown-menu>
			</d2l-dropdown>
		`;
	}
	constructor() {
		super();
		this.tabIndexNumber = 0;
	}
	static get properties() {
		return {
			tabIndexNumber: {
				type: Number
			}
		};
	}
}

window.customElements.define('d2l-quick-eval-activity-card-action-button-more', D2LQuickEvalActivityCardActionButtonMore);
