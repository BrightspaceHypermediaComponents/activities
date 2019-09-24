import { css, html, LitElement } from 'lit-element/lit-element.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

class ActivityEditor extends EntityMixinLit(LocalizeMixin(LitElement)) {

	static get properties() {
		return {
			prop1: { type: String },
		};
	}

	static get styles() {
		return css`
			:host {
				display: inline-block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	static async getLocalizeResources(langs) {
		for await (const lang of langs) {
			let translations;
			switch (lang) {
				case 'en':
					translations = await import('./lang/en.js');
					break;
			}

			if (translations && translations.assignment) {
				return {
					language: lang,
					resources: translations.assignment
				};
			}
		}

		return null;
	}

	constructor() {
		super();

		this.prop1 = 'activity-editor';
	}

	render() {
		return html`
			<slot name="editor"></slot>
		`;
	}
}
customElements.define('d2l-activity-editor', ActivityEditor);
