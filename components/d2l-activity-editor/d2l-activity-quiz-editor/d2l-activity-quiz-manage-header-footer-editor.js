import { bodyCompactStyles, labelStyles } from '@brightspace-ui/core/components/typography/styles';
import { css, html } from 'lit-element/lit-element.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/quiz-store.js';

class ActivityQuizManageHeaderFooterEditor extends ActivityEditorMixin(RtlMixin(LocalizeActivityQuizEditorMixin(MobxLitElement))) {

	static get styles() {

		return [
			bodyCompactStyles,
			labelStyles,
			css`
				.d2l-body-compact {
					margin-top: 0;
				}
				.d2l-body-text-container {
					margin-bottom: 1rem;
				}
				.d2l-label-text {
					margin-bottom: 1rem;
					margin-top: 1.5rem;
				}
				.d2l-label-text-footer {
					margin-top: 2rem;
				}
				.d2l-activity-text-editor-spacer {
					margin-top: 1rem;
				}
			`
		];
	}

	constructor() {
		super(store);
	}

	render() {
		const quiz = store.get(this.href);

		const {
			header,
			canEditHeader,
			headerRichTextEditorConfig,
			footer,
			canEditFooter,
			footerRichTextEditorConfig
		} = quiz || {};

		const headerLang = this.localize('header');
		const footerLang = this.localize('footer');

		return html`
			<div class="d2l-body-text-container"><p class="d2l-body-compact">${this.localize('headerDialogText')}</p></div>
			<div class="d2l-label-text">${this.localize('headerLabel')}</div>
			<d2l-activity-text-editor id="headerEditor"
				.value="${header}"
				.richtextEditorConfig="${headerRichTextEditorConfig}"
				ariaLabel="${headerLang}"
				?disabled="${canEditHeader === undefined ? false : !canEditHeader}">
			</d2l-activity-text-editor>
			<div class="d2l-label-text d2l-label-text-footer">${this.localize('footerLabel')}</div>
			<d2l-activity-text-editor id="footerEditor"
				.value="${footer}"
				.richtextEditorConfig="${footerRichTextEditorConfig}"
				ariaLabel="${footerLang}"
				?disabled="${canEditFooter === undefined ? false : !canEditFooter}">
			</d2l-activity-text-editor>
			<div class="d2l-activity-text-editor-spacer"></div>
		`;
	}

	reset() {
		const headerEditor = this.shadowRoot.querySelector('#headerEditor');
		const footerEditor = this.shadowRoot.querySelector('#footerEditor');
		headerEditor.reset();
		footerEditor.reset();
	}

	save() {
		const editorEvent = new CustomEvent('d2l-request-provider', {
			detail: { key: 'd2l-provider-html-editor-enabled' },
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(editorEvent);

		const htmlEditorEnabled = editorEvent.detail.provider;

		const newEditorEvent = new CustomEvent('d2l-request-provider', {
			detail: { key: 'd2l-provider-html-new-editor-enabled' },
			bubbles: true,
			composed: true,
			cancelable: true
		});
		this.dispatchEvent(newEditorEvent);

		const htmlNewEditorEnabled = newEditorEvent.detail.provider;

		const entity = store.get(this.href);

		const headerEditor = this.shadowRoot.querySelector('#headerEditor');
		const footerEditor = this.shadowRoot.querySelector('#footerEditor');

		if (htmlEditorEnabled && htmlNewEditorEnabled) {
			const newEdH = headerEditor.shadowRoot.querySelector('d2l-activity-html-new-editor');
			const htmlEdH = newEdH.shadowRoot.querySelector('d2l-htmleditor');
			entity.setHeader(htmlEdH.html);
			const newEdF = footerEditor.shadowRoot.querySelector('d2l-activity-html-new-editor');
			const htmlEdF = newEdF.shadowRoot.querySelector('d2l-htmleditor');
			entity.setFooter(htmlEdF.html);
		}
		if (htmlEditorEnabled && !htmlNewEditorEnabled) {
			const oldEdH = headerEditor.shadowRoot.querySelector('d2l-activity-html-editor');
			const htmlEdH = oldEdH.shadowRoot.querySelector('d2l-html-editor');
			entity.setHeader(htmlEdH.innerText);
			const oldEdF = footerEditor.shadowRoot.querySelector('d2l-activity-html-editor');
			const htmlEdF = oldEdF.shadowRoot.querySelector('d2l-html-editor');
			entity.setFooter(htmlEdF.innerText);
		}
		if (!htmlEditorEnabled) {
			const edH = headerEditor.shadowRoot.querySelector('d2l-input-textarea');
			entity.setHeader(edH.value);
			const edF = footerEditor.shadowRoot.querySelector('d2l-input-textarea');
			entity.setFooter(edF.value);
		}
	}

}

customElements.define(
	'd2l-activity-quiz-manage-header-footer-editor',
	ActivityQuizManageHeaderFooterEditor
);
