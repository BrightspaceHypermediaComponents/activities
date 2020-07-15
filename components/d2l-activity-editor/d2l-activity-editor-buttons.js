import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityEditorButtons extends RtlMixin(LocalizeActivityEditorMixin(LitElement)) {

	static get styles() {
		return css`
			:host {
				display: inline-block;
			}
			:host([hidden]) {
				display: none;
			}
			d2l-button {
				margin-right: 0.75rem;
			}
			:host([dir="rtl"]) d2l-button {
				margin-left: 0.75rem;
				margin-right: 0;
			}
			.mobile {
				display: none;
			}
			@media only screen and (max-width: 615px) {
				.desktop {
					display: none;
				}
				.mobile {
					display: inline-block;
				}
				.footerBtn {
					margin: 0;
				}
			}
		`;
	}

	_save() {
		const event = new CustomEvent('d2l-activity-editor-save', {
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);
	}

	_cancel() {
		const event = new CustomEvent('d2l-activity-editor-cancel', {
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);
	}

	render() {
		return html`
			<d2l-button class="desktop" primary @click="${this._save}">${this.localize('editor.btnSave')}</d2l-button>
			<d2l-button class="mobile footerBtn" primary @click="${this._save}">${this.localize('editor.btnSaveMobile')}</d2l-button>
			<d2l-button class="footerBtn" @click="${this._cancel}">${this.localize('editor.btnCancel')}</d2l-button>
		`;
	}
}

customElements.define('d2l-activity-editor-buttons', ActivityEditorButtons);
