import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/activity-store.js';

class ActivitySpecialAccessEditor extends ActivityEditorMixin(RtlMixin(LocalizeMixin(MobxLitElement))) {

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

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
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
			const specialAccessTypeDescription = isRestricted ? html`${this.localize('specialAccessRestrictedText')}` : html`${this.localize('specialAccessNotRestrictedText')}`;
			const userCountText = html`${this.localize('specialAccessCount', { count: userCount })}`;
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
				text="${this.localize('btnManageSpecialAccess')}">
			</d2l-button-subtle>
		`;
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
