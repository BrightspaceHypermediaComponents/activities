/* eslint-disable indent */
import '@brightspace-ui/core/components/button/button-subtle.js';
import './d2l-activity-content-lti-link-jump-icon.js';
import './d2l-activity-content-lti-link-preview.js';
import { css, html } from 'lit-element/lit-element.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ActivityContentLTILinkExternalActivity extends SkeletonMixin(LocalizeActivityEditorMixin(RtlMixin(MobxLitElement))) {

	static get properties() {
		return {
			entity: { type: Object },
			clicked: { type: Boolean },
			skeleton: { type: Boolean },
		};
	}

	static get styles() {
		return [
			super.styles,
			css`
			.d2l-external-activity-outer-frame {
				display: flex;
				flex-direction: column;
				height: 100%;
				justify-content: flex-start;
			}
			.d2l-content-link-external-activity {
				align-items: center;
				display: flex;
				justify-content: space-between;
			}
			.d2l-external-activity-inner-frame {
				display: flex;
				margin-top: 18px;
				padding-top: 18px;
			}
			d2l-activity-content-lti-link-preview {
				height: 100%;
			}
			`,
			labelStyles
		];
	}

	constructor() {
		super();
		this.skeleton = true;
		this.clicked = false;
	}

	render() {
		if (this.entity) {
			this.skeleton = false;
		}

		return html`
		<div class="d2l-external-activity-outer-frame d2l-skeletize-container">
			<div class="d2l-content-link-external-activity">
				<label class="d2l-label-text d2l-skeletize">
					${this.localize('content.externalActivity')}
				</label>
				<d2l-button-subtle
					text="${this.localize('content.openInNewWindow')}"
					icon="tier1:new-window"
					@click="${this._onClick}"
					class="d2l-skeletize"
					?disabled="${this.clicked}"
				>
				</d2l-button-subtle>
			</div>
			${this.clicked ?
				html`<d2l-activity-content-lti-link-jump-icon text="${this.localize('content.externalActivityOpened')}"></d2l-activity-content-lti-link-jump-icon>` :
				html`<d2l-activity-content-lti-link-preview .entity=${this.entity}></d2l-activity-content-lti-link-preview>`
			}
		</div>
		`;
	}

	_onClick() {
		window.open(this.entity.link, '_blank', 'height=500, width=500');
		this.clicked = true;
	}
}
customElements.define('d2l-activity-content-lti-link-external-activity', ActivityContentLTILinkExternalActivity);
