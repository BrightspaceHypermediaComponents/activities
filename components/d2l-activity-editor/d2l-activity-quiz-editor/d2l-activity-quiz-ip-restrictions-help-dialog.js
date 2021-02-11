import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { bodyCompactStyles } from '@brightspace-ui/core/components/typography/styles';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store';

class ActivityQuizIpRestrictionsHelpDialog
	extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(ActivityEditorDialogMixin(MobxLitElement)))) {

	static get styles() {
		return [
			bodyCompactStyles,
			css`
				.d2l-help-text-container {
					margin-bottom: 1rem;
				}

				#d2l-button-help-text {
					display: inline;
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

		return html`
			<div class="d2l-help-text-container d2l-body-compact">
				<p class="d2l-body-compact" id="d2l-button-help-text">${this.localize('ipRestrictionDialogDescription')}</p>
				<d2l-button-icon
					text=${this.localize('ipRestrictionsAccessibileHelpText')}
					icon="tier1:help"
					@click="${this.open}">
				</d2l-button-icon>
			</div>
			${this._renderDialog()}
		`;
	}

	_renderDialog() {
		return html`
			<d2l-dialog
				?opened="${this.opened}"
				@d2l-dialog-close="${this.handleClose}"
				title-text="${this.localize('hdrIpRestrictionsHelpDialog')}">

					${this._renderHelpText()}

					<d2l-button
						data-dialog-action="done"
						slot="footer"
						primary>
						${this.localize('ipRestrictionsHelpTxtConfirmation')}
					</d2l-button>
			</d2l-dialog>
		`;
	}

	_renderHelpText() {
		return html`
			<p class="d2l-body-compact">${this.localize('hdrIpRestrictionsHelpDialogP1')}</p>
			<p class="d2l-body-compact">${this.localize('hdrIpRestrictionsHelpDialogP2')}</p>
			<p class="d2l-body-compact">${this.localize('hdrIpRestrictionsHelpDialogP3')}</p>
			<p class="d2l-body-compact">${this.localize('hdrIpRestrictionsHelpDialogP4')}</p>
		`;
	}
}

customElements.define(
	'd2l-activity-quiz-ip-restrictions-help-dialog',
	ActivityQuizIpRestrictionsHelpDialog
);
