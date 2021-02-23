import './d2l-activity-grades/d2l-activity-grade-candidate-selector';
import './d2l-activity-grades/d2l-activity-grade-category-selector';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/inputs/input-radio-spacer.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { formatNumber } from '@brightspace-ui/intl/lib/number.js';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/activity-store.js';

class ActivityGradesDialog extends ActivityEditorMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {

	static get properties() {
		return {
			_createNewRadioChecked: { type: Boolean },
			_canLinkNewGrade: { type: Boolean },
			_hasGradeCandidates: { type: Boolean },
			_createSelectboxGradeItemEnabled: { type: Boolean }
		};
	}

	static get styles() {
		return [
			bodySmallStyles,
			radioStyles,
			css`
			:host {
				display: block;
			}
			:host([hidden]),
			[hidden] {
				display: none !important;
			}
			.d2l-activity-grades-dialog-create-new-container {
				display: flex;
				margin-bottom: 18px;
			}
			.d2l-activity-grades-dialog-create-new-activity-name {
				overflow-wrap: anywhere; /* not supported by safari */
				word-break: break-word;
			}
			.d2l-activity-grades-dialog-create-new-icon {
				padding-right: 9px;
			}
			:host([dir="rtl"]) .d2l-activity-grades-dialog-create-new-icon {
				padding-left: 9px;
				padding-right: 0;
			}
			.d2l-activity-grades-dialog-grade-icon {
				padding-bottom: 6px;
				padding-top: 6px;
			}
			.d2l-input-radio-label-disabled {
				margin-bottom: 0;
			}
			.d2l-activity-grade-category-selector {
				padding-top: 16px;
			}
			#linkToExistingGradeItemRadioButton {
				padding-bottom: 10px;
			}
			`
		];
	}

	constructor() {
		super(store);
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
	}

	render() {
		const activity = store.get(this.href);
		if (!activity) {
			return html``;
		}

		const {
			scoreOutOf,
			scoreOutOfError,
			newGradeName
		} = activity.scoreAndGrade;

		return html`
			<d2l-dialog
				title-text="${this._createSelectboxGradeItemEnabled ? this.localize('editor.editLinkExisting') : this.localize('editor.chooseFromGrades')}"
				width="460"
				@d2l-dialog-open="${this._onDialogOpen}">

				<label class="d2l-input-radio-label ${!this._canLinkNewGrade ? 'd2l-input-radio-label-disabled' : ''}">
					<input
						type="radio"
						name="chooseFromGrades"
						value="createNew"
						?disabled="${!this._canLinkNewGrade}"
						.checked="${this._createNewRadioChecked}"
						@change="${this._dialogRadioChanged}">
					${this.localize('editor.createAndLinkToNewGradeItem')}
				</label>
				<d2l-input-radio-spacer ?hidden="${!this._createNewRadioChecked && this._canLinkNewGrade}">
					${this._canLinkNewGrade ? html`
						<div class="d2l-activity-grades-dialog-create-new-container">
							<div class="d2l-activity-grades-dialog-create-new-icon"><d2l-icon class="d2l-activity-grades-dialog-grade-icon" icon="tier1:grade"></d2l-icon></div>
							<div>
								<div class="d2l-activity-grades-dialog-create-new-activity-name">${newGradeName}</div>
								<div class="d2l-body-small">${scoreOutOf && !scoreOutOfError ? html`
									${this.localize('editor.points', { points: formatNumber(scoreOutOf, { maximumFractionDigits: 2 }) })}
								` : null }
								</div>
							</div>
						</div>
						<d2l-activity-grade-category-selector
							.href="${this.href}"
							.token="${this.token}">
						</d2l-activity-grade-category-selector>
					` : html`
						<div class="d2l-body-small">
							${this.localize('editor.noGradeCreatePermission')}
						</div>
					`}
				</d2l-input-radio-spacer>
				<label id="linkToExistingGradeItemRadioButton" class="d2l-input-radio-label ${!this._hasGradeCandidates ? 'd2l-input-radio-label-disabled' : ''}">
					<input
						type="radio"
						name="chooseFromGrades"
						value="linkExisting"
						?disabled="${!this._hasGradeCandidates}"
						.checked="${!this._createNewRadioChecked && this._hasGradeCandidates}"
						@change="${this._dialogRadioChanged}">
					${this.localize('editor.linkToExistingGradeItem')}
				</label>
				<d2l-input-radio-spacer ?hidden="${this._createNewRadioChecked && this._hasGradeCandidates}" ?disabled="${!this._hasGradeCandidates}">
					${this._hasGradeCandidates ? html`<d2l-activity-grade-candidate-selector
						.href="${this.href}"
						.token="${this.token}">
					</d2l-activity-grade-candidate-selector>` : html`<div class="d2l-body-small">
						${this.localize('editor.noGradeItems')}
					</div>`}
				</d2l-input-radio-spacer>
				<d2l-button slot="footer" primary dialog-action="done">${this.localize('editor.ok')}</d2l-button>
				<d2l-button slot="footer" dialog-action="cancel">${this.localize('editor.cancel')}</d2l-button>
			</d2l-dialog>
		`;
	}
	async open() {
		const scoreAndGrade = store.get(this.href).scoreAndGrade;
		await Promise.all([
			scoreAndGrade.fetchGradeCandidates(),
			scoreAndGrade.fetchNewGradeCandidates()
		]);

		const {
			gradeCandidateCollection,
			createNewGrade,
			newGradeCandidatesCollection
		} = scoreAndGrade;

		this._canLinkNewGrade = !!scoreAndGrade.getAssociateNewGradeAction();
		this._createNewRadioChecked = createNewGrade && this._canLinkNewGrade;
		this._hasGradeCandidates = gradeCandidateCollection && gradeCandidateCollection.gradeCandidates.length > 0;
		const prevSelectedHref = gradeCandidateCollection && gradeCandidateCollection.selected ? gradeCandidateCollection.selected.href : null;
		const prevSelectedCategoryHref = newGradeCandidatesCollection.selected.href;

		const dialog = this.shadowRoot.querySelector('d2l-dialog');
		const action = await dialog.open();
		if (action !== 'done') {
			if (prevSelectedHref) {
				gradeCandidateCollection.setSelected(prevSelectedHref);
			}
			newGradeCandidatesCollection.setSelected(prevSelectedCategoryHref);
			return;
		}

		if (this._createNewRadioChecked) {
			scoreAndGrade.linkToNewGrade();
		} else if (!this._createNewRadioChecked && this._hasGradeCandidates) {
			scoreAndGrade.linkToExistingGrade();
		}
	}

	_dialogRadioChanged(e) {
		const currentTarget = e.currentTarget;
		if (currentTarget && currentTarget.value === 'createNew') {
			this._createNewRadioChecked = true;
		} else if (currentTarget && currentTarget.value === 'linkExisting') {
			this._createNewRadioChecked = false;
		}

		const dialog = this.shadowRoot.querySelector('d2l-dialog');
		dialog.resize();
	}

	_onDialogOpen(e) {
		this.shadowRoot.querySelector('d2l-activity-grade-category-selector').setShowCategories(false);
		e.target.resize();
	}

}
customElements.define('d2l-activity-grades-dialog', ActivityGradesDialog);
