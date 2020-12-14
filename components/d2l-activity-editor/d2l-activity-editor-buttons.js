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
			.d2l-mobile {
				display: none;
			}
			@media only screen and (max-width: 615px) {
				.d2l-desktop {
					display: none;
				}
				.d2l-mobile {
					display: inline-block;
				}
				.d2l-footerBtn {
					margin: 0;
				}
			}
		`;
	}

	render() {
		return html`
			<d2l-button class="d2l-desktop" primary @click="${this._saveAndClose}">${this.localize('editor.btnSave')}</d2l-button>
			<d2l-button class="d2l-desktop" @click="${this._save}">${this.localize('editor.btnSaveMobile')}</d2l-button>
			<d2l-button class="d2l-mobile d2l-footerBtn" primary @click="${this._save}">${this.localize('editor.btnSaveMobile')}</d2l-button>
			<d2l-button class="d2l-footerBtn" @click="${this._cancel}">${this.localize('editor.btnCancel')}</d2l-button>
		`;
	}
	_cancel() {
		const event = new CustomEvent('d2l-activity-editor-cancel', {
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);
	}
	_save() {
		const event = new CustomEvent('d2l-activity-editor-save', {
			detail: {
				close: false
			},
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);
	}
	_saveAndClose() {
		const event = new CustomEvent('d2l-activity-editor-save', {
			detail: {
				close: true
			},
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);
	}

}

customElements.define('d2l-activity-editor-buttons', ActivityEditorButtons);
