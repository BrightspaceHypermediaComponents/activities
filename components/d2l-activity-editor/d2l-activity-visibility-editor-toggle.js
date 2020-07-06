import '@brightspace-ui/core/components/switch/switch-visibility.js';
import { css, html, LitElement } from 'lit-element/lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { offscreenStyles } from '@brightspace-ui/core/components/offscreen/offscreen.js';

const baseUrl = import.meta.url;
class ActivityVisibilityEditorToggle extends LocalizeMixin(LitElement) {

	static get properties() {
		return {
			disabled: { type: Boolean },
			isDraft: { type: Boolean, attribute: 'is-draft' },
			canEditDraft: { type: Boolean, attribute: 'can-edit-draft' },
			_textHidden: { type: Boolean }
		};
	}

	static get styles() {
		return [offscreenStyles, css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
		`];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, baseUrl);
	}

	constructor() {
		super();
		this.isDraft = false;
		this.canEditDraft = false;
		this.disabled = false;
		this._textHidden = false;
	}

	_onChange() {
		this.dispatchEvent(
			new CustomEvent('d2l-activity-visibility-editor-toggle-change', { bubbles: true })
		);
	}

	get switchEnabled() {
		return this.canEditDraft && !this.disabled;
	}

	connectedCallback() {
		super.connectedCallback();
		this._narrowViewportQuery = matchMedia('only screen and (max-width: 615px)');
		this._textHidden = this._narrowViewportQuery.matches;
		if (this._narrowViewportQuery.addEventListener) {
			// chrome and FF
			this._narrowViewportQuery.addEventListener('change', (e) => this._textHidden = e.matches);
		} else if (this._narrowViewportQuery.addListener) {
			// deprecated API; safari and legacy edge
			this._narrowViewportQuery.addListener((e) => this._textHidden = e.matches);
		}
	}

	render() {
		if (this.switchEnabled) {
			return html`
				<d2l-switch-visibility
					@change="${this._onChange}"
					?on="${!this.isDraft}"
					text-position="${this._textHidden ? 'hidden' : 'end'}">
				</d2l-switch-visibility>
			`;
		} else {
			return html`
				<div class="d2l-label-text">
					<d2l-icon icon="${this.isDraft ? 'tier1:visibility-hide' : 'tier1:visibility-show'}"></d2l-icon>
					<span class="${classMap({'d2l-offscreen': this._textHidden})}">
						${this.isDraft ? this.localize('hidden') : this.localize('visible')}
					</span>
				</div>
			`;
		}

	}
}
customElements.define('d2l-activity-visibility-editor-toggle', ActivityVisibilityEditorToggle);
