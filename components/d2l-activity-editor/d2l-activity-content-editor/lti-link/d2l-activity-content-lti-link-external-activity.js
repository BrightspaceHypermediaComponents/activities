import '@brightspace-ui/core/components/button/button-subtle.js';
import { html } from 'lit-element/lit-element.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { LocalizeActivityEditorMixin } from '../../mixins/d2l-activity-editor-lang-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ExternalActivity extends LocalizeActivityEditorMixin(RtlMixin(MobxLitElement)) {

	static get properties() {
		return { };
	}

	static get styles() {
		return  [
		];
	}

	constructor() {
		super();
	}

	render() {
		return html`
		<div id="content-link-external-activity">
            <d2l-button-subtle text="${this.localize('content.openInNewWindow')}" icon="tier1:new-window">
            </d2l-button-subtle>
		</div>
		`;
	}

	_saveLinkOptions(e) {
	}
}
customElements.define('d2l-activity-content-lti-link-external-activity', ExternalActivity);
