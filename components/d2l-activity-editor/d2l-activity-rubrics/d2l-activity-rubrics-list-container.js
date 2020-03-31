import './d2l-activity-rubrics-list-editor';
import 'd2l-associations/add-associations.js';
import 'd2l-rubric/d2l-rubric';
import 'd2l-rubric/d2l-rubric-title';
import 'd2l-rubric/editor/d2l-rubric-editor.js';
import 'd2l-simple-overlay/d2l-simple-overlay.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { Association } from 'siren-sdk/src/activities/Association.js';
import { getLocalizeResources } from '../localization.js';
import { heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import store from './state/association-collection-store.js';

class ActivityRubricsListContainer extends ActivityEditorMixin(RtlMixin(LocalizeMixin(MobxLitElement))) {

	static get properties() {
		return {
			_newlyCreatedPotentialAssociationHref: { type: String },
			activityUsageHref: { type: String }
		};
	}

	static get styles() {
		return [
			heading4Styles,
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
		super(store);
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
		const entity = store.get(this.href);
		if (e && e.detail && e.detail.associations) {
			entity.addAssociations(e.detail.associations);
		}
		this._toggleDialog(false);
	}

	_openAttachRubricDialog() {
		this._toggleDialog(true);
	}

	_closeEditNewAssociationOverlay() {
		const editNewAssociationOverlay = this.shadowRoot.querySelector('#create-new-association-dialog');
		if (editNewAssociationOverlay) {
			editNewAssociationOverlay.close();
		}
	}

	_attachRubric() {
		const entity = store.get(this.href);

		if (!entity) {
			return;
		}
		entity.addAssociations([this._newlyCreatedPotentialAssociation]);

		this._closeEditNewAssociationOverlay();

	}

	async _createNewAssociation() {

		const entity = store.get(this.href);
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

	_renderRubricPreviews() {

		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		const associations = entity.fetchAssociations();
		return associations.map(a => {
			const shouldShowRubric = (a.isAssociated || a.isAssociating)
			&& !a.isDeleting;

			if (shouldShowRubric) {
				return html`
				<d2l-rubric href="${a.rubricHref}" .token="${this.token}">
					<h3>
						<d2l-rubric-title
							href="${a.rubricHref}"
							.token="${this.token}">
						</d2l-rubric-title>
					</h3>
				</d2l-rubric>
				`;
			}
		});
	}

	_launchRubricPreviewDialog() {
		const dialog = this.shadowRoot.querySelector('#rubric-preview-dialog');
		if (dialog) {
			dialog.opened = true;
		}
	}

	render() {

		const entity = store.get(this.href);

		if (!entity) {
			return html``;
		}

		const rubricCount = entity.fetchAttachedAssociationsCount();

		return html`
			<div class="rubric-heading-container">
				<h3 class="d2l-heading-4 rubric-heading-title">
					${this.localize('hdrRubrics')}
				</h3>
				<d2l-button-icon
					?disabled="${rubricCount <= 0}"
					class="preview-rubrics"
					icon="tier1:new-window"
					@click="${this._launchRubricPreviewDialog}"
					text="${this.localize('txtOpenRubricPreview')}">
				</d2l-button-icon>
			</div>
			<d2l-activity-rubrics-list-editor
				href="${this.href}"
				activityUsageHref=${this.activityUsageHref}
				.token=${this.token}
			></d2l-activity-rubrics-list-editor>

			<d2l-dropdown-button-subtle text="${this.localize('btnAddRubric')}">
				<d2l-dropdown-menu align="start">
					<d2l-menu label="${this.localize('btnAddRubric')}">
						<d2l-menu-item text="${this.localize('btnCreateNew')}"
							@d2l-menu-item-select="${this._createNewAssociation}">
						</d2l-menu-item>
						<d2l-menu-item text="${this.localize('btnAddExisting')}"
							@d2l-menu-item-select="${this._openAttachRubricDialog}">
						</d2l-menu-item>
					</d2l-menu>
				</d2l-dropdown-menu>
			</d2l-dropdown-button-subtle>

			<d2l-simple-overlay id="create-new-association-dialog">
				<d2l-rubric-editor
					href="${this._newlyCreatedPotentialAssociationHref}"
					.token="${this.token}">
				</d2l-rubric-editor>
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
					href="${this.activityUsageHref}"
					type="rubrics"
					skipSave
				></d2l-add-associations>
			</d2l-dialog>

			<d2l-dialog
				id="rubric-preview-dialog"
				width="980"
				title-text="${this.localize('hdrRubrics')}"
			>
				${this._renderRubricPreviews()}
			</d2l-dialog>
		`;
	}
}
customElements.define('d2l-activity-rubrics-list-container', ActivityRubricsListContainer);
