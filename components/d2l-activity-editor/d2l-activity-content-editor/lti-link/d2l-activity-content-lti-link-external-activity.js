import '@brightspace-ui/core/components/button/button-subtle.js';
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
		};
	}

	static get styles() {
		return [
			super.styles,
			css`
			.d2l-content-link-external-activity {
				align-items: center;
				display: flex;
				justify-content: space-between;
			}
			#external-activity-container {
				margin-bottom: 20px;
				padding-bottom: 20px;
			}
			`,
			labelStyles
		];
	}

	constructor() {
		super();
		this.skeleton = true;
	}

	render() {
		if (this.entity) {
			this.skeleton = false;
		}

		if (this.skeleton) {
			return html`<label id="external-activity-container" class="d2l-skeletize d2l-skeletize-20">&nbsp;</label>`;
		}

		return html`
		<label class="d2l-content-link-external-activity">
			<div class="d2l-label-text">
				${this.localize('content.externalActivity')}
			</div>
            <d2l-button-subtle
				text="${this.localize('content.openInNewWindow')}"
				icon="tier1:new-window"
				@click="${this._onClick}"
			>
            </d2l-button-subtle>
		</label>
		`;
	}

	_onClick() {
		window.open(this.entity.link, '_blank', 'height=200,width=200');
	}
}
customElements.define('d2l-activity-content-lti-link-external-activity', ActivityContentLTILinkExternalActivity);
