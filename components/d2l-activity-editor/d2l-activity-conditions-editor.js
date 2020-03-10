import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/icons/icon.js';
import 'd2l-dropdown/d2l-dropdown-button-subtle.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import { bodyCompactStyles, bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import store from './state/conditions-store.js';

class ActivityConditionsEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeMixin(MobxLitElement))) {

	static get properties() {

		return {
			description: { type: String }
		};
	}

	static get styles() {

		return [
			bodySmallStyles,
			labelStyles,
			selectStyles,
			css`
			.d2l-body-small, .d2l-label-text {
				margin: 0 0 0.3rem 0;
			}

			.d2l-input-select {
				width: 100%;
				max-width: 300px;
				display: block;
			}

			d2l-dropdown-button-subtle {
				margin-left: -0.6rem;
			}

			.conditions {
				margin: 0;
				padding: 0;
				list-style: none;
			}
			`,
			...this.listItemStyles
		];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	static get listItemStyles() {

		return [
			bodyCompactStyles,
			css`
			.d2l-list-item {
				display: flex;
				border: 1px solid var(--d2l-color-gypsum);
				border-radius: 6px;
				margin-top: 0.5rem;
				margin-bottom: 0.5rem;
			}

			.d2l-list-item-decoration {
				flex: 0 0 auto;
				padding-top: 18px;
				padding-left: 15px;
				padding-right: 18px;
				padding-bottom: 18px;
			}

			.d2l-list-item-content {
				flex: 1 1 auto;
				padding-top: 17px;
				padding-bottom: 17px;
				align-self: center;
			}

			.d2l-list-item-deleter {
				flex: 0 0 auto;
				padding-top: 6px;
				padding-left: 6px;
				padding-right: 6px;
			}
			`
		];
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

	_renderDescription({ conditions }) {

		if (conditions.length <= 0) {

			return html`
				<p class="d2l-body-small">
					${this.description}
				</p>
			`;
		}

		if (conditions.length === 1) {

			return html`
				<p class="d2l-label-text">
					${this.localize('lblConditionsOperator')}
				</p>
			`;
		}

		// label rendered by operator select list for a11y
		return html``;
	}

	_renderOperator({ value, selected, title }) {

		return html`
			<option value="${value}" ?selected="${selected}">
				${title}
			</option>
		`;
	}

	_setOperator(event) {

		const entity = store.get(this.href);
		if (!entity) {
			return;
		}

		entity.setOperator(event.target.value);
	}

	_renderOperators({ conditions, operators }) {

		if (conditions.length <= 1) {
			return html``;
		}

		return html`
			<div>
				<label class="d2l-label-text" for="operator">
					${this.localize('lblConditionsOperator')}
				</label>
				<select
					class="d2l-input-select"
					id="operator"
					@change="${this._setOperator}">
					${operators.map(this._renderOperator, this)}
				</select>
			</div>
		`;
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
			<li class="d2l-list-item">
				<span class="d2l-list-item-decoration">
					<d2l-icon
						icon="tier2:release-conditions"
						style="width:30px;height:30px;">
					</d2l-icon>
				</span>
				<span class="d2l-list-item-content d2l-body-compact">
					${title}
				</span>
				<span class="d2l-list-item-deleter">
					<d2l-button-icon
						text="${this.localize('btnRemoveCondition')}"
						icon="tier1:close-large"
						data-key="${key}"
						@click="${this._removeCondition}">
					</d2l-button-icon>
				</span>
			</li>
		`;
	}

	_renderConditions({ conditions }) {

		return html`
			<ul class="conditions">
				${conditions.map(this._renderCondition, this)}
			</ul>
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
			${this._renderDescription(entity)}
			${this._renderOperators(entity)}
			${this._renderConditions(entity)}
			${this._renderAddCondition(entity)}
		`;
	}
}

customElements.define(
	'd2l-activity-conditions-editor',
	ActivityConditionsEditor
);
