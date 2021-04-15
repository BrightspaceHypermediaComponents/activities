import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { sharedCategories as store } from './state/assignment-store.js';

class AssignmentCategoriesSummary extends ActivityEditorMixin(RtlMixin(LocalizeActivityAssignmentEditorMixin(MobxLitElement))) {

	static get styles() {
		return css`
			:host {
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 100%;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	constructor() {
		super(store);
	}

	render() {
		const categories = store.get(this.href);
		if (categories) {
			const categoryName = categories.selectedCategory && categories.selectedCategory.properties.name;

			return html`${categoryName}`;
		}
	}
}

customElements.define(
	'd2l-activity-assignment-categories-summary',
	AssignmentCategoriesSummary
);
