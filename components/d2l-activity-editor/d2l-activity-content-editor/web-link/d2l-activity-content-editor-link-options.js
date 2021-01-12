import 'd2l-inputs/d2l-input-text.js';
import 'd2l-tooltip/d2l-tooltip';
import '@brightspace-ui/core/components/button/button-subtle.js';
import { css, html } from 'lit-element/lit-element.js';
import { ErrorHandlingMixin } from '../../error-handling-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';

class ContentEditorLinkOptions extends SkeletonMixin(ErrorHandlingMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement)))) {

	static get properties() {
		return {
			entity: { type: Object },
			onSave: { type: Function }
		};
	}

	static get styles() {
		return  [
			super.styles,
            labelStyles,
            radioStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				:host > div {
					padding-bottom: 20px;
				}
				.d2l-activity-label-container {
					margin-bottom: 7px;
				}
			`
		];
	}

	constructor() {
		super();
		this.skeleton = true;
	}

	render() {
		let isExternalResource = false;
		if (this.entity) {
			this.skeleton = false;
			isExternalResource = this.entity.isExternalResource;
		}
		
        return html`
        <div id="content-link-options-container" class="d2l-skeletize">
            <label class="d2l-input-radio-label">
            <input
                id="embed-on-page"
                type="radio"
                name="link-display-group"
                value="embed"
                ?checked="${!isExternalResource}"
				@change="${this.onSave}">
				${this.localize('content.embedOnPage')}
            </label>
            <label class="d2l-input-radio-label">
                <input
                    id="open-new-tab"
                    type="radio"
                    name="link-display-group"
                    value="newTab"
                    ?checked="${isExternalResource}"
                    @change="${this.onSave}">
                    ${this.localize('content.openNewTab')}
            </label>
        </div>
		`;
	}
}
customElements.define('d2l-activity-content-editor-link-options', ContentEditorLinkOptions);
