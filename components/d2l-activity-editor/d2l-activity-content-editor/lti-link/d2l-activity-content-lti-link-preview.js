import { css, html } from 'lit-element/lit-element.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin';

class ContentEditorLtiLinkPreview extends SkeletonMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {

	static get properties() {
		return {
			entity: { type: Object }
		};
	}

	static get styles() {
		return [
			super.styles,
			css`
				iframe {
						height: 100%;
						width: 100%;
						border: none;
						resize: vertical;
						overflow: hidden;
						flex-grow: 1;
				}
				.iframe-container {
						/*
						if remaining height in content block is less than 60% of viewport height,
						iframe height should be 60% of viewport height,
						otherwise use all the remaining height
						*/
						height: 100%;
						min-height: 60vh;

						display: flex;
						flex-direction: column;

						padding-top: 6px;
						padding-bottom: 18px;
				}
			`,
		];
	}

	constructor() {
		super();
		this.skeleton = true;
	}

	render() {
		let preview = html``;
		if (this.entity) {
			preview = html`
				<div class='iframe-container d2l-skeletize'>
					<iframe src=${this.entity.link} @load=${this._onLoad} class='d2l-skeletize'></iframe>
				</div>
			`;
		}

		return html`${preview}`;
	}

	_onLoad() {
		this.skeleton = false;
	}
}

customElements.define('d2l-activity-content-lti-link-preview', ContentEditorLtiLinkPreview);
