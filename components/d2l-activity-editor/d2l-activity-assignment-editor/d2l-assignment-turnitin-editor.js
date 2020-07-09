import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/icons/icon.js';
import { bodySmallStyles, heading4Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityEditor } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { assignments as store } from './state/assignment-store.js';

class AssignmentTurnitinEditor
	extends ActivityEditorMixin(LocalizeActivityEditor(MobxLitElement)) {

	static get styles() {

		return [
			bodySmallStyles,
			heading4Styles,
			css`
			.d2l-heading-4 {
				margin: 0 0 0.6rem 0;
			}

			.help-text {
				margin: 0 0 0.3rem 0;
			}

			d2l-button-subtle {
				margin-left: -0.6rem;
			}

			.feature-summary {
				list-style: none;
				margin: 0;
				padding: 0;
			}

			.feature-summary-item {
				display: inline-block;
				margin-left: 0.5rem;
				font-size: 0.7rem;
			}

			.feature-summary-item:first-child {
				margin-left: 0;
			}
			`
		];
	}

	constructor() {

		super(store);
	}

	_onClickEdit() {

		const entity = store.get(this.href);
		if (!entity) {
			return;
		}

		const url = entity.editTurnitinUrl;
		if (!url) {
			return;
		}

		const location = new D2L.LP.Web.Http.UrlLocation(url);
		const buttons = [
			{
				Key: 'save',
				Text: this.localize('d2l-activity-assignment-editor.btnSave'),
				ResponseType: 1, // D2L.Dialog.ResponseType.Positive
				IsPrimary: true,
				IsEnabled: true
			},
			{
				Text: this.localize('d2l-activity-assignment-editor.btnCancel'),
				ResponseType: 2, // D2L.Dialog.ResponseType.Negative
				IsPrimary: false,
				IsEnabled: true
			}
		];

		// Launch into our friend, the LMS, to do the thing.
		const delayedResult = D2L.LP.Web.UI.Legacy.MasterPages.Dialog.Open(
			/*               opener: */ document.body,
			/*             location: */ location,
			/*          srcCallback: */ 'SrcCallback',
			/*       resizeCallback: */ '',
			/*      responseDataKey: */ 'result',
			/*                width: */ 960,
			/*               height: */ 960,
			/*            closeText: */ this.localize('d2l-activity-assignment-editor.btnCloseDialog'),
			/*              buttons: */ buttons,
			/* forceTriggerOnCancel: */ false
		);
		delayedResult.AddListener(result => {

			const resultIsValid = Array.isArray(result) && result.length >= 2;
			if (!resultIsValid) {
				return;
			}

			const [isOriginalityCheckEnabled, isGradeMarkEnabled] = result;
			entity.setTurnitin(isOriginalityCheckEnabled, isGradeMarkEnabled);
		});
	}

	render() {

		const entity = store.get(this.href);
		if (!entity) {
			return html``;
		}

		const {
			canEditTurnitin,
			isOriginalityCheckEnabled,
			isGradeMarkEnabled
		} = entity;

		const isTurnitinEnabled = isOriginalityCheckEnabled || isGradeMarkEnabled;
		const isEditorDisplayed = canEditTurnitin || isTurnitinEnabled;

		let featureSummary;
		if (isTurnitinEnabled) {

			let originalityCheckItem;
			if (isOriginalityCheckEnabled) {
				originalityCheckItem = html`
					<li class="feature-summary-item">
						<d2l-icon icon="tier1:check"></d2l-icon>
						${this.localize('d2l-activity-assignment-editor.txtOriginalityCheckOn')}
					</li>
				`;
			}

			let gradeMarkItem;
			if (isGradeMarkEnabled) {
				gradeMarkItem = html`
					<li class="feature-summary-item">
						<d2l-icon icon="tier1:check"></d2l-icon>
						${this.localize('d2l-activity-assignment-editor.txtGradeMarkOn')}
					</li>
				`;
			}

			featureSummary = html`
				<ul class="feature-summary">
					${originalityCheckItem}
					${gradeMarkItem}
				</ul>
			`;
		}

		return html`
			<div id="assignment-turnitin-container" ?hidden="${!isEditorDisplayed}">
				<h4 class="d2l-heading-4">${this.localize('d2l-activity-assignment-editor.hdrTurnitin')}</h4>
				<p class="help-text d2l-body-small">${this.localize('d2l-activity-assignment-editor.hlpTurnitin')}</p>
				${featureSummary}
				<d2l-button-subtle
					text="${this.localize('d2l-activity-assignment-editor.btnEditTurnitin')}"
					@click="${this._onClickEdit}"
					?hidden="${!canEditTurnitin}">
				</d2l-button-subtle>
			</div>
		`;
	}
}

customElements.define(
	'd2l-assignment-turnitin-editor',
	AssignmentTurnitinEditor
);
