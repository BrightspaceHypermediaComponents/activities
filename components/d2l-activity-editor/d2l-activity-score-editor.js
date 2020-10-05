import './d2l-activity-grades/d2l-activity-grade-candidate-selector';
import './d2l-activity-grades-dialog.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/inputs/input-radio-spacer.js';
import '@brightspace-ui/core/components/inputs/input-text.js';
import '@brightspace-ui/core/components/dropdown/dropdown.js';
import '@brightspace-ui/core/components/dropdown/dropdown-menu.js';
import '@brightspace-ui/core/components/menu/menu.js';
import '@brightspace-ui/core/components/menu/menu-item.js';
import 'd2l-tooltip/d2l-tooltip';
import { bodyCompactStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { inputStyles } from '@brightspace-ui/core/components/inputs/input-styles.js';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

import { shared as store } from './state/activity-store.js';
/* eslint no-console: 0 */
class ActivityScoreEditor extends SkeletonMixin(ActivityEditorMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement)))) {

	static get properties() {
		return {
			activityName: { type: String },
			_focusUngraded: { type: Boolean }
		};
	}

	static get styles() {
		return [
			super.styles,
			bodyCompactStyles,
			labelStyles,
			inputStyles,
			css`
			:host {
				display: block;
			}
			:host([hidden]),
			[hidden] {
				display: none !important;
			}
			d2l-input-text {
				width: auto;
			}
			.d2l-grade-info:disabled {
				cursor: default;
				opacity: 0.5;
			}
			#score-info-container,
			#grade-info-container {
				display: flex;
			}
			#score-info-container {
				-webkit-align-items: flex-end;
				align-items: flex-end;
				flex-wrap: wrap;
			}
			#grade-info-container {
				-webkit-align-items: center;
				align-items: center;
			}
			.d2l-grade-type-text {
				margin: 0 0.75rem 0.5rem 0.6rem;
			}
			:host([dir="rtl"]) .d2l-grade-type-text {
				margin: 0 0.6rem 0.5rem 0.75rem;
			}
			#divider {
				border-left: solid 1px var(--d2l-color-galena);
				height: 30px;
				margin-right: 0.3rem;
			}
			:host([dir="rtl"]) #divider {
				margin-left: 0.3rem;
				margin-right: 0;
			}
			.d2l-grade-info,
			.d2l-grade-info:disabled:hover,
			.d2l-grade-info:disabled:focus {
				background: none;
				border: 2px solid transparent;
				border-radius: 0.3rem;
				display: flex;
				flex-wrap: nowrap;
				height: 42px;
				outline: none;
				padding: 0.5rem 0.6rem 0.4rem;
			}
			.d2l-grade-info {
				cursor: pointer;
			}
			.d2l-grade-info div {
				flex-shrink: 1;
			}
			.d2l-grade-info d2l-icon {
				flex-shrink: 0;
			}
			.d2l-grade-info > * {
				margin-right: 0.3rem;
			}
			.d2l-grade-info > *:last-child {
				margin-right: 0;
			}
			:host([dir="rtl"]) .d2l-grade-info > * {
				margin-left: 0.5rem;
				margin-right: 0;
			}
			:host([dir="rtl"]) .d2l-grade-info > *:last-child {
				margin-left: 0;
			}
			.d2l-grade-info:hover,
			.d2l-grade-info[active] {
				border-color: var(--d2l-color-mica);
				border-width: 1px;
				padding: calc(0.5rem + 1px) calc(0.6rem + 1px); /* 1px is difference in border width */
			}
			.d2l-grade-info:focus {
				border-color: var(--d2l-color-celestine);
				border-width: 2px;
				padding: 0.5rem 0.6rem 0.4rem;
			}
			.d2l-grade-info:hover > *,
			.d2l-grade-info:focus > * {
				color: var(--d2l-color-celestine-minus-1);
			}
			.d2l-grade-info:disabled:hover,
			.d2l-grade-info:disabled:focus,
			.d2l-grade-info:disabled:hover > *,
			.d2l-grade-info:disabled:focus > * {
				color: var(--d2l-color-ferrite);
			}
			button {
				/* needed otherwise user agent style overrides this */
				color: inherit;
				font-family: inherit;
			}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const activity = store.get(this.href);
		const {
			scoreOutOf,
			scoreOutOfError,
			canEditScoreOutOf,
			gradeType,
			inGrades,
			isUngraded,
			canSeeGrades
		} = activity && activity.scoreAndGrade || {};

		console.log('scoreOutOf', scoreOutOf);

		this._focusUngraded = isUngraded;

		return html`
			<div id="score-info-container">
				<d2l-input-text
					?skeleton="${this.skeleton}"
					id="score-out-of"
					label="${this.localize('editor.scoreOutOf')}"
					value="${isUngraded ? this.localize('editor.ungraded') : scoreOutOf}"
					size=${isUngraded ? 10 : 4}
					@change="${this._onScoreOutOfChanged}"
					@blur="${this._onScoreOutOfChanged}"
					@click="${isUngraded ? this._setGraded : null}"
					aria-invalid="${scoreOutOfError ? 'true' : ''}"
					?disabled="${!canEditScoreOutOf}"
					novalidate
				></d2l-input-text>
				${scoreOutOfError ? html`
					<d2l-tooltip
						id="score-tooltip"
						for="score-out-of"
						position="bottom"
						showing
						align="start"
					>
						${scoreOutOfError ? html`<span>${this.localize(`editor.${scoreOutOfError}`)}</span>` : null}
					</d2l-tooltip>
				` : null}
				${!isUngraded ? html`<div class="d2l-body-compact d2l-grade-type-text">${gradeType}</div>` : null}
				${canSeeGrades && !isUngraded ? html`
					<div id="grade-info-container">
						<div id="divider"></div>
						<d2l-dropdown ?disabled="${!canEditScoreOutOf}">
							<button class="d2l-label-text d2l-grade-info d2l-dropdown-opener" ?disabled="${!canEditScoreOutOf}">
								${inGrades ? html`<d2l-icon icon="tier1:grade"></d2l-icon>` : null}
								<div>${inGrades ? this.localize('editor.inGrades') : this.localize('editor.notInGrades')}</div>
								<d2l-icon icon="tier1:chevron-down"></d2l-icon>
							</button>
							<d2l-dropdown-menu id="grade-dropdown" align="start" no-pointer vertical-offset="3px">
								<d2l-menu label="${inGrades ? this.localize('editor.inGrades') : this.localize('editor.notInGrades')}">
									<d2l-menu-item
										text="${this.localize('editor.chooseFromGrades')}"
										@d2l-menu-item-select="${this._chooseFromGrades}"
									></d2l-menu-item>
									${this._addOrRemoveMenuItem()}
									<d2l-menu-item
										text="${this.localize('editor.setUngraded')}"
										@d2l-menu-item-select="${this._setUngraded}"
									></d2l-menu-item>
								</d2l-menu>
							</d2l-dropdown-menu>
						</d2l-dropdown>
						<d2l-activity-grades-dialog
							href="${this.href}"
							.token="${this.token}"></d2l-activity-grades-dialog>
					</div>
				` : null}
			</div>
		`;
	}
	updated(changedProperties) {
		super.updated(changedProperties);

		if ((changedProperties.has('href') || changedProperties.has('token')) &&
			this.href && this.token) {
			this.store && this._fetch(() => {
				const fetch = this.store.fetch(this.href, this.token);
				fetch.then(() => {
					this._setNewGradeName(this.activityName);
				});
			});
		}

		changedProperties.forEach((oldValue, propName) => {
			if (propName === '_focusUngraded' && typeof oldValue !== 'undefined') {
				const toFocus = this.shadowRoot.querySelector('#score-out-of');
				toFocus.focus();
			} else if (propName === 'activityName') {
				this._setNewGradeName(this.activityName);
			}
		});
		console.log('updated');
	}

	_addOrRemoveMenuItem() {
		const scoreAndGrade = store.get(this.href).scoreAndGrade;
		return scoreAndGrade.inGrades ? html`
			<d2l-menu-item
				text="${this.localize('editor.removeFromGrades')}"
				@d2l-menu-item-select="${this._removeFromGrades}"
			></d2l-menu-item>
		` : scoreAndGrade.canEditGrades ? html`
			<d2l-menu-item
				text="${this.localize('editor.addToGrades')}"
				@d2l-menu-item-select="${this._addToGrades}"
			></d2l-menu-item>
		` : null;
	}
	_addToGrades() {
		store.get(this.href).scoreAndGrade.addToGrades();
	}
	_chooseFromGrades() {
		const activityGradesElement = this.shadowRoot.querySelector('d2l-activity-grades-dialog');
		if (activityGradesElement) {
			activityGradesElement.open();
		}
	}
	_onScoreOutOfChanged() {
		const scoreAndGrade = store.get(this.href).scoreAndGrade;
		const scoreOutOf = this.shadowRoot.querySelector('#score-out-of').value;
		if (scoreOutOf === scoreAndGrade.scoreOutOf) {
			return;
		}

		scoreAndGrade.setScoreOutOf(scoreOutOf);
	}

	_removeFromGrades() {
		store.get(this.href).scoreAndGrade.removeFromGrades();
	}
	_setGraded() {
		const scoreAndGrade = store.get(this.href).scoreAndGrade;
		scoreAndGrade.setGraded(scoreAndGrade.canEditGrades);
	}
	_setNewGradeName(name) {
		const activity = store.get(this.href);
		if (activity) {
			activity.scoreAndGrade.setNewGradeName(name);
		}
	}

	_setUngraded() {
		store.get(this.href).scoreAndGrade.setUngraded();
	}

}
customElements.define('d2l-activity-score-editor', ActivityScoreEditor);
