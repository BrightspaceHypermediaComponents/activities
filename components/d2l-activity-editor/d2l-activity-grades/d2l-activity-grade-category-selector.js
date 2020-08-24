import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { selectStyles } from '@brightspace-ui/core/components/inputs/input-select-styles';
import { shared as store } from '../state/activity-store.js';

class ActivityGradeCategorySelector extends ActivityEditorMixin(LocalizeActivityEditorMixin(MobxLitElement)) {
	static get properties() {
		return {};
	}

	static get styles() {
		return [
			labelStyles,
			selectStyles,
			css`
			:host {
				display: block;
			}
			:host([hidden]),
			[hidden] {
				display: none !important;
			}
			.d2l-label-text {
				display: block;
				padding-bottom: 8px;
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
			<div id="d2l-activity-grade-category-selector">
				<label class="d2l-label-text">${this.localize('grades.newGradeItemCategory')}</label>
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
	_setSelected(e) {
		if (e.target && e.target.value) {
			this.newGradeCandidatesCollection.setSelected(e.target.value);
		} else {
			this.newGradeCandidatesCollection.setSelected();
		}
	}

}

customElements.define('d2l-activity-grade-category-selector', ActivityGradeCategorySelector);
