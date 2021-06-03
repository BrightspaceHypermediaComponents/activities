import '@brightspace-ui/core/components/button/button-subtle.js';
import { css, html } from 'lit-element/lit-element.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ExternalActivity extends LocalizeActivityEditorMixin(RtlMixin(MobxLitElement)) {

	static get properties() {
		return {
			entity: { type: Object },
		};
	}

	static get styles() {
		return [
			css`
			.d2l-content-link-external-activity {
				align-items: center;
				display: flex;
				justify-content: space-between;
			}
			`,
			labelStyles
		];
	}

	render() {
		return html`
		<div class="d2l-content-link-external-activity">
			<div class="d2l-label-text">
				${this.localize('content.externalActivity')}
			</div>
            <d2l-button-subtle
				text="${this.localize('content.openInNewWindow')}"
				icon="tier1:new-window"
				@click="${this._onClick}"
			>
            </d2l-button-subtle>
		</div>
		`;
	}

	_onClick() {
		window.open(this.entity.link, '_blank');
	}
}
customElements.define('d2l-activity-content-lti-link-external-activity', ExternalActivity);
