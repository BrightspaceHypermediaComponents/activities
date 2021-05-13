import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/icons/icon.js';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element';
import { accordionStyles } from '../styles/accordion-styles';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityAssignmentEditorMixin } from './mixins/d2l-activity-assignment-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from './state/assignment-store.js';

class AssignmentTurnitinEditor
	extends ActivityEditorMixin(LocalizeActivityAssignmentEditorMixin(MobxLitElement)) {

	static get styles() {

		return [
			bodySmallStyles,
			labelStyles,
			accordionStyles,
			css`
			.d2l-help-text {
				margin: 0 0 0.3rem 0;
			}

			d2l-button-subtle {
				margin-left: -0.6rem;
			}

			.d2l-feature-summary {
				list-style: none;
				margin: 0;
				padding: 0;
			}

			.d2l-feature-summary-item {
				display: inline-block;
				font-size: 0.7rem;
				margin-left: 0.5rem;
			}

			.d2l-feature-summary-item:first-child {
				margin-left: 0;
			}
			`
		];
	}

	constructor() {

		super(store);
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

		let featureSummary;
		if (isTurnitinEnabled) {

			let originalityCheckItem;
			if (isOriginalityCheckEnabled) {
				originalityCheckItem = html`
					<li class="d2l-feature-summary-item">
						<d2l-icon icon="tier1:check"></d2l-icon>
						${this.localize('txtOriginalityCheckOn')}
					</li>
				`;
			}

			let gradeMarkItem;
			if (isGradeMarkEnabled) {
				gradeMarkItem = html`
					<li class="d2l-feature-summary-item">
						<d2l-icon icon="tier1:check"></d2l-icon>
						${this.localize('txtGradeMarkOn')}
					</li>
				`;
			}

			featureSummary = html`
				<ul class="d2l-feature-summary">
					${originalityCheckItem}
					${gradeMarkItem}
				</ul>
			`;
		}

		return html`
			<div id="assignment-turnitin-container" ?hidden="${!canEditTurnitin}">
				<div class="d2l-label-text">${this.localize('hdrTurnitin')}</div>
				<p class="d2l-help-text d2l-body-small">${this.localize('hlpTurnitin')}</p>
				${featureSummary}
				<d2l-button-subtle
					text="${this.localize('btnEditTurnitin')}"
					@click="${this._onClickEdit}">
				</d2l-button-subtle>
			</div>
		`;
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
				Text: this.localize('btnSave'),
				ResponseType: 1, // D2L.Dialog.ResponseType.Positive
				IsPrimary: true,
				IsEnabled: true
			},
			{
				Text: this.localize('btnCancel'),
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
			/*            closeText: */ this.localize('btnCloseDialog'),
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

}

customElements.define(
	'd2l-assignment-turnitin-editor',
	AssignmentTurnitinEditor
);
