import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/icons/icon.js';
import 'd2l-dropdown/d2l-dropdown-button-subtle.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import { bodyCompactStyles, bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import store from './state/conditions-store.js';

class ActivityConditionsEditor
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityEditorMixin(MobxLitElement))) {

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

	static get listItemStyles() {

		return [
			bodyCompactStyles,
			css`
			.d2l-list-item {
				display: flex;
				margin-top: 0.5rem;
				margin-bottom: 0.5rem;
				align-items: center;
			}

			.d2l-list-item-body{
				flex-grow: 1;
				border: 1px solid var(--d2l-color-chromite);
				border-radius: 6px;
				padding: 12px;
			}

			.d2l-list-item-decoration {
				flex: 0 0 auto;
				display: flex;
				margin-right: 12px;
				margin-bottom: 2px;
				float: left;	
			}

			.d2l-list-item-content {
				flex: 1 1 auto;
				align-self: center;
				float: left;
				max-width: 80%;
				margin-top: -6px;
				margin-bottom: -5px;
			}

			.d2l-list-item-deleter {
				flex: 0 0 auto;
				margin-left: 4px;
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
					${this.localize('editor.lblConditionsOperator')}
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
					${this.localize('editor.lblConditionsOperator')}
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

		const key = event.target.dataset.key;
		const conditions = this._conditions(entity).reduce((map, x) => {
			map[`${x.key}`] = x.title;
			return map;
		}, {});

		const condition = conditions[key];
		entity.remove(key);

		if (condition) {
			// don't want <strong> tags in screenreader text
			const title = condition.replace(/<strong>|<\/strong>/g, '');
			announce(`${this.localize('editor.txtConditionRemoved', {title})}`);
		}
	}

	_conditions({conditions}) {
		return conditions;
	}

	_renderCondition({ key, title }) {

		return html`
			<li class="d2l-list-item">
				<span class="d2l-list-item-body">
					<span class="d2l-list-item-decoration">
						<d2l-icon
							icon="tier2:release-conditions"
							style="width:30px;height:30px;">
						</d2l-icon>
					</span>
					<span
						class="d2l-list-item-content d2l-body-compact"
						.innerHTML="${title}">
					</span>
				</span>
				<span class="d2l-list-item-deleter">
					<d2l-button-icon
						text="${this.localize('editor.btnRemoveCondition')}"
						icon="tier1:close-default"
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
			/*                width: */ 700,
			/*               height: */ 650,
			/*            closeText: */ attachExistingCloseText,
			/*              buttons: */ buttons,
			/* forceTriggerOnCancel: */ false
		);
		delayedResult.AddListener(result => {

			if (result !== undefined) {
				entity.add(result);

				if (result !== undefined) {
					entity.add(result);

					if (result.length === 1) {
						// don't want <strong> tags in screenreader text
						const title = result[0].Text.replace(/<strong>|<\/strong>/g, '');
						announce(`${this.localize('editor.txtConditionAdded', {title})}`);
					}
					if (result.length > 1) {
						const count = result.length;
						announce(`${this.localize('editor.txtConditionsAdded', {count})}`);
					}
				}
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
			/*                width: */ 700,
			/*               height: */ 745,
			/*            closeText: */ createNewCloseText,
			/*              buttons: */ buttons,
			/* forceTriggerOnCancel: */ false
		);
		delayedResult.AddListener(result => {

			if (result !== undefined) {
				entity.add(result);

				const title = result.Text.replace(/<strong>|<\/strong>/g, '');
				announce(`${this.localize('editor.txtConditionAdded', {title})}`);
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
					text="${this.localize('editor.btnAddExisting')}"
					@d2l-menu-item-select="${this._addExisting}">
				</d2l-menu-item>
			`;
		}

		let createNewTemplate;
		if (canCreateNew) {
			createNewTemplate = html`
				<d2l-menu-item
					text="${this.localize('editor.btnCreateNew')}"
					@d2l-menu-item-select="${this._createNew}">
				</d2l-menu-item>
			`;
		}

		return html`
			<d2l-dropdown-button-subtle
				text="${this.localize('editor.btnAddReleaseCondition')}">
				<d2l-dropdown-menu>
					<d2l-menu label="${this.localize('editor.btnAddReleaseCondition')}">
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
