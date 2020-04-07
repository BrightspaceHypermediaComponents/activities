import { AsyncContainerMixin, asyncStates } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import Events from 'd2l-telemetry-browser-client';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { shared as store } from './state/activity-store.js';

class ActivityEditor extends AsyncContainerMixin(ActivityEditorMixin(LocalizeMixin(LitElement))) {

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
			const metricName = `d2l-activity-${this.type}-editor.page.rendered`;
			performance.measure(metricName);
			this.logLoadingEvent(metricName);
		}
	}

	async logLoadingEvent(metricName) {
		const eventBody = new Events.PerformanceEventBody()
			.setAction('LoadView')
			.setObject(this.href, this.type)
			.addUserTiming(performance.getEntriesByName(metricName));
		const event = new Events.TelemetryEvent()
			.setType('PerformanceEvent')
			.setDate(new Date())
			.setSourceId(this.telemetryId)
			.setBody(eventBody);
		const client = await D2L.Telemetry.CreateClient();
		client.logUserEvent(event);
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
			<div ?hidden="${this.asyncState !== asyncStates.complete}">
				<slot name="editor"></slot>
			</div>
		`;
	}
}
customElements.define('d2l-activity-editor', ActivityEditor);
