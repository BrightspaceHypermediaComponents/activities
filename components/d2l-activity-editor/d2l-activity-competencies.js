import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import { bodyCompactStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { shared as store } from '../../components/d2l-activity-editor/state/activity-store.js';

class ActivityCompetencies extends ActivityEditorMixin(LocalizeMixin(MobxLitElement)) {

	static get properties() {
		return {
			_overrides: { type: Object },
			_isFirstLoad: { type: Boolean }
		};
	}

	static get styles() {
		return [
			bodyCompactStyles,
			labelStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				.competencies-icon {
					margin-inline-end: 0.6rem;
				}
				.competencies-count-container {
					display: flex;
					align-items: center;
				}
				.competencies-count-text {
					font-size: 0.7rem;
					line-height: 0.7rem;
				}
			`
		];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super(store);
	}

	_openManageCompetencies() {
		const dialogUrl = store.get(this.href).competenciesDialogUrl;

		if (!dialogUrl) {
			return;
		}

		const location = new D2L.LP.Web.Http.UrlLocation(dialogUrl);
		const buttons = [
			{
				Text: this.localize('btnClose'),
				ResponseType: 2, // D2L.Dialog.ResponseType.Negative
				IsPrimary: false,
				IsEnabled: true
			}
		];

		// Launch into our "friend", the LMS, to do the thing.
		D2L.LP.Web.UI.Legacy.MasterPages.Dialog.Open(
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
	}

	_renderDialogOpener(dialogUrl) {
		if (!dialogUrl) {
			return html``;
		}

		return html`
			<d2l-button-subtle
				text="${this.localize('manageCompetencies')}"
				h-align="text"
				@click="${this._openManageCompetencies}">
			</d2l-button-subtle>
		`;
	}

	_renderCountText(count) {
		const langTerm = this.localize('associatedCompetencies', { count });

		if (count === 0) {
			return html`<div class="d2l-body-compact">${langTerm}</div>`;
		}

		return html`
			<d2l-icon class="competencies-icon" icon="tier1:user-competencies"></d2l-icon>
			<div class="competencies-count-text">${langTerm}</div>
		`;
	}

	render() {
		const activity = store.get(this.href);
		if (!activity || !activity.competenciesHref) {
			return html``;
		}

		const {
			associatedCompetenciesCount: count,
			competenciesDialogUrl: dialogUrl
		} = activity;

		return html`
			<label class="d2l-label-text">${this.localize('competencies')}</label>
			<div class="competencies-count-container">
				${this._renderCountText(count)}
			</div>
			${this._renderDialogOpener(dialogUrl)}
		`;
	}

}
customElements.define('d2l-activity-competencies', ActivityCompetencies);
