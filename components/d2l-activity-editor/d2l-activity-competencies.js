import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/button/button-subtle.js';
import { bodySmallStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html } from 'lit-element/lit-element';
import { accordionStyles } from './styles/accordion-styles';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { LocalizeActivityEditorMixin } from './mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from '../../components/d2l-activity-editor/state/activity-store.js';

class ActivityCompetencies extends ActivityEditorMixin(RtlMixin(LocalizeActivityEditorMixin(MobxLitElement))) {

	static get properties() {
		return {
			_overrides: { type: Object },
			_isFirstLoad: { type: Boolean }
		};
	}

	static get styles() {
		return [
			bodySmallStyles,
			labelStyles,
			accordionStyles,
			css`
				.d2l-competencies-icon {
					margin-right: 0.6rem;
				}
				:host([dir="rtl"]) .d2l-competencies-icon {
					margin-left: 0.6rem;
					margin-right: 0;
				}
				.d2l-competencies-count-container {
					align-items: center;
					display: flex;
					margin-bottom: 0.3rem;
				}
				.d2l-competencies-count-text {
					font-size: 0.7rem;
					line-height: 0.7rem;
				}
				.d2l-alert-icon {
					color: red;
				}
				.d2l-body-small {
					margin: 0;
				}
				#no-learning-objectives-summary {
					margin: 0;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const activity = store.get(this.href);
		if (!activity || !activity.competenciesHref) {
			return html``;
		}

		const {
			associatedCompetenciesCount: count,
			unevaluatedCompetenciesCount: unevalCount,
			competenciesDialogUrl: dialogUrl
		} = activity;

		return html`
			<div class="d2l-label-text">${this.localize('editor.competencies')}</div>
			<div class="d2l-competencies-count-container">
				${this._renderCountText(count)}
			</div>
			${this._renderUnevalCountText(unevalCount)}
			${this._renderDialogOpener(dialogUrl)}
		`;
	}
	_openManageCompetencies() {
		const dialogUrl = store.get(this.href).competenciesDialogUrl;

		if (!dialogUrl) {
			return;
		}

		const location = new D2L.LP.Web.Http.UrlLocation(dialogUrl);
		const buttons = [
			{
				Text: this.localize('editor.btnClose'),
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
			/*                width: */ 960,
			/*               height: */ 960,
			/*            closeText: */ this.localize('editor.btnCloseDialog'),
			/*              buttons: */ buttons,
			/* forceTriggerOnCancel: */ false
		);

		// "Close" button handler
		delayedResult.AddListener(() => store.get(this.href).loadCompetencies(true));

		// "X" abort handler
		delayedResult.AddReleaseListener(() => store.get(this.href).loadCompetencies(true));
	}

	_renderCountText(count) {
		if (count === 0) {
			const langTerm = this.localize('editor.noLearningObjectives');
			return html`<div id="no-learning-objectives-summary" class="d2l-body-small">${langTerm}</div>`;
		} else {
			const langTerm = this.localize('editor.competenciesCount', { count });
			return html`
			<d2l-icon class="d2l-competencies-icon" icon="tier1:user-competencies"></d2l-icon>
			<div class="d2l-competencies-count-text">${langTerm}</div>
		`;
		}
	}
	_renderDialogOpener(dialogUrl) {
		if (!dialogUrl) {
			return html``;
		}

		return html`
			<d2l-button-subtle
				text="${this.localize('editor.manageCompetencies')}"
				h-align="text"
				@click="${this._openManageCompetencies}">
			</d2l-button-subtle>
		`;
	}

	_renderUnevalCountText(count) {
		if (!count) {
			return html``;
		}

		return html`
			<div class="d2l-competencies-count-container">
				<d2l-icon class="d2l-competencies-icon d2l-alert-icon" icon="tier1:alert"></d2l-icon>
				<div class="d2l-competencies-count-text">${this.localize('editor.unevaluatedCompetencies', { count })}</div>
			</div>
		`;
	}

}
customElements.define('d2l-activity-competencies', ActivityCompetencies);
