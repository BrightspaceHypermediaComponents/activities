import './d2l-activity-rubrics-list-editor';
import 'd2l-associations/add-associations.js';
import 'd2l-rubric/d2l-rubric';
import 'd2l-rubric/d2l-rubric-title';
import 'd2l-rubric/editor/d2l-rubric-editor.js';
import 'd2l-simple-overlay/d2l-simple-overlay.js';
import '@brightspace-ui/core/components/dropdown/dropdown.js';
import '@brightspace-ui/core/components/dropdown/dropdown-content.js';
import { css, html } from 'lit-element/lit-element.js';
import { heading4Styles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import { shared as assignmentStore } from '../../d2l-activity-editor/d2l-activity-assignment-editor/state/assignment-store.js';
import { Association } from 'siren-sdk/src/activities/Association.js';
import associationStore from './state/association-collection-store.js';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';

class ActivityRubricsListContainer extends ActivityEditorMixin(RtlMixin(LocalizeMixin(MobxLitElement))) {

	static get properties() {
		return {
			_newlyCreatedPotentialAssociationHref: { type: String },
			activityUsageHref: { type: String },
			defaultScoringOptions: {type: Array}
		};
	}

	static get styles() {
		return [
			heading4Styles,
			labelStyles,
			selectStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-heading-4 {
					margin: 0 0 0 0;
				}
				d2l-dropdown-button-subtle {
					margin-left: -0.6rem;
				}
				.rubric-heading-container {
					display: flex;
					align-items: center;
					margin: 0 0 0.6rem 0;
				}
				.preview-rubrics {
					flex-shrink: 0;
				}
				.rubric-heading-title {
					flex-grow: 1;
				}
			`
		];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super(associationStore);
		this._newlyCreatedPotentialAssociation = {};
		this._newlyCreatedPotentialAssociationHref = '';
	}

	_toggleDialog(toggle) {

		const dialog = this.shadowRoot.querySelector('#attach-rubric-dialog');
		if (dialog) {
			if (toggle) {
				this.shadowRoot.querySelector('d2l-add-associations').reset();
			}
			dialog.opened = toggle;
		}
	}

	_resizeDialog(e) {
		e.currentTarget.resize();
	}

	_closeAttachRubricDialog(e) {
		const entity = associationStore.get(this.href);
		if (e && e.detail && e.detail.associations) {
			entity.addAssociations(e.detail.associations);
			announce(this.localize('txtRubricAdded'));
		}
		this._toggleDialog(false);
	}

	_openAttachRubricDialog() {
		this._toggleDialog(true);
	}

	_closeEditNewAssociationOverlay() {
		const editNewAssociationOverlay =
			this.shadowRoot.querySelector('#create-new-association-dialog');
		if (editNewAssociationOverlay) {
			this._clearNewRubricHref();
			editNewAssociationOverlay.close();
		}
	}

	_attachRubric() {
		const entity = associationStore.get(this.href);

		if (!entity) {
			return;
		}
		entity.addAssociations([this._newlyCreatedPotentialAssociation]);
		this._closeEditNewAssociationOverlay();
		announce(this.localize('txtRubricAdded'));
	}

	async _createNewAssociation() {

		const entity = associationStore.get(this.href);
		if (!entity) {
			return;
		}

		this._newlyCreatedPotentialAssociation = await entity.createPotentialAssociation();

		if (!this._newlyCreatedPotentialAssociation) {
			return;
		}

		const potentialAssociationEntity = new Association(
			this._newlyCreatedPotentialAssociation,
			this.token
		);

		this._newlyCreatedPotentialAssociationHref = potentialAssociationEntity.getRubricLink();

		const editNewAssociationOverlay = this.shadowRoot.querySelector('#create-new-association-dialog');
		if (editNewAssociationOverlay) {
			editNewAssociationOverlay.open();
		}

	}

	_renderRubricEditor() {
		if (this._newlyCreatedPotentialAssociationHref !== '') {
			return html`
				<d2l-rubric-editor
					href="${this._newlyCreatedPotentialAssociationHref}"
					.token="${this.token}"
					title-dropdown-hidden>
				</d2l-rubric-editor>`;
		} else {
			return html``;
		}
	}

	_clearNewRubricHref() {
		this._newlyCreatedPotentialAssociationHref = '';
	}

	_renderAddRubricDropdown(entity) {

		const canCreatePotentialAssociation = entity.canCreatePotentialAssociation();
		const canCreateAssociation = entity.canCreateAssociation();

		if (!canCreateAssociation && !canCreatePotentialAssociation) {
			return html``;
		}

		return html`
		<d2l-dropdown-button-subtle
			text="${this.localize('btnAddRubric')}"
		>
			<d2l-dropdown-menu align="start">
				<d2l-menu label="${this.localize('btnAddRubric')}">
					<d2l-menu-item
						text="${this.localize('btnCreateNew')}"
						@d2l-menu-item-select="${this._createNewAssociation}"
						?hidden=${!canCreatePotentialAssociation}
					>
					</d2l-menu-item>
					<d2l-menu-item
						text="${this.localize('btnAddExisting')}"
						@d2l-menu-item-select="${this._openAttachRubricDialog}"
						?hidden=${!canCreateAssociation}
					>
					</d2l-menu-item>
				</d2l-menu>
			</d2l-dropdown-menu>
		</d2l-dropdown-button-subtle>
		`;

	}

	_saveDefaultScoringRubricOnChange(event) {
		if (!event) {
			return;
		}
	}

	async _getDefaultScoringRubricOptions(entity) {
		if (!entity) {
			return [];
		}

		// const options = [
		// 	{
		// 		title: 'Rubric 1',
		// 		value: 1
		// 	},
		// 	{
		// 		title: 'Rubric 2',
		// 		value: 2
		// 	}
		// ];

		Promise.resolve(entity.associatedRubrics());
	}

	_renderDefaultScoringRubric(entity) {

		const assignment = assignmentStore.getAssignment(this.assignmentHref);

		if (!entity || !assignment) {
			return html``;
		}

		const isReadOnly = !assignment.canEditDefaultScoringRubric;
		this._getDefaultScoringRubricOptions(entity);

		// TODO get list of associated rubrics
		console.log('defaultScoringOptions: ', this.defaultScoringOptions);

		if (!entity.associatedRubricNames || entity.associatedRubricNames.length <= 1) {
			return html``;
		}

		return html`
			<label class="d2l-label-text" for="assignment-default-scoring-rubric">
				Default Scoring Rubric
			</label>
			<select
				id="assignment-default-scoring-rubric"
				class="d2l-input-select block-select"
				@change="${this._saveDefaultScoringRubricOnChange}"
				?disabled=${isReadOnly}>
					${entity.associatedRubricNames.map(option => html`<option value=${option.value} ?selected=${String(option.value) === 1}>${option.title}</option>`)}
			</select>
		`;

	}

	render() {

		const entity = associationStore.get(this.href);

		if (!entity) {
			return html``;
		}

		return html`
			<div class="rubric-heading-container">
				<h3 class="d2l-heading-4 rubric-heading-title">
					${this.localize('hdrRubrics')}
				</h3>
			</div>
			<d2l-activity-rubrics-list-editor
				href="${this.href}"
				activityUsageHref=${this.activityUsageHref}
				.token=${this.token}
			></d2l-activity-rubrics-list-editor>

			${this._renderAddRubricDropdown(entity)}

			${this._renderDefaultScoringRubric(entity)}

			<d2l-simple-overlay
				id="create-new-association-dialog"
				close-simple-overlay-alt-text="${this.localize('btnClose')}"
				no-cancel-on-outside-click
				@d2l-simple-overlay-close-button-clicked="${this._clearNewRubricHref}"
				@d2l-simple-overlay-canceled="${this._clearNewRubricHref}"
			>
				${this._renderRubricEditor()}
				<d2l-floating-buttons always-float>
					<d2l-button primary @click="${this._attachRubric}">
						${this.localize('btnAttachRubric')}
					</d2l-button>
					<d2l-button @click="${this._closeEditNewAssociationOverlay}">
						${this.localize('btnCancel')}
					</d2l-button>
				</d2l-floating-buttons>
			</d2l-simple-overlay>

			<d2l-dialog
				id="attach-rubric-dialog"
				@associations-done-work="${this._closeAttachRubricDialog}"
				@associations-resize-dialog="${this._resizeDialog}"
				width="700"
				title-text="${this.localize('txtAddExisting')}"
			>
				<d2l-add-associations
					.token="${this.token}"
					.href="${this.activityUsageHref}"
					type="rubrics"
					skipSave
				></d2l-add-associations>
			</d2l-dialog>
		`;
	}
}
customElements.define('d2l-activity-rubrics-list-container', ActivityRubricsListContainer);
