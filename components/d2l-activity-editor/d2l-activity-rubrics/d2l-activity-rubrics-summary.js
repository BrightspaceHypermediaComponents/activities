import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { html } from 'lit-element/lit-element';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import store from '../d2l-activity-rubrics/state/association-collection-store.js';

class ActivityRubricsSummary
	extends ActivityEditorMixin(LocalizeActivityEditorMixin(MobxLitElement)) {

	constructor() {
		super(store);
	}

	render() {
		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		const canCreatePotentialAssociation = entity.canCreatePotentialAssociation();
		const canCreateAssociation = entity.canCreateAssociation();
		const associationsCount = entity.fetchAttachedAssociationsCount();
		if (!canCreatePotentialAssociation && !canCreateAssociation) {
			return html``;
		} else if (associationsCount <= 0) {
			return html`${this.localize('rubrics.txtNoRubricAdded')}`;
		}

		return html`${this.localize('rubrics.txtRubricsAdded', 'count', associationsCount)}`;
	}
}

customElements.define(
	'd2l-activity-rubrics-summary',
	ActivityRubricsSummary
);
