import 'd2l-associations/add-associations.js';
import 'd2l-rubric/d2l-rubric';
import './d2l-activity-rubrics-list-editor';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ActivityUsageEntity } from 'siren-sdk/src/activities/ActivityUsageEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { getLocalizeResources } from '../localization.js';
import { heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import store from '../d2l-activity-rubrics/state/association-collection-store.js';

class ActivityRubricsListContainer extends RtlMixin(EntityMixinLit((LocalizeMixin(LitElement)))) {

	static get properties() {
		return {
			_rubricAssociationsHref: { type: String }
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
					margin: 0 0 0.6rem 0;
				}
			`
		];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this._setEntityType(ActivityUsageEntity);
		this._rubricAssociationsHref = '';
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onActivityUsageChange(entity);
			super._entity = entity;
		}
	}

	_onActivityUsageChange(activityUsage) {
		if (!activityUsage) {
			return;
		}
		this._rubricAssociationsHref = activityUsage.getRubricAssociationsHref();
	}

	_toggleDialog(toggle) {

		const dialog = this.shadowRoot.querySelector('d2l-dialog');
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
		const entity = store.get(this._rubricAssociationsHref);
		if (e && e.detail && e.detail.associations) {
			entity.addAssociations(e.detail.associations);
		}
		this._toggleDialog(false);
	}

	_openAttachRubricDialog() {
		this._toggleDialog(true);
	}

	render() {
		return html`
			<h3 class="d2l-heading-4">${this.localize('hdrRubrics')}</h3>
			<d2l-activity-rubrics-list-editor
				href="${this._rubricAssociationsHref}"
				activityUsageHref=${this.href}
				.token=${this.token}
			></d2l-activity-rubrics-list-editor>

			<d2l-dropdown-button-subtle text="${this.localize('btnAddRubric')}">
				<d2l-dropdown-menu align="start">
					<d2l-menu label="${this.localize('btnAddRubric')}">
						<d2l-menu-item text="${this.localize('btnCreateNew')}">
						</d2l-menu-item>
						<d2l-menu-item text="${this.localize('btnAddExisting')}"
							@d2l-menu-item-select="${this._openAttachRubricDialog}">
						</d2l-menu-item>
					</d2l-menu>
				</d2l-dropdown-menu>
			</d2l-dropdown-button-subtle>

			<d2l-dialog
				@associations-done-work="${this._closeAttachRubricDialog}"
				@associations-resize-dialog="${this._resizeDialog}"
				width="700"
				title-text="${this.localize('txtAddExisting')}"
			>
				<d2l-add-associations
					.token="${this.token}"
					href="${this.href}"
					type="rubrics"
					skipSave
				></d2l-add-associations>
			</d2l-dialog>
		`;
	}
}
customElements.define('d2l-activity-rubrics-list-container', ActivityRubricsListContainer);
