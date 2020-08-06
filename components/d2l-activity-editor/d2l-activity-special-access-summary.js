import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/activity-store.js';

class ActivitySpecialAccessSummary extends ActivityEditorMixin(LocalizeActivityEditorMixin(MobxLitElement)) {

	constructor() {
		super(store);
	}

	_renderSummary(specialAccess) {
		const { isRestricted, userCount } = specialAccess;

		if (userCount === 0 && isRestricted) {
			return html`${this.localize('editor.specialAccessHidden')}`;
		} else if (userCount === 0) {
			return html``;
		} else {
			return html`${this.localize('editor.txtNumSpecialAccess', { userCount })}`;
		}
	}

	render() {

		const entity = store.get(this.href);
		if (!entity || !entity.specialAccess) {
			return html``;
		} else {
			return html`${this._renderSummary(entity.specialAccess)}`;
		}
	}
}

customElements.define(
	'd2l-activity-special-access-summary',
	ActivitySpecialAccessSummary
);
