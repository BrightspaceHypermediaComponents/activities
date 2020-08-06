import { css, html, LitElement } from 'lit-element/lit-element.js';

class D2LSubtitle extends LitElement {
	static get styles() {
		return css`
			span {
				font-size: 0.6rem;
			}
			span::before {
				content: "\u2022";
				margin: 0.2rem;
			}
			:host span:first-of-type::before {
				content: "";
				margin: 0;
			}
			@media (min-width: 900px) {
				span {
					font-size: 0.7rem;
					line-height: 0.9rem;
				}
				:host {
					line-height: 0.9rem;
				}
			}
		`;
	}
	render() {
		const displayText = this._computeDisplayText(this.text);
		if (displayText && displayText.length) {
			return html`${displayText.map(dt => html`<span>${dt}</span>`)}`;
		}
		return html``;
	}

	static get properties() {
		return {
			text: {
				type: Array
			}
		};
	}

	_computeDisplayText(text) {
		if (text) {
			return text.filter(t => t !== null && t !== undefined && t !== '');
		}
		return text;
	}
}

window.customElements.define('d2l-subtitle', D2LSubtitle);
