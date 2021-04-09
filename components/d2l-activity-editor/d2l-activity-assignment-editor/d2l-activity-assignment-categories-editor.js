import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { bodyCompactStyles } from '@brightspace-ui/core/components/typography/styles';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles.js';
import { sharedCategories as store } from './state/assignment-store.js';

class AssignmentCategoriesEditor extends ActivityEditorMixin(RtlMixin(LocalizeActivityAssignmentEditorMixin(MobxLitElement))) {

	static get styles() {
		return [
			selectStyles,
			bodyCompactStyles,
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
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const categoriesStore = store.get(this.href);

		if (!categoriesStore || !categoriesStore.categories || !categoriesStore.categories.length) {
			return html``;
		}

		if (!categoriesStore.canEditCategories) {
			const name = categoriesStore.selectedCategory?.properties.name ?? this.localize('noCategoryLabel');
			return html`<div class="d2l-body-compact">${name}</div>`;
		}

		return html`
			<select
				class="d2l-input-select d2l-block-select"
				@change="${this._updateCategory}">

				<option ?selected=${!categoriesStore.selectedCategory}>${this.localize('noCategoryLabel')}</option>

				${categoriesStore.categories.map(this._formatOption)}

			</select>
		`;
	}

	_formatOption(category) {
		return html`<option value=${category.index} ?selected=${category.selected}>${category.name}</option>`;
	}

	_updateCategory() {
		// do something
	}
}
customElements.define('d2l-activity-assignment-categories-editor', AssignmentCategoriesEditor);
