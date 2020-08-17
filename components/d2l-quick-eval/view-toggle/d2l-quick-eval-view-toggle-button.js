import { css, html, LitElement } from 'lit-element/lit-element.js';
import 'd2l-colors/d2l-colors.js';

class D2LQuickEvalViewToggleButton extends LitElement {

	static get styles() {
		return css`
		button.d2l-quick-eval-view-toggle-left,
		:host([dir='rtl']) button.d2l-quick-eval-view-toggle-right {
			border-bottom-left-radius: 0.3rem;
			border-bottom-right-radius: 0;
			border-left-color: var(--d2l-color-mica);
			border-right-color: transparent;
			border-top-left-radius: 0.3rem;
			border-top-right-radius: 0;
		}
		button.d2l-quick-eval-view-toggle-right,
		:host([dir='rtl']) button.d2l-quick-eval-view-toggle-left {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0.3rem;
			border-left-color: transparent;
			border-right-color: var(--d2l-color-mica);
			border-top-left-radius: 0;
			border-top-right-radius: 0.3rem;
		}
		button {
			background-color: var(--d2l-color-sylvite);
			border-color: var(--d2l-color-mica);
			border-style: solid;
			border-width: 1px;
			box-sizing: border-box;
			color: var(--d2l-color-ferrite);
			cursor: pointer;
			display: inline;
			flex: 1;
			font-family: inherit;
			font-size: 0.7rem;
			font-weight: 700;
			margin: 0;
			min-height: calc(2rem + 2px);
			outline: none;
			padding: 0.5rem 1.5rem;
			text-align: center;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			vertical-align: middle;
			white-space: nowrap;
			width: auto;
		}
		button:hover, button:focus {
			border: 1px solid var(--d2l-color-celestine) !important;
		}
		button[selected] {
			background-color: var(--d2l-color-tungsten);
			border-color: var(--d2l-color-tungsten);
			color: var(--d2l-color-white);
		}
		button[selected]:hover, button[selected]:focus {
			box-shadow: inset 0 0 0 2px #ffffff;
		}
		`;
	}

	render() {
		return html`<button
				class="d2l-quick-eval-view-toggle-${this.side}"
				aria-pressed="${this.selected.toString()}"
				?selected="${this.selected}"
			><slot></slot></button>`;
	}

	constructor() {
		super();
		this.selected = false;
		this.side = 'middle';
	}

	static get properties() {
		return {
			// left, right
			side: {
				type: String
			},
			selected: {
				type: Boolean
			}
		};
	}
}

window.customElements.define('d2l-quick-eval-view-toggle-button', D2LQuickEvalViewToggleButton);
