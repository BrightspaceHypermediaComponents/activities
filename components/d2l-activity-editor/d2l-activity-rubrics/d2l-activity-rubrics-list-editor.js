import 'd2l-rubric/d2l-rubric';
import '@brightspace-ui/core/components/dialog/dialog';
import '@brightspace-ui/core/components/dialog/dialog-confirm';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import { shared as assignmentStore } from '../../d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-store.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import store from './state/association-collection-store';

class ActivityRubricsListEditor extends ActivityEditorMixin(LocalizeActivityEditorMixin(RtlMixin((MobxLitElement)))) {

	static get properties() {
		return {
			assignmentHref: { type: String }
		};
	}

	static get styles() {
		return [
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}

				.d2l-heading-4 {
					margin: 0 0 0.6rem 0;
				}
				.d2l-association-container {
					align-items: center;
					display: flex;
					margin: 0 0 1rem 0;
				}
				.d2l-delete-association-button {
					flex-shrink: 0;
					margin-left: 0.2rem;
				}
				.d2l-association-box {
					flex-grow: 1;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {

		const entity = store.get(this.href);
		const assignment = assignmentStore.get(this.assignmentHref);

		if (!entity || !assignment) {
			return html``;
		}

		const associations = entity.fetchAssociations();
		return html`${associations.map(this._renderAssociation, this)}`;
	}
	hasPendingChanges() {
		const entity = store.get(this.href);
		return entity && entity.dirty;
	}
	async save() {
		const entity = store.get(this.href);
		if (!entity) {
			return;
		}
		await entity.save();
	}
	_deleteAssociation(e) {
		const entity = store.get(this.href);
		const assignment = assignmentStore.get(this.assignmentHref);

		if (!entity || !assignment) {
			return;
		}
		entity.deleteAssociation(e.target.dataset.id, assignment);
		announce(this.localize('rubrics.txtRubricRemoved'));
	}

	_renderAssociation(association) {
		const shouldShowRubric = (association.isAssociated || association.isAssociating)
			&& !association.isDeleting;
		if (shouldShowRubric) {
			const canDeleteAssociation = association.entity.canDeleteAssociation() || association.isAssociating;

			return html`
			<div class="d2l-association-container">
				<d2l-rubric
					class="d2l-association-box"
					force-compact
					.href="${association.rubricHref}"
					.token="${this.token}">
				</d2l-rubric>
				<d2l-button-icon
					?hidden="${!canDeleteAssociation}"
					class="d2l-delete-association-button"
					icon="tier1:close-default"
					data-id="${association.rubricHref}"
					@click="${this._deleteAssociation}"
					text=${this.localize('rubrics.txtDeleteRubric')}
				></d2l-button-icon>
			</div>
			`;
		} else {
			return html``;
		}
	}

}
customElements.define('d2l-activity-rubrics-list-editor', ActivityRubricsListEditor);
