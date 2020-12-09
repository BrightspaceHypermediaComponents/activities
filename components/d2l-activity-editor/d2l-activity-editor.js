import '@brightspace-ui/core/components/backdrop/backdrop.js';
import '@brightspace-ui/core/templates/primary-secondary/primary-secondary.js';
import '@brightspace-ui/core/components/dialog/dialog-confirm.js';

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
			_backdropShown: { type: Boolean }
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

		this._backdropShown = false;
	}

	render() {
		const secondaryPanelClasses = {
			'd2l-secondary-panel': true,
			'd2l-secondary-scroll': isWindows
		};

		return html`
			<div id="editor-container">
				<d2l-template-primary-secondary background-shading="secondary" width-type="${this.widthType}">
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

	_toggleBackdrop(show) {
		this._backdropShown = show;
	}

}
customElements.define('d2l-activity-editor', ActivityEditor);
