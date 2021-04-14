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
				.d2l-body-text-container {
					margin-bottom: 1rem;
				}
				.d2l-label-text {
					margin-bottom: 0.5rem;
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
			headerRichTextEditorConfig
		} = quiz || {};

		const headerLang = this.localize('header');

		return html`
			<div class="d2l-body-text-container"><p class="d2l-body-compact">${this.localize('headerDialogText')}</p></div>
			<div class="d2l-label-text">${this.localize('headerLabel')}</div>
			<d2l-activity-text-editor
				.value="${header}"
				.richtextEditorConfig="${headerRichTextEditorConfig}"
				ariaLabel="${headerLang}"
				?disabled="${canEditHeader === undefined ? false : !canEditHeader}">
			</d2l-activity-text-editor>
		`;
	}

	reset() {
		this.shadowRoot.querySelector('d2l-activity-text-editor').reset();
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

		const el = this.shadowRoot.querySelector('d2l-activity-text-editor');

		if (htmlEditorEnabled && htmlNewEditorEnabled) {
			const newEd = el.shadowRoot.querySelector('d2l-activity-html-new-editor');
			const htmlEd = newEd.shadowRoot.querySelector('d2l-htmleditor');
			entity.setHeader(htmlEd.html);
		}
		if (htmlEditorEnabled && !htmlNewEditorEnabled) {
			const oldEd = el.shadowRoot.querySelector('d2l-activity-html-editor');
			const htmlEd = oldEd.shadowRoot.querySelector('d2l-html-editor');
			entity.setHeader(htmlEd.innerText);
		}
		if (!htmlEditorEnabled) {
			const ed = el.shadowRoot.querySelector('d2l-input-textarea');
			entity.setHeader(ed.value);
		}
	}

}

customElements.define(
	'd2l-activity-quiz-manage-header-footer-editor',
	ActivityQuizManageHeaderFooterEditor
);
