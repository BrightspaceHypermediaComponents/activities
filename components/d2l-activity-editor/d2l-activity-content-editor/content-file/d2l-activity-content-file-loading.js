import '../shared-components/d2l-activity-content-editor-title.js';
import { css, html } from 'lit-element/lit-element.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ContentFileLoading extends SkeletonMixin(MobxLitElement) {

	static get styles() {
		return [
			super.styles,
			labelStyles,
			css`
			:host {
				display: flex;
				flex: 1;
				flex-direction: column;

			}
			.d2l-activity-label-container {
				margin-bottom: 7px;
			}
			.d2l-file-content-load {
				display: flex;
				flex: 1;
			}
			`
		];
	}

	constructor() {
		super();
		/*
		This skeleton boolean value will always be true.
		The purpose of this component is to show a generic looking skeleton
		view before we actually know what elements we need to render and skeletize.
		 */
		this.skeleton = true;
	}

	render() {
		return html`
			<div class="d2l-activity-label-container d2l-label-text d2l-skeletize">&nbsp;</div>
			<div class="d2l-file-content-load d2l-skeletize">&nbsp;</div>
		`;
	}
}

customElements.define('d2l-activity-content-file-loading', ContentFileLoading);
