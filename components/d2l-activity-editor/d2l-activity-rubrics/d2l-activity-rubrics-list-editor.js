import 'd2l-rubric/d2l-rubric';
import '@brightspace-ui/core/components/dialog/dialog';
import '@brightspace-ui/core/components/dialog/dialog-confirm';
import { ActivityEditorFeaturesMixin, Milestones } from '../mixins/d2l-activity-editor-features-mixin.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import { shared as assignmentStore } from '../../d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-store.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import store from './state/association-collection-store';

class ActivityRubricsListEditor extends ActivityEditorFeaturesMixin(ActivityEditorMixin(LocalizeActivityEditorMixin(RtlMixin((MobxLitElement))))) {

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
				.association-container {
					margin: 0 0 1rem 0;
					display: flex;
					align-items: center;
				}
				.delete-association-button {
					flex-shrink: 0;
					margin-left: 0.2rem;
				}
				.association-box{
					flex-grow: 1;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	_deleteAssociation(e) {
		const m3FeatureFlagEnabled = this._isMilestoneEnabled(Milestones.M3DefaultScoringRubric);

		if (m3FeatureFlagEnabled) {
			const entity = store.get(this.href);
			const assignment = assignmentStore.getAssignment(this.assignmentHref);

			if (!entity || !assignment) {
				return;
			}
			entity.deleteAssociation(e.target.dataset.id, assignment);
			announce(this.localize('rubrics.txtRubricRemoved'));
		} else {
			// pre-M3: this does not track default scoring rubric
			const entity = store.get(this.href);
			if (!entity) {
				return;
			}
			entity.deleteAssociation_DoNotUse(e.target.dataset.id);
			announce(this.localize('rubrics.txtRubricRemoved'));
		}
	}

	async save() {
		const entity = store.get(this.href);
		if (!entity) {
			return;
		}
		await entity.save();
	}

	_renderAssociation(association) {
		const shouldShowRubric = (association.isAssociated || association.isAssociating)
			&& !association.isDeleting;
		if (shouldShowRubric) {
			const canDeleteAssociation = association.entity.canDeleteAssociation() || association.isAssociating;

			return html`
			<div class="association-container">
				<d2l-rubric
					class="association-box"
					force-compact
					href="${association.rubricHref}"
					.token="${this.token}">
				</d2l-rubric>
				<d2l-button-icon
					?hidden="${!canDeleteAssociation}"
					class="delete-association-button"
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

	render() {

		const entity = store.get(this.href);

		if (!entity) {
			return html``;
		}

		if (!this.r) {
			// window.performance.measure('rubricsListEditorEntity', this.localName);
			this.r = true;
		}

		const associations = entity.fetchAssociations();
		return html`${associations.map(this._renderAssociation, this)}`;
	}

	hasPendingChanges() {
		const entity = store.get(this.href);
		return entity && entity.dirty;
	}

}
customElements.define('d2l-activity-rubrics-list-editor', ActivityRubricsListEditor);
