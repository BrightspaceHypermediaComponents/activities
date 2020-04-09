import { html } from 'lit-element/lit-element.js';
import { MobxMixin } from '../../../components/d2l-activity-collection-editor/mixins/MobxMixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';

class StateSample { }

class MobxMixinComponent extends MobxMixin(MobxLitElement) {
	constructor() {
		super();
		this._setStateType(StateSample);
	}

	render() {
		return html`<div>Hello world!</div>`;
	}
}

class MobxComponentNoType extends MobxMixin(MobxLitElement) {
	constructor() {
		super();
	}

	render() {
		return html`<div>Hello world!</div>`;
	}
}

customElements.define('mobx-mixin-component', MobxMixinComponent);
customElements.define('mobx-component-no-type', MobxComponentNoType);
