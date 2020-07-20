import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/activity-store.js';

class ActivitySpecialAccessEditor extends ActivityEditorMixin(RtlMixin(LocalizeActivityEditorMixin(MobxLitElement))) {

	static get properties() {

		return {
			description: { type: String }
		};
	}

	static get styles() {

		return [
			bodySmallStyles,
			labelStyles,
			css`
			d2l-button-subtle {
				margin-left: -0.6rem;
			}
			.special-access-user-count-icon {
				margin-right: 0.2rem;
			}
			:host([dir="rtl"]) .special-access-user-count-icon {
				margin-left: 0.2rem;
				margin-right: 0;
			}
			.special-access-user-count-text {
				display: inline-block;
				font-size: 0.7rem;
				line-height: 0.7rem;
			}
			`
		];
	}

	constructor() {
		super();
		this.description = '';
	}

	_renderDescription(specialAccess) {
		const {isRestricted, userCount } = specialAccess;

		if (userCount === 0) {
			return html`
				<p class="d2l-body-small">
					${this.description}
				</p>
			`;
		} else {
			const specialAccessTypeDescription = isRestricted ? html`${this.localize('editor.specialAccessRestrictedText')}` : html`${this.localize('editor.specialAccessNotRestrictedText')}`;
			const userCountText = html`${this.localize('editor.specialAccessCount', { count: userCount })}`;
			return html`
				<label class="d2l-label-text">${specialAccessTypeDescription}</label>
				<div class="special-access-user-count-container">
					<d2l-icon class="special-access-user-count-icon" icon="tier1:access-special"></d2l-icon>
					<div class="special-access-user-count-text">${userCountText}</div>
				</div>
			`;
		}
	}

	_renderManageButton() {
		return html`
			<d2l-button-subtle
				text="${this.localize('editor.btnManageSpecialAccess')}"
				@click="${this._openSpecialAccessDialog}">
			</d2l-button-subtle>
		`;
	}

	_openSpecialAccessDialog() {
		const specialAccess = store.get(this.href).specialAccess;
		const dialogUrl = specialAccess && specialAccess.url;

		if (!dialogUrl) {
			return;
		}

		const location = new D2L.LP.Web.Http.UrlLocation(dialogUrl);

		const buttons = [
			{
				Key: 'save',
				Text: this.localize('editor.btnSave'),
				ResponseType: 1, // D2L.Dialog.ResponseType.Positive
				IsPrimary: true,
				IsEnabled: true
			},
			{
				Text: this.localize('editor.btnCancel'),
				ResponseType: 2, // D2L.Dialog.ResponseType.Negative
				IsPrimary: false,
				IsEnabled: true
			}
		];

		// Launch into our "friend", the LMS, to do the thing.
		const delayedResult = D2L.LP.Web.UI.Legacy.MasterPages.Dialog.Open(
			/*               opener: */ document.body,
			/*             location: */ location,
			/*          srcCallback: */ 'SrcCallback',
			/*       resizeCallback: */ '',
			/*      responseDataKey: */ 'result',
			/*                width: */ 1920,
			/*               height: */ 1080,
			/*            closeText: */ this.localize('editor.btnCloseDialog'),
			/*              buttons: */ buttons,
			/* forceTriggerOnCancel: */ false
		);

		// "X" abort handler
		// refetch special access in case the user count has changed
		delayedResult.AddReleaseListener(() => specialAccess.fetch(true));

		// Save or Cancel button handler
		delayedResult.AddListener(() => specialAccess.fetch(true));
	}

	render() {
		const entity = store.get(this.href);

		if (!entity || !entity.specialAccess) {
			return html``;
		}

		return html`
			${this._renderDescription(entity.specialAccess)}
			${this._renderManageButton()}
		`;
	}
}

customElements.define(
	'd2l-activity-special-access-editor',
	ActivitySpecialAccessEditor
);
