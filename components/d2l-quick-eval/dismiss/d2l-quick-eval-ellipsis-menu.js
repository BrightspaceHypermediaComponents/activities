import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LitQuickEvalLocalize } from '../LitQuickEvalLocalize.js';
import 'd2l-dropdown/d2l-dropdown-more.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import 'd2l-menu/d2l-menu.js';
import 'd2l-menu/d2l-menu-item.js';
import './d2l-quick-eval-ellipsis-dismiss-dialog.js';

class D2LQuickEvalEllipsisMenu extends LitQuickEvalLocalize(LitElement) {

	static get properties() {
		return {
			opened: {
				type: Boolean,
			},
		};
	}

	static get styles() {
		return css`
			:host([hidden]) {
				display: none;
			}
		`;
	}
	render() {
		return html`
		<d2l-dropdown-more>
			<d2l-dropdown-menu>
				<d2l-menu>
					<d2l-menu-item
					@d2l-menu-item-select="${this._open.bind(this)}"
					text="${this.localize('dismissedActivities')}"></d2l-menu-item>
				</d2l-menu>
			</d2l-dropdown-menu>
		</d2l-dropdown-more>
		<d2l-quick-eval-ellipsis-dialog .opened="${this.opened}" @on-close="${this._close.bind(this)}"></d2l-quick-eval-ellipsis-dialog>
		`;
	}

	constructor() {
		super();
		this._close();
	}

	_open() {
		this.opened = true;
	}

	_close() {
		this.opened = false;
	}

}

window.customElements.define('d2l-quick-eval-ellipsis-menu', D2LQuickEvalEllipsisMenu);
