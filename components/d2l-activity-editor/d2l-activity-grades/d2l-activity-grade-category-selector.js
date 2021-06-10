import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { inputLabelStyles } from '@brightspace-ui/core/components/inputs/input-label-styles.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';
import { shared as store } from '../state/activity-store.js';

class ActivityGradeCategorySelector extends ActivityEditorMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {
	static get properties() {
		return {
			_showCategories: { type: Boolean },
			_createSelectboxGradeItemEnabled: { type: Boolean }
		};
	}

	static get styles() {
		return [
			inputLabelStyles,
			selectStyles,
			css`
			:host {
				display: block;
			}
			:host([hidden]),
			[hidden] {
				display: none !important;
			}
			.d2l-input-label {
				display: block;
				margin-bottom: 8px;
			}
			#d2l-activity-grade-category-selector {
				margin-bottom: 32px;
				margin-top: 16px;
			}
			`
		];
	}

	constructor() {
		super(store);
		this._showCategories = false;
	}

	connectedCallback() {
		super.connectedCallback();

		const event = new CustomEvent('d2l-request-provider', {
			detail: { key: 'd2l-provider-create-selectbox-grade-item-enabled' },
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(event);

		this._createSelectboxGradeItemEnabled = event.detail.provider;
		this.resetShowCategoriesProperty();
	}

	render() {
		const activity = store.get(this.href);

		if (!activity || !activity.scoreAndGrade.newGradeCandidatesCollection || !activity.scoreAndGrade.newGradeCandidatesCollection.hasNewGradeCandidateWithCategory()) {
			return html``;
		}

		this.newGradeCandidatesCollection = activity.scoreAndGrade.newGradeCandidatesCollection;

		const {
			gradeCandidates,
			selected
		} = this.newGradeCandidatesCollection;

		return html`
			<d2l-button-subtle
				?hidden="${this._showCategories}"
				text="${this.localize('grades.chooseNewGradeItemCategory')}"
				@click="${this.showCategories}">
			</d2l-button-subtle>
			<div id="d2l-activity-grade-category-selector" ?hidden="${!this._showCategories}">
				<label for="grade-categories" class="d2l-input-label">${this.localize('grades.newGradeItemCategory')}</label>
				<select
					id="grade-categories"
					class="d2l-input-select"
					@change="${this._setSelected}"
					>
					${gradeCandidates.map(gc => html`
						<option value="${gc.href}" .selected="${selected && gc.href === selected.href}">
							${gc.name ? gc.name : this.localize('grades.noGradeItemCategory')}
						</option>
					`)};
				</select>
			</div>
		`;
	}
	resetShowCategoriesProperty() {
		this._showCategories = !this._createSelectboxGradeItemEnabled;
	}
	showCategories() {
		this._showCategories = true;
	}
	_setSelected(e) {
		if (e.target && e.target.value) {
			this.newGradeCandidatesCollection.setSelected(e.target.value);
		} else {
			this.newGradeCandidatesCollection.setSelected();
		}
	}
}

customElements.define('d2l-activity-grade-category-selector', ActivityGradeCategorySelector);
