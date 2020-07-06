import { css, html, LitElement } from 'lit-element/lit-element.js';
import { getLocalizeResources } from './localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityEditorButtons extends RtlMixin(LocalizeMixin(LitElement)) {

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

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
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
			<d2l-button class="desktop" primary @click="${this._save}">${this.localize('btnSave')}</d2l-button>
			<d2l-button class="mobile footerBtn" primary @click="${this._save}">${this.localize('btnSaveMobile')}</d2l-button>
			<d2l-button class="footerBtn" @click="${this._cancel}">${this.localize('btnCancel')}</d2l-button>
		`;
	}
}

customElements.define('d2l-activity-editor-buttons', ActivityEditorButtons);
