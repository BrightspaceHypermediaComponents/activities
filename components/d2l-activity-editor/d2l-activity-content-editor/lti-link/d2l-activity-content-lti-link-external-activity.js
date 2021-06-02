import '@brightspace-ui/core/components/button/button-subtle.js';
import { html, css } from 'lit-element/lit-element.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';

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
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			`,
			labelStyles
		];
	}

	constructor() {
		super();
	}

	render() {
		return html`
		<div class="d2l-content-link-external-activity">
			<div class="d2l-heading-2">
				${this.localize('content.externalActivity')}
			</div>
            <d2l-button-subtle
				text="${this.localize('content.openInNewWindow')}"
				icon="tier1:new-window"
				@click="${this._onClick}">
			>
            </d2l-button-subtle>
		</div>
		`;
	}

	_onClick() {
		window.open(this.entity.link, '_blank'); // TODO: Doesn't replace {orgUnitId} with the actual orgUnitId
	}
}
customElements.define('d2l-activity-content-lti-link-external-activity', ExternalActivity);
