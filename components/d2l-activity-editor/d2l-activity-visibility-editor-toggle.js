import '@d2l/switch/d2l-switch.js';
import 'd2l-colors/d2l-colors';
import { css, html, LitElement } from 'lit-element/lit-element';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

const baseUrl = import.meta.url;
class ActivityVisibilityEditorToggle extends LocalizeMixin(LitElement) {

	static get properties() {
		return {
			disabled: { type: Boolean },
			isDraft: { type: Boolean, attribute: 'is-draft' },
			canEditDraft: { type: Boolean, attribute: 'can-edit-draft' }
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			d2l-switch .d2l-label-text {
				color: var(--d2l-color-ferrite);
				font-weight: normal;
			}
		`;
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, baseUrl);
	}

	constructor() {
		super();
		this.isDraft = false;
		this.canEditDraft = false;
		this.disabled = false;
		// This needs to be registered here so that it is called before client event handlers to allow suppressing
		// the event when disabled
		this.addEventListener('click', this._onClick);
	}

	_onClick(e) {
		if (!this.switchEnabled) {
			e.stopImmediatePropagation();
		}
	}

	get switchEnabled() {
		return this.canEditDraft && !this.disabled;
	}

	render() {
		const switchVisibilityText = (this.isDraft ? this.localize('hidden') : this.localize('visible'));
		const switchVisibilityTextAria = (this.isDraft ? this.localize('ariaHidden') : this.localize('ariaVisible'));
		const icon = (this.isDraft ? 'tier1:visibility-hide' : 'tier1:visibility-show');
		const switchEnabled = this.switchEnabled
			? html`
				<d2l-switch
					aria-label="${switchVisibilityTextAria}"
					label-right
					.checked=${!this.isDraft}
				>
					<div class="d2l-label-text">
						<d2l-icon icon=${icon}></d2l-icon>
						${switchVisibilityText}
					</div>
				</d2l-switch>
			`
			: html`
				<div class="d2l-label-text">
					<d2l-icon icon=${icon}></d2l-icon>
					${switchVisibilityText}
				</div>
			`;

		return switchEnabled;
	}
}
customElements.define('d2l-activity-visibility-editor-toggle', ActivityVisibilityEditorToggle);
