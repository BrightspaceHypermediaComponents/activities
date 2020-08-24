import './d2l-activity-visibility-editor-toggle.js';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { html } from 'lit-element/lit-element';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

class ActivityVisibilityEditor extends (ActivityEditorMixin(MobxLitElement)) {

	static get properties() {
		return {
			disabled: { type: Boolean }
		};
	}

	constructor() {
		super();
		this.disabled = false;
	}

	render() {
		const activity = store.get(this.href);

		if (!activity) {
			return html``;
		}

		const {
			isDraft,
			canEditDraft
		} = activity;

		return html`
			<d2l-activity-visibility-editor-toggle
				?disabled="${this.disabled}"
				?is-draft="${isDraft}"
				?can-edit-draft="${canEditDraft}"
				@d2l-activity-visibility-editor-toggle-change="${this._updateVisibility}"
			>
			</d2l-activity-visibility-editor-toggle>
		`;
	}
	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			super._fetch(() => store.fetch(this.href, this.token, this.autoSave));
		}
	}
	_updateVisibility() {
		const activity = store.get(this.href);
		if (activity) {
			activity.setDraftStatus(!activity.isDraft);
		}
	}

}
customElements.define('d2l-activity-visibility-editor', ActivityVisibilityEditor);
