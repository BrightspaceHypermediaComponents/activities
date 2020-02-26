import 'd2l-dropdown/d2l-dropdown-button-subtle.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import store from './state/conditions-store.js';

class ActivityConditionsEditor extends ActivityEditorMixin(LocalizeMixin(MobxLitElement)) {

	static get styles() {

		return css`
			d2l-dropdown-button-subtle {
				margin-left: -0.6rem;
			}
		`;
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super(store);
	}

	async save() {

		const entity = store.get(this.href);
		if (!entity) {
			return;
		}

		await entity.save();
	}

	_removeCondition(event) {

		const entity = store.get(this.href);
		if (!entity) {
			return;
		}

		entity.remove(event.target.dataset.key);
	}

	_renderCondition({ key, title }) {

		return html`
			<li>
				${title}
				<d2l-button-icon
					text="${this.localize('btnRemoveCondition')}"
					icon="tier1:delete"
					data-key="${key}"
					@click="${this._removeCondition}">
				</d2l-button-icon>
			</li>
		`;
	}

	_addExisting(event) {

		const entity = store.get(this.href);
		if (!entity) {
			return;
		}

		const {
			attachExistingDialogUrl,
			attachExistingPositiveButtonText,
			attachExistingNegativeButtonText,
			attachExistingCloseText
		} = entity;

		const location = new D2L.LP.Web.Http.UrlLocation(attachExistingDialogUrl);
		const buttons = [
			{
				Text: attachExistingPositiveButtonText,
				ResponseType: 1, // D2L.Dialog.ResponseType.Positive
				IsPrimary: true,
				IsEnabled: true
			},
			{
				Text: attachExistingNegativeButtonText,
				ResponseType: 2, // D2L.Dialog.ResponseType.Negative
				IsPrimary: false,
				IsEnabled: true
			}
		];

		// Launch into our friend, the LMS, to do the thing.
		const delayedResult = D2L.LP.Web.UI.Legacy.MasterPages.Dialog.Open(
			/*               opener: */ event.target,
			/*             location: */ location,
			/*          srcCallback: */ 'AttachConditions',
			/*       resizeCallback: */ '',
			/*      responseDataKey: */ 'conditions',
			/*                width: */ 638,
			/*               height: */ 588,
			/*            closeText: */ attachExistingCloseText,
			/*              buttons: */ buttons,
			/* forceTriggerOnCancel: */ false
		);
		delayedResult.AddListener(result => {

			if (result !== undefined) {
				entity.add(result);
			}
		});
	}

	_createNew(event) {

		const entity = store.get(this.href);
		if (!entity) {
			return;
		}

		const {
			createNewDialogUrl,
			createNewPositiveButtonText,
			createNewNegativeButtonText,
			createNewCloseText
		} = entity;

		const location = new D2L.LP.Web.Http.UrlLocation(createNewDialogUrl);
		const buttons = [
			{
				Text: createNewPositiveButtonText,
				ResponseType: 1, // D2L.Dialog.ResponseType.Positive
				IsPrimary: true,
				IsEnabled: true
			},
			{
				Text: createNewNegativeButtonText,
				ResponseType: 2, // D2L.Dialog.ResponseType.Negative
				IsPrimary: false,
				IsEnabled: true
			}
		];

		// Launch into our friend, the LMS, to do the thing.
		const delayedResult = D2L.LP.Web.UI.Legacy.MasterPages.Dialog.Open(
			/*               opener: */ event.target,
			/*             location: */ location,
			/*          srcCallback: */ 'CreateCondition',
			/*       resizeCallback: */ '',
			/*      responseDataKey: */ 'condition',
			/*                width: */ 638,
			/*               height: */ 588,
			/*            closeText: */ createNewCloseText,
			/*              buttons: */ buttons,
			/* forceTriggerOnCancel: */ false
		);
		delayedResult.AddListener(result => {

			if (result !== undefined) {
				entity.add(result);
			}
		});
	}

	_renderAddCondition(entity) {

		const { canAttachExisting, canCreateNew } = entity;

		if (!canAttachExisting && !canCreateNew) {
			return html``;
		}

		let attachExistingTemplate;
		if (canAttachExisting) {
			attachExistingTemplate = html`
				<d2l-menu-item
					text="${this.localize('btnAddExisting')}"
					@d2l-menu-item-select="${this._addExisting}">
				</d2l-menu-item>
			`;
		}

		let createNewTemplate;
		if (canCreateNew) {
			createNewTemplate = html`
				<d2l-menu-item
					text="${this.localize('btnCreateNew')}"
					@d2l-menu-item-select="${this._createNew}">
				</d2l-menu-item>
			`;
		}

		return html`
			<d2l-dropdown-button-subtle
				text="${this.localize('btnAddReleaseCondition')}">
				<d2l-dropdown-menu>
					<d2l-menu label="${this.localize('btnAddReleaseCondition')}">
						${createNewTemplate}
						${attachExistingTemplate}
					</d2l-menu>
				</d2l-dropdown-menu>
			</d2l-dropdown>
		`;
	}

	render() {

		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		return html`
			<ul>
				${entity.conditions.map(this._renderCondition, this)}
			</ul>
			${this._renderAddCondition(entity)}
		`;
	}
}

customElements.define(
	'd2l-activity-conditions-editor',
	ActivityConditionsEditor
);
