import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LitQuickEvalLocalize } from '../QuickEvalLocalize.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/loading-spinner/loading-spinner.js';
import './d2l-quick-eval-dismissed-activities-list.js';

class D2LQuickEvalEllipsisDialog extends LitQuickEvalLocalize(LitElement) {

	static get properties() {
		return {
			opened: { type: Boolean },
			dismissedActivities: { type: Array },
			loading: { type: Boolean },
			restoreDisabled: { type: Boolean }
		};
	}

	static get styles() {
		return css`
			d2l-loading-spinner {
				width: 100%;
			}
		`;
	}

	render() {
		return html`
			<d2l-dialog
				title-text="${this.localize('dismissedActivitiesList')}"
				.opened="${this.opened}">
				${this._renderList()}
				${this._renderButtons()}
			</d2l-dialog>
		`;
	}

	constructor() {
		super();
		this.opened = false;
		this.loading = false;
		this.restoreDisabled = false;
	}

	_getDialog() {
		return this.shadowRoot.querySelector('d2l-dialog');
	}
	updated() {
		const dialog = this._getDialog();
		if (dialog && this.dismissedActivities && this.dismissedActivities.length) {
			requestAnimationFrame(()=>dialog.resize(), 0);
		}
	}
	_renderList() {
		if (!this.loading) {
			if (this.dismissedActivities && this.dismissedActivities.length) {
				return html`<d2l-quick-eval-dismissed-activities-list .dismissedActivities=${this.dismissedActivities}></d2l-quick-eval-dismissed-activities-list>`;
			} else {
				return html`${this.localize('noDismissedActivities')}`;
			}
		}
		return html`<d2l-loading-spinner size="100"></d2l-loading-spinner>`;
	}
	_renderButtons() {
		if (this.loading || (this.dismissedActivities && this.dismissedActivities.length)) {
			return html`<d2l-button slot="footer" primary dialog-action="done" .disabled=${this.restoreDisabled}>${this.localize('restore')}</d2l-button>
			<d2l-button slot="footer" dialog-action>${this.localize('cancel')}</d2l-button>`;
		}
		return html`<d2l-button slot="footer" primary dialog-action>${this.localize('close')}</d2l-button>`;
	}
}

window.customElements.define('d2l-quick-eval-ellipsis-dialog', D2LQuickEvalEllipsisDialog);
