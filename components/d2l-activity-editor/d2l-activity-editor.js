import '@brightspace-ui/core/components/backdrop/backdrop.js';
import '@brightspace-ui/core/templates/primary-secondary/primary-secondary.js';
import '@brightspace-ui/core/components/dialog/dialog-confirm.js';
import 'd2l-alert/d2l-alert-toast.js';

import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityEditorContainerMixin } from './mixins/d2l-activity-editor-container-mixin.js';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { ActivityEditorTelemetryMixin } from './mixins/d2l-activity-editor-telemetry-mixin';
import { classMap } from 'lit-html/directives/class-map.js';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/activity-store.js';

const isWindows = window.navigator.userAgent.indexOf('Windows') > -1;

class ActivityEditor extends ActivityEditorContainerMixin(ActivityEditorTelemetryMixin(AsyncContainerMixin(ActivityEditorMixin(RtlMixin(LocalizeActivityEditorMixin(LitElement)))))) {

	static get properties() {
		return {
			widthType: { type: String, attribute: 'width-type' },
			errorTerm: { type: String, attribute: 'error-term' },
			htmlEditorEnabled: { type: Boolean, attribute: 'html-editor-enabled' },
			htmlNewEditorEnabled: { type: Boolean, attribute: 'html-new-editor-enabled' },
			_backdropShown: { type: Boolean },
			_saveToastVisible: { type: Boolean }
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
			.d2l-activity-editor-loading {
				padding: 20px;
			}
			.d2l-primary-panel {
				box-sizing: border-box;
				height: 100%;
				padding: 20px;
			}
			.d2l-secondary-panel {
				padding: 10px;
			}
			.d2l-secondary-scroll {
				padding-right: 2px;
			}
			:host([dir="rtl"]) .d2l-secondary-scroll {
				padding-left: 2px;
				padding-right: 10px;
			}
			d2l-alert {
				margin-bottom: 10px;
				max-width: 100%;
			}
		`;
	}

	constructor() {
		super();
		// Only show the scrollbar when necessary
		document.body.style.overflow = 'auto';
		// The following line introduces a worse bug, where typing into a text input on Android causes
		// the cursor to go to the beginning every time a space is entered
		//document.documentElement.style.overflow = 'auto'; // needed for FF bug

		this._backdropShown = false;
		this._saveToastVisible = null;
	}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener('d2l-activity-editor-save-complete', this._onSaveComplete);
		this.addEventListener('d2l-request-provider', this._onRequestProvider);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('d2l-activity-editor-save-complete', this._onSaveComplete);
		this.removeEventListener('d2l-request-provider', this._onRequestProvider);
	}

	render() {
		const secondaryPanelClasses = {
			'd2l-secondary-panel': true,
			'd2l-secondary-scroll': isWindows
		};

		return html`
			<div id="editor-container">
				<d2l-template-primary-secondary
					background-shading="secondary"
					width-type="${this.widthType}">

					<slot name="header" slot="header"></slot>
					<div slot="primary" class="d2l-primary-panel">
						<d2l-alert type="error" ?hidden=${!this.isError}>${this.errorTerm}</d2l-alert>
						<slot name="primary"></slot>
					</div>
					<div slot="secondary" class="${classMap(secondaryPanelClasses)}">
						<slot name="secondary"></slot>
					</div>
					<d2l-activity-editor-footer
						.href="${this.href}"
						.token="${this.token}"
						slot="footer"
						class="d2l-activity-editor-footer">
					</d2l-activity-editor-footer>
				</d2l-template-primary-secondary>
			</div>
			<d2l-backdrop
				for-target="editor-container"
				?shown="${this._backdropShown}"
				no-animate-hide
				delay-transition
				slow-transition>
			</d2l-backdrop>
			<d2l-dialog-confirm title-text="${this.localize('editor.discardChangesTitle')}" text=${this.localize('editor.discardChangesQuestion')}>
				<d2l-button slot="footer" primary dialog-action="confirm">${this.localize('editor.yesLabel')}</d2l-button>
				<d2l-button slot="footer" dialog-action="cancel">${this.localize('editor.noLabel')}</d2l-button>
			</d2l-dialog-confirm>

			<d2l-alert-toast
				id="save-succeeded-toast"
				?open="${this._saveToastVisible}"
				type="default"
				announce-text=${this.localize('editor.saveSuccessful')}
				@d2l-alert-toast-close=${this._onToastClose}>
				${this.localize('editor.saveSuccessful')}
			</d2l-alert-toast>
		`;
	}
	update(changedProperties) {
		super.update(changedProperties);
		if (changedProperties.has('asyncState') && this.asyncState === asyncStates.complete) {
			this.logLoadEvent(this.href, this.type, this.telemetryId);
		}
	}
	updated(changedProperties) {
		super.updated(changedProperties);
		if (changedProperties.has('isSaving')) {
			this._toggleBackdrop(this.isSaving);
		}
	}
	hasPendingChanges() {
		const activity = store.get(this.href);
		if (activity) {
			return activity.dirty();
		}
		return false;
	}
	async save() {
		const activity = store.get(this.href);
		if (activity) {
			await activity.save();
		}
	}

	async validate() {
		const activity = store.get(this.href);
		if (activity) {
			await activity.validate();
		}
	}

	_onRequestProvider(e) {
		if (e.detail.key === 'd2l-provider-html-editor-enabled') {
			e.detail.provider = this.htmlEditorEnabled;
			e.stopPropagation();
			return;
		}

		if (e.detail.key === 'd2l-provider-html-new-editor-enabled') {
			e.detail.provider = this.htmlNewEditorEnabled;
			e.stopPropagation();
			return;
		}
	}

	_onSaveComplete(e) {
		if (e.detail.saveInPlace) {
			this._saveToastVisible = true;
			e.stopPropagation();
		}
	}

	_onToastClose() {
		this._saveToastVisible = false;
	}

	_toggleBackdrop(show) {
		this._backdropShown = show;
	}
}
customElements.define('d2l-activity-editor', ActivityEditor);
