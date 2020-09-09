import 'd2l-inputs/d2l-input-text.js';
import 'd2l-tooltip/d2l-tooltip';

import { css, html, LitElement } from 'lit-element/lit-element.js';
import { ContentEntity } from 'siren-sdk/src/activities/content/ContentEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/content-store.js';

class ContentEditorDetail extends EntityMixinLit(RtlMixin(LitElement)) {

	static get properties() {
		return {
			_nameError: { type: String },
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
			:host > div {
				padding-bottom: 20px;
			}
		`;
	}

	constructor() {
		super();
		// TODO: confirm if this is necessary
		this._setEntityType(ContentEntity);
	}

	render() {
		const contentEntity = store.getContentActivity(this.href);
		if (!contentEntity) {
			return html``;
		}

		const {	name } = contentEntity;

		return html`
			<div id="content-name-container">
				<!-- TODO - add localization -->
				<label class="d2l-label-text" for="content-name">Name*</label>
				<d2l-input-text
					id="content-name"
					maxlength="128"
					value="${name}"
					aria-invalid="${this._nameError ? 'true' : ''}"
					prevent-submit
					novalidate>
				</d2l-input-text>
				${this._getNameTooltip()}
			</div>
		`;
	}

	_getNameTooltip() {
		if (this._nameError) {
			return html`
				<d2l-tooltip
					id="name-tooltip"
					for="content-name"
					position="bottom"
					?showing="${this._nameError}">
					${this._nameError}
				</d2l-tooltip>
			`;
		}
	}
}
customElements.define('d2l-activity-content-editor-detail', ContentEditorDetail);
