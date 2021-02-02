import 'd2l-inputs/d2l-input-text.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorDialogMixin } from '../mixins/d2l-activity-editor-dialog-mixin';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store.js';

class ActivityQuizIpRestrictionEditor
	extends ActivityEditorMixin(RtlMixin(ActivityEditorDialogMixin(LocalizeActivityQuizEditorMixin(MobxLitElement)))) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object }
		};
	}

	static get styles() {

		return [
			bodySmallStyles,
			labelStyles,
			css`
				:host {
					display: block;
				}

				:host([hidden]) {
					display: none;
				}

				#ip-restriction-editor-label {
					margin-bottom: 10px;
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
			${this._renderDialogOpener()}
			${this._renderDialog()}
		`;
	}

	_renderDialog() {
		return html`
			<d2l-dialog
				?opened="${this.opened}"
				@d2l-dialog-close="${this.handleClose}"
				title-text="${this.localize('hdrIpRestrictionDialog')}">
			</d2l-dialog>
		`;
	}

	_renderDialogOpener() {
		return html`
			<div id="ip-restriction-editor-label" class="d2l-label-text">
				${this.localize('ipRestrictionLabel')}
			</div>
			<d2l-button-subtle
				text="${this.localize('btnOpenIpRestrictionDialog')}"
				h-align="text"
				@click="${this.open}">
			</d2l-button-subtle>
		`;
	}

}

customElements.define(
	'd2l-activity-quiz-ip-restriction-editor',
	ActivityQuizIpRestrictionEditor
);
