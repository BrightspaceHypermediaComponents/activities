import { bodyCompactStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { inputLabelStyles } from '@brightspace-ui/core/components/inputs/input-label-styles.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import { sharedCategories as store } from './state/assignment-store.js';

const NEW_CATEGORY = 'new category';
const UNSELECTED_ID = '0'; // API expects 0 to unselect a category

class AssignmentCategoriesEditor extends ActivityEditorMixin(ActivityEditorDialogMixin(RtlMixin(LocalizeActivityAssignmentEditorMixin(MobxLitElement)))) {

	static get properties() {
		return {
			href: {
				type: String,
			},
		};
	}

	static get styles() {
		return [
			selectStyles,
			bodyCompactStyles,
			inputLabelStyles,
			labelStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}

				.d2l-block-select {
					display: block;
					max-width: 300px;
					width: 100%;
				}

				d2l-input-text {
					padding: 20px 0;
				}

				.d2l-label-text {
					display: inline-block;
					margin-bottom: 10px;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const categoriesStore = store.get(this.href);

		if (!categoriesStore || !categoriesStore.categories) {
			return html``;
		}

		if (!categoriesStore.canEditCategories) {
			return this._renderReadonlyView(categoriesStore.selectedCategory);
		}

		return html`
			${this._renderDialog(categoriesStore)}

			<label class="d2l-label-text" for="categories-editor">
				${this.localize('txtCategoriesLabel')}
			</label>

			<select
				id="categories-editor"
				class="d2l-input-select d2l-block-select"
				@change="${this._updateCategory}">

				<option value=${UNSELECTED_ID} ?selected=${!categoriesStore.selectedCategory}>${this.localize('noCategoryLabel')}</option>

				${categoriesStore.categories.map((category) => this._formatOption(category, this.href))}

				${this._renderNewCategoryOption()}

			</select>
		`;
	}

	hasPendingChanges() {
		const categoriesStore = store.get(this.href);
		if (!categoriesStore) return;

		return categoriesStore.dirty;
	}

	save() {
		const categoriesStore = store.get(this.href);
		if (!categoriesStore) return;

		categoriesStore.save();
	}

	_formatOption(category, href) {
		const categoriesStore = store.get(href);
		if (!categoriesStore) return;

		const id = category.properties.categoryId;
		const isSelected = id === categoriesStore.selectedCategoryId;

		return html`
			<option
				value=${id}
				?selected=${isSelected}>
					${category.properties.name}
			</option>`;
	}

	async _handleClose(e) {
		const categoriesStore = store.get(this.href);
		if (!categoriesStore) return;

		if (e && e.detail && e.detail.action === 'save') {
			await categoriesStore.save();
		} else {
			// reset category to prevent it from saving
			categoriesStore.setNewCategoryName(null);
		}

		this.handleClose();
	}

	_handleNewCategory(categoriesStore) {
		this.open();

		return this._resetCategory(categoriesStore);
	}

	_renderDialog(store) {
		return html`
			<d2l-dialog
				width="460"
				?opened="${this.opened}"
				@d2l-dialog-close="${this._handleClose}"
				title-text="${this.localize('newAssignmentCategory')}">

					<d2l-input-text
						value="${store.newCategoryName}"
						label="${this.localize('inputCategoryLabel')}"
						maxlength="128"
						novalidate
						required
						@input="${this._setNewCategoryName}"
						skip-alert>
					</d2l-input-text>

					<d2l-button
						data-dialog-action="save"
						slot="footer"
						?disabled="${!store.newCategoryName}"
						primary>
						${this.localize('btnAssignmentCategoryCreate')}
					</d2l-button>

					<d2l-button
						data-dialog-action
						slot="footer">
						${this.localize('btnAssignmentCategoryCancel')}
					</d2l-button>

			</d2l-dialog>
		`;
	}

	_renderNewCategoryOption() {
		const categoriesStore = store.get(this.href);
		if (!categoriesStore || !categoriesStore.canAddCategories) {
			return html``;
		}

		return html`<option value=${NEW_CATEGORY}>${this.localize('newCategoryLabel')}</option>`;
	}

	_renderReadonlyView(selectedCategory) {
		const name = selectedCategory ? selectedCategory.properties.name : this.localize('noCategoryLabel');
		return html`
			<label class="d2l-label-text" for="readonly-category">
				${this.localize('txtCategoriesLabel')}
			</label>

			<div class="d2l-body-compact" id="readonly-category">${name}</div>`;
	}

	_resetCategory(categoriesStore) {
		this.shadowRoot.querySelector('select').value = categoriesStore.selectedCategoryId || UNSELECTED_ID;

		return;
	}

	_setNewCategoryName(e) {
		const categoriesStore = store.get(this.href);
		if (!categoriesStore) return;

		categoriesStore.setNewCategoryName(e.target.value);
	}

	_setSelectedCategory(e, categoriesStore) {
		const selectedCategoryIndex = e.target.selectedIndex;
		const selectedCategory = e.target.options[selectedCategoryIndex];

		const { value, text } = selectedCategory;

		categoriesStore.setSelectedCategory(value, text);
	}

	_updateCategory(e) {
		if (!e || !e.target || !e.target.value) return;

		const categoriesStore = store.get(this.href);
		if (!categoriesStore) return;

		if (e.target.value === NEW_CATEGORY) {
			return this._handleNewCategory(categoriesStore);
		}

		if (e.target.value === UNSELECTED_ID) {
			return categoriesStore.setSelectedCategory(UNSELECTED_ID, '');
		}

		this._setSelectedCategory(e, categoriesStore);
	}
}
customElements.define('d2l-activity-assignment-categories-editor', AssignmentCategoriesEditor);
