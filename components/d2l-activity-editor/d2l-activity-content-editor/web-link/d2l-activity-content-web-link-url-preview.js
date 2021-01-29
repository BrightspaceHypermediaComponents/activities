import '@d2l/d2l-attachment/components/attachment';
import { css, html } from 'lit-element/lit-element.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ContentWebLinkUrlPreview extends SkeletonMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {

	static get properties() {
		return {
			entity: { type: Object }
		};
	}

	static get styles() {
		return  [
			super.styles,
			labelStyles,
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
			`
		];
	}

	constructor() {
		super();
		this.skeleton = true;
	}

	render() {
		const attachment = {};
		if (!this.entity || !this.entity.link) {
			return html``;
		}

		this.skeleton = false;
		attachment.id = this.entity.href;
		attachment.name = this.entity.title;
		attachment.url = this.entity.link;

		return html`
			<label class="d2l-label-text">${this.localize('content.previewLabel')}</label>
			<d2l-labs-attachment
				?hidden="${this.skeleton}"
				.attachmentId="${attachment.id}"
				.attachment="${attachment}"
			>
			</d2l-labs-attachment>
		`;
	}
}
customElements.define('d2l-activity-content-web-link-url-preview', ContentWebLinkUrlPreview);
