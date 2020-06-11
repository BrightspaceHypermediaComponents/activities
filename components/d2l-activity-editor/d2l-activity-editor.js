import '@brightspace-ui/core/components/backdrop/backdrop.js';
import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { ActivityEditorTelemetryMixin } from './mixins/d2l-activity-editor-telemetry-mixin';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { shared as store } from './state/activity-store.js';

class ActivityEditor extends ActivityEditorTelemetryMixin(AsyncContainerMixin(ActivityEditorMixin(LocalizeMixin(LitElement)))) {

	static get properties() {
		return {
			isSaving: { type: Boolean },
			_backdropShown: { type: Boolean },
			_showBackgroundTimer: { type: Object }
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
		`;
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();

		this.isSaving = false;
		this._backdropShown = false;
		this._showBackgroundTimer = null;
	}

	async validate() {
		const activity = store.get(this.href);
		if (activity) {
			await activity.validate();
		}
	}

	async save() {
		const activity = store.get(this.href);
		if (activity) {
			await activity.save();
		}
	}

	update(changedProperties) {
		super.update(changedProperties);
		if (changedProperties.has('asyncState') && this.asyncState === asyncStates.complete) {
			this.logLoadEvent(this.href, this.type, this.telemetryId);
		}
		if (changedProperties.has('isSaving')) {
			this._toggleBackdrop(this.isSaving);
		}
	}

	_toggleBackdrop(show) {
		if (show && !this._showBackgroundTimer) {
			this._showBackgroundTimer = setTimeout(() => {
				this._backdropShown = true;
			}, 800);
		} else if (!show) {
			clearTimeout(this._showBackgroundTimer);
			this._showBackgroundTimer = null;
			this._backdropShown = false;
		}
	}

	hasPendingChanges() {
		const activity = store.get(this.href);
		if (activity) {
			return activity.dirty;
		}
		return false;
	}

	render() {
		return html`
			<div ?hidden="${this.asyncState === asyncStates.complete}" class="d2l-activity-editor-loading">${this.localize('loading')}</div>
			<div id="editor-container" ?hidden="${this.asyncState !== asyncStates.complete}">
				<slot name="editor"></slot>
			</div>
			<d2l-backdrop for-target="editor-container" ?shown="${this._backdropShown}" cut-out slow-transition></d2l-backdrop>
		`;
	}
}
customElements.define('d2l-activity-editor', ActivityEditor);
